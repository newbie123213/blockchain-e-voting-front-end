<template>
  <button @click="pass">点我传输信息</button>
</template>

<script>
import axios from 'axios'
import qs from 'qs'
export default {
    data() {
        return {//不能只使用return，要定义一个对象
            dataform: {
                cno: '290',
                cname:'English Composition',
                depart: 'English',
                credits:'3'
            }
         
        }
      
    },
    methods: {
        pass() {
            
            const gooddata=qs.stringify(this.dataform)
            axios.post('http://localhost:8081/test',gooddata).then(function (response) {
                            console.log(response);
                        })
        }
    }
}
</script>

<style>

</style>