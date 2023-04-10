'use strict';
const db = uniCloud.database(); //代码块为cdb
// const activities = db.collection("activities")
exports.main = async (event, context) => {
  //event为客户端上传的参数
  console.log('event : ', event)
  return await db.collection("activities").where({
    title: "impart"
  }).get()
  // await db.collection('activities').add({
  //   name: "xia"
  // })
  //返回数据给客户端
  //return event
};