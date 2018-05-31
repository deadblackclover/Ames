<template lang="html">
  <div class="main-profile">
    <div class="left">
      <div class="profile">
        <div class="photo">
          <img :src="photo" :alt="username" :title="username">
        </div>
      </div>
      <div class="menu btn" @click="setView('contacts')">Contacts</div>
      <div class="menu btn" @click="setView('search')">Search</div>
      <div class="menu btn" @click="setView('setting')">Setting</div>
      <div class="menu btn" @click="outProfile">Sign Out</div>
    </div>
    <div class="right">
      <component v-bind:is="currentView"></component>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

import contacts from "~/components/contacts.vue"
import search from "~/components/search.vue"
import setting from "~/components/setting.vue"

export default {
  head(){
    return{
      title: 'Profile',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { hid: 'description', name: 'description', content: 'Meta description' }
      ]
    }
  },
  middleware: 'check-auth',
  data() {
    return {
      username: null,
      fullname: null,
      photo: null,
      currentView: 'contacts'
    }
  },
  components: {
    contacts,
    search,
    setting
  },
  mounted(){
    let vm = this;
    axios.post('/api/profile')
    .then(function (res) {
      var fname = res.data.fname
      var lname = res.data.lname
      if(fname !== '' && lname !== ''){
        vm.fullname = fname + ' ' + lname 
      }
      vm.username = res.data.username
      vm.photo = res.data.photo
    })
  },
  methods: {
    outProfile: function() {
      window.location.href = "/out"
    },
    setView: function (name) {
      this.currentView = name
    }
  }
}
</script>
<style lang="stylus" src="~/assets/css/profile.styl"></style>