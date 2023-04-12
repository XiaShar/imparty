"use strict";
const common_vendor = require("../../common/vendor.js");
const uni_modules_uniIdPages_common_store = require("../../uni_modules/uni-id-pages/common/store.js");
const common_assets = require("../../common/assets.js");
require("../../uni_modules/uni-id-pages/config.js");
let opt_id = "";
const _sfc_main = {
  data() {
    return {
      uniiconsize: 40,
      dedata: [],
      pattern: {
        color: "#7A7E83",
        backgroundColor: "#fff",
        selectedColor: "#FCA464",
        buttonColor: "#FCA464",
        iconColor: "#fff"
      },
      horizontal: "right",
      vertical: "bottom",
      direction: "horizontal",
      content: [
        {
          iconPath: "/static/commit.png",
          selectedIconPath: "/static/commit.png",
          text: "咨询",
          active: false
        },
        {
          iconPath: "/static/intro.png",
          selectedIconPath: "/static/intro.png",
          text: "报名",
          active: false
        }
      ]
    };
  },
  methods: {
    trigger(e) {
      if (e.index === 0) {
        common_vendor.index.showModal({
          title: "提示",
          content: "该功能尚在开发中..."
        });
      } else if (e.index === 1) {
        let flag = true;
        common_vendor.Ls.callFunction({
          name: "getMyActivity",
          data: { _id: uni_modules_uniIdPages_common_store.store.userInfo._id }
        }).then((res) => {
          res.result.forEach((item) => {
            if (item._id === this.dedata[0]._id) {
              flag = false;
            }
          });
          if (flag) {
            common_vendor.index.navigateTo({
              url: `../formPage/formPage?activities_id=${this.dedata[0]._id}`
            });
          } else {
            common_vendor.index.showToast({
              title: "您已报名该活动"
            });
          }
        });
      }
    }
  },
  computed: {},
  onLoad: function(option) {
    opt_id = option._id;
  },
  mounted() {
    common_vendor.Ls.callFunction({
      name: "detail-activities",
      data: {
        objId: opt_id
      }
    }).then((res) => {
      this.dedata = res.result.data;
      console.log(res.result.data);
    }).catch((err) => {
      console.error(err);
    });
  }
};
if (!Array) {
  const _easycom_uni_card2 = common_vendor.resolveComponent("uni-card");
  const _easycom_uni_fab2 = common_vendor.resolveComponent("uni-fab");
  (_easycom_uni_card2 + _easycom_uni_fab2)();
}
const _easycom_uni_card = () => "../../uni_modules/uni-card/components/uni-card/uni-card.js";
const _easycom_uni_fab = () => "../../uni_modules/uni-fab/components/uni-fab/uni-fab.js";
if (!Math) {
  (_easycom_uni_card + _easycom_uni_fab)();
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
        j: "9f96ab6e-3-" + i0,
        k: common_vendor.sr("fab", "9f96ab6e-4-" + i0, {
          "f": 1
        }),
        l: "9f96ab6e-4-" + i0
      };
    }),
    b: common_assets._imports_0$1,
    c: common_assets._imports_1,
    d: common_assets._imports_2,
    e: common_vendor.o($options.trigger, $data.dedata.id),
    f: common_vendor.p({
      pattern: $data.pattern,
      content: $data.content,
      horizontal: $data.horizontal,
      vertical: $data.vertical,
      direction: $data.direction,
      show: true
    }),
    g: $data.dedata.id
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "C:/Users/SundayV/Documents/HBuilderProjects/myApp/pages/activeDetail/activeDetail.vue"]]);
wx.createPage(MiniProgramPage);
