<template>
  <div class="bg">
    <header class="header" @click="onUseInfo">
      <img class="logo" src="../../assets/ic_launcher.jpg" />
      <span class="name">请登录</span>
    </header>
    <p>姐姐哈哈哈将军金甲夜不脱</p>
    <ul class="gridBox">
      <li class="item" @click="toPage(grid.gridPage)"  v-for="(grid,index) in gridList" :key='index'>
        <img class="img" :src="grid.src" alt="">
        <span class="text" :class="{'activeGuid':activeGuid==grid.gridPage}">{{grid.title}}</span></li>
      <!-- <li class="item" @click="toPage(2)">
        <img class="img" src="static/assets/icon_recomment.png" alt="">
        <span class="text" :class="{'activeGuid':activeGuid==2}">还款测算</span></li>
      <li class="item" @click="toPage(3)">
        <img class="img" src="static/assets/icon_progress.png" alt="">
        <span class="text" :class="{'activeGuid':activeGuid==3}">台账管理</span></li>
      <li class="item" @click="toPage(4)">
        <img class="img" src="static/assets/icon_pay.png" alt="">
        <span class="text" :class="{'activeGuid':activeGuid==4}">融资进度</span></li> -->
    </ul>

    <ul class="cellBox" >
      <li class="cell" @click="toPage(cell.toKey)" v-for="cell in cellList"  :key='cell.toKey'>
        <img  :src="cell.src" >
        <span > {{cell.title}}</span>
      </li>
      <!-- <li class="cell" @click="toPage('authenticateId')">
        <img  src="static/assets/logo.png" >
        <span > 身份认证</span>
      </li>

      <li class="cell" @click="toPage('htcx')">
        <img  src="static/assets/logo.png" >
        <span > 合同查询</span>
      </li>

      <li class="cell" @click="toPage('zcxx')">
        <img  src="static/assets/logo.png" >
        <span > 资产信息列表查询</span>
      </li>

      <li class="cell" @click="toPage('zbl')">
        <img  src="static/assets/logo.png" >
        <span > 再保理信息列表查询</span>
      </li>

      <li class="cell" @click="toPage('setting')">
        <img  src="static/assets/logo.png" >
        <span > 设置</span>
      </li>

      <li class="cell" @click="toPage('about')">
        <img  src="static/assets/logo.png" >
        <span > 关于我们</span>
      </li> -->
    </ul>
  </div>
</template>

<script>
  export default {
    components: {},
    data() {
      return {
          gridList:[
            {
                gridPage : 2,
                src : require('../../assets/iv_repayment_icon.png'),
                title : "还款测算"
            },
            {
                gridPage : 3,
                src : require('../../assets/iv_parameter_icon.png'),
                title : "台账管理"
            },
            {
                gridPage : 4,
                src : require('../../assets/iv_financing_progress.png'),
                title : "融资进度"
            }
          ],
          cellList:[
             {
                toKey : 'authenticateId',
                src : require('../../assets/iv_shenfenrenzheng.png'),
                title : '身份认证'
             },
             {
                toKey : 'htcx',
                src : require('../../assets/iv_contract_search_icon.png'),
                title : '合同查询'
             },
             {
                toKey : 'zcxx',
                src : require('../../assets/iv_assets_icon.png'),
                title : '资产信息列表查询'
             },
             {
                toKey : 'zbl',
                src : require('../../assets/iv_refactors_icon.png'),
                title : '再保理信息列表查询'
             },
             {
                toKey : 'setting',
                src : require('../../assets/iv_setting_icon.png'),
                title : '设置'
             },
             {
                toKey : 'about',
                src : require('../../assets/iv_about_icon.png'),
                title : '关于我们'
             }
          ]
      };
    },
    computed: {

    },
    methods: {
      onUseInfo() {
        this.$router.push({
          path: this.$RM.LoginPage
        })
      },
      toPage(msg) {
        if ('authenticateId' == msg) {
          this.$router.push({
            path: this.$RM.AuthenticateId
          })
        }
        if ('setting' == msg) {
          this.$router.push({
            path: this.$RM.SettingPage
          })
        }

        if ('htcx' == msg) {
          this.$router.push({
            path: this.$RM.ContractPage
          })
        }
        if ('about' == msg) {
          this.$router.push({
            path: this.$RM.AboutPage
          })
        }
        if ('zcxx' == msg) {
          this.$router.push({
            path: this.$RM.BrokerProgress
          })
        }
        if ('zbl' == msg) {
          this.$router.push({
            path: this.$RM.RefactoringProgress
          })
        }       
        if ('4' == msg) {
          this.$router.push({
            path: this.$RM.FinancingProgress
          })
        }

        if ('2' == msg) {
          this.$router.push({
            path: this.$RM.CalculateList
          })
        }
        if ('3' == msg) {
          this.$router.push({
            path: this.$RM.LedgerList
          })
        }


      }
    }
  }
</script>


<style scoped>
  /* .bg {
    background-color: #fafafa;

  } */

  .header {
    display: flex;
    flex-direction: column;
    height: 320px;
    justify-content: center;
    align-items: center;
    background-color: #FFC600;

  }

  .logo {
    background-color: #fafafa;
    border-radius: 60px;
    border: 2px;
    border-color: #ffffff;
    height: 150px;
    width: 150px;
  }

  .name {
    margin-top: 20px;
    color: white;
    font-size: 32px;
  }

  .gridBox {
    width: 100%;
    height: 200px;
    display: flex;
    background-color: #ffffff;
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

  .cellBox {
    width: 100%;
    margin-top: 20px;
    padding: 0 0px;

    box-sizing: border-box;
  }

  .cellBox .cell {
    padding-left: 32px;
    padding-right: 32px;
    display: flex;
    align-items: center;
    height: 120px;
    line-height: 120px;
    background-color: #ffffff;
    margin-bottom: 3px;
  }

 .cellBox .cell img {
  width: 40px;
  height: 40px;
  margin-right: 10px;
}
  .cellBox .cell span {
    font-size: 34px;
    color: #4F4F55;
  }


</style>
