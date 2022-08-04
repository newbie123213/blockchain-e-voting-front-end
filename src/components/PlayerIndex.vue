<template>
  <div>
    <div class="title">请发起投票</div>
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="300px"
      class="demo-ruleForm"
    >
      <el-form-item label="活动名称">
        <el-input v-model="ruleForm.surf_name"></el-input>
      </el-form-item>

      <el-form-item label="活动简介">
        <el-input type="textarea" v-model="ruleForm.surf_descrip"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')"
          >立即创建</el-button
        >
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
var store = require("store");
export default {
  data() {
    var validateName = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入名称"));
      } else {
        if (this.ruleForm.surf_name !== "") {
          //如果不为空
        }
        callback();
      }
    };
    return {
      ruleForm: {
        surf_name: "",
        surf_descrip: "",
        event_id: "",
      },
      rules: {
        surf_name: [{ validator: validateName, trigger: "blur" }],
      },
    };
  },
  methods: {
    submitForm(formName) {
      var that = this;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          //提交成功后要做的事情
          // alert('submit!');
          console.log(that.ruleForm);
          this.event_id = store.get("event").event_id;
          const gooddata = JSON.stringify(this.ruleForm); //获取存在本地存储的eventid并发送给后端
          axios.post("http://localhost:8081/uploadsurf", gooddata);
          console.log(gooddata);
        } else {
          console.log("error submit!!");
          return false;
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