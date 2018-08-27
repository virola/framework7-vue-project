import axios from 'axios';
import Framework7 from 'framework7/framework7.esm.bundle.js';

// 使用框架组件
const app = new Framework7();

/**
 * 发起一次ajax请求
 * @param {string} url api url
 * @param {any} params get或post的参数
 * @param {string} type 请求类型, post / get / put ，默认get
 * @param {any} config 配置参数
 */
const fetch = async (url, params = {}, type = 'get', config = {}) => {
  // let loadingToast;
  const urlQuery = Framework7.utils.parseUrlQuery();
  params.channel = urlQuery.channel || 'goalwisdom';
  params.product = urlQuery.channel || 'bihuyihu';

  type = type.toLowerCase();
  if (!url) {
    return {
      msg: '请求API错误'
    };
  }
  if (!config.noLoading) {
    // loadingToast = app.toast.show({
    //   text: '加载中',
    //   position: 'center'
    // });
    app.dialog.preloader('加载中');
  }
  // 设定参数
  let options = {
    method: type,
    url: window.REST_BASE_URL + url,
    timeout: 10 * 1000,
    headers: {
      access_token: sessionStorage.loginToken || ''
    }
  };
  // get params or post data
  if (type === 'get') {
    options.params = params;
  } else {
    options.data = params;
    // 把POST数据改成FORM形式的数据提交
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
    options.headers['Content-Type'] = 'application/x-www-form-urlencoded';
  }

  // lock loading
  if (config.lock) {
    console.log(config);
  }

  return axios(options)
    .then(response => {
      app.dialog.close();
      // loadingToast && loadingToast.close();
      console.log(response);
      let resData = {};
      if (response.data) {
        // 判断请求成功和失败的标识
        const code = response.data.code;
        if (code == 0) {
          // 请求数据成功
          resData = {
            status: 0,
            data: response.data.data,
            msg: response.data.description
          };
        } else {
          // 请求数据失败
          resData = {
            status: code,
            data: response.data.data,
            msg: response.data.description
          };
        }
      }
      return resData;
    })
    .catch(() => {
      app.dialog.close();
      // console.log(error);
      // loadingToast && loadingToast.close();
      // 请求错误
      app.toast.show({
        text: `请求错误`,
        position: 'center',
        closeTimeout: 3000
      });
      return {
        status: 500,
        msg: '请求错误'
      };
    });
};

export default fetch;
