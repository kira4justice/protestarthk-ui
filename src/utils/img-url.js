export default function imgUrl(path) {
  let base = process.env.VUE_APP_API_URL || '';
  base = base.replace(/(.*)\/$/, '$1');
  path = (path || '').replace(/^\/(.*)/, '$1');
  return base ? `${base}/${path}` : `/${path}`;
}
