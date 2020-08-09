const Draggable = {
  GLOBAL_PROPS: {
    nativeDrag: { type: Boolean, default: false },    // @customize
    colSnap:    { type: Boolean, default: false },
    rowSnap:    { type: Boolean, default: false },
    lockable:   { type: Boolean, default: false },
    initialDisplay: { type: String, default: 'block' },
  },
  STATES: ['initial', 'locked', 'docked', 'hovered', 'stationary', 'beingDragged', 'dragStarted', 'dragReleased'],
  COORDS: {
    anchor: null,   // DOM Node that the Draggable Components starts life within
    initX:  null,
    initY:  null,
    x:      null,
    y:      null,
    xShift: null,
    yShift: null,
  },
  STATE_DATA: {
    dragState: 'initial',
    dragMute: false
  }

}

export default Draggable;