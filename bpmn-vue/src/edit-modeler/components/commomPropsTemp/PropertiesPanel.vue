<template>
  <section class="panel-box">
    <div :id="panelId" class="panel-title">
      <div class="panel-title-icon">
        <a-icon v-show="isShow" type="up-circle" @click="isShow=!isShow"/>
        <a-icon v-show="!isShow" type="down-circle" @click="isShow=!isShow"/>
      </div>
      <div style="float: inherit">
        <slot name="panel-title">
          <h2>标题：</h2>
        </slot>
      </div>
    </div>
    <div v-show="isShow" class="panel-context">
      <slot name="panel-context">
        <h4>属性详细信息</h4>
      </slot>
    </div>

    <div v-show="!isShow && hasBorder" class="panel-context">
    </div>

  </section>
</template>

<script>
  export default {
    name: '',
    props: {
      panelId: String,
      hasBorder: {
        type: Boolean,
        default: true,
      }
    },
    data() {
      return {
        isShow: true,
      }
    },

  }
</script>

<style scoped>
  .panel-box {
    border: 1px solid #ebedf0;
    border-radius: 2px;
    display: inline-block;
    width: 100%;
    position: relative;
    transition: all .2s;
    margin-bottom: 20px;
  }

  .panel-title {
    position: absolute;
    top: -17px;
    padding: 1px 10px;
    margin-left: 16px;
    color: #777;
    border-radius: 2px 2px 0 0;
    background: #fff;
    width: auto;
    float: left;
  }

  .panel-title-icon {
    float: inherit;
    padding-right: 5px;
    margin-top: 8px;
  }

  .panel-context {
    margin: 10px 0 0;
    padding: 18px 24px 12px;
  }

</style>
