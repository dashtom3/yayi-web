import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/website/index/index'
import details from '@/components/website/details/details'
import brandLib from '@/components/website/brandLib/brandLib'
import center from '@/components/website/center/center'
import gwc from '@/components/website/gwc/gwc'
import suborder from '@/components/website/gwc/suborder'
import pay from '@/components/website/gwc/pay'

//后台管理
import Home from '@/components/admin/Home'
import Dashboard from '@/components/admin/Dashboard'

import BookList from '@/components/admin/book/list'
import BookCategoryList from '@/components/admin/bookcategory/list'

import UserList from '@/components/admin/user/list'
import UserChangePwd from '@/components/admin/user/changepwd'
import UserProfile from '@/components/admin/user/profile'



// 商品基础资料管理

import bsseInfoManner_attr from '@/components/admin/bsseInfoManner/attr'
import bsseInfoManner_brand from '@/components/admin/bsseInfoManner/brand'
import bsseInfoManner_classfy from '@/components/admin/bsseInfoManner/classfy'

// 商品信息管理
import merchantMessage from '@/components/admin/merchantMessage/merchantMessage'

// 懒加载方式，当路由被访问的时候才加载对应组件
const Login = resolve => require(['@/components/admin/Login'], resolve)

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
		component: center,
	},
	{
		path: '/details/:id',
		name: 'details',
		component: details,
	},
	{
		path: '/brandLib',
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
      children: [
        {path: '/admin/dashboard', component: Dashboard, name: '首页', menuShow: true}
      ]
    },

    {
      path: '/admin',
      component: Home,
      name: '用户管理',
      menuShow: true,
      leaf: true, // 只有一个节点
      iconCls: 'iconfont icon-users', // 图标样式class
      children: [
        {path: '/admin/user/list', component: UserList, name: '用户列表', menuShow: true}
      ]
    },
    {
      path: '/admin',
      component: Home,
      name: '商品基础资料管理',
      menuShow: true,
      iconCls: 'iconfont icon-books',
      children: [
        {path: '/admin/book/list', component: BookList, name: '图书列表', menuShow: true},
        {path: '/admin/book/category', component: BookCategoryList, name: '图书分类', menuShow: true}
      ]
    },
    {
      path: '/admin',
      component: Home,
      name: '设置',
      menuShow: true,
      iconCls: 'iconfont icon-setting1',
      children: [
        {path: '/admin/user/profile', component: UserProfile, name: '个人信息', menuShow: true},
        {path: '/admin/user/changepwd', component: UserChangePwd, name: '修改密码', menuShow: true}
      ]
    },
		{
      path: '/bsseInfoManner',
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
        {path: '/admin/merchantMessage', component: merchantMessage, name: '商品信息管理', menuShow: true}
      ]
    },
	],
})

// router.beforeEach((to, from, next) => {
//   //NProgress.start();
//   if (to.path == '/admin/login') {
//     window.sessionStorage.removeItem('access-user');
//   }
//   let user = JSON.parse(window.sessionStorage.getItem('access-user'));
//   if (!user) {
//     next({ path: '/admin/login' })
//   } else {
//     next()
//   }
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
