<template>
  <div class="bg">
      <ToolBar page_title="设置" :isWhile="false"> </ToolBar>

      <div class="cellBox">
        <mt-cell class="cell"  @click.native="toPage(cell.toKey)" v-for="cell in cellList" :key='cell.toKey'>
          <span slot="title"> {{cell.title}}</span>
          <img slot="icon" :src="cell.src">
        </mt-cell>

      <!-- <mt-cell class="cell" @click.native="toPage('search')">
        <span slot="title"> 个人信息设置</span>
        <img slot="icon" src="../../assets//iv_gerenxinxi.png" width="24" height="24">
      </mt-cell>

      <mt-cell class="cell" @click.native="toPage('apply')">
        <span slot="title"> 企业信息设置</span>

        <img slot="icon" src="../../assets/iv_qiyexinxi.png" width="24" height="24">
      </mt-cell> -->

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
      return {
          cellList : [
             {
                toKey : 'PersonInfo',
                title : '个人信息设置',
                src : require('../../assets/iv_gerenxinxi.png')
             },
             {
                toKey : 'CompanyInfo',
                title : '企业信息设置',
                src : require('../../assets/iv_qiyexinxi.png')
             }
          ]
      }
    },
    methods: {
      toPage(msg){
         if ('PersonInfo' == msg) {
          this.$router.push({
            path: this.$RM.PersonInfo
          })
        }
        if ('CompanyInfo' == msg) {
          console.log(2)
          this.$router.push({
            path: this.$RM.CompanyInfo
          })
        }
      }
    }
  }
</script>

<style scoped>
  /* .bg {
    background-color: #fafafa;
  } */
.cellBox {
    width: 100%;
    margin-top: 100px;
    box-sizing: border-box;
  }

  .cellBox .cell {
    padding-left: 16px;
    padding-right: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 120px;
    line-height: 120px;
    background-color: #ffffff;
    margin-bottom: 3px;
  }

 .cellBox .cell img {
  width: 40px;
  height: 40px;
  margin-right: 10px;
}
  .cellBox .cell span {
    font-size: 34px;
    color: #4F4F55;
    vertical-align: middle;
  }
</style>
