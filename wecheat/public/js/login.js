! function() {
	class btnClick {
		constructor() {
			this.onoff = true //根据此布尔值判断当前为注册状态还是登录状态
			this.$confirm = $(".confirm")//注册的额外两个输入框
			this.$status = $('#status i')//登陆框的title
			this.$name_c = $("#title")//左侧title
			this.$loginBtn=$('.login')//登陆按钮
			this.$regBtn=$('.reg')//注册按钮
			this.$hit = $("#hint")//状态框
			this.time=0;
			this.init()
		}
		init() {
			this.tilte()//左侧标题居中
			this.$loginBtn.on('click',()=>{
				this.login()//登陆
			})
			this.$regBtn.on('click',()=>{
				this.signin()//注册
			})
		}
		tilte(){//左侧标题居中
			let name = this.$name_c.html().split("")
			for (var i = 0, str = ''; i < name.length; i++)
				if (name[i] != ",")
					str += `<i>${name[i]}</i>`
			this.$name_c.html(str)
		}
		signin() { //注册
			if (this.onoff) {//登陆页面点击注册按钮
				this.$confirm.css('height','51px')
				this.$status.eq(0).css('top','35px')
				this.$status.eq(1).css('top',0)
				this.onoff = !this.onoff
			} else {
				if($('#password').val()!=$('#confirm-passwd').val())
					return this.hint('两次密码不一致')
				$.ajax({
					url: '/api/user/reg',
					data: {
						email: $('#email').val(),
						name:$('#name').val(),
						password: $('#password').val()
					}
				}).then(res => {
					if(res.meta.state==201){
						this.login()
					}
					this.hint(res.meta.msg)
				})
			}
		}
		login() {//登陆
			if (this.onoff) {
				$.ajax({
					type: 'post',
					url: '/api/user',
					data: {
						email: $('#email').val(),
						password: $('#password').val()
					}
				}).then(res => {
					if(res.meta.state==200){
						localStorage.setItem('name',res.data[0].name)
						localStorage.setItem('uid',res.data[0]._id)
						localStorage.setItem('imgUrl',res.data[0].imgUrl)
						setTimeout(()=>{
							location.href='/'
						},2000)
					}
					this.hint(res.meta.msg)
				})
			} else {//注册页面点击登陆按钮
				this.$confirm.css('height',0)
				this.$status.eq(0).css('top',0)
				this.$status.eq(1).css('top','35px')
				this.onoff = !this.onoff
			}
		}
		hint(content) { //弹框提示
			this.$hit.find('p').html(content)
			clearTimeout(this.time)
			this.$hit.css('opacity',1)
			this.time=setTimeout(()=>{
				this.$hit.css('opacity',0)
			}, 2000)
		}
	}
	new btnClick()
}()

