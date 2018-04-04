export default class VNode {
  constructor (...args) {
    let tag, children, text
    let data = {}
    if (args.length === 2) {
      [tag, children] = args
    } else if (args.length === 3) {
      [tag, data, children] = args
    } else if (args.length === 4) {
      [tag, data, children, text] = args
    }
    this.tag = tag
    this.data = data
    this.children = children
    text && (this.text = text)
  }
}
