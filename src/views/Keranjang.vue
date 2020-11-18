<template>
    <div class="container">
        <Header />
        <h2 class="text-left mt-3 mb-4">Keranjang</h2>
        <table class="table text-left">
            <thead>
                <tr>
                    <th>Makanan</th>
                    <th>Harga</th>
                    <th>Jumlah</th>
                    <th>Total</th>
                    <th>Keterangan</th>
                </tr>
            </thead>
            <tbody v-for="(item, index) in cartData.data" :key="index" >
                <tr>
                    <td scope="row">{{item.product.nama}}</td>
                    <td>Rp {{formatPrice(item.product.harga)}}</td>
                    <td>{{item.jumlah_pemesanan }}</td>
                    <td>Rp {{formatPrice(item.total)}}</td>
                    <td>{{item.keterangan }}</td>
                </tr>
            </tbody>
        </table>
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
  components: {
    Header,
    Footer
  },
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
