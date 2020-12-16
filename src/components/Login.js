import { loginSuccess } from '../actions/user';
import { Button, Form, Grid, Header, Segment } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { React, useState } from 'react';
import toaster from "toasted-notes";
import "./styling.css";
import {compose} from "redux";
import { withRouter } from "react-router";
 
const Login = ({history, loginSuccess}) => {

    const [username, setUsername] = useState("jojo");
    const [password, setPassword] = useState("123");

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
 
    return (
        <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
            <Grid.Column style={{ maxWidth: 450 }}>
            <Header as='h2' color='pink' textAlign='center'>
               {/* <Image src='/logo.png' />  */}
               Log-in to your account
             </Header>
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
                      <Button color='pink' fluid size='large' animated='fade' disabled={!validateForm()}>
                         <Button.Content visible style={{ color: 'lightgrey'}}><i aria-hidden="true" className="sign in icon"></i></Button.Content>
                         <Button.Content hidden style={{ color: 'lightgrey'}}>login</Button.Content>
                     </Button>         
                   </Segment>
                 </Form>
               </Grid.Column>
        </Grid>
    );
}

// const mapStateToProps = (state) => {
//     return {
//         user: state.user
//     }
// }

const mapDispatchToProps = {
    loginSuccess
  }
  
  export default compose(
    withRouter,
    connect(null, mapDispatchToProps)
  )(Login)