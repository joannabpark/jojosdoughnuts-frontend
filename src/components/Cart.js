import React from 'react';
import { useState } from 'react';
import { connect } from 'react-redux';
import { Grid, Container, Button, Form } from 'semantic-ui-react';
import CartDoughnuts from './CartDoughnuts';
import { orderSubmitSuccess } from '../actions/order';
import { clearCartSuccess } from '../actions/order_items';
import toaster from "toasted-notes";
import "./styling.css";
import {CardElement, useStripe, useElements} from '@stripe/react-stripe-js';

const CARD_OPTIONS = {
    iconStyle: 'solid',
    style: {
      base: {
        iconColor: '#c4f0ff',
        color: 'pink',
        fontWeight: 500,
        fontFamily: 'Roboto, Open Sans, Segoe UI, sans-serif',
        fontSize: '16px',
        fontSmoothing: 'antialiased',
        ':-webkit-autofill': {
          color: 'pink',
        },
        '::placeholder': {
          color: 'turquoise',
        },
      },
      invalid: {
        iconColor: '#FFC7EE',
        color: '#FFC7EE',
      },
    },
  };

const CardField = ({onChange}) => (
    <div className="FormRow" style={{marginTop:"20px"}}>
      <CardElement options={CARD_OPTIONS} onChange={onChange} />
    </div>
  );

const Field = ({
    label,
    id,
    type,
    placeholder,
    required,
    autoComplete,
    value,
    onChange,
  }) => (
    <div className="FormRow">
      <label htmlFor={id} className="FormRowLabel">
        {label}
      </label>
      <input
      style={{marginBottom:"10px"}}
        className="FormRowInput"
        id={id}
        type={type}
        placeholder={placeholder}
        required={required}
        autoComplete={autoComplete}
        value={value}
        onChange={onChange}
      />
    </div>
  );

const Cart = ({history, order_items, orderSubmitSuccess, clearCartSuccess}) => {

    const stripe = useStripe();
    const elements = useElements();
    const [error, setError] = useState(null);
    const [cardComplete, setCardComplete] = useState(false);
    const [processing, setProcessing] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState(null);
    const [billingDetails, setBillingDetails] = useState({
        email: 'joanna@gmail.com',
        phone: '123-456-7890',
        name: 'joanna',
      });
        
  const SubmitButton = ({processing, error, children, disabled}) => (
    <Button  
     size='large' fluid inverted color='pink'
      className={`SubmitButton ${error ? 'SubmitButton--error' : ''}`}
      type="submit"
      disabled={processing || disabled}
    >
      {processing ? 'Processing...' : children}
    </Button>
  );

      const ErrorMessage = ({children}) => (
        <div className="ErrorMessage" role="alert">
          <svg width="16" height="16" viewBox="0 0 17 17">
            <path
              fill="#FFF"
              d="M8.5,17 C3.80557963,17 0,13.1944204 0,8.5 C0,3.80557963 3.80557963,0 8.5,0 C13.1944204,0 17,3.80557963 17,8.5 C17,13.1944204 13.1944204,17 8.5,17 Z"
            />
            <path
              fill="#6772e5"
              d="M8.5,7.29791847 L6.12604076,4.92395924 C5.79409512,4.59201359 5.25590488,4.59201359 4.92395924,4.92395924 C4.59201359,5.25590488 4.59201359,5.79409512 4.92395924,6.12604076 L7.29791847,8.5 L4.92395924,10.8739592 C4.59201359,11.2059049 4.59201359,11.7440951 4.92395924,12.0760408 C5.25590488,12.4079864 5.79409512,12.4079864 6.12604076,12.0760408 L8.5,9.70208153 L10.8739592,12.0760408 C11.2059049,12.4079864 11.7440951,12.4079864 12.0760408,12.0760408 C12.4079864,11.7440951 12.4079864,11.2059049 12.0760408,10.8739592 L9.70208153,8.5 L12.0760408,6.12604076 C12.4079864,5.79409512 12.4079864,5.25590488 12.0760408,4.92395924 C11.7440951,4.59201359 11.2059049,4.59201359 10.8739592,4.92395924 L8.5,7.29791847 L8.5,7.29791847 Z"
            />
          </svg>
          {children}
        </div>
      );

    const renderOrder = () => {
        let donutArr = order_items.map(donuts => donuts.doughnut)
        return donutArr.map((doughnut) => (
            <CartDoughnuts key={doughnut.id} doughnut={doughnut} />
        ))
    }

    const handleSubmit = async (event) => {
        // Block native form submission.
        event.preventDefault();
    
        if (!stripe || !elements) {
          // Stripe.js has not loaded yet. Make sure to disable
          // form submission until Stripe.js has loaded.
          return;
        }
    
        // Get a reference to a mounted CardElement. Elements knows how
        // to find your CardElement because there can only ever be one of
        // each type of element.
        const cardElement = elements.getElement(CardElement);
    
        const {error, paymentMethod} = await stripe.createPaymentMethod({
          type: 'card',
          card: cardElement,
          billing_details: billingDetails
        });
    
        if (error) {
          console.log('[error]', error);
        } else {
          console.log('[PaymentMethod]', paymentMethod);
          createLog()
          history.push('/order')
        }
      };

      const createLog = () => {
        // debugger
        const reqObj = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                user_id: 2,
                total: (order_items.length * 1.85).toFixed(2),
                items: (order_items.map(order => order.doughnut.name)).join(', ')
            })
        }
        fetch('http://localhost:3000/orders/', reqObj)
        .then(resp => resp.json())
        .then(order => {
            console.log(order)
            orderSubmitSuccess(order)
            toaster.notify(`Your order has been placed!`, {
                duration: 2000
              })
            clearCartSuccess()
        })
    }

    return (
        <>
        <h1 style={{color:"pink", fontSize:"70px", textDecorationLine:"underline", marginRight:"50%"}}>My Cart</h1>
        <Grid divided="vertically">
            <Grid.Row>
                <Grid.Column width={2}></Grid.Column>
                <Grid.Column width={6}>
                    <Container style={{height:"500px", padding:"30px", border:"1px solid pink", overflow:"scroll", }}>
                        <h2 style={{textAlign:"left", color:"grey", textDecoration:"underline", paddingBottom:"20px", marginTop:"-10px"}}>Order Summary</h2>
                         {renderOrder()}
                    </Container>
                </Grid.Column>
                <Grid.Column width={1}></Grid.Column>
                <Grid.Column width={5}>
                    <Container style={{height:"500px", padding: "30px", border:"1px solid pink"}}>
                         <h2 style={{textAlign:"left", color:"grey", textDecoration:"underline", paddingBottom:"10px", marginTop:"-10px"}}>Payment</h2>
                         <Form className="Form" onSubmit={handleSubmit}>
                            <Field
                                label="Name"
                                id="name"
                                type="text"
                                placeholder="Jane Doe"
                                required
                                autoComplete="name"
                                value={billingDetails.name}
                                onChange={(e) => {
                                setBillingDetails({...billingDetails, name: e.target.value});
                                }}
                            />
                            <Field
                                label="Phone"
                                id="phone"
                                type="tel"
                                placeholder="(941) 555-0123"
                                required
                                autoComplete="tel"
                                value={billingDetails.phone}
                                onChange={(e) => {
                                    setBillingDetails({...billingDetails, phone: e.target.value});
                                }}
                            />
                            <Field
                                label="Email"
                                id="email"
                                type="email"
                                placeholder="janedoe@gmail.com"
                                required
                                autoComplete="email"
                                value={billingDetails.email}
                                onChange={(e) => {
                                setBillingDetails({...billingDetails, email: e.target.value});
                                }}
                            />
                            <CardField
                                onChange={(e) => {
                                setError(e.error);
                                setCardComplete(e.complete);
                                }}
                            />
                         <h2 style={{paddingTop:"25px", marginBottom: "20px", textAlign:"left"}}>Total: <a style={{color:"grey", float:"right"}}>${(order_items.length * 1.85).toFixed(2)}</a></h2>
                            {error && <ErrorMessage>{error.message}</ErrorMessage>}
                            <SubmitButton processing={processing} error={error} disabled={!stripe}>
                                Place Order
                            </SubmitButton>
                        </Form>
                    </Container>
                </Grid.Column>
            </Grid.Row>
        </Grid>
        </>
    )
}

const mapStateToProps = (state) => {
    return {
        order_items: state.order_items,
        order: state.order,
        user: state.order
    }
}

const mapDispatchToProps = {
  orderSubmitSuccess,
    clearCartSuccess
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart)