export function videoMimeType(src: string) {
  const path = src.split("?")[0].toLowerCase();
  if (path.endsWith(".mov") || path.endsWith(".qt")) return "video/quicktime";
  if (path.endsWith(".webm")) return "video/webm";
  if (path.endsWith(".ogg") || path.endsWith(".ogv")) return "video/ogg";
  return "video/mp4";
}
