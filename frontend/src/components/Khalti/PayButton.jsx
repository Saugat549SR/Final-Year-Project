import KhaltiCheckout from 'khalti-checkout-web';
import axios from 'axios';
import { useAlert } from 'react-alert';

export const PayButton = ({ order, cartItems }) => {
  const alert = useAlert();
  let config = {
    // replace this key with yours
    publicKey: 'test_public_key_05d560376c6b45088540d839d935c324',
    productIdentity: '1234',
    productName: 'Drogon',
    productUrl: 'http://gameofthrones.com/buy/Dragons',
    eventHandler: {
      async onSuccess(payload) {
        // hit merchant api for initiating verfication
        console.log(payload);
        // code to update isPaid status
        const ord = {
          ...order,
          paymentInfo: { id: payload.idx, status: 'succeed' },
        };
        console.log(ord);

        try {
          const config = { headers: { 'Content-Type': 'multipart/form-data' } };
          const { data } = await axios.post(`/api/v1/order/new`, ord, config);
          console.log(data);
          cartItems.forEach((item, index) => {
            if (item.productId === ord.orderItems[0].productId) {
              item.stock -= order.orderItems[0].quantity;

              cartItems.splice(index, 1);
            }
          });
          // window.location.href = '/';
        } catch (error) {
          console.log(error);
        }

        if (ord) {
          alert.success('Order placed Successfully');
        }
      },
      // onError handler is optional
      onError(error) {
        // handle errors
        console.log(error);
      },
      onClose() {
        console.log('widget is closing');
      },
    },
    paymentPreference: ['KHALTI', 'MOBILE_BANKING'],
  };

  let checkout = new KhaltiCheckout(config);

  return (
    <>
      <button
        id="payment-button"
        onClick={() => {
          console.log('check');
          checkout.show({ amount: 1000 });
        }}
      >
        {' '}
        Pay{' '}
      </button>
    </>
  );
};
