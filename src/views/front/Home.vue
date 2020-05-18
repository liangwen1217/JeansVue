<template>
    <div class="home">
        <FontHeader @clickCate="slidetoCard" />
        <section class="section my-md-10" style="margin-top:72px;">
            <!-- 標題於md 以上隱藏 -->
            <div class="row justify-content-center d-md-none no-gutters my-5">
                <div class="col-8">
                    <h2 class="h5 my-5 text-center text-title">
                        為什麼——
                        <br />選擇牛仔褲穿搭？
                    </h2>
                </div>
            </div>
            <div class="bg-intro pt-5 pt-md-0">
                <div class="container">
                    <div class="row">
                    <!-- 圖片 -->
                        <div class="col-md-6 section-image-block">
                            <div class="bg-cover h-100 section-image"
                                :style="{
                                backgroundImage: `url(${require('../../assets/images/jeans6.jpg')})`
                                }"
                            >
                            </div>
                        </div>
                        <!-- 垂直文字區 -->
                        <div class="col-md-6 vertical-content d-flex justify-content-end">
                            <p class="writing-md-vertical text-light p-3">
                                衣櫃必備顯瘦單寧丹寧牛仔褲，喇叭牛仔褲，收腹翹臀超長腿，
                                率性寬版男友休閒褲，窄管褲、長褲、寬褲、吊帶褲、刷毛褲等超百搭牛仔下著，刷破、抽鬚質感設計任你搭牛仔褲。
                            </p>
                            <!-- 標語於md以上會顯示 -->
                            <h2 class="writing-md-vertical d-none d-md-block section-image-block text-title">
                                為什麼——
                                <br />
                                <span class="mt-5">選擇牛仔褲穿搭？</span>
                            </h2>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <section class="section my-md-10 " style="margin-top:72px;">
            <!-- (標語) 在 md 以上隱藏 -->
            <div class="row justify-content-center d-md-none no-gutters my-5">
                <div class="col-8">
                    <h2 class="h5 my-5 text-center text-title">
                        為什麼——
                        <br />一定要穿搭牛仔褲？
                    </h2>
                </div>
            </div>
            <div class="bg-intro pt-5 pt-md-0">
                <div class="container">
                    <div class="row flex-row-reverse">
                        <!--圖片-->
                        <div class="col-md-6 section-image-block">
                           <div
                                class="bg-cover h-100 section-image"
                                :style="{
                                backgroundImage: `url(${require('../../assets/images/jeans1.jpg')})`
                                }"
                            ></div> 
                        </div>
                        <!--垂直文字區-->
                        <div class="col-md-6 vertical-content d-flex justify-content-end">
                            <p class="writing-md-vertical text-light p-3">
                                步伐散發自信，牛仔褲詮釋出率性時尚，百搭下身牛仔褲推薦。
                                牛仔褲已經成為全世界最知名和仿效的服飾品牌 – 高度的創造力成功擄獲了各世代的人們，並造就出許多品牌愛好者。
                                時至今日，牛仔褲的開創並秉持著原創精神，創造了無與倫比的佳績。牛仔褲可以讓世界各地的人們都可以展現出他們個人風格。
                            </p>
                            <!-- (標語) 在 md 以上會顯示 -->
                            <h2 class="writing-md-vertical d-none d-md-block section-image-block text-title">
                                為什麼——
                                <br />
                                <span class="mt-5">一定要穿搭牛仔褲？</span>
                            </h2>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <section class="my-5 my-md-9">
            <div class="container d-flex justify-content-center">
                <h2 class="h4 my-5 text-center text-title d-md-none">
                    穿牛仔褲——
                    <br />是不需要理由的。
                </h2>
                <div class="d-flex flex-wrap flex-column justify-content-center">
                <h2 class="d-none d-md-block writing-md-vertical text-title">
                    穿牛仔褲——
                    <br />
                    <span class="mt-5">是不需要理由的。</span>
                </h2>
                </div>
            </div>
        </section>
        <!-- Card -->
        <div id="productCardSection"></div>
            <div class="container my-5 my-7" v-show="this.searchText">
                <div class="row">
                    <!-- 卡片元件 -->
                    <ProductCard
                        v-for="item in filterData"
                        :key="item.id"
                        :this-card="item"
                        @openAddModal="addtoCartModal"
                    >
                    </ProductCard>
                </div>
            </div>
            <!-- gotop button -->
            <button class="gotop-btn" id="gotopBtn" @click="gotop">
                <i class="fas fa-arrow-up gotop-arrow"></i>
            </button>
            <!-- Coupon Modal -->
            <div class="modal fade"
                id="couponModal"
                tabindex="-1"
                role="dialog"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
            >
                <div class="modal-dialog modal-dialog-centered" role="document">
                    <div class="modal-content">
                        <div class="modal-header border-0">
                            <h5 class="modal-title" id="exampleModalLabel">最新優惠</h5>
                            <button class="close" type="button" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body p-0">
                            <div class="bg-activity bg-cover d-flex align-items-center justify-content-center">
                                <p class="activity-text-box text-bg text-center p-3">
                                    歡慶周年慶！
                                    <br />即日起結帳輸入優惠碼
                                    <span class="text-danger h4 font-weight-bolder">yearjeans</span>，
                                    <br />即享所有品項半價優惠！
                                </p>
                            </div>
                        </div>
                        <div class="modal-footer border-0 p-2">
                            <button type="button" class="btn btn-primary" data-dismiss="modal">逛逛去</button>
                        </div>
                    </div>
                </div>
            </div>
            <!-- 成功加入購物車Modal -->
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
import FontHeader from '../../components/FontHeader.vue';
import ProductCard from '../../components/ProductCard.vue';

export default {
  name: 'home',
  components: {
    FontHeader,
    ProductCard,
  },
  computed: {
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
    searchText() {
      return this.$store.state.CustomerProducts.searchText;
    },
  },
  methods: {
    getProducts(page = 1) {
      this.$store.dispatch('getCusProducts', page);
    },
    showCouponModal() {
      window.setTimeout(() => {
        $('#couponModal').modal('show');
      }, 1700);
    },
    slidetoCard() {
      $('html, body').animate(
        {
          scrollTop: $('#productCardSection').offset().top,
        },
        1500,
      );
    },
    addtoCartModal() {
      window.setTimeout(() => {
        $('#addtoCartModal').modal('show');
      }, 2500);
      window.setTimeout(() => {
        $('#addtoCartModal').modal('hide');
      }, 4000);
    },
    gotop() {
      $('html, body').animate({ scrollTop: 0 }, 1500);
    },
  },
  created() {
    this.getProducts();

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
  mounted() {
    this.showCouponModal();
  },
};
</script>
