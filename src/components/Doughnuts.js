import React from 'react';
import { Card, Image, Button } from 'semantic-ui-react'
import { addItemSuccess } from '../actions/order_items';
import { connect } from 'react-redux';
import toaster from "toasted-notes";
import "./styling.css";
import Cart from './Cart';

const Doughnuts = ({doughnut, addItemSuccess}) => {
    const addToCart = () => {
        const reqObj = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                user_id: 2,
                doughnut_id: doughnut.id
            })
        }
        fetch('http://localhost:3000/order_items/', reqObj)
        .then(resp => resp.json())
        .then(order_items => {
            console.log(order_items)
            addItemSuccess(order_items)
            toaster.notify(`${doughnut.name} has been added to your cart`, {
                duration: 2000
              })
              return <Cart order_items={order_items}/>
          })
    }

    return (
        <>
        <Card style={{height:"450px"}}>
            <Image src={doughnut.image} wrapped ui={false} />
            <Card.Content style={{height:"150px"}}>
                <Card.Header>{doughnut.name}</Card.Header>
                <Card.Meta style={{color:"black", fontWeight:"bold"}}>
                    <span className='date'>${doughnut.cost}</span>
                </Card.Meta>
                <Card.Description>{doughnut.description}</Card.Description>
            </Card.Content>
            <Card.Content extra>
                <Button onClick={() => addToCart()} color='pink' inverted><i aria-hidden="true" className="add icon"></i>to cart</Button>
            </Card.Content>
        </Card>
        </>
    )
}

const mapStateToProps = (state) => {
    return {
        order_items: state.order_items,
    }
}

const mapDispatchToProps = {
    addItemSuccess
}

export default connect(mapStateToProps, mapDispatchToProps)(Doughnuts)