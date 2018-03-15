<template lang="html">
  <div class="chat">
    <div class="chat-messages">
      <div class="" v-for="ms in messages">
        {{ ms }}
      </div>
    </div>
    <div class="chat-ipt">
      <input type="text" v-model="message">
      <input type="button" value="Send" @click="send">
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data(){
    return {
      message: null,
      messages: null,
      err: false
    }
  },
  props: ['to'],
  mounted () {
    let vm = this;
    axios.post('/api/profile/message',{
      to: vm.to
    }).then((response) => {
      vm.messages = response.data;
    });
  },
  methods: {
    send: function () {
      var vm = this
    	axios.post('/api/profile/send',{
      	to: vm.to,
      	message: vm.message
    	}).then((response) => {
      	vm.messages = response.data;
    	});
    }
  }
}
</script>
