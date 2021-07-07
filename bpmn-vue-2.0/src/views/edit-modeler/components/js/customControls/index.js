import CustomContextPad from './CustomContextPad'
import CustomPalette from './CustomPalette'
import CustomRenderer from './CustomRenderer'

export default {
  __init__: ['contextPadProvider','customPalette','customRenderer'],
  //设置Tip的展示信息 - 名字必须不能修改
  contextPadProvider: ['type', CustomContextPad],
  //设置工具栏的展示信息 - 名字必须不能修改
  customPalette: ['type', CustomPalette],
  //设置节点信息
  customRenderer: ['type', CustomRenderer],
}
