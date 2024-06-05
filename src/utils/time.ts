import moment from "moment";

const RELATIVE_TIME = {
  future: "in %s",
  past: "%s ago",
  s: "1 sec",
  ss: "%ss",
  m: "min",
  mm: "%dm",
  h: "hour",
  hh: "%dh",
  d: "day",
  dd: "%dd",
  M: "month",
  MM: "%dM",
  y: "year",
  yy: "%dY",
};

export function getTimeFromNow(date: string | Date): string {
  moment.defineLocale("en", {
    relativeTime: RELATIVE_TIME,
  });

  return moment(date).fromNow();
}
