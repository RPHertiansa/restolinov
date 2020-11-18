<template>
    <div class="container">
        <Header />
        <Card />
        <Footer />
    </div>
</template>

<script>
import Header from '../components/Header'
import Card from '../components/Card'
import Footer from '../components/Footer'

export default {
  name: 'Foods',
  components: {
    Header,
    Card,
    Footer
  }
}
</script>
