<template>
<div class="container">
  <Header />
  <div class="row d-flex justify-content-center mb-5">
    <div class="col-lg-4 col-11  login p-4">
      <form @submit.prevent="login">
        <h3 class="text-center" style="color: #7CBF95">Login</h3>
        <p class="text-left mt-4 mb-4">Hi, Welcome back!</p>

        <div class="md-form">
          <label for="email">Email</label>
          <input type="email" v-model="email" id="email" class="form-control">
        </div>

        <div class="md-form mb-3" style="">
          <label for="password">Password</label>
          <input type="password" v-model="password" id="password" class="form-control">
        </div>

        <div class="form-group text-center">
          <button type="submit" class="btn btn-block order-btn">Login</button>
        </div>

        <div class="form-group text-center">
       <p>Don’t have an account? <router-link to="/register" style="color: #7CBF95">Sign Up</router-link></p>
        </div>

      </form>
    </div>
  </div>
  <Footer />
</div>
</template>
<script>
import { mapActions } from 'vuex'
import Swal from 'sweetalert2'
import Header from '../components/Header'
import Footer from '../components/Footer'

export default {
  name: 'Login',
  components: {
    Header,
    Footer
  },
  data () {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    ...mapActions({
      onLogin: 'auth/onLogin'
    }),
    login () {
      const userData = {
        email: this.email,
        password: this.password
      }
      this.onLogin(userData)
        .then((response) => {
          if (response === 'success') {
            this.$router.push('/')
            this.$router.go('/')
          } else if (response === 'email not found') {
            Swal.fire({
              icon: 'error',
              title: 'Email not found!',
              text: 'Please register your email to get account!'
            })
          } else if (response === 'wrong password') {
            Swal.fire({
              icon: 'error',
              title: 'Wrong Password!',
              text: 'Please check again your password!'
            })
          }
        })
    }
  }
}
</script>
<style scoped>
.login {
  background: #ffffff;
  border-radius: 30px;
  text-align: left;
  border: 1px solid #7CBF95;
}
.line {
  display: flex;
  flex-direction: column;
  align-items: center;
  border-style: solid;
  border-width: 1px;
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
