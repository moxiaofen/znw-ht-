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
      <div class='cont-sides'>
          <p class="cont-item">应收账款清单      
          </p>
          <img  class="add-img" src="static/assets/icon_add.png"  @click="addReceives()"/>
      </div>
      <Divider></Divider>
      <ul>
        <li v-for="a in 2" :key='a'>
          <div class="receivables-lib">

              <div class=" item-receivables-line1">
                <div>
                  <span class="receivables-name">湖南大业食品有限公司</span>

                  <span class="receivables-no">LA2019080100002</span>
                </div>

              </div>

              <div class="item-receivables-line2">

                <span class="receivables-amount">200000.0元</span>
              </div>

              <div class="item-receivables-line3">
                <span class="receivables-data">2019-11-11</span>
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
        dataFileListCust:[],


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
      addReceives(){
        this.$router.push({
          path: this.$RM.AddReceivables
        }) //
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

  .add-img {
    width: 50px;
    height: 50px;
    padding: 20px 30px 18px
  } 
  .cont-sides{
    display: flex;
    -webkit-box-orient: horizontal;
    -webkit-box-direction: normal;
    flex-direction: row;
    -webkit-box-pack: justify;
    -ms-flex-pack: justify;
    justify-content: space-between;
    background-color: #fafafa;
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
