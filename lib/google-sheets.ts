import { google } from "googleapis";
import {
  SHEET_HEADERS,
  payloadToRow,
  type AssessmentPayload,
} from "./assessment";

/**
 * Google Sheets integration for assessment submissions.
 *
 * Setup checklist (when ready to enable):
 *  1. Create a Google Cloud project, enable the Sheets API.
 *  2. Create a service account, download the JSON key.
 *  3. Create a Google Sheet, add a worksheet named "Assessments",
 *     and paste the headers from SHEET_HEADERS into row 1.
 *  4. Share the sheet with the service account's email (Editor).
 *  5. Set env vars (see .env.example):
 *       GOOGLE_SHEETS_SPREADSHEET_ID
 *       GOOGLE_SHEETS_RANGE         (default Assessments!A:N)
 *       GOOGLE_SERVICE_ACCOUNT_EMAIL
 *       GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY  (escape \n)
 *
 * Until creds are present, appendAssessmentRow() returns
 * { ok: false, reason: "not-configured" } so the API route can
 * still respond 200 to the client and we can enable later
 * without UI changes.
 */

type AppendResult =
  | { ok: true; updatedRange: string | null | undefined }
  | { ok: false; reason: "not-configured" | "error"; message?: string };

function getEnv() {
  const spreadsheetId = process.env.GOOGLE_SHEETS_SPREADSHEET_ID;
  const range = process.env.GOOGLE_SHEETS_RANGE ?? "Assessments!A:N";
  const clientEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const privateKey = process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY?.replace(
    /\\n/g,
    "\n"
  );
  if (!spreadsheetId || !clientEmail || !privateKey) return null;
  return { spreadsheetId, range, clientEmail, privateKey };
}

export async function appendAssessmentRow(
  payload: AssessmentPayload
): Promise<AppendResult> {
  const env = getEnv();
  if (!env) return { ok: false, reason: "not-configured" };

  try {
    const auth = new google.auth.JWT({
      email: env.clientEmail,
      key: env.privateKey,
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });
    const sheets = google.sheets({ version: "v4", auth });

    const res = await sheets.spreadsheets.values.append({
      spreadsheetId: env.spreadsheetId,
      range: env.range,
      valueInputOption: "RAW",
      insertDataOption: "INSERT_ROWS",
      requestBody: { values: [payloadToRow(payload)] },
    });

    return { ok: true, updatedRange: res.data.updates?.updatedRange };
  } catch (err) {
    return {
      ok: false,
      reason: "error",
      message: err instanceof Error ? err.message : String(err),
    };
  }
}

export { SHEET_HEADERS };
