"use strict";
const common_vendor = require("../../common/vendor.js");
const uni_modules_uniIdPages_common_store = require("../../uni_modules/uni-id-pages/common/store.js");
require("../../uni_modules/uni-id-pages/config.js");
common_vendor.Ls.importObject("uni-id-co");
const _sfc_main = {
  data() {
    return {
      // 数据源
      dynamicFormData: {
        name: uni_modules_uniIdPages_common_store.store.userInfo.nickname,
        gender: uni_modules_uniIdPages_common_store.store.userInfo.gender,
        school: uni_modules_uniIdPages_common_store.store.userInfo.school,
        birthday: "",
        phone: uni_modules_uniIdPages_common_store.store.userInfo.phone,
        email: uni_modules_uniIdPages_common_store.store.userInfo.email
      },
      // 规则
      dynamicRules: {
        name: {
          rules: [
            {
              required: true,
              errorMessage: "姓名不能为空"
            },
            {
              format: "string",
              errorMessage: "请正确填写姓名"
            }
          ]
        },
        phone: {
          rules: [
            {
              required: true,
              errorMessage: "手机号不能为空"
            },
            {
              format: "string",
              errorMessage: "请正确填写手机号"
            }
          ]
        },
        email: {
          rules: [
            {
              format: "email",
              errorMessage: "请正确填写邮箱"
            }
          ]
        }
      },
      sexs: [{
        text: "男",
        value: 1
      }, {
        text: "女",
        value: 2
      }],
      schools: [{
        text: "计算机学院",
        value: "计算机学院"
      }, {
        text: "新闻与传播学院",
        value: "新闻与传播学院"
      }]
    };
  },
  methods: {
    logout() {
      common_vendor.index.navigateBack();
      uni_modules_uniIdPages_common_store.mutations.logout();
    },
    submit(ref) {
      uni_modules_uniIdPages_common_store.mutations.updateUserInfo({
        nickname: this.dynamicFormData.name,
        gender: this.dynamicFormData.gender,
        school: this.dynamicFormData.school
      });
    },
    updatePhone() {
      common_vendor.index.navigateTo({
        url: "/uni_modules/uni-id-pages/pages/userinfo/bind-mobile/bind-mobile"
      });
    }
  }
};
if (!Array) {
  const _easycom_uni_easyinput2 = common_vendor.resolveComponent("uni-easyinput");
  const _easycom_uni_forms_item2 = common_vendor.resolveComponent("uni-forms-item");
  const _easycom_hpy_form_select2 = common_vendor.resolveComponent("hpy-form-select");
  const _easycom_uni_forms2 = common_vendor.resolveComponent("uni-forms");
  (_easycom_uni_easyinput2 + _easycom_uni_forms_item2 + _easycom_hpy_form_select2 + _easycom_uni_forms2)();
}
const _easycom_uni_easyinput = () => "../../uni_modules/uni-easyinput/components/uni-easyinput/uni-easyinput.js";
const _easycom_uni_forms_item = () => "../../uni_modules/uni-forms/components/uni-forms-item/uni-forms-item.js";
const _easycom_hpy_form_select = () => "../../uni_modules/hpy-form-select/components/hpy-form-select/hpy-form-select.js";
const _easycom_uni_forms = () => "../../uni_modules/uni-forms/components/uni-forms/uni-forms.js";
if (!Math) {
  (_easycom_uni_easyinput + _easycom_uni_forms_item + _easycom_hpy_form_select + _easycom_uni_forms)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o(($event) => $data.dynamicFormData.name = $event),
    b: common_vendor.p({
      inputBorder: false,
      clearSize: 20,
      styles: {
        backgroundColor: "#f5f5f5"
      },
      clearable: false,
      modelValue: $data.dynamicFormData.name
    }),
    c: common_vendor.p({
      label: "姓名",
      name: "name"
    }),
    d: common_vendor.o(($event) => $data.dynamicFormData.gender = $event),
    e: common_vendor.p({
      dataList: $data.sexs,
      text: "text",
      name: "value",
      ["hide-border"]: true,
      modelValue: $data.dynamicFormData.gender
    }),
    f: common_vendor.p({
      label: "性别",
      name: "gender"
    }),
    g: common_vendor.o(($event) => $data.dynamicFormData.school = $event),
    h: common_vendor.p({
      dataList: $data.schools,
      text: "text",
      name: "value",
      ["hide-border"]: true,
      modelValue: $data.dynamicFormData.school
    }),
    i: common_vendor.p({
      label: "学院",
      name: "school"
    }),
    j: common_vendor.o(($event) => $data.dynamicFormData.birthday = $event),
    k: common_vendor.p({
      mode: "date",
      start: "1900-01-01",
      end: "2010-12-31",
      ["hide-border"]: true,
      modelValue: $data.dynamicFormData.birthday
    }),
    l: common_vendor.p({
      label: "生日",
      name: "birthday"
    }),
    m: common_vendor.t($data.dynamicFormData.phone),
    n: common_vendor.o(($event) => $options.updatePhone()),
    o: common_vendor.p({
      label: "手机号",
      name: "phone"
    }),
    p: common_vendor.o(($event) => $data.dynamicFormData.email = $event),
    q: common_vendor.p({
      inputBorder: false,
      styles: {
        backgroundColor: "#f5f5f5"
      },
      clearable: false,
      modelValue: $data.dynamicFormData.email
    }),
    r: common_vendor.p({
      label: "邮箱",
      name: "email"
    }),
    s: common_vendor.sr("dynamicForm", "19e7f49e-0"),
    t: common_vendor.p({
      rules: $data.dynamicRules,
      model: $data.dynamicFormData,
      ["label-position"]: "top"
    }),
    v: common_vendor.o(($event) => $options.submit("dynamicForm")),
    w: common_vendor.o(($event) => $options.logout())
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "C:/Users/SundayV/Documents/HBuilderProjects/myApp/pages/profile/editingView.vue"]]);
wx.createPage(MiniProgramPage);
