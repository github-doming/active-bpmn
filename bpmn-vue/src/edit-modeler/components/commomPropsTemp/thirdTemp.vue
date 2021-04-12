<template>
  <div>
    <div class="w100">
      <div class='table-box'>
        <a-tabs
          default-active-key="1"
          :tab-position="mode"
          :style="{ height: '530px' }"
          @change="callback"
        >
          <a-tab-pane tab="用户" key='1' class='flex'>
            <div class="w400">
              <div class="from">
                <div class="from-left">
                  <a-form :label-col="{ span: 5 }" :wrapper-col="{ span: 18 }">
                    <a-form-item label="全名">
                      <a-input v-model="userFrom.fullName" />
                    </a-form-item>
                    <a-form-item label="用户名">
                      <a-input v-model="userFrom.name" />
                    </a-form-item>
                  </a-form>
                </div>
                <a-button type="primary" class='from-btn' style="margin-top:48px;" @click="findParticipant('user')">查找</a-button>
              </div>
              <div class="table-left">
                <table>
                  <tr>
                    <th width="25%">全名</th>
                    <th width="25%">用户名</th>
                  </tr>
                  <tr v-for='(item,index) in leftColumns' :key='item.index' @click='addDataCaceh("left",index,item)' :class='item.hover?"hover":""'>
                    <td>{{item.name}}</td>
                    <td>{{item.userName}}</td>
                  </tr>
<!--                  <tr v-for='(item) in userLeaveArr' :key='item.index' style="background-color: lightgrey">-->
<!--                    <td>{{item.name}}</td>-->
<!--                    <td>{{item.userName}}</td>-->
<!--                  </tr>-->
                </table>
              </div>
              <div>
                <a-pagination size="small"
                              v-model="userFrom.pageNo"
                              :total="userFrom.total"
                              :page-size.sync="userFrom.pageSize"
                              show-size-changer
                              :defaultPageSize=10
                              :defaultCurrent=1
                              hideOnSinglePage
                              :page-size-options="['10','15','20']"
                              :show-total="total => `共 ${total} 条`"
                              @change="findParticipant('user')"
                              @showSizeChange="pageSizeChange('user')"
                >
                  <template slot="buildOptionText" slot-scope="props">
                    <span v-if="props.value !== 'userFrom.total'">{{ props.value }}条/页</span>
                  </template>
                </a-pagination>
              </div>
            </div>
            <div class="btn">
              <span :class="leftIconStats?'hover':''" @click='addCachToData("left")'><a-icon type="double-right" /></span>
              <span :class="rightIconStats?'hover':''" @click='addCachToData("right")'><a-icon type="double-left" /></span>
            </div>
            <div class="tranfs">
              <table>
                <tr>
                  <th width="25%">工作负责人</th>
                  <th width="25%">类型</th>
                </tr>
                <tr v-for='(item,index) in rightColumns' :key='item.index' @click='addDataCaceh("right",index,item)' :class='item.hover?"hover":""'>
                  <td>{{item.userName}}</td>
                  <td>{{item.type}}</td>
                </tr>
              </table>
            </div>
          </a-tab-pane>
          <a-tab-pane tab="组" key='2' class='flex'>
            <div class="w400">
              <div class="from">
                <div class="from-left">
                  <a-form :label-col="{ span: 5 }" :wrapper-col="{ span: 18 }">
                    <a-form-item label="组名称">
                      <a-input v-model="teamFrom.name" />
                    </a-form-item>
                  </a-form>
                </div>
                <a-button type="primary" class='from-btn' style="margin-top:3px;" @click="findParticipant('group')">查找</a-button>
              </div>
              <div class="table-left-group">
                <table>
                  <tr>
                    <th width="40%">组</th>
                  </tr>
                  <tr v-for='(item,index) in leftColumns' :key='item.index' @click='addDataCaceh("left",index,item)' :class='item.hover?"hover":""'>
                    <td>{{item.name}}</td>
                  </tr>
<!--                  <tr v-for='(item) in teamLeaveArr' :key='item.index' style="background-color: lightgrey">-->
<!--                    <td>{{item.name}}</td>-->
<!--                  </tr>-->
                </table>
              </div>
              <div>
                <a-pagination size="small"
                              v-model="teamFrom.pageNo"
                              :total="teamFrom.total"
                              :page-size.sync="teamFrom.pageSize"
                              show-size-changer
                              :defaultPageSize=10
                              :defaultCurrent=1
                              hideOnSinglePage
                              :page-size-options="['5','10','15','20']"
                              :show-total="total => `共 ${total} 条`"
                              @change="findParticipant('group')"
                              @showSizeChange="pageSizeChange('group')"
                >
                  <template slot="buildOptionText" slot-scope="props">
                    <span v-if="props.value !== 'userFrom.total'">{{ props.value }}条/页</span>
                  </template>
                </a-pagination>
              </div>
            </div>
            <div class="btn">
              <span :class="leftIconStats?'hover':''" @click='addCachToData("left")'><a-icon type="double-right" /></span>
              <span :class="rightIconStats?'hover':''" @click='addCachToData("right")'><a-icon type="double-left" /></span>
            </div>
            <div class="tranfs">
              <table>
                <tr>
                  <th width="25%">组名</th>
                  <th width="25%">类型</th>
                  <th width="50%">必需的</th>
                </tr>
                <tr v-for='(item,index) in rightColumns' :key='item.index' @click='addDataCaceh("right",index,item)' :class='item.hover?"hover":""'>
                  <td>{{item.name}}</td>
                  <td>{{item.type}}</td>
                  <td>
                    <a-select style="width: 120px" default-value="NO" v-model="item.need" :getPopupContainer='getPopupContainer'>
                      <a-select-option value="NO">
                        非必须
                      </a-select-option>
                      <a-select-option value="ANY">
                        任何
                      </a-select-option>
                      <a-select-option value="ALL">
                        全部
                      </a-select-option>
                      <a-select-option value="NUMBER">
                        编号
                      </a-select-option>
                    </a-select>
                    <a-input v-if="item.need === 'NUMBER'" v-model="item.number" placeholder="编号" style="width: 60px;" />
                  </td>
                </tr>
              </table>
            </div>
          </a-tab-pane>
          <a-tab-pane tab="角色" key='3' class='flex'>
            <div class="w400">
              <div class="from">
                <div class="from-left">
                  <a-form :label-col="{ span: 5 }" :wrapper-col="{ span: 18 }">
                    <a-form-item label="角色名">
                      <a-input v-model="roleForm.roleName" />
                    </a-form-item>
                  </a-form>
                </div>
                <a-button type="primary" class='from-btn' style="margin-top:3px;" @click="findParticipant('role')">查找</a-button>
              </div>
              <div class="table-left-role">
                <table>
                  <tr>
                    <th width="25%">角色名</th>
                  </tr>
                  <tr v-for='(item,index) in leftColumns' :key='item.index' @click='addDataCaceh("left",index,item)' :class='item.hover?"hover":""'>
                    <td>{{item.name}}</td>
                  </tr>
<!--                  <tr v-for='(item) in roleLeaveArr' :key='item.index' style="background-color: lightgrey">-->
<!--                    <td>{{item.name}}</td>-->
<!--                  </tr>-->
                </table>
              </div>
              <div>
                <a-pagination size="small"
                              v-model="roleForm.pageNo"
                              :total="roleForm.total"
                              :page-size.sync="roleForm.pageSize"
                              show-size-changer
                              :defaultPageSize=10
                              :defaultCurrent=1
                              hideOnSinglePage
                              :page-size-options="['5','10','15','20']"
                              :show-total="total => `共 ${total} 条`"
                              @change="findParticipant('role')"
                              @showSizeChange="pageSizeChange('role')"
                >
                  <template slot="buildOptionText" slot-scope="props">
                    <span v-if="props.value !== 'userFrom.total'">{{ props.value }}条/页</span>
                  </template>
                </a-pagination>
              </div>
            </div>
            <div class="btn">
              <span :class="leftIconStats?'hover':''" @click='addCachToData("left")'><a-icon type="double-right" /></span>
              <span :class="rightIconStats?'hover':''" @click='addCachToData("right")'><a-icon type="double-left" /></span>
            </div>
            <div class="tranfs">
              <table>
                <tr>
                  <th width="25%">角色</th>
                  <th width="25%">类型</th>
                  <th width="50%">必需的</th>
                </tr>
                <tr v-for='(item,index) in rightColumns' :key='item.index' @click='addDataCaceh("right",index,item)' :class='item.hover?"hover":""'>
                  <td>{{item.name}}</td>
                  <td>{{item.type}}</td>
                  <td>
                    <a-select style="width: 120px" default-value="NO" v-model="item.need" :getPopupContainer='getPopupContainer'>
                      <a-select-option value="NO">
                        非必须
                      </a-select-option>
                      <a-select-option value="ANY">
                        任何
                      </a-select-option>
                      <a-select-option value="ALL">
                        全部
                      </a-select-option>
                      <a-select-option value="NUMBER">
                        编号
                      </a-select-option>
                    </a-select>
                    <a-input v-if="item.need=='NUMBER'" v-model="item.number" placeholder="编号" style="width: 60px;" />
                  </td>
                </tr>
              </table>
            </div>
          </a-tab-pane>
        </a-tabs>
      </div>
    </div>
  </div>

</template>
<script>
  let addDataLeftcaceh = [],addDataRightcaceh = [];
  export default {
    props: [ 'userLeftArr','userRightArr','userLeaveArr',
      'teamLeftArr', 'teamRightArr','teamLeaveArr',
      'roleLeftArr','roleRightArr','roleLeaveArr',
      'userFrom','teamFrom','roleForm'],
    data () {
      return {
        mode: 'left',

        leftIconStats: false,
        rightIconStats: false,
        rightColumns: this.userRightArr,
        leftColumns: this.userLeftArr,
        key: "1",

      }
    },
    methods: {
      // 用户页码和页签变化
      findParticipant(data){
        if (data === "user"){
          this.$emit('findParticipantUsers',this.userFrom);
        }
        if (data === "group") {

          this.$emit('findParticipantGroups',this.teamFrom);
        }
        if (data === "role") {
          this.$emit('findParticipantRoles',this.roleForm);
        }
      },
      pageSizeChange(data){
        this.findParticipant(data);
      },

      /* 数据处理，存数据 */
      writeBpmnThird() {
        // 构造后端所需数据格式
        var dateArr = {
          "tab": "Participant",
          "param": [{assign: "",group: "", role: ""}]
        };
        var dates = dateArr.param[0];
        var userStr = "";
        this.userRightArr.forEach(each => {
          userStr += each.userName + ",";
          userStr += each.type + ",";
          userStr += each.id + ";";
        });
        // jwzhao,type1;jwzhao,type2;
        dates.assign = userStr;
        var teamStr = "";
        this.teamRightArr.forEach(each => {
          teamStr = each.need ?  teamStr.concat(each.need) : teamStr = teamStr.concat("NO");
          teamStr = each.number ? teamStr.concat(".",each.number) : teamStr.concat(".undefined");
          teamStr = teamStr.concat(",",each.name,",",each.type,",",each.id);
          teamStr = teamStr.concat(";");
        });
        // ALL.undefined,组名称，type1; NUMBER.2,组名称，type2;
        dates.group = teamStr;

        var roleStr = "";
        this.roleRightArr.forEach(each => {
          // roleStr = each.need ? roleStr = roleStr.concat(each.need) : roleStr = roleStr.concat("NO");
          // roleStr = each.number ? roleStr = roleStr.concat(".",each.number) : roleStr = roleStr.concat(".undefined");
          roleStr = roleStr.concat(each.need ? each.need : 'NO' );
          roleStr = roleStr.concat(each.number ? ".".concat(each.number) : '.undefined' );
          // if (each.name !== "" ){
          roleStr = roleStr.concat(",",each.name);
          //}
          roleStr = roleStr.concat(",",each.type);
          roleStr = roleStr.concat(",",each.roleCode);
          roleStr = roleStr.concat(",",each.id);
          roleStr = roleStr.concat(";");
        });
        // ALL.undefined,用户名,type1,roleCode1;ANY.undefined,用户名,type2,roleCode2;NUMBER.3,用户名,type3,roleCode3;
        dates.role = roleStr;
        this.$emit('writeBpmnThird', dateArr);
      },
      callback(key) {
        this.key = key;
        if ("1" === key){
          // 用户
          // this.$emit('findParticipantUsers',this.userFrom);
          this.leftColumns = this.userLeftArr;
          this.rightColumns = this.userRightArr;
        } else if ("2" === key) {
          // 组
          // this.$emit('findParticipantGroups',this.teamFrom);
          this.leftColumns = this.teamLeftArr;
          this.rightColumns = this.teamRightArr;
        } else if ("3" === key) {
          // 角色
          this.$emit('findParticipantRoles',this.roleForm);
          this.leftColumns = this.roleLeftArr;
          this.rightColumns = this.roleRightArr;
        }
      },
      getPopupContainer(triggerNode){
        return triggerNode.parentNode;
      },
      /* 点击一行参数  */
      addDataCaceh(type,index,item){
        let indexs = '';
        let cacehArr = type === 'left'?addDataLeftcaceh:addDataRightcaceh;
        let arr =  type === 'left'?this.leftColumns:this.rightColumns;
        let iconStats = '';
        var result = cacehArr.some((items,index) => {
          if(item.id === items.id){
            indexs = index;
            return true;
          }
        });
        if (result) {
          Object.assign(item,{'hover':false})
          arr[index] = item;
          cacehArr.splice(indexs, 1);
        }else{
          let item1 = {...item};
          Object.assign(item,{'hover':true});
          arr[index] = item;
          Object.assign(item1,{'hover':false});
          cacehArr.push(item1);
        }
        iconStats = cacehArr.length > 0;
        if (type === 'left'){
          this.leftIconStats = iconStats;
          //双向绑定失效修复
          this.leftColumns = {};
          this.leftColumns = arr;
        }else{
          this.rightIconStats = iconStats;
          this.rightColumns =arr;
        }
      },
      /* 左移右移 */
      addCachToData(type){
        const stats = type === 'left'?this.leftIconStats:this.rightIconStats;
        let cacehArr = type === 'left'?addDataLeftcaceh:addDataRightcaceh;
        let removeArr =  type === 'left'?this.leftColumns:this.rightColumns;
        let addArr = type === 'left'?this.rightColumns:this.leftColumns;
        if (!stats) {
          return
        }
        addArr = addArr.concat(cacehArr);
        removeArr = removeArr.filter((item,index)=>{
          let stats = true;
          for (var i = 0; i < cacehArr.length; i++) {
            let items = cacehArr[i];
            if (item.id === items.id) {
              stats = false;
            }
          }
          return stats;
        });
        if (type === 'left') {
          this.rightColumns = addArr;
          this.leftColumns = removeArr;
          addDataLeftcaceh = [];
          this.leftIconStats = false;
        }else{
          this.leftColumns = addArr;
          this.rightColumns = removeArr;
          addDataRightcaceh =[];
          this.rightIconStats = false;
        }
        console.log(addArr);
        //赋值的时候要记录便于其它tab转换
        if ("1" === this.key){
          // 用户
          // this.userLeftArr = this.leftColumns ;
          this.$emit("changeUser",this.leftColumns,this.rightColumns);
          // this.userRightArr = this.rightColumns;
        } else if ("2" === this.key) {
          // 组
          // this.teamLeftArr = this.leftColumns;
          this.$emit("changeTeam",this.leftColumns,this.rightColumns);
          // this.teamRightArr = this.rightColumns ;
        } else if ("3" === this.key) {
          // 角色
          // this.roleLeftArr = this.leftColumns ;
          this.$emit("changeRole",this.leftColumns,this.rightColumns);
          // this.roleRightArr = this.rightColumns;
        }
      },
    },
    watch: {
      userLeftArr(newVal) {
        this.leftColumns = newVal;
      },
      userRightArr(newVal) {
        this.rightColumns = newVal;
      },
      teamLeftArr(newVal) {
        this.leftColumns = newVal;
      },
      teamRightArr(newVal) {
        this.rightColumns = newVal;
      },
      roleLeftArr(newVal) {
        this.leftColumns = newVal;
      },
      roleRightArr(newVal) {
        this.rightColumns = newVal;
      },
    }
  };
</script>
<style scoped>
  .w100{
    /*width: 95%;*/
    width:100%;
    /* height: 60vh;*/
    overflow: auto;
    padding:0 2.5%;
  }
  .table-box{
    width: 100%;
    min-width: 900px;
  }
  .flex{
    display: flex;
  }
  .w400{
    width: 400px;
  }
  .from{
    display: flex;
  }
  .from-left{
    width: 370px;
  }
  .from-btn{
    margin-top: 70px;
  }
  .btn-list{
    /*width: 60%;
    margin:0 auto;*/
    padding: 0 2.5%;
    display: flex;
    justify-content: flex-end;
  }
  .btn-list button{
    margin-right: 5px;
  }
  .btn-list button:last-child{
    margin-right: 0px;
  }
  .ant-form-item{
    margin-bottom: 5px;
  }
  .tranfs{
    flex: 1;
    overflow: auto;
    height: 490px;
    border:1px #ddd solid;
    background: #fff;
    margin-right: 1px;
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
  .btn{
    padding: 160px 10px 0 10px;
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
  .table-left{
    border:1px #ddd solid;
    height: 375px;
    overflow: auto;
    background: #fff;
  }
  .table-left-group{
    border:1px #ddd solid;
    height: 413px;
    overflow: auto;
    background: #fff;
  }
  .table-left-role{
    border:1px #ddd solid;
    height: 413px;
    overflow: auto;
    background: #fff;
  }
  .btn span{
    display: block;
    width: 40px;
    height: 40px;
    background: #fff;
    border:1px #ddd solid;
    border-radius: 5px;
    margin-bottom: 10px;
    line-height: 40px;
    text-align: center;
  }
  .btn span.hover{
    background: #1890ff;
    color: #fff;
  }
  .select-box{
    padding: 10px 5px;
    /*text-align: left;*/
  }
</style>
