import Vue from 'vue'
import Router from 'vue-router'

import Index from '@components/Index/Index.vue'
import Cart from '@components/Shop/cart.vue'
import Mine from '@components/Mine/mine.vue'
import Goods from '@components/Shop/goods.vue'

Vue.use(Router)

export default new Router({
	routes: [
		{
			path: '/',
			redirect: '/shop/cart'
		},
		{
			path: '/index',
			component: Index
		},
		{
			path: '/shop/cart',
			component: Cart
		},
		{
			path: '/shop/goods',
			component: Goods
		},
		{
			path: '/mine/index',
			component: Mine
		}
	]
})