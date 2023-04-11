"use strict";
const common_vendor = require("../../common/vendor.js");
const uni_modules_uniIdPages_common_store = require("../../uni_modules/uni-id-pages/common/store.js");
const common_assets = require("../../common/assets.js");
require("../../uni_modules/uni-id-pages/config.js");
common_vendor.Ls.importObject("uni-id-co");
const _sfc_main = {
  data() {
    return {
      icon1: "../../static/preAct.png",
      icon: {
        pre: "../../static/preAct.png",
        ing: "../../static/acting.png",
        ed: "../../static/endAct.png",
        info: "../../static/info.png",
        setting: "../../static/setting.png",
        about: "../../static/about.png",
        rightArrow: "../../static/rightArrow.png"
      }
    };
  },
  computed: {
    userInfo() {
      return uni_modules_uniIdPages_common_store.store.userInfo;
    }
  },
  methods: {
    toLogin() {
      common_vendor.index.navigateTo({
        url: "/uni_modules/uni-id-pages/pages/login/login-withpwd"
      });
    },
    editInfo() {
      if (common_vendor.Ls.getCurrentUserInfo().uid === null) {
        common_vendor.index.navigateTo({
          url: "/uni_modules/uni-id-pages/pages/login/login-withpwd"
        });
      } else {
        common_vendor.index.navigateTo({
          url: "./editingView"
        });
      }
    }
  }
};
if (!Array) {
  const _easycom_uni_id_pages_avatar2 = common_vendor.resolveComponent("uni-id-pages-avatar");
  const _easycom_uni_card2 = common_vendor.resolveComponent("uni-card");
  (_easycom_uni_id_pages_avatar2 + _easycom_uni_card2)();
}
const _easycom_uni_id_pages_avatar = () => "../../uni_modules/uni-id-pages/components/uni-id-pages-avatar/uni-id-pages-avatar.js";
const _easycom_uni_card = () => "../../uni_modules/uni-card/components/uni-card/uni-card.js";
if (!Math) {
  (_easycom_uni_id_pages_avatar + _easycom_uni_card)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.p({
      width: "100rpx",
      height: "100rpx"
    }),
    b: common_vendor.t($options.userInfo.nickname),
    c: common_assets._imports_0,
    d: common_vendor.o(($event) => $options.editInfo()),
    e: $data.icon.pre,
    f: $data.icon.ing,
    g: $data.icon.ed,
    h: $data.icon.info,
    i: $data.icon.rightArrow,
    j: $data.icon.setting,
    k: $data.icon.rightArrow,
    l: $data.icon.about,
    m: $data.icon.rightArrow
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "C:/Users/SundayV/Documents/HBuilderProjects/myApp/pages/profile/index.vue"]]);
wx.createPage(MiniProgramPage);
