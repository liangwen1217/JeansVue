<template>
    <div>
        <nav class="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
            <a class="navbar-brand col-sm-3 col-md-2 mr-0" href="#">後台管理系統</a>
            <input class="form-control form-control-dark w-100" 
                type="text" placeholder="Search" aria-label="Search">
            <ul class="navbar-nav px-3">
                <li class="nav-item text-nowrap">
                <a class="nav-link" href="#" @click.prevent="singOut">登出</a>
                </li>
            </ul>
        </nav>
    </div>
</template>

<script>
export default {
  methods: {
    singOut() {
      const api = ` ${process.env.APIPATH}/logout`;
      const vm = this;
      this.$http.post(api).then(response => {
        // console.log(response);
        if (response.data.success) {
          vm.$router.push("/");
        }
      });
    }
  }
};
</script>