<template>
    <div class="mb-3"
    :class="[
        { 'col-md-6': thisPage == 'productCard'},
        { 'col-md-4': thisPage == 'homeCard'},
    ]">
        <div class="item-card h-100 border-0">
            <div class="item-icon text-primary" @click="clickHeart()">
                <i class="heart-border" :class="heartStyle"></i>
            </div>
            <router-link :to="`/products/${thisCard.id}`">
            <!-- item-image -->
                <div class="item-image bg-cover" :style="{ backgroundImage: `url(${thisCard.imageUrl})` }">
                    <div class="item-tag">{{thisCard.category}}</div>
                </div>
            <!-- item-info -->
            <div class="row no-gutters item-info text-light d-flex
            justify-content-center align-items-center">
            <h5 class="col p-3">{{thisCard.title}}</h5>
            <h5 class="col p-3">
                <strong>NT {{ thisCard.price | currency}}</strong>
            </h5>
            </div>    
            </router-link>
            <!-- item-btn -->
            <button class="btn btn-block btn-primary btn-item" 
                v-if="thisPage == 'homeCard'"
                @click="addtoCart(thisCard.id)">
                加入購物車 
            </button>
            <button class="btn btn-block btn-primary btn-item" 
                v-else
                @click="openSingleProduct(thisCard.id)">
                查看更多 
            </button>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            thisPage: '',
        };
    },
    props: ['thisCard'],  //商品物件
    computed: {
        searchText() {
            return this.$store.state.CustomerProducts.searchText;
        },
        collected() {
            return this.$store.state.CustomerProducts.collected;
        },
        loveItemIdList() {
            return this.$store.state.CustomerProducts.loveItemIdList;
        },
        heartStyle() {
            return this.loveItemIdList.indexOf(this.thisCard.id) === -1
            ?'far fa-heart'
            : 'fas fa-heart';
        },
        cart() {
            return this.$store.state.cart;
        },
    },
    methods: {
        addtoCart(id, qty = 1) {
            const target = this.cart.carts.filter(items => items.product_id === id);
            if(target.length > 0){
                const sameCartItem = target[0];
                const originQty = sameCartItem.qty;
                const originCartId = sameCartItem.id;
                const originProductId = sameCartItem.product.id;
                const newQty = originQty +qty;
                this.$store.dispatch('updateProductQty', { originCardId, originProductId, newQty });
                this.openAddModal();
            } else {
                this.$store.dispatch('addtoCart', {id,qty});
                this.openAddModal();
            }
        },
        openAddModal() {
            this.$emit('openAddModal');
        },
        //取得單一產品頁面
        openSingleProduct(id) {
            this.$router.push(`/products/${id}`);
        },
        clickHeart() {
            if(this.loveItemIdList.indexOf(this.thisCard.id) === -1) {
                this.$store.commit('COLLECTED',this.thisCard);
            } else {
                this.$store.commit('DISCOLLECTED',this.thisCard.id);
            }
        },
    },
    mounted() {
        const {path} = this.$route;
        if(path ==='/') {
            this.thisPage = 'homeCard';
        }else {
            this.thisPage = 'productCard';
        }
    },
};
</script>

<style lang="scss" scoped>
a {
  text-decoration: none;
}
</style>