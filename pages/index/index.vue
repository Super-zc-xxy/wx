<template>
	<view class="content">
		<!-- 搜索 -->
		<view class="cont_header">
			<view class="sousuo">
				<view class="iconfont icon-sousuo sousuosize"></view>
				<view class="sousuosize_p">设计logo</view>
			</view>
		</view>
		<!-- 导航 -->
		<view class="cont_nav">
			<view v-for="(item,index) in cont_nav" :key="index" :class="item.class" @click="cont_nav1(index)">
				{{item.nav}}
			</view>
		</view>
		<!-- 主体 -->
		<view class="cont_main">
			<view class="cont_address">
				<view class="address_city" @click="address_tc">
					{{adrinfo}}
					<view class="iconfont icon-jiantou"></view>
				</view>
				<view class="address_city" @click="zhxg_tc">
					{{adrinfo2}}
					<view class="iconfont icon-jiantou"></view>
				</view>
				<view class="address_city">
					销量
				</view>
				<view class="address_sx" @click="sx_tc">
					<view class="address_sx_b">|</view>
					筛选<view class="iconfont icon-shaixuan" style="color: black;"></view>
				</view>
			</view>
			<!-- 地址弹窗 -->
			<view class="city_tc" v-show="addressshow">
				<view class="city_main">
					<!-- 省 -->
					<view class="city_sheng">
						<view v-for="(item,index) in addressdata" :key="index" class="sheng_info"
							@click="shengaddress(index)">
							{{item.title}}
						</view>
					</view>
					<!-- 市 -->
					<view class="city_shi">
						<view v-for="(item,index) in addressdata[0].shi" :key="index" class="shi_info"
							@click="shiaddress(index)">
							{{item.city}}
						</view>
					</view>
					<!-- 县 -->
					<view class="city_xian">
						<view v-for="(item,index) in addressdata[0].shi[0].xian" :key="index" class="xian_info"
							@click="xianaddress(index)">
							{{item.adr}}
						</view>
					</view>
				</view>
			</view>
			<!-- 综合弹窗 -->
			<view class="zh_tc" v-show="zhshow">
				<view class="zh_main">
					<view v-for="(item,index) in zhdata" :key="index" class="zh_info" @click="zh_info(index)">
						{{item.title}}
					</view>
				</view>
			</view>
			<!-- 筛选弹框 -->
			<view class="sx_tc" v-show="sxshow">
				<view class="sx_main">
					<view class="sx_main_top">
						<view v-for="(item,index) in sxdata" :key="index">
							<view class="sx_work">
								<view class="sx_title">
									{{item.title}}
								</view>
								<view v-for="(item,index) in sxdata[index].job" :key="index" class="sx_job" @click="addcss(index)">
									{{item.work}}
								</view>
								<view style="clear: both;"></view>
							</view>

						</view>
						<!-- 价格区间 -->
						<view class="sx_price">
							<view class="sx_title">
								价格区间(元)
							</view>
							<view class="sx_input">
								<view class="sx_input_min">
									<input type="text" placeholder="最低价" />
								</view>
								<view class="gongju">
									
								</view>
								<view class="sx_input_min">
									<input type="text" placeholder="最高价" />
								</view>
							</view>
						</view>
						<!-- 商家身份 -->
						<view class="sx_people">
							<view class="sx_title">
								商家身份(所有商家均经过实名认证)
							</view>
							<view v-for="(item,index) in peopledata" :key="index" class="sx_job">
								{{item.title}}
							</view>
							<view style="clear: both;"></view>
						</view>
						<!-- 重置和确认 -->
						<view class="sx_button">
							<view class="sx_regist">
								重置
							</view>
							<view class="sx_submit" @click="sx_bc">
								确认
							</view>
						</view>
					</view>
				</view>
			</view>
			<!-- 任务列表 -->
			<view v-for="(item,index) in this.rwdata" :key="index" class="cont_rw" @click="xiangqing(index)">
				<!-- 左边图片 -->
				<view class="rw_left">
					<image src='../../static/lun1.jpg' mode=""></image>
					<!-- <rich-text :nodes="rwdata.content"></rich-text> -->
				</view>
				<!-- 右边内容 -->
				<view class="rw_right">
					<!-- 任务名 -->
					<view class="rw_title">
						{{item.remark}}
					</view>
					<!-- 任务类别 -->
					<view class="rw_fa">
						<view v-for="(item,index) in fadata" :key="index" class="rw_fa_info">
							{{item.title}}
						</view>
					</view>
					<!-- 任务价格 -->
					<view class="rw_price">
						<view class="rw_price_icon">￥
							<view class="rw_price_money">
								{{item.money}}
							</view>
							/个
						</view>
						<view class="rw_sl">
							销量14789 评分 4.98
						</view>
						<view class="rw_gg">
							广告
						</view>
					</view>
					<!-- 评论 -->
					<view class="rw_pl">
						"好好好好好好好好好好好好好好好好好好好好好好好好好好好好好好好好好好好好好好好好好好好好好好"
					</view>
					<!-- 公司 -->
					<view class="rw_company">
						变革品牌设计 {{item.city}}
						<view class="rw_zx">
							免费咨询
						</view>
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
				cont_nav: [{
					nav: '服务',
					class: 'nav_p'
				}, {
					nav: '案例',
					class: 'nav_p'
				}, {
					nav: '店铺',
					class: 'nav_p'
				}],
				// 地址弹窗
				addressshow: false,
				// 地址信息
				adrinfo: '成都',
				adrinfo2: '综合',
				// 综合弹窗
				zhshow: false,
				// 筛选弹窗
				sxshow:false,
				// 地址数据源
				addressdata: [{
						"title": '四川',
						"shi": [{
								"city": '成都',
								"xian": [{
										"adr": '青羊'
									},
									{
										"adr": '锦江'
									},
									{
										"adr": '金牛'
									},
									{
										"adr": '武侯'
									},
									{
										"adr": '成华'
									},
									{
										"adr": '龙泉驿'
									},
									{
										"adr": '青白江'
									},
									{
										"adr": '新都'
									},
									{
										"adr": '温江'
									},
									{
										"adr": '彭州'
									},

								]
							},
							{
								"city": '南充',
								"xian": [{
										"adr": '阆中'
									},
									{
										"adr": '南部'
									},
									{
										"adr": '营山'
									},
									{
										"adr": '蓬安'
									},
									{
										"adr": '仪陇'
									},
									{
										"adr": '西充'
									},
									{
										"adr": '南充'
									}
								]
							},
							{
								"city": '巴中',
								"xian": [{
										'adr': '巴州'
									},
									{
										'adr': '通江'
									},
									{
										'adr': '南江'
									},
									{
										'adr': '平昌'
									},
									{
										'adr': '巴中'
									},
									{
										'adr': '恩阳区'
									},
								]
							},
							{
								"city": '达州',
							},
							{
								"city": '德阳',
							},
							{
								"city": '广安',
							},
							{
								"city": '广元',
							},
							{
								"city": '乐山',
							},
							{
								"city": '绵阳',
							},
							{
								"city": '眉山',
							},
						]
					},
					{
						"title": '安徽'
					},
					{
						"title": '福建'
					},
					{
						"title": '广东'
					},
					{
						"title": '广西'
					},
					{
						"title": '贵州'
					},
					{
						"title": '海南'
					},
					{
						"title": '河北'
					},
					{
						"title": '黑龙江'
					},
					{
						"title": '河南'
					},
				],
				addressstate: 0,
				shistate: 0,
				// 综合数据
				zhdata: [{
						'title': '综合'
					},
					{
						'title': '评分从高到低'
					},
					{
						'title': '价格从低到高'
					},
					{
						'title': '价格从高到低'
					}
				],
				// 筛选数据源
				sxdata: [{
						"title": '行业',
						"job": [{
								'work': '餐饮',
							},
							{
								'work': '食品',
							}, {
								'work': '网店',
							}, {
								'work': '旅游',
							}, {
								'work': '零售',
							}, {
								'work': '金融',
							}, {
								'work': '酒店',
							}, {
								'work': '健身',
							}, {
								'work': '百货',
							}, {
								'work': '广告',
							}, {
								'work': '交通运输',
							}, {
								'work': '娱乐',
							}, {
								'work': '农业',
							}, {
								'work': '房地产',
							}, {
								'work': '能源',
							},
						]
					},
					{
						"title": '主题',
						"job": [{
								'work': 'logo设计',
							},
							{
								'work': '商标设计',
							}, {
								'work': '标志设计',
							}, {
								'work': '公司logo',
							}, {
								'work': '设计logo',
							}, {
								'work': '商标logo',
							}, {
								'work': '企业logo',
							}, {
								'work': '品牌设计',
							}, {
								'work': '图标设计',
							}, {
								'work': '平面设计',
							}, {
								'work': 'VI设计',
							}, {
								'work': '标志logo',
							}, {
								'work': '设计图标',
							}, {
								'work': '图文logo',
							}, {
								'work': '海报设计',
							},
						]
					},
					{
						"title": '服务保障',
						"job": [{
								'work': '免费修改',
							},
							{
								'work': '保证完成',
							}, {
								'work': '急速交稿',
							}, {
								'work': '多方案供选',
							}, {
								'work': '3套方案供选',
							}, {
								'work': '5套方案供选',
							}, {
								'work': '8套方案供选',
							}, {
								'work': '10+套方案供选',
							}, {
								'work': '30分钟出稿',
							}, {
								'work': '12H出稿',
							}, {
								'work': '24H出稿',
							}, {
								'work': '48H出稿',
							}, {
								'work': '免费修改到',
							}, {
								'work': '保证完成',
							}, {
								'work': '能源',
							},
						]
					},

				],
				// 商家身份
				peopledata:[
					{"title":"全部"},
					{"title":"企业认证"},
					{"title":"个人认证"}
				],
				rwdata:[],
				newrwdata:[],
				// 方案死数据
				fadata:[
					{title:'3套方案供选'},
					{title:'免费修改到满意为止'},
				]
			}
		},
		onLoad() {
			this.cont_nav[0].class = "nav_p1";
		},
		mounted() {
			this.$request('TaskList',{
				page:'1',
				size:'100',
				procince:'四川省',
				city:'成都市',
				work_type:857
			}).then((res)=>{
				this.rwdata = res.data.data
				this.xuanran();
			});
			this.rwdata = uni.getStorage({
				key:"rwdata",
			})
		},
		methods: {
			xuanran(){
				// console.log(this.rwdata);
			},
			cont_nav1(index) {
				for (let i = 0; i < this.cont_nav.length; i++) {
					this.cont_nav[i].class = "nav_p"
				}
				this.cont_nav[index].class = "nav_p1"
			},
			address_tc() {
				this.zhshow = false
				this.addressshow = true
			},
			shengaddress(index) {
				this.addressdata[0].shi = this.addressdata[index].shi;
				this.addressstate = index;
				this.adrinfo = this.addressdata[index].title;
				// console.log(index);
			},
			shiaddress(index) {
				if(index == 0 ){
					this.addressdata[0].shi[0].xian =  [{
										"adr": '青羊'
									},
									{
										"adr": '锦江'
									},
									{
										"adr": '金牛'
									},
									{
										"adr": '武侯'
									},
									{
										"adr": '成华'
									},
									{
										"adr": '龙泉驿'
									},
									{
										"adr": '青白江'
									},
									{
										"adr": '新都'
									},
									{
										"adr": '温江'
									},
									{
										"adr": '彭州'
									},]
				}
				this.addressdata[this.addressstate].shi[0].xian = this.addressdata[this.addressstate].shi[index].xian;
				this.shistate = index;
				this.adrinfo = this.addressdata[this.addressstate].shi[index].city;
			},
			xianaddress(index) {
				this.adrinfo = this.addressdata[this.addressstate].shi[this.shistate].xian[index].adr;
				this.addressshow = false
			},
			zhxg_tc() {
				this.addressshow = false
				this.zhshow = true
			},
			zh_info(index) {
				this.adrinfo2 = this.zhdata[index].title,
					this.zhshow = false
			},
			sx_tc(){
				this.sxshow = true
			},
			sx_bc(){
				this.sxshow = false
			},
			addcss(index){
				// console.log(index);
			},
			xiangqing(index){
				console.log(this.rwdata[index]);
				uni.navigateTo({
					url:`../xiangqing/xiangqing?xiangqing=${JSON.stringify(this.rwdata[index]) }`
				})
			},
		}
	}
</script>

<style>
	.rw_zx{
		padding: 8rpx;
		color: white;
		background-color: rgb(255,135,70);
		border-radius: 10rpx;
		margin-left: 80rpx;
	}
	.rw_company{
		width: 100%;
		height: 100rpx;
		display: flex;
		align-items: center;
		font-size: 26rpx;
		color: #999;
	}
	.rw_pl{
		width: 94%;
		background: rgb(242,242,242);
		margin-top: 10rpx;
		border-radius: 10rpx;
		font-size: 26rpx;
		text-indent: 1.5em;
		padding: 8rpx 0 0 ;
		overflow: hidden;
		display: -webkit-box;
		-webkit-box-orient:vertical;
		-webkit-line-clamp:2;
		color: #999;
	}
	.rw_gg{
		font-size: 20rpx;
		margin-top: 16rpx;
		color: #999;
		margin-left: 4rpx;
	}
	.rw_sl{
		color: #999;
		font-size: 20rpx;
		font-weight: 700;
		margin-top: 16rpx;
		margin-left: 6rpx;
	}
	.rw_price_money{
		font-size: 40rpx;
		margin-top: -14rpx;
	}
	.rw_price_icon{
		display: flex;
		font-size: 20rpx;
		height: 32rpx;
		margin-top: 16rpx;
		color: rgb(255,105,0);
		font-weight: 700;
	}
	.rw_price{
		width: 100%;
		display: flex;
		height: 58rpx;
	}
	.rw_fa_info{
		color: rgb(255,105,0);
		border: 1px solid rgb(255,105,0);
		font-size: 20rpx;
		white-space: nowrap;
		padding: 2rpx;
		margin: 0 8rpx;
		border-radius: 5rpx;
	}
	.rw_fa{
		width: 100%;
		display: flex;
		flex-wrap: wrap;
		margin-top: 10rpx;
		height: 40rpx;
	}
	.rw_title{
		margin-top: 20rpx;
		font-weight: 700;
		width: 100%;
		font-size: 28rpx;
		height: 76rpx;
	}
	.rw_right{
		width: 416rpx;
		width: 100%;
	}
	.rw_left>image{
		width: 160rpx;
		height: 160rpx;
		margin: 30rpx;
	}
	.rw_left{
	}
	.cont_rw{
		background: white;
		width: 90%;
		display: flex;
		border-radius: 20rpx;
		margin: 10rpx auto;
		display: flex;
	}
	.sx_submit{
		width: 40%;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		font-weight: 700;
		background: rgb(255,105,0);
		color: white;
	}
	.sx_regist{
		background: white;
		width: 40%;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		font-weight: 700;
	}
	.sx_button{
		width: 100%;
		height: 100rpx;
		position: fixed;
		bottom: 100rpx;
		display: flex;
	}
	.sx_people{
		margin-top: 20rpx;
		width: 100%;
		margin-bottom:220rpx;
		border-bottom: 1px solid #999;
	}
	.gongju{
		height: 4rpx;
		width: 60rpx;
		background: black;
		margin: 0 20rpx;
	}
	.sx_input_min{
		width: 45%;
		background: rgb(243,243,243);
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 10px 0;
		text-align: center;
		margin-bottom: 50rpx;
	}
	.sx_input{
		width: 90%;
		/* height: 140rpx; */
		margin: 0 auto;
		/* height: ; */
		display: flex;
		justify-content: space-between;
		align-items: center;
		border-bottom: 1px solid #999;
	}
	.sx_work{
		width: 100%;
		border-bottom: 1px solid #999;
		margin-bottom: 40rpx;
	}
	.sx_price {
		width: 100%;
	}

	.sx_job {
		float: left;
		background: rgb(243, 243, 243);
		margin: 3% 2% 2% 4%;
		padding: 10px;
		width: 20%;
		font-size: 28rpx;
		text-align: center;
		border-radius: 10rpx;
		white-space: nowrap;
		text-overflow: ellipsis;
		overflow: hidden;
	}

	.sx_title {
		margin: 20rpx;
		font-size: 30rpx;
		font-weight: 700;
	}

	.sx_main_top {
		margin-top: 90rpx;
		width: 100%;
	}

	.sx_main::-webkit-scrollbar {
		display: none;
	}

	.sx_main {
		width: 78%;
		height: 100%;
		position: absolute;
		right: 0;
		background: white;
		overflow: scroll;
	}

	.sx_tc {
		width: 100vw;
		height: 100vh;
		background: rgba(0, 0, 0, 0.2);
		position: fixed;
		top: 0;
		left: 0;
	}

	.zh_info {
		padding: 28rpx 40rpx;
		font-size: 28rpx;
	}

	.zh_main {
		width: 100%;
		height: 400rpx;
		background: rgb(243, 243, 243);
	}

	.zh_tc {
		width: 100%;
		height: 80vh;
		background: rgba(0, 0, 0, 0.2);
	}

	.xian_info {
		text-align: center;
		padding: 20rpx 0;
		border-bottom: 1px solid rgb(218, 218, 218);
		border-right: 1px solid rgb(218, 218, 218);
		background: white;
		font-size: 30rpx;
	}

	.city_xian {
		width: 33.3%;
		height: 100%;
		overflow: scroll;
	}

	.shi_info {
		text-align: center;
		padding: 20rpx 0;
		border-bottom: 1px solid rgb(218, 218, 218);
		border-right: 1px solid rgb(218, 218, 218);
		background: white;
		font-size: 30rpx;
	}

	.city_shi {
		width: 33.3%;
		height: 100%;
		overflow: scroll;
	}

	.sheng_info {
		padding: 30rpx;
		border-bottom: 1px solid rgb(218, 218, 218);
		border-right: 1px solid rgb(218, 218, 218);
		background: white;
		font-size: 30rpx;
	}

	.city_shi::-webkit-scrollbar {
		display: none;
	}

	.city_xian::-webkit-scrollbar {
		display: none;
	}

	.city_sheng::-webkit-scrollbar {
		display: none;
	}

	.city_sheng {
		width: 33.3%;
		height: 100%;
		overflow: scroll;
	}

	.city_main {
		width: 100%;
		height: 600rpx;
		background: rgb(243, 243, 243);
		display: flex;
	}

	.city_tc {
		width: 100%;
		height: 100vh;
		background: rgba(0, 0, 0, 0.1);
	}

	.address_sx_b {
		margin-right: 20rpx;
		color: #999;
	}

	.address_sx {
		display: flex;
		margin-right: 20rpx;
	}

	.address_city {
		display: flex;
		margin-left: 20rpx;
	}

	.cont_address {
		width: 100%;
		height: 100rpx;
		display: flex;
		align-items: center;
		font-size: 30rpx;
		justify-content: space-between;
	}

	.cont_main {
		width: 100%;
		background: rgb(243, 243, 243);
		min-height: 80vh;
	}

	.nav_p1 {
		font-size: 38rpx;
		height: 100rpx;
		border-bottom: 4rpx solid rgb(255, 92, 0);
		display: flex;
		align-items: center;
		color: rgb(255, 92, 0);
	}

	.nav_p {
		font-size: 38rpx;
		height: 100rpx;
		/* border-bottom: 4rpx solid rgb(255,92,0); */
		display: flex;
		align-items: center;
		/* color: rgb(255,92,0); */
		border-bottom: 4rpx solid rgba(255, 92, 0, 0);
	}

	.cont_nav {
		width: 100%;
		display: flex;
		height: 100rpx;
		justify-content: space-around;
		align-items: center;
		margin-top: 10rpx;
	}

	.sousuosize_p {
		color: #000;
	}

	.sousuosize {
		font-size: 50rpx;
		margin-left: 20rpx;
		color: #999;
	}

	.sousuo {
		display: flex;
		align-items: center;
	}

	.cont_header {
		width: 90%;
		margin: 0 auto;
		border-radius: 10rpx;
		height: 80rpx;
		background-color: rgb(243, 243, 243);
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.content {
		width: 100%;
		height: 100%;
	}
</style>
