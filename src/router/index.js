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
			},
			{
				path:'proManage',
				component: () => import('../component/proManage/proManage')
			}
		]
	}
]

const router = new VueRouter({
	routes
})

//路径控制
router.beforeEach((to, from, next) => {
	//to 导向的路径  //from输入的路径   //next放行
	//访问登录页，无限制
	if (to.path === '/login') {
		next();
	} else {
		//根据token判断用户是否登录
		if (window.localStorage.getItem('token')) {
			//token存在,放行
			next();
		} else {
			//用户未登录，重定向到登录页
			next('/login');
		}
	}
})

export default router
