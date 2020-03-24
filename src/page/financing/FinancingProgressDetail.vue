<template>
  <div>
    <ToolBar page_title="融资申请进度详情" :isWhile="false"></ToolBar>

    <div class="content">
      <!--与顶部保持距离-->
      <div class='item'>
        <span class='item-left'>融资申请编号</span>
        <span class='item-right'>{{resData.applyNo}}</span>
      </div>
      <!--横线-->
      <Divider class="divider"></Divider>

      <div class='item'>
        <span class='item-left'>产品名称</span>
        <span class='item-right'>{{resData.projectName}}</span>
      </div>
      <!--横线-->
      <Divider class="divider"></Divider>
      <div class='item'>
        <span class='item-left'>保理合同编号</span>
        <span class='item-right'>{{resData.creditContractNo}}</span>
      </div>
      <!--横线-->
      <Divider class="divider"></Divider>

      <div class='item'>
        <span class='item-left'>授信总额度</span>
        <span class='item-right'>{{resData.creditLimitAmt}}</span>
      </div>
      <!--横线-->
      <Divider class="divider"></Divider>

      <div class='item'>
        <span class='item-left'>剩余授信额度</span>
        <span class='item-right'>{{resData.creditlimitBal}}</span>
      </div>
      <!--横线-->
      <Divider class="divider"></Divider>
      <div class='item'>
        <span class='item-left'>最大可融资金额</span>
        <span class='item-right'>{{resData.loanAmtMax}}</span>
      </div>
      <!--横线-->
      <Divider class="divider"></Divider>

      <div class='item'>
        <span class='item-left'>本次融资申请金额</span>
        <span class='item-right'>{{resData.applyAmt}}</span>
      </div>
      <!--横线-->
      <Divider class="divider"></Divider>

      <div class='item'>
        <span class='item-left'>初始保证金金额</span>
        <span class='item-right'>{{resData.bondAmt}}</span>
      </div>
      <!--横线-->
      <Divider class="divider"></Divider>


      <div class='item'>
        <span class='item-left'>申请日期</span>
        <span class='item-right'>{{resData.applyDate}}</span>
      </div>
      <!--横线-->
      <Divider class="divider"></Divider>


      <div class='item'>
        <span class='item-left'>融资期限（天）</span>
        <span class='item-right'>{{resData.loanTerm}}</span>
      </div>
      <!--横线-->
      <Divider class="divider"></Divider>


      <div class='item'>
        <span class='item-left'>回款账号</span>
        <span class='item-right'>{{resData.backAcctNo}}</span>
      </div>
      <!--横线-->
      <Divider class="divider"></Divider>

      <div class='item'>
        <span class='item-left'>审批状态</span>
        <span class='item-right'>{{resData.approveStatus}}</span>
      </div>
      <!--横线-->
      <Divider class="divider"></Divider>

      <div class='item'>
        <span class='item-left'>应收账款清单</span>
      </div>
      <ul>
        <li v-for="(item,index) in acctList" :key='index' @click="toDetail(item.invoiceNo)">
          <div class="receivables-lib">
              <div class=" item-receivables-line1">
                <div>
                  <span class="receivables-name">{{item.draweeName}}</span>
                  <span class="receivables-no">{{item.tradeContractNo}}</span>
                </div>
              </div>

              <div class="item-receivables-line2">
                <span class="receivables-amount">{{item.contractAmt}}</span>
              </div>
              <div class="item-receivables-line3">
                <span class="receivables-data">{{item.paymentEndDate}}</span>
              </div>
          </div>
        </li>
      </ul>

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
        acctList:[],

      }
    },
    created() {
        this.queryFinancingDetail();
    },
    methods: {
      //获取详情---待处理，后台返回的数据格式有误
      queryFinancingDetail() {
          this.id = this.$route.query.id;
          const url = this.$api.ROOT + this.$Constants.QUERY_FINANCING_DETAIL;
          this.$http.post(url,{"applyNo": this.id})
          //this.$http.post(url,{"applyNo": 'LA2019082000000255'})
              .then(function (res) {
                  const data = JSON.parse(res.data);
                  this.resData = JSON.parse(data);        
                  this.acctList = this.resData.acctList ; 
                  console.log(res)
                  console.log(this.resData )
                  console.log( this.acctList)              
              })
              .catch(function () {
                  this.$toast(this.$ERRCODE.STATIC_ERRORCDDE.EXCEPTION);
              });
      },
      toDetail(num) {
        this.$router.push({
          path: this.$RM.ReceivablesDetail,
          query:{id: num}        
        })
      },
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

 .receivables-lib {
    margin-top: 10px;
  }

  .img-type {
    width: 80px;
    height: 80px;
  }

  .item-receivables-line1 {
    letter-spacing: 2px;
    color: #c9c9c9;
    font-size: 24px;
    display: flex;
    justify-content: space-between;
    flex-direction: row;
  }

  .item-receivables-line2 {
    display: flex;
  }

  .item-receivables-line3 {
    display: flex;
    margin-top: 10px;
  }

  .receivables-name {
    color: #1f1f1f;
    margin-left: 32px;
    font-size: 36px;
  }

  .receivables-no {
    color: #969696;
    font-size: 24px;
  }



  .receivables-data {
    margin-left: 32px;
    color: #343434;
    font-size: 26px;
  }

  .receivables-amount {
    font-size: 38px;
    margin-left: 32px;
    color: #ff0000;
  }
  

</style>
