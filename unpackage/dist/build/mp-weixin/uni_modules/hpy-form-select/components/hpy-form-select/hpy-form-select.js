"use strict";const t=require("../../../../common/vendor.js"),e={name:"hpy-form-select",emits:["click","update:modelValue","input","change"],model:{prop:"modelValue",event:"update:modelValue"},props:{islot:{type:[Boolean,String],default:!1},title:{type:String,default:"请选择"},mode:{type:String,default:"selector"},start:{type:String,default:""},end:{type:String,default:""},fields:{type:String,default:"day"},customItem:{type:String,default:""},dataList:{type:Array,default:function(){return[]}},text:{type:String,default:""},name:{type:String,default:""},value:{type:[String,Number],default:()=>""},modelValue:{type:[String,Number],default:()=>""},disabled:{type:[Boolean,String],default:!1},hideBorder:{type:[Boolean,String],default:!1},hideArrow:{type:[Boolean,String],default:!1}},data:()=>({range:[],selectValue:""}),created(){this.dataList&&0!==this.dataList.length&&(this.range=this.getDataList(this.dataList)),this.form=this.getForm("uniForms"),this.formItem=this.getForm("uniFormsItem"),this.form&&this.formItem&&this.formItem.name&&(this.is_reset||(this.is_reset=!1,this.formItem.setValue(this.dataValue)),this.rename=this.formItem.name,this.form.inputChildrens.push(this))},watch:{dataList:{handler(t){this.range=this.getDataList(t)},deep:!0},value:{handler(t){this.initSelected(t),this.form&&this.formItem&&!this.is_reset&&(this.is_reset=!1,this.formItem.setValue(t))},immediate:!0},modelValue(t){this.initSelected(t),this.form&&this.formItem&&!this.is_reset&&(this.is_reset=!1,this.formItem.setValue(t))}},computed:{dataValue(){return""===this.value?this.modelValue:(this.modelValue,this.value)},selectText(){return""===this.selectValue?this.title:"date"==this.mode||"time"==this.mode?this.selectValue:this.dataList&&0!=this.dataList.length?this.text?this.dataList[this.selectValue][this.text]:this.dataList[this.selectValue]:this.title}},methods:{getForm(t="uniForms"){let e=this.$parent,i=e.$options.name;for(;i!==t;){if(e=e.$parent,!e)return!1;i=e.$options.name}return e},getDataList(t){let e=JSON.parse(JSON.stringify(t));return this.initSelected(this.dataValue),e},initSelected(t){if(!t)return this.selectValue="",!1;"date"==this.mode||"time"==this.mode?this.selectValue=t:this.dataList.length>0&&(this.name?this.dataList.some(((e,i)=>{if(e[this.name]==t)return this.selectValue=i,!0})):this.dataList.some(((e,i)=>{if(e==t)return this.selectValue=i,!0})))},chagne(t){const e=t.detail.value;this.selectValue=e;var i="",s="";if("date"==this.mode||"time"==this.mode)i=e,s=e;else if(this.dataList&&this.dataList.length>0){let t=this.dataList[e];s={index:e,value:i=this.name?t[this.name]:t,data:t}}else this.selectValue="",s={index:-1,value:i,data:{}};this.formItem&&this.formItem.setValue(i),this.$emit("input",i),this.$emit("update:modelValue",i),this.$emit("change",s)}}};const i=t._export_sfc(e,[["render",function(e,i,s,a,l,r){return t.e({a:s.islot},s.islot?{}:{b:t.t(r.selectText),c:t.n(""===l.selectValue?"default":""),d:t.n(s.hideBorder?"":"select-picker-border")},{e:s.mode,f:t.o(((...t)=>r.chagne&&r.chagne(...t))),g:l.selectValue,h:l.range,i:s.text,j:s.start,k:s.end,l:s.fields,m:s.customItem,n:s.disabled})}],["__scopeId","data-v-6c0b3a80"]]);wx.createComponent(i);
