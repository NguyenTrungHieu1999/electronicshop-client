import React, { Component } from 'react';
import { PayPalButton } from "react-paypal-button-v2";

class Payment extends Component {
  render() {
    return (
      <PayPalButton
        createOrder={(data, actions) => {
          return actions.order.create({
            purchase_units: [{
              amount: {
                currency_code: "USD",
                value: "60"
              },
              descriptions: "Thanh toan mua hang",
              payment_descriptor: 'Thanh toan',
              shipping_address: "ABC"
            }],
            // application_context: {
            //   shipping_preference: "NO_SHIPPING" // default is "GET_FROM_FILE"
            // }
          });
        }}
        onApprove={(data, actions) => {
          // Capture the funds from the transaction
          return actions.order.capture().then(function (details) {
            // Show a success message to your buyer
            alert("Transaction completed by " + details.payer.name.given_name);

            // OPTIONAL: Call your server to save the transaction
            return fetch("/paypal-transaction-complete", {
              method: "post",
              body: JSON.stringify({
                orderID: data.orderID
              })
            });
          });
        }}
      />
    );
  }
}

export default Payment;