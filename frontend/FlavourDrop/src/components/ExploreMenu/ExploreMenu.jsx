import React, { useState } from 'react'
import './ExploreMenu.css'
import {menu_list} from "../../assets/assets"

const ExploreMenu = ({category , setCategory}) => {


  return (
    <div>
      <div className="explore-menu" id='explore-menu'>
        <h2>Explore Menu Component</h2>
          <p className='explore-menu-text'>Explore the menu items here and enjoy Delicious food at home</p>
          <div className="explore-menu-list">
            {menu_list.map((item, index) => {
              return (
                <div onClick={() => setCategory(prev => prev === item.menu_name ? "All" : item.menu_name)} key={index} className="explore-menu-list-item">
                  <img className={category === item.menu_name ? "active" : ""} src={item.menu_image} alt={item.menu_name} />
                  <p>{item.menu_name}</p>
                </div>
            )})}

          </div>
          <hr />
      </div>
    </div>
  )
}

export default ExploreMenu
