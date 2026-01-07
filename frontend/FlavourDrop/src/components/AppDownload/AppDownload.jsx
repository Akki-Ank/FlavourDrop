import React from 'react'
import './AppDownload.css'
import { assets } from '../../assets/assets'

const AppDownload = () => {
  return (
    <div className='app-download' id ='app-download'>
        <p>For Better Experience Download Our App <br />Flavour Drop</p>
        <div className="app-download-preference"></div>
        <img src={assets.play_store} alt="" />
        <img src={assets.app_store} alt="" />
    
    
    </div>
  )
}

export default AppDownload
