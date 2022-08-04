<template>
<div>
  <!-- 测试穿梭框 -->
<el-transfer v-model="value" :data="data" @change="show(value)"></el-transfer>
<button @click="exp">点我</button>
  <h1>{{selectitems}}</h1>
</div>
  
</template>

<script>
import axios from 'axios'
export default {
    
    data(){
          return {
            data:[],
            value: [],
            selectitems: [],
            
          };
  },
    created(){
        axios({
            url: 'http://localhost:8081/test',
            
        }).then((res) => {

          for (let i = 0; i < res.data.length; i++){
            let obj2 = [];
            res.data.forEach(obj => {
              for (let i = 0; i < res.data.length; i++){
                obj2.push({['key']:i,['label']:obj.random})
              }
            
            });
            // console.log(obj2)
            this.data=obj2
            // this.selectitems=res.data
          }

        })
      },
    methods: {
        show(value) {
            // console.log(value);
            for (let k = 0; k < value.length; k++){
                let temp = value[k];
              console.log(this.data[temp]);//获取选择的数据
                this.selectitems=this.data[temp]
            }
            
      },
      exp() {
        console.log(person.length);
        let person = [{ "userid": null }];
        let obj2 = {};
        person.forEach(obj => {
          obj2=obj
        })
        console.log(obj2)
        }
    }
  };
</script>