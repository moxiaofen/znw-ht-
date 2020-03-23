<template>
  <div class="bg">

    <ToolBar page_title="应收账款查询"  :isWhile="false"></ToolBar>
    
    <van-pull-refresh v-model="isDownLoading" @refresh="onDownRefresh">
        <van-list
          v-model="isUpLoading"
          :finished="upFinished"
          :immediate-check="false"
          :offset="10"
          finished-text="没有更多了......"
          @load="onLoadList">
          <div class="navbar-tab">
             <ul class="cardBox">
                <li  v-for="(item,index) in receivablesList" :key='index' @click="toDetail(item.acctCode)">   
                  <div class="item">

                    <div class="item-left">
                      <div class=" item-line1">
                        <div>
                          <span class="contract-name">{{item.draweeName}}</span>
                          <span class="contract-no">{{item.tradeContractNo}}</span>
                        </div>
                      </div>

                      <div class="item-line2">
                        <span class="contract-amount">{{item.contractAmt}}</span>
                      </div>
                      <div class="item-line3">
                        <span class="contract-data">{{item.paymentEndDate}}</span>
                      </div>
                    </div>

                  </div>
                </li>
            </ul>
          </div>
        </van-list>
    </van-pull-refresh>
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

        pageSize: 10, // 每页条数
        pageIndex: 1, // 页码
        receivablesList: [], // 请求数据
        isDownLoading: false, // 下拉刷新
        isUpLoading: false, // 上拉加载
        upFinished: false, // 上拉加载完毕
        offset: 100 // 滚动条与底部距离小于 offset 时触发load事件


      }
    },
    created() {
        this.queryReceivablesList();
    },
    methods: {
      toDetail(num) {
        this.$router.push({
          path: this.$RM.ReceivablesDetail,
          query:{id: num}        
        })
      },
      //获取列表
      queryReceivablesList() {
           const url = this.$api.ROOT + this.$Constants.QUERY_RECEIVABLES_LIST;
           this.$http.post(url,{"custNo":"C000257","account":{"draweeName":"","status":"00","pageNo":this.pageIndex,"pageSize":this.pageSize}})
           .then(function (res) {
               const data = JSON.parse(res.data);
               const records = data.account;
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
                this.receivablesList = records
              } else {
                this.receivablesList = this.receivablesList.concat(records)
              }
          }).catch(function () {
             this.$toast(this.$ERRCODE.STATIC_ERRORCDDE.EXCEPTION);
          })
      },
      onDownRefresh() {
        this.pageIndex = 1
        this.upFinished = false // 不写这句会导致你上拉到底过后在下拉刷新将不能触发下拉加载事件
        this.queryReceivablesList() // 加载数据
      },
      // 上拉加载请求方法
      onLoadList() {
        this.pageIndex++
        this.queryReceivablesList()
      },
    },


  }
</script>

<style scoped>
  /* .bg {
    background-color: #fafafa;
  } */

  .navbar-tab {
    margin-top: 100px;
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

  .item-left{

  }

  .item-right{
      display: flex;
      align-items: center;
      margin-right: 32px;
  }

  .img-type {
    width: 80px;
    height: 80px;
  }

  .item-line1 {
    letter-spacing: 2px;
    color: #c9c9c9;
    font-size: 24px;
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
    font-size: 36px;
  }

  .contract-no {
    color: #969696;
    font-size: 28px;
  }



  .contract-data {
    margin-left: 32px;
    color: #343434;
    font-size: 30px;
  }

  .contract-amount {
    font-size: 42px;
    margin-left: 32px;
    color: #ff0000;
  }
</style>
