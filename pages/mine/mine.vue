<template>
	<view class="people">
		<!-- 这是登录头部 -->
		<view class="pp_header">
			<view class="header_icon"></view>
			<view class="header_login" @click="login">
				登录/注册
			</view>
			<view class="iconfont icon-xiaoxi header_xx">
			</view>
			<view class="iconfont icon-chilun header_cl">
			</view>
		</view>
		<!-- 福利 -->
		<view class="pp_gift">
			<view class="gift_p">官方6大免费福利，限量领取<view class="iconfont icon-jiantou1 jiantou"></view></view>
			<view class="iconfont icon-cuowu cuowu"></view>
		</view>
		<!-- 订单 -->
		<view class="PP_dd">
			<!-- 订单头部 -->
			<view class="dd_header">
				<view class="dd_header_p">我的订单</view>
				<view class="dd_header_al">
					查看全部<view class="iconfont icon-jiantou1 jiantou"></view>
				</view>
			</view>
			<!-- 订单内容 -->
			<view class="dd_main">
				<view v-for="(item,index) in dddata" :key="index" class="dd_main_info" @click="dingdan(index)">
					<view class="dd_main-num" v-show="ddnum2">{{ddnum}}</view>
					<view :class="`iconfont ${item.icon} dd_main_info_logo`"></view>
					<view class="dd_main_p">{{item.name}}</view>
				</view>
			</view>
		</view>
		<!--  常用工具-->
		<view class="pp_cy">
			 <view class="cy_title"><view class="cy_title_p">常用工具</view></view>
			 <view class="cy_fl">
			 	<view v-for="(item,index) in cydata" :key="index" class="cy_lr" @click="tz(index)">
					<view :class="`iconfont ${item.icon} cy_lr_icon`">
					</view>
					<view class="cy_lr_name">
						{{item.name}}
					</view>
			 	</view>
				<view style="clear: both;"></view>
			 </view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// 常用工具数据
				cydata:[
					{icon:'icon-erji',name:'发布任务'},
					{icon:'icon-bi',name:'已发布订单'},
					{icon:'icon-03',name:'我的收藏'},
					{icon:'icon-xiangziguanbi',name:'专利够买'},
					{icon:'icon-thin-_bullet_lis',name:'商标成功率'},
					{icon:'icon-passidzhucedianhua',name:'免费核名'},
					{icon:'icon-chakan',name:'注册公司'},
					{icon:'icon-hanhan-01-01',name:'专利免费查'},
					{icon:'icon-banquan',name:'版权免费查'},
					{icon:'icon-HNTE',name:'高企测评'},
					{icon:'icon-xinbaniconshangchuan-',name:'代账工具'},
					{icon:'icon-hetong',name:'电子合同'},
				],
				// 订单数据
				dddata:[
					{icon:'icon-daifukuan',name:'代付款'},
					{icon:'icon-diannao',name:'进行中'},
					{icon:'icon-xiaoxi',name:'待评价'},
					{icon:'icon-jieshubaifang',name:'已结束'},
				],
				token:'',
				ddnum:'',
				ddnum1:[],
				ddnum2:false
			}
		},
		methods: {
			login(){
				uni.navigateTo({
					url:'../login/login'
				})
			},
			tz(index){
				if(index == 0){
					uni.navigateTo({
						url:'../renwu/renwu'
					})
				}
				if(index == 1){
					uni.navigateTo({
						url:'../dingdanlist/dingdanlist'
					})
				}
			},
			dingdan(index){
				uni.navigateTo({
					url:'../rwlist/rwlist'
				})
			},
		},
		mounted() {
			this.token = uni.getStorageSync("token");
			this.$request('workList',{
				token:this.token,
				user_type:1,
				work:0
			}).then((res)=>{
				console.log(res);
				for(let i=0;i<res.data.length;i++){
					if(res.data[i].state == 4){
						this.ddnum1.push(i);
						this.ddnum = this.ddnum1.length;
						this.ddnum2 = true
					}
				}
			})
		}
	}
</script>

<style>
	.dd_main-num{
		position: absolute;
		width: 30rpx;
		height: 30rpx;
		background: red;
		border-radius: 50%;
		left: 270rpx;
		top: 10rpx;
		color: white;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.cy_lr_name{
		font-size: 24rpx;
		margin-top: 20rpx;
	}
	.cy_lr_icon{
		font-size: 60rpx;
	}
	.cy_lr{
		width: 24%;
		height: 120rpx;
		float: left;
		margin: 4% 0.3%;
		text-align: center;
	}
	.cy_fl{
		width: 100%;
		height: 100%;
		margin: 40rpx 0;
	}
	.cy_title_p{
		font-weight: 700;
		font-size: 34rpx;
		margin-left: 40rpx;
	}
	.cy_title{
		width: 100%;
		height: 100rpx;
		border-bottom: 1px solid rgb(243,243,243);
		display: flex;
		align-items: center;
	}
	.pp_cy{
		width: 92%;
		background: white;
		margin: 40rpx auto;
		border-radius: 20rpx;
	}
	.dd_main_p{
		margin-top: 20rpx;
	}
	.dd_main_info_logo{
		font-size: 50rpx;
		color: rgb(253,136,0);
	}
	.dd_main_info{
		text-align: center;
		font-size: 28rpx;
		margin: 30rpx 0;
	}
	.dd_main{
		display: flex;
		align-items: center;
		justify-content: space-around;
		width: 100%;
		position: relative;
	}
	.dd_header_al{
		display: flex;
		color: #999;
		margin-right: 30rpx;
		font-size: 30rpx;
	}
	.dd_header_p{
		font-weight: 700;
		font-size: 34rpx;
		margin-left: 40rpx;
	}
	.dd_header{
		height: 100rpx;
		border-bottom: 1px solid rgb(243,243,243);
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	.PP_dd{
		width: 92%;
		background: white;
		margin: 0 auto;
		border-radius: 20rpx;
	}
	.cuowu{
		margin-left: 180rpx;
		font-size: 50rpx;
	}
	.jiantou{
		margin-left: -10rpx;
		font-size: 30rpx;
		margin-top: 6rpx;
	}
	.gift_p{
		font-size: 32rpx;
		display: flex;
		letter-spacing: -3rpx;
		margin-left: 20rpx;
	}
	.pp_gift{
		width: 88%;
		margin: 40rpx auto;
		background: white;
		padding: 30rpx 20rpx;
		border-radius: 10rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		color: rgb(255,153,0);
	}
	.header_cl{
		font-size: 68rpx;
		color: white;
		margin-right: 40rpx;
		font-weight: 700;
	}
	.header_xx{
		font-size: 50rpx;
		color: white;
		margin-left: 160rpx;
		font-weight: 700;
	}
	.header_login{
		font-size: 40rpx;
		color: white;
		margin-left: 40rpx;
	}
	.header_icon{
		width: 140rpx;
		height: 140rpx;
		border-radius: 50%;
		margin-left: 40rpx;
		background: rgb(243,243,243);
	}
	.pp_header{
		width: 100%;
		height: 300rpx;
		background: rgb(253,136,0);
		display: flex;
		align-items: center;
		justify-content: space-around;
	}
	.people{
		width: 100%;
		height: 100%;
		min-height: 100vh;
		background: rgb(243,243,243);
	}
</style>
