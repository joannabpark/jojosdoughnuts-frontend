import { React, useState } from 'react';
import SugarDoughnut from '../images/doughnut2.jpeg';
import { loginSuccess } from '../actions/user';
import { Button, Form, Segment, Modal, Message } from 'semantic-ui-react';
import { connect } from 'react-redux';
import toaster from "toasted-notes";
import "./styling.css";
import {compose} from "redux";
import { withRouter } from "react-router";
import {Link} from 'react-router-dom';

const Home = ({user, history, loginSuccess}) => {

    const [open, setOpen] = useState(false)
    const [username, setUsername] = useState("jojo");
    const [password, setPassword] = useState("123");
    const [error, setError] = useState([])

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
            setError(data.error)
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

    return(
        <>
        <div>
             <h1 style={{color:"pink", fontSize:"70px", textDecorationLine: "underline", marginRight:"30%"}}>JoJo's Doughnuts</h1>
        </div>
        <div style = {{backgroundImage: `url(${SugarDoughnut})`, marginLeft: "10%", marginTop: "25px", width: '80%', backgroundSize: '100% 100%'}}> 
            <h1 style={{color:'white', fontSize:'60px', fontFamily:'arial', paddingTop:'300px'}}>ORDER ONLINE</h1>
            {user.id ?
            <Button as={Link} to='/shop' style={{marginBottom: '300px', backgroundColor: 'pink', color:'Turquoise'}}>Begin Order</Button>
            :
            <Modal
                onClose={() => setOpen(false)}
                onOpen={() => setOpen(true)}
                open={open}
                trigger={<Button style={{marginBottom: '300px', backgroundColor: 'pink', color:'Turquoise'}}>Begin Order</Button>
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
            }
        </div>
        </>
    )
}

const mapStateToProps = (state) => {
    return {
      user: state.user
    }
  }

const mapDispatchToProps = {
    loginSuccess
  }

  export default compose(
    withRouter,
    connect(mapStateToProps, mapDispatchToProps)
  )(Home)