import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
    state : {
        isLoading: false,
        cart: {
            carts: [],
        },
        cartOrder: [],
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
    },
});