<template lang="html">
  <div>
    <div class="header">
      <img src="/logo.png" alt="Ames">
      <h1>Ames</h1>
      <h3>Decentralized and free messenger</h3>
    </div>
    <div class="main" id="main">
      <input class="email" type="text" placeholder="E-mail" v-model="email" autofocus>
      <input class="auth" type="button" value="Sign In/Sign Up" @click="authorization">
      <div class="alert" role="alert" v-if="alert.visible">{{ alert.message }}</div>
    </div>
    <div class="footer">
      Open-Source project by
      <a href="https://github.com/deadblackclover" target="_blank">DEADBLACKCLOVER</a>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  head(){
    return{
      title: 'Welcome',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { hid: 'description', name: 'description', content: 'Ames messenger' }
      ]
    }
  },
  data() {
    return {
      email: '',
      alert: {
      	visible: false,
      	message: ''
      },
    }
  },
  methods: {
    authorization: function(){
      let vm = this
      if(vm.email != ""){
        axios.post('/api/sign', {
          email: vm.email
        })
        .then(function (response) {
          if(response.data == true){
            vm.alert.visible = true
            vm.alert.message = 'The letter was successfully sent to the post!'
          }else{
            vm.alert.visible = true
            vm.alert.message = 'Server error'
          }
        })
        .catch(function (error) {
          console.log(error)
          vm.alert.visible = true
          vm.alert.misible = 'Bad request'
        })
      }else{
        vm.alert.visible = true
        vm.alert.message = 'You did not enter an email'
      }
    }
  }
}
</script>
