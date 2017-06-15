import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/website/index/index'
import details from '@/components/website/details/details'
import brandLib from '@/components/website/brandLib/brandLib'
import center from '@/components/website/center/center'
import gwc from '@/components/website/gwc/gwc'
import suborder from '@/components/website/gwc/suborder'
import pay from '@/components/website/gwc/pay'

Vue.use(Router)

export default new Router({
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
	}
	],
    scrollBehavior (to, from, savedPosition) {
      console.log('to', to)
      if (to.hash) {
        return {
          selector: to.hash
        }
      }
    }
})
