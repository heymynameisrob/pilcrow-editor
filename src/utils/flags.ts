export const isIOS = () => {
  if (typeof navigator === "undefined") return false;
  return /iPad|iPhone|iPod/.test(navigator && navigator.userAgent);
};

export function isSmallViewport() {
  if (typeof window === "undefined") return false;

  return window.innerWidth < 768;
}
