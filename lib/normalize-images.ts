export function normalizeImages(
  images: Record<string, string | string[]>
): Record<string, string[]> {
  const normalized: Record<string, string[]> = {};
  for (const [color, value] of Object.entries(images)) {
    normalized[color] = Array.isArray(value) ? value : [value];
  }
  return normalized;
}
