<template>
  <div class="general-context">
    <a-form-model :label-col="{ span: 5 }" :wrapper-col="{ span: 18 }">
      <a-form-model-item :label="local.name" prop="name">
        <a-input :placeholder="local.enterName" v-model="param.name" read-only/>
      </a-form-model-item>
      <a-form-model-item :label="local.voteExpression">
        <a-input  v-model = "expression.expression" read-only/>
      </a-form-model-item>
    </a-form-model>
  </div>
</template>

<script>
  export default {
    name: "GeneralServiceTaskSynchRobot",
    props: {
      param: {
        type: Object,
        default: () => ({})
      },
      expression:{
        type: Object,
        default: () => ({})
      }
    },
    data() {
      return {
        local:JSON.parse(localStorage.getItem('activeLocal')),
      }
    },
    methods: {

    },
  }
</script>

<style scoped>
  .general-context {
    height: 64vh;
  }
</style>
