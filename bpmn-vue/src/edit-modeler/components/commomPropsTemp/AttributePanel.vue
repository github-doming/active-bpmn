<template>
  <section class="panel-box">

    <div :id="panelId" class="panel-title">
      <div class="panel-title-icon">
        <a-icon v-show="isShow" type="up-circle" @click="isShow=!isShow"/>
        <a-icon v-show="!isShow" type="down-circle" @click="isShow=!isShow"/>
      </div>
      <div style="float: inherit">
        <div :style="titleStyle">{{panelTitle}}</div>
      </div>
    </div>
    <div v-show="isShow" class="panel-context">
      <slot>
        <div>属性详细信息</div>
      </slot>
    </div>

    <div v-show="!isShow && hasBorder" class="panel-context">
    </div>
  </section>

</template>

<script>
  export default {
    name: "AttributePanel",
    props: {
      panelId: String,
      hasBorder: {
        type: Boolean,
        default: true,
      },
      showAttribute: {
        type: Boolean,
        default: true,
      },
      panelTitle: {
        type: String,
        default: '标题：',
      },
      titleSize: {
        type: String,
        default: 'default',
      }
    },
    computed: {
      titleStyle() {
        const style = {
          'margin-bottom': '0.5em',
          'color': 'rgba(0, 0, 0, 0.85)',
          'font-weight': '500',
        };
        if ('large' === this.titleSize) {
          style['font-size'] = '1.5em';

        } else if ('small' === this.titleSize) {
          style['margin-top']='5px';
          style['font-size'] = '1em';
        } else {
          style['margin-top']='3px';
          style['font-size'] = '1.2em';
        }
        return style;
      }
    },
    watch:{
      showAttribute(newValue){
       this.isShow = newValue;
      }
    },
    data() {
      return {
        isShow: this.showAttribute,
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
    padding: 18px 10px 12px;
  }

</style>
