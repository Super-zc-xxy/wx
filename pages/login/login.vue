<template>
	<view class="login">
		<!-- 登录 -->
		<view class="lg_main" v-show="login">
			<!-- logo -->
			<view class="loginicon"><image src="../../static/loginicon.jpg" mode=""></image></view>
			<view class="lg_main_title">
				用户登录
			</view>
			<!-- 用户名 -->
			<view class="lg_input username">
				<view class="iconfont icon-subscriber-square inputicon"></view>
				<input type="text"  placeholder="请输入用户名" v-model="username"/>
			</view>
			<!-- 密码 -->
			<view class="lg_input password">
				<view class="iconfont icon-mima inputicon" ></view>
				<input type="text"  placeholder="请输入密码" v-model="password"/>
			</view>
			<!-- 按钮 -->
			<view class="lg_input button">
				<view class="submit" @click="submit">
					登录
				</view>
				<view class="regist" @click="regist">
					注册
				</view>
			</view>
			<!-- 勾选 -->
			<view class="lg_input radio">
				<checkbox :checked="ckstate" @click="checkbox">已阅读第三方规则，用户已了解相关法律责任！</checkbox>
			</view>
		</view>
		<!-- 注册 -->
		<view class="lg_main" v-show="regist1">
			<!-- logo -->
			<view class="loginicon"><image src="../../static/loginicon.jpg" mode=""></image></view>
			<view class="lg_main_title">
				用户注册
			</view>
			<!-- 用户名 -->
			<view class="lg_input username">
				<view class="iconfont icon-subscriber-square inputicon"></view>
				<input type="text"  placeholder="请输入用户名" v-model="re_username"/>
			</view>
			<!-- 密码 -->
			<view class="lg_input password">
				<view class="iconfont icon-mima inputicon" ></view>
				<input type="text"  placeholder="请输入密码" v-model="re_password"/>
			</view>
			<!-- 按钮 -->
			<view class="lg_input button">
				<view class="submit" @click="re_submit">
					登录
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				username:'',
				password:'',
				ckstate:false,
				login:true,
				regist1:false,
				re_password:'',
				re_username:''
			}
		},
		methods: {
			submit(){
				if(this.ckstate == false && this.username == "" && this.password == ""){
					uni.showToast({
						title:'请阅读相关条例'
					})
				}
				if( this.username != "" && this.password != ""){
					this.$request('login',{
						name:this.username,
						pw:this.password
					}).then((res)=>{
						console.log(res);
						uni.setStorage({
							key:'token',
							data:res.data.token
						})
					});
					uni.navigateBack({
						delta:2
					})
				}
			},
			checkbox(){
				this.ckstate = !this.ckstate;
			},
			regist(){
				this.login = false;
				this.regist1 = true
			},
			re_submit(){
				if(this.re_username != "" && this.re_password != ""){
					this.$request('register',{
						name:this.re_username,
						pw:this.re_password,
						type:2
					}).then((res)=>{
						console.log(res);
					})
					this.login = true;
					this.regist1 = false
				}else{
					uni.showToast({
						title:'请填写正确的用户名和密码'
					})
				}
			},
		}
	}
</script>

<style>
	.regist{
		padding: 20rpx 60rpx;
		color: white;
		background:#cfd6ff;
		border-radius:20rpx ;
		margin-left: 60rpx;
	}
	.button{
		display: flex;
		justify-content: center !important;
	}
	.submit{
		padding: 20rpx 60rpx;
		color: white;
		background:#007AFF;
		border-radius:20rpx ;
	}
	.radio>checkbox{
		font-size: 25rpx;
		transform: scale(0.9);
	}
	.password>input{
		height: 2em;
		width: 16em;
	}
	.inputicon{
		font-size: 2em;
	}
	.username>input{
		height: 2em;
		width: 16em;
	}
	.lg_input{
		width: 100%;
		height: 100rpx;
		margin: 20rpx 0;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	.lg_main_title{
		width: 100%;
		height: 100rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 40rpx;
		/* color: white; */
	}
	.loginicon>image{
		width: 400rpx;
		height: 300rpx;
		border-radius: 40rpx;
	}
	.loginicon{
		width: 100%;
		height: 400rpx;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.lg_main{
		width: 80%;
		height: 60%;
		/* position: fixed; */
	}
	.login{
		width: 100%;
		min-width: 100vw;
		min-height: 100vh;
		display: flex;
		justify-content: center;
		align-items: center;
	}
</style>
