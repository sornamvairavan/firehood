import './PageNotFound.css'
import logo from '../../images/logo.png'

export default function PageNotFound() {
  return (
    <div className="page-not-found-container">
      <img src={logo} alt="logo" className='pnf-logo'></img>
      <h2 className='pnf'>Page Not Found</h2>
    </div>
  )
}