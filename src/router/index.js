import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(VueRouter)
Vue.use(ElementUI)

const routes = [
	{path: '/', redirect: "/login"},
	{path: '/login', component: Login},
	{
		path: '/home',
		name: 'home',
		component: () => import('../views/Home'),
		children:[
			{
				path:'sellRecord',
				component: () => import('../component/sell/sellRecord')
			},
			{
				path:'sellOrder',
				component: () => import('../component/sell/sellOrder')
			},
			{
				path:'addGoods',
				component: () => import('../component/goods/addGoods')
			},
			{
				path:'goodsDetails',
				component: () => import('../component/goods/goodsDetails')
			}
		]
	}
]

const router = new VueRouter({
	routes
})

export default router
