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
				path:'staffsInfo',
				component: () => import('../component/staff/staffsInfo')
			},
			{
				path:'sellRecord',
				component: () => import('../component/sell/sellRecord')
			},
			{
				path:'sellOrder',
				component: () => import('../component/sell/sellOrder')
			},
			{
				path:'purchaseOrder',
				component: () => import('../component/purchase/purchaseOrder')
			},
			{
				path:'purchaseRecord',
				component: () => import('../component/purchase/purchaseRecord')
			},
			{
				path:'goodsDetails',
				component: () => import('../component/good/goodsDetails')
			}
		]
	}
]

const router = new VueRouter({
	routes
})

export default router
