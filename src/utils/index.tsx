export const parserQuery = (obj: any) => {
  if (typeof obj === 'number') {
    return obj;
  }
  if (typeof obj !== 'object' || Array.isArray(obj)) {
    return JSON.stringify(obj);
  }
  let props: any = Object.keys(obj).map(key =>
    `${key}:${parserQuery(obj[key])}`
  ).join(',');
  return `{${props}}`;
}