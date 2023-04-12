'use strict';
const db = uniCloud.database(); //代码块为cdb
const RegDataTable = db.collection('registerData')
exports.main = async (event, context) => {
	//event为客户端上传的参数
  // return {a:await RegDataTable.where({_id:event.formobj._id}).get()}
    await RegDataTable.add(event.formobj)
    return ''
};
