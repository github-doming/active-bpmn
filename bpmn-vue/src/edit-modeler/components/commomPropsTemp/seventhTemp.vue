<template>
  <div>
    <div class="context">
      <div class="context-main">
        <div class="context-left">
          <p>转变:</p>
          
          <div class="left-box">
            <ul>
              <li>开始</li>
              <li>禁用</li>
              <li>启用</li>
              <li>暂停</li>
              <li>恢复</li>
              <li>跳过</li>
              <li>完成</li>
              <li>终止</li>
              <li>中止</li>
              <li>重置</li>
              <li>确认入库</li>
              <li>驳回</li>
            </ul>
          </div>
        </div>
        <div class="context-rigth">
          <p>可选转变条件:</p>
          <a-button class='btn' size='small' type="primary">检查语法</a-button>
          <div class="rigth-box">
            <textarea>
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
              </textarea>
          </div>
        </div>
      </div>
    </div>
    <div class="form-item">
      <label>插入:</label>
      <a-select default-value="lucy" style="width: 120px" :getPopupContainer='getPopupContainer'>
        <a-select-option value="jack">
          Jack
        </a-select-option>
        <a-select-option value="lucy">
          Lucy
        </a-select-option>
        <a-select-option value="disabled">
          Disabled
        </a-select-option>
        <a-select-option value="Yiminghe">
          yiminghe
        </a-select-option>
      </a-select>
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
      
    },
  }
</script>
<style scoped>
  .btn-list{
    width: 60%;
    margin:0 auto;
    display: flex;
    margin-top: 10px;
    justify-content: space-around;
  }
  .form-item{
    text-align: left;
    padding-left: 10px;
  }
  .context{
    width: 100%;
    overflow-x: auto;
    padding:0 10px 10px;
    box-sizing: border-box;
    margin-bottom: 10px;
  }
  .context-main{
    min-width: 700px;
    display: flex;
  }
  .context-left{
    width: 200px;
    margin-right: 10px;
    text-align: left;
  }
  .context-left p,.context-rigth p{
    margin-bottom: 10px;
  }
  .context-rigth{
    flex: 1;
    text-align: left;
    position: relative;
  }
  .rigth-box textarea{
      width: 98%;
      height: 50vh;
      line-height: 2;
      padding:0 10px;
      box-sizing: border-box;
      border:1px #ddd solid;
  }
  .left-box{
    text-align: left;
    width: 100%;
    height: 50vh;
    overflow: auto;
    background: #fff;
    border:1px #ddd solid;
  }
  .left-box li,.left-box ul{
    margin: 0;
    padding: 0;
    list-style: none;
    line-height: 2.5;
  }
  .left-box li{
    padding: 0 10px;
  }
  .left-box li:hover{
    background: #efefef;
    cursor: pointer;
  }
  .btn{
    position: absolute;
    top: 0;
    right: 10px;
  }
</style>