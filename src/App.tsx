import React from "react";
import Header from "./components/websites/Header";
import Hero from "./components/websites/Hero";
import DemoRequests from "./pages/DemoRequests";

const App: React.FC = () => {
  return (
    <div className="font-sans">
      <Header />
      <Hero />
      <DemoRequests />
    </div>
  );
};

export default App;
