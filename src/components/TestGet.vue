<template>
<div>
  <button @click="get">点我获取信息</button>
  <h1>{{message}}</h1>
</div>
  
</template>

<script>
import qs from 'qs'
import axios from 'axios'
export default {
    data() {
        return {
            dataform: {
                // message: ''
            },
            message: '',
            message1:[]
            
        }
    },
    methods: {
        get() {
            axios.get('http://localhost:8081/getdata').then((response) =>{
                this.message = response.data
               
                // this.message1=this.message.toString()
            })
        },
        show() {
            console.log()
        }
    }
}
</script>

<style>

</style>