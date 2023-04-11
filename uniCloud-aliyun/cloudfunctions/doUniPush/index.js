'use strict';
const uniPush = uniCloud.getPushManager({appId:"__UNI__5DFC08B"}) //注意这里需要传入你的应用appId
exports.main = async (event, context) => {
	return await uniPush.sendMessage({
		"push_clientid": event.pushCliendId, 	//填写上一步在uni-app客户端获取到的客户端推送标识push_clientid
		"title": "通知栏显示的标题",	
		"content": "通知栏显示的内容",
		"payload": {
			"text":"体验一下uni-push2.0"
		}
	})
};
