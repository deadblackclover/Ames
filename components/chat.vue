<template lang="html">
  <div class="chat">
    <div class="chat-messages">
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
      message: ''
    }
  },
  methods: {
    send: function () {

    }
  }
}
</script>
