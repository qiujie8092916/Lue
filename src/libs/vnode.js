export default class VNode {
  constructor (tag, data = {}, text, children) {
    this.tag = tag
    this.data = data
    text && (this.text = text)
    children && (this.children = children)
  }
}/* function VNode (tag, data, text, children) {
  let ret = {
    tag,
    data: data || {}
  }
  text && (ret.text = text)
  children && (ret.children = children)
  return ret
} */
