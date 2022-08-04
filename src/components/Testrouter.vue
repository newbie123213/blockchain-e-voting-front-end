<template>
<div>
    <button @click="seeShare" v-show="ruleform.flag">点我测试显示按钮</button>
      
      </div>
  

</template>

<script>
export default {


    data() {
        return {
            ruleform: {
                flag: true  
            }
                 
        }

    },


    methods: {
        seeShare() {
            this.$router.replace('/LoginTest')
            this.ruleform.flag = !this.ruleform.flag

        }

    }
}
</script>

<style>

</style>