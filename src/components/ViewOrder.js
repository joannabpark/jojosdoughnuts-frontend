import React from 'react';
import { useState, useEffect } from 'react';
import { fetchUserSuccess } from '../actions/user';
import { connect } from 'react-redux';
import Orders from './Orders'

const ViewOrder = ({history, user, fetchUserSuccess}) => {

    const [isFetched, setIsFetched] = useState(false)

    useEffect(() => {
        const token = localStorage.getItem('app_token')
        if (!token){
          history.push('/login')
        } else {
          fetch(`http://localhost:3000/users/${user.id}`)
          .then(resp => resp.json())
          .then(userObj => {
              fetchUserSuccess(userObj)
              setIsFetched(true)
             })
      }
}, [])

const renderOrders = () => {
    const ordersArr = user.orders.reverse()
      return ordersArr.map((ord) => (
          <Orders key={ord.id} ord={ord} />
      ))
  }

    return(
        <>
        <h1 style={{color:"pink", fontSize:"70px", textDecorationLine: "underline", marginRight:"30%", paddingBottom:"20px"}}>My Orders</h1>
        <div style={{margin:"auto", position:"relative", padding: "10px", border:"1px solid pink", height:"730px", width:"1000px", overflow:"scroll"}}>
         {isFetched ? renderOrders() : null}
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
    fetchUserSuccess
}

export default connect(mapStateToProps, mapDispatchToProps)(ViewOrder)