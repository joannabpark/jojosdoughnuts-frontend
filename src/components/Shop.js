import React from 'react';
import { useEffect } from 'react';
import { fetchDoughnutsSuccess } from '../actions/doughnuts';
import { currentUser } from '../actions/user';
import { connect } from 'react-redux';
import Doughnuts from './Doughnuts'
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5
    },
    desktop: {
      breakpoint: { max: 2500, min: 1024 },
      items: 3
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };

const Shop = ({currentUser, doughnuts, fetchDoughnutsSuccess}) => {
 
    useEffect(() => {
      const token = localStorage.getItem('app_token')
      console.log(token)
      if (!token){
        console.log('error')
      } else {
        const reqObj = {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`
          },
        }
        fetch('http://localhost:3000/current_session', reqObj)
        .then(resp => resp.json())
        .then(data => {
          if (data.user) {
            currentUser(data.user)
        fetch("http://localhost:3000/doughnuts")
        .then(resp => resp.json())
        .then(doughnuts => {
            fetchDoughnutsSuccess(doughnuts)
             })
           }
          })
      }}, [])

    const renderDoughnuts = () => {
      // debugger
        return doughnuts.map((doughnut) => (
            <Doughnuts key={doughnut.id} doughnut={doughnut} />
        ))
    }

    return(
        <>
        <h1 style={{color:"pink", fontSize:"70px", textDecorationLine: "underline", marginRight:"30%", paddingBottom:"20px"}}>Doughnut Menu</h1>
        <div style={{marginBottom:"20px"}}>
             <img style={{height:"130px", width:"1300px"}} src="https://olo-images-live.imgix.net/f6/f671cd6785a443ffa415127bbfe62fee.jpg?auto=format%2Ccompress&q=60&cs=tinysrgb&w=2560&h=373&fit=fill&bg=%23fff&s=f8854709bd07e1ed6761655ba950e0e7"/>
        </div>
           <div style={{margin:"auto", position:"relative", width:"1300px"}}>
            <Carousel 
              swipeable={true}
              draggable={true}
              infinite={true}
              keyBoardControl={true}
              centerMode={true}
              responsive={responsive}
              >
              {renderDoughnuts()}
            </Carousel>
            </div>
        </>
    )
}

const mapStateToProps = (state) => {
    return {
       user: state.user,
        doughnuts: state.doughnuts
    }
}

const mapDispatchToProps = {
    fetchDoughnutsSuccess,
    currentUser
}

export default connect(mapStateToProps, mapDispatchToProps)(Shop)