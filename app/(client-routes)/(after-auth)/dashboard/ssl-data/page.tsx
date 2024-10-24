"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  CheckCircle,
  AlertCircle,
  BatteryCharging,
  XCircle,
  ChevronLeft,
  ChevronRight,
  Search,
  TableCellsSplit,
  Tally3Icon,
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
import { Input } from "@/components/ui/input";
import {
  Tooltip,
  TooltipTrigger,
  TooltipProvider,
  TooltipContent,
} from "@/components/ui/tooltip";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

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
      return <BatteryCharging className="text-blue-500 h-5 w-5" />;
    case "Normal Operation":
      return <CheckCircle className="text-green-500 h-5 w-5" />;
    case "Bulb Not Sending Data":
      return <AlertCircle className="text-yellow-500 h-5 w-5" />;
    case "Fault":
      return <XCircle className="text-red-500 h-5 w-5" />;
    default:
      return null;
  }
};

export default function SSLData() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const filteredRows = rows.filter((row) =>
    Object.values(row).some((value) =>
      value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const totalPages = Math.ceil(filteredRows.length / rowsPerPage);
  const currentRows = filteredRows.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );
  const router = useRouter();
  return (
    <div className="w-full px-4 py-6 space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8"
          />
        </div>
        <Select
          value={rowsPerPage.toString()}
          onValueChange={(value) => setRowsPerPage(Number(value))}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Rows per page" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="10">10 rows per page</SelectItem>
            <SelectItem value="20">20 rows per page</SelectItem>
            <SelectItem value="50">50 rows per page</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead
                colSpan={2}
                className="bg-white hover:bg-white dark:bg-black dark:hover:bg-black"
              ></TableHead>

              <TableHead
                className="text-center bg-sky-400 text-white font-bold"
                colSpan={2}
              >
                Test
              </TableHead>
              <TableHead className="bg-white hover:bg-white dark:bg-black dark:hover:bg-black"></TableHead>
              <TableHead className="bg-white hover:bg-white dark:bg-black dark:hover:bg-black"></TableHead>
              <TableHead
                className="bg-white hover:bg-white dark:bg-black dark:hover:bg-black"
                colSpan={3}
              >
                Test
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableHeader>
            <TableRow>
              <TableHead className="font-semibold">ID</TableHead>
              <TableHead className="font-semibold">Device ID IMEI</TableHead>
              <TableHead className="font-semibold">RMS Mobile No</TableHead>
              <TableHead className="font-semibold">Pole Serial No</TableHead>
              <TableHead className="font-semibold">Luminiare Sr No</TableHead>
              <TableHead className="font-semibold">Panel Sr No</TableHead>
              <TableHead className="font-semibold">Battery Sr No</TableHead>
              <TableHead className="font-semibold">System Status</TableHead>
              <TableHead className="font-semibold">Tabular Data</TableHead>
              <TableHead className="font-semibold">Last Updated</TableHead>
              <TableHead className="font-semibold">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentRows.map((row) => (
              <TableRow
                key={row.id}
                className="hover:bg-muted/50 transition-colors"
              >
                <TableCell className="font-medium">{row.id}</TableCell>
                <TableCell>{row.DeviceIDIMEI}</TableCell>
                <TableCell>{row.RMSMobileNo}</TableCell>
                <TableCell>{row.PoleSerialNo}</TableCell>
                <TableCell>{row.LuminiareSrNo}</TableCell>
                <TableCell>{row.PanelSrNo}</TableCell>
                <TableCell>{row.BatterySrNo}</TableCell>
                <TableCell>
                  <TooltipProvider delayDuration={50}>
                    <Tooltip>
                      <TooltipTrigger className="cursor-pointer ">
                        {getStatusIcon(row.SystemStatus)}
                      </TooltipTrigger>
                      <TooltipContent side="right">
                        <p>{row.SystemStatus}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </TableCell>
                <TableCell>
                  <Popover>
                    <PopoverTrigger asChild>
                      <TableCellsSplit
                        size={20}
                        onClick={() =>
                          router.push(
                            `/dashboard/tabular-data/${row.DeviceIDIMEI}`
                          )
                        }
                      />
                    </PopoverTrigger>
                  </Popover>
                </TableCell>
                <TableCell>{row.LastUpdated}</TableCell>
                <TableCell>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Tally3Icon className="rotate-90" />
                    </PopoverTrigger>
                    <PopoverContent className="w-36 rounded-md bg-muted">
                      <div className="flex flex-col gap-4">
                        <Button size={"sm"}>Edit</Button>
                        <Button size={"sm"}>Delete</Button>
                      </div>
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="flex justify-between items-center">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          <ChevronLeft className="h-4 w-4 mr-2" />
          Previous
        </Button>
        <span className="text-sm text-muted-foreground">
          Page {currentPage} of {totalPages}
        </span>
        <Button
          variant="outline"
          size="sm"
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
        >
          Next
          <ChevronRight className="h-4 w-4 ml-2" />
        </Button>
      </div>
    </div>
  );
}
