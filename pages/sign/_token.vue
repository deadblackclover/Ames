<template lang="html">
  <div class="container">
    <h1 class="blink-text">Sign...</h1>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  head(){
    return{
      title: 'Sign...',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { hid: 'description', name: 'description', content: 'Meta description' }
      ]
    }
  },
  mounted(){
    let vm = this;
    axios.post('/api/sign/token', {
      token: this.$route.params.token
    })
    .then(function (res) {
      if(res.data){
        window.location.href = '/profile'
      }else{
        window.location.href = '/'
      }
    })
  },
  validate ({ params }){
    return true
  }
}
</script>
<style lang="stylus" src="~/assets/css/blink.styl"></style>