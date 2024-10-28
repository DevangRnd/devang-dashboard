"use client";

import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";
import { useUserStore } from "@/store/userStore";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "@/hooks/use-toast";
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
  Sun,
  Moon,
} from "lucide-react";

interface MenuItem {
  id: string;
  icon: React.ElementType;
  label: string;
  href?: string;
  roles: string[];
  subItems?: {
    label: string;
    href: string;
    roles: string[];
  }[];
}

const menuItems: MenuItem[] = [
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

  const hasAccessToItem = (item: MenuItem) => {
    return item.roles.includes(user?.role || "");
  };

  const hasAccessToAnySubItem = (item: MenuItem) => {
    return item.subItems?.some((subItem) =>
      subItem.roles.includes(user?.role || ""),
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
      toast({
        title:
          error instanceof Error ? error.message : "Unexpected Error Occurred",
        variant: "destructive",
      });
    }
  };

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <div
      className={cn(
        "relative flex h-[100dvh] flex-col border-r bg-background transition-all duration-300 ease-in-out",
        isExpanded ? "w-64" : "w-20",
      )}
    >
      <div className="flex items-center justify-between border-b p-4">
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
              isExpanded && "rotate-180",
            )}
          />
        </Button>
      </div>

      <nav className="flex-1 overflow-y-auto px-2 py-4">
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
                  <div>
                    <Button
                      variant="ghost"
                      className={cn(
                        "flex w-full items-center py-2 transition-colors duration-200",
                        isExpanded ? "justify-start px-4" : "justify-center",
                      )}
                      onClick={() => toggleSubmenu(item.id)}
                    >
                      <item.icon className="h-5 w-5 flex-shrink-0" />
                      {isExpanded && (
                        <>
                          <span className="ml-3 text-sm font-medium">
                            {item.label}
                          </span>
                          <ChevronDown
                            className={cn(
                              "ml-auto h-4 w-4 transition-transform duration-200",
                              openSubmenu === item.id && "rotate-180",
                            )}
                          />
                        </>
                      )}
                    </Button>
                    {isExpanded && openSubmenu === item.id && (
                      <ul className="mt-2 space-y-1 px-4">
                        {item.subItems.map((subItem) => {
                          if (!subItem.roles.includes(user?.role || "")) {
                            return null;
                          }

                          return (
                            <li key={subItem.label}>
                              <Link href={getFullPath(subItem.href)} passHref>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className={cn(
                                    "w-full justify-start text-sm",
                                    isActive(getFullPath(subItem.href)) &&
                                      "bg-accent text-accent-foreground",
                                  )}
                                >
                                  {subItem.label}
                                </Button>
                              </Link>
                            </li>
                          );
                        })}
                      </ul>
                    )}
                  </div>
                ) : (
                  <Link href={getFullPath(item.href || "")} passHref>
                    <Button
                      variant="ghost"
                      className={cn(
                        "flex w-full items-center py-2 transition-colors duration-200",
                        isExpanded ? "justify-start px-4" : "justify-center",
                        isActive(getFullPath(item.href || "")) &&
                          "bg-accent text-accent-foreground",
                      )}
                    >
                      <item.icon className="h-5 w-5 flex-shrink-0" />
                      {isExpanded && (
                        <span className="ml-3 text-sm font-medium">
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

      <div className="mt-auto border-t p-4">
        <div className="flex items-center justify-between">
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
            <span className="ml-3 truncate text-sm font-medium">
              {user?.name}
            </span>
          )}
        </div>

        <div className="mt-4 flex flex-col space-y-2">
          {isExpanded ? (
            <Button
              variant="outline"
              size="sm"
              onClick={toggleTheme}
              className="justify-start"
            >
              {theme === "dark" ? (
                <Sun className="mr-2 h-4 w-4" />
              ) : (
                <Moon className="mr-2 h-4 w-4" />
              )}

              <span>{theme === "dark" ? "Light Mode" : "Dark Mode"}</span>
            </Button>
          ) : (
            <Button variant="outline" size="icon" onClick={toggleTheme}>
              {theme === "dark" ? (
                <Sun className="h-4 w-4" />
              ) : (
                <Moon className="h-4 w-4" />
              )}
            </Button>
          )}
          {isExpanded ? (
            <Button
              variant="ghost"
              size="sm"
              className="justify-start text-red-600"
              onClick={() => setIsLogoutModalOpen(true)}
            >
              <LogOut className="mr-2 h-4 w-4 flex-shrink-0" />
              <span>Logout</span>
            </Button>
          ) : (
            <Button
              variant="ghost"
              size="sm"
              className="justify-start text-red-600"
              onClick={() => setIsLogoutModalOpen(true)}
            >
              <LogOut className="h-4 w-4 flex-shrink-0" />
            </Button>
          )}
        </div>
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
            <Button
              variant="destructive"
              onClick={handleLogOut}
              disabled={isLoading || !user}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Logging out...
                </>
              ) : (
                "Logout"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
