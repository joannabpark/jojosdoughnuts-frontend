import React from 'react'
import { Menu } from 'semantic-ui-react'
import { useState } from 'react'
import {Link} from 'react-router-dom'
import { withRouter } from "react-router";

const NavBar = (props) => {
    const [menuState, setMenuState] = useState({})

    const handleItemClick = (e, { name }) => {
        setMenuState({ activeItem: name })
    }

    const { activeItem } = menuState

    if (props.location.pathname === "/") {
        return false
    } else {

    return(
        <Menu>
        <Menu.Item
          name='home'
          active={activeItem === 'home'}
          onClick={handleItemClick}
          as={Link}
           to={'/home'}
        >
           <i aria-hidden="true" className="home icon"></i>Home
        </Menu.Item>

        <Menu.Item
          name='shop'
          active={activeItem === 'shop'}
          onClick={handleItemClick}
          as={Link}
          to={'/shop'}
        >
          <img src="https://img.icons8.com/ios/50/000000/doughnut.png" style={{paddingRight:"4px", width:"23px"}}/> Shop
        </Menu.Item>

        <Menu.Item
          position="right"
          name='cart'
          active={activeItem === 'cart'}
          onClick={handleItemClick}
          as={Link}
          to={'/cart'}
        >
          <i className="shopping cart icon"></i>Cart
        </Menu.Item>
      </Menu>
    )
    }
}

export default withRouter(NavBar);