<template>
  <div id="app">
    <MainHeader />
    <MainContainer />
    <MainFooter />
  </div>
</template>

<script>
import MainContainer from './components/MainContainer.vue'
import MainHeader from './components/MainHeader.vue';
import MainFooter from './components/MainFooter.vue';

export default {
  name: 'App',
  components: {
    MainContainer,
    MainHeader,
    MainFooter
  },

}

</script>

<style lang="scss">
html {
  body {
    background-color: rgba(128, 128, 128, 0.752);
  }
}
</style>
