<template>
  <div class="bg">
    <mt-swipe :auto="4000" style="height: 200px" class="mt-swipe">
      <mt-swipe-item :key="item.id" v-for="item in imgList">
        <img :src="item.img" alt="">
      </mt-swipe-item>
      <!-- <mt-swipe-item>
        <img style="width: 100%; height: 200px; background-color: #abaeb5;" src='static/assets/logo.png' alt="">
      </mt-swipe-item>
      <mt-swipe-item>
        <img style="width: 100%; height: 200px; background-color: #abaeb5;" src='static/assets/logo.png' alt="">
      </mt-swipe-item> -->
    </mt-swipe>
    <ul class="gridBox">
      <li class="item" @click="toPage(index+1)" v-for="(grid,index) in gridList">
        <img class="img" :src="grid.src" alt="">
        <span class="text" :class="{'activeGuid':activeGuid==index+1}">{{grid.title}}</span>
      </li>
      <!-- <li class="item" @click="toPage(1)">
        <img class="img" src="static/assets/icon_login.png" alt="">
        <span class="text" :class="{'activeGuid':activeGuid==1}">登录/注册</span>
      </li>
      <li class="item" @click="toPage(2)">
        <img class="img" src="static/assets/icon_recomment.png" alt="">
        <span class="text" :class="{'activeGuid':activeGuid==2}">合同管理</span></li>
      <li class="item" @click="toPage(3)">
        <img class="img" src="static/assets/icon_progress.png" alt="">
        <span class="text" :class="{'activeGuid':activeGuid==3}">融资进度</span></li>
      <li class="item" @click="toPage(4)">
        <img class="img" src="static/assets/icon_pay.png" alt="">
        <span class="text" :class="{'activeGuid':activeGuid==4}">应收款</span></li> -->
    </ul>
    <keep-alive>
        <ul class="cardBox">
          <li v-for="(item,index) in products" :key='index' @click="toApply(item)">
            <div class="item">
              <div class=" item-line1">
                <div>
                  <span class="contract-name">{{item.projectName}}</span>
                  <span class="contract-no">{{item.projectNo}}</span>
                </div>
              </div>

              <div class="item-line2">
                <div class="item-line2-div">
                  <div class="item-box-dev">
                    <img class="item-img" src="static/assets/icon_available.png" alt="">
                    <span class="item-title">授信总额度（元）</span>
                  </div>
                  <span class="item-title2">{{item.creditLimitAmt}}</span>
                </div>

                <div class="item-line2-div">
                  <div class="item-box-dev">
                    <img class="item-img" src="static/assets/icon_residue.png" alt="">
                    <span class="item-title">剩余额度（元）</span>
                  </div>
                  <span class="item-title3">{{item.creditlimitBal}}</span>

                </div>


              </div>


            </div>
          </li>

        </ul>
    </keep-alive>
  </div>
</template>

<script>
    export default {
        // products,
        name: "home",
        components: {},
        computed: {},
        data() {
            return {
                activeGuid: null,
                products:[],
                imgList: [
                    {
                        id: 1,
                        img: require('../../assets/bg_first.png')
                    },
                    {
                        id: 2,
                        img: require('../../assets/bg_second.png')
                    },
                    {
                        id: 3,
                        img: require('../../assets/bg_third.png')
                    },
                    {
                        id: 4,
                        img: require('../../assets/bg_fourth.png')
                    },
                    {
                        id: 5,
                        img: require('../../assets/bg_fifth.png')
                    },
                ],
                gridList: [
                    {
                        gridId: 1,
                        src: require('../../assets/icon_login.png'),
                        title: "登录/注册"
                    },
                    {
                        gridId: 2,
                        src: require('../../assets/icon_recomment.png'),
                        title: "合同管理"
                    },
                    {
                        gridId: 3,
                        src: require('../../assets/icon_progress.png'),
                        title: "融资意向"
                    },
                    {
                        gridId: 4,
                        src: require('../../assets/icon_pay.png'),
                        title: "应收款"
                    }
                ]
            }
        },
        created() {
            this.queryProductList();
        },
        methods: {
            toPage(num) {
                this.activeGuid = num
                // // 登录/注册
                if (num == 1) {
                    this.$router.push({
                        path: this.$RM.LoginPage
                    }) 
                }
                // // 合同管理
                if (num == 2) {
                    this.$router.push({
                        path: this.$RM.ContractPage
                    })
                }
                // 融资意向
                if (num == 3) {
                    this.$router.push({
                        path: this.$RM.FianancingEOI
                    })
                }
                // // 应收款
                if (num == 4) {
                    this.$router.push({
                        path: this.$RM.Receivables
                    })
                }
            },
            toApply(item) {
                this.$router.push({
                    path: this.$RM.FianancingApply,
                    query:{
                      projectName : item.projectName,
                      projectNo : item.projectNo,
                      creditLimitAmt : item.creditLimitAmt,
                      creditlimitBal : item.creditlimitBal,
                      projectType : item.projectType
                    }  
                })
            },
            //获取产品列表
            queryProductList() {
                //开始请求登录接口
                const url = this.$api.ROOT + this.$Constants.QUERY_PRODUCT_LIST;
                this.$http.post(url,{})//operType操作类型0.注册，1.登陆
                    .then(function (res) {
                        const data = JSON.parse(res.data);
                        this.products = data.product;
                        //console.log(data)
                    })
                    .catch(function () {
                        this.$toast(this.$ERRCODE.STATIC_ERRORCDDE.EXCEPTION);
                    });
            }
        }
    }
</script>

<style scoped>
  .activeGuid {
    color: #FFC600 !important;
  }

  /* .bg {
    background-color: #fafafa;
  } */

  .gridBox {
    width: 100%;
    height: 200px;
    display: flex;
    flex-direction: row;
  }

  .gridBox .item {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .gridBox .item .text {
    color: #FFC600;
    margin-top: 10px;
  }

  .gridBox .item .img {
    height: 70px;
    width: 70px;
  }

  .cardBox {
    margin-top: 10px;
  }

  .cardBox .item {
    margin-top: 10px;
    padding-top: 16px;
    padding-bottom: 16px;
    background-color: #ffffff;
    display: flex;
    text-align: center;
    flex-direction: column;
  }

  .item-box-dev {
    display: flex;
    flex-direction: row;
    justify-content: center;
    padding: 10px;
  }

  .item-line1 {
    letter-spacing: 2px;
    display: flex;
    justify-content: space-between;
    flex-direction: row;
  }

  .item-line2 {
    letter-spacing: 2px;
    display: flex;
    padding-top: 10px;
    justify-content: space-between;
    flex-direction: row;
  }

  .item-line2-div {
    width: 50%;
    height: 100%;
    display: flex;
    justify-content: center;
    flex-direction: column;
  }

  .item-img {
    height: 40px;
    width: 40px;
  }

  .item-title {
    margin-left: 16px;
    font-size: 34px;
    color: #343434;
  }

  .item-title2 {
    font-size: 35px;
    color: red;
  }

  .item-title3 {
    font-size: 35px;
    color: #006666;
  }

  .contract-name {
    color: #1f1f1f;
    font-weight: bolder;
    margin-left: 20px;
    font-size: 36px;
  }

  .contract-no {
    color: #969696;
    font-size: 26px;
  }

  .contract-amount {
    font-size: 30px;
    margin-left: 16px;
    color: #ff0000;
  }

  /* xinjia */
  .mint-swipe {
    height: 200px;
  }

  .mint-swipe img {
    width: 100%;
    height: 100%;
    display: inline-block;
  }

  .mt-swipe .mint-swipe-indicator.is-active {
    background: #fec901
  }
</style>
