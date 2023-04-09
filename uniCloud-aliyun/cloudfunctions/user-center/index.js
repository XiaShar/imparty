'use strict';
const uniID = require('uni-id')
exports.main = async (event, context) => {
	
	const uniIDIns = uniID.createInstance({ // 创建uni-id实例，其上方法同uniID
	    context: context,
	    config: {} // 完整uni-id配置信息，使用config.json进行配置时无需传此参数
	  })
	
	let res = {};
	let params = {};
	params = event.params;
	let release = ['register','login','logout'];
	if(release.indexOf(event.action)===-1){
		if(!event.uniIdToken){
			res = {
				code:740,
				msg:"缺少token"
			}
			return res;
		}
		let users_check = await uniID.checkToken(event.uniIdToken);
		if(users_check.code===0){
			params.uid = users_check.uid;
		}else{
			res = users_check;
			return res;
		}
	}
	
	switch(event.action){
		case 'register':{
			const {username,password} = params;
			res = await uniID.register({username,password});
			break;
		}
		case 'login':{
			const {username,password} = params;
			res = await uniID.login({username,password,queryField: ['username', 'email', 'mobile']});
			break;
		}
		case 'logout':{
			res = await uniID.logout(event.uniIdToken);
			break;
		}
		case 'getUserInfo':{
			const {uid} = params;
			res = await uniID.getUserInfo({uid});
			break;
		}
		case 'changePwd':{
			const {uid,oldPassword,newPassword} = params;
			res = await uniID.updatePwd({uid,oldPassword,newPassword})
			break;
		}
		case 'changeAvatar':{
			const {uid,avatar} = params;
			res = await uniID.setAvatar({uid,avatar});
			break;
		}
		case 'changeNickname':{
			const {nickname,uid} = params;
			res = await uniID.updateUser({uid,nickname});
			break;
		}
		default:{
			res = {
				code:741,
				msg:"请求非法"
			}
		}
		
	}
	
	
	return res
};
