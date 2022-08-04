 <template>
  <div>
    <div class="title">请发起投票</div>
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="300px"
      class="demo-ruleForm"
      v-show="flag"
    >
      <el-form-item label="活动名称">
        <el-input v-model="ruleForm.event_name"></el-input>
      </el-form-item>

      <el-form-item label="选择时间">
        <el-date-picker
          v-model="date"
          type="daterange"
          format="yyyy 年 MM 月 dd 日"
          value-format="yyyy-MM-dd"
          align="right"
          unlink-panels
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          @change="dateFormat"
          :picker-options="pickerOptions"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item label="活动简介">
        <el-input type="textarea" v-model="ruleForm.event_descrip"></el-input>
      </el-form-item>

      <el-form-item label="选择voter">
        <el-cascader
          :options="options"
          :props="{ multiple: false, checkStrictly: false }"
          ref="cascaderAddr"
          clearable
        ></el-cascader>
        <button @click="show">点我</button>
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
import qs from "qs";
const axios = require("axios");
export default {
  name: "AddBook",
  data() {
    var validateName = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入名称"));
      } else {
        if (this.ruleForm.name !== "") {
          //如果不为空
        }
        callback();
      }
    };

    return {
      date: "",
      startTime: "",
      endTime: "",
      options: [
        {
          //select框里的数据
          value: "Grade",
          label: "Grade",
          children: [
            {
              value: "grade1",
              label: "1",
            },
            {
              value: "grade2",
              label: "2",
            },
            {
              value: "grade3",
              label: "3",
            },
            {
              value: "grade4",
              label: "4",
            },
          ],
        },
        {
          value: "major",
          label: "major",
          children: [
            {
              value: "cst",
              label: "cst",
            },
            {
              value: "ics",
              label: "ics",
            },
            {
              value: "fm",
              label: "fm",
            },
          ],
        },
      ],
      ruleForm: {
        event_name: "",
        // password: '',
        // arr: [],
        candidate_grade: "",
        candidate_major: "",
        candidate_gender: "",
        event_descrip: "",
      },
      rules: {
        name: [{ validator: validateName, trigger: "blur" }],
        // author: [
        //     { validator: validateAuthor, trigger: 'blur' }
        // ]
      },
      pickerOptions: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            },
          },
        ],
      },
      value1: "",
      // value2: '',
      flag: true,
      data: [],
      value: [],
      selectitems: [],
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

          const gooddata = qs.stringify(this.ruleForm);
          console.log(gooddata);
          this.$router.replace("/home/organizerindex"); //创建完成selection后跳转页面
          this.flag = !this.flag;

          axios
            .post("http://localhost:8081/publishEvent", gooddata)
            .then(function (response) {
              console.log(response);
              store.set("event", response.data); //存储返回的event对象
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    show() {
      const checkedNodes = this.$refs["cascaderAddr"].getCheckedNodes(); // 获取当前点击的节点
      let str = [];
      //   console.log(checkedNodes)
      for (let i = 0; i < checkedNodes.length; i++) {
        if (checkedNodes[i].pathLabels[0] == "Grade") {
          this.ruleForm.candidate_grade = checkedNodes[i].data.label;
        } else {
          this.ruleForm.candidate_major = checkedNodes[i].data.label;
        }

        //console.log(checkedNodes[i].data.label);
        // str[i] = checkedNodes[i].data.label;
      }
      // console.log(JSON.stringify(this.arr));
      //  const gooddata = qs.stringify(this.arr);
      // console.log(gooddata)

      //   console.log(checkedNodes[1].data.value) // 获取当前点击的节点的label
      //   console.log(checkedNodes[0].pathLabels) // 获取由 label 组成的数组
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    dateFormat(picker) {
      this.startTime = picker[0].toString();
      this.endTime = picker[1].toString();
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
