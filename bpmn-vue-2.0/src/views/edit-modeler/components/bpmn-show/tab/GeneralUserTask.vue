<template>
	<div class="general-context">
		<a-form-model ref="form":model="form" :label-col="{ span: 5 }" :wrapper-col="{ span: 18 }">
			<a-form-model-item :label="local.name" prop="name">
				<a-input v-model="form.name" read-only/>
			</a-form-model-item>
			<a-form-model-item :label="local.taskFormTemplate">
				<a-select v-model="activity.taskFormTemplate"  :open="false">
					<a-select-option v-for="item in template" :key="item">
						{{item}}
					</a-select-option>
				</a-select>
			</a-form-model-item>
			<a-form-model-item :label="local.signingRequired" >
				<a-switch :checked="activity.signingRequired"/>
			</a-form-model-item>
		</a-form-model>
	</div>
</template>

<script>
  const propertiesType = ['name'];
  export default {
    name: "GeneralUserTask",
    props: {
      param: {
        type: Object,
        default: () => ({})
      },
      activity: {
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
        local, template: JSON.parse(localStorage.getItem('activeTemplate')), form: {
          name: this.param.name,
          taskFormTemplate: this.param.taskFormTemplate,
          signingRequired: this.param.signingRequired,
        },

      }
    },

  }
</script>

<style scoped>
	.general-context {
		height: 64vh;
	}
</style>
