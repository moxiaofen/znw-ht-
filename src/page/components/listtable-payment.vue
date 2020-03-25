<template>
    <!-- 列表数据 -->
    <div>
        <ul>
          <li v-for="(item,index) in paymentList" :key='index' @click="toDetail(item.invoiceNo,'finance',item)">
            <div class="receivables-lib">
                <div class=" item-receivables-line1">
                  <div>
                    <span class="receivables-name">{{item.draweeName}}</span>
                    <span class="receivables-no">{{item.tradeContractNo}}</span>
                  </div>
                </div>

                <div class="item-receivables-line2">
                  <span class="receivables-amount">{{item.contractAmt}}</span>
                </div>
                <div class="item-receivables-line3">
                  <span class="receivables-data">{{item.paymentEndDate}}</span>
                </div>
            </div>
          </li>
        </ul>
        <div v-if='tipShow' class="tip">暂无提款信息</div>
    </div>

</template>

<script>
  import Divider from '@/components/Divider.vue'
    export default {
        components: {
          Divider,
        },
        props:['paymentList'],
        computed: {},
        data() {
            return {
              nonet: false,//断网
              enable: true,//立即注册 按钮默认不可用

              tipShow:false,
              paymentList:[],
            }
        },
        mounted(){
          console.log(this.paymentList.length )
            if(this.paymentList.length < 1){
                this.tipShow = true
            }          
        },
        methods: {

                
        
        },

    }
</script>

<style scoped>

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
  .tip{
    color: #666;
    padding: 10px 32px;
  }
 
</style>
