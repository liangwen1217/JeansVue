<template>
    <div>
        <div class="vld-parent">
            <loading :active.sync="isLoading" loader="dots"></loading>
        </div>
        <div class="text-right">
            <button class="btn btn-primary" id="addModal" @click.prevent="openCouponModal(true)">建立新的優惠券</button>
        </div>
        <table class="table text-left mt-3">
            <thead>
                <th>名稱</th>
                <th width="200" class="text-right">折扣百分比</th>
                <th width="200" class="text-right">到期日</th>
                <th width="150" class="text-center">是否啟用</th>
                <th width="120" class="text-center">編輯</th>
            </thead>
            <tbody>
                <tr v-for="(item, key ) in coupons" :key="key">
                    <td>{{item.title}}</td>
                    <td class="text-right">{{item.percent}}%</td>
                    <td class="text-right">{{`${new Date(item.due_date*1000).getFullYear()}/${new Date(item.due_date*1000).getMonth()+1}/${new Date(item.due_date*1000).getDate()}`}}</td>
                    <td class="text-right">
                        <span class="text-right" v-if="item.is_enabled === 1">啟用</span>
                        <span class="text-muted" v-else>未啟用</span>
                    </td>
                    <td>
                        <div class="btn-group">
                            <button class="btn btn-outline-primary btn-sm" @click.prevent="openCouponModal(false,item)">編輯</button>
                            <button class="btn btn-outline-danger btn-sm" @click.prevent="openDelModal(item)">刪除</button>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
        <!-- add coupon modal -->
        <div class="modal fade" id="couponModal" tabindex="-1" role="dialog">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                       <h5 class="modal-title" id="exampleModalLabel">New message</h5> 
                       <button class="close" type="button" data-dismiss="modal" aria-label="Close">
                           <span aria-hidden="true">&times;</span>
                       </button>
                    </div>
                    <div class="modal-body">
                        <form>
                            <div class="form-group">
                                <div class="d-flex">
                                    <label for="recipient-name" class="col-form-label font-weight-bold">標題</label>
                                </div>
                                <input type="text" class="form-control" id="recipient-name" placeholder="請輸入標題" v-model="tempCoupon.title" />
                            </div>
                            <div class="form-group">
                                <div class="d-flex">
                                    <label for="message-text" class="col-form-label font-weight-bold" placeholder="請輸入優惠碼">優惠碼</label>
                                </div>
                                <input type="text" class="form-control" id="message-text" v-model="tempCoupon.code" />
                            </div>
                            <div class="form-group">
                                <div class="d-flex">
                                    <label for="due_date">到期日</label>
                                </div>
                                <input type="date" class="form-control" id="due_date" v-model="due_date">
                            </div>
                            <div class="form-group">
                                <div class="d-flex">
                                    <label for="price">折扣百分比</label>
                                </div>
                                <input type="number" class="form-control" id="price" placeholder="請輸入折扣百分比" v-model="tempCoupon.percent">
                            </div>
                            <div class="form-group">
                                <div class="form-check">
                                    <input class="form-check-input" type="checkbox" id="is_enabled"
                                        v-model="tempCoupon.is_enabled" :true-value="1" :false-value="0"/>
                                </div>
                                <label class="form-check-label" for="is_enabled" style="margin-left: 20px;">是否啟用</label>
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button class="btn btn-secondary" type="button" data-dismiss="modal">Close</button>
                        <button class="btn btn-primary" type="button" @click.prevent="updateCoupon">更新優惠券</button>
                    </div>
                </div>
            </div>
        </div>
        <!-- delete modal -->
        <div class="modal fade" id="delCouponModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content border-0">
                <div class="modal-header bg-danger text-white">
                    <h5 class="modal-title" id="exampleModalLabel">
                    <span>刪除優惠券</span>
                    </h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    是否刪除
                    <strong class="text-danger">{{ tempCoupon.title }}</strong> 優惠券(刪除後將無法恢復)。
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">取消</button>
                    <button
                    type="button"
                    class="btn btn-danger"
                    @click.prevent="deleteCoupon(tempCoupon.id)"
                    >確認刪除</button>
                </div>
                </div>
            </div>
        </div>
    <!-- 分頁component -->
    <pagination :pagination="pagination" @pageTrigger="getCoupons" />
  </div>
</template>

<script>
import $ from 'jquery';
import pagination from "../Pagination";

export default {
    props: {
    config: Object,
  },
    components: {
        pagination
    },
    data() {
        return {
            coupons: [],
            tempCoupon: {
                title: '',
                is_enabled: 0,
                percent: 100,
                due_date:0,
                code: '',
            },
            due_date: new Date(),
            pagination: {},
            isLoading: false,
            isNew: false
        };
    },
    watch: {
        due_date() {
            const vm =this;
            const timestamp = Math.floor(new Date(vm.due_date) / 1000);
            vm.tempCoupon.due_date = timestamp;
        },
    },
    methods: {
        openCouponModal(isNew, item) {
            if (isNew) {
                this.tempCoupon = {};
                this.isNew = true;
            } else {
                this.tempCoupon = { ...item };
                //調整日期格式
                const month =
                new Date(item.due_date * 1000).getMonth() < 10
                    ? "0" + (new Date(item.due_date * 1000).getMonth() + 1)
                    : new Date(item.due_date * 1000).getMonth() + 1;
                const date =
                new Date(item.dut_date * 1000).getDate() < 10
                    ? "0" + new Date(item.due_date * 1000).getDate()
                    : new Date(item.due_date * 1000).getDate();
                this.tempCoupon.due_date = `${new Date(
                item.due_date * 1000
                ).getFullYear()}-${month}-${date}`;
                this.isNew = false;
            }
            $("#couponModal").modal("show");
        },
        openDelModal(item) {
            this.tempCoupon = {...item};
            $("#delCouponModal").modal('show');
        },
        // addNewCoupon() {
        //     const vm = this;
        //     const timestamp = new Date(vm.tempCoupon.due_data).getTime();//Date 內無值的話為當前時間
        //     vm.tempCoupon.due_data = Math.floor(timestamp / 1000); //改成API所需格式
        //     const postCoupon = tempCoupon;

        //     let api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/coupon`;
        //     let httpMethod = "post";
        //     this.$http[httpMethod](api, { data: postCoupon }).then(response => {
        //         $("#couponModal").modal('hide');
        //         this.getCoupon();
        //         vm.ctempCoupon = {};
        //     });
        // },
        // modifyCoupon(id) {
        //     const vm = this;
        //     const timestamp = new Data(vm.tempCoupon.due_data).getTime(); //Date 內無值的話為當前時間
        //     vm.tempCoupon.due_data = Math.floor(timestamp / 1000);//改成API所需格式
        //     const postCoupon = vm.tempCoupon;

        //     let api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/coupon/${id}`;
        //     let httpMethod = "put";
        //     this.$http[httpMethod](api, { data: postCoupon }).then(response => {
        //         $("#couponModal").modal("hide");
        //         this.getCoupon();
        //         vm.tempCoupon = {};
        //     });
        // },
        deleteCoupon(id) {
            const vm = this;
            let api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/coupon/${id}`;
            let httpMethod = "delete";
            vm.isLoading = true;
            this.$http[httpMethod](api).then(response => {
                $("#delcouponModal").modal("hide");
                vm.isLoading = false;
                this.getCoupons();
                vm.tempProduct = {};
            });
        },
        getCoupons() {
            const vm = this;
            const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/coupons`;
            this.$http.get(url, vm.tempProduct).then((response) => {
                 if (response.data.success) {
                    vm.coupons = response.data.coupons;
                    vm.pagination = response.data.pagination;
                }
                vm.isLoading = false;
                // vm.coupons = response.data.coupons;
                // console.log(response);
            });
        },

        getCoupons(page = 1){
            const vm = this;
            let api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/coupons?page=${page}`;
            let httpMethod = "get";
            this.$http[httpMethod](api).then(response => {
                if(response.data.success){
                    vm.coupons = response.data.coupons;
                    vm.pagination = response.data.pagination;
                }
            });
        },

        updateCoupon() {
            const vm = this;
            if (vm.isNew) {
                const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/coupon`;
                this.$http.post(url, { data: vm.tempCoupon }).then((response) => {
                console.log(response, vm.tempCoupon);
                $('#couponModal').modal('hide');
                this.getCoupons();
                });
            } else {
                const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/coupon/${vm.tempCoupon.id}`;
                vm.due_date = new Date(vm.tempCoupon.due_date * 1000);
                this.$http.put(url, { data: vm.tempCoupon }).then((response) => {
                console.log(response);
                $('#couponModal').modal('hide');
                this.getCoupons();
                });
            }
            },

        },
    created() {
        this.getCoupons() ;
    }
};
</script>