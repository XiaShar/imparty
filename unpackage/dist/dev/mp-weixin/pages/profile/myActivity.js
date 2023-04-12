"use strict";
const common_vendor = require("../../common/vendor.js");
const uni_modules_uniIdPages_common_store = require("../../uni_modules/uni-id-pages/common/store.js");
require("../../uni_modules/uni-id-pages/config.js");
let scene = "";
const _sfc_main = {
  components: {},
  data() {
    return {
      //渲染数据
      showData: [],
      // cover: 'https://web-assets.dcloud.net.cn/unidoc/zh/shuijiao.jpg',
      title: "",
      extraIcon: {
        color: "#4cd964",
        size: "22",
        type: "gear-filled"
      },
      empty: false
    };
  },
  methods: {
    showDetail(item) {
      common_vendor.index.navigateTo({
        "url": `../activeDetail/activeDetail?_id=${item._id}`
      });
    },
    onClick(e) {
      common_vendor.index.navigateTo({
        url: "../formPage/formPage"
      });
    },
    actionsClick(text) {
      common_vendor.index.showToast({
        title: text,
        icon: "none"
      });
    },
    getTitle() {
      return "qaq";
    }
  },
  onLoad: function(option) {
    scene = option.scene;
  },
  mounted() {
    if (scene === "will")
      this.title = "即将开始";
    if (scene === "now")
      this.title = "正在进行中";
    if (scene === "end")
      this.title = "已结束";
    common_vendor.Ls.callFunction({
      name: "getMyActivity",
      data: {
        _id: uni_modules_uniIdPages_common_store.store.userInfo._id
      }
    }).then((res) => {
      this.showData = res.result;
      this.showData = this.showData.filter((item) => {
        return item.isdoing === scene;
      });
      if (this.showData.length === 0)
        this.empty = true;
    }).catch((err) => {
      console.error(err);
    });
  },
  onPullDownRefresh() {
    common_vendor.Ls.callFunction({
      name: "getMyActivity",
      data: {
        _id: uni_modules_uniIdPages_common_store.store.userInfo._id
      }
    }).then((res) => {
      this.showData = res.result;
      this.showData = this.showData.filter((index, item) => {
        return item.isdoing === scene;
      });
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
  return common_vendor.e({
    a: common_vendor.t($data.title),
    b: $data.empty
  }, $data.empty ? {} : {}, {
    c: common_vendor.f($data.showData, (item, index, i0) => {
      return {
        a: common_vendor.t(item.title),
        b: common_vendor.f(item.actag, (itemtag, indextag, i1) => {
          return {
            a: common_vendor.t(itemtag),
            b: indextag
          };
        }),
        c: common_vendor.t(item.ddl),
        d: common_vendor.o(($event) => $options.showDetail(item), item._id),
        e: "c945dd00-0-" + i0,
        f: item._id
      };
    })
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "C:/Users/86183/Desktop/hbuilder/Git/pages/profile/myActivity.vue"]]);
wx.createPage(MiniProgramPage);
