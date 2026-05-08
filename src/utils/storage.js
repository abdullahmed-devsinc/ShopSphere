export function safeParse(json, fallback) {
  try {
    if (json == null) {
      return fallback;
    }
    const parsed = JSON.parse(json);
    return parsed ?? fallback;
  } catch {
    return fallback;
  }
}
export function loadState(key, fallback) {
  return safeParse(localStorage.getItem(key), fallback);
}
export function saveState(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}
