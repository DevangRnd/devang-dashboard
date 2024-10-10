"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { TableIcon } from "lucide-react";
const mockData = Array.from({ length: 50 }, (_, index) => ({
  imei: Math.floor(
    100000000000000 + Math.random() * 900000000000000
  ).toString(),
  rms: Math.floor(1000000000000 + Math.random() * 9000000000000).toString(),
  pv: `PV${index + 1}`,
  pv_voltage: (Math.random() * 100).toFixed(2),
  pv_current: (Math.random() * 10).toFixed(2),
  battery_voltage: (Math.random() * 50).toFixed(2),
  battery_current: (Math.random() * 10).toFixed(2),
  load_voltage: (Math.random() * 50).toFixed(2),
  load_current: (Math.random() * 10).toFixed(2),
  faults: Math.random() > 0.5 ? "No Faults" : "Fault Detected",
  tabulardata_icon: "icon.png",
  added_on_date: new Date(Date.now() - Math.random() * 10000000000)
    .toISOString()
    .split("T")[0],
  // operations: `<button>Assign</button>`,
  // actions: `<button class='hamburger-menu'>☰</button>`,
}));

const BulkApprove = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;
  const totalPages = Math.ceil(mockData.length / rowsPerPage);
  const currentRows = mockData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  return (
    <div className="flex flex-col items-center justify-center">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Bulk Approve</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="excelFile">Add Your Excel File</Label>
              <Input id="excelFile" type="file" />
            </div>
            <Button className="w-full">Submit</Button>
          </form>
        </CardContent>
      </Card>
      <div className="w-full px-4 py-2 overflow-x-auto">
        <Table className="w-full">
          <TableHeader>
            <TableRow>
              <TableHead className="text-md">IMEI</TableHead>
              <TableHead className="text-md">RMS</TableHead>
              <TableHead className="text-md">PV</TableHead>
              <TableHead className="text-md">PV Voltage</TableHead>
              <TableHead className="text-md">PV Current</TableHead>
              <TableHead className="text-md">Battery Voltage</TableHead>
              <TableHead className="text-md">Battery Current</TableHead>
              <TableHead className="text-md">Load Voltage</TableHead>
              <TableHead className="text-md">Load Current</TableHead>
              <TableHead className="text-md">Faults</TableHead>
              <TableHead className="text-md">Tabular Data</TableHead>
              <TableHead className="text-md">Added On</TableHead>
              <TableHead className="text-md">Operations</TableHead>
              <TableHead className="text-md">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentRows.map((row, index) => (
              <TableRow key={index} className="text-center text-md py-5">
                <TableCell>{row.imei}</TableCell>
                <TableCell>{row.rms}</TableCell>
                <TableCell>{row.pv}</TableCell>
                <TableCell>{row.pv_voltage}</TableCell>
                <TableCell>{row.pv_current}</TableCell>
                <TableCell>{row.battery_voltage}</TableCell>
                <TableCell>{row.battery_current}</TableCell>
                <TableCell>{row.load_voltage}</TableCell>
                <TableCell>{row.load_current}</TableCell>
                <TableCell className="flex items-center justify-center">
                  -
                </TableCell>
                <TableCell>
                  {" "}
                  <TableIcon />
                </TableCell>
                <TableCell>{row.added_on_date}</TableCell>
                <TableCell>
                  <Button variant="outline" size="sm">
                    Assign
                  </Button>
                </TableCell>
                <TableCell>
                  <Button variant="ghost" size="sm">
                    ☰
                  </Button>
                </TableCell>
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
    </div>
  );
};

export default BulkApprove;
