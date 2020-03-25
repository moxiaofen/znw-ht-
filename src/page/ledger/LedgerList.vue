<template>
  <div class="bg">
      <ToolBar page_title="台账管理"  :isWhile="false"></ToolBar>
      <van-pull-refresh v-model="isDownLoading" @refresh="onDownRefresh">
        <van-list
          v-model="isUpLoading"
          :finished="upFinished"
          :immediate-check="false"
          :offset="10"
          finished-text="没有更多了......"
          @load="onLoadList">
            <ul class="navbar-tab">
                <li  v-for="(item,index) in ledgerList" :key='index' @click="toDetail(item.contractNo)">
                <div class="item">
                  <div class="item-left">
                    <div class=" item-line1">
                      <div>
                        <span class="contract-name">{{item.projectName}}</span>
                        <span class="contract-no">{{item.businessType}}</span>
                      </div>
                    </div>
                    <div class="item-line2">
                      <span class="contract-amount">{{item.loanAmt}}</span>
                    </div>
                    <div class="item-line3">
                      <span class="contract-data">{{item.endDate}}</span>
                    </div>
                  </div>
                  <div class="item-right">
                    <span>{{item.lnState}}</span>
                  </div>
                </div>
              </li>
            </ul>
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
        ledgerList: [], // 请求数据
        isDownLoading: false, // 下拉刷新
        isUpLoading: false, // 上拉加载
        upFinished: false, // 上拉加载完毕
        offset: 100 // 滚动条与底部距离小于 offset 时触发load事件

      }
    },
    created() {
        this.queryLedgerList();
    },
    methods: {
      toDetail(num){
        this.$router.push({
          path: this.$RM.LedgerDetail,
          query:{id: num}   
        })
      },
      //获取列表
      queryLedgerList() {
           const url = this.$api.ROOT + this.$Constants.QUERY_LEDGER_LIST;
           this.$http.post(url,{"contract":{"custNo":"C000210","pageNo":this.pageIndex,"pageSize":this.pageSize}})
           .then(function (res) {
               const data = JSON.parse(res.data);
               const records = data.records
               console.log(records)
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
                this.ledgerList = records
              } else {
                this.ledgerList = this.ledgerList.concat(records)
              }
          }).catch(function () {
             this.$toast(this.$ERRCODE.STATIC_ERRORCDDE.EXCEPTION);
          })
      },
      onDownRefresh() {
        this.pageIndex = 1
        this.upFinished = false // 不写这句会导致你上拉到底过后在下拉刷新将不能触发下拉加载事件
        this.queryLedgerList() // 加载数据
      },
      // 上拉加载请求方法
      onLoadList() {
        this.pageIndex++
        this.queryLedgerList()
      },


    }
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
       color: red;
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
