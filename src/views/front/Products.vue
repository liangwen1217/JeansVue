<template>
    <div>
        <header class="bg-cover d-flex justify-content-center align-items-center"
            :style="[
            {
                backgroundImage:
                'url(' + require('../../assets/images/product_header.jpg')+')'
            },
            {height:'496px'}
            ]"
        >
            <div class="container">
                <h2 class="h5 p-2 text-center text-title text-dark text-bg d-md-none">
                    穿牛仔褲——<br />是不需要理由的！
                </h2>
                <h2 class="h3 p-2 ml-auto d-none d-md-block writing-md-vertical text-title
                    text-dark text-bg">
                    想穿牛仔褲——<br />
                    <span class="mt-4">是</span>不需要理由的！
                </h2>
            </div>
        </header>
        <!-- product主體  -->
        <div class="container my-6" style="margin-top:30px">
            <div class="row">
                <!-- 選單 -->
                <div class="col-md-3">
                    <div class="list-group text-center h5 custom-list-group" id="myList" role="tablist">
                        <li class="list-group-item bg-primary-light text-light">商品類別</li>
                        <a href="#" class="list-group-item list-group-item-action"
                            :class="{ active: searchText === '' }"
                            @click.prevent="getText('')"
                        >所有商品</a>
                        <a href="#" class="list-group-item list-group-item-action"
                            v-for="item in categories" :key="item" :class="{active: item === searchText}"
                            @click.prevent="getText(item)"
                        >{{item}}</a>
                    </div>
                </div>
                <!-- product -->
                <div class="col-md-9 mt-5 mt-md-0">
                    <div class="tab-content">
                        <div class="tab-pane active bg-transparent"
                            id="all-product"
                            role="tabpanel">
                            <div class="row">
                                <!-- 卡片元件 -->
                                <ProductCard v-for="item in filterData"
                                    :key="item.id"
                                    :this-card="item">
                                </ProductCard>
                            </div>
                        </div>
                    </div>
                    <Pagination :ChildPaginations="pagination" @changeCurrPage="getProducts"
                    v-if="filterData.length>10"/>
                </div>
            </div>
        </div>
        <!-- Gotop button -->
        <button class="gotop-btn" id="gotopBtn" @click="gotop">
            <i class="fas fa-arrow-up gotop-arrow"></i>
        </button>
    </div>
</template>

<script>
import $ from 'jquery';
import ProductCard from '../../components/ProductCard.vue';
import Pagination from '../../components/Pagination.vue';

export default {
    components: {
        ProductCard,
        Pagination,
    },
    computed: {
        pagination() {
            return this.$store.state.CustomerProducts.pagination;
        },
        cart() {
            return this$store.state.cart;
        },
        filterData() {
            const vm = this;
            if (vm.searchText) {
                return vm.products.filter(item => item.category
                    .toLowerCase()
                    .includes(vm.searchText.toLowerCase()));
            }
            return vm.products;
        },
        products() {
            return this.$store.state.CustomerProducts.products;
        },
        categories() {
            return this.$store.state.CustomerProducts.categories;
        },
        searchText() {
            return this.$store.state.CustomerProducts.searchText;
        },
    },
    methods: {
        getProducts(page =1) {
            this.$store.dispatch('getCusProducts', page);
        },
        getCart() {
            this.$store.dispatch('getCart');
        },
        removeItem(id) {
            this.$store.dispatch('removeCart', id);
        },
        getText(cateText) {
            this.$store.dispatch('getText', cateText);
        },
        gotop() {
           $('html, body').animate({ scrollTop: 0 }, 1500);
        },
    },
    created() {
        this.getProducts();
        this.getCart();
        this.getText('');
        // 頁面往下滑超過 400px 就讓 往上箭頭Gotop 按鈕出現
        function showBtnCondition() {
            if ($(this).scrollTop() > 400) {
                $('#gotopBtn').fadeIn();
            } else {
                $('#gotopBtn').fadeOut();
            }
        }
        $(window).scroll(showBtnCondition);
    },
};
</script>