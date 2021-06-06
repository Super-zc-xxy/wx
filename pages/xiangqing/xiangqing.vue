<template>
	<view class="xiangqing">
		<!-- 轮播 -->
		<view class="xq_lb">
			<swiper indicator-dots circular>
				<swiper-item v-for="(item,index) in swiperdata" :key="index">
					<image :src="item.img" ></image>
				</swiper-item>
			</swiper>
		</view>
		<!-- 商品 -->
		<view class="xq_head">
			<!-- 任务名 -->
			<view class="head_title">
				{{alldata.remark}}
			</view>
			<!-- 任务类 -->
			<view class="head_lb">
				免费修改到满意为止
			</view>
			<!-- 价格 -->
			<view class="head_price">
				￥{{alldata.money}}/满意为止
			</view>
			<!-- 价格小分类 -->
			<view class="head_fl">
				<view v-for="(item,index) in fldata" :key="index" class="head_fl_main" >
					<view >{{item.num}}</view>
					<view class="head_fl_main_name">{{item.name}}</view>
				</view>
			</view>
		</view>
		<!-- 工具 -->
		<view class="gongju"></view>
		<!-- 公司 -->
		<view class="xq_company">
			<!-- logo -->
			<view class="company_logo"><image src="../../static/lun4.jpg" mode=""></image></view>
			<!-- 标题 -->
			<view class="company_info">
				<view class="company_info_title">艺点意创品牌策划有限公司</view>
				<view class="smalllogoall">
					<view class="smalllogo qiye">企业</view>
					<view class="smalllogo bj">猪六十八戒</view>
				</view>
				<view style="clear: both;"></view>
				<!-- 介绍 -->
				<view class="company_produce">
					服务企业<view class="produce_color">529家</view>·成交额<view class="produce_color">2.12亿</view>·好评率<view class="produce_color">100%</view>
				</view>
				<!-- 地址 -->
				<view class="company_address">
					<view class="iconfont icon-dizhi address"></view>
					{{alldata.province}}·{{alldata.city}}
				</view>
				<!-- 箭头 -->
				<view class="company_jiantou iconfont icon-jiantou1">
					
				</view>
			</view>
		</view>
		<!-- 工具 -->
		<view class="gongju"></view>
		<!-- 客户评价 -->
		<view class="xq_kh">
			<view class="kh_main">
				<!-- 标题 -->
				<view class="kh_main_title">
					<view class="shuxian"></view>
					客户评价
					<view class="kh_num">(9855条)</view>
				</view>
				<!-- 属性 -->
				<view class="kh_main-sx">
					<view v-for="(item,index) in pldata" :key="index" class="sx_info">
						{{item.title}}
					</view>
				</view>
				<!-- 用户评论 -->
				<view class="kh_mian_info">
					<view v-for="(item,index) in peopleinfo" :key="index" class="main_info">
						<view class="info_icon iconfont icon-subscriber-square"></view>
						<view class="info_name">{{item.name}}</view>
						<view class="info_level"><view class="iconfont icon-xingxing" v-for="(item,index) in 5"></view></view>
						<view class="info_p">{{item.main}}</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 工具 -->
		<view class="gongju"></view>
		<!-- 服务 -->
		<view class="xq_fw">
			<!-- 总体 -->
			<view class="fw_main">
				<view class="fw_main_title">
					<view class="shuxian"></view>
					服务详情
				</view>
				<view class="fw_main_main ql-container">
					<rich-text :nodes="alldata.content"></rich-text>
				</view>
			</view>
		</view>
		<!-- 提交 -->
		<view class="xq_submit">
			<view class="submit_icon">
				<view class="submit_main">
					<view class="iconfont icon-xingxing icon">
					</view>
					收藏
				</view>
				<view class="submit_main" @click="phone">
					<view class="iconfont icon-dianhua">
					</view>
					电话
				</view>
			</view>
			<view class="submit_button zixun">在线咨询</view>
			<view class="submit_button" @click="submit">购买服务</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// 保存传过来的值
				alldata:'',
				swiperdata:[
					{img:'/static/lun1.jpg'},
					{img:'/static/lun2.jpg'},
					{img:'/static/lun3.jpg'},
					{img:'/static/lun4.jpg'},
					{img:'/static/lun5.jpg'},
				],
				// 分类
				fldata:[
					{
						num:'--',
						name:'平均工时'
					},
					{
						num:'--',
						name:'平均响应'
					},
					{
						num:'196',
						name:'总计销量'
					},
					{
						num:'21',
						name:'收藏数量'
					},
				],
				// 评论
				pldata:[
					{title:'沟通顺畅(3100)'},
					{title:'严谨认真(3073)'},
					{title:'定价合理(2938)'},
					{title:'有创意(2851)'},
					{title:'专业水平高(2587)'},
					{title:'出稿速度快(2529)'},
					{title:'交付准时(2511)'},
					{title:'提供优质案例(1953)'},
				],
				// 用户信息
				peopleinfo:[
					{icon:'',name:'t_4388_Qkmyv9',level:'',main:'定金定金定金'},
					{icon:'',name:'t_4388_Qkmyv9',level:'',main:'定金定金定金'},
				],
				token:'',
			}
		},
		methods: {
			submit(){
				this.$request('getTask',{
					token:this.token,
					work_id:this.alldata.work_id
				}).then((res)=>{
					if(res.code == 2000){
						uni.showToast({
							title:"接取任务成功！"
						})
						uni.navigateTo({
							url:'../rwlist/rwlist'
						})
					}
				})
			},
			phone(){
				uni.makePhoneCall({
					phoneNumber:`17398893373`
				})
			},
		},
		onLoad(option) {
			this.alldata = JSON.parse(option.xiangqing)
			console.log(this.alldata);
		},
		mounted() {
			this.token = uni.getStorageSync("token")
		}
	}
</script>

<style>
	.submit_main{
		width: 50%;
		text-align: center;
	}
	.submit_icon{
		width: 30%;
		height: 60%;
		display: flex;
		justify-content: space-around;
	}
	.zixun{
		background: #F2A542 !important;
	}
	.submit_button{
		width: 30%;
		height: 60%;
		display: flex;
		justify-content: center;
		align-items: center;
		background: rgb(255,119,58);
		color: white;
		font-size: 34rpx;
	}
	.xq_submit{
		width: 100%;
		height: 120rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		position: fixed;
		bottom: 0;
		background: white;
	}
	.fw_main_main{
		width: 100%;
		margin-top: 20rpx;
	}
	.fw_main_title{
		width: 100%;
		height: 70rpx;
		display: flex;
		align-items: center;
	}
	.fw_main{
		width: 94%;
		margin: 40rpx auto;
	}
	.xq_fw{
		width: 100%;
		padding-bottom: 200rpx;
	}
	.info_p{
		width: 100%;
		float: left;
		height: 60rpx;
		margin-top: 20rpx;
		display: flex;
		align-items: center;
	}
	.info_level{
		width: 200rpx;
		float: left;
		height: 40rpx;
		margin-top: 20rpx;
		position: absolute;
		right: 40rpx;
		display: flex;
		justify-content: space-around;
		color: rgb(255,105,0);
	}
	.info_name{
		float: left;
		margin-top: 20rpx;
		margin-left: 10rpx;
		font-size: 28rpx;
		color: #999;
	}
	.main_info{
		height: 50%;
		position: relative;
		border-bottom: 1px solid rgb(243,243,243);
	}
	.info_icon{
		font-size: ;
		height: 40rpx;
		width: 40rpx;
		border-radius:50%;
		font-size: 40rpx;
		color: #999;
		margin-top: 20rpx;
		float: left;
	}
	.kh_mian_info{
		width: 100%;
		height: 336rpx;
	}
	.sx_info{
		color: rgb(255,116,20);
		background: rgb(255,234,220);
		padding: 6rpx 20rpx;
		border-radius: 50rpx;
		margin: 10rpx;
		font-size: 30rpx;
		font-weight: 700;
	}
	.kh_main-sx{
		width: 100%;
		height: 320rpx;
		display: flex;
		flex-wrap: wrap;
	}
	.kh_num{
		font-size: 28rpx;
		color: #999;
		margin-left: 10rpx;
	}
	.shuxian{
		width: 6rpx;
		height: 60%;
		background: #FF6900;
		margin-right: 10rpx;
	}
	.kh_main_title{
		width: 100%;
		height: 70rpx;
		display: flex;
		align-items: center;
	}
	.kh_main{
		width: 94%;
		height: 94%;
	}
	.xq_kh{
		width: 100%;
		height: 780rpx;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.company_jiantou{
		color: #999;
		position: absolute;
		right: 20rpx;
		top: 45%;
	}
	.address{
		color: #999;
	}
	.company_address{
		width: 100%;
		height: 44rpx;
		display: flex;
		align-items: center;
		font-size: 28rpx;
		color: #999;
	}
	.produce_color{
		color: rgb(253,125,124);
	}
	.company_produce{
		font-size: 20rpx;
		color: #999;
		width: 100%;
		display: flex;
		margin: 10rpx 0;
	}
	.bj{
		background: rgb(253,125,124);
	}
	.qiye{
		background: rgb(106,182,255);
	}
	.smalllogoall{
		width:45%;
		height: 50rpx;
		float: left;
		display: flex;
		align-items: center;
	}
	.smalllogo{
		padding: 4rpx 10rpx;
		font-size: 20rpx;
		display: inline-block;
		color: white;
		border-radius: 8rpx;
		white-space: nowrap;
		margin-right:10rpx ;
	}
	.company_info_title{
		width: 53%;
		height: 50rpx;
		white-space: nowrap;
		text-overflow: ellipsis;
		overflow: hidden;
		font-size: 34rpx;
		float: left;
	}
	.company_info{
		height: 150rpx;
		width: 65%;
		margin-right: 30rpx;
	}
	.company_logo>image{
		width: 100%;
		height: 100%;
		border-radius: 50%;
	}
	.company_logo{
		width: 150rpx;
		height: 150rpx;
		border-radius:50%;
		margin-left: 40rpx;
	}
	.gongju{
		width: 100%;
		height: 26rpx;
		background: rgb(246,246,246);
	}
	.xq_company{
		width: 100%;
		height: 220rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		position: relative;
	}
	.head_fl_main_name{
		font-size: 26rpx;
		color: #999;
	}
	.head_fl_main{
		height: 80%;
		border-right:1px solid rgb(238,238,238); 
		width: 25%;
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		align-items: center;
	}
	.head_fl{
		width: 100%;
		height: 140rpx;
		display: flex;
		align-items: center;
	}
	.head_price{
		width: 100%;
		height: 120rpx;
		display: flex;
		align-items: center;
		font-size: 46rpx;
		color: rgb(255,105,0);
		border-bottom: 1px solid rgb(238,238,238);
	}
	.head_lb{
		padding: 2rpx;
		color: rgb(255,145,76);
		font-size: 20rpx;
		border: 1px solid rgb(255,145,76);
		font-weight: 700;
		display: inline-block;
		border-radius: 10rpx;
		margin-top: 20rpx;
	}
	.head_title{
		width: 100%;
		font-size: 38rpx;
		display: -webkit-box;
		-webkit-box-orient:vertical;
		-webkit-line-clamp:2;
		overflow: hidden;
	}
	.xq_head{
		padding: 20rpx;
		width: 88%;
		margin: 0 auto;
		background: white;
	}
	.xq_lb image{
		width: 100% ;
		height: 100%;
	}
	.xq_lb>swiper{
		width: 100%;
		height: 100%;
	}
	.xq_lb{
		width: 100%;
		height: 540rpx;
	}
	.xiangqing{
		width: 100vw;
		height: 100vh;
	}
</style>
