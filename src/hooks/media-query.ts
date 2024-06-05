import { useLayoutEffect, useState } from "react";

/**
 * Use Media Query Hook - Checks media size using Match Media API.
 * Inspired by https://usehooks-ts.com/react-hook/use-media-query but simplified
 * @param query
 * @returns boolean
 */

export function useMediaQuery(
  query?:
    | "(min-width: 640px)"
    | "(min-width: 768px)"
    | "(min-width: 1024px)"
    | "(min-width: 1280px)",
) {
  const [value, setValue] = useState<boolean>(false);

  /**
   * Return default value if fired server-side
   * Just a hack of Next where everything using window needs to be guarded and done in useEffect/useLayoutEffect
   */

  useLayoutEffect(() => {
    if (typeof window === "undefined") return;

    const media = window.matchMedia(query || "(min-width: 768px)");

    const onChange = (event: MediaQueryListEvent) => {
      setValue(event.matches);
    };

    media.addEventListener("change", onChange);
    setValue(media.matches);

    return () => media.removeEventListener("change", onChange);
  }, [query]);

  return value;
}
