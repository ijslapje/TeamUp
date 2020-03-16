<template>
<section class="wrapper">
  <div id="app">
    <navbar>
    </navbar>
    
    <section id="main_content">
      <router-view/>
    </section>
    
    
    
    
  </div>

      <footerSection></footerSection> 

    
</section>
</template>

<script>
import navbar from '@/components/Navbar.vue'
import footerSection from '@/components/Footer.vue'


export default {
  components: {
    navbar, footerSection,
  }
}
</script>

<style lang="less">
</style>
