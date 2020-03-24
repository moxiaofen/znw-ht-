<template>
  <div>
    <ToolBar page_title="应收账款详情" :isWhile="false"></ToolBar>

    <div class="content">
      <div class='item'>
        <span class='item-left'>付款人（买方）姓名</span>
        <span class='item-right'>{{resData.draweeName}}</span>
      </div>

      <Divider class="divider"></Divider>
      <div class='item'>
        <span class='item-left'>合同金额</span>
        <span class='item-right'>{{resData.contractAmt}}</span>
      </div>
    
      <Divider class="divider"></Divider>

      <div class='item'>
        <span class='item-left'>购销合同号</span>
        <span class='item-right'>{{resData.tradeContractNo}}</span>
      </div>

      <Divider class="divider"></Divider>


      <div class='item'>
        <span class='item-left'>已付款金额</span>
        <span class='item-right'>{{resData.paidAmt}}</span>
      </div>
      
      <Divider class="divider"></Divider>
      <div class='item'>
        <span class='item-left'>发票号</span>
        <span class='item-right'>{{resData.invoiceNo}}</span>
      </div>
      
      <Divider class="divider"></Divider>

      <div class='item'>
        <span class='item-left'>佣金及折让金额</span>
        <span class='item-right'>{{resData.allowanceAmt}}</span>
      </div>
      
      <Divider class="divider"></Divider>

      <div class='item'>
        <span class='item-left'>应收账款金额</span>
        <span class='item-right'>{{resData.acctAmt}}</span>
      </div>
      
      <Divider class="divider"></Divider>


      <div class='item'>
        <span class='item-left'>应收账款余额</span>
        <span class='item-right'>{{resData.acctBal}}</span>
      </div>
      
      <Divider class="divider"></Divider>


      <div class='item'>
        <span class='item-left'>预付款金额</span>
        <span class='item-right'>{{resData.advanceAmt}}</span>
      </div>
     
      <Divider class="divider"></Divider>

      <div class='item'>
        <span class='item-left'>付款账号</span>
        <span class='item-right'>{{resData.paymentAcctNo}}</span>
      </div>
     
      <Divider class="divider"></Divider>


      <div class='item'>
        <span class='item-left'>合同付款方式</span>
        <span class='item-right'>{{resData.contractPayType}}</span>
      </div>
      
      <Divider class="divider"></Divider>

      <div class='item'>
        <span class='item-left'>付款到期日</span>
        <span class='item-right'>{{resData.paymentEndDate}}</span>
      </div>
     
      <Divider class="divider"></Divider>
      
      <div class='item'>
        <span class='item-left'>凭证状态</span>
        <span class='item-right'>{{formatStatus(resData.status)}}</span>
      </div>
      
      <Divider class="divider"></Divider>
    </div>
  </div>
</template>

<script>
  import ToolBar from '@/components/ToolBar2.vue'
  import Divider from '@/components/Divider.vue'


  export default {
    name: "identity",
    components: {
      ToolBar,
      Divider,
    },
    computed: {},
    data() {
      return {
        nonet: false, //断网

        id:"",
        //type:'',
        resData:{}, 
      }
    },
    created() {
        this.queryReceivablesDetail();
    },
    methods: {
      //获取详情
      queryReceivablesDetail() {
          this.id = this.$route.query.id;
          const type = this.$route.query.type;
          console.log(this.$route.query.data)
          if(type=='finance'){
              this.resData = this.$route.query.data;
              //console.log(this.resData)
          }else{
              const url = this.$api.ROOT + this.$Constants.QUERY_RECEIVABLES_DETAIL;
              this.$http.post(url,{"acctCode": this.id})
              //this.$http.post(url,{"acctCode": "AARI2019061100000141"})//有数据
                  .then(function (res) {
                      this.resData = JSON.parse(res.data); 
                      console.log(this.resData)               
                  })
                  .catch(function () {
                      this.$toast(this.$ERRCODE.STATIC_ERRORCDDE.EXCEPTION);
                  });
          }

      },
      formatStatus(num){
        switch(num) {
            case "00":
                return "未提交";
                break;
            case "01":
                return "审批中";
                break;
            case "02":
                return "退回修改";
                break;
            case "03":
                return "已通过";
                break;
            default:
              return "已否决"
        } 
      },
     

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
</style>
