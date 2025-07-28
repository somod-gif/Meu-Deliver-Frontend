"use client"
import Button from "@/app/Components/UI/Button";
import { Search } from "lucide-react";

export default function Tracking({ trackingItems, trackingStatus }) {
  return (
    <>
      {/* Tracking form section */}
      <section className="w-full bg-teal-50 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center mb-10">
          <h2 className="text-3xl font-bold text-teal-800">
            Track Your Shipment
          </h2>
          <p className="mt-2 text-gray-600 text-lg">
            Enter your full name and email to get the latest updates on your
            delivery.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-end justify-center gap-6 max-w-4xl mx-auto">
          <div className="flex-grow w-full">
            <label htmlFor="email" className="block text-sm text-gray-600 mb-1">
              Tracking ID:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="#4h6n-btj6hc-n6g6b"
              className="w-full bg-white rounded-2xl border border-gray-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 text-base outline-none text-gray-700 py-3 px-4 transition duration-200"
            />
          </div>

          <Button
            icon={Search}
            text="Track Shipment"
            name="track_shipment"
            // onClick={}
          />
        </div>
      </section>

      {/* Tracking infod sections */}
      <section className="bg-gray-50 py-12">
        <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
          <h2 className="text-xl font-semibold text-gray-900 sm:text-2xl">
            Track the delivery of order{" "}
            <span className="text-teal-700 font-bold">#957684673</span>
          </h2>

          <div className="mt-6 sm:mt-8 lg:flex lg:gap-8">
            {/* Tracking items Info */}
            <div className="w-full divide-y divide-gray-200 overflow-hidden rounded-2xl border border-teal-100 bg-white shadow-sm lg:max-w-xl xl:max-w-2xl">
              {trackingItems.map((item, index) => (
                <div key={item.id || index} className="space-y-4 p-6">
                  <div className="flex items-center gap-6">
                    <a href="#" className="h-14 w-14 shrink-0">
                      <img
                        className="h-full w-full object-contain"
                        src={item.img}
                        alt={item.name}
                      />
                    </a>

                    <a
                      href="#"
                      className="min-w-0 flex-1 font-medium text-gray-900 hover:underline"
                    >
                      {item.name}
                    </a>
                  </div>

                  <div className="flex items-center justify-between gap-4">
                    <p className="text-sm font-normal text-gray-600">
                      <span className="font-medium text-gray-900">
                        Product ID:
                      </span>{" "}
                      {item.id}
                    </p>

                    <div className="flex items-center gap-4">
                      <p className="text-base text-gray-800">
                        x{item.quantity}
                      </p>
                      <p className="text-xl font-bold text-teal-700">
                        {item.subtotal.toLocaleString("pt-AO", {
                          style: "currency",
                          currency: "AOA",
                        })}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Tracking Starus */}
            <div className="mt-6 grow sm:mt-8 lg:mt-0">
              <div className="space-y-6 rounded-2xl border border-teal-100 bg-white p-6 shadow-sm">
                <h3 className="text-xl font-semibold text-teal-700">
                  Order History
                </h3>

                <ol className="relative ms-3 border-s border-teal-200">
                  {trackingStatus.map((step, i) => (
                    <li
                      key={i}
                      className={`mb-10 ms-6 ${
                        i < 2 ? "text-teal-700" : "text-gray-600"
                      }`}
                    >
                      <span className="absolute -start-3 flex h-6 w-6 items-center justify-center rounded-full bg-teal-100 ring-8 ring-white">
                        <svg
                          className="h-4 w-4 text-teal-700"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d={
                              i === 0
                                ? "M4 12l8-8 8 8"
                                : i === 1
                                  ? "M3 10h18M3 14h18M9 14v6h6v-6"
                                  : "M5 11.917L9.724 16.5 19 7.5"
                            }
                          />
                        </svg>
                      </span>
                      <h4 className="mb-0.5 text-base font-semibold">
                        {step.date}
                      </h4>
                      <p className="text-sm">{step.text}</p>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
