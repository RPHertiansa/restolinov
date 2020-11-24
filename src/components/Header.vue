<template>
    <div>
        <b-navbar class="head my-4" toggleable="lg" variant="faded" type="light">
          <b-navbar-brand to="/">Resto Linov</b-navbar-brand>

          <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

          <b-collapse id="nav-collapse" is-nav class="text-left">
            <b-navbar-nav>
              <b-nav-item to="/">Home</b-nav-item>
              <b-nav-item to="/foods">Foods</b-nav-item>
            </b-navbar-nav>

            <!-- Right aligned nav items -->
            <b-navbar-nav class="ml-auto" v-if="!isLogin">
              <b-nav-item to="/login">Login</b-nav-item>
              <b-nav-item to="/register">Register</b-nav-item>
            </b-navbar-nav>
            <b-navbar-nav class="ml-auto" v-else>
              <b-nav-item to="/keranjang">
                <p class="my-auto mr-2" v-if="cartData.data.length === 0">
                  Keranjang  <b-icon-bag class="mx-2"></b-icon-bag>
                </p>
                <p class="my-auto mr-2" v-else>
                  Keranjang  <b-icon-bag class="mx-2"></b-icon-bag><span class="cart">{{cartData.data.length}}</span>
                </p>
              </b-nav-item>
              <b-nav-item @click="onLogout()">Logout</b-nav-item>
            </b-navbar-nav>
          </b-collapse>
        </b-navbar>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'Header',
  data () {
    return {
      isLogin: sessionStorage.getItem('isLogin')
    }
  },
  computed: {
    ...mapGetters({
      cartData: 'products/getCart'
    })
  },
  methods: {
    ...mapActions({
      getCart: 'products/getCart',
      logout: 'auth/onLogout'
    }),
    onLogout () {
      this.logout()
      this.$router.push('/login')
    }
  },
  mounted () {
    this.getCart()
  }
}
</script>

<style>
.cart{
  background-color: #7CBF95 !important;
  padding: 3px;
  border-radius: 15%;
}
.head{
  padding: 0px !important;
}
</style>
