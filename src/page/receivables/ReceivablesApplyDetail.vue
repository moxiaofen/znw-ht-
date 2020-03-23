<template>
  <div>
    <ToolBar page_title="应收账款转让详情" :isWhile="false"></ToolBar>

    <div class="content">


      <div class='item'>
        <span class='item-left'>付款人（买方）姓名</span>
        <span class='item-right'>{{resData.draweeName}}</span>
      </div>
      <!--横线-->
      <Divider class="divider"></Divider>
      <div class='item'>
        <span class='item-left'>授信合同号</span>
        <span class='item-right'>{{resData.creditContractNo}}</span>
      </div>
      <!--横线-->
      <Divider class="divider"></Divider>

      <div class='item'>
        <span class='item-left'>本次申请转让笔数</span>
        <span class='item-right'>{{resData.transferCount}}</span>
      </div>
      <!--横线-->
      <Divider class="divider"></Divider>
	


      <div class='item'>
        <span class='item-left'>本次申请转让金额</span>
        <span class='item-right'>{{resData.transferAmt}}</span>
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
        <span class='item-left'>转让申请状态</span>
        <span class='item-right'>{{formatStatus(resData.status)}}</span>
      </div>
      <!--横线-->
      <Divider class="divider"></Divider>

    </div>

    <div >
      <!-- 清单列表未写，不知格式怎么写 -->
      <div class="item">
             <span class="title">应收款清单</span>
      </div>


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
        this.queryReceivablesApplyDetail();
    },
    methods: {
      //获取详情
      queryReceivablesApplyDetail() {
          this.id = this.$route.query.id;
          const url = this.$api.ROOT + this.$Constants.QUERY_RECEIVESAPPLY_DETAIL;
          this.$http.post(url,{"applyNo": this.id}) 
          //this.$http.post(url,{"applyNo": "AAI2019062400000152"})  
           .then(function (res) {
                  this.resData = JSON.parse(res.data); 
                  //console.log(this.resData)               
              })
              .catch(function () {
                  this.$toast(this.$ERRCODE.STATIC_ERRORCDDE.EXCEPTION);
              });
      },
      formatStatus(num){
        switch(num) {
            case "00":
                return "已录入";
                break;
            case "01":
                return "已生效";
                break;
            case "02":
                return "已转让";
                break;
            case "03":
                return "已融资";
                break;
            default:
              return "已核销"
        } 
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
  .title{
    font-size: 0.45rem;
    color: #000000;
    font-weight: bolder;
  }
</style>
