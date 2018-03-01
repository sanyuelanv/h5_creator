'use strict'
import style from '../css.css'
import PropTypes from 'prop-types'
class LoadMask extends React.Component {
  static propTypes = {
    bgColor: PropTypes.string
  }
  render () {
    const bgColor = this.props.bgColor || 'rgba(0, 0, 0, 0.5)'
    return (
      <div className={style.pageMask} style={{ 'backgroundColor': bgColor }} >
        加载层
      </div>
    )
  }
}
export default LoadMask
