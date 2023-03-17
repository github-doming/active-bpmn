<template>
	<div class="general-context">
		<a-form-model ref="form" :rules="rules" :model="form" :label-col="{ span: 5 }" :wrapper-col="{ span: 18 }">
			<a-form-model-item :label="local.name" prop="name">
				<a-input :placeholder="local.enterName" v-model="form.name" @change="updateProperty('name')"/>
			</a-form-model-item>
			<a-form-model-item :label="local.responsibleRole">
				<a-select v-model="selectName">
					<a-select-option v-for="item in roles" :key="item.roleCode">
						{{item.roleName}}
					</a-select-option>
				</a-select>
			</a-form-model-item>
		</a-form-model>
	</div>
</template>

<script>

    const propertiesType = ['name'];
    export default {
        name: "GeneralMailAuto",
        props: {
            param: {
                type: Object,
                default: () => ({})
            },
            general: {
                type: Object,
                default: () => ({})
            }, element: {
                type: Object,
                default: () => ({})
            }
        },
        watch: {
          selectName(newValue) {
            this.general.roleCode = newValue;
            },
        },

        data() {
            const local = JSON.parse(localStorage.getItem('activeLocal'));
            const roles = JSON.parse(localStorage.getItem('activeRoles'));
            var selectName = '';
            for (var i = 0; i < roles.length; i++) {
              if(roles[i].roleCode === this.general.roleCode){
                selectName = roles[i].roleName;
                break;
              }
            }
            let form = {};
            propertiesType.forEach(type => form[type] = this.param[type]);
            return {
                local, roles: roles, form,selectName:selectName,
                rules: {
                    name: [
                        {required: true, message: local.enterName, trigger: 'blur'}
                    ]
                }
            }
        },
        methods: {
            updateProperty(type) {
                let properties = {};
                properties[type] = this.form[type];
                this.$emit('updateMailGeneral', properties);
            }
        },
    }
</script>

<style scoped>
	.general-context {
		height: 64vh;
	}
</style>
