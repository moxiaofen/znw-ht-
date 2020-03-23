<template>
  <div>
    <ToolBar page_title="个人信息" :isWhile="false"> </ToolBar>


    <van-cell-group class="content">
      <van-cell  title="头像">          
           <img style="width:60px;height:60px" ref='img' alt="handleFile" :src="src" />
           <input type="file" accept="image/*" class="van-uploader__input" ref="inputImg" @change="handleFile">
      </van-cell>

      <van-cell title="姓名" is-link>
          <input type="text" placeholder="请输入姓名"   v-model="vname" :readonly="readonlyNameFlag"  class="van-field__control van-field__control--right" @blur="changeName('blur')" @focus="changeName('focus')" >
      </van-cell>    

      <van-cell title="手机" is-link>
          <input type="text" placeholder="请输入手机号" v-model="vphone" :readonly="readonlyPhoneFlag"  class="van-field__control van-field__control--right" @blur="changePhone('blur')" @focus="changePhone('focus')">
      </van-cell>

      <van-cell title="邮箱" is-link value="你还没绑定邮箱"  to="index" />
      <van-cell title="手机" is-link value="13000002111"  to="index" />

    </van-cell-group>

   



      
      <!-- <LoginButton name="提交" :isInputNonEmpty="enable" @click.native="toNext" borderRadius="6px"></LoginButton> -->
  </div>
</template>

<script>
  import ToolBar from '@/components/ToolBar2.vue'
  import Divider from '@/components/Divider.vue'
  import LoginButton from '@/components/LoginButton.vue'
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
        //showChangeName : false,
        showChange : false,
        vname: "张三",
        readonlyNameFlag: true,
        vphone :"13800138000",
        readonlyPhoneFlag : true,
      }
    },
    mounted(){

    },
    methods: {
      //校验校验手机号码
      checkPersonPhone () {
          if (!this.$utils.checkPhone(this.vphone)) {
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

      changeName(type) {      
        if (type == "focus") {
           this.vname = "";
           this.readonlyNameFlag = false;
        } else {  
           this.readonlyNameFlag = true;         
        }    
      },

      changePhone(type) {      
        if (type == "focus") {
           this.vphone = "";
           this.readonlyPhoneFlag = false;
        } else {  
           this.readonlyPhoneFlag = true;  
           this.checkPersonPhone();       
        }    
      },

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
.input-right{
  text-align: right;
  /* border: none; */
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
