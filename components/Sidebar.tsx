"use client";

import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent } from "@/components/ui/collapsible";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useUserStore } from "@/store/userStore";
import { useTheme } from "next-themes";
import {
  ChevronRight,
  LayoutDashboard,
  Lightbulb,
  Settings,
  FileText,
  Users,
  LogOut,
  ChevronDown,
  Loader2,
} from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { toast } from "@/hooks/use-toast";

const menuItems = [
  {
    id: "dashboard",
    icon: LayoutDashboard,
    label: "Dashboard",
    href: "",
    roles: ["admin", "user", "production"],
  },
  {
    id: "solar-street-lights",
    icon: Lightbulb,
    label: "Solar Street Lights",
    roles: ["admin", "user", "production"],
    subItems: [
      {
        label: "SSL Data",
        href: "ssl-data",
        roles: ["admin", "user", "production"],
      },
      { label: "Bulk Approve", href: "bulk-approve", roles: ["admin"] },
      {
        label: "Field Engineers",
        href: "field-engineer",
        roles: ["admin", "production"],
      },
      {
        label: "Swap Requests",
        href: "swap-requests",
        roles: ["admin", "production"],
      },
      {
        label: "Lights Location",
        href: "lights-location",
        roles: ["admin", "user", "production"],
      },
    ],
  },
  {
    id: "report",
    icon: FileText,
    label: "Report",
    roles: ["admin", "production"],
    subItems: [
      {
        label: "Light Working Days",
        href: "light-working-days",
        roles: ["admin", "production"],
      },
      {
        label: "Fault Rectification Logs",
        href: "fault-rectification-logs",
        roles: ["admin", "production"],
      },
    ],
  },
  {
    id: "users",
    icon: Users,
    label: "Users",
    roles: ["admin"],
    subItems: [
      { label: "Sub Users", href: "sub-users", roles: ["admin"] },
      { label: "Field Engineers", href: "field-engineers", roles: ["admin"] },
      { label: "All Users", href: "users", roles: ["admin"] },
    ],
  },
  {
    id: "settings",
    icon: Settings,
    label: "Settings",
    href: "settings",
    roles: ["admin", "user", "production"],
  },
];

export default function Sidebar() {
  const { user, logout, isLoading } = useUserStore();
  const [isExpanded, setIsExpanded] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) return null;
  const toggleSubmenu = (id: string) => {
    if (!isExpanded) {
      setIsExpanded(true);
    }
    setOpenSubmenu(openSubmenu === id ? null : id);
  };

  const getFullPath = (href: string) => {
    const dashboardRoot = "/dashboard";
    return href ? `${dashboardRoot}/${href}` : dashboardRoot;
  };

  const isActive = (href: string) => pathname === href;

  const hasAccessToItem = (item: any) => {
    return item.roles.includes(user?.role);
  };

  const hasAccessToAnySubItem = (item: any) => {
    return item.subItems.some((subItem: any) =>
      subItem.roles.includes(user?.role)
    );
  };

  const handleLogOut = async () => {
    try {
      await logout();
      toast({
        title: "Successfully Logged Out",
        duration: 2500,
      });
      router.replace("/login");
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

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <div
      className={cn(
        "flex flex-col h-[100dvh] bg-background dark:bg-slate-700 border-r transition-all duration-300 ease-in-out relative",
        isExpanded ? "w-64 rounded-tr-3xl rounded-br-3xl" : "w-20"
      )}
    >
      <div className="flex items-center justify-between p-4 border-b">
        <div className={cn("overflow-hidden", !isExpanded && "w-0")}>
          {isExpanded && <span className="font-semibold">Ielecssol</span>}
        </div>

        <Button
          variant="ghost"
          size="icon"
          className="shrink-0"
          onClick={() => setIsExpanded((prev) => !prev)}
        >
          <ChevronRight
            className={cn(
              "transition-transform duration-200",
              isExpanded && "rotate-180"
            )}
          />
        </Button>
      </div>

      <nav className="flex-1 px-2 py-4 overflow-y-auto">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            if (
              !hasAccessToItem(item) &&
              (!item.subItems || !hasAccessToAnySubItem(item))
            ) {
              return null;
            }

            return (
              <li key={item.id}>
                {item.subItems ? (
                  <>
                    <Button
                      variant="ghost"
                      className={cn(
                        "w-full flex items-center py-3 transition-colors duration-200",
                        isExpanded ? "justify-start px-4" : "justify-center"
                      )}
                      onClick={() => toggleSubmenu(item.id)}
                    >
                      <item.icon className="h-5 w-5 flex-shrink-0" />
                      {isExpanded && (
                        <>
                          <span className="ml-3 text-sm font-medium dark:text-white">
                            {item.label}
                          </span>
                          <ChevronDown
                            className={cn(
                              "ml-auto h-4 w-4 transition-transform duration-200",
                              openSubmenu === item.id && "rotate-180"
                            )}
                          />
                        </>
                      )}
                    </Button>
                    {isExpanded && (
                      <Collapsible open={openSubmenu === item.id}>
                        <CollapsibleContent>
                          <ul className="mt-2 space-y-1 px-4">
                            {item.subItems.map((subItem) => {
                              if (!subItem.roles.includes(user?.role)) {
                                return null;
                              }

                              return (
                                <li key={subItem.label}>
                                  <Link
                                    href={getFullPath(subItem.href)}
                                    passHref
                                  >
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      className={cn(
                                        "w-full justify-start text-sm",
                                        isActive(getFullPath(subItem.href)) &&
                                          "bg-accent text-accent-foreground"
                                      )}
                                    >
                                      {subItem.label}
                                    </Button>
                                  </Link>
                                </li>
                              );
                            })}
                          </ul>
                        </CollapsibleContent>
                      </Collapsible>
                    )}
                  </>
                ) : (
                  <Link href={getFullPath(item.href)} passHref>
                    <Button
                      variant="ghost"
                      className={cn(
                        "w-full flex items-center py-3 transition-colors duration-200",
                        isExpanded ? "justify-start px-4" : "justify-center",
                        isActive(getFullPath(item.href)) &&
                          "bg-accent text-accent-foreground"
                      )}
                    >
                      <item.icon className="h-5 w-5 flex-shrink-0" />
                      {isExpanded && (
                        <span className="ml-3 text-sm font-medium dark:text-white">
                          {item.label}
                        </span>
                      )}
                    </Button>
                  </Link>
                )}
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="mt-auto border-t">
        <div
          className={cn(
            "flex items-center p-4",
            isExpanded ? "justify-between" : "justify-center"
          )}
        >
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Avatar className="cursor-pointer">
                  <AvatarFallback>
                    {user?.name?.[0].toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </TooltipTrigger>
              <TooltipContent>
                <p>{user?.name}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          {isExpanded && (
            <span className="text-sm font-medium dark:text-white ml-3 truncate">
              {user?.name}
            </span>
          )}
        </div>

        <div
          className={cn(
            "flex items-center p-4",
            isExpanded ? "justify-between" : "justify-center"
          )}
        >
          {isExpanded && (
            <span className="text-sm font-medium dark:text-white">
              {mounted && (theme === "dark" ? "Dark Mode" : "Light Mode")}
            </span>
          )}
          <button
            onClick={toggleTheme}
            className="relative w-12 h-6 rounded-full p-1 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-yellow-400"
            style={{
              backgroundColor: mounted
                ? theme === "dark"
                  ? "#1f2937"
                  : "#fde68a"
                : "transparent",
            }}
          >
            <span className="sr-only">Toggle theme</span>
            {mounted && (
              <>
                <div
                  className={`absolute left-1 top-1 w-4 h-4 rounded-full transition-all duration-300 ${
                    theme === "dark"
                      ? "bg-gray-600 translate-x-0"
                      : "bg-white translate-x-6"
                  }`}
                >
                  <div
                    className={`absolute inset-0 transition-opacity duration-300 ${
                      theme === "dark" ? "opacity-0" : "opacity-100"
                    }`}
                  >
                    <div className="absolute top-1/4 left-1/2 w-px h-2 bg-yellow-400 transform -translate-x-1/2 rotate-45" />
                    <div className="absolute top-1/4 left-1/2 w-px h-2 bg-yellow-400 transform -translate-x-1/2 -rotate-45" />
                  </div>
                </div>
                <div
                  className={`absolute inset-0 rounded-full transition-opacity duration-300 ${
                    theme === "dark" ? "opacity-0" : "opacity-40"
                  }`}
                  style={{
                    background:
                      "radial-gradient(circle, #fef08a, transparent 70%)",
                  }}
                />
              </>
            )}
          </button>
        </div>

        <Button
          variant="ghost"
          className={cn(
            "w-full flex items-center py-3 transition-colors duration-200",
            isExpanded ? "justify-start px-4" : "justify-center"
          )}
          onClick={() => setIsLogoutModalOpen(true)}
        >
          <LogOut className="h-5 w-5 flex-shrink-0 mr-3" />
          {isExpanded && <span>Logout</span>}
        </Button>
      </div>

      <Dialog open={isLogoutModalOpen} onOpenChange={setIsLogoutModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Logout</DialogTitle>
            <DialogDescription>
              Are you sure you want to log out?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsLogoutModalOpen(false)}
            >
              Cancel
            </Button>
            {isLoading ? (
              <Button variant="destructive" disabled>
                <Loader2 className="animate-spin h-4 w-4 mr-4" />
                Logout
              </Button>
            ) : (
              <Button variant="destructive" onClick={handleLogOut}>
                Logout
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
