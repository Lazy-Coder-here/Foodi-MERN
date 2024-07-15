import React from "react";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import { loadStripe } from "@stripe/stripe-js";
import { PaymentKey } from "../../Config/config";
import useCart from "../../Hooks/useCart";

const stripePromise = loadStripe(PaymentKey);

const Payment = () => {
  const [cart] = useCart();
  // console.log(cart);

  // calculate bill price
  const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const totalPrice = parseFloat(cartTotal.toFixed(2));

  
  return (
    <div className="section-container bg-gradient-to-r from-[#FAFAFA] from-0% to-[#FCFCFC] to-100% py-28">
      <Elements stripe={stripePromise}>
        <CheckoutForm price={totalPrice} cart={cart} />
      </Elements>
    </div>
  );
};

export default Payment;
