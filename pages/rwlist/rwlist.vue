<template>
	<view class="dingdanlist">
		<!-- 任务头部 -->
		<view class="dl_head">
			<view v-for="(item,index) in headdata" :key="index" @click="select(index)" class="head_p">
				{{item.title}}
			</view>
		</view>
		<!-- 人物 -->
		<view class="dl_main">
			<view v-for="(item,index) in rwdata" :key="index" class="dl_info">
				<!-- 订单号 -->
				<view class="info_ddh">
					<view class="info_ddh_left">
						订单号:{{item.work_id}}
					</view>
					<view class="info_ddh_right">{{item.state}}</view>
				</view>
				<!-- 标题 -->
				<view class="info_ddh_title">
					<view class="iconfont icon-thin-_bullet_lis rw"></view>
					{{item.remark}}
				</view>
				<!-- 描述 -->
				<view class="info_ddh_ms">
					<view class="info_ddh_ms_ms">都来吃火锅哇！</view>
				</view>
				<!-- 金额 -->
				<view class="info_ddh_price">
					总金额：￥{{item.money}}.00
				</view>
				<!-- 取消订单 -->
				<view class="info_ddh_submit">
					<view class="info_ddh_submit_button" @click="startrw(index)">开始任务</view>
					<view class="info_ddh_submit_button" @click="endrw(index)">结束任务</view>
					<view class="info_ddh_submit_button" @click="quxiao(index)">
						取消任务
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// 头部状态
				headdata:[
					{title:'已接单'},
					{title:'正在进行'},
					{title:'已结束'},
				],
				// 发布的所有任务
				rwdata:[],
				token:'',
				start:false
			}
		},
		methods: {
			select(index){
				for(let i=0;i<document.querySelectorAll('.head_p').length;i++){
					document.querySelectorAll('.head_p')[i].style.borderBottom = ""
				}
				document.querySelectorAll('.head_p')[index].style.borderBottom = "2px solid rgb(255,105,0)";
				if(index == 0){
					this.rwdata = [];
					this.$request('workList',{
						token:this.token,
						user_type:1,
						work:0
					}).then((res)=>{
						// console.log(res);
						// this.rwdata = res.data;
						for(let i=0;i<res.data.length;i++){
							if(res.data[i].state == 4 ){
								this.rwdata.push(res.data[i]);
							}
						}
						for(let j=0;j<this.rwdata.length;j++){
							if(this.rwdata[j].state == 4){
								this.rwdata[j].state = "已接单"
							}
						}
						// console.log(this.rwdata);
					});
				}
				if(index == 1){
					this.rwdata = [];
					this.$request('workList',{
						token:this.token,
						user_type:1,
						work:0
					}).then((res)=>{
						for(let i=0;i<res.data.length;i++){
							if(res.data[i].state == 7){
								this.rwdata.push(res.data[i])
							}
						}
						for(let i=0;i<this.rwdata.length;i++){
							if(this.rwdata[i].state == 7){
								this.rwdata[i].state = "进行中"
							}
						}
					})
				}
				if(index == 2){
					this.rwdata = [];
					this.$request('workList',{
						token:this.token,
						user_type:1,
						work:0
					}).then((res)=>{
						for(let i=0;i<res.data.length;i++){
							if(res.data[i].state == 8){
								this.rwdata.push(res.data[i])
							}
						}
						for(let i=0;i<this.rwdata.length;i++){
							if(this.rwdata[i].state == 8){
								this.rwdata[i].state = "结束"
							}
						}
					})
				}
			},
			quxiao(index){
				console.log(this.rwdata[index]);
				this.$request('workModify',{
					work_id:this.rwdata[index].work_id,
					state: 2,
					token:this.token
				}).then((res)=>{
					console.log(res);
				})
			},
			startrw(index){
				if(this.rwdata[index].state != "已接单"){
					uni.showModal({
						title:'请先接单！'
					})
				}else{
					this.$request('workModify',{
						token:this.token,
						state:7,
						work_id:this.rwdata[index].work_id,
					}).then((res)=>{
						console.log(res);
					})
				}
			},
			endrw(index){
				if(this.rwdata[index].state == '进行中')
				{
					this.$request('workModify',{
						token:this.token,
						state:8,
						work_id:this.rwdata[index].work_id,
					}).then((res)=>{
						console.log(res);
					})
				}
			},
			
		},
		mounted() {
			this.token = uni.getStorageSync("token");
			document.querySelectorAll('.head_p')[0].style.borderBottom = "2px solid rgb(255,105,0)";
			this.$request('workList',{
				token:this.token,
				user_type:1,
				work:0
			}).then((res)=>{
				// console.log(res);
				// this.rwdata = res.data;
				for(let i=0;i<res.data.length;i++){
					if(res.data[i].state == 4 ){
						this.rwdata.push(res.data[i]);
					}
				}
				for(let j=0;j<this.rwdata.length;j++){
					if(this.rwdata[j].state == 4){
						this.rwdata[j].state = "已接单"
					}
				}
				// console.log(this.rwdata);
			});
		}
	}
</script>

<style>
	.info_ddh_submit_button{
		padding: 10rpx;
		color: rgb(255,105,0);
		border: 1px solid rgb(255,105,0);
		display: inline-block;
		border-radius: 10rpx;
		margin-bottom: 20rpx;
	}
	.info_ddh_submit{
		width: 90%;
		margin: 0 auto;
		display: flex;
		justify-content: space-between;
	}
	.info_ddh_price{
		width: 90%;
		margin: 20rpx auto;
		text-align: right;
		font-size: 30rpx;
	}
	.info_ddh_ms_ms{
		color: #999;
		margin: 20rpx;
		display: inline-block;
	}
	.info_ddh_ms{
		width: 90%;
		margin: 0 auto;
		height: 120rpx;
		background: rgb(244,244,244);
		margin-top: 20rpx;
		border-radius: 10rpx;
	}
	.rw{
		width: 60rpx;
		height: 60rpx;
		background: rgb(252,239,230);
		color: rgb(255,105,0);
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 30rpx;
		margin-left: 20rpx;
		margin-right: 20rpx;
	}
	.info_ddh_title{
		width: 100%;
		margin: 10rpx 0;
		display: flex;
		align-items: center;
		padding: 10rpx 0 ;
		font-weight: 700;
	}
	.info_ddh_left{
		margin-left: 20rpx;
	}
	.info_ddh_right{
		margin-right: 20rpx;
		color: rgb(255,132,47);
	}
	.info_ddh{
		width: 100%;
		height: 60rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		font-size: 34rpx;
		color: #666;
		margin-top: 20rpx;
	}
	.dl_info{
		width: 92%;
		margin: 40rpx auto;
		border-radius: 10rpx;
		background: white;
	}
	.dl_main{
		width: 100%;
		margin-top: 20rpx;
	}
	.head_p{
		height: 100%;
		display: flex;
		align-items: center;
	}
	.dl_head{
		width: 100%;
		height: 100rpx;
		display: flex;
		justify-content: space-around;
		align-items: center;
		font-size: 35rpx;
		border-bottom:1px solid rgb(243,243,243);
		background: white;
	}
	.dingdanlist{
		width: 100%;
		min-height: 100vh;
		background: rgb(243,245,245);
	}
</style>
