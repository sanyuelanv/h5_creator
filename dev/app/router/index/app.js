'use strict'
import style from './css.css'
class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      text: '主页'
    }
  }
  componentWillMount () {
    console.log(111)
  }
  componentDidMount () {
    console.log(222)
    // this.setState({ text: '主页渲染结束' })
  }

  render () {
    return (
      <div className={style.container} >
        <div className={style.main}>{ this.state.text }</div>
      </div>
    )
  }
}
export default App
