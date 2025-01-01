import CartContext from "../../context/CartContext";
import { v4 as uuidv4 } from "uuid";
import "./index.css";
import { useNavigate } from "react-router-dom";

const CartSummary = () => {
  const navigate = useNavigate();
  const paymentHandler = async (e, totalAmount, removeAllCartItems) => {
    const receipt = `Durga_${uuidv4().slice(0, 30)}`;

    const paymentPayload = {
      amount: totalAmount * 100, // Convert to paise
      currency: "INR",
      receipt: receipt,
    };
    const response = await fetch(`${process.env.REACT_APP_API_URL}/order`, {
      method: "POST",
      body: JSON.stringify(paymentPayload),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const order = await response.json();
    console.log(order);
    var options = {
      key: "rzp_test_Ex0AnmIitDbTLe", // Enter the Key ID generated from the Dashboard
      amount: totalAmount * 100, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      currency: "INR",
      name: "Durga_Trendz",
      description: "Test Transaction",
      image:
        "https://res.cloudinary.com/dcy8ylflx/image/upload/v1712653908/Screenshot_2024-04-09_144038_kqpydu.svg",
      order_id: order.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
      callback_url: `https://eneqd3r9zrjok.x.pipedream.net/`,
      handler: async (response) => {
        // Success Handler
        const body = {
          ...response,
        };

        const validateResponse = await fetch(
          `${process.env.REACT_APP_API_URL}/order/validate-payment`,
          {
            method: "POST",
            body: JSON.stringify(body),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const jsonRes = await validateResponse.json();
        removeAllCartItems();
        console.log(jsonRes);
        navigate("/");

        console.log("Payment Successful:", response);
      },
      prefill: {
        name: "syam Kumar",
        email: "syam.kumar@example.com",
        contact: "900000000",
      },
      notes: {
        address: "Corporate Office",
      },
      theme: {
        color: "#3399cc",
      },
    };

    const rzp = new window.Razorpay(options);

    // Add Failure Handler
    rzp.on("payment.failed", (response) => {
      alert(`Payment Failed! Reason: ${response.error.description}`);
      console.error("Payment Failed:", response.error);
    });

    rzp.open();
    e.preventDefault();
  };

  return (
    <CartContext.Consumer>
      {(value) => {
        const { cartList, removeAllCartItems } = value;
        let total = 0;
        cartList.forEach((eachCartItem) => {
          total += eachCartItem.price * eachCartItem.quantity;
        });

        return (
          <>
            <div className="cart-summary-container">
              <h1 className="order-total-value">
                <span className="order-total-label">Order Total:</span> Rs{" "}
                {total}
                /-
              </h1>
              <p className="total-items">{cartList.length} Items in cart</p>
              <button
                type="button"
                className="checkout-button d-sm-none"
                onClick={(e) => paymentHandler(e, total, removeAllCartItems)}
              >
                Checkout
              </button>
            </div>
            <button type="button" className="checkout-button d-lg-none">
              Checkout
            </button>
          </>
        );
      }}
    </CartContext.Consumer>
  );
};

export default CartSummary;
