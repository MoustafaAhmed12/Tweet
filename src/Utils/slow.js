export function slow(ms) {
  return new Promise((res) => setTimeout(res, ms));
}
