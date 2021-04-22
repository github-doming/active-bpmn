<template>

  <div class="participant-context">
    <a-tabs class='table-box' default-active-key="assigns" tab-position="left" @change="changeTab">
      <a-tab-pane :tab="local.user" key='assigns' class='flex'>
        <div class="table-right">
          <table>
            <tr>
              <th>{{local.workPrincipal}}</th>
              <th>{{local.type}}</th>
            </tr>
            <tr v-for='item in rightList' :key='item.id'>
              <td>{{item.userName}}</td>
              <td>{{item.type}}</td>
            </tr>
          </table>
        </div>
      </a-tab-pane>
      <a-tab-pane :tab="local.group" key='groups' class='flex'>
        <div class="table-right">
          <table>
            <tr>
              <th>{{local.groupName}}</th>
              <th>{{local.type}}</th>
              <th>{{local.required}}</th>
            </tr>
            <tr v-for='item in rightList' :key='item.id'>
              <td>{{item.name}}</td>
              <td>{{item.type}}</td>
              <td>
                <a-select style="width: 120px;margin-right: 10px" default-value="NO" v-model="item.need" :open="false">
                  <a-select-option value="NO"> {{local.notNecessary}}</a-select-option>
                  <a-select-option value="ANY"> {{local.any}}</a-select-option>
                  <a-select-option value="ALL"> {{local.all}}</a-select-option>
                  <a-select-option value="NUMBER"> {{local.number}}</a-select-option>
                </a-select>
                <a-input v-if="item.need === 'NUMBER'" v-model="item.number" class="number-input" read-only/>
              </td>
            </tr>
          </table>
        </div>
      </a-tab-pane>
      <a-tab-pane :tab="local.role" key='roles' class='flex'>
        <div class="table-right">
          <table>
            <tr>
              <th>{{local.role}}</th>
              <th>{{local.type}}</th>
              <th>{{local.required}}</th>
            </tr>
            <tr v-for='item in rightList' :key='item.id'>
              <td>{{item.name}}</td>
              <td>{{item.type}}</td>
              <td>
                <a-select style="width: 120px;margin-right: 10px" v-model="item.need" :open="false">
                  <a-select-option value="NO"> {{local.notNecessary}}</a-select-option>
                  <a-select-option value="ANY"> {{local.any}}</a-select-option>
                  <a-select-option value="ALL"> {{local.all}}</a-select-option>
                  <a-select-option value="NUMBER"> {{local.number}}</a-select-option>
                </a-select>
                <a-input v-if="item.need === 'NUMBER'" v-model="item.number" class="number-input" read-only/>
              </td>
            </tr>
          </table>
        </div>
      </a-tab-pane>
    </a-tabs>
  </div>

</template>

<script>

  export default {
    name: "Participant",
    props: {
      participant: {
        type: Object,
        default: () => ({})
      },
    },
    watch: {
      participant() {
        this.rightList = this.participant[this.activeKey];
      }
    },
    data() {
      return {
        local: JSON.parse(localStorage.getItem('activeLocal')),
        rightList: [], activeKey: 'assigns',
      }
    },
    methods: {
      changeTab(key) {
        this.activeKey = key;
        this.rightList = this.participant[this.activeKey];
      },
    }

  }
</script>

<style scoped>
  .participant-context {
    width: 100%;
    overflow: auto;
    height: 64vh;
  }

  .table-box {
    min-width: 500px;
    height: 100%;
  }

  .flex {
    display: flex;
  }

  .table-right {
    width: 100%;
    overflow: auto;
    border: 1px #ddd solid;
    background: #fff;
    margin-right: 1px;
  }

  .number-input {
    width: 60px;
    margin-top: -1px;
  }

  table {
    width: 100%;
  }

  table th, table td {
    padding: 5px 10px;
    text-align: left;
    border: 1px #ddd solid;
  }

  table td {
    border: none;
    border-bottom: 1px #ddd solid;
  }

  table tr:hover {
    background: #f8f8f8;
  }

  table th {
    border-top: none;
    background: #e9e9e9;
  }

  table th:first-child {
    border-left: none;
  }

  table th:last-child {
    border-right: none;
  }

  table tr.hover {
    background: #eeeeee;
  }


</style>
