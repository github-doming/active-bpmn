<template>
  <div>
  	<div class="main">
      <div class="w800">
  		    <a-form :label-col="{ span: 4 }" :wrapper-col="{ span: 20}">
            <a-form-item label="将最后期限设置为">
              <a-date-picker show-time placeholder="Select Time" @change="onChange" @ok="onOk"/> 从活动开始时,或
              <a-date-picker show-time placeholder="Select Time" @change="onChange" @ok="onOk"/> 从父进程启动时.
            </a-form-item>

            <a-form-item label="逾期后果">
              <a-checkbox-group v-model="checkedList" :options="plainOptions" @change="onChange" />
            </a-form-item>

            <a-form-item label="逾期通知">
                <div class="w200">
                  <a-checkbox @change="onChange">通知选定角色</a-checkbox>
                  <div class="list-box">
                    <ul>
                      <li v-for='(item,index) in liData' :key='item.id' :class='item.hover?"hover":""' @click='hanldAddCaceh(item,index)'>{{item.role}}</li>
                    </ul>
                  </div>
                </div>
                <div class="w-flex">
                  <a-checkbox @change="onChange" style='display:block'>通知负责角色</a-checkbox>
                  <a-date-picker show-time placeholder="Select Time" @change="onChange" @ok="onOk"/> 最后期限之前
                  <a-checkbox @change="onChange" style='display:block'>通知负责角色</a-checkbox>
                  <a-date-picker show-time placeholder="Select Time" @change="onChange" @ok="onOk"/> 最后期限之后
                </div>
            </a-form-item>
          </a-form>
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
const defaultCheckedList = [];
const plainOptions = ['路过', '标记完成', '重新分配给负责角色'];
const liData = [
  {
    id:'BOM1',
    role:'BOM1管理',
    hover:false,
  },
  {
    id:'BOM2',
    role:'BOM2管理',
    hover:false,
  }
]
	export default {
		props: ['form'],
    data(){
      return {
        checkedList: defaultCheckedList,
        plainOptions,
        liData,
        roleCaceh:new Array()
      }
    },
    methods: {
      getPopupContainer(triggerNode){
        return triggerNode.parentNode;
      },
      onChange(value, dateString) {
        console.log('Selected Time: ', value);
        console.log('Formatted Selected Time: ', dateString);
      },
      onOk(value) {
        console.log('onOk: ', value);
      },
      onChange(checkedList) {
        this.indeterminate = !!checkedList.length && checkedList.length < plainOptions.length;
        this.checkAll = checkedList.length === plainOptions.length;
      },
      hanldAddCaceh(item,indexData){
        let indexs = '';
        let cacehArr = this.roleCaceh;
        let arr =  this.liData;
        let result = cacehArr.some((items,index) => {
          if(item.id == items.id){
              indexs = index;
              return true 
          }
        })
        if (result) {
          cacehArr.splice(indexs, 1); 
        }else{
          cacehArr.push(item)
        }
        if (item.hover) {
          Object.assign(item,{'hover':false});
        }else
          Object.assign(item,{'hover':true});
        this.liData[indexData] = item
        this.roleCaceh = cacehArr
      }
    },
	}
</script>
<style scoped>
  .main{
    width: 100%;
    overflow-x: auto;
  }
  .w800{
    min-width: 800px;
    padding-right: 10px;
  }
  .btn-list{
    width: 60%;
    margin:0 auto;
    display: flex;
    margin-top: 10px;
    justify-content: space-around;
  }
  .ant-form-item{
    margin-bottom: 5px;
  }
  .flex{
    display: flex;
  }
  .w200{
    width: 200px;
    float: left;
    margin-right: 10px;
  }
  .w-flex{
    width: calc(100% - 210px);
    float: left;
  }
  .list-box {
    height: 300px;
    overflow: auto;
    background: #fff;
    border:1px #ddd solid;
  }
  .list-box li,.list-box ul{
    list-style: none;
    padding: 0;
    margin: 0;
    line-height: 1.8
  }
  .list-box li{
    padding: 0 3px;
  }
  .list-box li:hover,.list-box li.hover{
    background: #efefef;
  }
</style>
<style>
.ant-form-item-control-wrapper{
    text-align: left;
  }
  .ant-calendar-picker-container{
      z-index: 9999;
  }
</style>