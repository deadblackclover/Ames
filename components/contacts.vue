<template lang="html">
  <div class="block">
    <div class="name-blocks" v-if="!chatView">
      Contacts
      <div class="add-block" v-if="addBlock">
        <input v-model="contact">
        <div class="name-blocks-btn" @click="addContact()">Ok</div>
      </div>
      <div class="name-blocks-btn" @click="addBlock=true" v-if="!addBlock">Add</div>
    </div>
    <div class="name-blocks" v-if="chatView">
      {{ to }}
    </div>
    <div class="contact" v-for="item in contacts" v-if="!chatView">
      <div @click="showChat(item.contact)">
        {{ item.contact }}
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
      contact: '',
      chatView: false,
      addBlock: false,
      to: ''
    }
  },
  components: {
    chat
  },
  mounted () {
    let vm = this;
    axios.post('/api/profile/contacts').then((response) => {
      vm.contacts = response.data;
    });
  },
  methods:{
    showChat: function(name){
      this.to = name;
      this.chatView = true;
    },
    addContact: function(){
      let vm = this
      axios.post('/api/profile/add/contact',{
      	contact: vm.contact
    	}).then((response) => {
      	if(response.data) {
          vm.addBlock = false
        }
    	});
    }
  }
}
</script>
<style lang="stylus" src="~/assets/css/contacts.styl"></style>