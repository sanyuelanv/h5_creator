import Page from './app'
import Load from '../../component/load'
import globalsCss from '../../globals/css.css'
class App extends React.Component {
  render () {
    return (
      <div className={globalsCss.container} >
        <div className={globalsCss.main}>
          <Page/>
        </div>
        <Load />
      </div>
    )
  }
}
export default App

window.onload = function () {
  ReactDom.render(<App />, document.getElementById('app'))
}
