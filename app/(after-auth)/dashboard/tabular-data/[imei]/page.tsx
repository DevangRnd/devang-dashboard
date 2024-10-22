"use client";
import { useParams } from "next/navigation";

const TabularDataPage = () => {
  const { imei } = useParams();
  return <div>{imei}</div>;
};

export default TabularDataPage;
