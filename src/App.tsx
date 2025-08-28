import React from "react";
import { Layout, ConfigProvider, theme as antdTheme, Switch } from "antd";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Header from "./components/websites/Header";
import Hero from "./components/websites/Hero";
import About from "./pages/About";
import Services from "./pages/Services";
import Contact from "./pages/Contact";
import DemoRequests from "./pages/DemoRequests";
import { ThemeProvider, useTheme } from "./context/ThemeContext";

const { Content, Footer } = Layout;

const ThemedApp: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <ConfigProvider
      theme={{
        algorithm: theme === "dark" ? antdTheme.darkAlgorithm : antdTheme.defaultAlgorithm,
        token: {
          colorPrimary: "#16a34a", // green accent
        },
      }}
    >
      <Layout className={`min-h-screen ${theme === "dark" ? "bg-black text-white" : "bg-white text-black"}`}>
        <Header />
        <div className="fixed top-4 right-4">
          <Switch
            checkedChildren="🌙"
            unCheckedChildren="☀️"
            checked={theme === "dark"}
            onChange={toggleTheme}
          />
        </div>
        <Content>
          <Routes>
            <Route path="/" element={<Hero />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/demo-requests" element={<DemoRequests />} />
          </Routes>
        </Content>
        <Footer className="text-center bg-brandBlue text-white">
          © {new Date().getFullYear()} RealEstatePro. All Rights Reserved.
        </Footer>
      </Layout>
    </ConfigProvider>
  );
};

const App: React.FC = () => (
  <ThemeProvider>
    <Router>
      <ThemedApp />
    </Router>
  </ThemeProvider>
);

export default App;
