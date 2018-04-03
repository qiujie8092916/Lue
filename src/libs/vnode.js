export default class VNode {
  constructor (...args) {
    let [tag, data, children] = args
    this.tag = tag
    this.data = data
    this.children = children
  }
}
