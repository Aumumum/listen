import axios from "axios";

const instance = axios.create({
  baseURL: "https://music-api-khaki.vercel.app/",
}
);
export  function get(url, params = {}) {

  return new Promise((resolve) => {
    instance
      .get(url, {
        params: params,
      })
      .then((response) => {
        resolve(response);
      })
       .catch(function (error) {
        if (error.response) {
          // 请求成功发出且服务器也响应了状态码，但状态代码超出了 2xx 的范围
          console.log('data',error.response.data);
          console.log('status',error.response.status);
          console.log('headers',error.response.headers);
        } else if (error.request) {
          // 请求已经成功发起，但没有收到响应
          // `error.request` 在浏览器中是 XMLHttpRequest 的实例，
          // 而在node.js中是 http.ClientRequest 的实例
          console.log('未响应',error.request);
        } else {
          // 发送请求时出了点问题
          console.log('#', error.message);
        }
      }); 
  });
}
export function post(url, data = {}) {
  return new Promise((resolve, reject) => {
    instance.post(url, data).then(
      (response) => {
        resolve(response);
      },
      (err) => {
        reject(err);
      }
    );
  });
}
