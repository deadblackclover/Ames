<template lang="html">
  <div>
    <div class="header">
      <img src="/logo.png" alt="Ames">
      <h1>Ames</h1>
      <h3>Decentralized and free messenger</h3>
    </div>
    <div class="main" id="main">
      <input type="text" placeholder="E-mail" v-model="email" autofocus>
      <input class="btn" type="button" value="Sign In/Sign Up" @click="authorization">
      <div class="alert" role="alert" v-if="alertVisible">{{ alertMessage }}</div>
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
        { hid: 'description', name: 'description', content: 'Meta description' }
      ]
    }
  },
  data() {
    return {
      email: '',
      alertVisible: false,
      alertMessage: ''
    }
  },
  methods: {
    authorization: function(){
      let vm = this;
      if(vm.email != ""){
        axios.post('/api/sign', {
          email: vm.email
        })
        .then(function (response) {
          if(response.data == true){
            vm.alertVisible = true;
            vm.alertMessage = 'The letter was successfully sent to the post!';
          }else{
            vm.alertVisible = true;
            vm.alertMessage = 'Server error';
          }
        })
        .catch(function (error) {
          console.log(error);
          vm.alertVisible = true;
          vm.alertVisible = 'Bad request';
        });
      }else{
        vm.alertVisible = true;
        vm.alertMessage = 'You did not enter an email';
      }
    },
  }
}
</script>

<style lang="css" scoped>
@media screen and (max-height: 500px){
  .header img{
    width: 100px;
  }
}
@media screen and (max-width: 400px){
  .header img{
    width: 100px;
  }
}
input{
  margin: 5px;
}
.header,.main,.footer{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  word-wrap: break-word;
}
.footer{
  margin-top: 30px;
}
</style>
