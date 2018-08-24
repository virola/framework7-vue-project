import axios from 'axios';

import { getUrlQuery } from './util';

/**
 * 发起一次ajax请求
 * @param {string} url api url
 * @param {any} params get或post的参数
 * @param {string} type 请求类型, post / get / put ，默认get
 * @param {any} config 配置参数
 */
const fetch = async (url, params = {}, type = 'get', config = {}) => {
  const urlQuery = getUrlQuery();
  params.channel = urlQuery.channel || 'goalwisdom';
  params.product = urlQuery.channel || 'bihuyihu';

  type = type.toLowerCase();
  if (!url) {
    return {
      msg: '请求API错误'
    };
  }
  // 设定参数
  let options = {
    method: type,
    url: window.REST_BASE_URL + url,
    timeout: 6000
  };
  // get params or post data
  if (type === 'get') {
    options.params = params;
  } else {
    options.data = params;
    options.transformRequest = [
      function(data) {
        let ret = '';
        for (let it in data) {
          if (it && data[it]) {
            if (ret) {
              ret += '&';
            }
            ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]);
          }
        }
        return ret;
      }
    ];
    options.headers = {
      'Content-Type': 'application/x-www-form-urlencoded'
    };
  }

  // lock loading
  if (config.lock) {
    console.log(config);
  }

  try {
    const response = await axios(options);
    return response.data;
  } catch (e) {
    return {
      error: e,
      msg: '请求失败'
    };
  }
};

export default fetch;
