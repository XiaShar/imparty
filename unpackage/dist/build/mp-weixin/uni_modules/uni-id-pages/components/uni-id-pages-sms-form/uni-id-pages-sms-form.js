"use strict";const e=require("../../../../common/vendor.js");const t={name:"uni-sms-form",model:{prop:"modelValue",event:"update:modelValue"},props:{event:["update:modelValue"],count:{type:[String,Number],default:60},phone:{type:[String,Number],default:""},type:{type:String,default:()=>"login"},focusCaptchaInput:{type:Boolean,default:()=>!1}},data:()=>({captcha:"",reverseNumber:0,reverseTimer:null,modelValue:"",focusSmsCodeInput:!1}),watch:{captcha(e,t){4==e.length&&4!=t.length&&this.start()},modelValue(e){this.$emit("input",e),this.$emit("update:modelValue",e)}},computed:{innerText(){return 0==this.reverseNumber?"获取短信验证码":"重新发送("+this.reverseNumber+"s)"}},created(){this.initClick()},methods:{getImageCaptcha(e){this.$refs.captcha.getImageCaptcha(e)},initClick(){this.start=function(e,t){let s;return t=t||500,function(){let n=this,o=arguments;s&&clearTimeout(s);let i=!s;s=setTimeout((()=>{s=null}),t),i&&e.apply(n,o)}}((()=>{0==this.reverseNumber&&this.sendMsg()}))},sendMsg(){if(4!=this.captcha.length)return this.$refs.captcha.focusCaptchaInput=!0,e.index.showToast({title:"请先输入图形验证码",icon:"none",duration:3e3});if(!/^1\d{10}$/.test(this.phone))return e.index.showToast({title:"手机号格式错误",icon:"none",duration:3e3});const t=e.Ls.importObject("uni-id-co",{customUI:!0});console.log("sendSmsCode",{mobile:this.phone,scene:this.type,captcha:this.captcha}),t.sendSmsCode({mobile:this.phone,scene:this.type,captcha:this.captcha}).then((t=>{e.index.showToast({title:"短信验证码发送成功",icon:"none",duration:3e3}),this.reverseNumber=Number(this.count),this.getCode()})).catch((t=>{"uni-id-invalid-sms-template-id"==t.code?(this.modelValue="123456",e.index.showToast({title:"已启动测试模式,详情【控制台信息】",icon:"none",duration:3e3}),console.warn(t.message)):(this.getImageCaptcha(),this.captcha="",e.index.showToast({title:t.message,icon:"none",duration:3e3}))}))},getCode(){if(0==this.reverseNumber)return clearTimeout(this.reverseTimer),void(this.reverseTimer=null);this.reverseNumber--,this.reverseTimer=setTimeout((()=>{this.getCode()}),1e3)}}};if(!Array){(e.resolveComponent("uni-captcha")+e.resolveComponent("uni-easyinput"))()}Math||((()=>"../../../uni-captcha/components/uni-captcha/uni-captcha.js")+(()=>"../../../uni-easyinput/components/uni-easyinput/uni-easyinput.js"))();const s=e._export_sfc(t,[["render",function(t,s,n,o,i,a){return{a:e.sr("captcha","c9fb6b9d-0"),b:e.o((e=>i.captcha=e)),c:e.p({focus:n.focusCaptchaInput,scene:"send-sms-code",modelValue:i.captcha}),d:e.o((e=>i.focusSmsCodeInput=!1)),e:e.o((e=>i.modelValue=e)),f:e.p({focus:i.focusSmsCodeInput,type:"number",inputBorder:!1,maxlength:"6",clearable:!1,placeholder:"请输入短信验证码",modelValue:i.modelValue}),g:e.t(a.innerText),h:e.n(0==i.reverseNumber?"inner-text-active":""),i:e.o(((...e)=>t.start&&t.start(...e)))}}],["__scopeId","data-v-c9fb6b9d"]]);wx.createComponent(s);
