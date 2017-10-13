<template lang="html">
  <div class="main-profile">
    <div class="left">
      <div class="profile">
        <div class="photo">
          <img :src="photo" alt="photo">
        </div>
        <div class="">{{ username }}</div>
      </div>
      <div class="menu btn" @click="setView('contacts')">Contacts</div>
      <div class="menu btn" @click="setView('search')">Search</div>
      <div class="menu btn" @click="setView('setting')">Setting</div>
      <div class="menu btn" @click="setView('feedback')">Feedback</div>
      <div class="menu btn" @click="outProfile">Sing Out</div>
    </div>
    <div class="right">
      <component v-bind:is="currentView"></component>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

import contacts from "~/components/contacts.vue"
import feedback from "~/components/feedback.vue"
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
      photo: null,
      currentView: 'contacts'
    }
  },
  components: {
    contacts,
    feedback,
    search,
    setting
  },
  mounted(){
    let vm = this;
    axios.post('/api/profile')
    .then(function (response) {
      vm.username = response.data.nickname;
      vm.photo = response.data.photo;
    })
  },
  methods: {
    outProfile: function() {
      window.location.href = "/out";
    },
    setView: function (name) {
      this.currentView = name;
    }
  }
}
</script>
