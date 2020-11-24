/* eslint-disable no-unused-vars */
import axios from 'axios'

const state = () => {
  return {
    isLogin: sessionStorage.getItem('isLogin')
  }
}

const getters = {
  isLogin: (state) => {
    if (state.isLogin) {
      return true
    } else {
      return false
    }
  }
}

const actions = {
  onRegister: (context, payload) => {
    return new Promise((resolve, reject) => {
      axios.get(`http://localhost:3000/users?email=${payload.email}`)
        .then((response) => {
          if (response.data.length === 0) {
            axios.post('http://localhost:3000/users', payload)
              .then((response) => {
                resolve('success')
              })
              .catch((err) => {
                console.log(new Error(err))
              })
          } else {
            resolve('email already existed')
          }
        }).catch((err) => {
          console.log(new Error(err))
        })
    })
  },
  onLogin: (context, payload) => {
    return new Promise((resolve, reject) => {
      axios.get(`http://localhost:3000/users?email=${payload.email}`)
        .then(response => {
          if (response.data.length !== 0) {
            axios.get(`http://localhost:3000/users?password=${payload.password}`)
              .then(response => {
                if (response.data.length !== 0) {
                  resolve('success')
                  sessionStorage.setItem('isLogin', true)
                } else {
                  resolve('wrong password')
                }
              }).catch(err => {
                console.log(err)
              })
          } else {
            resolve('email not found')
          }
        }).catch(err => {
          console.log(err)
        })
    })
  },
  onLogout (context) {
    return new Promise((resolve) => {
      sessionStorage.removeItem('isLogin')
      resolve('Logout success')
    })
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions
}
