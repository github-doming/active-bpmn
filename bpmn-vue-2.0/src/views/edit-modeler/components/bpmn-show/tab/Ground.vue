<template xmlns="http://www.w3.org/1999/html">
  <div class="general-context">
    <a-form-model :label-col="{ span: 5 }" :wrapper-col="{ span: 18 }">
      <a-form-model-item :label="local.name">
        <label>{{ ground }}</label>
      </a-form-model-item>
    </a-form-model>
  </div>
</template>

<script>
export default {
  name: "Ground",
  props: {
    param: {
      type: Object,
      default: () => ({})
    },
  },
  data() {
    const local = JSON.parse(localStorage.getItem('activeLocal'));
    return {local, ground: local.ground}
  },
  methods: {},
}
</script>

<style scoped>
.general-context {
  height: 64vh;
}
</style>
