export default class Dep {
  constructor () {
    this.subs = []
  }
  add (cb) {
    this.subs.push(cb)
  }
  notify (vm) {
    this.subs.forEach(sub => sub.apply(vm))
  }
}
Dep.target = null
