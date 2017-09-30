<template lang="html">
  <div class="block">
    <div class="name-blocks">
      Contacts
    </div>
    <div class="contact" v-for="contact in contacts" @click="showChat">
      {{ contact }}
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
