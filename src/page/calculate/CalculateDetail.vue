<template>
  <div>
    <ToolBar page_title="还款测算详情" :isWhile="false"></ToolBar>

    <div class="content">


      <div class='item'>
        <span class='item-left'>合同编号</span>
        <span class='item-right'>CON2019999</span>
      </div>
      <!--横线-->
      <Divider class="divider"></Divider>
      <div class='item'>
        <span class='item-left'>提款编号</span>
        <span class='item-right'>LA201901101</span>
      </div>
      <!--横线-->
      <Divider class="divider"></Divider>

      <div class='item'>
        <span class='item-left'>融资金额（元）</span>
        <span class='item-right'>20000.00</span>
      </div>
      <!--横线-->
      <Divider class="divider"></Divider>

      <div class='item'>
        <span class='item-left'>融资余额（元）</span>
        <span class='item-right'>2000.00</span>
      </div>
      <!--横线-->
      <Divider class="divider"></Divider>
      <div class='item'>
        <span class='item-left'>出账日</span>
        <span class='item-right'>2019-01-01</span>
      </div>
      <!--横线-->
      <Divider class="divider"></Divider>

      <div class='item'>
        <span class='item-left'>融资期限</span>
        <span class='item-right'>60天</span>
      </div>
      <!--横线-->
      <Divider class="divider"></Divider>

      <div class='item'>
        <span class='item-left'>保理融资款（元）</span>
        <span class='item-right'>20.00</span>
      </div>
      <!--横线-->
      <Divider class="divider"></Divider>


      <div class='item'>
        <span class='item-left'>保理服务费（元）</span>
        <span class='item-right'>2000.00</span>
      </div>
      <!--横线-->
      <Divider class="divider"></Divider>


      <div class='item'>
        <span class='item-left'>提前还款违约金</span>
        <span class='item-right'>2000.00</span>
      </div>
      <!--横线-->
      <Divider class="divider"></Divider>


      <div class='item'>
        <span class='item-left'>账户管理费</span>
        <span class='item-right'>12.0</span>
      </div>
      <!--横线-->
      <Divider class="divider"></Divider>


      <div class='item'>
        <span class='item-left'>还款总额（元）</span>
        <span class='item-right'>现金</span>
      </div>
      <!--横线-->
      <Divider class="divider"></Divider>

      <div class='item'>
        <span class='item-left'>项目经理</span>
        <span class='item-right'>张三</span>
      </div>
      <!--横线-->
      <Divider class="divider"></Divider>
    </div>
  </div>
</template>

<script>
  import ToolBar from '@/components/ToolBar2.vue'
  import Divider from '@/components/Divider.vue'
  import LoginButton from '@/components/LoginButton.vue'
  export default {
    name: "identity",
    components: {
      ToolBar,
      Divider,
      LoginButton
    },
    computed: {},


    data() {
      return {
        nonet: false, //断网
        
        id:"",
        resData:{},     
      }
    },
    created() {
        this.queryCalculateDetail();
    },
    methods: {
      //获取详情
      queryCalculateDetail() {
          this.id = this.$route.query.id;
          const url = this.$api.ROOT + this.$Constants.QUERY_CALCULATE_DETAIL;
          this.$http.post(url,{"loanNo": this.id})
              .then(function (res) {
                  this.resData = JSON.parse(res.data); 
                  //console.log(this.resData)               
              })
              .catch(function () {
                  this.$toast(this.$ERRCODE.STATIC_ERRORCDDE.EXCEPTION);
              });
      }
    },

  }
</script>

<style scoped>
  .content {
    color: #4F4F55;
    position: relative;
    margin-top: 100px;
  }


  .item {
    display: flex;
    flex-direction: row;
    padding: 10px 16px 10px 16px;
    justify-content: space-between;
    /*background-color:burlywood;*/
    position: relative;
  }

  .divider {
    margin-left: 16px;
    margin-right: 16px;
  }


  .item-left {
    font-size: 0.4rem;
    border: none;
    color: #343434;
    font-weight: bolder;
  }

  .item-right {
    font-size: 0.4rem;
    color: #969696;

    border: none;
  }
</style>
