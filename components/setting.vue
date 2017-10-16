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
          Change email
        </div>
        <div class="setting-item-right">
          <input type="text" v-model="setting.email">
          <input type="button" name="" value="Change" @click="changeEmail">
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
        email: '',
        photo: '',
      }
    }
  },
  mounted(){
    let vm = this;
    axios.post('/api',JSON.stringify({
      getset: true,
    }))
    .then((response) => {
      vm.setting.username = response.data.username;
      vm.setting.email = response.data.email;
    });
  },
  methods:{
    changeUsername: function() {
      let vm = this;
      axios.post('/api',JSON.stringify({
        setusername: true,
        username: vm.setting.username,
      }))
      .then((response) => {
        console.log(response.data);
        if(response.data){
          window.location.href = "/profile";
        }
      });
    },
    changeEmail: function () {

    },
    changePhoto: function (path) {

    }
  }
}
</script>
