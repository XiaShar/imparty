'use strict';
const db = uniCloud.database(); //代码块为cdb
const RegDataTable = db.collection('registerData')
exports.main = async (event, context) => {
	//event为客户端上传的参数
  // return {a:await RegDataTable.where({_id:event.formobj._id}).get()}
  let temp = await RegDataTable.where({userId:event.formobj.userId}).get()
  if(temp.affectedDocs){
    return {isIn:"ALREADYEXIST"}
  }else{
    await RegDataTable.add(event.formobj)
    return {isIn:"ADDSUCESS"}
  }
};
