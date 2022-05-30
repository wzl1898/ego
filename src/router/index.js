import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from "../components/Login"
import LoginForm from "../components/LoginForm"
import Register from "../components/Register"
import ProductList from "../components/ProductList"
import ProductDetail from "../components/ProductDetail"
import OrderPage from "../components/OrderPage"
import Personal from "../components/Personal"
import Tickets from '../components/Tickets'
import MessageList from "../components/MessageList"
import Message from "../components/Message"
import OnSale from "../components/OnSale"
import AdminProductDetail from "../components/AdminProductDetail"
import AdminLogin from "../components/AdminLogin"
import AdminProductList from "../components/AdminProductList"
import UpdateProfile from "../components/UpdateProfile"
import test from "../components/test"

// import { Message } from 'element-ui'

Vue.use(VueRouter)

const router = new VueRouter({
    routes: [
        {
            path: "/",
            redirect: "/login",
        },
        {
            path: "/login",
            component: Login,
        },
        {
            path: "/register",
            component: Register,
        },
        {
            path: "/loginForm",
            component: LoginForm,
        },
        {
            path: "/ProductList",
            component: ProductList,
        },
        {
            name: "ProductDetail",
            path: "/ProductDetail/:goodStr",
            component: ProductDetail,
        },
        {
            name: "orderPage",
            path: "/orderPage",
            component: OrderPage,
        },
        {
            path: "/personal",
            component: Personal,
        },
        {
            name: "Tickets",
            path: "/tickets",
            component: Tickets,
        },
        {
            path: "/MessageList",
            component: MessageList,
        },
        {
            path: "/Message",
            component: Message,
        },
        {
            path: "/onSale",
            component: OnSale,
        },
        {
            path: "/adminLogin",
            component: AdminLogin
        },
        {
            path: "/adminProductList",
            component: AdminProductList
        },
        {
            name: "AdminProductDetail",
            path: "/AdminProductDetail/:goodStr",
            component: AdminProductDetail
        },
        {
            path: "/test",
            component: test,
        },
        {
            path: "/updateProfile",
            component: UpdateProfile
        },
    ]
});

export default router;