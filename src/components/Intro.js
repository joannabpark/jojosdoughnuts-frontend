import React from 'react'
import { Button } from 'semantic-ui-react'
import PastelDoughnut from '../images/doughnut1.jpeg'
import { Link } from 'react-router-dom'

const Intro = () => {
    return(
        <div style = {{backgroundImage: `url(${PastelDoughnut})`, backgroundSize: '100% 100%', height: "945px"}}>
            <Button as={Link} to='/home' animated='fade' style={{position: 'fixed', backgroundColor: 'white', color: 'PaleTurquoise', width: '80px', marginTop: "200px"}}>
                <Button.Content visible style={{textAlign: 'center',}}>Enter</Button.Content>
                <Button.Content hidden style={{color: 'floralwhite', marginTop:"-17px"}}><img src="https://img.icons8.com/cotton/64/000000/doughnut.png" style={{width:"35px", height:"35px"}}/></Button.Content>
             </Button>
        </div>
    )
}

export default Intro