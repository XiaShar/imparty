"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const _sfc_main = {
  data() {
    return {
      uniiconsize: 40,
      dedata: []
    };
  },
  methods: {},
  computed: {},
  mounted() {
    common_vendor.Ls.callFunction({
      name: "detail-activities"
    }).then((res) => {
      this.dedata = res.result.data;
      console.log(res.dedata.requirement);
    }).catch((err) => {
      console.error(err);
    });
  }
};
if (!Array) {
  const _easycom_uni_card2 = common_vendor.resolveComponent("uni-card");
  _easycom_uni_card2();
}
const _easycom_uni_card = () => "../../uni_modules/uni-card/components/uni-card/uni-card.js";
if (!Math) {
  _easycom_uni_card();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.f($data.dedata, (item, index, i0) => {
      return {
        a: common_vendor.t(item.title),
        b: common_vendor.t(item.masteratti.join(",")),
        c: common_vendor.t(item.aligintitle),
        d: "9f96ab6e-0-" + i0,
        e: common_vendor.t(item.description),
        f: "9f96ab6e-1-" + i0,
        g: common_vendor.t(item.known),
        h: "9f96ab6e-2-" + i0,
        i: common_vendor.f(item.requirement, (mitem, mindex, i1) => {
          return {
            a: common_vendor.t(mitem.index),
            b: common_vendor.t(mitem.der),
            c: mitem.mindex
          };
        }),
        j: "9f96ab6e-3-" + i0
      };
    }),
    b: common_assets._imports_0$1,
    c: common_assets._imports_1,
    d: common_assets._imports_2,
    e: $data.dedata.id
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "C:/Users/SundayV/Documents/HBuilderProjects/myApp/pages/activeDetail/activeDetail.vue"]]);
wx.createPage(MiniProgramPage);
