<template>
  <div class="context">

    <a-row class='box' type="flex" justify="space-between">
      <a-col :span="20" class='panel'>
        <table class="selected-table">
          <thead>
          <tr>
            <th>{{local.vote}}</th>
            <th>{{local.isPriority}}</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="item in votes" :key="item.id" :class="item.id === activeId?'selected':''"
              @click="transformSelect(item)">
            <td>{{item.name}}</td>
            <td>
              <a-select v-model:value="item.priority" :placeholder="local.isPriority" @change="isLeaderPriority(item)">
                <a-select-option v-for="i in votesLen" :key="i">
                  {{ i }}
                </a-select-option>
              </a-select>
            </td>
          </tr>
          </tbody>
        </table>
      </a-col>
      <a-col :span="3">
        <a-button icon="up" @click="upVote"/>
        <br/>
        <a-button icon="down" @click="downVote"/>
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
    methods: {
      transformSelect(item) {
        this.activeId = item.id;
      },
      isLeaderPriority(item) {
        if (item.priority === this.votes.length) {
          this.leader = 1;
          this.leaderId = item.id;
        } else if (this.leaderId === item.id) {
          this.leader = 0;
        }
      },
      upVote() {
        if (!this.activeId) {
          return;
        }
        let votesCopy = [];
        for (let i = 0; i < this.votes.length; i++) {
          votesCopy[i] = this.votes[i];
          if (this.votes[i].id === this.activeId) {
            if (i !== 0) {
              votesCopy[i - 1] = this.votes[i];
              votesCopy[i] = this.votes[i - 1];
            }
          }
        }
        this.votes = votesCopy;
        this.voteSelect.votes = votesCopy;
      },
      downVote() {
        if (!this.activeId) {
          return;
        }
        let votesCopy = [];
        const len = this.votes.length;
        for (let i = 0; i < len; i++) {
          votesCopy[i] = this.votes[i];
          if (this.votes[i].id === this.activeId) {
            if (i !== len - 1) {
              votesCopy[i] = this.votes[i + 1];
              votesCopy[i + 1] = this.votes[i];
              i++;
            }
          }
        }
        this.votes = votesCopy;
        this.voteSelect.votes = votesCopy;
      }

    }
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
