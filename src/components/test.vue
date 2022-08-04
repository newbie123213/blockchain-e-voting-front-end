<template>
  <div>
    <input type="checkbox" value="1" v-model="select" />选项1
    <input type="checkbox" value="2" v-model="select" />选项2
    <input type="checkbox" value="3" v-model="select" />选项3
    <input type="checkbox" value="4" v-model="select" />选项4
    <input type="checkbox" value="5" v-model="select" />选项5
    <!-- <el-checkbox-group v-model="checkList">
    <el-checkbox label="复选框 A"></el-checkbox>
    <el-checkbox label="复选框 B"></el-checkbox>
    <el-checkbox label="复选框 C"></el-checkbox>
    <el-checkbox label="禁用" disabled></el-checkbox>
    <el-checkbox label="选中且禁用" disabled></el-checkbox>
  </el-checkbox-group> -->
    <button @click="show">点我展示选项</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      select: [],
      submit: [0, 0, 0, 0, 0],
      numbers: [1, 2, 3, 4, 5],
    };
  },

  methods: {
    show() {
      for (let i = 0; i < this.select.length; i++) {
        for (let j = 0; j < 5; j++) {
          if (this.select[i] == this.numbers[j]) {
            this.submit[j] = 1;
          }
        }
      }

      console.log(this.submit);
    },
  },
};
</script>

<style>
</style>