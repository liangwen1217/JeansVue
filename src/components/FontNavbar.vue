<template>
    <div>
        <!-- 導覽列 -->
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
            <div class="container">
                <nav class="navbar navbar-dark bg-dark p-0">
                    <router-link class="navbar-brand d-flex justify-content-center align-items-center mr-0"
                        to="/">
                        <img src="../assets/images/jeans.svg"
                          class="d-none d-md-inline-block mr-3"
                          height="45"
                          alt=""/>
                        <div class="d-inline-block d-flex flex-column nav-title">
                            <h1 class="text-title mb-0" style="letter-spacing: 5px;">
                                牛仔牛仔
                            </h1>
                            <span class="h6 align-self-center" style="letter-spacing: 5px;"
                                >Jeans</span>
                        </div>
                    </router-link>
                </nav>
                <!-- 收藏清單按鈕 -->
                <div class="dropdown order-md-3">
                    <button class="btn text-light btn-cart"
                        data-toggle="dropdown"
                        data-flip="false">
                        <i class="fas fa-heart"></i>
                    </button>
                    <div class="dropdown-menu dropdown-menu-right dropdown-menu-width"
                        aria-labelledby="dropdownMenuButton">
                        <div class="px-4 py-3">
                            <h6>收藏清單</h6>
                            <small v-if="!collected.length">
                                <router-link to="/products">還沒想要穿的牛仔褲</router-link>
                            </small>
                            <table class="table table-sm" v-if="collected.length">
                                <tbody>
                                    <tr v-for="(item, key) in collected" :key="key">
                                        <td class="align-middle text-center">
                                            <a href="#" class="text-muted" @click.prevent="disCollected(item.id)">
                                                <i class="fa fa-trash" aria-hidden="true"></i>
                                            </a>
                                        </td>
                                        <td class="align-middle">
                                            {{item.title}}
                                        </td>
                                        <td class="align-middle text-center">
                                            <a href="#" class="text-muted" @click.prevent="addtoCart(item.id), disCollected(item.id)">
                                                <i class="fa fa-cart-plus"></i>
                                            </a>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <!-- 購物車按鈕 -->
                <div class="dropdown order-md-4">
                    <button class="btn text-light btn-cart" data-toggle="dropdown" data-flip="false">
                        <i class="fas fa-shopping-cart"></i>
                        <span class="badge badge-pill badge-danger" v-if="cart.carts.length">
                            {{ cart.carts.length}}
                        </span>
                    </button>
                    <div class="dropdown-menu dropdown-menu-right dropdown-menu-width" aria-labelledby="dropdownMenuButton">
                        <div class="px-4 py-3">
                            <h6>已選購商品</h6>
                            <small v-if="!cart.carts.length">
                                <router-link to="/products">快將牛仔褲加入購物車！</router-link>
                            </small>
                            <table class="table table-sm" v-if="cart.carts.length">
                                <tbody>
                                    <tr v-for="item in cart.carts" :key="item.id">
                                        <td class="align-middle text-center">
                                            <a href="#" class="text-muted"
                                                @click.prevent="deleteModal(item)">
                                                <i class="fa fa-trash" aria-hidden="true"></i>
                                            </a>
                                        </td>
                                        <td class="align-middle">{{ item.product.title }}</td>
                                        <td class="align-middle">x{{ item.qty }}</td>
                                        <td class="align-middle text-center">
                                        {{ item.total | currency }}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <router-link v-if="cart.carts.length" to="/cart" class="btn btn-block bg-primary text-white">
                                結帳去
                            </router-link>
                        </div>
                    </div>
                </div>
                <!-- menu toggle button -->
                <button class="navbar-toggler d-flex align-items-center border-0 d-md-none" type="button"
                    data-toggle="collapse"
                    data-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <div class="navbar-nav text-center ml-auto">
                        <router-link class="nav-link nav-item" to="/" exact>
                            首頁
                        </router-link>
                        <router-link class="nav-link nav-item" to="/products">商品</router-link>
                        <router-link class="nav-link nav-item" to="/signin" exact>登入</router-link>
                    </div>
                </div>
            </div>
        </nav>
    </div>
</template>

<script>
export default {
    methods: {
        getCart() {
            this.$store.dispatch('getCart');
        },
        deleteModal(item){
            this.$emit('openModal', item);
        },
        disCollected(itemId) {
            this.$store.commit('DISCOLLECTED', itemId);
        },
        addtoCart(id,qty =1 ) {
            const target = this.cart.carts.filter(items => items.product_id === id);
            if(target.length > 0){
                const samCartItem = target[0];
                const originQty = samCartItem.qty;
                const originCartId = samCartItem.id;
                const originProductId = sameCartItem.product.id;
                const newQty = originQty + qty;
                this.$store.dispatch('updateProductQty', { originCartId, originProductId, newQty });
                this.openAddModal();
            } else {
                this.$store.dispatch('addtoCart', {id , qty});
                this.openAddModal();
            }
        },
        openAddModal() {
            this.$emit('openAddModal');
        },
    },
    computed: {
        cart() {
            return this.$store.state.cart;
        },
        collected() {
            return this.$store.state.CustomerProducts.collected;
        },
    },
    created() {
        this.getCart();
    },
};
</script>

<style lang="scss" scoped>
.nav-title {
  @media (max-width: 576px) {
    h1 {
      font-size: 32px;
    }
  }
}
td {
  font-size: 16px;
}
.dropdown-menu-width {
  width: 350px;
  @media (max-width: 768px) {
    width: 225px;
  }
}
</style>