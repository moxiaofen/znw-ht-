<template>
  <div>
    <ToolBar page_title="再保理详细信息查询" :isWhile="false"></ToolBar>

    <div class="content">
      <!--与顶部保持距离-->
      <div class='item'>
        <span class='item-left'>资产编号</span>
        <span class='item-right' ref="rAssetsNo">{{resData.assetsNo}}LA20190010</span>
      </div>
      <!--横线-->
      <Divider class="divider"></Divider>

      <div class='item'>
        <span class='item-left'>再保理合同编号</span>
        <span class='item-right' ref="rContractNo">{{resData.contractNo}}全保理产品</span>
      </div>
      <!--横线-->
      <Divider class="divider"></Divider>
      <div class='item'>
        <span class='item-left'>再保理商名称</span>
        <span class='item-right' ref="rCustName">{{resData.custName}}001</span>
      </div>
      <!--横线-->
      <Divider class="divider"></Divider>

      <div class='item'>
        <span class='item-left'>保理类别</span>
        <span class='item-right' ref="rProjectName">{{resData.projectName}}100000.00</span>
      </div>
      <!--横线-->
      <Divider class="divider"></Divider>

      <div class='item'>
        <span class='item-left'>保理品种</span>
        <span class='item-right' ref="rBusinessType">没返回这字段</span>
      </div>
      <!--横线-->
      <Divider class="divider"></Divider>
      <div class='item'>
        <span class='item-left'>再保理融资金额（元）</span>
        <span class='item-right' ref="rLoanAmt">{{resData.loanAmt}}2000.00</span>
      </div>
      <!--横线-->
      <Divider class="divider"></Divider>

      <div class='item'>
        <span class='item-left'>回款核销金额（元）</span>
        <span class='item-right' ref="rCanAmt">{{resData.canAmt}}2000.00</span>
      </div>
      <!--横线-->
      <Divider class="divider"></Divider>

      <div class='item'>
        <span class='item-left'>再保理融资余额（元）</span>
        <span class='item-right' ref="rLoanBal">{{resData.loanBal}}2000.00</span>
      </div>
      <!--横线-->
      <Divider class="divider"></Divider>

      <div class='item'>
        <span class='item-left'>合同生效日</span>
        <span class='item-right' ref="rContractStartDate">没返回这字段</span>
      </div>
      <!--横线-->
      <Divider class="divider"></Divider>


      <div class='item'>
        <span class='item-left'>合同到期日</span>
        <span class='item-right' ref="rTerm">{{resData.term}}2000.00</span>
      </div>
      <!--横线-->
      <Divider class="divider"></Divider>


      <div class='item'>
        <span class='item-left'>回款账号</span>
        <span class='item-right' ref="rContractEndDate">没返回这字段</span>
      </div>
      <!--横线-->
      <Divider class="divider"></Divider>


      <div class='item'>
        <span class='item-left'>状态</span>
        <span class='item-right' ref="rStatus">没返回这字段</span>
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
        enable: false, //立即注册 按钮默认不可用
        companyName: "", //客户企业名称
        authType: 0, // 认证类型
        companyType: 0, // 企业证件类型

        id:"",
        resData:{},   

      }
    },
    
    created() {
        this.queryFinancingDetail();
    },
    methods: {
      //获取详情
      queryFinancingDetail() {
          this.id = this.$route.query.id;
          const url = this.$api.ROOT + this.$Constants.QUERY_REFACTORING_DETAIL;
          this.$http.post(url,{"assetsNo": this.id})
              .then(function (res) {
                  this.resData = JSON.parse(res.data); 
                  console.log(this.resData)               
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
</style>
