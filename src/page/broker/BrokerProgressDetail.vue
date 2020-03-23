<template>
  <div>
    <ToolBar page_title="资产详细信息查询" :isWhile="false"></ToolBar>

    <div class="content">
      <!--与顶部保持距离-->
      <div class='item'>
        <span class='item-left'>资产编号</span>
        <span class='item-right'>{{resData.assetsNo}}</span>
      </div>
      <!--横线-->
      <Divider class="divider"></Divider>

      <div class='item'>
        <span class='item-left'>ABS名称</span>
        <span class='item-right'>{{resData.absName}}</span>
      </div>
      <!--横线-->
      <Divider class="divider"></Divider>
      <div class='item'>
        <span class='item-left'>券商</span>
        <span class='item-right'>{{resData.securitiesTrader}}</span>
      </div>

      <!--横线-->
      <Divider class="divider"></Divider>

      <div class='item'>
        <span class='item-left'>律师事务所</span>
        <span class='item-right'>{{resData.lawFirm}}</span>
      </div>
      <!--横线-->
      <Divider class="divider"></Divider>

      <div class='item'>
        <span class='item-left'>信用评级</span>
        <span class='item-right'>{{resData.creditRating}}</span>
      </div>
      <!--横线-->
      <Divider class="divider"></Divider>
      <div class='item'>
        <span class='item-left'>信用评级机构</span>
        <span class='item-right'>{{resData.creditRatingOrg}}</span>
      </div>
      <!--横线-->
      <Divider class="divider"></Divider>

      <div class='item'>
        <span class='item-left'>会计师事务所</span>
        <span class='item-right'>{{resData.accountingFirm}}</span>
      </div>
      <!--横线-->
      <Divider class="divider"></Divider>
      <div class='item'>
        <span class='item-left'>发行场所</span>
        <span class='item-right'>{{resData.issuingPlace}}</span>
      </div>
      <!--横线-->
      <Divider class="divider"></Divider>

      <div class='item'>
        <span class='item-left'>基础资产类型</span>
        <span class='item-right' ref="rAssetsType">没返回这字段</span>
      </div>
      <!--横线-->
      <Divider class="divider"></Divider>

      <div class='item'>
        <span class='item-left'>担保增信机构</span>
        <span class='item-right'>{{resData.guaranteeOrg}}</span>
      </div>
      <!--横线-->
      <Divider class="divider"></Divider>

    </div>
  </div>
</template>

<script>
  import ToolBar from '@/components/ToolBar2.vue'
  import Divider from '@/components/Divider.vue'
  export default {
    components: {
      ToolBar,
      Divider
    },
    data() {
      return {
        nonet: false, //断网

        id:"",
        resData:{},     
      }
    },
    created() {
        this.queryBrokerDetail();
    },
    methods: {
      //获取详情
      queryBrokerDetail() {
          this.id = this.$route.query.id;
          const url = this.$api.ROOT + this.$Constants.QUERY_BROKER_DETAIL;
          this.$http.post(url,{"assetsNo": this.id})
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
</style>
