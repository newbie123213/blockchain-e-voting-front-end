 <template>
  <div>
    <div class="title">
      欢迎你<br />
      <br />请登录
    </div>
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="650px"
      class="demo-ruleForm"
      v-show="flag1"
    >
      <el-form-item label="姓名">
        <el-input v-model="ruleForm.username"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input
          placeholder="请输入密码"
          v-model="ruleForm.password"
          show-password
        ></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')"
          >登录</el-button
        >
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
 

<script>
import qs from "qs";
const axios = require("axios");
export default {
  name: "Login",
  data() {
    var validateName = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入姓名"));
      } else {
        if (this.ruleForm.username !== "") {
          //如果不为空
        }
        callback();
      }
    };
    var validateAuthor = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.ruleForm.author !== "") {
          //如果不为空
        }
        callback();
      }
    };
    return {
      ruleForm: {
        username: "",
        password: "",
      },
      rules: {
        username: [{ validator: validateName, trigger: "blur" }],
        // author: [{ validator: validateAuthor, trigger: "blur" }],
      },

      value1: "",
      value2: "",
      flag1: true,
    };
  },

  methods: {
    submitForm(formName) {
      var that = this;
      let dis = "";
      let isvalid = "";
      let flag = "";
      this.$refs[formName].validate((valid) => {
        if (valid) {
          //提交成功后要做的事情
          // alert('submit!');
          console.log(that.ruleForm);

          const gooddata = qs.stringify(this.ruleForm);

          this.flag1 = !this.flag1;
          axios
            .get("http://localhost:8081/checkVoter", username)
            .then(function (response) {
              flag = response.data.flag;
            });
          axios
            .post("http://localhost:8081/login", gooddata)
            .then(function (response) {
              console.log(response);
              dis = response.data.role_id;
              isvalid = response.isvalid;
            });
        } else {
          console.log("error submit!!");
          return false;
        }
        if ((isvalid = true)) {
          if (dis == "voter") {
            if (flag == true) {
              this.$router.replace("/home/voterindex");
            } else {
              alert("您不具有投票资格！");
            }
          } else if (dis == "organizer") {
            this.$router.replace("/home/organizerindex");
          } else if (dis == "player") {
            this.$router.replace("/home/playerindex");
          }
        } else {
          alert("用户名或密码错误，请重新登录");
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>

<style>
.demo-ruleForm {
  width: 60%;
  margin-top: 150px;
}

.title {
  font-size: 30px;
  text-align: center;
  margin-top: 50px;
}
</style>
