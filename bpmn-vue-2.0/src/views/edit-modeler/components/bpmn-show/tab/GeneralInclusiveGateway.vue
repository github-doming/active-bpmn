<template>
  <div class="general-context">
    <a-form-model ref="form" :label-col="{ span: 5 }" :wrapper-col="{ span: 18 }">
      <a-form-model-item :label="local.threshold">
        <a-input :placeholder="0" v-model="threshold.value" read-only/>
      </a-form-model-item>
    </a-form-model>
  </div>
</template>

<script>
  export default {
    name: "GeneralInclusiveGateway",
    props: {
      threshold: Object,
    },
    data() {
      return {
        local:JSON.parse(localStorage.getItem('activeLocal')),
      }
    },
  }
</script>

<style scoped>
  .general-context {
    height: 64vh;
  }
</style>
