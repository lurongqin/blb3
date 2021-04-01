// module.exports = {
//     nama:'lrq'
// }


/**
 *  isXcx——判断在微信中还是小程序中（注意在index.html中引入第三方 jweixin.js）
 *  isMolibe——判断设备类型
 *  GetLocationParams——从地址栏里面获取参数值
 */

 var utils = {
    isAndroid: navigator.userAgent.indexOf('Android') > -1 || navigator.userAgent.indexOf('Linux') > -1,
    isIPhone: navigator.userAgent.indexOf('iPhone') > -1,
    isClient: navigator.userAgent.indexOf('mzapp') > -1,
    isIos: navigator.userAgent.match(/Mac OS/),
    ua: window.navigator.userAgent.toLowerCase(),
  
    isXcx: function () {
      let ua = window.navigator.userAgent.toLowerCase();
      return new Promise((resolve) => {
        if (ua.indexOf('micromessenger') === -1) {
          console.log("不在微信或者小程序中")
          // return false
          resolve(mini_no);
        } else {
          wx.miniProgram.getEnv((res) => {
            if (res.miniprogram) {
              console.log("在小程序中")
              // return true
              // return 'mini_wx'
              resolve('mini_wx');
            } else {//在微信中
              console.log("在微信中")
              // return false
              // return 'mini_no'
              reject('mini_no');
            }
          });
        }
      });
    },
  
    //判断微信环境
    isW(){
      let ua = window.navigator.userAgent.toLowerCase();
      if (ua.match(/MicroMessenger/i) == 'micromessenger') {
        return true;
      } else {
        return false;
      }
    },
  
    //QQ浏览器
    is_qqbrowser() {
      var ua = navigator.userAgent.toLowerCase();
      if (/mqqbrowser|qq/i.test(ua)) {
        return true;
      } else {
        return false;
      }
    },
  
    //微博
    isWeibo() {
      var ua = window.navigator.userAgent;
      return !!/__weibo__/.exec(ua);
    },
  
    //搜狐
    isSafari() {
      var ua = window.navigator.userAgent;
      return !!/Version[|\/]([\w.]+)(\s\w.+)?\s?Safari|like\sGecko\)\sMobile\/\w{3,}$/.exec(ua);
    },
  
  //判断设备类型
    isMolibe: function (){
      return new Promise(function(resolve, reject){
           let u = navigator.userAgent;
           let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1;//android终端
           // let isIPhone = navigator.userAgent.indexOf('iPhone') > -1; ////iPhone
           let isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
            if (isAndroid){
              resolve('isAndroid')
            } else if (isiOS){
              resolve('isiOS')
            }
      });
    },
  
     isIphonex() {
      if (typeof window !== 'undefined' && window) {
        return /iphone/gi.test(window.navigator.userAgent) && window.screen.height >= 812;
      }
      return false;
    },
  
    // // 获取地址栏参数
    GetLocationParams: function (name) {
      // console.log(name)
      let
        href = window.location.href,
        subIndex = href.indexOf("?"),
        paramsObj = {};
      if (subIndex != -1) {
        let params = href.substr(subIndex + 1);
        let paramsMany = params.indexOf("&");
        if (paramsMany != -1) {
          let paramsArr = params.split("&");
  
          // paramsArr.forEach((item, index) => {
          //     paramsObj[item.split("=")[0]] = item.split("=")[1];
          // })
  
          //使用背景 当URL出现相同的参数名时，取第一个
          //至于使用try catch是因为 forEach只能选择它终止循环
          try {
            paramsArr.forEach((item, index) => {
              if (name == item.split("=")[0]){
                // console.log(name)
                console.log(item.split("=")[0])
                paramsObj[item.split("=")[0]] = item.split("=")[1];
                throw new Error()
              }
            })
          }catch (e) {
          }
  
        } else {
          paramsObj[params.split("=")[0]] = params.split("=")[1];
        }
      }
  
      if (paramsObj.hasOwnProperty(name)) {
        return paramsObj[name];
      } else {
        return null
      }
    },
  
  };
  
  export default utils;
  