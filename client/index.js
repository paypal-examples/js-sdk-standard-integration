/* eslint-disable consistent-return, new-cap, no-alert, no-console */

paypal.Buttons({
    createOrder: function (data, actions) {
        return actions.order.create({
            purchase_units: [{
                amount: {
                    value: '50.00'
                }
            }]
        });
    },
    onApprove: function (data, actions) {
        return actions.order.capture().then(function (details) {
            window.location.href = "approve.html";
        });
    },
    onError: function (err) {
        console.log('Something went wrong', err);
    }
}).render('#paypal-button-container'); // Display payment options on your web page