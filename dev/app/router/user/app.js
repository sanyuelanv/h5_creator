'use strict'
import style from './css.css'
class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      text: '用户页面'
    }
  }
  componentDidMount () {
    this.setState({ text: '用户页面渲染结束' })
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
