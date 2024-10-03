"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const BulkApprove = () => {
  return (
    <div className="h-[80dvh] flex items-center justify-center">
      <Card className="w-full ">
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
    </div>
  );
};

export default BulkApprove;
