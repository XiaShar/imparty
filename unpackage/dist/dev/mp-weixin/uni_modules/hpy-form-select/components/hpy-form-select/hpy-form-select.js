"use strict";
const common_vendor = require("../../../../common/vendor.js");
const _sfc_main = {
  name: "hpy-form-select",
  emits: ["click", "update:modelValue", "input", "change"],
  model: {
    prop: "modelValue",
    event: "update:modelValue"
  },
  props: {
    // 是否使用插槽
    islot: {
      type: [Boolean, String],
      default: false
    },
    // 默认标题
    title: {
      type: String,
      default: "请选择"
    },
    // selector 或 multiSelector
    mode: {
      type: String,
      default: "selector"
    },
    // 表示有效日期范围的开始，字符串格式为"YYYY-MM-DD"
    start: {
      type: String,
      default: ""
    },
    // 表示有效日期范围的结束，字符串格式为"YYYY-MM-DD"
    end: {
      type: String,
      default: ""
    },
    // 有效值 year、month、day，表示选择器的粒度，默认为 day，App 端未配置此项时使用系统 UI
    fields: {
      type: String,
      default: "day"
    },
    // 可为每一列的顶部添加一个自定义的项
    customItem: {
      type: String,
      default: ""
    },
    // 下拉选择的数据
    dataList: {
      type: Array,
      default: function() {
        return [];
      }
    },
    // 指定显示值的key
    text: {
      type: String,
      default: ""
    },
    // 实际值的key
    name: {
      type: String,
      default: ""
    },
    // 保存值
    value: {
      type: [String, Number],
      default() {
        return "";
      }
    },
    // TODO vue3
    modelValue: {
      type: [String, Number],
      default() {
        return "";
      }
    },
    // 是否禁用
    disabled: {
      type: [Boolean, String],
      default: false
    },
    // 是否隐藏边框
    hideBorder: {
      type: [Boolean, String],
      default: false
    },
    // 是否隐藏箭头
    hideArrow: {
      type: [Boolean, String],
      default: false
    }
  },
  data() {
    return {
      range: [],
      selectValue: ""
    };
  },
  created() {
    if (this.dataList && this.dataList.length !== 0) {
      this.range = this.getDataList(this.dataList);
    }
    this.form = this.getForm("uniForms");
    this.formItem = this.getForm("uniFormsItem");
    if (this.form && this.formItem) {
      if (this.formItem.name) {
        if (!this.is_reset) {
          this.is_reset = false;
          this.formItem.setValue(this.dataValue);
        }
        this.rename = this.formItem.name;
        this.form.inputChildrens.push(this);
      }
    }
  },
  watch: {
    dataList: {
      handler(newVal) {
        this.range = this.getDataList(newVal);
      },
      deep: true
    },
    value: {
      handler(newVal) {
        this.initSelected(newVal);
        if (this.form && this.formItem && !this.is_reset) {
          this.is_reset = false;
          this.formItem.setValue(newVal);
        }
      },
      immediate: true
    },
    modelValue(newVal) {
      this.initSelected(newVal);
      if (this.form && this.formItem && !this.is_reset) {
        this.is_reset = false;
        this.formItem.setValue(newVal);
      }
    }
  },
  computed: {
    dataValue() {
      if (this.value === "")
        return this.modelValue;
      if (this.modelValue === "")
        return this.value;
      return this.value;
    },
    selectText() {
      if (this.selectValue === "") {
        return this.title;
      }
      if ("date" == this.mode || "time" == this.mode) {
        return this.selectValue;
      } else {
        if (!this.dataList || this.dataList.length == 0) {
          return this.title;
        }
        if (this.text) {
          return this.dataList[this.selectValue][this.text];
        }
        return this.dataList[this.selectValue];
      }
    }
  },
  methods: {
    getForm(name = "uniForms") {
      let parent = this.$parent;
      let parentName = parent.$options.name;
      while (parentName !== name) {
        parent = parent.$parent;
        if (!parent)
          return false;
        parentName = parent.$options.name;
      }
      return parent;
    },
    /**
     * 获取渲染的新数组
     */
    getDataList(value) {
      let dataList = JSON.parse(JSON.stringify(value));
      this.initSelected(this.dataValue);
      return dataList;
    },
    // 初始化选中值
    initSelected(value) {
      if (!value) {
        this.selectValue = "";
        return false;
      }
      if ("date" == this.mode || "time" == this.mode) {
        this.selectValue = value;
      } else {
        if (this.dataList.length > 0) {
          if (this.name) {
            this.dataList.some((item, index) => {
              if (item[this.name] == value) {
                this.selectValue = index;
                return true;
              }
            });
          } else {
            this.dataList.some((item, index) => {
              if (item == value) {
                this.selectValue = index;
                return true;
              }
            });
          }
        }
      }
    },
    // 选择
    chagne(e) {
      const val = e.detail.value;
      this.selectValue = val;
      var inputVal = "", changeVal = "";
      if ("date" == this.mode || "time" == this.mode) {
        inputVal = val;
        changeVal = val;
      } else {
        if (this.dataList && this.dataList.length > 0) {
          let data = this.dataList[val];
          if (this.name) {
            inputVal = data[this.name];
          } else {
            inputVal = data;
          }
          changeVal = { "index": val, "value": inputVal, "data": data };
        } else {
          this.selectValue = "";
          changeVal = { "index": -1, "value": inputVal, "data": {} };
        }
      }
      if (this.formItem) {
        this.formItem.setValue(inputVal);
      }
      this.$emit("input", inputVal);
      this.$emit("update:modelValue", inputVal);
      this.$emit("change", changeVal);
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $props.islot
  }, $props.islot ? {} : {
    b: common_vendor.t($options.selectText),
    c: common_vendor.n($data.selectValue === "" ? "default" : ""),
    d: common_vendor.n($props.hideBorder ? "" : "select-picker-border")
  }, {
    e: $props.mode,
    f: common_vendor.o((...args) => $options.chagne && $options.chagne(...args)),
    g: $data.selectValue,
    h: $data.range,
    i: $props.text,
    j: $props.start,
    k: $props.end,
    l: $props.fields,
    m: $props.customItem,
    n: $props.disabled
  });
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-4c54e7cd"], ["__file", "C:/Users/86183/Desktop/hbuilder/Git/uni_modules/hpy-form-select/components/hpy-form-select/hpy-form-select.vue"]]);
wx.createComponent(Component);
