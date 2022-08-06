<template>
  <div>
    <el-container
      style="height: 100%; border: 1px solid #eee; overflow: auto"
      v-show="flag"
    >
      <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
        <el-menu>
          <el-submenu index="1">
            <template slot="title"
              ><i class="el-icon-message"></i>导航一</template
            >
            <el-menu-item-group>
              <template slot="title">分组一</template>
              <el-menu-item index="1-1">选项1</el-menu-item>
              <el-menu-item index="1-2" @click="show">返回主页</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="分组2">
              <el-menu-item index="1-3" @click="id = 2"
                >查看我的投票</el-menu-item
              >
              <el-menu-item index="1-4" @click="checkresult"
                >查看投票结果</el-menu-item
              >
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-aside>

      <el-container>
        <el-header style="text-align: right; font-size: 12px">
          <el-dropdown>
            <i class="el-icon-setting" style="margin-right: 15px"></i>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>查看</el-dropdown-item>
              <el-dropdown-item>新增</el-dropdown-item>
              <el-dropdown-item>删除</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <span>王小虎</span>
        </el-header>

        <el-main>
          <!--展示surf表里的信息-->
          <div class="showsurf" v-show="id == 1">
            <el-table
              :data="tableData"
              style="width: 100%"
              @selection-change="handleSelectionChange"
              ref="multipleTable"
            >
              <el-table-column type="selection" width="55"> </el-table-column>
              <el-table-column prop="surf_id" label="Id" width="180">
              </el-table-column>
              <el-table-column prop="surf_name" label="项目名称" width="180">
              </el-table-column>
              <el-table-column prop="surf_descrip" label="项目介绍">
              </el-table-column>
            </el-table>
            <el-button @click="submit">提交投票</el-button>
            <el-button @click="toggleSelection()">取消选择</el-button>
          </div>
          <!-- 展示voter曾经投过的票 待实现-->
          <div class="seeresult" v-show="id == 2" @click="checkvote">
            <el-table :data="voteData" style="width: 100%">
              <el-table-column prop="surf_id" label="Id" width="180">
              </el-table-column>
              <el-table-column prop="surf_name" label="项目名称" width="180">
              </el-table-column>
              <el-table-column prop="surf_descrip" label="项目介绍">
              </el-table-column>
              <el-table-column prop="surf_result" label="项目介绍">
              </el-table-column>
            </el-table>
          </div>
          <!-- checkResult部分 待实现-->
          <div class="checkresult" v-show="id == 3" @click="checkresult">
            <el-table :data="voteData" style="width: 100%">
              <el-table-column prop="surf_id" label="Id" width="180">
              </el-table-column>
              <el-table-column prop="surf_name" label="项目名称" width="180">
              </el-table-column>
              <el-table-column prop="surf_descrip" label="项目介绍">
              </el-table-column>
              <el-table-column prop="surf_result" label="项目介绍">
              </el-table-column>
            </el-table>
          </div>
        </el-main>
      </el-container>
    </el-container>
    <!-- <router-view></router-view> -->
  </div>
</template>


<style>
.el-header {
  background-color: #b3c0d1;
  color: #333;
  line-height: 60px;
}

.el-aside {
  color: #333;
}
</style>

<script>
var store = require("store");
import axios from "axios";
export default {
  data() {
    return {
      tableData: [],
      voteData: [],
      count: 0,
      flag: true,
      multipleSelection: [],
      select: [],
      id: 1,
      event_id: "",
      username: "",
      user_id: "",
      all_userid: [],
      all_vote: [],
    };
  },
  created() {
    this.event_id = store.get("event").event_id;
    this.username = store.get("user").username;
    this.user_id = store.get("user").user_id;
    axios(
      "http://localhost:8081/getsurf",
      event_id //根据本次投票查找数据库里的信息
    ).then((res) => {
      console.log(res.data);
      this.tableData = res.data;
      this.all_userid = res.data.User_id;
      store.set("User_id", res.data.User_id);
      console.log(this.tableData);
    });
  },
  methods: {
    show() {
      this.$router.push("/home"); //跳转投票成功页面，返回home页面
      this.flag = !this.flag;
    },
    toggleSelection(rows) {
      if (rows) {
        rows.forEach((row) => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
      console.log(this.multipleSelection);
    },
    checkvote() {
      this.id = 2;
      axios("http://localhost:8081/checkVote", {
        params: {
          user_id: this.user_id, //自己的userid
          event_id: this.event_id,
        },
      }).then((res) => {
        this.voteData = res.data.surf_list;
        //待实现：解密并遍历surf_list，1的填上candidate+元素位置+1
      });
    },
    checkresult() {
      this.id = 3;
      axios.get("http://localhost:8081/checkResult", {
        params: {
          event_id: this.event_id,
          all_userid: this.all_userid, //所有的userid
        }.then(function (response) {
          this.all_vote = response.data.all_vote;
          //待实现：解密投票向量
        }),
      });
    },
    submit() {
      //生成投票向量
      for (let i = 0; i < this.multipleSelection.length; i++) {
        //遍历选项里的数据
        for (let j = 0; j < this.tableData.length; j++) {
          //遍历数据库中的键值对
          if (this.tableData[j] == this.multipleSelection[i]) {
            this.select[i] = 1;
          } else {
            this.select[i] = 0;
          }
        }
      }
      let gooddata = JSON.stringify(this.select);
      let result = "";
      axios
        .post("http://localhost:8081/vote", {
          params: {
            vote: gooddata,
            event_id: this.event_id,
            username: this.username,
          },
        })
        .then(function (response) {
          result = response.data.vote_result;
        });
      if (result == true) {
        alert("success!");
      } else {
        alert("error");
      }
    },
  },
};
</script>