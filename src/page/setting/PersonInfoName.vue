<template>
  <div>
    <ToolBar page_title="修改姓名" :isWhile="false"></ToolBar>

    <div class="content">
        <van-cell-group>
           <van-field label="姓名" v-model="value" placeholder="请输入用户名" />
        </van-cell-group>    
    </div>


  </div>
</template>

<script>
  import ToolBar from '@/components/ToolBar2.vue'
  export default {

    components: {
      ToolBar
    },
    computed: {},
    data() {
      return {
        nonet: false, //断网
        src: 'https://img.yzcdn.cn/vant/cat.jpeg',
        fileList: [
          //{ url: 'https://img.yzcdn.cn/vant/leaf.jpg' ,isImage: true }          
        ],
        showUpdata : false,
        showChangeName : false,
      }
    },
    mounted(){

    },
    methods: {
      //校验校验手机号码
      checkContactPhone () {
          if (!this.$utils.checkPhone(this.vContactPhoneNo)) {
               this.$toast(this.$ERRCODE.STATIC_ERRORCDDE.RTN_201018);
          }   
      },
      handleFile() {
            const file = this.$refs.inputImg.files[0];
            // createObjectURL传入File类型的数据创建url，可以在浏览器看到网络请求
            const ObjectURL = URL.createObjectURL(file);
            const rimg = this.$refs.img;
            rimg.src = ObjectURL;
            rimg.onload = function(img) {
                URL.revokeObjectURL(this.src);  // 释放createObjectURL创建的对象##
            }
      },
      changeName(){
        this.showChangeName = true;
      }




      

    },
 

  }
</script>

<style scoped>
.content {
  margin-top: 100px;
  position: relative;
  padding-bottom: 30px;
}
.van-cell__left-icon, .van-cell__right-icon{
  line-height:3 ;
}
  
/* .hide-updata{
  position: relative;
  margin-top: -130px;
  background: transparent;
}
.van-uploader__wrapper{
  position: relative;
}
.van-uploader__upload{
  position: absolute;
  left: 0;
  top: 0;

}
.van-uploader__input{

} */

</style>
