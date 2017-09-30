<template lang="html">
  <div class="container">
    <div>
      <h1 v-if="error.statusCode === 404">Page not found</h1>
      <h1 v-else>Error</h1>
    </div>
    <div class="img">
      <img src="/logo.png" alt="Error" />
    </div>
    <div>
      <nuxt-link to="/">Back to home</nuxt-link>
    </div>
  </div>
</template>

<script>
export default {
  props: ['error'],
  head(){
    return{
      title: 'Ooops!'
    }
  }
}
</script>

<style lang="css">
  .container{
    height: 90vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
</style>
