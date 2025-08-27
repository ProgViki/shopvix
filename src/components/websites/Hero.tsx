import React, { useState } from "react";
import DemoModal from "./DemoModal";

const Hero: React.FC = () => {
  const [openModal, setOpenModal] = useState(false);

  return (
    <section className="bg-gray-50 h-[80vh] flex flex-col justify-center items-center text-center">
      <h2 className="text-4xl md:text-6xl font-bold text-gray-900">
        Find Your Dream Property
      </h2>
      <p className="mt-4 text-lg text-gray-600 max-w-xl">
        The easiest way to buy, sell, or rent properties with full professional support.
      </p>
      <div className="mt-6 flex gap-4">
        <button className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition">
          Get Started
        </button>
        <button
          onClick={() => setOpenModal(true)}
          className="px-6 py-3 bg-white border border-blue-600 text-blue-600 rounded-lg shadow hover:bg-blue-50 transition"
        >
          Book a Demo
        </button>
      </div>

      {openModal && <DemoModal onClose={() => setOpenModal(false)} />}
    </section>
  );
};

export default Hero;
