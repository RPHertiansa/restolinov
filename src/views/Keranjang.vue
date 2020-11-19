<template>
    <div class="container">
        <Header />
        <h2 class="text-left mt-3 mb-4">Keranjang Saya</h2>
        <div v-if="cartData.data.length === 0">
          Silakan order terlebih dahulu
        </div>
        <div v-else>
          <table class="table text-left">
            <thead>
                <tr>
                    <th>#</th>
                    <th>Foto</th>
                    <th>Makanan</th>
                    <th>Harga</th>
                    <th>Jumlah</th>
                    <th>Total</th>
                    <th></th>
                </tr>
            </thead>
            <tbody v-for="(item, index) in cartData.data" :key="index" >
                <tr>
                    <td>{{item.id}}</td>
                    <td><img class="img-table" :src="require(`../assets/images/${item.product.gambar}`)" alt=""></td>
                    <td scope="row">{{item.product.nama}}</td>
                    <td>Rp {{formatPrice(item.product.harga)}}</td>
                    <td>{{item.jumlah_pemesanan }}</td>
                    <td>Rp {{formatPrice(item.total)}}</td>
                    <td><button @click="deleteCart(item.id)" class="btn btn-light"><b-icon-trash class="text-danger"></b-icon-trash></button></td>
                </tr>
            </tbody>
        </table>
          <div class="ml-auto w-25 text-left">
            <form @submit.prevent="checkout(nama, noMeja, cartData.data)">
                <div class="form-group ">
                    <label for="nama" >Nama</label>
                    <input type="text" v-model="nama" class="form-control">
                </div>
                <div class="form-group ">
                    <label for="nomor" >Nomor Meja</label>
                    <input type="number" v-model="noMeja" class="form-control">
                </div>
                <div class="text-right">
                  <button type="submit" class="btn order-btn" ><b-icon-cart class="mr-2 h5 cart-icon" ></b-icon-cart>Pesan</button>
                </div>
            </form>
          </div>
        </div>
        <Footer />
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import Header from '../components/Header'
import Footer from '../components/Footer'
import currency from '../mixins/currency'

export default {
  name: 'Keranjang',
  mixins: [currency],
  data () {
    return {
      nama: '',
      noMeja: ''
    }
  },
  components: {
    Header,
    Footer
  },
  computed: {
    ...mapGetters({
      cartData: 'products/getCart',
      checkoutData: 'products/checkoutItem'
    })
  },
  methods: {
    ...mapActions({
      getCart: 'products/getCart',
      checkoutItem: 'products/checkoutItem',
      actionDeleteCart: 'products/deleteCart'
    }),
    deleteCart (id) {
      this.actionDeleteCart(id)
      this.getCart()
    },
    checkout (nama, noMeja, keranjangs) {
      this.nama = nama
      this.noMeja = noMeja
      const data = { nama, noMeja, keranjangs }
      this.checkoutItem(data)
      // this.$router.push('/pesanan-sukses')
    }
  },
  mounted () {
    this.getCart()
  }
}
</script>
<style>
.img-table{
  width: 200px !important;
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
</style>
