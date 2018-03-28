<template lang="html">
  <div class="container">
    <h1 class="blink-text">Out...</h1>
  </div>
</template>

<script>
export default {
  head(){
    return{
      title: 'Out...',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { hid: 'description', name: 'description', content: 'Meta description' }
      ]
    }
  },
  middleware: 'out'
}
</script>
<style lang="stylus" src="~/assets/css/blink.styl"></style>