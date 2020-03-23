<template>
  <div class="bg">
    <ToolBar page_title="资产信息" :isWhile="false"></ToolBar>

    <div class="navbar-tab">

      <van-pull-refresh v-model="isDownLoading" @refresh="onDownRefresh">
        <van-list
          v-model="isUpLoading"
          :finished="upFinished"
          :immediate-check="false"
          :offset="10"
          finished-text="没有更多了......"
          @load="onLoadList">
             <ul class="cardBox">
                <li  v-for="(item,index) in brokerList" :key='index' @click="toDetail(item.assetsNo)">
                  <div class="item">
                    <div class=" item-line1 vam">
                        <span class="contract-name flex1">{{item.absName}}</span>
                        <span class="contract-no flex1">{{item.assetsNo}}</span>
                    </div>
                    <div class=" item-line1">
                        <span class="contract-flex">{{item.securitiesTrader}}</span>
                        <span class="contract-flex">{{item.creditRating}}</span>
                    </div>
                    <div class=" item-line1">
                        <span class="contract-flex">{{item.lawFirm}}</span>
                        <span class="contract-flex">{{item.accountingFirm}}</span>
                    </div>
                    <div class=" item-line1">
                        <span class="contract-flex">{{item.creditRatingOrg}}</span>
                        <span class="contract-flex">{{item.guaranteeOrg}}</span>
                    </div>
                  </div>
                </li>
              </ul>
        </van-list>
      </van-pull-refresh>
     
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
        listA: ['aA', 'bA', 'cA'],
        listB: ['aB', 'bB', 'cB'],
        listC: ['aC', 'bC', 'cC'],
        selected: "1",
        waitData: [{
          name: '',
          no: 'BLC0002',
          type: '已签约',
          date: '2019-11-21'
        }],

        pageSize: 10, // 每页条数
        pageIndex: 1, // 页码
        brokerList: [], // 请求数据
        isDownLoading: false, // 下拉刷新
        isUpLoading: false, // 上拉加载
        upFinished: false, // 上拉加载完毕
        offset: 100 // 滚动条与底部距离小于 offset 时触发load事件


      }
    },
    created() {
        this.queryBrokerList();
    },
    methods: {
      // loadMore() {
        // this.loading = true;
        // setTimeout(() => {
        //   let last = this.list[this.list.length - 1];
        //   for (let i = 1; i <= 10; i++) {
        //     this.list.push(last + i);
        //   }
        //   this.loading = false;
        // }, 2500);
      // },
      toDetail(num) {
        this.$router.push({
          path: this.$RM.BrokerProgressDetail,
          query:{id: num}        
        })
      },
      //获取列表
      queryBrokerList() {
           const url = this.$api.ROOT + this.$Constants.QUERY_BROKER_LIST;
           this.$http.post(url,{"custNo":"C000210","pageNo":this.pageIndex,"pageSize":this.pageSize,"assetsBroker":{"absName":"1"}})
           .then(function (res) {
               const data = JSON.parse(res.data);
               const records = data.records
               //console.log(records)
              if (records == null || records.length === 0) {
                // 加载结束
                this.upFinished = true
                return
              }
              if (records.length < this.pageSize) {
                // 最后一页不足10条的情况
                this.upFinished = true
              }
              // 处理数据
              if (this.pageIndex === 1) {
                this.brokerList = records
              } else {
                this.brokerList = this.brokerList.concat(records)
              }
          }).catch(function () {
             this.$toast(this.$ERRCODE.STATIC_ERRORCDDE.EXCEPTION);
          })
      },
      onDownRefresh() {
        this.pageIndex = 1
        this.upFinished = false // 不写这句会导致你上拉到底过后在下拉刷新将不能触发下拉加载事件
        this.queryBrokerList() // 加载数据
      },
      // 上拉加载请求方法
      onLoadList() {
        this.pageIndex++
        this.queryBrokerList()
      },


    }
  }
</script>

<style scoped>
  /* .bg {
    background-color: #fafafa;
  } */

  .navbar-tab {
    text-align: justify;
    padding-top: 100px;
  }

  .item {
    margin-top: 10px;
    padding-top: 16px;
    padding-bottom: 16px;
    background-color: #ffffff;
    display: flex;
    text-align: center;
    justify-content: space-between;
    flex-direction: row;


  }

  .item-left {

  }

  .item-right {
    display: flex;
    align-items: center;
    margin-right: 32px;
  }

  .img-type {
    width: 120px;
    height: 120px;
  }

  .item-line1 {
    letter-spacing: 2px;
    display: flex;
    justify-content: space-between;
    flex-direction: row;
  }

  .item-line2 {
    display: flex;
    margin-top: 20px;
  }

  .item-line3 {
    display: flex;
    margin-top: 20px;
  }

  .contract-name {
    color: #1f1f1f;
    margin-left: 32px;
    font-size: 40px;
  }

  .contract-no {
    color: #969696;
    font-size: 32px;
  }



  .contract-data {
    margin-left: 32px;
    color: #343434;
    font-size: 32px;
  }

  .contract-amount {
    font-size: 42px;
    margin-left: 32px;
    color: #ff0000;
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
  .contract-flex{
    flex: 1;
    font-size: 34px;
    margin-top: 10px;
    color: #666;
  }
  .flex1{
    flex: 1;
  }
  .vam{
     align-items: center;
  }

</style>
