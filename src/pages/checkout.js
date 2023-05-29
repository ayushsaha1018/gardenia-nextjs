import Image from "next/image";
import { useSelector } from "react-redux";
import Header from "../components/Header";
import CheckoutProduct from "../components/CheckoutProduct";
import { useSession } from "next-auth/react";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import Head from "next/head";
import { QuestionMarkCircleIcon } from "@heroicons/react/20/solid";
const stripePromise = loadStripe(process.env.stripe_public_key);

function Checkout() {
  let total = 0;
  const { data: session } = useSession();
  const cart = useSelector((state) => state.cart);
  const itemsList = useSelector((state) => state.cart.itemsList);
  itemsList.forEach((item) => {
    total += item.totalPrice;
  });

  const createCheckoutSession = async () => {
    const stripe = await stripePromise;

    // Call the backend to create a checkout session
    const checkoutSession = await axios.post("/api/create-checkout-session", {
      items: cart.itemsList,
      email: session.user.email,
    });

    console.log(checkoutSession.data.id);

    // Redirect user/customer to stripe checkout
    const result = await stripe.redirectToCheckout({
      sessionId: checkoutSession.data.id,
    });

    if (result.error) {
      alert(result.error.message);
    }
  };

  return (
    <div className="bg-gray-100">
      <Head>
        <title>Checkout</title>
      </Head>
      <Header />
      <main>
        <div className="bg-white">
          <div className="mx-auto max-w-2xl px-4 pb-24 pt-16 sm:px-6 lg:max-w-7xl lg:px-8">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Shopping Cart
            </h1>
            <form className="mt-12 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16">
              <section aria-labelledby="cart-heading" className="lg:col-span-7">
                <h2 id="cart-heading" className="sr-only">
                  Items in your shopping cart
                </h2>

                {cart.itemsList.length > 0 ? (
                  <ul
                    role="list"
                    className="divide-y divide-gray-200 border-b border-t border-gray-200"
                  >
                    {cart.itemsList.map((product, productIdx) => (
                      <CheckoutProduct key={product.id} product={product} />
                    ))}
                  </ul>
                ) : (
                  <div className="divide-y divide-gray-200 border-t border-gray-200 p-5 text-xl">
                    *No items in the cart
                  </div>
                )}
              </section>

              {/* Order summary */}
              <section
                aria-labelledby="summary-heading"
                className="mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8"
              >
                <h2
                  id="summary-heading"
                  className="text-lg font-medium text-gray-900"
                >
                  Order summary
                </h2>

                <dl className="mt-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <dt className="text-sm text-gray-600">Subtotal</dt>
                    <dd className="text-sm font-medium text-gray-900">
                      {total}
                    </dd>
                  </div>
                  <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                    <dt className="flex items-center text-sm text-gray-600">
                      <span>Shipping estimate</span>
                      <a
                        href="#"
                        className="ml-2 flex-shrink-0 text-gray-400 hover:text-gray-500"
                      >
                        <span className="sr-only">
                          Learn more about how shipping is calculated
                        </span>
                        <QuestionMarkCircleIcon
                          className="h-5 w-5"
                          aria-hidden="true"
                        />
                      </a>
                    </dt>
                    <dd className="text-sm font-medium text-gray-900">$5.00</dd>
                  </div>
                  <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                    <dt className="flex text-sm text-gray-600">
                      <span>Tax estimate</span>
                      <a
                        href="#"
                        className="ml-2 flex-shrink-0 text-gray-400 hover:text-gray-500"
                      >
                        <span className="sr-only">
                          Learn more about how tax is calculated
                        </span>
                        <QuestionMarkCircleIcon
                          className="h-5 w-5"
                          aria-hidden="true"
                        />
                      </a>
                    </dt>
                    <dd className="text-sm font-medium text-gray-900">$8.32</dd>
                  </div>
                  <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                    <dt className="text-base font-medium text-gray-900">
                      Order total
                    </dt>
                    <dd className="text-base font-medium text-gray-900">
                      $112.32
                    </dd>
                  </div>
                </dl>

                <div className="mt-6">
                  <button
                    type="button"
                    onClick={createCheckoutSession}
                    disabled={!session || cart.itemsList.length == 0}
                    className={`w-full rounded-md border border-transparent bg-secondary px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-gray-50 ${
                      (!session || cart.itemsList.length == 0) &&
                      "from-gray-300 to-gray-500 border-gray-200 text-gray-300 cursor-not-allowed text-center"
                    }`}
                  >
                    {!session
                      ? "Sign in to checkout"
                      : cart.itemsList.length == 0
                      ? "Add Items to cart"
                      : "Proceed to checkout"}
                  </button>
                </div>
              </section>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Checkout;
