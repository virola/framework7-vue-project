import framework7 from 'framework7';

console.log(framework7);
/**
 * 发起一次ajax请求
 * @param {string} url api url
 * @param {any} params get或post的参数
 * @param {string} type 请求类型, post / get / put ，默认get
 * @param {any} config 配置参数
 */
const fetch = async (url, params = {}, type = 'get', config = {}) => {
  type = type.toLowerCase();
  if (!url) {
    return {
      msg: '请求API错误'
    };
  }
  // 设定参数
  let options = {
    method: type,
    url: localStorage.REST_BASE_URL + '/gwecs' + url
  };
  // get params or post data
  if (type === 'get') {
    // 不显示全屏加载
    options.params = params;
  } else {
    options.data = params;
  }
  

  try {
    const response = await Framework7.request(options);
    return response.data;
  } catch (e) {
    return {
      error: e,
      msg: '请求失败'
    };
  }
};


export default fetch;
