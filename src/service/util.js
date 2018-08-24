/**
 * @file 基础操作库
 */
/**
 * 获取URL参数
 */
export const getUrlQuery = () => {
  let info = location.search;
  info = info.length > 0 ? info.substring(1) : '';
  let result = info.split('&');
  let key, value;
  let query = {};
  for (let i = 0; i < result.length; i++) {
    let map = result[i].split('=');
    key = map[0];
    value = map[1];
    query[key] = value;
  }
  return query;
};