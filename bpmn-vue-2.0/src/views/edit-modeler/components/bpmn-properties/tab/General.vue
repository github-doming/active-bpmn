<template>
	<div class="general-context">
		<a-form-model ref="form" :rules="rules" :model="form" :label-col="{ span: 5 }" :wrapper-col="{ span: 18 }">
			<a-form-model-item :label="local.name" prop="name">
				<a-input :placeholder="local.enterName" v-model="form.name" @change="updateProperty('name')"/>
			</a-form-model-item>
		</a-form-model>
	</div>
</template>

<script>
  const propertiesType = ['name'];
  export default {
    name: "General",
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
      const local = JSON.parse(localStorage.getItem('activeLocal'));
      return {
        local, form: {name: this.param.name},
        rules: {
          name: [
            {required: true, message: local.enterName, trigger: 'blur'}
          ]
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
