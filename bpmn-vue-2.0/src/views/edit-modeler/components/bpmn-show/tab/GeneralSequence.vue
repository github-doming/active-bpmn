<template>
  <div class="general-context">
    <a-form :label-col="{ span: 5 }" :wrapper-col="{ span: 18 }">
      <a-form-item :label="local.name">
        <a-input v-model="form.name" read-only/>
      </a-form-item>
      <a-form-item :label="local.condition">
        <a-textarea v-model="form.condition" :rows="3" read-only/>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
  const propertiesType = ['name'];
  export default {
    name: "GeneralSequence",
    props: {
      param: {
        type: Object,
        default: () => ({})
      }
    },
    watch: {
      param(newValue) {
        const that = this;
        propertiesType.forEach(type => that.form[type] = newValue[type]);
        if (this.param.conditionExpression) {
          this.form.condition = this.param.conditionExpression.body;
        } else {
          this.form.condition = "";
        }
      }
    },
    data() {
      let condition = "";
      if (this.param.conditionExpression) {
        condition = this.param.conditionExpression.body;
      }
      return {
        local: JSON.parse(localStorage.getItem('activeLocal')), form: {name: this.param.name, condition: condition},
      }
    },
  }
</script>

<style scoped>
  .general-context {
    height: 64vh;
  }
</style>
