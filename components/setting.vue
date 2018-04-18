<template lang="html">
  <div class="block">
    <div class="name-blocks">
      Setting
    </div>
    <div class="setting">
      <div class="setting-item">
        <div class="setting-item-left">
          Change username
        </div>
        <div class="setting-item-right">
          <input type="text" v-model="setting.username">
          <input type="button" name="" value="Change" @click="changeUsername">
        </div>
      </div>
      <div class="setting-item">
        <div class="setting-item-left">
          Change photo
        </div>
        <div class="setting-item-right">
          <input type="file" @change="changePhoto($event)">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data(){
    return{
      setting: {
        username: '',
        photo: '',
      }
    }
  },
  mounted(){
    let vm = this
    axios.post('/api/profile').then((response) => {
      vm.setting.username = response.data.username
    })
  },
  methods:{
    changeUsername: function() {
      let vm = this
      axios.post('/api/profile/change',{
        setusername: true,
        username: vm.setting.username,
      })
      .then((response) => {
        if(response.data){
          window.location.href = "/profile"
        }
      })
    },
    changePhoto: function (path) {

    }
  }
}
</script>
<style lang="stylus" src="~/assets/css/setting.styl"></style>