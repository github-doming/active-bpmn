<template>
  <a-form-model-item :label=local.access >
    <a-table :columns="accessColumns" :data-source="accessData"  size="small" :pagination="false" :showHeader="false" :scroll="{ y: 300 }">
      <a-checkbox slot="access" slot-scope="boolean,record" :key="record.key" v-model="record.checked" @change="accessChange()">{{record.name}}
      </a-checkbox>
    </a-table>
  </a-form-model-item>
</template>

<script>
export default {
  name: "Acl",
  props: {
    variable: {
      type: Object,
      required: true,
    },
  },
  data() {
    const local = JSON.parse(localStorage.getItem('activeLocal'));
    return {
      local, accessData: [],
      accessColumns: [{dataIndex: 'access', key: 'key', scopedSlots: {customRender: 'access'},}],checked:false
    }
  },
  watch: {
    variable(newValue){
      if(newValue.accesses){
        this.renderData(newValue.accesses.split(','))
      }else{
        this.renderData([]);
      }
    }
  },
  created() {
    const varAcls = this.variable.accesses;
    if(varAcls){
      this.renderData(varAcls.split(','));
    }else{
      this.renderData([]);
    }

  },
  methods: {
    accessChange() {
      const selectAccess = [];
      for (let data of this.accessData) {
        if(data.checked==true){
          selectAccess.push(data.key);
        }
      }
      this.variable.accesses = selectAccess.join(',');
    },
    renderData(access) {
      const accesses = JSON.parse(localStorage.getItem('accesses'));
      this.accessData = [];
      for (let data of accesses) {
        const row = {key: data.code, name: data.name, checked: false};
        for (let key of access) {
          if (key === data.code) {
            row.checked = true;
            break;
          }
        }
        this.accessData.push(row);
      }
    },
  }
}
</script>

<style scoped>
.ac-role {
  height: 398px;
  margin-right: 50px;
}

.ac-table-left {
  float: left;
  width: 250px;
}
</style>
