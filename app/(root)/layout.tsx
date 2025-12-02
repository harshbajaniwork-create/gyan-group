import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollSmoothProvider from "@/components/ScrollSmoothProvider";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Navbar />
      <ScrollSmoothProvider>
        {children}

        <Footer />
      </ScrollSmoothProvider>
    </div>
  );
};

export default Layout;
