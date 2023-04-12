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
      }
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
    }
  },
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
        d: common_vendor.o(($event) => $options.showDetail(item), item._id),
        e: "58407b89-0-" + i0,
        f: item._id
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
        d: common_vendor.o(($event) => $options.showDetail(item), item._id),
        e: "58407b89-1-" + i0,
        f: item._id
      };
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "C:/Users/SundayV/Documents/HBuilderProjects/myApp/pages/activities/activities.vue"]]);
wx.createPage(MiniProgramPage);
