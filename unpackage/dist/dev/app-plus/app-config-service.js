
var isReady=false;var onReadyCallbacks=[];
var isServiceReady=false;var onServiceReadyCallbacks=[];
var __uniConfig = {"pages":["pages/index/index","pages/gjq/gjq","pages/mine/mine","pages/gift/gift","pages/login/login","pages/renwu/renwu","pages/fuwenben/fuwenben","pages/xiangqing/xiangqing","pages/dingdanlist/dingdanlist","pages/rwlist/rwlist"],"window":{"navigationBarTextStyle":"black","navigationBarTitleText":"猪八戒网","navigationBarBackgroundColor":"#FFFFFF","backgroundColor":"#FFFFFF"},"tabBar":{"selectedColor":"red","list":[{"pagePath":"pages/index/index","iconPath":"static/home.png","selectedIconPath":"static/home(1).png","text":"首页"},{"pagePath":"pages/gjq/gjq","iconPath":"static/jsq.png","selectedIconPath":"static/jsq1.png","text":"估价器"},{"pagePath":"pages/gift/gift","iconPath":"static/gift.png","selectedIconPath":"static/gift1.png","text":"领福利"},{"pagePath":"pages/mine/mine","iconPath":"static/mine.png","selectedIconPath":"static/mine1.png","text":"个人中心"}]},"nvueCompiler":"uni-app","nvueStyleCompiler":"weex","renderer":"auto","splashscreen":{"alwaysShowBeforeRender":true,"autoclose":false},"appname":"zhubajie","compilerVersion":"3.1.13","entryPagePath":"pages/index/index","networkTimeout":{"request":60000,"connectSocket":60000,"uploadFile":60000,"downloadFile":60000}};
var __uniRoutes = [{"path":"/pages/index/index","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"猪八戒网"}},{"path":"/pages/gjq/gjq","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"","enablePullDownRefresh":false}},{"path":"/pages/mine/mine","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"个人中心","enablePullDownRefresh":false}},{"path":"/pages/gift/gift","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"","enablePullDownRefresh":false}},{"path":"/pages/login/login","meta":{},"window":{"navigationBarTitleText":"用户登录","enablePullDownRefresh":false}},{"path":"/pages/renwu/renwu","meta":{},"window":{"navigationBarTitleText":"完善需求","enablePullDownRefresh":false}},{"path":"/pages/fuwenben/fuwenben","meta":{},"window":{"navigationBarTitleText":"富文本","enablePullDownRefresh":false}},{"path":"/pages/xiangqing/xiangqing","meta":{},"window":{"navigationBarTitleText":"任务详情","enablePullDownRefresh":false}},{"path":"/pages/dingdanlist/dingdanlist","meta":{},"window":{"navigationBarTitleText":"任务列表","enablePullDownRefresh":false}},{"path":"/pages/rwlist/rwlist","meta":{},"window":{"navigationBarTitleText":"","enablePullDownRefresh":false}}];
__uniConfig.onReady=function(callback){if(__uniConfig.ready){callback()}else{onReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"ready",{get:function(){return isReady},set:function(val){isReady=val;if(!isReady){return}const callbacks=onReadyCallbacks.slice(0);onReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
__uniConfig.onServiceReady=function(callback){if(__uniConfig.serviceReady){callback()}else{onServiceReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"serviceReady",{get:function(){return isServiceReady},set:function(val){isServiceReady=val;if(!isServiceReady){return}const callbacks=onServiceReadyCallbacks.slice(0);onServiceReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
service.register("uni-app-config",{create(a,b,c){if(!__uniConfig.viewport){var d=b.weex.config.env.scale,e=b.weex.config.env.deviceWidth,f=Math.ceil(e/d);Object.assign(__uniConfig,{viewport:f,defaultFontSize:Math.round(f/20)})}return{instance:{__uniConfig:__uniConfig,__uniRoutes:__uniRoutes,global:void 0,window:void 0,document:void 0,frames:void 0,self:void 0,location:void 0,navigator:void 0,localStorage:void 0,history:void 0,Caches:void 0,screen:void 0,alert:void 0,confirm:void 0,prompt:void 0,fetch:void 0,XMLHttpRequest:void 0,WebSocket:void 0,webkit:void 0,print:void 0}}}});
