<template>
  <div id="wrapper">
    <side></side>
    <div id="page-wrapper" class="gray-bg dashbard-1">
      <top></top>
      <router-view></router-view>
    </div>
  </div>
</template>

<script type="text/javascript">
  import side from './common/side.vue';
  import top from './common/top.vue';
  /* eslint-disable */
  import $ from 'jquery';
  export default {
    components: {
      side,
      top
    },
    mounted () {
    }
  };
</script>

<style>

</style>
