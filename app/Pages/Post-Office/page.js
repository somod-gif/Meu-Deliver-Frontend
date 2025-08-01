"use client";
import Modal from "@/app/Components/UI/Modal";
import Header from "./Components/header";
import Service from "./Components/service";
import Tracking from "./Components/tracking";
import { useState, useContext } from "react";
import CreateShipmentForm from "./Components/create-shipment";
import SchedulePickupForm from "./features/pickup";
import { AuthContext } from "@/app/hooks/authContext";

const PostOffice = () => {
  const { isLoggedIn, verifiedUser } = useContext(AuthContext);

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
      <Header />
      <div className="max-w-7xl mx-auto px-2 sm:px-6 py-8">
        <div className="bg-white rounded-3xl p-2 sm:p-8 border border-gray-100">
          <Service
            onOpen={onOpen}
            isLoggedIn={isLoggedIn}
            verifiedUser={verifiedUser}
          />
        </div>
      </div>
      <Modal isOpen={isOpen} onClose={onClose}>
        {modalPage === "Create" ? (
          <CreateShipmentForm />
        ) : modalPage === "Track" ? (
          <Tracking />
        ) : modalPage === "Pickup" ? (
          <SchedulePickupForm />
        ) : null}
      </Modal>
    </>
  );
};
export default PostOffice;
