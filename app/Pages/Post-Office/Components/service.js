"use client";
import Button from "@/app/Components/UI/Button";
import { CreativeCommonsIcon, Plus, Search, TimerIcon, TrainTrack } from "lucide-react";

const services_list = [
  {
    title: "Create Shipment",
    des: "Fully online, tailored to you – Meudeliver gives you a seamless way to manage shipments, whether they’re around the corner or across the country.",
    icon: Plus,
    text: "Create",
  },
  {
    title: "Track Shipments",
    des: "Stay in Control of Your Deliveries – Get real-time updates and a personalized overview of all your orders in one place.",
    icon: Search,
    text: "Track",
  },
  {
    title: "Schedule Pickups",
    des: "Need to adjust a pickup? No problem — easily reschedule or cancel pickups even after placing your order.",
    icon: TimerIcon,
    text: "Pickup",
  },
];

export default function Service({ onOpen }) {


  return (
    <div className="flex flex-wrap m-4">
      {services_list.map((service, idx) => (
        <div
          className="p-4 lg:w-1/3"
          key={service.title.replace(/\s+/g, "_") + idx}
        >
          <div className="h-full bg-teal-50 px-8 pt-16 pb-24 rounded-3xl shadow-md overflow-hidden text-center relative">
            {/* ICON */}
            <div className="absolute top-6 left-1/2 transform -translate-x-1/2">
              <service.icon className="w-12 h-12 text-teal-600" />
            </div>

            <h2 className="tracking-widest text-sm font-semibold text-teal-400 mb-2 mt-6 uppercase">
              {service.text}
            </h2>

            <h1 className="title-font sm:text-2xl text-xl font-bold text-gray-800 mb-3">
              {service.title}
            </h1>

            <p className="leading-relaxed text-gray-600 mb-6">{service.des}</p>

            <Button
              icon={service.icon}
              text={service.text}
              name={service.text}
              onClick={()=>{onOpen(service.text)}}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
