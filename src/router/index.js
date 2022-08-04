import vue from 'vue'
import VueRouter from 'vue-router'
import OrganizerIndex from '../components/OrganizerIndex.vue'
import OrganizerLogin from '../components/OrganizerLogin.vue'
import Login from '../components/Login.vue'
import Home from '../components/Home.vue'
import BeginVote from '../components/BeginVote.vue'
const router = new VueRouter({
    routes: [
        {
            path: '/',
            redirect: '/home'
        },
        {
            path: '/home',
            component: Home,
            // meta: { islogin: false },
            children: [
                {
                    path: 'organizerindex',
                    component: OrganizerIndex,
                    // meta: { islogin: true }
                },

                {
                    path: 'login',
                    component: Login,
                    // meta: { islogin: false }
                },
                {
                    path: 'beginvote',
                    component: BeginVote
                }
            ]
        }
    ]
})

// router.beforeEach((to, from, next) => {
//     let token = localStorage.getItem("token")//验证登录状态
//     console.log(token)
//     if (to.path == '/organizerindex') {//判断是否登录
//         alert('请先登录')
//         next({ path: '/' })
//     }
//     else {
//         next()
//     }


// })

export default router