!function(){
	class create{//登陆页面渲染
		constructor() {
			this.usersList=[]//其他用户列表
			this.userID=null//自己浏览器编号
			this.uid=localStorage.getItem('uid'),//用户ID
			//连接服务端
			this.socket = io('http://localhost:4001');//连接聊天服务器
			this.init()
		}
		init(){
			this.login();//向服务器发送登陆信息
			this.getLoginInfo();//得到登陆用户的信息
			this.getUsersList();//得到其他全部用户信息
			this.getCloseUser();//得到离线用户的信息
		}
		login(){//向服务器发送登陆信息
			this.socket.emit('login', {
				uid:this.uid,
				name:localStorage.getItem('name'),
				imgUrl:''
			});
		}
		getLoginInfo(){//得到登陆用户的信息
			this.socket.on('loginInfo', userInfo=>{
				if(!this.userID) return this.userID=userInfo.id//获取自己的ID
				// for (var user in this.usersList) { //覆盖其他用户的失效信息
				// 	if (this.usersList[user].uid == userInfo.uid) {
				// 		this.usersList[user]=userInfo
				// 		return $('.chat').eq(user).attr('bid',userInfo.id)
				// 	}
				// }
				this.createPeople(this.usersList.push(userInfo)-1,userInfo)//追加用户列表
			});
		}
		getUsersList(){//得到其他全部用户信息
			this.socket.on('usersList', usersInfo=>{
				for (let user in usersInfo) { //覆盖自己的失效信息
					if (usersInfo[user].uid == this.uid) {
						usersInfo.splice(user,1)
						break;
					}
				}
				this.usersList=usersInfo//获取其他用户信息
				this.createPeople()//渲染用户列表
			});
		}
		getCloseUser(){//得到离线的用户
			this.socket.on('close', userInfo=>{
				for (var user in this.usersList) { //覆盖其他用户的失效信息
					if (this.usersList[user].uid == userInfo.uid) {
						this.usersList.splice([user],1)
						$('.person').eq(user).remove()
						return $('.chat').eq(user).remove()
					}
				}
				// this.createPeople(this.usersList.push(userInfo)-1,userInfo)//追加用户列表
			});
		}
		createPeople(index,value){//渲染用户列表
			var ele=value?this.peopleEle(index,value):'';
			!value&&$.each(this.usersList,(index,value)=>{//循环遍历渲染
				ele+=this.peopleEle(index,value)
			})
			value?$('.people').append(ele):$('.people').html(ele);
			this.createCheat(index,value)//渲染聊天列表
		}
		createCheat(index,value){//渲染聊天列表
			var ele=value?this.cheatEle(index,value):'';
			!value&&$.each(this.usersList,(index,value)=>{//循环遍历渲染
				ele+=this.cheatEle(index,value)
			})
			value?$('.cheat').append(ele):$('.cheat').html(ele);
		}
		peopleEle(index,value){//用户列表HTML元素
			return `
				<li class="person" bid="${value.id}">
					<img src="./public/img/thomas.jpg" alt="" />
					<span class="name">${value.name}　</span>
					<span class="time"></span>
					<span class="preview"></span>
				</li>
			`
		}
		cheatEle(index,value){//聊天列表HTML元素
			return `
				<div class="chat" bid="${value.id}">
					<div class="conversation-start">
						<span>-待开发时间功能-</span>
					</div>
				</div>
			`
		}
	}
	
	
	
	
	class send{//发送信息
		constructor(create) {
			this.userInfo=create//全部用户信息对象
			this.init()
		}
		init(){
			$('.send').on('click',()=>{
				this.sendMsg()//向服务器发送短信
			})
			$(window).keydown((e)=>{
				if(e.keyCode==13)
					this.sendMsg()//向服务器发送短信
			})
			this.getMsg()//获取服务器的短信
		}
		sendMsg(){//向服务器发送短信
			if(!$('.content').val()) return
			this.userInfo.socket.emit('send', {
				content:$('.content').val(),
				target:	$('.active-chat').attr('bid'),
				source:this.userInfo.userID
			});
			$('.active-chat').append(`<div class="bubble me">${$('.content').val()}</div>`)
			$('.content').val('')
		}
		getMsg(){//获取服务器的短信
			this.userInfo.socket.on('response', data =>{
				const time=new Date();
				$(`.person[bid=${data.source}]`).addClass('await').find('.time').html(time.getHours()+':'+time.getMinutes()).next().html(data.content)
				$(`.chat[bid=${data.source}]`).append(`<div class="bubble you">${data.content}</div>`)
			});
		}
	}
	class tab{//TAB切换
		constructor() {
			this.$peopleList=$('.people')//用户列表
			// this.friends = {
			// 		list: document.querySelector('ul.people'),
			// 		all: document.querySelectorAll('.left .person'),
			// 		name: ''
			// 	}
			// this.chat = {
			// 		container: document.querySelector('.container .right'),
			// 		current: null,
			// 		person: null,
			// 		name: document.querySelector('.container .right .top .name')
			// 	};
			this.init()
		}
		init(){
			var that=this;
			this.$peopleList.on('click','li',function(){
				that.peopleClick(this)
			})
		}
		peopleClick(obj){
			$(obj).addClass('active').removeClass('await').siblings().removeClass('active')//选择相应的用户
			$('.chat').eq($('.people').find('li').index(obj)).addClass('active-chat').siblings().removeClass('active-chat')//选中相应的聊天窗口
			$('.right .name').html($(obj).find('.name').html())//更改聊天窗头部用户名
		}
	}
	let create1=new create()
	new send(create1)
	new tab()
}()