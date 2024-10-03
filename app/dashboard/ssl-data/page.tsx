"use client";

import { useState } from "react";
import {
  CheckCircle,
  AlertCircle,
  BatteryCharging,
  XCircle,
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { TooltipContent, TooltipProvider } from "@radix-ui/react-tooltip";
import { Tooltip, TooltipTrigger } from "@/components/ui/tooltip";

const statuses = [
  "Charging",
  "Normal Operation",
  "Bulb Not Sending Data",
  "Fault",
];

const rows = Array.from({ length: 50 }, (_, index) => ({
  id: index + 1,
  DeviceIDIMEI: `86827704855${index}03`,
  RMSMobileNo: `57550200664${index}7`,
  PoleSerialNo: `KHA/BEL/BOB/W03/${index}`,
  LuminiareSrNo: `08234855910${index}`,
  PanelSrNo: `IBE12012084${index}6`,
  BatterySrNo: `INUBUC1254002${index}`,
  SystemStatus: statuses[index % statuses.length],
  LastUpdated: `2023-06-${String(index + 1).padStart(2, "0")}`,
}));

const getStatusIcon = (status: string) => {
  switch (status) {
    case "Charging":
      return <BatteryCharging className="text-blue-500 h-6 w-6" />;
    case "Normal Operation":
      return <CheckCircle className="text-green-500 h-6 w-6" />;
    case "Bulb Not Sending Data":
      return <AlertCircle className="text-yellow-500 h-6 w-6" />;
    case "Fault":
      return <XCircle className="text-red-500 h-6 w-6" />;
    default:
      return null;
  }
};

export default function SSLData() {
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;
  const totalPages = Math.ceil(rows.length / rowsPerPage);
  const currentRows = rows.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  return (
    <div className="w-full px-4 py-2">
      <Table className="w-full">
        <TableHeader>
          <TableRow>
            <TableHead className="text-md">ID</TableHead>
            <TableHead className="text-md">Device ID IMEI</TableHead>
            <TableHead className="text-md">RMS Mobile No</TableHead>
            <TableHead className="text-md">Pole Serial No</TableHead>
            <TableHead className="text-md">Luminiare Sr No</TableHead>
            <TableHead className="text-md">Panel Sr No</TableHead>
            <TableHead className="text-md">Battery Sr No</TableHead>
            <TableHead className="text-md">System Status</TableHead>
            <TableHead className="text-md">Last Updated</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {currentRows.map((row) => (
            <TableRow key={row.id} className="text-center text-md py-5">
              <TableCell>{row.id}</TableCell>
              <TableCell>{row.DeviceIDIMEI}</TableCell>
              <TableCell>{row.RMSMobileNo}</TableCell>
              <TableCell>{row.PoleSerialNo}</TableCell>
              <TableCell>{row.LuminiareSrNo}</TableCell>
              <TableCell>{row.PanelSrNo}</TableCell>
              <TableCell>{row.BatterySrNo}</TableCell>
              <TableCell className="flex items-center justify-center">
                <TooltipProvider delayDuration={50}>
                  <Tooltip>
                    <TooltipTrigger>
                      {getStatusIcon(row.SystemStatus)}
                    </TooltipTrigger>
                    <TooltipContent side="right">
                      <Button variant={"outline"}>{row.SystemStatus}</Button>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </TableCell>
              <TableCell>{row.LastUpdated}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="flex justify-between items-center mt-4">
        <Button
          className="disabled:cursor-not-allowed"
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          Previous
        </Button>
        <span className="text-sm">
          Page {currentPage} of {totalPages}
        </span>
        <Button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
