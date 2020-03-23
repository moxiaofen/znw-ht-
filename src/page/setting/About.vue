<!--进件中,商户协议的内容页面-->
<template>
  <div class="page">
    <ToolBar page_title="关于我们" :isWhile="false"></ToolBar>

    <div class="content">

      <div class="top">
        <img class="img" src="../../assets/ic_launcher.jpg" />
        <span class="title">v1.0.0</span>
      </div>


    </div>
  </div>
</template>
<script>
  import ToolBar from '@/components/ToolBar2.vue'
  export default {

    components: {
      ToolBar
    },
    data() {
      return {}
    },

  }
</script>
<style scoped>
  .page .fixed {
    position: fixed;
    width: 100%;
  }

  .page {
    background-color: #ffffff;
    width: 100%;
    height: 100%;
  }

  .content {
    margin-left: 0.4rem;
    margin-right: 0.4rem;
    font-size: 30px;
    margin-top: 140px;
    text-align: justify;
    line-height: 0.7rem;
    padding-top: 0px;

  }

  .top {
    display: flex;
    margin-top: 40px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .img {
    width: 120px;
    height: 120px;
  }

  .title {
    color: #343434;
    font-size: 30px;
  }
</style>
