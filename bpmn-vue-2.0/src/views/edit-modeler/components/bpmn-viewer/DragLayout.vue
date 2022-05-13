<template>
	<div class="drag-layout-box" ref="box">
		<div v-if="$slots.top" :style="topStyle" class="top-box" ref="topDom">
			<slot name="top"></slot>
		</div>
		<div id="line" ref="moveDom" class="drag-line" :style="lineStyle"/>
		<div v-if="$slots.bottom" :style="bottomStyle" class="bottom-box" ref="bottomDom">
			<slot name="bottom"></slot>
		</div>
	</div>
</template>

<script>
  export default {
    name: 'DragLayout',
    props: {
      minTopHeight: {
        type: String,
        default: '100'
      }, minBottomHeight: {
        type: String,
        default: '100'
      }, linePos: {
        type: String,
        default: '60'
      }
    },
    computed: {
      topStyle() {
        let style = {};
        style['min-height'] = this.minTopHeight + 'px';
        style['height'] = this.linePos + '%';
        return style;
      }, bottomStyle() {
        let style = {};
        style['min-height'] = this.minBottomHeight + 'px';
        style['height'] = (100 - this.linePos * 1 + 2) + '%';
        return style;
      }, lineStyle() {
        let style = {};
        style['top'] = this.linePos + '%';
        return style;
      },
    },
    methods: {
      moveHandle(nTop, bottomHeight) {
        this.$refs.topDom.style.height = nTop + 'px';
        this.$refs.bottomDom.style.height = bottomHeight - 5 + 'px';
      }
    },
    mounted() {
      this.topDom = this.$refs.topDom;
      const that = this;
      const moveDom = document.getElementById('line');
      let /*x = 0,*/ y = 0,/* left = 0, */top = 0, isDown = false;
      moveDom.onmousedown = function (ed) {
        //获取x坐标和 y坐标
        // x = ed.clientX;
        y = ed.clientY;

        //获取左侧和顶部的偏移量
        // left = moveDom.offsetLeft;
        top = moveDom.offsetTop;

        //开关打开
        isDown = true;

        //设置样式
        window.onmousemove = function (em) {
          if (isDown === false) {
            return;
          }
          //获取x 和y
          // const nx = em.clientX;
          const ny = em.clientY;

          //获取移动后的左偏移量和顶部偏移量
          // const nLeft = nx - (x - left);
          const nTop = ny - (y - top);

          if (nTop < that.minTopHeight) {
            return;
          }

          const boxOffsetHeight = that.$refs.box.offsetHeight;
          if (boxOffsetHeight - nTop < that.minBottomHeight) {
            return;
          }
          let bottomHeight = boxOffsetHeight - nTop;
          that.moveHandle(nTop, bottomHeight);

          // moveDom.style.left = nLeft+'px';
          moveDom.style.top = nTop + 'px';

        };
        //鼠标抬起事件
        window.onmouseup = function () {
          isDown = false;
          window.onmousemove = null;
          window.onmousedown = null;
          window.onmouseup = null;
        }
      }
    },
    watch: {
      $route() {
        window.onmousemove = null;
        window.onmousedown = null;
        window.onmouseup = null;
      }
    }
  }
</script>

<style scoped>
	.drag-layout-box {
		width: 100%;
		height: 100%;
		margin-left: 0;
		padding: 0;
		position: relative;
	}

	.drag-line {
		height: 5px;
		width: 100%;
		background: #d6d6d6;
		cursor: row-resize;
		position: absolute;
	}

	.top-box {
		overflow-y: auto;
		position: relative;
	}

	.bottom-box {
		margin-top: 5px;
		position: relative;
		height: 38%;
		overflow-y: auto;

	}

	/*滚动条*/
	::-webkit-scrollbar {
		width: 5px;
		height: 5px;
		background: transparent;
		border-radius: 5px;
	}

	/*滚动条两端按钮*/
	::-webkit-scrollbar-button {
		width: 0;
		height: 0;
	}

	/*外层轨道*/
	::-webkit-scrollbar-track {
		border-radius: 5px;
	}

	/*内层轨道，他会覆盖外层轨道的样式*/
	::-webkit-scrollbar-track-piece {
		width: 4px;
		margin: 0 -2px 0;
	}

	/*滑块*/
	::-webkit-scrollbar-thumb {
		background-color: #ccc;
		min-height: 60px;
		min-width: 60px;
		border-radius: 5px;
	}

	/*纵向滑块悬浮*/
	::-webkit-scrollbar-thumb:vertical:hover {
		background-color: #333;
	}

	/*横向滑块悬浮*/
	::-webkit-scrollbar-thumb:horizontal:hover {
		background-color: #333;
	}


</style>
