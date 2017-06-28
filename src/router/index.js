import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/website/index/index'
import details from '@/components/website/details/details'
import brandLib from '@/components/website/brandLib/brandLib'
import center from '@/components/website/center/center'
import gwc from '@/components/website/gwc/gwc'
import suborder from '@/components/website/gwc/suborder'
import pay from '@/components/website/gwc/pay'
import publicHeader from '@/components/website/index/publicHeader'

//后台管理
import Home from '@/components/admin/Home'
// import Dashboard from '@/components/admin/Dashboard'

// import BookList from '@/components/admin/book/list'
// import BookCategoryList from '@/components/admin/bookcategory/list'
//
// import UserList from '@/components/admin/user/list'
// import UserChangePwd from '@/components/admin/user/changepwd'
// import UserProfile from '@/components/admin/user/profile'



// 商品基础资料管理
import bsseInfoManner_attr from '@/components/admin/bsseInfoManner/attr'
import bsseInfoManner_brand from '@/components/admin/bsseInfoManner/brand'
import bsseInfoManner_classfy from '@/components/admin/bsseInfoManner/classfy'

// 商品信息管理
import merchantMessage from '@/components/admin/merchantMessage/merchantMessage'
import secondStep from '@/components/admin/merchantMessage/secondStep'

//交易管理
import tradeManner_order from '@/components/admin/tradeManner/order'
import tradeManner_evaluate from '@/components/admin/tradeManner/evaluate'

// 用户管理
import userManner_userList from '@/components/admin/userManner/userList'
import userManner_moneyList from '@/components/admin/userManner/moneyList'
import userManner_certificationList from '@/components/admin/userManner/certificationList'

//系统管理
import adminManner_oplog from '@/components/admin/adminManner/oplog'
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
const Login = resolve => require(['@/components/admin/Login'], resolve)

Vue.use(Router)

let router = new Router({
	// mode: 'history',
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
		component: center,
	},
	{
		path: '/details/:goodId',
		name: 'details',
		component: details,
	},
	{
		path: '/brandLib/:classifyIdAndbrandId',
		name: 'brandLib',
		component: brandLib,
	},
	{
		path: '/gwc',
		name: 'gwc',
		component: gwc,
	},
	{
		path: '/suborder',
		name: 'suborder',
		component: suborder,
	},
	{
		path: '/pay',
		name: 'pay',
		component: pay,
	},
  {
    path: '/publicHeader',
    name: 'publicHeader',
    component: publicHeader,
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
      // children: [
      //   {path: '/admin/dashboard', component: Dashboard, name: '首页', menuShow: true}
      // ]
    },

		{
      path: '/admin/bsseInfoManner/attr',
      component: Home,
      name: '商品基础资料管理',
      menuShow: true,
      //leaf: true, // 只有一个节点
      iconCls: 'iconfont icon-users', // 图标样式class
      children: [
        {path: '/admin/bsseInfoManner/attr', component: bsseInfoManner_attr, name: '商品属性管理', menuShow: true},
				{path: '/admin/bsseInfoManner/classfy', component: bsseInfoManner_classfy, name: '商品分类管理', menuShow: true},
				{path: '/admin/bsseInfoManner/brand', component: bsseInfoManner_brand, name: '商品品牌管理', menuShow: true}
      ]
    },
    {
      path: '/admin',
      component: Home,
      name: '商品信息管理',
      menuShow: true,
      leaf: true, // 只有一个节点
      iconCls: 'iconfont icon-setting1', // 图标样式class
      children: [
        {path: '/admin/merchantMessage', component: merchantMessage, name: '商品信息管理', menuShow: true},
        {path: '/admin/secondStep', component: secondStep, name: 'secondStep', menuShow: true},
      ]
    },
    {
      path: '/tradeManner',
      component: Home,
      name: '交易管理',
      menuShow: true,
      //leaf: true, // 只有一个节点
      iconCls: 'iconfont icon-users', // 图标样式class
      children: [
        {path: '/admin/tradeManner/order', component: tradeManner_order, name: '订单管理', menuShow: true},
        {path: '/admin/tradeManner/evaluate', component: tradeManner_evaluate, name: '评价管理', menuShow: true}
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
      iconCls: 'iconfont icon-users', // 图标样式class
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
      iconCls: 'iconfont icon-users', // 图标样式class
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
      iconCls: 'iconfont icon-users', // 图标样式class
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
      iconCls: 'iconfont icon-users', // 图标样式class
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
      iconCls: 'iconfont icon-users', // 图标样式class
      children: [
        {path: '/admin/adminManner/oplog', component: adminManner_oplog, name: '操作日志', menuShow: true},
        {path: '/admin/adminManner/admin', component: adminManner_admin, name: '管理员列表', menuShow: true}
      ]
    }
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
