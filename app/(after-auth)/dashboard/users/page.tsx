"use client";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { useUserStore } from "@/store/userStore";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import { EyeIcon, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

export default function AllUsersPage() {
  const { getAllUsers, allUsers, signUp, isLoading } = useUserStore();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  useEffect(() => {
    getAllUsers();
  }, []);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await signUp(name, email, password, role);
      toast({
        title: "Account created successfully!",
        description: "You Can Now login With These Credentials",
      });

      getAllUsers();
    } catch (error) {
      if (error instanceof Error) {
        toast({
          title: error?.message,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Unexpected Error Occured",
          variant: "destructive",
        });
      }
    }
  };

  return (
    <div className="">
      <Drawer>
        <DrawerTrigger asChild>
          <Button className="mb-4">Add User</Button>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Add User</DrawerTitle>
            <DrawerDescription>
              Fill in the details to add a new user.
            </DrawerDescription>
          </DrawerHeader>
          <form onSubmit={handleSubmit} className="p-4 space-y-4">
            <div>
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="role">Role</Label>
              <Select value={role} onValueChange={setRole} required>
                <SelectTrigger>
                  <SelectValue placeholder="Select a role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="production">Production</SelectItem>
                  <SelectItem value="user">User</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <DrawerFooter>
              {isLoading ? (
                <Button disabled>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Adding
                </Button>
              ) : (
                <Button type="submit">Add User</Button>
              )}

              <DrawerClose asChild>
                <Button variant="outline">Cancel</Button>
              </DrawerClose>
            </DrawerFooter>
          </form>
        </DrawerContent>
      </Drawer>
      <Table>
        <TableCaption>List Of All Users</TableCaption>
        <TableHeader>
          <TableRow className="bg-blue-400/50 hover:bg-blue-400/65">
            <TableHead className="text-white">Name</TableHead>
            <TableHead className="text-white">Role</TableHead>
            <TableHead className="text-white">Created At</TableHead>
            <TableHead className="text-white">View User</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {allUsers.map((user, index) => (
            <TableRow
              className={cn(index % 2 === 0 ? "bg-muted" : "")}
              key={user._id}
            >
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.role}</TableCell>
              <TableCell>
                {user.createdAt
                  ? new Date(user.createdAt).toLocaleDateString("en-GB", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: true,
                    })
                  : "N/A"}
              </TableCell>
              <TableCell>
                <Link href={`/dashboard/users/${user._id}`}>
                  <EyeIcon />
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
