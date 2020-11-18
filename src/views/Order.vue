/* eslint-disable camelcase */
<template>
    <div class="container">
        <Header />
        <nav aria-label="breadcrumb">
            <ol class="breadcrumb bread">
                <li class="breadcrumb-item h4"><router-link to="/" class="text-dark">Home</router-link></li>
                <li class="breadcrumb-item h4"><router-link to="/foods" class="text-dark">Foods</router-link></li>
                <li class="breadcrumb-item h4 font-weight-bold" aria-current="page">Food Order</li>
            </ol>
        </nav>
        <div class="row mb-3">
            <div class="col-lg-6">
                <img class="img-fluid round boxshadow"  :src="require(`../assets/images/${detail.data.gambar}`)" alt="">
            </div>
            <div class="col-lg-6 text-left">
                <h2 class="font-weight-bold">{{detail.data.nama}}</h2>
                <hr>
                <h2>Harga <span class="font-weight-bold">Rp {{formatPrice(detail.data.harga)}}</span></h2>
                <form @submit.prevent="addToCart(detail.data, jumlah, keterangan)">
                    <div class="form-group">
                        <label for="exampleInputEmail1">Jumlah Pesanan</label>
                        <input type="number" v-model="jumlah" class="form-control">
                    </div>
                     <div class="form-group">
                        <label for="exampleFormControlTextarea1">Keterangan</label>
                        <textarea class="form-control" v-model="keterangan" placeholder="seperti" rows="2"></textarea>
                    </div>
                    <button type="submit" class="btn order-btn" ><b-icon-cart class="mr-2 h5 cart-icon" ></b-icon-cart>Pesan</button>
                </form>
            </div>
        </div>
        <Footer />
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import Header from '../components/Header'
import Footer from '../components/Footer'
import currency from '../mixins/currency'

export default {
  name: 'Order',
  mixins: [currency],
  components: {
    Header,
    Footer
  },
  data () {
    return {
      id: this.$route.query.id,
      jumlah: '',
      keterangan: ''
    }
  },
  computed: {
    ...mapGetters({
      detail: 'products/getDetailProduct'
    })
  },
  methods: {
    ...mapActions({
      getDetailProduct: 'products/getDetailProduct',
      cart: 'products/cart'
    }),
    // eslint-disable-next-line camelcase
    addToCart (product, jumlah_pemesanan, keterangan) {
      // eslint-disable-next-line camelcase
      this.jumlah = jumlah_pemesanan
      this.keterangan = keterangan
      const total = parseInt(jumlah_pemesanan) * product.harga
      const data = { product, jumlah_pemesanan, keterangan, total }
      this.cart(data)
      this.$router.push({ path: '/keranjang' })
    }
  },
  mounted () {
    this.getDetailProduct(this.$route.query.id)
  }
}
</script>

<style>
.round{
  border-radius: 4% !important;
}
.boxshadow{
    box-shadow: 5px 7px 10px rgba(0, 0, 0, 0.2) !important;
}
.order-btn{
  background-color: #7CBF95 !important;
  color: white !important;
  border: solid 1px #7CBF95 !important;
}
.order-btn:hover{
  transform: scale(1.01) !important;
  background-color: #7CBF95 !important;
  filter: contrast(1.1) !important;
}
.bread{
  background-color: transparent !important;
  padding: 0px !important;
}
</style>
