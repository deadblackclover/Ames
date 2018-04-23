<template lang="html">
  <div class="chat">
    <div class="chat-messages">
      <div class="message" v-for="item in messages">
        <div class="message-from">{{ item.from }}</div>
        <div class="message-text">{{ item.message }}</div>
      </div>
    </div>
    <div class="chat-send">
      <input class="message-send" type="text" v-model="message" placeholder="Message">
      <input class="btn-send" type="button" value="Send" @click="send">
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
    let vm = this
    let mes = () => {
      axios.post('/api/profile/messages',{
        to: vm.to
      }).then((response) => {
        vm.messages = response.data
      });
    }
    mes()
    setInterval(mes,10000)
  },
  methods: {
    send: function () {
      var vm = this
    	axios.post('/api/profile/send',{
      	to: vm.to,
      	message: vm.message
    	}).then((response) => {
      	vm.messages = response.data
    	});
    }
  }
}
</script>
<style lang="stylus" src="~/assets/css/messages.styl"></style>