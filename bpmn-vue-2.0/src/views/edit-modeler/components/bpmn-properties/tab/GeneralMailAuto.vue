<template>
  <div class="general-context">
    <a-form-model ref="form" :rules="rules" :model="form" :label-col="{ span: 5 }" :wrapper-col="{ span: 18 }">
      <a-form-model-item :label="local.name" prop="name">
        <a-input :placeholder="local.enterName" v-model="form.name" @change="updateProperty('name')"/>
      </a-form-model-item>
      <a-form-model-item :label="local.responsibleRole" prop="responsibleRole">
        <a-select v-model="general.roleCode" >
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
      general:{
        type: Object,
        default: () => ({})
      },element: {
        type: Object,
        default: () => ({})
      }
    },
    watch: {
      general(newValue) {
        console.log(newValue)
      },
    },
    data() {
      const local = JSON.parse(localStorage.getItem('activeLocal'));
      let form = {};
      propertiesType.forEach(type => form[type] = this.param[type]);
      return {
        local, roles: JSON.parse(localStorage.getItem('activeRoles')), form,
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
        this.$emit('updateGeneral', properties);
      }
    },
  }
</script>

<style scoped>
  .general-context {
    height: 64vh;
  }
</style>
