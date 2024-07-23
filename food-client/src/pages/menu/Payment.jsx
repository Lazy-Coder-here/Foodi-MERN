import React from "react";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import { loadStripe } from "@stripe/stripe-js";
import { PaymentKey } from "../../Config/config";
import useCart from "../../Hooks/useCart";

const stripePromise = loadStripe(PaymentKey);

const Payment = () => {
  const [cart] = useCart();

  // calculate bill price
  const calculatePrice = (item) => {
    return item.price * item.quantity;
  };
  const cartSubTotal = cart.reduce((total, item) => {
    return total + calculatePrice(item);
  }, 0);

  const orderTotal = parseFloat(cartSubTotal.toFixed(2));

  return (
    <div className="section-container bg-gradient-to-r from-[#FAFAFA] from-0% to-[#FCFCFC] to-100% py-28">
      <Elements stripe={stripePromise}>
        <CheckoutForm price={orderTotal} cart={cart} />
      </Elements>
    </div>
  );
};

export default Payment;
