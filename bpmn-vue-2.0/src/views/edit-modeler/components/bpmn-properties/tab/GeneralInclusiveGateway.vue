<template>
  <div class="general-context">
    <a-form-model ref="form" :label-col="{ span: 5 }" :wrapper-col="{ span: 18 }">
      <a-form-model-item :label="local.threshold">
        <a-input :placeholder="0" v-model="threshold.value" @change="mutexValue('threshold')"/>
      </a-form-model-item>
      <a-form-model-item :label="local.voteExpression">
        <a-input  v-model = "expression.expression" @change="mutexValue('expression')"/>
      </a-form-model-item>
    </a-form-model>
  </div>
</template>

<script>
  export default {
    name: "GeneralInclusiveGateway",
    props: {
      threshold: Object,
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
      mutexValue(type){
        if(type === 'threshold'){
          this.expression.expression = '';
        } else {
          this.threshold.value = '';
        }
      }
    }
  }
</script>

<style scoped>
  .general-context {
    height: 64vh;
  }
</style>
