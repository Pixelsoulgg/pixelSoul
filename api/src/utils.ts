import moment from "moment";
import { ContentException } from "./exceptions";

export const getIsoDate = (date: Date | string) => {
  const str = moment(date).toISOString();
  return moment(str).toDate();
}

export const formatToIsoDate = (date: Date | string | number, isIncludeTime = false) => {
  if (isIncludeTime)
    return moment(date).toISOString();
  return moment(date).format("YYYY-MM-DD") + "T00:00:00Z";
}

export const convertToDate = (date: Date | string | number, result: 'boolean' | 'Date', isThrow = false, iso = true): boolean | Date | undefined => {
  const momentDate = moment(date);
  if (momentDate.isValid()) {
    if (result === 'boolean') return true;
    if (iso) return new Date(momentDate.toISOString());
    return momentDate.toDate();
  }
  if (!isThrow) {
    return result === 'boolean' ? false : undefined;
  }
  throw new ContentException('date invalid')
}
