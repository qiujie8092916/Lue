import VNode from './vnode'

let _ = new WeakMap()

class Lue {
  constructor (options) {
    _.set(this, options)
    this.$el = document.querySelector(options.el)
    this.$methods = options.methods
    this.$data = options.data
    this._proxy() // proy this.some = this.$data.some
    this._observer()
    let vnode = this._update()
    console.log(JSON.stringify(vnode, null, 2))
  }
  _observer (cb) {
    Object.keys(this.$data).forEach(key => this._convert(key, this.$data[key]))
  }
  _convert (key, val) {
    Object.defineProperty(this.$data, key, {
      configurable: true,
      enumerable: true,
      get: () => val,
      set: (newVal) => {
        if (newVal !== val) {
          val = newVal
        }
        this._update()
      }
    })
  }
  _update () {
    return this._render.apply(this)
  }
  _render () {
    return _.get(this).render ? _.get(this).render.call(this, this.__h__) : undefined
  }
  __h__ (...args) {
    let children = args.pop()
    if (Array.isArray(children)) {
      /* return  */children.forEach(child => {
        if (typeof child === 'string') {
          return this.__h__(undefined, undefined, undefined, child)
        } else {
          return this.__h__(...args, child)
        }
      })
    } else {
      return new VNode(...args, children)
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

export default Lue
