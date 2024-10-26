/* eslint-disable react-hooks/exhaustive-deps */
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

import { useEffect, useState } from "react";

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
import { Loader2, Pencil, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function AllusPage() {
  const { getAllUsers, allUsers, signUp, isLoading, deleteUser, user } =
    useUserStore();

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
  const handleDeleteu = async (uId: string) => {
    try {
      await deleteUser(uId);
      toast({
        title: "u Deleted successfully!",
      });
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
    <div>
      <Drawer>
        <DrawerTrigger asChild>
          <Button className="mb-4">Add User</Button>
        </DrawerTrigger>
        <DrawerContent className="sm:max-lg:h-screen">
          <DrawerHeader>
            <DrawerTitle>Add u</DrawerTitle>
            <DrawerDescription>
              Fill in the details to add a new user.
            </DrawerDescription>
          </DrawerHeader>
          <form onSubmit={handleSubmit} className="space-y-4 p-4">
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
                  <SelectItem value="u">u</SelectItem>
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
                <Button type="submit">Add u</Button>
              )}

              <DrawerClose asChild>
                <Button variant="outline">Cancel</Button>
              </DrawerClose>
            </DrawerFooter>
          </form>
        </DrawerContent>
      </Drawer>
      <Table>
        <TableCaption>List Of All us</TableCaption>
        <TableHeader>
          <TableRow className="bg-blue-400/50 hover:bg-blue-400/65">
            <TableHead className="text-white">Name</TableHead>
            <TableHead className="text-white">Role</TableHead>
            <TableHead className="text-white">Created At</TableHead>
            <TableHead className="text-white">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {allUsers.map((u, index) => (
            <TableRow
              className={cn(index % 2 === 0 ? "bg-muted" : "")}
              key={u._id}
            >
              <TableCell>{u.name}</TableCell>
              <TableCell>{u.role}</TableCell>
              <TableCell>
                {u.createdAt
                  ? new Date(u.createdAt).toLocaleDateString("en-GB", {
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
                <div className="flex gap-5">
                  <Pencil size={20} />
                  {u._id === user?._id ? null : (
                    <Dialog>
                      <DialogTrigger>
                        <Trash2 size={20} />
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>
                            Are you sure you want to delete this u?
                          </DialogTitle>
                          <DialogDescription>
                            This action cannot be undone. This will permanently
                            delete the u account and remove their data from our
                            servers.
                          </DialogDescription>
                        </DialogHeader>
                        <DialogFooter>
                          <DialogClose asChild>
                            <Button type="button" variant="outline">
                              Cancel
                            </Button>
                          </DialogClose>
                          {isLoading ? (
                            <Button>
                              <Loader2 className="mr-3 h-4 w-4 animate-spin" />
                              Deleting
                            </Button>
                          ) : (
                            <Button
                              type="button"
                              variant="destructive"
                              onClick={() => handleDeleteu(u._id)}
                            >
                              Delete
                            </Button>
                          )}
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  )}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
