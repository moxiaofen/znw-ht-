<template>
  <div class="bg">
    <ToolBar page_title="融资进度" :isWhile="false"></ToolBar>

    <div class="navbar-tab">
      <van-pull-refresh v-model="isDownLoading" @refresh="onDownRefresh">
        <van-list
          v-model="isUpLoading"
          :finished="upFinished"
          :immediate-check="false"
          :offset="10"
          finished-text="没有更多了......"
          @load="onLoadList">
            <ul>
              <li  v-for="(item,index) in financingList" :key='index' @click="toDetail(item.applyNo)">
                <div  class="item">

                  <div class="item-left">

                    <div class=" item-line1 tal">
                      <div>
                        <p class="contract-name">{{item.projectName}}</p>
                        <p class="contract-no">{{item.applyNo}}</p>
                      </div>
                    </div>

                    <div class="item-line2">
                      <span class="contract-amount">{{item.applyAmt}}</span>
                    </div>
                    <div class="item-line3">
                      <span class="contract-data">{{item.applyDate}}</span>
                    </div>
                  </div>

                  <div class="item-right">
                    
                    <img class="img-type" :src="formatSrc(item.approveStatus)" >

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

        src:"",
        pageSize: 10, // 每页条数
        pageIndex: 1, // 页码
        financingList: [], // 请求数据
        isDownLoading: false, // 下拉刷新
        isUpLoading: false, // 上拉加载
        upFinished: false, // 上拉加载完毕
        offset: 100 // 滚动条与底部距离小于 offset 时触发load事件


      }
    },
    created() {
        this.queryFinancingList();
    },
    methods: {

      toDetail(num) {
        this.$router.push({
          path: this.$RM.FinancingProgressDetail,
          query:{id: num}        
        })
      },
       //获取列表
      // queryFinancingList() {
      //     //开始请求登录接口
      //     const url = this.$api.ROOT + this.$Constants.QUERY_FINANCING_LIST;
      //     this.$http.post(url,{"custNo": "9999999","pageNo":"1","pageSize":"10"})//queryType: 00待签约合同查询01已签约合同查询
      //         .then(function (res) {
      //             console.log(res.data)
      //             var data = JSON.parse(res.data);
      //             this.products =data.product ;
      //         })
      //         .catch(function () {
      //             //  that.$toast(that.$ERRCODE.STATIC_ERRORCDDE.EXCEPTION);
      //         });
      // },
      //获取列表
      queryFinancingList() {
           const url = this.$api.ROOT + this.$Constants.QUERY_FINANCING_LIST;
           this.$http.post(url,{"factoringApply":{"custNo":"C000210","pageNo":this.pageIndex,"pageSize":this.pageSize}})
           .then(function (res) {
               const data = JSON.parse(res.data);
               const records = data.records;
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
                this.financingList = records
              } else {
                this.financingList = this.financingList.concat(records)
              }
          }).catch(function () {
             this.$toast(this.$ERRCODE.STATIC_ERRORCDDE.EXCEPTION);
          })
      },
      onDownRefresh() {
        this.pageIndex = 1
        this.upFinished = false // 不写这句会导致你上拉到底过后在下拉刷新将不能触发下拉加载事件
        this.queryFinancingList() // 加载数据
      },
      // 上拉加载请求方法
      onLoadList() {
        this.pageIndex++
        this.queryFinancingList()
      },
      formatSrc(num){
        switch(num) {
            case "01":
                return require("../../assets/iv_check_uncommit.png") 
                break;
            case "02":
                return require("../../assets/iv_check_loading.png") 
                break;
            case "03":
                return require("../../assets/iv_check_sucess.png") 
                break;
            default:
                return require("../../assets/iv_check_fail.png")  
        } 
      }

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
    margin-top: 10px;
  }

  .item-line3 {
    display: flex;
    margin-top: 10px;
  }

  .contract-name {
    color: #1f1f1f;
    margin-left: 32px;
    font-size: 40px;
  }

  .contract-no {
    color: #969696;
    font-size: 32px;
    margin-left: 32px;
    margin-top: 10px;
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
  .tal{
    text-align: left;
  }
</style>
