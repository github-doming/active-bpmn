<template>
  <div >
    <p class="textL">变量:</p>
    <div class="over-scoll">
      <div class="flex">
        <div class="flex-form">
          <table>
            <tr>
              <th>名称</th>
              <th>显示名称</th>
              <th>类型名称</th>
              <th>可见</th>
              <th>必需</th>
              <th>只读</th>
              <th>可重</th>
              <th>初使化自</th>
              <th>复制到</th>
              <th>默认值</th>
            </tr>
            <tr v-for='item in Datas' :key='item.id'>
              <td>{{item.name}}</td>
              <td>{{item.showName}}</td>
              <td>{{item.typeName}}</td>
              <td>{{item.show}}</td>
              <td>{{item.must}}</td>
              <td>{{item.read}}</td>
              <td>{{item.reuse}}</td>
              <td>{{item.initialize}}</td>
              <td>{{item.copyTo}}</td>
              <td>{{item.default}}</td>
            </tr>
          </table>
        </div>
        <div class="flex-btn">
          <a-button @click='addData'>创建</a-button>
          <a-button disabled>更新</a-button>
          <a-button disabled>删除</a-button>
        </div>
      </div>
    </div>

    <div class='btn-list'>
      <a-button>确认</a-button>
      <a-button>取消</a-button>
      <a-button>帮助</a-button>
    </div>
  </div>
</template>
<script>

  import { FormModel } from 'ant-design-vue';
  Vue.use(FormModel);

let Datas = [
  {
    id:'BOM1',
    name:'BOM1管理',
    showName:'self',
    typeName:'java.java.java',
    show:'no',
    must:'no',
    read:'no',
    reuse:'no',
    initialize:'no',
    copyTo:'justify-content',
    default:'java'
  }
];
let defaultObj = {
  id:'BOM3',
  name:'BOM3管理',
  showName:'self',
  typeName:'java.java.java',
  show:'no',
  must:'no',
  read:'no',
  reuse:'no',
  initialize:'no',
  copyTo:'justify-content',
  default:'java'
};
	export default {
		props: ['form'],
    data(){
      return {
        Datas,
      }
    },
    methods: {
      addData(){
        const len = this.Datas.length+1;
        let defaultObjs = {...defaultObj};
        let item = Object.assign(defaultObjs,{id:'BOM'+len,name:'BOM'+len+'管理'});
        this.Datas.push(item)
      }
    },
	}
</script>
<style scoped>
.over-scoll{
  width: 100%;
  height: 60vh;
  overflow: auto;
}
.textL{
  text-align: left;
  padding-left: 10px;
  margin-bottom: 5px;
}
.flex{
  display: flex;
  min-width: 850px;
  min-height: 100%;
  padding-right: 10px;
}
.flex-btn{
  width: 65px;
}
.flex-btn button{
  margin-bottom: 5px;
}
.btn-list{
  width: 60%;
  margin:0 auto;
  display: flex;
  margin-top: 10px;
  justify-content: space-around;
}
.flex-form{
  flex: 1;
  min-width: 750px;
  height: 100%;
  margin:0 10px;
  background: #fff;
  border:1px #ddd solid;
}
table{
  width: 100%;
}
table th,table td{
  padding: 5px 10px;
  text-align: left;
  border:1px #ddd solid;
}
table th{
  border-top: none;
  background: #efefef;
}
table th:first-child,table tr td:first-child{
  border-left: none;
}
table th:last-child,table tr td:last-child{
  border-right: none;
}
</style>
