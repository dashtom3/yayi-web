import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/website/index/index'
// 懒加载方式，当路由被访问的时候才加载对应组件
const Details = resolve => require(['@/components/website/details/details'], resolve)
const BrandLib = resolve => require(['@/components/website/brandLib/brandLib'], resolve)
const Center = resolve => require(['@/components/website/center/center'], resolve)
const Gwc = resolve => require(['@/components/website/gwc/gwc'], resolve)
const Suborder = resolve => require(['@/components/website/gwc/suborder'], resolve)
const Pay = resolve => require(['@/components/website/gwc/pay'], resolve)
const PaySuccess =resolve => require(['@/components/website/gwc/paySuccess.vue'], resolve)
const PayFail =resolve => require(['@/components/website/gwc/payFail.vue'], resolve)
const Preview = resolve => require(['@/components/website/preview/details'], resolve)

// 创客系统
const SalesIndex = resolve => require(['@/components/salesman/index/index'], resolve)
const SalesLog = resolve => require(['@/components/salesman/logIn/logIn'], resolve)

//后台管理
const Home = resolve => require(['@/components/admin/Home'], resolve)
const Login = resolve => require(['@/components/admin/Login'], resolve)

// 商品基础资料管理
const BsseInfoManner_attr =resolve => require(['@/components/admin/bsseInfoManner/attr'], resolve)
const BsseInfoManner_brand =resolve => require(['@/components/admin/bsseInfoManner/brand'], resolve)
const BsseInfoManner_classfy = resolve => require(['@/components/admin/bsseInfoManner/classfy'], resolve)

// 商品信息管理
const MerchantMessage =resolve => require(['@/components/admin/merchantMessage/merchantMessage'], resolve)
const AddMerchandise =resolve => require(['@/components/admin/merchantMessage/addMerchandise'], resolve)
const SecondStep = resolve => require(['@/components/admin/merchantMessage/secondStep'], resolve)

//交易管理
const TradeManner_order =resolve => require(['@/components/admin/tradeManner/order'], resolve)
const TradeManner_evaluate = resolve => require(['@/components/admin/tradeManner/evaluate'], resolve)

// 用户管理
const UserManner_userList =resolve => require(['@/components/admin/userManner/userList'], resolve)
const UserManner_moneyList =resolve => require(['@/components/admin/userManner/moneyList'], resolve)
const UserManner_certificationList = resolve => require(['@/components/admin/userManner/certificationList'], resolve)

//系统管理
const AdminManner_admin = resolve => require(['@/components/admin/adminManner/admin'], resolve)

// 销售员管理
const SalesManner_salesList =resolve => require(['@/components/admin/salesManner/salesList'], resolve)
const SalesManner_incomeList =resolve => require(['@/components/admin/salesManner/incomeList'], resolve)
const SalesManner_getMoneyManner = resolve => require(['@/components/admin/salesManner/getMoneyManner'], resolve)
const SalesManner_customerManner = resolve => require(['@/components/admin/salesManner/customerManner'], resolve)

//广告设置
const AdvertSets_adv = resolve => require(['@/components/admin/advertSets/adv'], resolve)

//视频管理
const VideoManner_video = resolve => require(['@/components/admin/videoManner/video'], resolve)

// 运费管理
const FreightSet = resolve => require(['@/components/admin/freightManner/freightSet'], resolve)

//数据统计
const DataStatis_goodsStatis =resolve => require(['@/components/admin/dataStatis/goodsStatis'], resolve)
const DataStatis_elecSuppStatis =resolve => require(['@/components/admin/dataStatis/elecSuppStatis'], resolve)
const DataStatis_salesStatis = resolve => require(['@/components/admin/dataStatis/salesStatis'], resolve)

Vue.use(Router)

let router = new Router({
	mode: 'history',
	routes: [
	{ path: '/', redirect: { name: 'index' }},
	{
		path: '/index',
		name: 'index',
		component: Index,
	},
	{
		path: '/center',
	  name: 'center',
    component: Center
	},
	{
		path: '/details/:goodId',
		name: 'details',
    component: Details,
	},
  {
    path: '/preview/:goodId',
    component: Preview,
  },
	{
		path: '/brandLib/:classifyIdAndbrandId',
		name: 'brandLib',
    component: BrandLib,
	},
	{
		path: '/gwc',
		name: 'gwc',
    component: Gwc,
	},
	{
		path: '/suborder',
		name: 'suborder',
    component: Suborder,
	},
	{
		path: '/pay',
		name: 'pay',
    component: Pay,
	},
  {
    path: '/paySuccess',
    component: PaySuccess,
  },
  {
    path: '/payFail',
    component: PayFail,
  },
	//后台管理router
    {
      path: '/admin/login',
      name: '登录',
      component: Login
    },
    {
      path: '/admin',
      name: 'home',
      component: Home,
      redirect: '/admin/login',
      leaf: true, // 只有一个节点
      menuShow: true,
      iconCls: 'iconfont icon-home', // 图标样式class
    },
		{
      path: '/admin/bsseInfoManner/attr',
      component: Home,
      name: '商品基础资料管理',
      menuShow: true,
      //leaf: true, // 只有一个节点
      iconCls: 'iconfont icon-books', // 图标样式class
      children: [
        {path: '/admin/bsseInfoManner/attr', component: BsseInfoManner_attr, name: '商品属性管理', menuShow: true},
				{path: '/admin/bsseInfoManner/classfy', component: BsseInfoManner_classfy, name: '商品分类管理', menuShow: true},
				{path: '/admin/bsseInfoManner/brand', component: BsseInfoManner_brand, name: '商品品牌管理', menuShow: true}
      ]
    },
    {
      path: '/',
      component: Home,
      name: '商品信息管理',
      menuShow: true,
      leaf: true, // 只有一个节点
      iconCls: 'iconfont icon-books', // 图标样式class
      children: [
        {path: '/admin/merchantMessage', component: MerchantMessage, name: '商品信息管理', menuShow: true},
        {path: '/admin/addMerchandise', component: AddMerchandise, name: 'addMerchandise', menuShow: true},
        {path: '/admin/secondStep', component: SecondStep, name: 'secondStep', menuShow: true},
      ]
    },
    {
      path: '/tradeManner',
      component: Home,
      name: '交易管理',
      menuShow: true,
      //leaf: true, // 只有一个节点
      iconCls: 'iconfont icon-menuunfold', // 图标样式class
      children: [
        {path: '/admin/tradeManner/order', component: TradeManner_order, name: '订单管理', menuShow: true},
        {path: '/admin/tradeManner/evaluate', component: TradeManner_evaluate, name: '评价管理', menuShow: true}
      ]
    },
		{
      path: '/userManner',
      component: Home,
      name: '用户管理',
      menuShow: true,
      //leaf: true, // 只有一个节点
      iconCls: 'iconfont icon-users', // 图标样式class
      children: [
        {path: '/admin/userManner/userList', component: UserManner_userList, name: '用户列表', menuShow: true},
				{path: '/admin/userManner/moneyList', component: UserManner_moneyList, name: '乾币列表', menuShow: true},
				{path: '/admin/userManner/certificationList', component: UserManner_certificationList, name: '资质列表', menuShow: true}
      ]
    },
		{
      path: '/salesManner',
      component: Home,
      name: '销售员管理',
      menuShow: true,
      //leaf: true, // 只有一个节点
      iconCls: 'iconfont icon-users', // 图标样式class
      children: [
        {path: '/admin/salesManner/salesList', component: SalesManner_salesList, name: '销售员列表', menuShow: true},
				{path: '/admin/salesManner/incomeList', component: SalesManner_incomeList, name: '收入列表', menuShow: true},
				{path: '/admin/salesManner/getMoneyManner', component: SalesManner_getMoneyManner, name: '提现管理', menuShow: true},
        {path: '/admin/salesManner/customerManner', component: SalesManner_customerManner, name: '客户资源管理', menuShow: true}
      ]
    },
    {
      path: '/advertSets',
      component: Home,
      name: '广告设置',
      menuShow: true,
      leaf: true, // 只有一个节点
      iconCls: 'iconfont icon-books2', // 图标样式class
      children: [
        {path: '/admin/advertSets/adv', component: AdvertSets_adv, name: '广告设置', menuShow: true}
      ]
    },
    {
      path: '/videoManner',
      component: Home,
      name: '视频管理',
      menuShow: true,
      leaf: true, // 只有一个节点
      iconCls: 'iconfont icon-books2', // 图标样式class
      children: [
        {path: '/admin/videoManner/video', component: VideoManner_video, name: '视频管理', menuShow: true}
      ]
    },
		{
      path: '/freightManner',
      component: Home,
      name: '运费管理',
      menuShow: true,
      //leaf: true, // 只有一个节点
      iconCls: 'iconfont icon-books2', // 图标样式class
      children: [
        {path: '/admin/freightManner/freightSet', component: FreightSet, name: '运费设置', menuShow: true}
      ]
    },
    {
      path: '/dataStatis',
      component: Home,
      name: '数据统计',
      menuShow: true,
      //leaf: true, // 只有一个节点
      iconCls: 'iconfont icon-books1', // 图标样式class
      children: [
        {path: '/admin/dataStatis/goodsStatis', component: DataStatis_goodsStatis, name: '商品统计', menuShow: true},
        {path: '/admin/dataStatis/elecSuppStatis', component: DataStatis_elecSuppStatis, name: '电商用户统计', menuShow: true},
        {path: '/admin/dataStatis/salesStatis', component: DataStatis_salesStatis, name: '销售员统计', menuShow: true}
      ]
    },
    {
      path: '/adminManner',
      component: Home,
      name: '系统管理',
      menuShow: true,
      // leaf: true, // 只有一个节点
      iconCls: 'iconfont icon-setting', // 图标样式class
      children: [
        // {path: '/admin/adminManner/oplog', component: adminManner_oplog, name: '操作日志', menuShow: true},
        {path: '/admin/adminManner/admin', component: AdminManner_admin, name: '管理员列表', menuShow: true}
      ]
    },
    //创客系统
		{
			path: '/salesIndex',
			name: 'salesIndex', 
			component: SalesIndex,
		},
    {
      path: '/salesLog',
      name: 'salesLog',
      component: SalesLog,
    },
	],
})

// router.beforeEach((to, from, next) => {
// 	console.log(to.path)
// 	let admin = JSON.parse(window.sessionStorage.getItem('access-user'));
// 	var isIn = to.path.indexOf("/admin")<0;
// 	if(isIn==false){
// 		//判断是否是后台登陆 isIn==false是后台
// 		if(to.path=="/admin/login"){
// 			next();
// 		}else{
// 			if(admin){
// 				// 判断管理员是否登陆
// 				next();
// 			}else{
// 				next({ path: '/admin/login' })
// 			}
// 		}
// 	}else{
// 		next();
// 	}
// })

// router.beforeEach((to, from, next) => {
//   // console.log('to:' + to.path)
//   if (to.path.startsWith('/admin/login')) {
//     window.sessionStorage.removeItem('access-user')
//     next()
//   } else {
//     let user = JSON.parse(window.sessionStorage.getItem('access-user'))
//     if (!user) {
//       next({path: '/admin/login'})
//     } else {
//       next()
//     }
//   }
// })

export default router
