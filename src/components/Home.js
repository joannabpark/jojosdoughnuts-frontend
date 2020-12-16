import React from 'react'
import SugarDoughnut from '../images/doughnut2.jpeg'
import { Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

const Home = (props) => {

    return(
        <>
        <div>
             <h1 style={{color:"pink", fontSize:"70px", textDecorationLine: "underline", marginRight:"30%"}}>JoJo's Doughnuts</h1>
        </div>
        <div style = {{backgroundImage: `url(${SugarDoughnut})`, marginLeft: "10%", marginTop: "25px", width: '80%', backgroundSize: '100% 100%'}}> 
            <h1 style={{color:'white', fontSize:'60px', fontFamily:'arial', paddingTop:'300px'}}>ORDER ONLINE</h1>
            <Button as={Link} to='/login' style={{marginBottom: '300px', backgroundColor: 'pink', color:'Turquoise'}}>Begin Order</Button>
        </div>
        </>
    )
}

export default Home