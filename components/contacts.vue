<template lang="html">
  <div>
    <div class="name-blocks">
      Contacts
    </div>
    <div class="contact text-center" v-for="contact in contacts" @click="showChat">
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data(){
    return{
      contacts: ''
    }
  },
  mounted () {
    let vm = this;
    axios.post('/api/contacts').then((response) => {
      vm.contacts = response.data;
    });
  }
}
</script>
