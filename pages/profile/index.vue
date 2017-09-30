<template lang="html">
  <div class="main-profile">
    <div class="left">
      <div class="profile">
        <div class="photo">
          <img src="" alt="photo">
        </div>
        <div class="">username</div>
      </div>
      <div class="menu btn" @click="showContacts">Contacts</div>
      <div class="menu btn" @click="showSearch">Search</div>
      <div class="menu btn" @click="showSetting">Setting</div>
      <div class="menu btn" @click="showFeedback">Feedback</div>
      <div class="menu btn" @click="outProfile">Sing Out</div>
    </div>
    <div class="right">
      <chat v-if="panel.chat"></chat>
      <contacts v-if="panel.contacts"></contacts>
      <feedback v-if="panel.feedback"></feedback>
      <search v-if="panel.search"></search>
      <setting v-if="panel.setting"></setting>
    </div>
  </div>
</template>

<script>
import chat from "~/components/chat.vue"
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
  components: {
    chat,
    contacts,
    feedback,
    search,
    setting
  },
  data() {
    return {
      panel:{
        contacts: false,
        chat: false,
        search: false,
        setting: false,
        feedback: false
      },
    }
  },
  methods: {
    outProfile: function() {
      window.location.href = "/out";
    },
    showContacts: function() {
      this.panel.chat = this.panel.search = this.panel.setting = this.panel.feedback = false;
      this.panel.contacts = true;
    },
    showChat: function() {
      this.panel.contacts = this.panel.search = this.panel.setting = this.panel.feedback = false;
      this.panel.chat = true;
    },
    showSearch: function() {

    },
    showSetting: function() {
      this.panel.chat = this.panel.search = this.panel.contacts = this.panel.feedback = false;
      this.panel.setting = true;
    },
    showFeedback: function() {
      this.panel.chat = this.panel.search = this.panel.setting = this.panel.contacts = false;
      this.panel.feedback = true;
    }
  }
}
</script>
