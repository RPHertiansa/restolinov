<template>
    <div>
        <b-navbar class="head my-4" toggleable="lg" variant="faded" type="light">
          <b-navbar-brand to="/">Resto Linov</b-navbar-brand>

          <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

          <b-collapse id="nav-collapse" is-nav>
            <b-navbar-nav>
              <b-nav-item to="/">Home</b-nav-item>
              <b-nav-item to="/foods">Foods</b-nav-item>
            </b-navbar-nav>

            <!-- Right aligned nav items -->
            <b-navbar-nav class="ml-auto">
              <b-nav-item to="/keranjang"><p class="my-auto mr-2"> Keranjang  <b-icon-bag class="mx-2"></b-icon-bag><span class="cart">{{cartData.data.length}}</span></p></b-nav-item>
            </b-navbar-nav>
          </b-collapse>
        </b-navbar>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'Header',
  computed: {
    ...mapGetters({
      cartData: 'products/getCart'
    })
  },
  methods: {
    ...mapActions({
      getCart: 'products/getCart'
    })
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
