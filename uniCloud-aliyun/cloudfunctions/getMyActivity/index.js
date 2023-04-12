'use strict';
const db = uniCloud.database();

exports.main = async (event, context) => {
	//event为客户端上传的参数
  	let myActId = await db.collection("registerData").where({
		userId: event._id,
	}).get()
	
	
	let res = []
	let temp = []
	for(let i = 0; i < myActId.data.length; i ++){
		temp = await db.collection("activities").where({
			_id: myActId.data[i].activityId
		}).get()
		if(temp.data){
			res.push(temp.data[0])
		}
	}
	return res;
};
