const SHEET_ID = "YOUR_SHEET_ID";
const SHEET_NAME = "Leads";

function doPost(e) {
  try {
    const payload = JSON.parse(e.postData.contents);
    const spreadsheet = SpreadsheetApp.openById(SHEET_ID);
    const sheet =
      spreadsheet.getSheetByName(SHEET_NAME) || spreadsheet.insertSheet(SHEET_NAME);

    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        "timestamp",
        "nom",
        "email",
        "telephone",
        "codePostal",
        "ville",
        "typeBatiment",
        "typePrestation",
        "description",
        "delai",
        "utm_source",
        "utm_medium",
        "utm_campaign",
        "utm_term",
        "utm_content",
        "gclid",
        "leadScore",
        "userAgent",
        "ip",
      ]);
    }

    sheet.appendRow([
      new Date(),
      payload.nom || "",
      payload.email || "",
      payload.telephone || "",
      payload.codePostal || "",
      payload.ville || "",
      payload.typeBatiment || "",
      payload.typePrestation || "",
      payload.description || "",
      payload.delai || "",
      payload.utm?.source || "",
      payload.utm?.medium || "",
      payload.utm?.campaign || "",
      payload.utm?.term || "",
      payload.utm?.content || "",
      payload.gclid || "",
      payload.leadScore || 0,
      payload.userAgent || "",
      e.parameter["ip"] || payload.ip || "",
    ]);

    return ContentService.createTextOutput(
      JSON.stringify({ ok: true }),
    ).setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(
      JSON.stringify({ ok: false, error: String(err) }),
    ).setMimeType(ContentService.MimeType.JSON);
  }
}
