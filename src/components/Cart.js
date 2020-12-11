import React from 'react';
import { connect } from 'react-redux';
import { Grid, Container, Button, Form } from 'semantic-ui-react';
import CartDoughnuts from './CartDoughnuts';

const Cart = ({order_items}) => {

    const renderOrder = () => {
        let donutArr = order_items.map(donuts => donuts.doughnut)
        return donutArr.map((doughnut) => (
            <CartDoughnuts key={doughnut.id} doughnut={doughnut} />
        ))
    }

    return(
        <>
        <h1 style={{color:"pink", fontSize:"70px", textDecorationLine:"underline", marginRight:"50%"}}>My Cart</h1>
        <Grid divided="vertically">
            <Grid.Row>
                <Grid.Column width={2}></Grid.Column>
                <Grid.Column width={6}>
                    <Container style={{height:"400px", padding:"30px", border:"1px solid pink", overflow:"scroll", }}>
                        <h2 style={{textAlign:"left", color:"grey", textDecoration:"underline", paddingBottom:"20px", marginTop:"-10px"}}>Order Summary</h2>
                         {renderOrder()}
                    </Container>
                </Grid.Column>
                <Grid.Column width={1}></Grid.Column>
                <Grid.Column width={5}>
                    <Container style={{height:"400px", padding: "30px", border:"1px solid pink"}}>
                         <h2 style={{textAlign:"left", color:"grey", textDecoration:"underline", paddingBottom:"20px", marginTop:"-10px"}}>Payment</h2>
                         <Button size='large' fluid inverted style={{border:"2px solid turquoise", color:"Turquoise"}}>Pay using Stripe</Button>
                         <Form style={{marginTop: "50px", marginBottom:"70px"}}>
                             <Form.Input
                             type="text"
                             name="email"
                             placeholder="enter email"
                             />
                         </Form>
                         <h2 style={{marginBottom: "20px", textAlign:"left"}}>Total: <a style={{color:"grey", float:"right"}}>${(order_items.length * 1.85).toFixed(2)}</a></h2>
                         <Button size='large' fluid inverted color='pink'>Place Order</Button>
                    </Container>
                </Grid.Column>
            </Grid.Row>
        </Grid>
        </>
    )
}

const mapStateToProps = (state) => {
    return {
        order_items: state.order_items
    }
}

const mapDispatchToProps = {
    // fetchOrderSuccess
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart)