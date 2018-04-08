import VNode from './vnode'
import Dep from './dependency'

let _ = new WeakMap()

class Lue {
  constructor (options) {
    _.set(this, options)
    this.$el = document.querySelector(options.el)
    this.$methods = options.methods
    this.$data = options.data
    this._proxy() // proy this.some = this.$data.some
    this._observer()
    window.vnode = this._watch(this._render, this._update)
  }
  _observer (cb) {
    Object.keys(this.$data).forEach(key => this._convert(key, this.$data[key]))
  }
  _convert (key, val) {
    const dep = new Dep()
    Object.defineProperty(this.$data, key, {
      configurable: true,
      enumerable: true,
      get: () => {
        if (Dep.target) {
          dep.add(Dep.target)
        }
        return val
      },
      set: (newVal) => {
        if (newVal === val) {
          return
        }
        val = newVal
        dep.notify(this)
      }
    })
  }
  _watch (exp, cb) {
    Dep.target = cb
    return exp.apply(this)
  }
  _update () {
    let vnode = this._render.apply(this)
    console.log(vnode)
    return vnode
  }
  _render () {
    return _.get(this).render ? _.get(this).render.call(this, this.__h__) : undefined
  }
  __h__ (tag, attr, children) {
    if (Array.isArray(children)) {
      return new VNode(tag, attr, undefined, children.map(child => {
        if (typeof child === 'string') {
          return new VNode(undefined, undefined, child)
        } else {
          return child
        }
      }))
    }
  }
  __toString__ (val) {
    return val === null ? '' : typeof val === 'object' ? JSON.stringify(val, null, 2) : String(val)
  }
  _proxy () {
    Object.keys(this.$data).forEach(key => {
      Object.defineProperty(this, key, {
        configurable: true,
        enumerable: true,
        get: () => {
          return this.$data[key]
        },
        set: (newVal) => {
          this.$data[key] = newVal
        }
      })
    })
  }
}
window.Dep = Dep
export default Lue
