import moment from "moment";

const RELATIVE_TIME = {
  future: "in %s",
  past: "%s ago",
  s: "seconds",
  ss: "%ss",
  m: "a minute",
  mm: "%dm",
  h: "an hour",
  hh: "%dh",
  d: "a day",
  dd: "%dd",
  M: "a month",
  MM: "%dM",
  y: "a year",
  yy: "%dY",
};

export function getTimeFromNow(date: string | Date): string {
  moment.locale("en", {
    relativeTime: RELATIVE_TIME,
  });

  return moment(date).fromNow();
}
