<template>
    <div>
        <!-- 訂閱郵件 -->
         <section class="py-5 bg-primary-light">
            <div class="container">
                <div class="row d-flex justify-content-between">
                    <div class="col-md-6 d-flex align-items-center justify-content-center
                        justify-content-md-start mb-4 mb-md-0">
                        <img src="../assets/images/jeans.svg" height="40">
                        <span class="h4 mb-0 mx-3 subscribe-text" style="letter-spacing: 2px;">訂閱你我的牛仔郵件</span>
                    </div>
                    <div class="col-md-6 p-md-0">
                        <div class="input-group ml-auto subscribe-size">
                            <div class="input-group-prepend">
                                <span class="input-group-text bg-primary text-light border-0 pl-4" id="basic-addon" style="font-size: 18px; width: 60px;">
                                    <i class="fas fa-envelope"></i>
                                </span>
                            </div>
                            <input class="form-control custom-form-input p-5"
                                style="padding: 2rem !important;" 
                                aria-label="user's email" aria-describedby="button-addon"/>
                            <div class="input-group-append">
                                <button class="btn btn-primary p-3" type="submit" id="button-addon" style="font-size: 18px; width: 60px">
                                <i class="fas fa-arrow-right"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<style lang="scss" scoped>
.subscribe-text {
  font-size: 24px !important;
  color: #191818;
}
// 訂閱 input
.subscribe-size {
  width: 345px;
  @media (min-width: 768px) {
    width: 445px;
  }
}
</style>