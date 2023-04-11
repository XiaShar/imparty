"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  components: {},
  data() {
    return {
      // cover: 'https://web-assets.dcloud.net.cn/unidoc/zh/shuijiao.jpg',
      avatar: [
        "https://img1.baidu.com/it/u=2407625550,1485951297&fm=253&app=120&size=w931&n=0&f=JPEG&fmt=auto?sec=1680627600&t=2d3299bc86c91a1048d93cf01096bc15",
        "https://img1.baidu.com/it/u=4120075661,439968901&fm=253&app=138&size=w931&n=0&f=JPEG&fmt=auto?sec=1680627600&t=8682d52389e8faa8b2aa4f37969ba30e"
      ],
      extraIcon: {
        color: "#4cd964",
        size: "22",
        type: "gear-filled"
      },
      pattern: {
        color: "#7A7E83",
        backgroundColor: "#fff",
        selectedColor: "#FCA464",
        buttonColor: "#FCA464",
        iconColor: "#fff"
      },
      content: [
        {
          iconPath: "/static/image.png",
          selectedIconPath: "/static/image-active.png",
          text: "相册",
          active: false
        },
        {
          iconPath: "/static/home.png",
          selectedIconPath: "/static/home-active.png",
          text: "首页",
          active: false
        },
        {
          iconPath: "/static/star.png",
          selectedIconPath: "/static/star-active.png",
          text: "收藏",
          active: false
        }
      ]
    };
  },
  methods: {
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
    }
  },
  trigger(e) {
    console.log(e);
    this.content[e.index].active = !e.item.active;
    common_vendor.index.showModal({
      title: "提示",
      content: `您${this.content[e.index].active ? "选中了" : "取消了"}${e.item.text}`,
      success: function(res) {
        if (res.confirm) {
          console.log("用户点击确定");
        } else if (res.cancel) {
          console.log("用户点击取消");
        }
      }
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
    a: common_vendor.o(($event) => _ctx.showDetail()),
    b: common_vendor.sr("fab", "58407b89-2"),
    c: common_vendor.o(_ctx.trigger),
    d: common_vendor.o(_ctx.fabClick),
    e: common_vendor.p({
      pattern: $data.pattern,
      content: $data.content,
      horizontal: _ctx.horizontal,
      vertical: _ctx.vertical,
      direction: _ctx.direction
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "C:/Users/SundayV/Documents/HBuilderProjects/myApp/pages/activities/activities.vue"]]);
wx.createPage(MiniProgramPage);
