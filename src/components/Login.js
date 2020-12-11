// import { loginSuccess } from '../actions/user';
// import { Button, Form, Grid, Header, Segment } from 'semantic-ui-react';
// import { connect } from 'react-redux';
// import { React, prevState, useState } from 'react';
 
// const Login = () => {

//     const [userState, setUserState] = useState({
//         username: 'jojo', 
//         password: '123', 
//         error: null
//     })

//     const handleInputChange = (e) => {
//         const {id, value} = e.target
//         setUserState(prevState ({
//             ...prevState,
//             [id] : value
//         }))
//       }
    
//       const handleSubmit = (e) => {
//         e.preventDefault()
//           const reqObj = {
//             method: 'POST',
//             headers: {
//               'Content-Type': 'application/json'
//             },
//             body: JSON.stringify(userState)
//           }
          
//           fetch('http://localhost:3000/users/login', reqObj)
//           .then(resp => resp.json())
//           .then(data => {
//             //   console.log(data)
//             if (data.error) {
//               setUserState({
//               error: data.error
//             })
//             } else {
//               localStorage.setItem('app_token', data.token)
//               loginSuccess(data.user)
//             //   toaster.notify(`welcome ${data.user.first_name}!`, {
//             //     duration: 2000
//             //   })
//             // history.push('/shop')
//           }
//         })
//       }
 
//     return (
//         <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
//             <Grid.Column style={{ maxWidth: 450 }}>
//             <Header as='h2' color='pink' textAlign='center'>
//                {/* <Image src='/logo.png' />  */}
//                Log-in to your account
//              </Header>
//               <Form size='large' onSubmit={handleSubmit}>
//               <Segment stacked>
//                   <Form.Input fluid
//                       icon='user'
//                       iconPosition='left'
//                        type="text" 
//                       placeholder="username"
//                        name={'username'} onChange={handleInputChange} value={userState.username} 
//                   />
//                   <Form.Input fluid
//                        icon='lock'
//                        iconPosition='left'
//                       type="password" 
//                        name={'password'} onChange={handleInputChange} value={userState.password} 
//                        placeholder="password" 
//                  />
//                       <Button color='pink' fluid size='large' animated='fade'>
//                          <Button.Content visible style={{ color: 'lightgrey'}}><i aria-hidden="true" className="sign in icon"></i></Button.Content>
//                          <Button.Content hidden style={{ color: 'lightgrey'}}>login</Button.Content>
//                      </Button>         
//                    </Segment>
//                  </Form>
//                </Grid.Column>
//         </Grid>
//     );
// }

// const mapDispatchToProps = {
//     loginSuccess
//   }
  
//   export default connect(null, mapDispatchToProps)(Login)