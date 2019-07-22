let usersList = []
//监听客户端连接
io.on('connection', function(socket) {
	//连接记录信息
	socket.on('login', function(userInfo) {
		io.to(socket.id).emit('usersList', usersList); //向登陆的用户发送全体用户信息
		userInfo.id = socket.id
		let flag = true;
		for (let user in usersList) { //覆盖失效用户信息
			if (usersList[user].uid == userInfo.uid) {
				usersList[user] = userInfo;
				flag = null;
				break;
			}
		}
		flag && usersList.push(userInfo); //用户信息不存在向列表中添加
		io.emit('loginInfo', userInfo); //向全体用户发送登陆用户信息
	})

	//接受客户端推送数据
	socket.on('send', function(data) {
		//推送数据给指定用户
		io.to(data.target).emit('response',{
			content:data.content,//发送的内容
			source:data.source//发送源(浏览器ID)
		});
	});
	socket.on('disconnect', function () { // 断开连接的用户
		for (let user in usersList) { //覆盖失效用户信息
			if (usersList[user].id == socket.id) {
				console.log(usersList[user])
				io.emit('close', usersList[user]);
				usersList.splice(user,1)
				break;
			}
		}
  });
});
