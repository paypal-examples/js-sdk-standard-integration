import React, {useRef, useState, useEffect} from 'react';
import './App.css';


function Product({ product }) {
  const [paidFor, setPaidFor] = useState(false);
  const [error, setError] = useState(null);
  const paypalRef = useRef();

  useEffect(() => {
    window.paypal
      .Buttons({
        createOrder: (data, actions) => {
          return actions.order.create({
            purchase_units: [
              {
                description: product.description,
                amount: {
                  currency_code: 'INR',
                  value: product.price,
                },
              },
            ],
          });
        },
        onApprove: async (data, actions) => {
          const order = await actions.order.capture();
          setPaidFor(true);
          console.log(order);
        },
        onError: err => {
          setError(err);
          console.error(err);
        },
      })
      .render(paypalRef.current);
  }, [product.description, product.price]);

  if (paidFor) {
    return (
      <div>
        <h1>Congrats, you just bought {product.name}!</h1>
      </div>
    );
  }

  return (
    <div>
      {error && <div>Uh oh, an error occurred! {error.message}</div>}
      <div><img src={product.image} alt="Buy Chocolate" /></div>
      <h1>
        {product.description} for ₹{product.price}
      </h1>
      <div ref={paypalRef} />
    </div>
  );
}


function App() {
  const product = {
    price: 20,
    name: 'Royale Chocolate',
    description: 'Buy Royale chocolate',
    image: "https://st2.depositphotos.com/1177973/6087/i/950/depositphotos_60872383-stock-photo-box-filled-with-chocolates.jpg",
  };

  return (
      <div className="App">
        <Product product={product} />
      </div>
    );
}

export default App;
