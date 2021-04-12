<template>
  <div>
    <div class="main">
      <div class="w800 flex">
        <div class="from">
          <a-form>
            <a-form-item label="角色">
              <a-select v-model="form.role" :getPopupContainer='getPopupContainer'>
                <a-select-option value="shanghai">
                  Zone one
                </a-select-option>
                <a-select-option value="beijing">
                  Zone two
                </a-select-option>
              </a-select>
            </a-form-item>
            <a-form-item label="库">
              <a-select v-model="form.type" :getPopupContainer='getPopupContainer'>
                <a-select-option value="0">
                  组
                </a-select-option>
                <a-select-option value="1">
                  团队
                </a-select-option>
                <a-select-option value="2">
                  上下文团队
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-form>
        </div>
        <div class="tranfs">
          <div class="tranfs-left">
            <ul>
              <li v-for='(item,index) in leftColumns' :key='item.id' @click='addDataCaceh("left",index,item)' :class='item.hover?"hover":""'>context Team</li>
            </ul>
          </div>
          <div class="btn">
            <span :class="leftIconStats?'hover':''" @click='addCachToData("left")'><a-icon type="double-right" /></span>
            <span :class="rightIconStats?'hover':''" @click='addCachToData("right")'><a-icon type="double-left" /></span>
          </div>
          <div class="tranfs-rigth">
             <table>
                <tr>
                  <th width="40%">资源库</th>
                  <th width="60%">类型</th>
                </tr>
                <tr v-for='(item,index) in rightColumns' :key='item.id' @click='addDataCaceh("right",index,item)' :class='item.hover?"hover":""'>
                  <td>{{item.name}}</td>
                  <td>{{item.userName}}</td>
                </tr>
              </table>
          </div>
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
let leftData = [
  {
    id:'left_01',
    name:'小李',
    userName:'惠',
    code:'context Team',
    html:'html',
    hover:false,

  },
  {
    id:'left_02',
    name:'小李2',
    userName:'惠2',
    code:'context Team',
    html:'html',
    hover:false,
  }
];
let rigthData = [
  {
    id:'rigth_01',
    name:'小李',
    userName:'惠',
    code:'context Team',
    html:'html',
    hover:false,

  },
  {
    id:'rigth_02',
    name:'小李2',
    userName:'惠2',
    code:'context Team',
    html:'html',
    hover:false,
  }
];
let addDataLeftcaceh = [],addDataRightcaceh = [];
	export default {
		props: ['form'],
    data(){
      return {
        leftColumns:leftData,
        rightColumns: rigthData,
        leftIconStats:false,
        rightIconStats:false,
      }
    },
    methods: {
      getPopupContainer(triggerNode){
        return triggerNode.parentNode;
      },
      addDataCaceh(type,index,item){
        let indexs = '';
        let cacehArr = type == 'left'?addDataLeftcaceh:addDataRightcaceh;
        let arr =  type == 'left'?this.leftColumns:this.rightColumns;
        let iconStats = '';
        var result = cacehArr.some((items,index) => {
          if(item.id == items.id){
              indexs = index;
              return true 
          }
        })
        if (result) {
          Object.assign(item,{'hover':false})
          arr[index] = item;
          cacehArr.splice(indexs, 1); 
        }else{
          let item1 = {...item};
          Object.assign(item,{'hover':true});
          arr[index] = item;
          Object.assign(item1,{'hover':false});
          cacehArr.push(item1)
        }
        if (cacehArr.length>0) {
          if (true) {}
          iconStats = true
        }else{
          iconStats = false
        }
        if (type == 'left'){
          this.leftIconStats = iconStats
          this.leftColumns = arr
        }else{
          this.rightIconStats = iconStats
          this.rightColumns =arr
        }
      },
      addCachToData(type){
        const stats = type == 'left'?this.leftIconStats:this.rightIconStats;
        let cacehArr = type == 'left'?addDataLeftcaceh:addDataRightcaceh;
        let removeArr =  type == 'left'?this.leftColumns:this.rightColumns;
        let addArr = type == 'left'?this.rightColumns:this.leftColumns;
        if (!stats) { return};
        addArr = addArr.concat(cacehArr);
        removeArr = removeArr.filter((item,index)=>{
            let stats = true;
            for (var i = 0; i < cacehArr.length; i++) {
              let items = cacehArr[i]
              if (item.id == items.id) {
                stats = false
              }
            }
            return stats;
          })
        if (type == 'left') {
          this.rightColumns = addArr;
          this.leftColumns = removeArr;
          addDataLeftcaceh = []
          this.leftIconStats = false
        }else{
           this.leftColumns = addArr;
           this.rightColumns = removeArr;
           addDataRightcaceh =[]
           this.rightIconStats = false
        }
        console.log(addArr)
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
    min-height: 58vh;
    padding:0 10px;
  }
  .btn-list{
    width: 60%;
    margin:0 auto;
    display: flex;
    margin-top: 20px;
    justify-content: space-around;
  }
  .ant-form-item{
    margin-bottom: 5px;
  }
  .flex{
    display: flex;
  }
  .from{
    width: 200px;
    text-align: left;
    margin-right: 10px;
  }
  .tranfs{
    display: flex;
    flex: 1;
  }
  .tranfs-left{
    width: 50%;
    height: 58vh;
    overflow-y:auto;
    border:1px #ddd solid;
    background: #fff;
  }
  .tranfs-left ul,.tranfs-left li{
    list-style: none;
    margin: 0;
    padding: 0;
    line-height: 2;
    text-align: left;
  }
  .tranfs-left li{
    padding: 0 10px;
  }
  .tranfs-left li:hover,.tranfs-left li.hover{
    background: #efefef;
  }
  .tranfs-rigth{
    width: 40%;
    height: 58vh;
    overflow-y:auto;
    border:1px #ddd solid;
    background: #fff;
  }
  table{
    width: 100%;
  }
  table th,table td{
    padding: 5px 10px;
    text-align: left;
    border:1px #ddd solid;
  }
  table td{
    border:none;
    border-bottom: 1px #ddd solid;
  }
  table tr:hover{
    background: #f8f8f8;
  }
  table th{
    border-top:none;
    background: #e9e9e9;
  }
  table th:first-child{
    border-left: none;
  }
  table th:last-child{
    border-right: none;
  }
  table tr.hover{
    background: #eeeeee;
  }
  .btn{
    width: 10%;
    padding: 160px 10px 0 10px;
  }
  .btn span{
    display: block;
    margin:0 auto;
    width: 40px;
    height: 40px;
    background: #fff;
    border:1px #ddd solid;
    border-radius: 5px;
    margin-bottom: 10px;
    line-height: 40px;
  }
  .btn span.hover{
    background: #1890ff;
    color: #fff;
  }
</style>