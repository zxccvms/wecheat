
require(process.cwd() + '/models/db.js')

// 设置数据模型
const model = db.model('article',{
	title:{type:String},
	author:{type: String},
    date:{type:String},
    img:{type:String,default:"http://localhost:8888/img/art.png"}
})

// 清空数据
model.deleteMany({}, (err) => {
    if (err) {
        console.log('articles delete err')
        console.log(err)
        return
    }
    console.log('articles delete success')
}) 

// 测试数据
var insertObj = new model({title:'标题1',author:'杭州发布',date:'2017-3-1',img:'http://localhost:8888/img/art.png'})
insertObj.save() 
var insertObj = new model({title:'标题2',author:'杭州日报',date:'2017-3-1',img:'http://localhost:8888/img/art.png'})
insertObj.save() 
var insertObj = new model({title:'标题3',author:'杭州发布',date:'2017-3-1',img:'http://localhost:8888/img/art.png'})
insertObj.save() 
var insertObj = new model({title:'标题4',author:'杭州日报',date:'2017-3-1',img:'http://localhost:8888/img/art.png'})
insertObj.save() 
var insertObj = new model({title:'标题5',author:'杭州发布',date:'2017-3-1',img:'http://localhost:8888/img/art.png'})
insertObj.save() 
var insertObj = new model({title:'标题6',author:'直播',date:'2017-3-1',img:'http://localhost:8888/img/art.png'})
insertObj.save() 
var insertObj = new model({title:'标题7',author:'杭州日报',date:'2017-3-1',img:'http://localhost:8888/img/art.png'})
insertObj.save() 
var insertObj = new model({title:'标题8',author:'直播',date:'2017-3-1',img:'http://localhost:8888/img/art.png'})
insertObj.save() 
var insertObj = new model({title:'标题9',author:'直播',date:'2017-2-1',img:'http://localhost:8888/img/art.png'})
insertObj.save() 
var insertObj = new model({title:'标题10',author:'杭州日报',date:'2017-3-1',img:'http://localhost:8888/img/art.png'})
insertObj.save() 
var insertObj = new model({title:'标题11',author:'杭州发布',date:'2017-6-4',img:'http://localhost:8888/img/art.png'})
insertObj.save((err) => {
    if (err) {
        console.log('articles insert err')
        console.log(err)
        return
    }
    console.log('articles insert success')
    db.close()
}) 
