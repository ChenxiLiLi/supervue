/**
 * 封装axios,统一处理请求异常
 */
import axios from 'axios'
import {Message} from "element-ui";
import router from "../router/index";
//创建axios实例
const instance = axios.create({
    timeout: 1000*12,
    baseURL: 'http://127.0.0.1:7777/'
})
//post请求头格式
instance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

//请求拦截器
instance.interceptors.request.use(config => {
    //发送请求前判断是否存在token
    const token = localStorage.getItem('token');
    //存在token,将token加到请求头上，用于后台判断登录情况
    token && (config.headers.Authorization = token);
    return config;
}, error => {
    Message.error({message: '请求超时,请稍后重试!'});
    return Promise.resolve(error);
})
//响应拦截器，错误处理使用Promise.resolve()
instance.interceptors.response.use(resp => {
    //{status:'', msg:'', obj:''}
    if (resp.status && resp.status === 200 && resp.data.status === 500) {
        //请求成功,逻辑出错,展示错误信息
        Message.error({message: resp.data.msg});
        return ;
    }
    //展示成功信息
    if (resp.data.msg) {
        Message.success({message: resp.data.msg})
    }
    return resp.data;
}, error => {
    console.log(error.response)
    if (error.response.status === 504 || error.response.status === 404) {
        Message.error({message: '服务器去度假了,请稍后重试!'})
    } else if (error.response.status === 403) {
        Message.error({message: '权限不足，请联系管理员'})
    } else if (error.response.status === 401) {
        Message.error({message: '您尚未登录，请先登录'})
        //转到登录页
        router.replace('/login');
    } else {
        //其余错误，直接给出错误提示
        if (error.response.data.msg) {
            Message.error({message: error.response.data.msg})
        } else {
            Message.error({message: '未知错误!'})
        }
    }
})
export default instance;