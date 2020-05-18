import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

import CustomerProducts from './cusProducts';
import dashProducts from './dashProducts';
import Coupons from './coupons';

Vue.use(Vuex);

export default new Vuex.Store({
    state : {
        isLoading: false,
        cart: {
            carts: [],
            total: '',
            final_total: '',
        },
        cartOrder: [],
        messages: [],
    },
    actions: {
        updateLoading(context,status) {
            context.commit('LOADING',status);
        },
        getCart(context) {
            context.commit('LOADING', true);
            const url =`${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart`;
            axios.get(url).then((response) => {
                if(response.data.data.carts) {
                    context.commit('CART', response.data.data);
                    context.commit('CARTORDER', response.data.data.carts);
                }
                context.commit('LOADING', false);
            });
        },
        removeCart(context, id) {
            const url =`${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart/${id}`;
            context.commit('LOADING',true);
            axios.delete(url).then(()=> {
                context.commit('LOADING', false);
                context.dispatch('getCart');
            });
        },
        addtoCart(context, {id, qty}) {
            const url =`${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart`;
            context.commit('LOADING', true);
            const item = {
                product_id: id,
                qty,
            };
            axios.post(url, {data: item}).then(()=> {
                context.commit('LOADING',false);
                context.dispatch('getCart');
            });
        },
        updateMessage(context, { message, status}) {
            context.commit('MESSAGE', {message, status});
            const timestamp = Math.floor(new Date()/1000);
            context.dispatch('removeMessageWithTiming', timestamp);
        },
        removeMessageWithTiming(context, timestamp) {
            setTimeout(() => {
                context.state.messages.forEach((item, i) => {
                  if (item.timestamp === timestamp) {
                    context.state.messages.splice(i, 1);
                  }
                });
            },5000);
        },
        removeMessage(context, num){
            context.commit('REMOVEMESSAGE', num);
        },
        updateProductQty(context, { originCartId, originProductId, newQty }) {
            context.commit('LOADING', true);
            const delAPI = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart/${originCartId}`;
            const addAPI = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart`;
            const changeCart = {
              product_id: originProductId,
              qty: newQty,
            };
            axios
                .all(axios.delete(delAPI), axios.post(addAPI, {data: changeCart}))
                .then(axios.spread(()=> {
                    context.dispatch('getCart');
                    context.commit('LOANING',false); 
                }));
        },
        cartChangeQty(context, { id, productId, num }) {
            const delAPI = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart/${id}`;
            const addAPI = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart`;
            const changeCart = {
              product_id: productId,
              qty: num,
            };
            axios
            .all([axios.delete(delAPI), axios.post(addAPI, { data: changeCart })])
            .then(axios.spread(() => {
              context.dispatch('getCart');
              context.commit('LOADING', false);
            }));
        },

    },

    mutations: {
        LOADING(state, status) {
            state.isLoading = status;
        },
        CART(state, payload) {
            state.cart.carts = payload.carts;
            state.cart.total = payload.total;
            state.cart.final_total = payload.final_total;
        },
        CARTORDER(state, payload) {
            state.cartOrder = payload.sort((a, b) => b.qty - a.qty);
        },
        MESSAGE(state, {message, status}) {
            const timestamp =Math.floor(new Date() /1000);
            state.messages.push({
                message,
                status,
                timestamp,
            });
        },
        REMOVEMESSAGE(state, num) {
            state.messages.splice(num,1);
        },
    },
    modules: {
        dashProducts,
        Coupons,
        CustomerProducts,
    },
});