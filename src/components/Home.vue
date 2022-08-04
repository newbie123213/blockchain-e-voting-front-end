<template>
  <div>
    <div v-show="flag" class="homebackground">
      <div class="hometitle"><font color="green">区块链投票系统</font></div>
      <div style="display: inline-block">
        <button class="organizerbutton" @click="organizerchange">
          我是organizer
        </button>
        <button class="voterbutton" @click="voterchange">我是voter</button>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  data() {
    return {
      flag: true,
    };
  },
  methods: {
    organizerchange() {
      this.$router.replace("/home/Login");
      this.flag = !this.flag;
    },
    voterchange() {
      this.$router.replace("/home/Login");
      this.flag = !this.flag;
    },
  },
};
</script>

<style>
.homebackground {
  background-image: url("../assets/homepage1.jpg");
  background-size: 100% 100%;
  width: 1550px;
  height: 1000px;
  margin-top: 0px;
  position: fixed;
}

.hometitle {
  text-align: center;
  font-size: 80px;
}

.organizerbutton {
  position: absolute;
  top: 400px;
  right: 350px;
  width: 200px;
  height: 100px;
  color: rgb(255, 255, 255);
  background-color: rgb(162, 166, 41);
  font-size: large;
}

.voterbutton {
  position: absolute;
  top: 400px;
  left: 400px;
  width: 200px;
  height: 100px;
  color: rgb(255, 255, 255);
  background-color: rgb(234, 255, 0);
  font-size: large;
}
</style>