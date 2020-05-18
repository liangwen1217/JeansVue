<template>
    <div>
        <div class="container mb-5">
            <div class="row justify-content-center">
                <div class="col-lg-10">
                    <ValidationObserver
                        class="form bg-light p-5"
                        style="padding: 2rem !important;"
                        v-slot="{ invalid}"
                        tag="form"
                        @submit.prevent="payOrder"
                    >
                    <!-- 標題 -->
                    <div class="form-row my-4">
                        <div class="col-6">
                            <h2 class="checkout-title">付款資訊</h2>
                        </div>
                        <!-- step -->
                        <div class="col-6 d-flex align-items-center">
                            <!-- step軸用 w-100 把 block 佔滿，並用 flex 排列 -->
                            <div class="process-steps d-flex justify-content-between w-100">
                                <div class="process-circle completed">
                                    <i class="fas fa-check"></i>
                                </div>
                                <div class="process-circle completed">
                                    <i class="fas fa-check"></i>
                                </div>
                                <div class="process-circle active"></div>
                            </div>
                        </div>
                    </div>
                    <!-- credit card -->
                    <div class="form-row mt-3">
                        <div class="col">
                            <ValidationProvider
                                class="form-group"
                                name="信用卡號"
                                rules="required"
                                v-slot="{ failed, errors }"
                                tag="div"
                            >
                            <label for="creditNumber" class="checkout-label">信用卡號</label>
                            <div class="input-group">
                                <input
                                    type="text"
                                    :class="{ 'is-invalid': failed }"
                                    class="form-control rounded-0"
                                    placeholder="9012-3456-7890-1234"
                                    id="creditNumber"
                                    name="creditNumber"
                                    v-model="cardNum"
                                required/>
                                <div class="input-group-append">
                                <span class="input-group-text"
                                    style="font-size: 20px; padding: 0px 16px;">
                                    <i class="far fa-credit-card"></i>
                                </span>
                                </div>
                            </div>
                            <div class="text-danger">
                                {{ errors[0] }}
                            </div>
                            </ValidationProvider>
                        </div>
                    </div>
                    <label for="cardLastName" class="checkout-label mt-2">持卡人姓名</label>
                    <!-- credit card name -->
                    <div class="form-row">
                        <div class="col">
                            <ValidationProvider
                                class="form-group"
                                name="姓氏"
                                rules="required"
                                v-slot="{ failed, errors}"
                                tag="div"
                            >
                            <input type="text"
                                :class="{ 'is-invalid': failed }"
                                class="form-control rounded-0"
                                placeholder="王"
                                id="cardLastName"
                                name="cardLastName"
                                v-model="cardLastName"
                            required/>
                            <div class="text-danger">
                                {{errors[0]}}
                            </div>
                            </ValidationProvider>
                        </div>
                        <div class="col">
                            <ValidationProvider
                                class="form-group"
                                name="名字"
                                rules="required"
                                v-slot="{failed, errors}"
                                tag="div"
                            >
                            <input type="text"
                                :class="{ 'is-invalid': failed }"
                                class="form-control rounded-0"
                                placeholder="小明"
                                id="cardFirstName"
                                name="cardFirstName"
                                v-model="cardFirstName"
                            required/>
                            <div class="text-danger">
                                {{errors[0]}}
                            </div>
                            </ValidationProvider>
                        </div>
                    </div>
                    <label for="expYear" class="checkout-label">有效期限</label>
                    <!-- 信用卡有效期限 -->
                    <div class="form-row">
                        <div class="col-6">
                            <ValidationProvider
                                class="form-group"
                                name="月份"
                                rules="required"
                                v-slot="{failed, errors}"
                                tag="div"
                            >
                            <input type="text"
                                id="cardEcpMon"
                                placeholder="01"
                                :class="{ 'is-invalid': failed }"
                                class="form-control rounded-0"
                                v-model="cardExpMon"
                            required/>
                            <div class="text-danger">
                                {{ errors[0] }}
                            </div>
                            </ValidationProvider>
                        </div>
                        <div class="col-6">
                            <ValidationProvider
                            class="form-group"
                            name="年份"
                            rules="required"
                            v-slot="{failed, errors}"
                            tag="div"
                            >
                            <input type="text"
                                id="cardExpYear"
                                placeholder="22"
                                :class="{ 'is-invalid': failed }"
                                class="form-control rounded-0"
                                v-model="cardExpYear"
                            required/>
                             <div class="text-danger">
                                {{ errors[0] }}
                            </div>
                            </ValidationProvider>
                        </div>
                        <div class="col-6">
                            <ValidationProvider
                            class="form-group"
                            name="安全碼"
                            rules="required"
                            v-slot="{ failed, errors }"
                            tag="div"
                            >
                            <label for="cardSafeCode" class="checkout-label">安全碼</label>
                            <input type="text" 
                                :class="{ 'is-invalid': failed }"
                                class="form-control rounded-0"
                                id="cardSafeCode"
                                placeholder="123"
                                v-model="cardSafeCode"
                                required/>
                            <div class="text-danger">
                                {{ errors[0] }}
                            </div>
                            </ValidationProvider>
                        </div>
                    </div>
                    <!-- stepup stepdown -->
                    <div class="form-row mt-5">
                        <div class="col">
                            <button id="submit-link" :disabled="invalid" class="btn btn-block btn-primary btn-lg rounded-0 text-white py-3">
                                確認付款
                            </button>
                        </div>
                    </div>
                    </ValidationObserver>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            orderId: '',
            cardNum: '',
            cardLastName: '',
            cardFirstName: '',
            cardExpMon: '',
            cardExpYear: '',
            cardSafeCode: '',
        };
    },
    methods: {
        getCart() {
            this.$store.dispatch('getCart');
        },
        payOrder() {
            const vm = this;
            const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/pay/${vm.orderId}`;
            vm.$store.commit('LOADING', true);
            vm.$http.post(api).then((response) => {
                if (response.data.success) {
                    vm.$router.push(`/cart/paysuccess/${vm.orderId}`);
                }
                vm.$store.commit('LOADING', false);
            });
        },
    },
    created() {
        this.orderId = this.$route.params.orderId;
        this.getCart();
    },
};
</script>