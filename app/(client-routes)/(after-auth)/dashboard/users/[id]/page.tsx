"use client";

import { useParams } from "next/navigation";
import { useEffect } from "react";
import { useUserStore } from "@/store/userStore";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

import { PencilLine } from "lucide-react";

const SingleUserPage = () => {
  const { id } = useParams();
  const { getSingleUser, singleUser } = useUserStore();

  useEffect(() => {
    if (id) {
      getSingleUser(id.toString());
    }
  }, [getSingleUser, id]);

  if (!singleUser) {
    return <div className="text-center p-4">No User Found</div>;
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>User Details</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="flex items-center space-x-4">
            <Avatar className="h-20 w-20">
              <AvatarImage alt={singleUser.name} />
              <AvatarFallback>{singleUser.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-2xl font-bold">{singleUser.name}</h2>
              <p className="text-sm text-muted-foreground">
                {singleUser.email}
              </p>
            </div>
          </div>
          <div>
            <p className="text-sm font-medium">User ID</p>
            <p className="text-sm text-muted-foreground">{singleUser._id}</p>
          </div>
          <div className="flex justify-between items-center">
            <div>
              <Badge variant="outline">{singleUser.role}</Badge>
            </div>

            <PencilLine />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SingleUserPage;
