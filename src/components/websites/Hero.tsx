import React, { useState } from "react";
import { Button } from "antd";
import { motion } from "framer-motion";
import DemoModal from "./DemoModal";

const Hero: React.FC = () => {
  const [openModal, setOpenModal] = useState(false);

  return (
    <section className="bg-gray-50 h-[80vh] flex flex-col justify-center items-center text-center px-4">
      <motion.h2
        className="text-4xl md:text-6xl font-bold text-gray-900"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Find Your Dream Property
      </motion.h2>

      <motion.p
        className="mt-4 text-lg text-gray-600 max-w-xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        The easiest way to buy, sell, or rent properties with full professional support.
      </motion.p>

      <div className="mt-6 flex gap-4">
        <Button type="primary" size="large">
          Get Started
        </Button>
        <Button type="default" size="large" onClick={() => setOpenModal(true)}>
          Book a Demo
        </Button>
      </div>

      <DemoModal open={openModal} onClose={() => setOpenModal(false)} />
    </section>
  );
};

export default Hero;
