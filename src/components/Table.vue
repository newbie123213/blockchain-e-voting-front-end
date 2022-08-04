<template>
    <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        prop="userid"
        label="Id"
        width="180">
      </el-table-column>
      <el-table-column
        
        prop="random"
        label="随机码"
        width="180">
      </el-table-column>
      <el-table-column
        prop="publicKey"
        label="公钥">
      </el-table-column>
      <el-table-column
        prop="role"
        label="角色">
      </el-table-column>
      <el-table-column
        prop="balance"
        label="权重">
      </el-table-column>
      <el-table-column
        prop="grade"
        label="年级">
      </el-table-column>
      <el-table-column
        prop="major"
        label="专业">
      </el-table-column>
    </el-table>
  </template>

  <script>
  import axios from 'axios'
    export default {
      data() {
        return {
            tableData: []
        }
    },
    created(){
        axios({
            url: 'http://localhost:8081/getdata',
            
        }).then((res) => {
            console.log(res.data)
            this.tableData = res.data
            console.log(this.tableData)
        })
      }
    }
</script>   
<style>

</style>