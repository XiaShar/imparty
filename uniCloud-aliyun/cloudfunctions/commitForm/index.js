'use strict';
const db = uniCloud.database(); //代码块为cdb
const verifyCodes = db.collection('registerData')
exports.main = async (event, context) => {
	//event为客户端上传的参数
	
	
	//返回数据给客户端
	return event
};
