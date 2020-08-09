<template lang="pug">
.__draggable_wrapper(
  ref="wrapper"
  :draggable="nativeDrag"
  @mousedown="dragStart"
  @mouseup="dragRelease"
  @mousemove="onDrag"
  @mouseenter="onMouseEnter"
  @mouseleave="onMouseLeave"
)
  .__draggable_controls(v-if="showControls")
    button ≡
    button(@click="resetToInitial") ←

  .__draggable_debug(v-if="debug")
    div initialDisplay : {{ initialDisplay }}
    div(v-for="k in Object.keys(dataKeysComplete)")
      div {{ dataKeysComplete[k] }} : {{ getStateVal(k) }}

  slot
</template>

<script>
import Draggable from '@/interfaces/Draggable';

export default {
  props: {
    ...Draggable.GLOBAL_PROPS
  },
  data(){
    return {
      debug: true,
      ...Draggable.STATE_DATA,
      ...Draggable.COORDS,
    }
  },
  methods: {
    dragStart(){
      if(this.dragMute) return;
      console.log(`MOUSEDOWN ${this._uid}`);

      this.dragState = 'beingDragged';
      this.positionControl('absolute');
      this.xShift = event.x - this.wrapper.offsetLeft;
      this.yShift = event.y - this.wrapper.offsetTop;
    },
    dragRelease(){
      if(this.dragMute) return;
      console.log(`MOUSEUP ${this._uid}`);

      this.dragState = 'hovered';
      // this.positionControl('absolute');

      this.xShift = null;
      this.yShift = null;
    },
    onDrag(){
      const eventStartY = this.wrapper.offsetTop;

      if(!this.isBeingDragged || this.dragMute) return;
      // console.log(`DRAGGING ${this._uid}`);

      this.x = (event.x - this.xShift);
      this.y = (event.y - this.yShift);
      this.positionUpdate();

      // if(this.nativeDrag){} else { }
    },
    onMouseEnter(){
      this.dragState = 'hovered'
    },
    onMouseLeave(){
      this.dragState = 'stationary'
    },
    displayControl(value){ this.wrapper.style.display = value; },
    positionControl(value){ this.wrapper.style.position = value; },
    positionUpdate(){
      this.wrapper.style.left = this.x.toString() + "px";
      this.wrapper.style.top = this.y.toString() + "px";
    },
    resetToInitial(){
      this.dragMute = true;
      event.stopPropagation();
      // event.preventDefault();
      this.x = this.initX;
      this.y = this.initY;
      this.displayControl(this.initialDisplay);
      this.dragState = 'initial';
      // this.dragMute = false;

      // this.displayControl(this.anchor)
    },

    getStateVal(key) { return this[this.dataKeysComplete[key]]; }
  },
  mounted(){
    this.initX = this.wrapper.offsetLeft;
    this.initY = this.wrapper.offsetTop;
    this.x = this.initX;
    this.y = this.initY;
    this.anchor = this.wrapper.parentElement;
  },
  computed: {
    wrapper(){ return this.$refs.wrapper; },
    isBeingDragged(){ return (this.dragState == "beingDragged"); },
    showControls(){ return (["hovered", "beingDragged"].includes(this.dragState)); },
    dataKeysComplete(){ return Object.keys(this.$data); },
  },

}
</script>

<style lang="scss" scoped>
.__draggable_wrapper {
  &:hover {
    border: 1px solid red;
  }

  .__draggable_controls {
    cursor: grab;
    color: red;
    background-color: darkred;
    position: relative;
    display: block;
    text-align: left;
    width: 100%;
    padding-left: 4px;
  }

  .__draggable_debug {
    z-index: 100;
    text-align: left;
    width: fit-content;
    color: red;
    border: 1px solid red;
    padding: 2px;
    // float: right;
    position: absolute;
    left: 100%;
    bottom: 0
  }

}
</style>