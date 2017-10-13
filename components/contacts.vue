<template lang="html">
  <div class="block">
    <div class="name-blocks" v-if="!chatView">
      Contacts
    </div>
    <div class="name-blocks" v-if="chatView">
      {{ to }}
    </div>
    <div class="contact" v-for="contact in contacts" v-if="!chatView">
      <div @click="showChat(contact)">
        {{ contact }}
      </div>
    </div>
    <chat v-if="chatView" :to="to"></chat>
  </div>
</template>

<script>
import axios from 'axios'

import chat from '~/components/chat.vue'

export default {
  data(){
    return{
      contacts: '',
      chatView: false,
      to: ''
    }
  },
  components: {
    chat
  },
  mounted () {
    let vm = this;
    axios.post('/api/contacts').then((response) => {
      vm.contacts = response.data;
    });
  },
  methods:{
    showChat: function(name){
      this.to = name;
      this.chatView = true;
    }
  }
}
</script>
