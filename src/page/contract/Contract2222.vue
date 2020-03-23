<template>
  <div class="bg">
    <!--

    <ToolBar page_title="合同管理" :isWhile="false" ></ToolBar>

    -->
  <ToolBar page_title="合同管理" :isWhile="false" ></ToolBar>
    <div class="fixed">

      <mt-navbar v-model="selected">
        <mt-tab-item id="1">待签约合同</mt-tab-item>
        <mt-tab-item id="2">已签约合同</mt-tab-item>
      </mt-navbar>

    </div>

    <div class="navbar-tab">

      <mt-tab-container v-model="selected">
        <mt-tab-container-item id="1">
          <van-pull-refresh v-model="isDownLoading" @refresh="onDownRefresh">
              <van-list
                    v-model="isUpLoading"
                    :finished="upFinished"
                    :immediate-check="false"
                    :offset="10"
                    finished-text="没有更多了......"
                    @load="onLoadList">

                  <ul>
                    <li v-for="(item,index) in contractList" :key='index' @click="toDetail(item.assetsNo)">
                      <div class="item">

                        <div class=" item-line1">
                          <div>
                            <span class="contract-name">保理合同（池保理）</span>

                            <span class="contract-no">BLC0001</span>
                          </div>
                          <span class=" contract-type">已签约</span>


                        </div>

                        <div class="item-line2">
                          <span class="contract-data">2019-11-11</span>
                        </div>
                      </div>
                    </li>
                  </ul>
              </van-list>
          </van-pull-refresh>
        </mt-tab-container-item>

        <mt-tab-container-item id="2">
            <van-pull-refresh v-model="isDownLoading" @refresh="onDownRefresh">
              <van-list
                    v-model="isUpLoading"
                    :finished="upFinished"
                    :immediate-check="false"
                    :offset="10"
                    finished-text="没有更多了......"
                    @load="onLoadList">
                  <ul>
                    <li v-for="(item,index) in contractList" :key='index' @click="toDetail(item.assetsNo)">
                      <div class="item">

                        <div class=" item-line1">
                          <div>
                            <span class="contract-name">保理合同（池保理）</span>

                            <span class="contract-no">BLC0002</span>
                          </div>
                          <span class=" contract-type">已签约</span>


                        </div>

                        <div class="item-line2">
                          <span class="contract-data">2019-11-11</span>
                        </div>
                      </div>
                    </li>
                  </ul>
              </van-list>
            </van-pull-refresh>
        </mt-tab-container-item>
      </mt-tab-container>

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
        queryType:"00",
        pageSize: 10, // 每页条数
        pageIndex: 1, // 页码
        contractList: [], // 请求数据
        isDownLoading: false, // 下拉刷新
        isUpLoading: false, // 上拉加载
        upFinished: false, // 上拉加载完毕
        offset: 100 // 滚动条与底部距离小于 offset 时触发load事件

      }
    },
    created() {
        this.queryContractList("00");
    },
    methods: {
      toDetail(num) {
        // this.$router.push({
        //   path: this.$RM.BrokerProgressDetail,
        //   query:{id: num}        
        // })
      },
      //获取列表
      queryContractList(queryType) {
           const url = this.$api.ROOT + this.$Constants.QUERY_BROKER_LIST;
           this.$http.post(url,{"custNo":"C000210","pageNo":this.pageIndex,"pageSize":this.pageSize,"assetsBroker":{"absName":"1"}})
           //const url = this.$api.ROOT + this.$Constants.QUERY_CONTRACT_LIST;
           //this.$http.post(url,{"contract":{"queryType":this.queryType,"custNo":"C000257","pageNo":this.pageIndex,"pageSize":this.pageSize}})//queryType: 00待签约合同查询01已签约合同查询
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
                this.contractList = records
              } else {
                this.contractList = this.contractList.concat(records)
              }
          }).catch(function () {
             this.$toast(this.$ERRCODE.STATIC_ERRORCDDE.EXCEPTION);
          })
      },
      onDownRefresh() {
        this.pageIndex = 1
        this.upFinished = false // 不写这句会导致你上拉到底过后在下拉刷新将不能触发下拉加载事件
        this.queryContractList(queryType) // 加载数据
      },
      // 上拉加载请求方法
      onLoadList() {
        this.pageIndex++
        this.queryContractList(queryType)
      },


    },


  }
</script>

<style scoped>
  /* .bg {
    background-color: #fafafa;
  } */

  .fixed {
    position: fixed;
    width: 100%;
    top: 100px;
    z-index: 20;
  }

  .navbar-tab {
    width: 100%;
    margin-top: 190px;
  }

  .item {
    margin-top: 10px;
    padding-top: 16px;
    padding-bottom: 16px;
    background-color: #ffffff;
  }

  .item-line1 {
    letter-spacing: 2px;
    color: #c9c9c9;
    display: flex;
    justify-content: space-between;
    flex-direction: row;
  }

  .item-line2 {
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

  .contract-type {
    color: #ff0000;
    margin-right: 32px;
    font-size: 30px;
  }

  .contract-data {
    margin-left: 32px;
    color: #343434;
    font-size: 32px;
  }
</style>
