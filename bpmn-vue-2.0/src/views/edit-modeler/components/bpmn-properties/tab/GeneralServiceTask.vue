<template>
	<div class="general-context">
		<a-form-model ref="form" :rules="rules" :model="form" :label-col="{ span: 5 }" :wrapper-col="{ span: 18 }">
			<a-form-model-item :label="local.name" prop="name">
				<a-input :placeholder="local.enterName" v-model="form.name" @change="updateProperty('name')"/>
			</a-form-model-item>
			<a-form-model-item :label="local.clazz" prop="class">
				<a-input :placeholder="local.enterClass" v-model="form['activiti:class']" @change="updateProperty('activiti:class')"/>
			</a-form-model-item>
		</a-form-model>
	</div>
</template>

<script>
  const propertiesType = ['name','class',];
  export default {
    name: "GeneralServiceTask",
    props: {
      param: {
        type: Object,
        default: () => ({})
      },
    },
    watch: {
      param(newValue) {
        const that = this;
        propertiesType.forEach(type => that.form[type] = newValue[type]);
      }
    },
    data() {
      const local = JSON.parse(localStorage.getItem('activeLocal'));
      return {
        local, form: {name: this.param.name,'activiti:class': this.param['activiti:class']},
        rules: {
          name: [
            {required: true, message: local.enterName, trigger: 'blur'}
          ],class: [
            {required: true, message: local.enterClass, trigger: 'blur'}
          ],
        }
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
