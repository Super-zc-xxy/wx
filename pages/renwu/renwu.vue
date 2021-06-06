<template>
	<view class="rw">
		<!-- 头部 -->
		<view class="rw_header">
			<view class="gongju"></view>
			你想做的是
		</view>
		<!-- 需求类型 -->
		<view class="rw_xqlx">
			<view class="xqlx_title">需求类型</view>
			<view class="xqlx_info">
				<picker class="info_p" @change="bindPickerChange" :range="xqlxdata">
					<view>{{xqlxdata[index]}}</view>
				</picker>
				<view class="iconfont icon-jiantou1 jiantou"></view>
			</view>
		</view>
		<!-- 需求标题 -->
		<view class="rw_xqbt">
			<view class="xqvt_title">
				需求标题
			</view>
			<view class="xqbt_info">
				<input type="text"   v-model="bt" @blur="bc"/>
			</view>
			<view class="xqbt_ts">
				<view class="xqbt_ts_info">
					*这样的标题会更好，例如：重庆火锅品牌英文设计
				</view>
			</view>
		</view>
		<!-- 需求描述 -->
		<view class="rw_xqms">
			<view class="xqms_title">
				需求描述
			</view>
			<view class="xqms_info"  @click="tc">
				<input type="text" value="logo设计"  v-show="msshow"/>
				<view class="ql-container img">
					<rich-text :nodes="msdata" class="ql-editor"></rich-text>
				</view>
			</view>
			<view class="xqms_ts">
				<view class="xqms_ts_info">
					*需求描述过于简洁，服务商可能无法理解你的意思
				</view>
			</view>
		</view>
		<!-- 时间选择器 -->
		<view class="rw_time">
			<view class="time_start">
				<picker mode="date" :value="date" :start="startDate" :end="endDate" @change="bindDateChange">
				    <view class="uni-input">开始时间：{{date}}</view>
				 </picker>
			</view>
			<view class="time_end">
				<picker mode="date" :value="date1" :start="startDate" :end="endDate" @change="bindDateChange1">
				    <view class="uni-input">结束时间：{{date1}}</view>
				 </picker>
			</view>
		</view>
		<!-- 保存 -->
		<view class="rw_submit">
			<view class="submit_button" @click="submit">
				保存
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			const currentDate = this.getDate({
			    format: true
			})
			const currentDate1 = this.getDate({
				format: true
			})
			return {
				index: 0,
				// 需求类型数据
				xqlxdata: ['logo设计','品牌取名','网站开发','营销推广','宣传品设计','抖音代运营','翻译','包装设计','APP开发'],
				// 富文本传过来的值保存
				msdata:"",
				msshow:true,
				bt:'我需要logo设计',
				date: currentDate,
				date1: currentDate1,
				starttime:'',
				endtime:'',
				token:'',
				imgs:[],
			}
		},
		computed: {
		        startDate() {
		            return this.getDate('start');
		        },
		        endDate() {
		            return this.getDate('end');
		        }
		},
		methods: {
			bindPickerChange(e) {
				this.index = e.target.value;
				// console.log(this.xqlxdata[this.index]);
			},
			tc(){
				uni.navigateTo({
					url:'../fuwenben/fuwenben'
				})
			},
			bc(){
				uni.setStorage({
					key:'biaoti',
					data:this.bt
				})
			},
			bindDateChange(e){
				this.date = e.target.value;
				// console.log(e.target.value);
				 this.starttime = (new Date(e.target.value).getTime())/1000;
			},
			bindDateChange1(e){
				this.date1 = e.target.value
				this.endtime = (new Date(e.target.value).getTime())/1000;
			},
			getDate(type) {
			    const date = new Date();
			    let year = date.getFullYear();
			    let month = date.getMonth() + 1;
			    let day = date.getDate();
			    if (type === 'start') {
			        year = year - 60;
			    } else if (type === 'end') {
			        year = year + 2;
			    }
			    month = month > 9 ? month : '0' + month;;
			    day = day > 9 ? day : '0' + day;
			    return `${year}-${month}-${day}`;
			},
			submit(){
				if(this.starttime != "" && this.endtime != "" && this.bt != "" && this.msdat !=""){
					this.$request('addTask',{
						token:this.token,
						start_time:this.starttime,
						end_time:this.endtime,
						remark:this.bt,
						content:this.msdata,
						phone:'17398893373',
						address:'四川省成都市',
						province:'四川省',
						city:'成都市',
						area:'新都区',
						money: 999,
						work_type:857
					}).then((res)=>{
						console.log(res);
						if(res.code == 2000){
							uni.navigateTo({
								url:'../index/index'
							})
						}
					})
				}
		    },
		},
		onLoad(option) {
			let _this = this;
			uni.getStorage({
				key:'biaoti',
				success(res) {
					_this.bt = res.data; 
				}
			})
			this.msdata = option.html;
			console.log(this.msdata);
			if(option.html){
				this.msshow = false
			}else{
				this.msshow = true
			}
			uni.getStorage({
				key:"token",
				success(res) {
					_this.token = res.data
				}
			});
		}
	}
</script>

<style>
	.img{
		/* max-height: 800rpx; */
		width: 100%;
		overflow: scroll;
	}
	.time_end{
		padding: 20rpx;
	}
	.time_start{
		padding: 20rpx;
	}
	.rw_time{
		width: 100%;
		height: 170rpx;
		margin-top: 20rpx;
		background: white;
		padding-bottom: 120rpx !important;
	}
	.ql-container img{
		width: 90%;
		margin: 0 auto;
	}
	.ql-container{
		overflow: visible !important;
		height: 100% !important;
		min-height: 50rpx !important;
	}
	.newdata img{
		width: 400rpx;
		margin: 0 auto;
		height: 400rpx;
	}
	.submit_button{
		padding: 10rpx 70rpx;
		background: rgb(254,111,51);
		border-radius: 30rpx;
		position: absolute;
		color: white;
		right: 30rpx;
		top: 20rpx;
	}
	.rw_submit{
		width: 100%;
		height: 100rpx;
		background: white;
		position: fixed;
		bottom: 0;
		border-top: 1px solid rgb(0,0,0,0.1);
	}
	.xqms_ts_info{
		font-size: 26rpx;
		color: #999;
		margin-left: 30rpx;
	}
	.xqms_ts{
		width: 100%;
		height: 50rpx;
		display: flex;
		align-items: center;
	}
	.xqms_info>input{
		margin-left: 30rpx;
		font-size: 28rpx;
	}
	.xqms_info{
		width: 100%;
		margin-top: 30rpx;
	}
	.xqms_title{
		font-size: 26rpx;
		font-weight: 700;
		margin-left: 30rpx;
		margin-top: 20rpx;
		color: rgb(176, 176, 176);
		padding-top: 30rpx;
	}
	.rw_xqms{
		width: 100%;
		background: white;
		margin-top: 30rpx;
		/* overflow: hidden; */
	}
	.xqbt_ts_info{
		font-size: 26rpx;
		color: #999;
		margin-left: 30rpx;
	}
	.xqbt_ts{
		width: 100%;
		height: 60rpx;
		display: flex;
		align-items: center;
		margin-bottom: 10rpx;
	}
	.xqbt_info>input{
		width: 20em;
		margin-left: 30rpx;
	}
	.xqbt_info{
		width: 100%;
		height: 70rpx;
		display: flex;
		align-items: center;
		margin-top: 8rpx;
	}
	.xqvt_title{
		font-size: 26rpx;
		font-weight: 700;
		margin-left: 30rpx;
		margin-top: 20rpx;
		color: rgb(176, 176, 176);
	}
	.rw_xqbt{
		width: 100%;
		background: white;
		margin-top: 8rpx;
		overflow: hidden;
	}
	.jiantou {
		margin-right: 20rpx;
		color: rgb(176, 176, 176);
	}

	.info_p {
		margin-left: 30rpx;
		font-size: 30rpx;
		font-weight: 700;
	}

	.xqlx_info {
		width: 100%;
		height: 80rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.xqlx_title {
		font-size: 26rpx;
		font-weight: 700;
		margin-left: 30rpx;
		margin-top: 20rpx;
		color: rgb(176, 176, 176);
	}

	.rw_xqlx {
		width: 100%;
		height: 140rpx;
		background: white;
		overflow: hidden;
	}

	.gongju {
		width: 4rpx;
		height: 40rpx;
		background: rgb(250, 133, 44);
		margin-left: 40rpx;
		margin-right: 10rpx;
	}

	.rw_header {
		width: 100%;
		height: 100rpx;
		display: flex;
		align-items: center;
		letter-spacing: 2rpx;
	}

	.rw {
		height: 100%;
		background: rgb(249, 249, 249);
	}
</style>
