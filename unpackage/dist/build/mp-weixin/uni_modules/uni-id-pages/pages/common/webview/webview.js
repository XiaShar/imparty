"use strict";const t=require("../../../../../common/vendor.js"),e={onLoad({url:e,title:n}){"http"!=e.substring(0,4)?(t.index.showModal({title:"错误",content:'不是一个有效的网站链接,"'+e+'"',showCancel:!1,confirmText:"知道了",complete:()=>{t.index.navigateBack()}}),n="页面路径错误"):this.url=e,n&&t.index.setNavigationBarTitle({title:n})},data:()=>({url:null})};const n=t._export_sfc(e,[["render",function(e,n,r,i,o,l){return t.e({a:o.url},o.url?{b:o.url}:{})}]]);wx.createPage(n);
