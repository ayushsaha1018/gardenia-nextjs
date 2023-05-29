import { useSession } from "next-auth/react";
import db from "../../firebase";
import Header from "../components/Header";
import moment from "moment";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../pages/api/auth/[...nextauth]";
import Order from "../components/Order";
import Head from "next/head";

function Orders({ orders }) {
  const { data: session } = useSession();
  console.log(orders);

  return (
    <div>
      <Head>
        <title>Your Orders</title>
      </Head>
      <Header />
      <main>
        <div className="bg-white">
          <div className="py-16 sm:py-24">
            <div className="mx-auto max-w-7xl sm:px-2 lg:px-8">
              <div className="mx-auto max-w-2xl px-4 lg:max-w-4xl lg:px-0">
                <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                  Order history
                </h1>
                <p className="mt-2 text-sm text-gray-500">
                  Check the status of recent orders, manage returns, and
                  discover similar products.
                </p>
              </div>
            </div>

            <div className="mt-16">
              <h2 className="sr-only">Recent orders</h2>

              {!session && (
                <h2 className="text-center text-2xl font-bold">
                  Please sign in to see your orders
                </h2>
              )}

              <div className="mx-auto max-w-7xl sm:px-2 lg:px-8">
                <div className="mx-auto max-w-2xl space-y-8 sm:px-4 lg:max-w-4xl lg:px-0">
                  {orders?.map(
                    ({
                      id,
                      amount,
                      amountShipping,
                      items,
                      timestamp,
                      images,
                    }) => (
                      <Order
                        key={id}
                        id={id}
                        amount={amount}
                        amountShipping={amountShipping}
                        items={items}
                        timestamp={timestamp}
                        images={images}
                      />
                    )
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Orders;

export async function getServerSideProps(context) {
  const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

  // Get the users logged in creds...
  const session = await getServerSession(context.req, context.res, authOptions);

  if (!session) {
    return {
      props: {},
    };
  }

  // Firebase
  const stripeOrders = await db
    .collection("users")
    .doc(session.user.email)
    .collection("orders")
    .orderBy("timestamp", "desc")
    .get();

  // Stripe orders
  const orders = await Promise.all(
    stripeOrders.docs.map(async (order) => {
      const orderId = order.id;
      const orderData = order.data();

      // Fetch line items for the order
      const lineItems = (
        await stripe.checkout.sessions.listLineItems(orderId, {
          limit: 100,
        })
      ).data;

      // Fetch full details for each line item
      const items = await Promise.all(
        lineItems.map(async (item) => {
          const product = await stripe.products.retrieve(item.price.product);
          const price = await stripe.prices.retrieve(item.price.id);

          return {
            id: item.id,
            quantity: item.quantity,
            name: product.name,
            price: price.unit_amount / 100,
            currency: price.currency,
            imageSrc: product.images[0], // Assuming the product has an array of images and you want to use the first image as the source
            description: product.description,
            // Add any other product details you want to include
          };
        })
      );

      return {
        id: orderId,
        amount: orderData.amount,
        amountShipping: orderData.amount_shipping,
        images: orderData.images,
        timestamp: moment(orderData.timestamp.toDate()).unix(),
        items: items,
      };
    })
  );

  return {
    props: {
      orders,
    },
  };
}
