<template>
  <div class="block">
    <span class="demonstration">多选选择任意一级选项</span>
    <el-cascader
      :options="options"
      :props="{ multiple: false, checkStrictly: false }"
      ref="cascaderAddr"
      clearable
    ></el-cascader>
    <button @click="show">点我</button>
  </div>
</template>

<script>
import axios from "axios";
import qs from "qs";
export default {
  data() {
    return {
      label: "",
      candidate_grade: [],
      candidate_major: [],
      options: [
        {
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
    };
  },
  methods: {
    show() {
      const checkedNodes = this.$refs["cascaderAddr"].getCheckedNodes(); // 获取当前点击的节点
      let str = [];
      console.log(checkedNodes[0].pathLabels[0]);
      //   console.log(this.label);
      for (let i = 0; i < checkedNodes.length; i++) {
        if (checkedNodes[0].pathLabels[0] == "Grade") {
          this.candidate_grade[i] = checkedNodes[i].label;
          console.log(this.candidate_grade);
        } else {
          this.candidate_major[i] = checkedNodes[i].label;
          console.log(this.candidate_major);
          //   this.arr.push(checkedNodes[i].pathLabels);
        }

        //console.log(checkedNodes[i].data.label);
        // str[i] = checkedNodes[i].data.label;
      }
      //   console.log(JSON.stringify(this.arr));
      const gooddata = qs.stringify(this.arr);
      // console.log(gooddata)

      //   console.log(checkedNodes[1].data.value) // 获取当前点击的节点的label
      //   console.log(checkedNodes[0].pathLabels) // 获取由 label 组成的数组
    },
  },
};
</script>

<style>
</style>