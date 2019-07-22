// 设置数据模型
const model = db.model('article',{
	title:{type:String},
	author:{type: String},
    date:{type:String},
    img:{type:String,default:"http://localhost:8888/img/art.png"}
})

// 文章列表
const getList = (callbak) => {
    model.find({}, {}, (err, result) => {
        if (err) {
            callbak(err)
            return
        }
        callbak(null, result)
    })
} 

module.exports = {
    getList
}