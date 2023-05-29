import moment from "moment";
import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";
import { CheckCircleIcon } from "@heroicons/react/20/solid";

function Order({ id, amount, amountShipping, items, timestamp, images }) {
  return (
    <div className="border-b border-t border-gray-200 bg-white shadow-sm sm:rounded-lg sm:border">
      <h3 className="sr-only">
        Order placed on{" "}
        <time dateTime={moment.unix(timestamp).format("DD MMM YYYY")}>
          {moment.unix(timestamp).format("DD MMM YYYY")}
        </time>
      </h3>

      <div className="flex items-center border-b border-gray-200 p-4 sm:grid sm:grid-cols-4 sm:gap-x-6 sm:p-6">
        <dl className="grid flex-1 grid-cols-2 gap-x-6 text-sm sm:col-span-3 sm:grid-cols-3 lg:col-span-2">
          <div>
            <dt className="font-medium text-gray-900">Order number</dt>
            <dd className="mt-1 text-gray-500">{id.slice(0, 15)}...</dd>
          </div>
          <div className="hidden sm:block">
            <dt className="font-medium text-gray-900">Date placed</dt>
            <dd className="mt-1 text-gray-500">
              <time dateTime={moment.unix(timestamp).format("DD MMM YYYY")}>
                {moment.unix(timestamp).format("DD MMM YYYY")}
              </time>
            </dd>
          </div>
          <div>
            <dt className="font-medium text-gray-900">Total amount</dt>
            <dd className="mt-1 font-medium text-gray-900">&#8377; {amount}</dd>
          </div>
        </dl>

        <Menu as="div" className="relative flex justify-end lg:hidden">
          <div className="flex items-center">
            <Menu.Button className="-m-2 flex items-center p-2 text-gray-400 hover:text-gray-500">
              <span className="sr-only">Options for order {id}</span>
              <EllipsisVerticalIcon className="h-6 w-6" aria-hidden="true" />
            </Menu.Button>
          </div>

          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="absolute right-0 z-10 mt-2 w-40 origin-bottom-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              <div className="py-1">
                <Menu.Item>
                  {({ active }) => (
                    <a
                      href={"#"}
                      className={classNames(
                        active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                        "block px-4 py-2 text-sm"
                      )}
                    >
                      View
                    </a>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <a
                      href={"#"}
                      className={classNames(
                        active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                        "block px-4 py-2 text-sm"
                      )}
                    >
                      Invoice
                    </a>
                  )}
                </Menu.Item>
              </div>
            </Menu.Items>
          </Transition>
        </Menu>

        <div className="hidden lg:col-span-2 lg:flex lg:items-center lg:justify-end lg:space-x-4">
          <a
            href={"#"}
            className="flex items-center justify-center rounded-md border border-gray-300 bg-white px-2.5 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            <span>View Order</span>
            <span className="sr-only">{id}</span>
          </a>
          <a
            href={"#"}
            className="flex items-center justify-center rounded-md border border-gray-300 bg-white px-2.5 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            <span>View Invoice</span>
            <span className="sr-only">for order {id}</span>
          </a>
        </div>
      </div>

      {/* Products */}
      <h4 className="sr-only">Items</h4>
      <ul role="list" className="divide-y divide-gray-200">
        {items.map((product) => (
          <li key={product.id} className="p-4 sm:p-6">
            <div className="flex items-center sm:items-start">
              <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg bg-gray-200 sm:h-40 sm:w-40">
                <img
                  src={product.imageSrc}
                  alt="product image"
                  className="h-full w-full object-cover object-center"
                />
              </div>
              <div className="ml-6 flex-1 text-sm">
                <div className="font-medium text-gray-900 sm:flex sm:justify-between">
                  <h5>{product.name}</h5>
                  <p className="mt-2 sm:mt-0">&#8377; {product.price}</p>
                </div>
                <p className="hidden text-gray-500 sm:mt-2 sm:block">
                  {product.description}
                </p>
              </div>
            </div>

            <div className="mt-6 sm:flex sm:justify-between">
              <div className="flex items-center">
                <CheckCircleIcon
                  className="h-5 w-5 text-green-500"
                  aria-hidden="true"
                />
                <p className="ml-2 text-sm font-medium text-gray-500">
                  Delivered on{" "}
                  <time dateTime={moment.unix(timestamp).format("DD MMM YYYY")}>
                    {moment.unix(timestamp).format("DD MMM YYYY")}
                  </time>
                </p>
              </div>

              {/* <div className="mt-6 flex items-center space-x-4 divide-x divide-gray-200 border-t border-gray-200 pt-4 text-sm font-medium sm:ml-4 sm:mt-0 sm:border-none sm:pt-0">
                <div className="flex flex-1 justify-center">
                  <a
                    href={"#"}
                    className="whitespace-nowrap text-indigo-600 hover:text-indigo-500"
                  >
                    View product
                  </a>
                </div>
                <div className="flex flex-1 justify-center pl-4">
                  <a
                    href="#"
                    className="whitespace-nowrap text-indigo-600 hover:text-indigo-500"
                  >
                    Buy again
                  </a>
                </div>
              </div> */}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Order;
