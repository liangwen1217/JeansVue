<template>
    <div>
        <div class="container mb-md-10 py-md-4" v-if="singleProduct.title">
            <nav aria-label="breadcrumb">
                <ol class="breadcrumb bg-transparent px-0 mb-0">
                    <li class="breadcrumb-item">
                        <router-link to="/" class="text-primary-light">首頁</router-link>
                    </li>
                    <li class="breadcrumb-item">
                        <router-link to="/products" class="text-primary-light">商品</router-link>
                    </li>
                    <li class="breadcrumb-item active" aria-current="page">
                        {{singleProduct.title}}
                    </li>
                </ol>
            </nav>
            <div class="row">
                <!-- 商品圖片區 -->
                <div class="col-md-7 mb-md-5 px-0">
                    <h2 class="h3 text-center bg-accent text-white p-2 d-md-none mb-0">
                        {{singleProduct.title}}
                    </h2>
                    <div class="bg-cover"
                    :style="[
                    { backgroundImage: `url(${singleProduct.imageUrl})` },
                    { height: '380px' }]">
                    </div>
                </div>
                <!-- buy -->
                <div class="col-md-5 p-3 bg-white buy-area d-md-flex flex-md-column
                    justify-content-md-center">
                    <h2 class="d-none d-md-block"> {{ singleProduct.title }}</h2>
                    <p class="d-none d-md-block">{{ singleProduct.description }}</p>
                    <div class="mb-2 mb-md-0 d-flex align-items-end justify-content-center
                        justify-content-md-start">
                        <del class="text-muted mr-3">
                            原價{{singleProduct.origin_price | currency}}
                        </del>
                        <div class="h4 mb-0">
                            <span class="text-danger">特價</span>
                            <span class="text-danger">
                                {{ singleProduct.price | currency }}
                            </span>
                        </div>
                    </div>
                    <hr class="d-none d-md-block" />
                    <div class="input-group mb-3">
                        <select class="form-control mr-1" v-model="singleProduct.num">
                            <option :value="num" v-for="num in 10" :key="num">
                                {{ num }} {{ singleProduct.unit }}
                            </option>
                        </select>
                        <button class="btn btn-primary" type="submit" id="button-addCart" 
                            @click="addtoCart(singleProduct.id, singleProduct.num)">
                            加入購物車
                        </button>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-md-7 text-white">
                    <h3 class="h4 feature-title">產品特色</h3>
                    <p class="mb-md-8 feature-text">{{ singleProduct.content }}</p>
                    <h3 class="h4 feature-title">獨特設計</h3>
                    <div class="jeans-picbox my-2"></div>
                    <p class="mb-md-8 feature-text">
                        在數之不盡的褲類設計當中，牛仔褲可說是最受歡迎又絕不出錯的穿搭！
                        無論上身配搭T-shirt 或恤衫，緊身牛仔褲都能襯托出隨性慵懶美的。
                    </p>
                    <h3 class="h4 feature-title">金級認證布料</h3>
                    <div class="fabric-admit-picbox my-2"></div>
                    <p class="mb-md-8 feature-text">
                        與荷蘭時尚創新平台Fashion for Good合作設計，牛仔褲全面採永續性材料製造，且製程符合高搖籃到搖籃金級認證。
                        基於五個永續性特徵評估和持續改進產品的指導介面：材料健康、材料再利用、再生能源、水資源管理和社會公平。
                    </p>
                    <div class="notice">
                        <h3 class="h4 feature-title">購買須知</h3>
                        <div class="notice-issues">
                            <div class="expiration-date">
                                <h4 class="notice-title" @click="accordions">
                                保養方式 <i class="far fa-hand-point-down"></i>
                                </h4>
                                <p class="notice-text text-center">
                                    1.深色純棉牛仔褲約穿3-5次或一周清洗一次即可。<br>
                                    2.淺色：白色、卡其、駱駝色...則視贓污情形而定。<br>
                                    牛仔褲最佳的清洗時間為6-12個月。<br>
                                </p>
                            </div>
                            <div class="unfreeze-method">
                                <h4 class="notice-title" @click="accordions">
                                清洗方式 <i class="far fa-hand-point-down"></i>
                                </h4>
                                <p class="notice-text">
                                    ＊深色牛仔褲第一次下水前先用白醋+水(白醋：水，1：20)或者是用鹽水浸泡約 20 - 30 分鐘比較能保持原色。<br>
                                    ＊深色與淺色分開洗：混在一起會造成顏色互染。<br>
                                    ＊不得使用漂白劑。用不加酶帶藍顆料粒的洗衣粉洗滌，因為加酶的洗衣粉有漂白作用，對牛仔褲的顏色有影響。<br>
                                    ＊避免陽光直接暴曬：陽光直接暴曬會造成嚴重氧化退色現象。<br>
                                    ＊晾曬於通風處：不通風會使褲子不容易干且會產生異味。<br>
                                    ＊儘可能反面洗、反面曬。<br>
                                    ＊應用手搓洗牛仔褲，儘量不用洗衣機和毛刷，這樣可以有效保持牛仔褲的原色。<br>
                                </p>
                            </div>
                            <div class="attention">
                                <h4 class="notice-title" @click="accordions">
                                注意事項 <i class="far fa-hand-point-down"></i>
                                </h4>
                                <p class="notice-text text-center">
                                1. 圖片僅供參考，商品內容物以實際收到商品為主。<br>
                                2. 請勿高溫烘乾、熨燙、漂白。
                                </p>
                            </div>
                            <div class="returns">
                                <h4 class="notice-title" @click="accordions">
                                退換貨須知 <i class="far fa-hand-point-down"></i>
                                </h4>
                                <p class="notice-text">
                                由消費者完成簽收取件的隔日開始算起至第7天止，為七日鑑賞期限。
                                七日鑑賞期計算: 7-11為取件隔日算第一天，宅配通為簽收隔日算第一天，不論是否為買家本人簽收(管理員/家人等)
                                根據消費者保護法規定，牛仔牛仔JEANS提供您享有商品到貨的七日鑑賞期可隨時解約退貨之權益，且無須額外負擔退貨運費(特價商品除外)。
                                若商品如沾染彩妝或汙漬、配件不全、自行修改、吊牌拆除或遺失、下水洗滌，恕無法接受退換。
                                退貨時商品必須是全新且完整包裝狀態。<br>
                                <small>
                                    ※提醒您：包裝時請準備一個完整的袋子，將您的退貨商品妥善包裝並「完整密封」，以避免於運送途中掉落遺失。
                                    ※如退貨商品因未妥善包裝以致商品遺失，將以實際收到之商品辦理退貨程序。
                                </small>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-md-5 mt-5 mt-md-0" style="padding: 0 0;">
                    <div class="list-group">
                        <li class="list-group-item h4 text-center bg-primary text-white"
                            style="margin-bottom: 0;">
                            熱銷商品
                        </li>
                        <a href="#" @click="openRecomProduct(item.id)"
                        class="list-group-item list-group-item-action d-flex justify-content-between"
                        v-for="(item, key) in recommendProducts" :key="key">
                            <span class="align-self-center">
                                {{ item.title }} {{ item.price | currency }}
                            </span>
                            <div class="recom-item-pic bg-cover d-inline-block"
                                :style="{backgroundImage: `url(${item.imageUrl})`}"></div>
                        </a>
                    </div>
                </div>
            </div>
        </div>
        <!-- Gotop button -->
        <button class="gotop-btn" id="gotopBtn" @click="gotop">
            <i class="fas fa-arrow-up gotop-arrow"></i>
        </button>
        <!-- 成功加入購物車 Modal -->
        <div class="modal fade" id="addtoCartModal" tabindex="-1" role="dialog"
        aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-sm" role="document">
                <div class="modal-content">
                <div class="modal-body">
                    成功加入購物車！
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import $ from 'jquery';

export default {
    data() {
        return {
            id: '',
            singleProduct: {
                num :1,
            },
        };
    },
    computed: {
        allProducts() {
            return this.$store.state.CustomerProducts.products;
        },
        recommendProducts() {
            function getRandom(x) {
                return Math.floor(Math.random() * x);
            }
            let recommendObjList = [];
            let n = 0;
            const tempary = [];
            for (let i = 0; i < 3; i += 1) {
                n = getRandom(this.allProducts.length);
                tempary.push(n);
            }
            // filter亂數陣列中不重複的數字抓出來
            const result = tempary.filter((item, index, ary) => ary.indexOf(item) === index);
            // 如亂數陣列的值不滿 3 個， 就將陣列中其中一個值＋1，作為放入陣列第三個值
            if (result.length < 3) {
            const num = result[1];
            const addnum = num + 1;
            if (result[0] !== addnum && result[1] !== addnum) {
            result.push(addnum);
            }
        }
        recommendObjList = [this.allProducts[result[0]],
            this.allProducts[result[1]],
            this.allProducts[result[2]]];
        return recommendObjList;
        },
        cart() {
        return this.$store.state.cart;
        },
    },
    methods: {
        getSingleProduct() {
            const vm = this;
            const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/product/${vm.id}`;

            vm.$store.commit('LOADING', true);
            vm.$http.get(api).then((response) => {
                vm.$store.commit('LOADING', false);
                vm.singleProduct = response.data.product;
                vm.singleProduct.num = 1;
            });
        },
        getCart() {
            this.$store.dispatch('getCart');
        },
        removeItem(id) {
            this.$store.dispatch('removeCart', id);
        },
        addtoCart(id, qty = 1) {
            const target = this.cart.carts.filter(items => items.product_id === id);
            if(target.length >0){
                const sameCartItem = target[0];
                const originQty = sameCartItem.qty;
                const originCardId = sameCartItem.id;
                const originProductId = sameCartItem.product.id;
                const newQty = originQty + qty;
                this.$store.dispatch('updateProductQty', {originCardId, originProductId, newQty});
                this.addtoCartModal();
            }else {
                this.$store.dispatch('addtoCart', {id, qty});
                this.addtoCartModal();
            }
        },
        getProducts(page = 1) {
            this.$store.dispatch('getCusProducts', page);
        },
        openRecomProduct(recomId) {
            this.id = recomId;
            this.$router.push(`/products/${this.id}`);
            this.getSingleProduct();
        },
        addtoCartModal() {
            window.setTimeout(() => {
              $('#addtoCartModal').modal('show');  
            },2500);
            window.setTimeout(() => {
                $('#addtoCartModal').modal('hide');
            }, 4000);
        },
        gotop() {
            $('html, body').animate({ scrollTop: 0 }, 1500);
        },
        accordions(event) {
            const {currentTarget} = event;
            $(currentTarget).toggleClass('active');
            $(currentTarget).parent().find('.notice-text').slideToggle();
            $(currentTarget).parent().siblings().find('.notice-text').slideUp();
            $(currentTarget).parent().siblings().find('.notice-title').removeClass('active');
        },
    },
    created() {
        this.id = this.$route.params.productId;
        this.getSingleProduct();
        this.getCart();
        this.getProducts();
        //頁面往下滑超過 400px 就讓 Gotop 按鈕出現
        function showBtnCondition() {
            if($(this).scrollTop()> 400){
                $('#gotopBtn').fadeIn();
            } else {
                $('#gotopBtn').fadeOut();
            }
        }
        $(window).scroll(showBtnCondition);
    },
};
</script>

<style lang="scss" scoped>
.breadcrumb {
  @media (min-width: 576px) {
    margin-left: -15px !important;
  }
}
.breadcrumb-item {
  font-size: 15px;
}
.breadcrumb-item.active {
  color: #f7f3f3;
}
.breadcrumb-item + .breadcrumb-item::before {
  color: #f7f3f3;
}
</style>