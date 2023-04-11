"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      checked: false,
      // 表单数据
      formData: {
        name: "LiMing",
        email: "dcloud@email.com"
      },
      rules: {
        // 对name字段进行必填验证
        name: {
          rules: [
            {
              required: true,
              errorMessage: "请输入姓名"
            },
            {
              minLength: 3,
              maxLength: 5,
              errorMessage: "姓名长度在 {minLength} 到 {maxLength} 个字符"
            }
          ]
        },
        // 对email字段进行必填验证
        email: {
          rules: [{
            format: "email",
            errorMessage: "请输入正确的邮箱地址"
          }]
        }
      }
    };
  },
  methods: {
    /**
     * 复写 binddata 方法，如果只是为了校验，无复杂自定义操作，可忽略此方法
     * @param {String} name 字段名称
     * @param {String} value 表单域的值
     */
    // binddata(name,value){
    // 通过 input 事件设置表单指定 name 的值
    //   this.$refs.form.setValue(name, value)
    // },
    // 触发提交表单
    submit() {
      this.$refs.form.validate().then((res) => {
        console.log("表单数据信息：", res);
      }).catch((err) => {
        console.log("表单错误信息：", err);
      });
    }
  }
};
if (!Array) {
  const _easycom_uni_easyinput2 = common_vendor.resolveComponent("uni-easyinput");
  const _easycom_uni_forms_item2 = common_vendor.resolveComponent("uni-forms-item");
  const _easycom_uni_forms2 = common_vendor.resolveComponent("uni-forms");
  const _easycom_uni_card2 = common_vendor.resolveComponent("uni-card");
  (_easycom_uni_easyinput2 + _easycom_uni_forms_item2 + _easycom_uni_forms2 + _easycom_uni_card2)();
}
const _easycom_uni_easyinput = () => "../../uni_modules/uni-easyinput/components/uni-easyinput/uni-easyinput.js";
const _easycom_uni_forms_item = () => "../../uni_modules/uni-forms/components/uni-forms-item/uni-forms-item.js";
const _easycom_uni_forms = () => "../../uni_modules/uni-forms/components/uni-forms/uni-forms.js";
const _easycom_uni_card = () => "../../uni_modules/uni-card/components/uni-card/uni-card.js";
if (!Math) {
  (_easycom_uni_easyinput + _easycom_uni_forms_item + _easycom_uni_forms + _easycom_uni_card)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o(($event) => $data.formData.name = $event),
    b: common_vendor.p({
      type: "text",
      placeholder: "请输入姓名",
      modelValue: $data.formData.name
    }),
    c: common_vendor.p({
      label: "姓名",
      name: "name"
    }),
    d: common_vendor.o([($event) => $data.formData.email = $event.detail.value, ($event) => _ctx.binddata("email", $event.detail.value)]),
    e: $data.formData.email,
    f: common_vendor.p({
      label: "邮箱",
      name: "email"
    }),
    g: $data.checked,
    h: common_vendor.o((...args) => $options.submit && $options.submit(...args)),
    i: common_vendor.sr("form", "6565de86-1,6565de86-0"),
    j: common_vendor.p({
      modelValue: $data.formData,
      rules: $data.rules
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-6565de86"], ["__file", "C:/Users/SundayV/Documents/HBuilderProjects/myApp/pages/formPage/formPage.vue"]]);
wx.createPage(MiniProgramPage);
