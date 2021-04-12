import CustomContextPad from './CustomContextPad'
import CustomPalette from './CustomPalette'
import CustomRenderer from './CustomRenderer'

export default {
  __init__: ['contextPadProvider', 'customPalette', 'customRenderer'],
  contextPadProvider: ['type', CustomContextPad],
  customPalette: ['type', CustomPalette],
  customRenderer: ['type', CustomRenderer]
}
