"use client";

import { useUserStore } from "@/store/userStore";
import Link from "next/link";
import { useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";

const AllUsersPage = () => {
  const { getAllUsers, allUsers } = useUserStore();

  useEffect(() => {
    getAllUsers();
  }, [getAllUsers]);

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>All Users</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[70vh]">
          <div className="space-y-4">
            {allUsers.map((user) => (
              <Link
                href={`/dashboard/users/${user._id}`}
                key={user._id}
                className="flex items-center space-x-4 p-2 rounded-lg hover:bg-accent transition-colors"
              >
                <Avatar>
                  <AvatarImage
                    src={`https://api.dicebear.com/6.x/initials/svg?seed=${user.name}`}
                    alt={user.name}
                  />
                  <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium leading-none">
                    {user.name}
                  </p>
                  <p className="text-sm text-muted-foreground">{user.email}</p>
                </div>
              </Link>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default AllUsersPage;
