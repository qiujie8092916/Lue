import Lue from './libs/lue'
const lue = new Lue({  //eslint-disable-line
  name: 'App',
  el: '#app',
  render (h) {
    return h('div', {
      id: 'app'
    }, [
      'I am div',
      h('span', {}, [this.text])
    ])
  },
  data: {
    classObject: {
      this_is_true: true,
      this_is_false: false
    },
    text: 'hello world',
    textarea: 'this is textarea'
  },
  methods: {
    clickButton () {
      console.log(arguments)
    }
  }
})
setTimeout(function () {
  lue.text = '你好世界'
}, 3000)

window.lue = lue
export default lue
