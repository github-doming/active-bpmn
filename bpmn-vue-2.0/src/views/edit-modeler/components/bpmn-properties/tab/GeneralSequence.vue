<template>
	<div class="general-context">
		<a-form :label-col="{ span: 5 }" :wrapper-col="{ span: 18 }">
			<a-form-item :label="local.name">
				<a-input :placeholder="local.enterName" v-model="form.name" @change="updateProperty('name')"/>
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
      }
    },
    data() {
      return {
        local:JSON.parse(localStorage.getItem('activeLocal')), form: {name: this.param.name},
      }
    },
    methods: {
      updateProperty(type) {
        this.$set(this.param, type, this.form[type]);
        this.$emit('updateGeneral', this.form);
      },
    },
  }
</script>

<style scoped>
	.general-context {
		height: 64vh;
	}
</style>
