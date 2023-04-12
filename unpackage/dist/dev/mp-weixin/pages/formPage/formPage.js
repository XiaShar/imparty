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
        phone: uni_modules_uniIdPages_common_store.store.userInfo.phone,
        sign: "",
        goalGender: "",
        goalSchool: ""
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
        gender: {
          rules: [{
            required: true,
            errorMessage: "请选择您的性别"
          }]
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
        school: {
          rules: [
            {
              format: "string",
              errorMessage: "请正确填写邮箱"
            },
            {
              required: true,
              errorMessage: "请填写您的学院"
            }
          ]
        }
      },
      sexs: [{
        text: "男",
        value: "男"
      }, {
        text: "女",
        value: "女"
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
    submit(ref) {
      this.$refs[ref].validate((err, value) => {
        console.log(123);
        console.log(this.dynamicFormData);
        common_vendor.Ls.callFunction({
          name: "commitForm",
          data: { formobj: this.dynamicFormData }
        });
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
    j: common_vendor.o(($event) => $data.dynamicFormData.phone = $event),
    k: common_vendor.p({
      inputBorder: false,
      clearSize: 20,
      styles: {
        backgroundColor: "#f5f5f5"
      },
      clearable: false,
      modelValue: $data.dynamicFormData.phone
    }),
    l: common_vendor.p({
      label: "手机号",
      name: "phone"
    }),
    m: common_vendor.o(($event) => $data.dynamicFormData.sign = $event),
    n: common_vendor.p({
      inputBorder: false,
      clearSize: 20,
      styles: {
        backgroundColor: "#f5f5f5"
      },
      clearable: false,
      modelValue: $data.dynamicFormData.sign
    }),
    o: common_vendor.p({
      label: "星座",
      name: "sign"
    }),
    p: common_vendor.o(($event) => $data.dynamicFormData.goalGender = $event),
    q: common_vendor.p({
      dataList: $data.sexs,
      text: "text",
      name: "value",
      ["hide-border"]: true,
      modelValue: $data.dynamicFormData.goalGender
    }),
    r: common_vendor.p({
      label: "对方性别",
      name: "goalGender"
    }),
    s: common_vendor.o(($event) => $data.dynamicFormData.goalSchool = $event),
    t: common_vendor.p({
      dataList: $data.schools,
      text: "text",
      name: "value",
      ["hide-border"]: true,
      modelValue: $data.dynamicFormData.goalSchool
    }),
    v: common_vendor.p({
      label: "对方学院",
      name: "goalSchool"
    }),
    w: common_vendor.sr("dynamicForm", "6d7603c9-0"),
    x: common_vendor.p({
      rules: $data.dynamicRules,
      model: $data.dynamicFormData,
      ["label-position"]: "top"
    }),
    y: common_vendor.o(($event) => $options.submit("dynamicForm"))
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "C:/Users/SundayV/Documents/HBuilderProjects/myApp/pages/formPage/formPage.vue"]]);
wx.createPage(MiniProgramPage);
