/* eslint-disable react/prop-types */
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import "./CheckoutForm.css";
import { useContext, useEffect, useState } from "react";
import useAxiosInstance from "./../../../hooks/useAxiosInstance";
import { AuthContext } from "../../../providers/AuthProvider";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
const CheckoutForm = ({ closeModal, packageData }) => {
  const axiosInstance = useAxiosInstance();
  const [clientSecret, setClientSecret] = useState("");
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  useEffect(() => {
    paymentIntent();
  }, []);
  const paymentIntent = async () => {
    try {
      const { data } = await axiosInstance.post(`/create-payment-intent`, {
        price: packageData?.price,
      });
      setClientSecret(data);
    } catch (error) {
      console.log(error);
    }
  };
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    // Block native form submission.
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }
    const card = elements.getElement(CardElement);

    if (card == null) {
      return;
    }
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      console.log("[error]", error);
    } else {
      console.log("[PaymentMethod]", paymentMethod);
    }
    //confirm the payment
    const { paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: card,
        billing_details: {
          name: user?.displayName,
          email: user?.email,
        },
      },
    });
    if (paymentIntent.status === "succeeded") {
      const paymentInfo = {
        customer: {
          name: user?.displayName,
          email: user?.email,
        },
        benefits: packageData?.benefits,
        price: packageData?.price,
        packageName: packageData?.name,
        transactionId: paymentIntent.id,
      };
      await axiosInstance.post(`/payment-info`, paymentInfo);
      await axiosInstance.patch(`/update-based`, {
        email: user?.email,
        packageType: packageData?.name,
      });
      toast.success("Payment successfully");
      navigate("/dashboard/payment-history");
      closeModal();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-3">
      <CardElement
        options={{
          style: {
            base: {
              fontSize: "16px",
              color: "#424770",
              "::placeholder": {
                color: "#aab7c4",
              },
            },
            invalid: {
              color: "#9e2146",
            },
          },
        }}
      />
      <div className="flex justify-between">
        <button
          type="submit"
          className="bg-gradient-to-r from-blue-600 to-blue-800 py-2 text-gray-100 px-5 rounded-lg"
          disabled={!stripe || !clientSecret}
        >
          Pay
        </button>
        <button
          onClick={closeModal}
          type="button"
          className="bg-red-600 text-gray-100 py-2 px-5 rounded-lg"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default CheckoutForm;
