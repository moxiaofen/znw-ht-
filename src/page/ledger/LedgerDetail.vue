<template>
  <div>
    <ToolBar page_title="台账对账详情" :isWhile="false"></ToolBar>

    <div class="content">
      <!--与顶部保持距离-->
      <p class="cont-item">额度信息</p>
      <div>
        <div class='item'>
            <span class='item-left'>授信编号</span>
            <span class='item-right'>{{resData.creditNo}}</span>
        </div>
        <!--横线-->
        <Divider class="divider"></Divider>

        <div class='item'>
            <span class='item-left'>授信额度</span>
            <span class='item-right'>{{resData.creditLimitAmt}}</span>
        </div>
        <!--横线-->
        <Divider class="divider"></Divider>
        <div class='item'>
            <span class='item-left'>额度生效日</span>
            <span class='item-right'>{{resData.creditStartDate}}</span>
        </div>
        <!--横线-->
        <Divider class="divider"></Divider>

        <div class='item'>
            <span class='item-left'>剩余可用额度</span>
            <span class='item-right'>{{resData.creditLimitbal}}</span>
        </div>
        <!--横线-->
        <Divider class="divider"></Divider>

        <div class='item'>
            <span class='item-left'>授信期限(月)</span>
            <span class='item-right'>{{resData.creditTerm}}</span>
        </div>
        <!--横线-->
        <Divider class="divider"></Divider>
        <div class='item'>
            <span class='item-left'>是否可循环</span>
            <span class='item-right'>{{resData.loopFlag}}</span>
        </div>
        <!--横线-->
        <Divider class="divider"></Divider>

      </div>
    
      <p class="cont-item">对账信息</p>
      <div>
        <!--对账结果-->
        <div class='item'>
            <span class='item-left'>对账结果</span>
            <van-dropdown-menu active-color="#FFC600" class="dropdown">
            <van-dropdown-item v-model="vCheckFlag" :options="checkFlagOpt" />
            </van-dropdown-menu>
        </div>
        <!--横线-->
        <Divider></Divider>

        <!--异议声明-->
        <div class='item'>
            <span class='item-left'>异议声明</span>
            <textarea class="item-right text-right" name="" id="" cols="32" rows="5"  v-model="vErrorDesc" placeholder="请输入异议声明" maxlength="100"></textarea>
        </div>
        <!--横线-->
        <Divider></Divider>

      </div>

      <LoginButton name="提交" :isInputNonEmpty="enable" @click.native="toNext" borderRadius="6px"></LoginButton>

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
        this.queryLedgerDetail();
    },
    methods: {
      //获取详情
      queryLedgerDetail() {
          this.id = this.$route.query.id;
          const url = this.$api.ROOT + this.$Constants.QUERY_LEDGER_DETAIL;
          this.$http.post(url,{"contractNo":{"contractNo": this.id}})
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
    margin-top: 100px;
    position: relative;
  }


  .item {
    display: flex;
    flex-direction: row;
    padding: 20px 32px 20px 32px;
    justify-content: space-between;
    /*background-color:burlywood;*/
    position: relative;
  }

  .divider {
    margin-left: 32px;
    margin-right: 32px;
  }


  .item-left {
    font-size: 32px;
    border: none;
    color: #343434;
    font-weight: bolder;
  }

  .item-right {
    font-size: 32px;
    color: #969696;

    border: none;
  }
  /* .text-right{
      text-align: right;
  }
  .cont-item{
      font-size: 32px;
      background-color: #fafafa;
      padding: 20px 30px;
      color: #888;
  } */

</style>
