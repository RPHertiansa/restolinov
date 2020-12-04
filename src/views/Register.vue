<template>
<div class="container">
  <Header />
  <div class="row d-flex justify-content-center">
    <div class="col-lg-4 col-11  register p-4">
      <form @submit.prevent="register()">
        <div class="row">
          <div class="col-lg-1 col-1">
          </div>
          <div class="col-lg-11 col-11">
              <h3 class="text-center" style="color: #7CBF95; margin-left: -30px">Register</h3>
          </div>
        </div>
        <p class="text-left  mt-4 mb-2">Let's create your account!</p>

        <div class="md-form">
          <label for="name">Name</label>
          <input type="text" v-model="name" id="name" class="form-control">
        </div>

        <div class="md-form">
          <label for="email">Email</label>
          <input type="email" v-model="email" id="email" class="form-control">
        </div>

        <div class="md-form">
          <label for="password1">Password</label>
          <input type="password" v-model="password" id="password1" class="form-control">
        </div>

        <div class="form-group text-center mt-3">
          <button type="submit" class="btn btn-block linov-btn">Register</button>
        </div>
      </form>
      <p class="text-right">Already have an account? <router-link to="/login" style="color: #7CBF95">Sign In</router-link></p>
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
  name: 'Register',
  components: {
    Header,
    Footer
  },
  data () {
    return {
      name: '',
      email: '',
      password: ''
    }
  },
  methods: {
    ...mapActions({
      onRegister: 'auth/onRegister'
    }),
    register () {
      const userData = {
        name: this.name,
        email: this.email,
        password: this.password
      }
      this.onRegister(userData)
        .then((response) => {
          if (response === 'success') {
            Swal.fire({
              icon: 'success',
              title: 'You are registered!'
            })
            this.$router.push('/login')
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Duplicate Email',
              text: 'Please use different email as this one is already registered'
            })
          }
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }
}
</script>
<style scoped>
@import '../assets/css/main.css';
</style>
