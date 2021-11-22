<template>
  <div class="context">

    <a-row class='box' type="flex" justify="space-between">
      <a-col :span="20" class='panel'>
        <table class="selected-table">
          <thead>
          <tr>
            <th>{{local.vote}}</th>
            <th>{{local.isPriority}}</th>
            <th>{{local.routingNotes}}</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="item in votes" :key="item.id">
            <td>{{item.name}}</td>
            <td>
              <a-select v-model:value="item.priority" :placeholder="local.isPriority" :open="false">
                <a-select-option v-for="i in votesLen" :key="i">
                  {{ i }}
                </a-select-option>
              </a-select>
            </td>
            <td>
              <a-checkbox :checked="item.requiredReason">{{local.required}}</a-checkbox>
            </td>
          </tr>
          </tbody>
        </table>
      </a-col>
      <a-col :span="3">
        <a-button icon="up" />
        <br/>
        <a-button icon="down"/>
      </a-col>
    </a-row>

  </div>

</template>

<script>
  export default {
    name: "VoteSelect",
    props: {
      voteSelect: {
        type: Object,
        required: true,
      },
    },
    watch: {
      voteSelect(newValue) {
        this.votes = newValue.votes;
        this.leader = 0;
        this.leaderId = null;
      },
    },
    computed: {
      votesLen() {
        return this.votes.length - this.leader;
      }
    },
    data() {
      return {
        local: JSON.parse(localStorage.getItem('activeLocal')),
        votes: [], activeId: null, leader: 0, leaderId: null,
      }
    },
    created() {
      this.votes = this.voteSelect.votes;
    },

  }
</script>

<style scoped>
  .context {
    width: 100%;
    height: 64vh;
    overflow-x: auto;
  }

  .box {
    height: 100%;
    min-width: 500px;
  }

  .panel {
    background: #fff;
    height: 100%;
    border: 1px #ddd solid;
  }

  .selected-table tbody tr {
    cursor: pointer;
  }

  .selected-table tbody tr.selected {
    background: #eeeeee;
  }

  .panel-table {
    height: calc(100% - 128px);
    border: 1px #ddd solid;
  }

  table {
    width: 100%;
    max-height: 60vh;
    overflow-y: auto;
  }

  table th:first-child, table tr td:first-child {
    border-left: none;
  }

  table th:last-child, table tr td:last-child {
    border-right: none;
  }

  table th, table td {
    padding: 5px 10px;
    text-align: left;
    border: 1px #ddd solid;
  }

  table th {
    background: #efefef;
    border-top: none;
  }

  button {
    margin-bottom: 5px;
  }
</style>
