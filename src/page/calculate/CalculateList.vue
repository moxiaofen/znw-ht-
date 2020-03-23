<template>
  <div class="bg">
    <ToolBar page_title="还款测算" :isWhile="false" ></ToolBar>

    <van-pull-refresh v-model="isDownLoading" @refresh="onDownRefresh">
        <van-list
          v-model="isUpLoading"
          :finished="upFinished"
          :immediate-check="false"
          :offset="10"
          finished-text="没有更多了......"
          @load="onLoadList">
          <ul class="content">
            <li  v-for="(item,index) in CalculateList" :key='index' @click="toDetail(item.loanNo)">
              <div class="item">
                <div class=" item-line1">
                  <div>
                    <span class="contract-name">合同编号</span>

                    <span class="contract-no">NO.2019080100002</span>
                  </div>

                </div>

                <div class="item-line2">
                  <div class="item-line2-div">
                    <div class="item-box-dev">

                      <span class="item-title">融资金额</span>
                    </div>

                    <span class="item-title2">10000.00</span>
                  </div>

                  <div class="item-line2-div">
                    <div class="item-box-dev">

                      <span class="item-title">融资余额</span>
                    </div>

                    <span class="item-title3">10000.00</span>
                  </div>


                </div>

                <div class="item-line3">
                  <span>经理 张三</span>
                  <span>期限 60天</span>
                    <span>2019-01-01</span>
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
    name: "calculateList",
    components: {
      ToolBar
    },
    computed: {},
    data() {
      return {

        pageSize: 10, // 每页条数
        pageIndex: 1, // 页码
        CalculateList: [], // 请求数据
        isDownLoading: false, // 下拉刷新
        isUpLoading: false, // 上拉加载
        upFinished: false, // 上拉加载完毕
        offset: 100 // 滚动条与底部距离小于 offset 时触发load事件
          
      }
    },
    created() {
        this.queryCalculateList();
    },
    methods: {
      toDetail(num) {
        this.$router.push({
          path: this.$RM.BrokerProgressDetail,
          query:{id: num}        
        })
      },
      //获取列表
      queryCalculateList() {
           const url = this.$api.ROOT + this.$Constants.QUERY_CALCULATE_LIST;
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
                this.CalculateList = records
              } else {
                this.CalculateList = this.CalculateList.concat(records)
              }
          }).catch(function () {
             this.$toast(this.$ERRCODE.STATIC_ERRORCDDE.EXCEPTION);
          })
      },
      onDownRefresh() {
        this.pageIndex = 1
        this.upFinished = false // 不写这句会导致你上拉到底过后在下拉刷新将不能触发下拉加载事件
        this.queryCalculateList() // 加载数据
      },
      // 上拉加载请求方法
      onLoadList() {
        this.pageIndex++
        this.queryCalculateList()
      },


    },

  }
</script>


<style scoped>
  /* .bg{
    background-color: #fafafa;
  } */

  .content {
    margin-top: 100px;
  }

  .content .item {
    margin-top: 5px;
    padding-top: 8px;
    padding-bottom: 8px;
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
    color: #c9c9c9;
    font-size: 24px;
    display: flex;
    justify-content: space-between;
    flex-direction: row;
  }

  .item-line2 {
    letter-spacing: 2px;
    color: #c9c9c9;
    font-size: 24px;
    display: flex;
    justify-content: space-between;
    flex-direction: row;
  }

  .item-line3 {
    font-size: 24px;
    display: flex;
    justify-content: center;
    flex-direction: row;
  }

  .item-line3 span {
    margin-top: 5px;
    margin-bottom: 5px;
    width: 33%;
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
    margin-left: 8px;
    font-size: 0.30rem;
    color: #343434;

  }

  .item-title2 {
    margin-left: 8px;
    font-size: 0.35rem;
    color: red;
  }

  .item-title3 {
    margin-left: 8px;
    font-size: 0.35rem;
    color: #006666;
  }

  .contract-name {
    color: #1f1f1f;
    font-weight: bolder;
    margin-left: 20px;
    font-size: 0.35rem;
  }

  .contract-no {
    color: #969696;
    font-size: 0.22rem;
  }

  .contract-amount {
    font-size: 30px;
    margin-left: 16px;
    color: #ff0000;
  }

</style>
