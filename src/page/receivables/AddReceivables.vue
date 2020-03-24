<template>
  <div>
    <ToolBar page_title="新增应收账款" :isWhile="false"> </ToolBar>

    <div class="content">
      <!--付款人（买方）姓名-->
      <div class='top'>
        <span class='inputLable'>付款人（买方）姓名</span>
        <input class='inputVal' type="text" ref="rDraweeName" v-model="vDraweeName" placeholder="请输入姓名" />
        <img class='clearCss' v-show="false" @click="clear('vDraweeName')" src="/static/assets/clear.png" />
      </div>
      <!--横线-->
      <Divider></Divider>


      <!--合同金额-->
      <div class='top'>
        <span class='inputLable'>合同金额</span>
        <input class='inputVal' type="text" ref="rContractAmt" v-model="vContractAmt" placeholder="请输入合同金额" />
        <img class='clearCss' v-show="false" @click="clear('vContractAmt')" src="/static/assets/clear.png" />
      </div>
      <!--横线-->
      <Divider></Divider>

      <!--购销合同号-->
      <div class='top'>
        <span class='inputLable'>购销合同号</span>
        <input class='inputVal' type="text" ref="rTradeContractNo" v-model="vTradeContractNo" placeholder="请输入购销合同号" />
        <img class='clearCss' v-show="false" @click="clear('vTradeContractNo')" src="/static/assets/clear.png" />
      </div>
      <!--横线-->
      <Divider></Divider>


      <!--已付款金额-->
      <div class='top'>
        <span class='inputLable'>已付款金额</span>
        <input class='inputVal' type="text" ref="rPaidAmt" v-model="vPaidAmt" placeholder="请输入已付款金额" />
        <img class='clearCss' v-show="false" @click="clear('vPaidAmt')" src="/static/assets/clear.png" />
      </div>
      <!--横线-->
      <Divider></Divider>

      <!--发票号-->
      <div class='top'>
        <span class='inputLable'>发票号</span>
        <input class='inputVal' type="text" ref="rInvoiceNo" v-model="vInvoiceNo" placeholder="请输入发票号" />
        <img class='clearCss' v-show="false" @click="clear('vInvoiceNo')" src="/static/assets/clear.png" />
      </div>
      <!--横线-->
      <Divider></Divider>

      <!--佣金及折让金额-->
      <div class='top'>
        <span class='inputLable'>佣金及折让金额</span>
        <input class='inputVal' type="text" ref="vAllowanceAmt" v-model="vAllowanceAmt" placeholder="请输入佣金及折让金额" />
        <img class='clearCss' v-show="false" @click="clear('vAllowanceAmt')" src="/static/assets/clear.png" />
      </div>
      <!--横线-->
      <Divider></Divider>


      <!--应收账款金额-->
      <div class='top'>
        <span class='inputLable'>应收账款金额</span>
        <input class='inputVal' type="text" ref="rAcctAmt" v-model="vAcctAmt" placeholder="请输入应收账款金额" />
        <img class='clearCss' v-show="false" @click="clear('vAcctAmt')" src="/static/assets/clear.png" />
      </div>
      <!--横线-->
      <Divider></Divider>

      <!--应收账款余额-->
      <div class='top'>
        <span class='inputLable'>应收账款余额</span>
        <input class='inputVal' type="text" ref="rAcctBal" v-model="vAcctBal" placeholder="请输入应收账款余额" />
        <img class='clearCss' v-show="false" @click="clear('vAcctBal')" src="/static/assets/clear.png" />
      </div>
      <!--横线-->
      <Divider></Divider>

      <!--预付款金额-->
      <div class='top'>
        <span class='inputLable'>预付款金额</span>
        <input class='inputVal' type="text" ref="rAdvanceAmt" v-model="vAdvanceAmt" placeholder="请输入预付款金额" />
        <img class='clearCss' v-show="false" @click="clear('vAdvanceAmt')" src="/static/assets/clear.png" />
      </div>
      <!--横线-->
      <Divider></Divider>

      <!--付款账号-->
      <div class='top'>
        <span class='inputLable'>付款账号</span>
        <input class='inputVal' type="text" ref="rPaymentAcctNo" v-model="vPaymentAcctNo" placeholder="付款账号" />
        <img class='clearCss' v-show="false" @click="clear('vPaymentAcctNo')" src="/static/assets/clear.png" />
      </div>
      <!--横线-->
      <Divider></Divider>

      <!--合同付款方式-->
      <div class='top'>
        <span class='common'>合同付款方式</span>
        <van-dropdown-menu active-color="#FFC600" class="dropdown">
          <van-dropdown-item v-model="vContractPayType" :options="contractPayTypeOpt" />
        </van-dropdown-menu>
      </div>
      <!--横线-->
      <Divider></Divider>


      <!--付款到期日期-->
      <div class='top'>
        <span class='common' >付款到期日期  </span>
        <span  class='inputVal' @click="show1 = true" >{{date1}}</span>
           <van-calendar v-model="show1" @confirm="onConfirm1"  :show-confirm="false"/>
      </div>
      <!--横线-->
      <Divider></Divider>

      <!--应收账款付款日期-->
      <div class='top'>
        <span class='common' >应收账款付款日期  </span>
        <span  class='inputVal' @click="show2 = true" >{{date2}}</span>
           <van-calendar v-model="show2" @confirm="onConfirm2"  :show-confirm="false"/>
      </div>
      <!--横线-->
      <Divider></Divider>

      <!--凭证状态-->
      <div class='top'>
        <span class='common'>凭证状态</span>
        <van-dropdown-menu active-color="#FFC600" class="dropdown">
          <van-dropdown-item v-model="authType" :options="option1" />
        </van-dropdown-menu>
      </div>
      <!--横线-->
      <Divider></Divider>

      <!--备注-->
      <div class='top'>
        <span class='inputLable'>备注</span>
        <textarea  class='inputVal' name="" id="" cols="32" rows="4" ref="rRemark" v-model="vRemark" placeholder="请输入备注" ></textarea>
        <img class='clearCss' v-show="false" @click="clear('amount')" src="/static/assets/clear.png" />
      </div>
      <!--横线-->
      <Divider></Divider>

      <!-- 引入组件 -->
      <new-affix :itemShow='true' :optDate='dataTypeOpt' :dataFileList='dataFileList'></new-affix>

      <LoginButton name="提交" :isInputNonEmpty="enable" @click.native="submit" borderRadius="6px"></LoginButton>
    </div>
  </div>
</template>

<script>
  import ToolBar from '@/components/ToolBar2.vue'
  import Divider from '@/components/Divider.vue'
  import LoginButton from '@/components/LoginButton.vue'
  //import PopCont from './AddReceivablesPop'
  import NewAffix from '../components/new-affix'

  export default {
    name: "identity",
    components: {
      ToolBar,
      Divider,
      LoginButton,
      NewAffix
    },
    computed: {},


    data() {
      return {
        nonet: false, //断网
        enable: true, //立即注册 按钮默认不可用
        companyName: "", //客户企业名称
        authType: 0, // 认证类型
        companyType: 0, // 企业证件类型
        option1: [{
            text: '个人客户',
            value: 0
          },
          {
            text: '企业客户',
            value: 1
          }
        ],
        option2: [{
            text: '企业证件类型1',
            value: 0
          },
          {
            text: '企业证件类型2',
            value: 1
          },
          {
            text: '企业证件类型3',
            value: 2
          }
        ],
        option3: [{
            text: '身份证',
            value: 0
          },
          {
            text: '企业证件类型2',
            value: 1
          },
          {
            text: '企业证件类型3',
            value: 2
          }
        ],
        date1: '请选择',
        date2: '请选择',
        show1: false,
        show2:false,
        show: false,//测试时为true
        popShow : true ,
        fileList: [],
        vContractPayType:"01",//合同付款方式
        contractPayTypeOpt:[
            {
              text: '现金支付',
              value: "01"
            },
            {
              text: '票据支付',
              value: "02"
            },
            {
              text: '电汇支付',
              value: "03"
            }
        ],
        //vDataType : "",//资料类型
        dataTypeOpt:[
          {
            text: '合同',
            value: "01"
          },
          {
            text: '发票',
            value: "02"
          },
          {
            text: '出库单',
            value: "03"
          },
          {
            text: '货运单',
            value: "04"
          },
          {
            text: '提货单',
            value: "05"
          },
          {
            text: '仓单',
            value: "06"
          },
          {
            text: '质检单',
            value: "07"
          },
          {
            text: '中登网查询证明',
            value: "08"
          },
          {
            text: '中登网登记证明',
            value: "09"
          }
        ],
        // vFileDesc:"",
        // vFileName:"",



      }
    },
    created(){
        this.vDataType = this.dataTypeOpt[0].value;
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
      onConfirm1(date) {
        this.show1 = false;
        this.date1 = this.formatDate(date);

      },
      onConfirm2(date) {
        this.show2 = false;
        this.date2 = this.formatDate(date);

      },
      //上传
      submit(){

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
  .affix-lib {
    display: flex;
    align-items: center;
    justify-content: center;
     flex-direction: row;
    margin-left: 32px;
    margin-right: 32px;
    font-size: 30px;
    padding-bottom: 10px;
  }

  .affix-type {
      width: 30%;
  }

  .affix-name {
  width: 40%;
  }

  .affix-remark {
  width: 30%;
  }

  /* 弹窗样式 */
  .pop-content{
    width: 80%;
  }
  .pop-select{
    outline:none;
    /* -webkit-appearance:none; */
    -webkit-tap-highlight-color:rgba(255,0,0,0);
    border: none;
    text-align: right;
    text-align-last: right;
    background: transparent;
  }
  /* .pop-select option{    
    text-align: right;
    text-align-last: right;
  } */
  .file{
     text-align: center;
     padding: 30px;
     position: relative;
  }
  .file-button{
      /* width: 120px;
      height: 60px; */
      color: #fff;
    background-color: #5cb85c;
    border-color: #4cae4c;
    padding: 10px 40px;
    border-radius: 3px;
  }
  .file input{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
  }
</style>
