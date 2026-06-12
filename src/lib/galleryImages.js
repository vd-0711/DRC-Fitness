import { DRIVE_FOLDER_ID, DRIVE_API_KEY } from './galleryConfig';

// Local fallback: every image in src/gallery (sorted by filename).
const local = import.meta.glob('../gallery/*.{jpg,jpeg,png,webp,JPG,JPEG,PNG,WEBP}', {
  eager: true,
  query: '?url',
  import: 'default',
});
export const LOCAL_IMAGES = Object.keys(local).sort().map((k) => local[k]);

export const DRIVE_ENABLED = Boolean(DRIVE_FOLDER_ID && DRIVE_API_KEY);

// Pull image URLs from the configured public Drive folder. Returns null on any
// failure so callers fall back to LOCAL_IMAGES.
export async function fetchDriveImages() {
  if (!DRIVE_ENABLED) return null;
  const q = `'${DRIVE_FOLDER_ID}' in parents and mimeType contains 'image/' and trashed = false`;
  const url =
    `https://www.googleapis.com/drive/v3/files?q=${encodeURIComponent(q)}` +
    `&key=${DRIVE_API_KEY}&fields=files(id,name)&orderBy=name&pageSize=200`;
  try {
    const res = await fetch(url);
    if (!res.ok) return null;
    const data = await res.json();
    if (!data.files || !data.files.length) return null;
    return data.files.map((f) => `https://drive.google.com/thumbnail?id=${f.id}&sz=w1600`);
  } catch {
    return null;
  }
}
