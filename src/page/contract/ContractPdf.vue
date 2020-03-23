<template>
  <div class="bg por">

    <ToolBar page_title="合同管理详情" :isWhile="false" ></ToolBar>
    <div class="content">
      <pdf
          :src="src" 
          v-for="item in numPages" :key="item"  :page="item"  
      ></pdf>

    </div>
    <div class="btn-cont" v-show="showSign">
        <a class="btn btnEnable" href="javascript:void(0);" @click="signOnline">在线签约</a>
    </div>
  </div>
</template>

<script>
  import ToolBar from '@/components/ToolBar2.vue'
  import pdf from 'vue-pdf'
  export default {
    components: {
      ToolBar,
      pdf
    },
    data() {
      return {
         numPages: "",
  　　　　src: 'http://file.dakawengu.com/file/2018-05-29/20180527-tianfeng.pdf', 
         showSign :true
      
      }
    },
    created() {  
        this.queryContractPdf();

        this.src = pdf.createLoadingTask(this.src);
        this.loadPdfHandler(); 
          
    },
    methods: {
      //获取详情---待处理，后台返回的数据格式有误
      queryContractPdf() {
          this.tab = this.$route.query.tab;
          this.pdfId = this.$route.query.pdfId;
          // if(this.tab == "00"){
          //     this.showSign = true
          // }else{
          //     this.showSign = false
          // }
          this.showSign = this.tab == "0" ? true : false ;
          console.log(this.tab)
          console.log(this.showSign)
          const url = this.$api.ROOT + this.$Constants.QUERY_FINANCING_DETAIL;
          this.$http.post(url,{"applyNo": this.pdfId})
              .then(function (res) {
                  const data = JSON.parse(res.data);
                  this.resData = JSON.parse(data);                     
              })
              .catch(function () {
                  this.$toast(this.$ERRCODE.STATIC_ERRORCDDE.EXCEPTION);
              });
      },
      loadPdfHandler() {
            this.src.then(pdf => {this.numPages = pdf.numPages;});
      },
      signOnline(){
           //在线签约
           console.log('在线签约')
      }


    },


  }
</script>

<style scoped>
 .content{
   margin-top:95px ;
   margin: 95px 0 110px 0;
 }
 .por{
   position: relative;
 }
 .btn-cont{
    position: fixed;
    left: 0;
    bottom: 0;
    display: flex;
    width: 100%;
    padding: 20px 40px;
    box-sizing: border-box;
    background: #fff;
 }
 .btn{
    padding: 23px;
    border-radius: 100px;
    width: 100%;
    text-align: center;
    font-size: 30px;
    color: #fff1e8;
 }
 .btnEnable {
    background-color: rgba(255, 198, 0, 1);
    text-shadow: 0 0.01333rem 0 #ff6400;
}
</style>
