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
          <ul v-infinite-scroll="loadMore" infinite-scroll-disabled="false" infinite-scroll-distance="10">
            <li v-for="a in 100" :key='a'>
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
        </mt-tab-container-item>

        <mt-tab-container-item id="2">
          <ul v-infinite-scroll="loadMore" infinite-scroll-disabled="false" infinite-scroll-distance="10">
            <li v-for="b in 60" :key='b'>
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
        listA: ['aA', 'bA', 'cA'],
        listB: ['aB', 'bB', 'cB'],
        listC: ['aC', 'bC', 'cC'],
        selected: "1",
        waitData: [{
          'name': '',
          'no': 'BLC0002',
          'type': '已签约',
          'date': '2019-11-21'
        }]

      }
    },
    methods: {
      loadMore() {
        this.loading = true;
        setTimeout(() => {
          let last = this.list[this.list.length - 1];
          for (let i = 1; i <= 10; i++) {
            this.list.push(last + i);
          }
          this.loading = false;
        }, 2500);
      }
    }
  }
</script>

<style scoped>
  .bg {
    background-color: #fafafa;
  }

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
