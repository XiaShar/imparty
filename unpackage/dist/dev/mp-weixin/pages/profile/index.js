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
          url: "/uni_modules/uni-id-pages/pages/login/login"
        });
      } else {
        common_vendor.index.navigateTo({
          url: "./editingView"
        });
      }
    },
    showMyActivity(goal) {
      common_vendor.index.navigateTo({
        url: `./myActivity?scene=${goal}`
      });
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
  return common_vendor.e({
    a: common_vendor.p({
      width: "100rpx",
      height: "100rpx"
    }),
    b: !$options.userInfo.nickname
  }, !$options.userInfo.nickname ? {} : {}, {
    c: common_vendor.t($options.userInfo.nickname),
    d: common_vendor.t($options.userInfo.school),
    e: common_assets._imports_0,
    f: common_vendor.o(($event) => $options.editInfo()),
    g: $data.icon.pre,
    h: common_vendor.o(($event) => $options.showMyActivity("will")),
    i: $data.icon.ing,
    j: common_vendor.o(($event) => $options.showMyActivity("now")),
    k: $data.icon.ed,
    l: common_vendor.o(($event) => $options.showMyActivity("end")),
    m: $data.icon.info,
    n: $data.icon.rightArrow,
    o: $data.icon.setting,
    p: $data.icon.rightArrow,
    q: $data.icon.about,
    r: $data.icon.rightArrow
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "C:/Users/86183/Desktop/hbuilder/Git/pages/profile/index.vue"]]);
wx.createPage(MiniProgramPage);
