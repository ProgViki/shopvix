import React, { useState } from "react";
import { Layout, Menu, Drawer, Button } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

const { Header: AntHeader } = Layout;

const Header: React.FC = () => {
  const [open, setOpen] = useState(false);

  const menuItems = [
    { key: "home", label: <Link to="/">Home</Link> },
    { key: "about", label: <Link to="/about">About Us</Link> },
    { key: "services", label: <Link to="/services">Services</Link> },
    { key: "contact", label: <Link to="/contact">Contact</Link> },
    { key: "demo", label: <Link to="/demo-requests">Demo Requests</Link> },
  ];

  return (
    <AntHeader className="bg-brandBlue text-white px-6 flex items-center justify-between">
      <h1 className="text-xl font-bold text-white">RealEstatePro</h1>

      {/* Desktop Menu */}
      <div className="hidden md:block">
        <Menu theme="dark" mode="horizontal" items={menuItems} className="bg-brandBlue border-0" />
      </div>

      {/* Mobile Drawer */}
      <div className="md:hidden">
        <Button type="text" icon={<MenuOutlined />} onClick={() => setOpen(true)} className="text-white mr-8 text-3xl" />
        <Drawer
          title="Menu"
          placement="right"
          onClose={() => setOpen(false)}
          open={open}
          bodyStyle={{ padding: 0 }}
        >
          <Menu mode="inline" items={menuItems} onClick={() => setOpen(false)} />
        </Drawer>
      </div>
    </AntHeader>
  );
};

export default Header;
