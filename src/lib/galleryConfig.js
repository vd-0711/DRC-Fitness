// ───────────────────────────────────────────────────────────────────────────
// GALLERY SOURCE — two ways to manage the "In Action" photos:
//
// A) EASIEST, no rebuild — Google Drive:
//    1. Put photos in a Google Drive folder.
//    2. Share the folder: "Anyone with the link · Viewer".
//    3. Open the folder; the ID is the last part of the URL:
//       https://drive.google.com/drive/folders/THIS_IS_THE_ID
//    4. Create a Google API key with the "Google Drive API" enabled
//       (console.cloud.google.com → APIs & Services → Credentials).
//    5. Paste both below. New photos in the Drive folder then appear
//       on the site automatically — no code or redeploy needed.
//
// B) Or leave these blank and just drop image files into  src/gallery/
//    (a rebuild/redeploy then picks them up).
// ───────────────────────────────────────────────────────────────────────────

export const DRIVE_FOLDER_ID = '';
export const DRIVE_API_KEY = '';
