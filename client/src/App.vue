<template>
  <div id="app">
    <div class="row">
      <div class="col-2"></div>
      <div class="col-sm-8">
        <div class="row">
          <div class="col-sm-12">
            <form method="post">
              <div class="form-group">
                <label for="username">Username</label>
                <input
                  type="text"
                  class="form-control"
                  id="username"
                  placeholder="username"
                  name="username"
                />
              </div>
              <div class="form-group">
                <label for="password">Password</label>
                <input
                  type="password"
                  class="form-control"
                  id="password"
                  placeholder="password"
                  name="password"
                />
              </div>
              <button class="btn btn-primary btn-block">Login</button>
            </form>
            <div class="row mt-4">
              <div class="col-6">
                <button class="btn btn-block facebook text-white">
                  <i class="fa fa-facebook"></i> Facebook
                </button>
              </div>
              <div class="col-6">
                <button class="btn btn-block google text-white">
                  <i class="fa fa-google-plus"></i> Google
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  async mounted() {
    await this.api("GET", "/token");
    const res = await this.api("POST", "/login", {
      username: "Gigio",
      password: "Pass"
    });
    console.log(res);
  }
};
</script>

<style lang="scss">
.facebook {
  background: #3b5998 !important;
  color: #ffffff;
}
.google {
  background: #dd4b39 !important;
  color: #ffffff;
}
.top-margin {
  margin-top: 20px;
}
</style>
