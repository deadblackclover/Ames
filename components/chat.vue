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
      message: '',
      err: false
    }
  },
  props: ['to'],
  methods: {
    send: function () {
      let to = this.to;
      let name, host = null;
      if(to.indexOf("@")){
        host = to.substring(to.indexOf("@")+1);
        name = to.substring(0,to.indexOf("@"));
        host = 'http://' + host + '/api/send';
        axios.post(host, {
          name: name,
          message: this.message
        })
        .then(function (res) {
          if(!res){
            this.err = true;
          }
        })
      }else{
        this.err = true;
      }
    }
  }
}
</script>
