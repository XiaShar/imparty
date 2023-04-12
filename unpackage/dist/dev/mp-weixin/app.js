"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const common_vendor = require("./common/vendor.js");
const uni_modules_uniIdPages_init = require("./uni_modules/uni-id-pages/init.js");
require("./uni_modules/uni-id-pages/config.js");
if (!Math) {
  "./pages/activities/activities.js";
  "./pages/profile/index.js";
  "./pages/profile/editingView.js";
  "./pages/formPage/formPage.js";
  "./pages/activeDetail/activeDetail.js";
  "./uni_modules/uni-id-pages/pages/userinfo/deactivate/deactivate.js";
  "./uni_modules/uni-id-pages/pages/userinfo/userinfo.js";
  "./uni_modules/uni-id-pages/pages/userinfo/bind-mobile/bind-mobile.js";
  "./uni_modules/uni-id-pages/pages/userinfo/cropImage/cropImage.js";
  "./uni_modules/uni-id-pages/pages/login/login-withoutpwd.js";
  "./uni_modules/uni-id-pages/pages/login/login-withpwd.js";
  "./uni_modules/uni-id-pages/pages/login/login-smscode.js";
  "./uni_modules/uni-id-pages/pages/register/register.js";
  "./uni_modules/uni-id-pages/pages/register/register-by-email.js";
  "./uni_modules/uni-id-pages/pages/retrieve/retrieve.js";
  "./uni_modules/uni-id-pages/pages/retrieve/retrieve-by-email.js";
  "./uni_modules/uni-id-pages/pages/common/webview/webview.js";
  "./uni_modules/uni-id-pages/pages/userinfo/change_pwd/change_pwd.js";
  "./uni_modules/uni-id-pages/pages/register/register-admin.js";
  "./uni_modules/uni-id-pages/pages/userinfo/set-pwd/set-pwd.js";
  "./uni_modules/uni-id-pages/pages/userinfo/realname-verify/realname-verify.js";
}
const _sfc_main = {
  onLaunch: async function() {
    console.log("App Launch");
    common_vendor.index.onPushMessage((res) => {
      console.log("收到推送消息：", res);
    });
    common_vendor.index.getPushClientId({
      success: (res) => {
        let push_clientid = res.cid;
        common_vendor.Ls.callFunction({
          name: "doUniPush",
          data: { pushCliendId: push_clientid }
        });
        console.log("客户端推送标识:", push_clientid);
      },
      fail(err) {
        console.log(err);
      }
    });
    await uni_modules_uniIdPages_init.uniIdPageInit();
  },
  onShow: function() {
    console.log("App Show");
  },
  onHide: function() {
    console.log("App Hide");
  }
};
const App = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "C:/Users/SundayV/Documents/HBuilderProjects/myApp/App.vue"]]);
function createApp() {
  const app = common_vendor.createSSRApp(App);
  return {
    app
  };
}
createApp().app.mount("#app");
exports.createApp = createApp;
