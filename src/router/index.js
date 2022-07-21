import { createRouter, createWebHistory } from 'vue-router'
// import shopCart from "@/views/shopcart/ShopCart";
// import HomeView from '../views/HomeView.vue'
const Home=()=>import( '../views/home/Home')
const Category=()=>import( '../views/category/Category')
const Detail=()=>import( '../views/detail/Detail')
const Profile=()=>import( '../views/profile/Profile')
const ShopCart=()=>import( '../views/shopcart/ShopCart')
const Register=()=>import('../views/profile/Register')
const Login=()=>import('../views/profile/Login')
const AddressEdit=()=>import('../views/profile/AddressEdit')
const Address=()=>import('../views/profile/Address')
const CreateOrder=()=>import('../views/order/CreateOrder')
const OrderDetail=()=>import('../views/order/OrderDetail')
const Order=()=>import('../views/order/Order')
import {Dialog} from 'vant';
import store from '../store';


const routes = [
  {
    path: '',
    name: 'DefaultHome',
    component: Home,
    meta:{
      title:'图书兄弟'
    }
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    meta:{
      title:'图书兄弟'
    }
  },
  {
    path: '/category',
    name: 'Category',
    component: Category,
    meta:{
      title:'图书兄弟-商品分类'
    }
  },
  {
    path: '/detail',
    name: 'Detail',
    component: Detail,
    meta:{
      title:'图书兄弟-商品详情'
    }
  },
  {
    path: '/shopcart',
    name: 'ShopCart',
    component: ShopCart,
    meta:{
      title:'图书兄弟-购物车',
      isAuthRequired:true
    }
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile,
    meta:{
      title:'图书兄弟-个人中心',
      isAuthRequired:true
    }
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
    meta:{
      title:'图书兄弟-用户注册'
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta:{
      title:'图书兄弟-用户登录'
    }
  },
  {
    path: '/address',
    name: 'Address',
    component: Address,
    meta: {
      title: '图书兄弟-地址管理',
      isAuthRequired:true
    }
  },
  {
    path: '/addressedit',
    name: 'AddressEdit',
    component: AddressEdit,
    meta: {
      title: '图书兄弟-地址编辑',
      isAuthRequired:true
    }
  },
  {
    path: '/createorder',
    name: 'CreateOrder',
    component: CreateOrder,
    meta: {
      title: '图书兄弟-订单预览',
      isAuthRequired:true
    }
  },
  {
    path: '/orderdetail',
    name: 'OrderDetail',
    component: OrderDetail,
    meta: {
      title: '图书兄弟-订单详情',
      isAuthRequired:true
    }
  },
  {
    path: '/order',
    name: 'Order',
    component: Order,
    meta: {
      title: '图书兄弟-订单列表',
      isAuthRequired:true
    }
  }

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})
//导航守卫
router.beforeEach((to,from,next)=>{
  //如果没有登录，从这里转到login
  if(to.meta.isAuthRequired && store.state.user.isLogin===false){
    Dialog.alert({
      message: '您还未登录，请先登录',
      theme: 'round-button',
      confirmButtonColor:'#44b883'
    })
    setTimeout(()=>{
      return next('/login')
    },1000)

  }else{
    next();
  }
  document.title=to.meta.title;
})
export default router;
