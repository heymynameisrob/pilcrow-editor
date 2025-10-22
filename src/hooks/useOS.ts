import { useState } from "react";

export function useOS() {
  const [os] = useState(() => {
    const userAgent = window.navigator.userAgent.toLowerCase();

    if (userAgent.indexOf("win") > -1) {
      return "windows";
    } else if (userAgent.indexOf("mac") > -1) {
      return "mac";
    } else if (userAgent.indexOf("linux") > -1) {
      return "linux";
    } else if (/android/.test(userAgent)) {
      return "android";
    } else if (/iphone|ipad|ipod/.test(userAgent)) {
      return "ios";
    } else if (/cros/.test(userAgent)) {
      return "chrome os";
    } else {
      return "unknown";
    }
  });
  return os;
}
