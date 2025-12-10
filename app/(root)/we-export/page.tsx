import { Metadata } from "next";
import WeExportView from "@/modules/we-export/ui/views/we-export";

export const metadata: Metadata = {
  title: "We Export",
  description:
    "Gyan Group exports high quality chemical intermediates to countries worldwide.",
};
import React from "react";

const Page = () => {
  return <WeExportView />;
};

export default Page;
