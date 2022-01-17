import axios from 'axios'
import{ Message } from 'element-ui'
import router from '@/router/index.js'
axios.interceptors.response.use(success => {
    if(success.status && success.status == 200){
        if( success.data.code == 500 || success.data.code == 401 || success.data.code == 403 ){
            Message.error({message:success.data.message});
            return       
        }
        if (success.data.message){
            Message.success({message:success.data.message})
        }
    }
    return success.data;
}, err => {
    if (error.response.code == 504 || error.response.code == 404) {
        Message.error({message:'真不行啊'});
    }else if(error.response.code == 403) {
        Message.error({message:'权限不足，联系管理员'})
    }else if(error.response.code == 401) {
        Message.error({message:'没登录啊'})
        router.replace('/')
    }else {
        if(error.response.data.message) {
            Message.error({message:error.response.data.message});
        }else{
            Message.error({message:'什么情况!'})
        }
    }
    return
});
//封装请求
let baseUrl =''
export const postRequest = (url,params) => {
    return axios({
        method:'post',
        url:'${baseUrl}${url}',
        data:params
    })
}


// axios.interceptors.response.use( res => {
//     console.log(res);
// },err => {
//     console.log(err);
// }
// )