import Vue from 'vue'
import VueRouter from 'vue-router'
//官方元件

// import HelloWorld from '@/components/HelloWorld';
import Dashboard from '@/components/Dashboard';
import Login from '@/components/pages/Login';
import Products from '@/components/pages/Products';
import CustomerOrder from '@/components/pages/CustomerOrders';
import Coupon from '@/components/pages/Coupon';
import CustomerCheckout from '@/components/pages/CustomerCheckout';
import Orders from '@/components/pages/Orders';


//自訂的分頁元件

Vue.use(VueRouter);


export default new VueRouter({ 
    routes:[
        {
            path: '/',
            component: () => import('../views/front/Front.vue'),
            children: [
                {
                    path: '',
                    name: 'Home',
                    component: () => import('../views/front/Home.vue'),
                },
                {
                    path: 'signin',
                    name: 'Login',
                    component: () => import('../views/front/Login.vue'),
                },
                {
                    path: 'products',
                    name: 'Products',
                    component: () => import('../views/front/Products.vue'),
                },
                {
                    path: 'products/:productId',
                    name: 'SingleProduct',
                    component: () => import('../views/front/SingleProduct.vue'),
                },
            ],
        },
        {
            path: '/cart',
            component: () => import('../views/front/Checkout.vue'),
            children: [
                {
                    path: '',
                    name: 'Cart',
                    component: () => import('../views/front/Cart.vue'),
                },
                {
                    path: 'customerinfo',
                    name: 'CustomerInfo',
                    component: () => import('../views/front/CustomerInfo.vue'),
                },
                {
                    path: 'payment/:orderId',
                    name: 'Payment',
                    component: () => import('../views/front/Payment.vue'),
                  },
                  {
                    path: 'paysuccess/:orderId',
                    name: 'PaySuccess',
                    component: () => import('../views/front/PaySuccess.vue'),
                  },
            ],
        },

        {
            path:'*',
            redirect:'login',
        },
        {
            path:'/login',//對應的虛擬路徑
            name:'Login',
            component:Login, //對應的元件
        },
        {
            name:'HelloWorld',//元件呈現的名稱
            path:'/admin',//對應的虛擬路徑
            component: Dashboard, //對應的元件
            children: [
                {
                    path:'products',//對應的虛擬路徑
                    name:'products',
                    component: Products, //對應的元件
                    meta: { requiresAuth: true },
                },
                {
                    path:'coupon',//對應的虛擬路徑
                    name:'coupon',
                    component: Coupon, //對應的元件
                    meta: { requiresAuth: true },
                },
                {
                    path:'orders',//對應的虛擬路徑
                    name:'orders',
                    component: Orders, //對應的元件
                    meta: { requiresAuth: true },
                },
            ]
        },
        // {
        //     name:'Dashboard',//元件呈現的名稱
        //     path:'/',//對應的虛擬路徑
        //     component: Dashboard, //對應的元件
        //     children: [
        //         {
        //             path:'customer_order',//對應的虛擬路徑
        //             name:'CustomerOrder',
        //             component: CustomerOrder, //對應的元件
        //         },
        //         {
        //             path:'customer_checkout/:orderId',//對應的虛擬路徑
        //             name:'CustomerCheckout',
        //             component: CustomerCheckout, //對應的元件
        //         },
        //     ]
        // },
    ],
});