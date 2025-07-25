"use client";
import Modal from "@/app/Components/UI/Modal";
import Header from "@/app/Components/UI/header";
import Service from "./Components/service";
import Tracking from "./Components/tracking";
import { useState } from "react";

const trackingStatus = [
  {
    date: "24 Nov 2023",
    text: "Products delivered",
    icon: "home",
  },
  {
    date: "Today",
    text: "Products being delivered",
    icon: "truck",
  },
  {
    date: "23 Nov 2023, 15:15",
    text: "Products in the courier's warehouse",
  },
  {
    date: "22 Nov 2023, 12:27",
    text: "Products delivered to the courier - DHL Express",
  },
  {
    date: "19 Nov 2023, 10:47",
    text: "Payment accepted - VISA Credit Card",
  },
  {
    date: "19 Nov 2023, 10:45",
    text: "Order placed - Receipt #647563",
  },
];
const trackingItems = [
  {
    id: "BJ8364850",
    name: "PC system All in One APPLE iMac (2023)...Blue",
    img: "https://flowbite.s3.amazonaws.com/blocks/e-commerce/imac-front.svg",
    quantity: 1,
    subtotal: 149900, // in Kwanza
  },
  {
    id: "BJ8369991",
    name: "Logitech Wireless Keyboard - INT Layout",
    img: "https://flowbite.s3.amazonaws.com/blocks/e-commerce/imac-front.svg",
    quantity: 2,
    subtotal: 59900,
  },
];

const PostOffice = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [modalPage, setModalPage] = useState(null);

  const onClose = () => {
    setIsOpen(false);
  };

  const onOpen = (page) => {
    setIsOpen(true);
    setModalPage(page);
  };
  return (
    <>
      <Header 
      heading="Packaging and Shipping Essentials"
      subHeading="Post Office"
      paragraph="Explore all you need to know about packaging and shipping supplies.
            Use our expert tips to confidently pack and ship your items on your
            own."
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100">
          <Service onOpen={onOpen} />
        </div>
      </div>
      <Modal isOpen={isOpen} onClose={onClose}>
        {modalPage === "Track" && (
          <Tracking
            trackingStatus={trackingStatus}
            trackingItems={trackingItems}
          />
        )}
      </Modal>
    </>
  );
};
export default PostOffice;
