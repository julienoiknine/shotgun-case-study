export function isEmpty(obj) {
  return Object.keys(obj).length === 0 && obj.constructor === Object;
}

export function getMinutes(secs) {
  return String(Math.floor(secs / 60)).padStart(2, '0') + ':' + String(Math.round(secs % 60)).padStart(2, '0');
}