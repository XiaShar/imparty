"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  components: {},
  data() {
    return {
      //渲染数据
      firstdata: [],
      nowdata: [],
      willdata: [],
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
<<<<<<< HEAD
  mounted() {
    common_vendor.Ls.callFunction({
      name: "detail-activities"
    }).then((res) => {
      this.firstdata = res.result.data;
      for (let i = 0; i < this.firstdata.length; i++) {
        if (this.firstdata[i].isdoing === "now") {
          this.nowdata.push(this.firstdata[i]);
        } else {
          this.willdata.push(this.firstdata[i]);
        }
      }
      console.log(this.nowdata);
      console.log(this.willdata);
      console.log(res.result.data);
    }).catch((err) => {
      console.error(err);
=======
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
>>>>>>> d53ff959617b4b38dfdf7df7be52bcac881d5660
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
<<<<<<< HEAD
    a: common_vendor.f($data.nowdata, (item, index, i0) => {
      return {
        a: common_vendor.t(item.title),
        b: common_vendor.f(item.actag, (itemtag, indextag, i1) => {
          return {
            a: common_vendor.t(itemtag),
            b: indextag
          };
        }),
        c: common_vendor.t(item.ddl),
        d: "0cadd2c0-0-" + i0,
        e: item._id
      };
    }),
    b: common_vendor.f($data.willdata, (item, index, i0) => {
      return {
        a: common_vendor.t(item.title),
        b: common_vendor.f(item.actag, (itemtag, indextag, i1) => {
          return {
            a: common_vendor.t(itemtag),
            b: indextag
          };
        }),
        c: common_vendor.t(item.ddl),
        d: "0cadd2c0-1-" + i0,
        e: item._id
      };
=======
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
>>>>>>> d53ff959617b4b38dfdf7df7be52bcac881d5660
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "C:/Users/SundayV/Documents/HBuilderProjects/myApp/pages/activities/activities.vue"]]);
wx.createPage(MiniProgramPage);
