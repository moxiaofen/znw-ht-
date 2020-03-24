<template>
<div>
  <ToolBar page_title="身份认证" :isWhile="false"> </ToolBar>

  <div class="content" >

    <div class='top'>
      <span class='common'>认证类型</span>
      <van-dropdown-menu active-color="#FFC600" class="dropdown" >
        <van-dropdown-item v-model="vAuthType" :options="authTypeOpt" @change="authTypeChange"/>
      </van-dropdown-menu>
    </div>
    <!--横线-->
    <Divider></Divider>

    <p class="cont-item">基本信息</p>

    <!--与顶部保持距离-->
    <div class='top' v-if="cust">
      <span class='inputLable'>客户企业名称</span>
      <input  class='inputVal' type="text" ref="rCustName" v-model="vCustName"
              placeholder="请输入客户企业名称"/>
      <img class='clearCss' v-show="vCustName" @click="clear('vCustName')" src="/static/assets/clear.png"/>
    </div>
    <!--横线-->
    <Divider></Divider>

    <div class='top' v-if="cust">
      <span class='common'>企业证件类型</span>
      <van-dropdown-menu active-color="#FFC600" class="dropdown">
        <van-dropdown-item v-model="vCustIdType" :options="custIdTypeOpt" />
      </van-dropdown-menu>
    </div>
    <!--横线-->
    <Divider></Divider>

    <!--与顶部保持距离-->
    <div class='top' v-if="cust">
      <span class='inputLable'>企业证件号码</span>
      <input  class='common inputVal' type="text" ref="rCustIdNo" v-model="vCustIdNo"
              placeholder="请输入企业证件号码" @change="checkCustIdNo('vCustIdNo')" />
      <img class='clearCss' v-show="vCustIdNo" @click="clear('vCustIdNo')" src="/static/assets/clear.png"/>
    </div>
    <!--横线-->
    <Divider></Divider>
    <!--与顶部保持距离-->
    <div class='top'>
      <span class='inputLable'>姓名</span>
      <input  class='inputVal' type="text" ref="rName" v-model="vName"
              placeholder="请输入姓名"/>
      <img class='clearCss' v-show="vName" @click="clear('vName')" src="/static/assets/clear.png"/>
    </div>
    <!--横线-->
    <Divider></Divider>
   
    <div class='top'>
      <van-dropdown-menu active-color="#FFC600" class="dropdownId">
        <van-dropdown-item v-model="vIdType" :options="idTypeOpt" />
      </van-dropdown-menu>
      <input  class='inputVal' type="text" ref="rIdNo" v-model="vIdNo"
              placeholder="请输入对应的证件号码" @change="checkIdNo('vIdNo')"/>
      <img class='clearCss' v-show="vIdNo" @click="clear('vIdNo')" src="/static/assets/clear.png"/>
    </div>
    <!--横线-->
    <Divider></Divider>

    <!--与顶部保持距离-->
    <div class='top'>
      <span class='inputLable'>手机号</span>
      <input  class='inputVal' type="tel" ref="rTel" v-model="vTel"
              placeholder="请输入手机号" @change="checkPhone('vTel')"/>
      <img class='clearCss' v-show="vTel" @click="clear('vTel')" src="/static/assets/clear.png"/>
    </div>
    <!--横线-->
    <Divider></Divider>
    <!--与顶部保持距离-->
    <div class='top'  v-if="!cust">
      <span class='inputLable'>邮箱</span>
      <input  class='inputVal' type="email" ref="rEmail" v-model="vEmail"
              placeholder="请输入邮箱" @change="checkEmail"/>
      <img class='clearCss' v-show="vEmail" @click="clear('vEmail')" src="/static/assets/clear.png"/>
    </div>
    <!--横线-->
    <Divider></Divider>

    <!--与顶部保持距离-->
    <div class='top' v-if="!cust">
      <span class='inputLable'>银行卡账号</span>
      <input  class='inputVal' type="text" ref="rBankCardNo" v-model="vBankCardNo"
              placeholder="请输入银行卡账号"  @change="checkBankCardNo"/>
      <img class='clearCss' v-show="vBankCardNo" @click="clear('vBankCardNo')" src="/static/assets/clear.png"/>
    </div>
    <!--横线-->
    <Divider></Divider>
    <!--与顶部保持距离-->
    <div class='top' v-if="!cust">
      <span class='inputLable'>办卡时的手机号</span>
      <input  class='inputVal' type="text" ref="rBankCardPhone" v-model="vBankCardPhone"
              placeholder="请输入办卡时的手机号" @change="checkPhone('vBankCardPhone')"/>
      <img class='clearCss' v-show="vBankCardPhone" @click="clear('vBankCardPhone')" src="/static/assets/clear.png"/>
    </div>
    <!--横线-->
    <Divider></Divider>

    <div class='cont-sides'>
        <p class="cont-item">附件信息      
        </p>
        <img  v-if="cust" class="add-img" src="static/assets/icon_add.png"  @click="showPopup"/>
    </div>


    <ul class="photoBox"  v-if="!cust">
      <li class="item photo-item">
        <img class="img-photo" ref='img1' alt="handleFile" :src="src1" />
        <input type="file" accept="image/*" class="img-input" ref="inputImg1" @change="handleFileId('inputImg1')">
        <p>身份证正面</p>
      </li>
      <li class="item photo-item">
        <img class="img-photo" ref='img2' alt="handleFile" :src="src2" />
        <input type="file" accept="image/*" class="img-input" ref="inputImg2" @change="handleFileId('inputImg2')">
        <p>身份证反面</p>
      </li>
    </ul>
    <!-- 免责说明 -->
    <Divider></Divider>
    <!-- 客户认证上传数据列表 -->
    <div v-if="cust">
      <div class="affix-lib">
        <div class="affix-type">
           <span >资料类型</span>
        </div>

        <div class="affix-name">
         <span >附件名称</span>
        </div>

        <div class="affix-remark">
            <span >备注</span>
        </div>
      </div>
      <div v-for="(item,index) in dataFileListCust" :key="index">
          <div class="affix-lib por">
            <div class="affix-type">
              <span >{{formatDataType(item.dataType)}}</span>
            </div>
            <div class="affix-name">
            <span >{{item.fileName}}</span>
            </div>

            <div class="affix-remark">
                <span >{{item.fileDesc}}</span>
            </div>
            <img class='clear-file' @click="clearFile(index)" src="/static/assets/gray-del.png"/>
          </div>
      </div>

    </div>

      <Divider></Divider>

    <!-- 弹窗 -->
    <van-popup v-model="show" bind:close="onClose" class="pop-content">
        <!--资料类型-->
        <div class='top'>
          <span class='common'>资料类型</span>
          <select name="" id="" v-model="vDataType" class="pop-select" @change="getSelected">
              <option v-for="(item,index) in dataTypeOpt" :value="item.value" :key="index">{{item.text}}</option>
          </select>
        </div>
        <!--横线-->
        <Divider></Divider>
        
        <!--说明-->
        <div class='top'>
          <span class='inputLable'>说明(资料要求)</span>
          <input class='inputVal' type="text" ref="rFileDesc" v-model="vFileDesc" placeholder="请输入说明" />
          <img class='clearCss' v-show="vFileDesc" @click="clear('vFileDesc')" src="/static/assets/clear.png" />
        </div>
        <!--横线-->
        <Divider></Divider>

        <!--附件名称回填的附件名称-->
        <div class='top'>
          <span class='inputLable'>附件名称</span>
          <input class='inputVal' type="text" ref="rFileName" v-model="vFileName" placeholder="请输入附件名称" />
          <img class='clearCss' readonly="true" v-show="vFileName" @click="clear('vFileName')" src="/static/assets/clear.png" />
        </div>
        <!--横线-->
        <Divider></Divider> 

        <div class="file">
            <img class="img-photo hide" ref='img' alt="handleFileList" :src="src" />
            <a class="file-button">上传</a>
            <input type="file" multiple class="file-input" ref="inputImg" @change="handleFileCust" >
        </div>

        <div class="file tac">
            <a class="file-button confirm" @click="submitHandleFile">确定</a>
            <a class="file-button cancel" @click="onClose">取消</a>
        </div>

    </van-popup>


    <div class='protocol'>
      <!--导入复选框组件-->
      <Checkbox class="checkbox" @onCheckChange="onCheckChange"></Checkbox>
      <div class='tips'>请阅读并同意<span @click="toProcol" style="color:#FFC600">《免责说明》</span></div>
    </div>
    
    <LoginButton name="提交" :isInputNonEmpty="enable" @click.native="submitId" borderRadius="6px"></LoginButton>

  </div>
</div>
</template>

<script>
  import Checkbox from '@/components/Checkbox'
  import ToolBar from '@/components/ToolBar2.vue'
  import Divider from '@/components/Divider.vue'
  import LoginButton from '@/components/LoginButton.vue'
    export default {
        name: "identity",
        components: {
          Checkbox,
          ToolBar,
          Divider,
          LoginButton
        },
        computed: {},


        data() {
            return {
              nonet: false,//断网
              enable: true,//立即注册 按钮默认不可用
              check: false,//勾选请阅读并同意《免责说明》
              vAuthType: '02',
              authTypeOpt: [
                { text: '个人客户', value: "02" },
                { text: '企业客户', value: "01" }
              ],
              vCustName : '',
              vCustIdType : '01',
              custIdTypeOpt : [
                  { text: '统一社会信用代码', value: "01" },
                  { text: '组织机构代码', value: "02" }
              ],
              vCustIdNo : '',
              vLegalName : '',
              vIdType :'01',
              idTypeOpt : [
                  { text: '身份证', value: "01" },
                  { text: '护照', value: "02" },
                  { text: '港澳通行证', value: "03" }
              ],
              vIdNo : '',
              vTel : '',
              vBankCardNo : '',
              vBankCardPhone :'',
              vEmail :'',
  

              cust : false, //客户认证
              src: 'https://img.yzcdn.cn/vant/cat.jpeg',
              src1: 'https://img.yzcdn.cn/vant/cat.jpeg',
              src2: 'https://img.yzcdn.cn/vant/cat.jpeg',
              //附件参数
              dataFileList:[],

              show: false,//测试时为true

              vDataType : "01",//资料类型
              dataTypeOpt:[
                {
                  text: '营业执照',
                  value: "01"
                },
                {
                  text: '法人身份证明',
                  value: "02"
                },
                {
                  text: '开户许可证',
                  value: "03"
                },
                {
                  text: '护照',
                  value: "04"
                },
                {
                  text: '其他',
                  value: "05"
                }
              ],


              vFileDesc:"",
              vFileName:"",
              src:"",
              dataFileListId:[],
              dataFileListCust:[],




            }
        },
        methods: {
          //跳转到免责说明
          toProcol(){
            console.info("跳转身份认证的免责说明....")
            this.$router.push({path: this.$RM.IdentityProtocol})
          },
          //清除输入框数据
          clear (str) {
            this[str] = ''
          },
          //input校验
          //校验校验手机号码
          checkPhone(tel) {
              // if (!this.$utils.checkPhone(this[tel])) {
              //     this.$toast(this.$ERRCODE.STATIC_ERRORCDDE.RTN_201018);
              // }  
          },
          //校验邮箱
          checkEmail(){           
              // if (!this.$utils.checkEmail(this.vEmail)) {
              //     this.$toast(this.$ERRCODE.STATIC_ERRORCDDE.RTN_201019);
              // }  
          },
          //校验银行卡号
          checkBankCardNo(){           
              // if (!this.$utils.checkBankCardNo(this.vBankCardNo)) {
              //     this.$toast(this.$ERRCODE.STATIC_ERRORCDDE.RTN_201020);
              // }  
          },

          //校验个人证件号码
          checkIdNo(vIdNo){  
              // if(this.vIdType == '01'){
              //    if (!this.$utils.checkIdcard(this[vIdNo])) {
              //       this.$toast(this.$ERRCODE.STATIC_ERRORCDDE.RTN_201021);
              //    } 
              // }else if(this.vIdType == '02'){
              //    if (!this.$utils.checkPassportNo(this[vIdNo])) {
              //       this.$toast(this.$ERRCODE.STATIC_ERRORCDDE.RTN_201022);
              //    } 
              // }else if(this.vIdType == '03'){
              //    if (!this.$utils.checkHKMPassNo(this[vIdNo])) {
              //       this.$toast(this.$ERRCODE.STATIC_ERRORCDDE.RTN_201023);
              //    } 
              // }     
          },
          //校验企业证件号码
          checkCustIdNo(vCustIdNo){  
              // if(this.vCustIdType == '01'){
              //    if (!this.$utils.checkUSCC(this[vCustIdNo])) {
              //       this.$toast(this.$ERRCODE.STATIC_ERRORCDDE.RTN_201024);
              //    } 
              // }else if(this.vCustIdType == '02'){
              //    if (!this.$utils.checkCOC(this[vCustIdNo])) {
              //       this.$toast(this.$ERRCODE.STATIC_ERRORCDDE.RTN_201025);
              //    } 
              // }     
          },

          //选择客户验证或者个人验证
          authTypeChange(value){
              //value值为01，不显示企业认证
              this.cust = value=="02"? false : true;
              console.log(this.cust)
              this.handleFileList ='';
          },
          //上传图片
          handleFileId(e) {
              var file;
              var rimg;
              var dataType;
              if(e=='inputImg1'){
                  file = this.$refs.inputImg1.files[0];
                  rimg =  this.$refs.img1;
                  dataType = "01"
              }else{
                  file = this.$refs.inputImg2.files[0];
                  rimg =  this.$refs.img2;
                  dataType = "02"
              }
              var imgcode ;
              var reader = new FileReader();
              reader.readAsDataURL(file);
              //处理loadend事件，该事件在读取操作结束时触发
              reader.onload = function (e) {
                      rimg.src = e.target.result;                   
              }
             var dataFileId = {
                dataType : dataType ,
                fileName :file.name ,
                fileDesc :'身份证' 
             }
             return dataFileId
          },
          //上传多种文件
          handleFileCust() {
              //console.log()
              const file = this.$refs.inputImg.files[0]
              console.log(file)
              this.vFileName = file.name;
              const rimg = this.$refs.img;
              var reader = new FileReader();
              reader.readAsDataURL(file);
              reader.onload = function (e) {
                      rimg.src = e.target.result;
              }
              var dataFileCust = {
                dataType : this.vDataType ,
                fileName : this.vFileName ,
                fileDesc : this.vFileDesc 
             }
              //获取其他file文件，用new FormData()
            //   this.vFileName = this.$refs.inputImg.files[0].name;
            //   var fd = new FormData();
            //   fd.append('file',this.$refs.inputImg.files[0])

             console.log(dataFileCust)
             return dataFileCust
          },

          //企业认证上传列表确定
          submitHandleFile(){
              //inputfile的base64字符串去掉','前的部分，不然传给后端的数据有误
              const dataFileCust = this.handleFileCust();
              dataFileCust.fileInput = this.$refs.img.src.slice(22);
              this.dataFileListCust.push(dataFileCust);
              console.log(this.dataFileListCust);
              this.show = false;
          },
          //删除企业认证列表
          clearFile(index){
              this.dataFileListCust.splice(index, 1);
          },
          //协议勾选状态判断
          onCheckChange: function (val) {
            this.check = val
            console.info("勾选框的状态>>>" + this.check)
          },
          //提交
          submitId(){
              //console.log('提交')
              //this.getHandleDate()
              if (!this.check) {
                this.$toast(this.$ERRCODE.STATIC_ERRORCDDE.CHECKBOXSTU_REGISTER_ERROR);
                return
              }
              //数据校验
              //if(!this.checkIdNo('vIdNo') &&!this.checkPhone('vTel') &&!this.checkPhone('vBankCardPhone') && !this.checkEmail() && !this.checkBankCardNo() && !this.checkIdNo('vIdNo') && !this.checkCustIdNo('vCustIdNo')){
              // if(!this.checkIdNo('vIdNo') &&!this.checkPhone('vTel') && !this.checkIdNo('vIdNo')){   
              //   this.$toast('数据有误，请检查！');
              //   return 
              // }                 
              this.handleFileList ='';
              if(this.vAuthType == '02' ){
                  //个人验证 bankCardNo bankCardPhone email
                  // if(!this.checkPhone('vBankCardPhone') && !this.checkEmail() && !this.checkBankCardNo()){      
                  //   this.$toast('数据有误，请检查！');
                  //   return 
                  // } 
                  //个人客户验证时的dataFileList
                  //inputfile的base64字符串去掉','前的部分，不然传给后端的数据有误
                  this.dataFileListId[0] = this.handleFileId('inputImg1');
                  this.dataFileListId[0].fileInput = this.$refs.img1.src.slice(22);
                  this.dataFileListId[1] = this.handleFileId('inputImg2');
                  this.dataFileListId[1].fileInput = this.$refs.img1.src.slice(22);
                  this.handleFileList = this.dataFileListId;
              }else{
                  //企业验证custName custIdType custIdNo
                  // if(!this.checkCustIdNo('vCustIdNo')){     
                  //   this.$toast('数据有误，请检查！');
                  //   return 
                  // } 
                  this.handleFileList = this.dataFileListCust ;

              }
              const userId = sessionStorage.getItem('userId')
              console.log(userId)
              const url = this.$api.ROOT +this.$Constants.APP_IDCHECKAPPLY;
              this.$indicator.open("请稍候...");   

              //传过去的数据
              const data = {
                //"userId": userId,
                "userId": '20200318140157004300000000000373',
                "authType":this.vAuthType,
                "custName":this.vCustName,
                "custIdType":this.vCustIdType,
                "custIdNo":this.vCustIdNo,
                "name":this.vName,
                "idType":this.vIdType,
                "idNo":this.vIdNo,
                "tel":this.vTel,
                "bankCardNo":this.vBankCardNo,
                "bankCardPhone":this.vBankCardPhone,    
                "email":this.vEmail,
                "dataFileList" : this.handleFileList             
              }
              console.log(data)
              this.$http.post(url, data)
                .then(function (res) {
                  console.log(res);
                  const resDate = res.data ; 
                  if (resDate.respCode == '000000') {
                    this.$indicator.close();
                    console.info("身份认证成功...");
                    this.$router.go(-1);
                  }
                  else {
                    this.$indicator.close();
                    console.warn("身份认证失败!!!");
                    this.$toast(resDate.respMsg);
                  }
                })
                .catch(function (error) {
                  this.$indicator.close();
                  console.error(error);
                  this.$toast(this.$ERRCODE.STATIC_ERRORCDDE.EXCEPTION);
                });
              console.info('>>>>>>>>>>>>身份认证>>>>end>>>>>>>>')     
          },
          //弹窗
          showPopup() {
            this.show = true;
            this.vFileDesc = '';
            this.vFileName = '';
            this.src = '';
          },
          onClose() {
            this.show = false
          },
          //格式化
          formatDataType(num){
            switch(num) {
                case "01":
                    return "营业执照";
                    break;
                case "02":
                    return "法人身份证明";
                    break;
                case "03":
                    return "开户许可证";
                    break;
                case "04":
                    return "护照";
                    break;
                case "05":
                    return "其他";
                    break;
                default:
                  return ""
            } 
          },
 
        },

    }
</script>

<style scoped>
  .content {
    /* padding: 0 20px; */
    margin-top: 100px;
    position: relative;
  }
  .content input{
    text-align: right;
  }
  .photoBox {
    width: 100%;
    padding:30px 50px;
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
  .photoBox .item span{
    font-size: 0.4rem;
    line-height: 80px;
  }

  .top {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    /*background-color:burlywood;*/
    position: relative;
    padding: 0 32px;
  }



.dropdown{
  position: absolute;
  top: 50px;
  right:32px;
}

  .dropdownId {
    padding: 55px 0 20px;
  }

  .number {
    position: absolute;
    right: 0;
  }

  .inputLable {
    font-size: 0.4rem;
    line-height: 45px;
    border: none;
    padding: 55px 0 20px;
  }
.inputVal{
  font-size: 0.4rem;
  line-height: 45px;
  border: none;
  padding: 55px 0 20px;
  margin-right: 30px;
}
  .common {
    font-size: 0.4rem;
    line-height: 45px;
    border: none;
    padding: 55px 0 20px;
  }

  .clearCss {
    width: 21px;
    height: 21px;
    /*margin: 68px 30px 30px;*/
    position: absolute;
    right: 32px;
    top: 68px;
  }
  .protocol {
    display: flex;
    margin-top: 20px;
    padding-left: 30px;
  }

  .protocol .checkbox {
    width: 30px;
    height: 30px;
    margin-top: -0.05rem;
  }

  .protocol .tips {
    letter-spacing: 2px;
    color: #c9c9c9;
    font-size: 26px;
    line-height: 30px;
    margin-left: 20px;
  }


  .photo-item{
    position: relative;
    flex: 1;
    text-align: center;
  }
  .img-photo{
    width: 240px;
    height: 300px;
  }
  .img-input{
    position: absolute;
    left: 0;
    top:0;
    width: 100%;
    height: 100%;
    opacity: 0;
  }
  .add-img {
    width: 50px;
    height: 50px;
    padding: 20px 30px 18px
  } 
  .cont-sides{
    display: flex;
    -webkit-box-orient: horizontal;
    -webkit-box-direction: normal;
    flex-direction: row;
    -webkit-box-pack: justify;
    -ms-flex-pack: justify;
    justify-content: space-between;
    background-color: #fafafa;
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
     /* text-align: center; */
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
    width: 30%;
    height: 100%;
    opacity: 0;
  }
  .tac{
    text-align: center;
  }
  .confirm{
    background: #fec301;
    margin-right: 20px;
    border: 1px solid #fec301;
  }
  .cancel{
    background-color: #fff;
    margin-left: 20px;
    color: #333;
    border: 1px solid #666;
  }
  .hide{
    display: none;
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

  .por{
    position: relative;
  }
  .clear-file{
    position: absolute;
    top: 0;
    right: 0;
    width: 26px;
    height: auto;


  }

</style>
