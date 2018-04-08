export default class VNode {
  constructor (tag, data = {}, text, children) {
    this.tag = tag
    this.data = data
    text && (this.text = text)
    children && (this.children = children)
  }
}
