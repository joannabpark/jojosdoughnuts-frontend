import { React, useState } from 'react';
import { Grid, Header, Button, Form, Segment } from "semantic-ui-react";
import { createUserSuccess } from "../actions/user";
import { connect } from "react-redux";
import toaster from "toasted-notes";
import "./styling.css";

const NewUser = ({history, createUserSuccess}) => {

    const [username, setUsername] = useState([])
    const [password, setPassword] = useState ([])
    const [error, setError] = useState([])
  

    const handleSubmit = (e) => {
        e.preventDefault()
        const reqObj = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({username, password})
        }

    fetch('http://localhost:3000/users', reqObj)
    .then(resp => resp.json())
    .then(data => {
      console.log(data)
        if (data.error) {
            setError(data.error)
          } else {
            createUserSuccess(data)
            toaster.notify(`hello ${data.username}!`, {
              duration: 2000
            })
            history.push('/shop')
          }
        })
    }

        return(
          <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
          <Grid.Column style={{ maxWidth: 450 }}>
            <Header as='h2' textAlign='center' style={{color:"turquoise"}}>
                Create account
                 </Header>
                 <Form size='large' onSubmit={handleSubmit}>
                  <Segment stacked>
                  { error && <h4 style={{ color: 'red'}}>{error}</h4> }
                     <Form.Input
                        icon='user'
                        iconPosition='left'
                          placeholder="username"
                          name="username"
                          onChange={(e) => setUsername(e.target.value)}
                            value={username}
                           />
                       <Form.Input
                        icon='lock'
                        iconPosition='left'
                        placeholder="password"
                         name="password"
                         type="password"
                         onChange={(e) => setPassword(e.target.value)}
                         value={password}
                        />
                  <div style={{textAlign: "center"}}>
                     <Button type="submit" style={{backgroundColor:"pink"}} fluid size='large' animated='fade'>
                         <Button.Content visible style={{ color:'turquoise'}}>Continue</Button.Content>
                         <Button.Content hidden style={{ color:'turquoise'}}><i className="long arrow alternate right icon"></i></Button.Content>
                     </Button>   
                  </div>
                  </Segment>
               </Form>
           </Grid.Column>
        </Grid>
        )
 }

 const mapDispatchToProps = {
   createUserSuccess,
  };
  
  export default connect(null, mapDispatchToProps)(NewUser);