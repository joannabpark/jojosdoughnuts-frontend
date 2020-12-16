import React from 'react';
import { Menu, Button, Form, Segment, Modal, Message } from 'semantic-ui-react';
import { useState } from 'react';
import {Link} from 'react-router-dom';
import { withRouter } from "react-router";
import { connect } from 'react-redux';
import {compose} from "redux";
import { logoutSuccess } from '../actions/user';
import { loginSuccess } from '../actions/user';
import toaster from "toasted-notes";
import "./styling.css";

const NavBar = ({history, loginSuccess, logoutSuccess, user, location}) => {

    const [open, setOpen] = useState(false)
    const [username, setUsername] = useState("jojo");
    const [password, setPassword] = useState("123");
    const [menuState, setMenuState] = useState({})

    const handleItemClick = (e, { name }) => {
        setMenuState({ activeItem: name })
    }

    const { activeItem } = menuState

    function validateForm() {
      return username.length > 3 && password.length > 2;
    }

  const handleSubmit = (e) => {
      //   debugger
      e.preventDefault()
        const reqObj = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({username, password})
        }
        
        fetch('http://localhost:3000/users/login', reqObj)
        .then(resp => resp.json())
        .then(data => {
            console.log(data)
          if (data.error) {
            setUsername({
            error: data.error
          })
          } else {
            localStorage.setItem('app_token', data.token)
            loginSuccess(data.user)
            console.log(data.user)
            toaster.notify(`welcome ${data.user.username}!`, {
              duration: 2000
            })
            history.push('/shop')
        }
      })
    }

    const handleLogout = () => {
      setOpen(false)
      logoutSuccess()
      localStorage.removeItem('app_token')
    }

    if (location.pathname === "/") {
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
        {user.id ? 
        <Menu.Item
          name='View My Orders'
          active={activeItem === 'View My Orders'}
          onClick={handleItemClick}
          as={Link}
          to={'/order'}
        >
          View My Orders
        </Menu.Item>
        : null}
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
        {!user.id ?
        <Modal
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
        trigger={<Menu.Item
          name='login'
          action={activeItem === 'login'}
          >
          Login
          </Menu.Item>
        }>
            <Modal.Header as='h2' style={{color:"turquoise"}}>
               Log-in to your account
             </Modal.Header>
             <Modal.Content>
            <Form size='large' onSubmit={handleSubmit}>
              <Segment stacked>
                  <Form.Input fluid
                      icon='user'
                      iconPosition='left'
                       type="text" 
                      placeholder="username" 
                       onChange={(e) => setUsername(e.target.value)}
                       value={username} 
                  />
                  <Form.Input fluid
                       icon='lock'
                       iconPosition='left'
                      type="password" 
                       onChange={(e) => setPassword(e.target.value)} 
                       value={password} 
                       placeholder="password" 
                 />
                      <Button style={{backgroundColor:"pink"}} fluid size='large' animated='fade' disabled={!validateForm()}>
                         <Button.Content visible style={{ color: 'turquoise'}}><i aria-hidden="true" className="sign in icon"></i></Button.Content>
                         <Button.Content hidden style={{ color: 'turquoise'}}>login</Button.Content>
                     </Button>         
                   </Segment>
                 </Form>
                 <Message> New to us? <a href='/signup'>Sign Up</a>
                </Message>
            </Modal.Content>
          </Modal>
          :
          <Menu.Item
          onClick={handleLogout}
          name='logout'
          action={activeItem === 'logout'}
          as={Link}
          to={'/shop'}
          >
          Logout
          </Menu.Item>
         }
      </Menu>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

const mapDispatchToProps = {
  logoutSuccess,
  loginSuccess
}

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(NavBar);