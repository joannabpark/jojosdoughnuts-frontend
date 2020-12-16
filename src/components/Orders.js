import React from 'react';
import { Card } from 'semantic-ui-react'
import moment from 'moment-timezone';

const Orders = ({ord}) => {
    return (
        <Card centered style={{position: "relative", width: "700px"}}>
        <Card.Content>
            <Card.Header style={{fontSize: "20px", color: "black"}}>
                Order placed on {moment.tz(`${ord.created_at}`, 'America/Chicago').format('LLL')}
            </Card.Header>
            <Card.Meta style={{paddingTop:"5px", fontSize: "15px", color: "slategrey"}}>
                 total: ${ord.total}
            </Card.Meta>
            <h5>Doughnuts:</h5>
            <Card.Description style={{fontSize: "15px", color: "black"}}>
                {ord.items}
            </Card.Description>
        </Card.Content>
   </Card>
    )
}

export default Orders