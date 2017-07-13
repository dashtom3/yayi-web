import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/website/index/index'
const Details = resolve => require(['@/components/website/details/details'], resolve)
const BrandLib = resolve => require(['@/components/website/brandLib/brandLib'], resolve)
const Center = resolve => require(['@/components/website/center/center'], resolve)
const Gwc = resolve => require(['@/components/website/gwc/gwc'], resolve)
const Suborder = resolve => require(['@/components/website/gwc/suborder'], resolve)
const Pay = resolve => require(['@/components/website/gwc/pay'], resolve)
const PaySuccess =resolve => require(['@/components/website/gwc/paySuccess.vue'], resolve)
const PayFail =resolve => require(['@/components/website/gwc/payFail.vue'], resolve)
const Preview = resolve => require(['@/components/website/details/details'], resolve)

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
import userManner_userList from '@/components/admin/userManner/userList'
import userManner_moneyList from '@/components/admin/userManner/moneyList'
import userManner_certificationList from '@/components/admin/userManner/certificationList'

//系统管理
// import adminManner_oplog from '@/components/admin/adminManner/oplog'
import adminManner_admin from '@/components/admin/adminManner/admin'


// 销售员管理
import salesManner_salesList from '@/components/admin/salesManner/salesList'
import salesManner_incomeList from '@/components/admin/salesManner/incomeList'
import salesManner_getMoneyManner from '@/components/admin/salesManner/getMoneyManner'
import salesManner_customerManner from '@/components/admin/salesManner/customerManner'

//广告设置
import advertSets_adv from '@/components/admin/advertSets/adv'

//视频管理
import videoManner_video from '@/components/admin/videoManner/video'

// 运费管理
import freightSet from '@/components/admin/freightManner/freightSet'

//数据统计
import dataStatis_goodsStatis from '@/components/admin/dataStatis/goodsStatis'
import dataStatis_elecSuppStatis from '@/components/admin/dataStatis/elecSuppStatis'
import dataStatis_salesStatis from '@/components/admin/dataStatis/salesStatis'


// 懒加载方式，当路由被访问的时候才加载对应组件

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
        {path: '/admin/userManner/userList', component: userManner_userList, name: '用户列表', menuShow: true},
				{path: '/admin/userManner/moneyList', component: userManner_moneyList, name: '乾币列表', menuShow: true},
				{path: '/admin/userManner/certificationList', component: userManner_certificationList, name: '资质列表', menuShow: true}
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
        {path: '/admin/salesManner/salesList', component: salesManner_salesList, name: '销售员列表', menuShow: true},
				{path: '/admin/salesManner/incomeList', component: salesManner_incomeList, name: '收入列表', menuShow: true},
				{path: '/admin/salesManner/getMoneyManner', component: salesManner_getMoneyManner, name: '提现管理', menuShow: true},
        {path: '/admin/salesManner/customerManner', component: salesManner_customerManner, name: '客户资源管理', menuShow: true}
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
        {path: '/admin/advertSets/adv', component: advertSets_adv, name: '广告设置', menuShow: true}
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
        {path: '/admin/videoManner/video', component: videoManner_video, name: '视频管理', menuShow: true}
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
        {path: '/admin/freightManner/freightSet', component: freightSet, name: '运费设置', menuShow: true}
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
        {path: '/admin/dataStatis/goodsStatis', component: dataStatis_goodsStatis, name: '商品统计', menuShow: true},
        {path: '/admin/dataStatis/elecSuppStatis', component: dataStatis_elecSuppStatis, name: '电商用户统计', menuShow: true},
        {path: '/admin/dataStatis/salesStatis', component: dataStatis_salesStatis, name: '销售员统计', menuShow: true}
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
        {path: '/admin/adminManner/admin', component: adminManner_admin, name: '管理员列表', menuShow: true}
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
