import React from 'react';
import { Card, Button } from 'semantic-ui-react'
import { removeItemSuccess } from '../actions/order_items'
import { connect } from 'react-redux';
import toaster from "toasted-notes";
import "./styling.css";

const CartDoughnuts = ({doughnut, order_items, removeItemSuccess}) => {

let idArr = order_items.filter(obj => obj.doughnut_id === doughnut.id)
let id = idArr[0].id

    const removeItem = () => {
        const reqObj = {
            method: 'DELETE', 
          }
          
          fetch (`http://localhost:3000/order_items/${id}`, reqObj)
          .then(resp => resp.json())
          .then(data => {
              console.log(data)
            removeItemSuccess(id)
            toaster.notify("Item has been removed from your cart", {
              duration: 2000
            })
        })
    }

    return (
        <Card style={{width: "600px", border:"1px solid pink"}} centered>
            <Card.Content>
                <Card.Header style={{fontSize: "20px", color: "black"}}>
                    {doughnut.name}
                </Card.Header>
                <Card.Meta style={{paddingTop:"5px", fontSize: "15px", color: "slategrey"}}>
                     {doughnut.cost}
                     <Button 
                     onClick={removeItem} 
                     size="tiny" style={{float:"right", width:"5px", paddingTop:"6px", paddingLeft:"9px"}}><i aria-hidden="true" className="x icon"></i></Button>
                 </Card.Meta>
            </Card.Content>
       </Card>
    )
}

const mapStateToProps = (state) => {
    return {
    order_items: state.order_items
    }
}

const mapDispatchToProps = {
    removeItemSuccess
}

export default connect(mapStateToProps, mapDispatchToProps)(CartDoughnuts)