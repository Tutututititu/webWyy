import Vue from 'vue'
import VueRouter from 'vue-router'
import login from '@/views/login.vue'
import loginAdd from '@/views/loginAdd.vue'
import home from '@/views/home.vue'
import welcome from '@/pages/welcome/welcome.vue'
import users from '@/pages/users/users.vue'
Vue.use(VueRouter)

const routes = [
    {
        path:'',
        redirect:'/login',
        // meta:{
        //     title:'登录'          
        // }
    },
    {
        path:'/login',
        component: login,
        // meta:{
        //     title:'登录'          
        // }
    },
    {
        path:'/loginAdd',
        component:loginAdd,
        // meta:{
        //     title:'注册'
        // }
    },
    {
        path:'/home',
        component:home,
        meta:{
            title:'中心'
        },
        redirect:'/home/users',
        children:[
            {
                path:'welcome',
                component:welcome,
                meta:{
                    title:'welcom'
                }
            },
            {
                path:'users',
                component:users
            }
        ]
    }
]

const router = new VueRouter({
    routes
})
router.beforeEach((to, from, next) => {
    // document.title = to.matched[0].meta.title
    if(to.path === '/login') return next()
    const tonkenStr = window.sessionStorage.getItem('token')
    if(!tonkenStr) return next('/login')
    next()
})
export default router