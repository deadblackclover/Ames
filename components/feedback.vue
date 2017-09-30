<template lang="html">
  <div class="block">
    <div class="name-blocks">
      Feedback
    </div>
    <div class="text-center">
      Please leave your feedback. For us it is important. Or send email to asocio@protonmail.com. Thank you!
    </div>
    <input class="" type="text" v-model="feedback">
    <div class=""><input type="button" value="Send" @click="sendFeedback"></div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data(){
    return{
      feedback: ''
    }
  },
  methods:{
    sendFeedback: function() {
      let vm = this;
      axios.post('/api',JSON.stringify({
        feedback: true,
        text: vm.feedback,
      }))
      .then((response) => {
        if(response.data){
          window.location.href = "/profile"
        }
      });
    }
  }
}
</script>
