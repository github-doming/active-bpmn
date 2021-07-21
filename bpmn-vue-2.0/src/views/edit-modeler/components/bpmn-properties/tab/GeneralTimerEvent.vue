<template>
  <div class="general-context">
    <a-form-model ref="form" :label-col="{ span: 5 }" :wrapper-col="{ span: 18 }">
      <a-form-model-item label="等待">
        <a-input-number :placeholder="local.enterName" :min="0" v-model:value="day" @blur="changeTime()"/>
        天，
        <a-input-number :placeholder="local.enterName" :min="0" :max="59" v-model:value="minute" @blur="changeTime()"/>
        小时，
        <a-input-number :placeholder="local.enterName" :min="0" :max="59" v-model:value="second" @blur="changeTime()"/>
        分钟，
      </a-form-model-item>
    </a-form-model>
  </div>
</template>

<script>
  export default {
    name: "GeneralTimerEvent",
    props: {
      timerEvent: {
        type: Object,
        default: () => ({})
      }
    },
    watch: {
      timerEvent(newValue) {
        this.initTimeDuration(newValue.timeDuration.body);
      }
    },
    data() {
      const local = JSON.parse(localStorage.getItem('activeLocal'));
      return {
        local, day: null, minute: null, second: null,
      }
    },
    created() {
      this.initTimeDuration(this.timerEvent.timeDuration.body);
    },
    methods: {
      initTimeDuration(number) {
        if (number) {
          number = parseInt(number.slice(2, -1));
        } else {
          number = 0;
        }
        this.day = parseInt(number / (24 * 60 * 60));
        this.minute = parseInt(number / (60 * 60)) % 24;
        this.second = parseInt(number / 60) % (60);
      },
      changeTime() {
        this.timerEvent.timeDuration.body = 'PT' + (24 * 60 * 60 * this.day + 60 * 60 * this.minute + 60 * this.second) + 'S';
      }

    }
  }
</script>

<style scoped>
  .general-context {
    height: 64vh;
  }
</style>
