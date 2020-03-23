<template>
  <div>
    <ToolBar page_title="融资申请" :isWhile="false"> </ToolBar>

    <div class="content">
      <div class="item">
        <div class=" item-line1 aic">
            <span class="contract-name flex1">{{projectName}}</span>
            <span class="contract-no flex1">{{projectNo}}</span>
        </div>

        <div class="item-line2">
          <div class="item-line2-div">
            <div class="item-box-dev">
              <span class="item-title">可用额度</span>
            </div>
            <span class="item-title2">{{creditLimitAmt}}</span>
          </div>

          <div class="item-line2-div">
            <div class="item-box-dev">
              <span class="item-title">剩余额度</span>
            </div>
            <span class="item-title3">{{creditlimitBal}}</span>
          </div>
        </div>
      </div>

      <!--本次融资申请金额-->
      <div class='top'>
        <span class='inputLable'>本次融资申请金额</span>
        <input class='inputVal' type="text" ref="rApplyAmt" v-model="vApplyAmt" placeholder="请输入融资金额" />
        <img class='clearCss' v-show="false" @click="clear('vApplyAmt')" src="/static/assets/clear.png" />
      </div>
      <!--横线-->
      <Divider></Divider>

      <!--融资比例-->
      <div class='top'>
        <span class='inputLable'>融资比例(%)</span>
        <input class='inputVal' type="text" ref="rPercentage" v-model="vPercentage" placeholder="请输入融资比例" />
        <img class='clearCss' v-show="false" @click="clear('vPercentage')" src="/static/assets/clear.png" />
      </div>
      <!--横线-->
      <Divider></Divider>

      <!--初始保证金金额-->
      <div class='top'>
        <span class='inputLable'>初始保证金金额</span>
        <input class='inputVal' type="text" ref="rBondAmt" v-model="vBondAmt" placeholder="请输入初始保证金金额" />
        <img class='clearCss' v-show="false" @click="clear('vBondAmt')" src="/static/assets/clear.png" />
      </div>
      <!--横线-->
      <Divider></Divider>

      <!--放款账号-->
      <div class='top'>
        <span class='inputLable'>放款账号</span>
        <input class='inputVal' type="text" ref="rPaymentAcctNo" v-model="vPaymentAcctNo" placeholder="请输入放款账号" />
        <img class='clearCss' v-show="false" @click="clear('vPaymentAcctNo')" src="/static/assets/clear.png" />
      </div>
      <!--横线-->
      <Divider></Divider>

      <!--回款账号-->
      <div class='top'>
        <span class='inputLable'>回款账号</span>
        <input class='inputVal' type="text" ref="rBackAcctNo" v-model="vBackAcctNo" placeholder="请输入回款账号" />
        <img class='clearCss' v-show="false" @click="clear('vBackAcctNo')" src="/static/assets/clear.png" />
      </div>
      <!--横线-->
      <Divider></Divider>

      <!--融资期限-->
      <div class='top'>
        <span class='inputLable'>融资期限（天）</span>
        <input class='inputVal' type="text" ref="rLoanTerm" v-model="vLoanTerm" placeholder="请输入回款账号" />
        <img class='clearCss' v-show="false" @click="clear('vLoanTerm')" src="/static/assets/clear.png" />
      </div>
      <!--横线-->
      <Divider></Divider>

      <!--申请日期-->
      <div class='top'>
        <span class='common' >申请日期  </span>
        <span  class='inputVal' @click="show = true" ref="rApplyDate" >{{applyDate}}</span>
           <van-calendar v-model="show" @confirm="onConfirm"  :show-confirm="false"/>
      </div>
      <!--横线-->
      <Divider></Divider>

      <div class='top'>
        <span class='common'>保理类型</span>
        <van-dropdown-menu active-color="#FFC600" class="dropdown">
          <van-dropdown-item v-model="type" :options="typeOpt" />
        </van-dropdown-menu>
      </div>
      <!--横线-->
      <Divider></Divider>

      <div class='top'>
        <span class='common'>保理模型</span>
        <van-dropdown-menu active-color="#FFC600" class="dropdown">
          <van-dropdown-item v-model="factoringProdType" :options="factoringProdTypeOpt" />
        </van-dropdown-menu>
      </div>
      <!--横线-->
      <Divider></Divider>

      <div class='top'>
        <span class='common'>应收账款清单</span>
        <img class="add-img" src="static/assets/icon_add.png" @click="addReceives()"/>
      </div>
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


      <LoginButton name="提交" :isInputNonEmpty="enable" @click.native="toNext" borderRadius="6px"></LoginButton>
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
        enable: true, //按钮默认不可用

        type: "01", // 认证类型
        factoringProdType: "01", // 企业证件类型
        typeOpt: [
          {
            text: '定保理',
            value: "01"
          },
          {
            text: '池保理',
            value: "02"
          },
          {
            text: '票据保理',
            value: "03"
          }
        ],
        factoringProdTypeOpt: [
          {
            text: '正向保理',
            value: "01"
          },
          {
            text: '反向保理',
            value: "02"
          }

        ],
        applyDate: '请选择',
        show: false,

        //url数据
        projectName : "",
        projectNo : "",
        creditLimitAmt : "",
        creditlimitBal : "",
        type : ""

      }
    },
    mounted(){
        const routeData = this.$route.query;
        this.projectName = routeData.projectName;
        this.projectNo = routeData.projectNo;
        this.creditLimitAmt = routeData.creditLimitAmt;
        this.creditlimitBal = routeData.creditlimitBal;
        //this.type = routeData.projectType;
        //console.log(this.type)
    },
    methods: {
      //清除输入框数据
      clear(str) {
        // 客户企业名称
        if (str == 'companyName') {
          this.companyName = '';
        }

      },
      formatDate(date) {
        return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`;
      },
      onConfirm(applyDate) {
        this.show = false;
        this.applyDate = this.formatDate(applyDate);

      },
      addReceives(){
        this.$router.push({
          path: this.$RM.AddReceivables
        }) //
      },





    }

  }
</script>

<style scoped>
  .content {
    margin-top: 100px;
    position: relative;
    padding-bottom: 30px;
  }

  .item {
    padding: 16px;
    background-color: #FFC600;
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

  .item-title {
    font-size: 34px;
    color: #ffffff;

  }

  .item-title2 {
    font-size: 35px;
    color: #ffffff;
  }

  .item-title3 {
    font-size: 35px;
    color: #ffffff;
  }

  .contract-name {
    color: #ffffff;
    font-weight: bolder;
    margin-left: 30px;
    font-size: 42px;
  }

  .contract-no {
    color: #ffffff;
    font-size: 28px;
    word-break: break-all;
  }

  .contract-amount {
    font-size: 30px;
    margin-left: 16px;
    color: #ffffff;
  }

  .top {
    display: flex;
    flex-direction: row;
    margin-left: 32px;
    margin-right: 32px;
    justify-content: space-between;
    /*background-color:burlywood;*/
    position: relative;
  }

  .dropdown {
    padding: 35px 0 20px;
  }



  .number {
    position: absolute;
    right: 0;
  }

  .inputLable {
    font-size: 0.4rem;
    line-height: 45px;
    border: none;
    padding: 35px 0 20px;
  }

  .inputVal {
    font-size: 0.4rem;
    line-height: 45px;
    border: none;
    padding: 35px 0 20px;
    text-align: right;
  }

  .common {
    font-size: 0.4rem;
    line-height: 45px;
    border: none;
    padding: 35px 0 20px;
  }

  .clearCss {
    width: 21px;
    height: 21px;
    /*margin: 68px 30px 30px;*/
    position: absolute;
    right: 0px;
    top: 48px;
  }
  .add-img {
    width: 50px;
    height: 50px;
    margin-top: 30px;
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
  
  .flex1{
    flex: 1;
  }
  
  .aic{
    align-items: center;
  }


</style>
