<template>
    <div class="login-wrap">
        <div class="ms-title">WFC捐赠页面</div>
        <div class="ms-login">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="0px" class="demo-ruleForm">
                <el-form-item prop="amount">
                    <el-input v-model="ruleForm.amount" placeholder="amount"></el-input>
                </el-form-item>
                <el-form-item prop="address">
                    <el-input v-model="ruleForm.address" placeholder="address"></el-input>
                </el-form-item>
                <el-form-item prop="desc">
                    <el-input v-model="ruleForm.desc" placeholder="desc"></el-input>
                </el-form-item>
                <el-form-item prop="turl">
                    <el-input v-model="ruleForm.turl"></el-input>
                </el-form-item>
                <div class="ret-btn">
                    <el-button type="primary" @click="submitForm('ruleForm')">发起捐赠</el-button>
                </div>
                <div class="bak-btn">
                    <el-button type="primary" @click="backForm('ruleForm')">生成链接</el-button>
                </div>
            </el-form>
        </div>
    </div>
</template>

<script>
    var baseUrl = 'http://localhost:8088/';
    if(process.env.NODE_ENV === 'production'){
       baseUrl='/';
    }
    export default {
        data: function(){
            return {
                ruleForm: {
                    amount: '',
                    address: '',
                    desc: '',
                    turl: ''
                },
                rules: {
                    amount: [
                        { required: true, message: '请输入捐赠金额', trigger: 'blur' }
                    ],
                    address: [
                        { required: true, message: '请输入钱包地址', trigger: 'blur' }
                    ],
                    desc: [
                        { required: true, message: '请输入捐款描述', trigger: 'blur' }
                    ]
                }
            }
        },
        methods: {
            submitForm(formName) {       
                const self = this;
                self.$refs[formName].validate(function(valid){
                    if(valid){
                     console.log('验证成功');
                     let amount=self.ruleForm.amount;
                     let address =self.ruleForm.address;
                     let desc=self.ruleForm.desc;
                     let url='https://wfc.xyblock.net/#/wifiPortal/donate'+'?toAmount='+amount+'&toAddress='+address+'&payTitle='+encodeURI(desc);
                     let vfurl=baseUrl+'checkaddr/'+address;
                   self.$axios.get(vfurl).then((res) => {
                   console.log("GET-"+res.data.code);
	           console.log("GET-"+res.data.uid);
		   console.log("GET-"+res.data.msg);
                   if(res.data.code===200){
                     console.log(url);
                     window.location= url;
                   }else
                   {
                      alert(res.data.msg)
                   }
                   })
                     }else{
                       return false;
                       console.log('验证失败');
                     }
                 });
            },
            backForm(formName) {
               const self = this;
                self.$refs[formName].validate(function(valid){
                    if(valid){
                     console.log('验证成功');
                     let amount=self.ruleForm.amount;
                     let address =self.ruleForm.address;
                     let desc=self.ruleForm.desc;
                     let url='https://wfc.xyblock.net/#/wifiPortal/donate'+'?toAmount='+amount+'&toAddress='+address+'&payTitle='+encodeURI(desc);
                     let vfurl=baseUrl+'checkaddr/'+address;
                   self.$axios.get(vfurl).then((res) => {
                   console.log("GET-"+res.data.code);
	           console.log("GET-"+res.data.uid);
		   console.log("GET-"+res.data.msg);
                   if(res.data.code===200){
                     console.log(url);
                     self.ruleForm.turl=url;
                   }else
                   {
                      alert(res.data.msg)
                   }
                   })
                     }else{
                       return false;
                       console.log('验证失败');
                     }
                 });               
            }
        }
    }
</script>

<style scoped>
    .login-wrap{
        position: relative;
        width:100%;
        height:100%;
    }
    .ms-title{
        position: absolute;
        top:50%;
        width:100%;
        margin-top: -230px;
        text-align: center;
        font-size:30px;
        color: #fff;

    }
    .ms-login{
        position: absolute;
        left:50%;
        top:50%;
        width:280px;
        height:340px;
        margin:-150px 0 0 -180px;
        padding:40px;
        border-radius: 5px;
        background: #fff;
    }
    .ret-btn button{
        text-align: center;
	position: relative;
        width:100%;
        margin:0px 0px 5px 0px;
        height:35px;
    }
    .bak-btn button{
        text-align: center;
	position: relative;
        width:100%;
        margin:0px 0px 5px 0px;
        height:35px;
    }
</style>
