 <template>
 <div>
    <div class="title">欢迎你,organizer <br> <br>请登录</div>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="650px" class="demo-ruleForm" v-show="flag">
    <el-form-item label="姓名">
      <el-input v-model="ruleForm.name"></el-input>
    </el-form-item>
      <el-form-item label="密码">
        <el-input placeholder="请输入密码" v-model="ruleForm.password" show-password></el-input>
      </el-form-item>
      <!-- <el-form-item label="选择时间">
        <el-date-picker
      v-model="value2"
      type="daterange"
      align="right"
      unlink-panels
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
      :picker-options="pickerOptions">
    </el-date-picker>
      </el-form-item> -->
      
    <el-form-item>
      <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
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
                    callback(new Error('请输入用户名'));
                } else {
                    if (this.ruleForm.name !== '') {
                        //如果不为空
                    }
                    callback();
                }
            };
            var validateAuthor = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入作者名'));
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
                pickerOptions: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }]
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
                      localStorage.setItem('token',1)
                      
                      const gooddata=qs.stringify(this.ruleForm)
                      this.$router.replace('/home/organizerindex')
                      this.flag = !this.flag
                            
                      axios.post('http://localhost:8081/organizerlogin', gooddata).then(function (response) {
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
