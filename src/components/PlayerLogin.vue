 <template>
 <div v-show="flag">
    <div class="title">欢迎你,player <br> <br>请登录</div>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="650px" class="demo-ruleForm" >
    <el-form-item label="姓名">
      <el-input v-model="ruleForm.name"></el-input>
    </el-form-item>
      <el-form-item label="密码">
        <el-input placeholder="请输入密码" v-model="ruleForm.password" show-password></el-input>
      </el-form-item>
      
      
    <el-form-item>
      <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
      <el-button @click="resetForm('ruleForm')">重置</el-button>
    </el-form-item>
  </el-form>
 </div>
      
 </template>
 

<script>
import qs from 'qs'
const axios = require('axios');
    export default {
        name: "AddBook",
        data() {
            var validateName = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入姓名'));
                } else {
                    if (this.ruleForm.name !== '') {
                        //如果不为空
                    }
                    callback();
                }
            };
            var validateAuthor = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入密码'));
                } else {
                    if (this.ruleForm.author !== '') {
                        //如果不为空
                    }
                    callback();
                }
            };
            return {
                ruleForm: {
                    name: '',
                    password: ''
                },
                rules: {
                    name: [
                        { validator: validateName, trigger: 'blur' }
                    ],
                    author: [
                        { validator: validateAuthor, trigger: 'blur' }
                    ]
                },
                
                value1: '',
                value2: '',
                flag:true,
            }
    },
        
        
        methods: {
            submitForm(formName) {
                var that=this;
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        //提交成功后要做的事情
                        // alert('submit!');
                      console.log(that.ruleForm)

                      const gooddata=qs.stringify(this.ruleForm)
                      this.$router.replace('/home/organizerindex')
                      this.flag = !this.flag
                            
                      axios.post('http://localhost:8081/playerlogin', gooddata).then(function (response) {
                          console.log(response)
                            
                        })
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            }
        }
    }
</script>

<style>
 .demo-ruleForm{
    width:60%;
    margin-top:150px;
 }

 .title{
    font-size:30px;
    text-align: center;
    margin-top:50px;
 }
</style>
