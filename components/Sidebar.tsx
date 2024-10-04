"use client";

import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent } from "@/components/ui/collapsible";
import { cn } from "@/lib/utils";
import {
  ChevronRight,
  LayoutDashboard,
  Lightbulb,
  Settings,
  FileText,
  Users,
  LogOut,
  ChevronDown,
  Moon,
  Sun,
} from "lucide-react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { Switch } from "@/components/ui/switch";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Cookies from "js-cookie";
const menuItems = [
  {
    id: "dashboard",
    icon: LayoutDashboard,
    label: "Dashboard",
    href: "", // This will be the root of the dashboard
  },
  {
    id: "solar-street-lights",
    icon: Lightbulb,
    label: "Solar Street Lights",
    subItems: [
      { label: "SSL Data", href: "ssl-data" },
      { label: "Bulk Approve", href: "bulk-approve" },
      { label: "Field Engineers", href: "field-engineers" },
      { label: "Swap Requests", href: "swap-requests" },
      { label: "Lights Location", href: "lights-location" },
    ],
  },
  {
    id: "report",
    icon: FileText,
    label: "Report",
    subItems: [
      { label: "Light Working Days", href: "light-working-days" },
      { label: "Fault Rectification Logs", href: "fault-rectification-logs" },
    ],
  },
  {
    id: "users",
    icon: Users,
    label: "Users",
    subItems: [
      { label: "Sub Users", href: "sub-users" },
      { label: "Field Engineers", href: "field-engineers" },
    ],
  },
  {
    id: "settings",
    icon: Settings,
    label: "Settings",
    href: "settings",
  },
];

const Sidebar = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  // const [isAnimating, setIsAnimating] = useState(false);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };
  const pathname = usePathname();
  // const toggleTheme = () => {
  //   setIsAnimating(true);
  //   setTimeout(() => {
  //     setTheme(theme === "dark" ? "light" : "dark");
  //   }, 500); // Wait for half of the animation before changing the theme
  // };
  // useEffect(() => {
  //   if (isAnimating) {
  //     const timer = setTimeout(() => setIsAnimating(false), 1000);
  //     return () => clearTimeout(timer);
  //   }
  // }, [isAnimating]);
  const { theme, setTheme } = useTheme();
  const router = useRouter();
  const toggleSubmenu = (id: string) => {
    if (!isExpanded) {
      setIsExpanded(true);
    }
    setOpenSubmenu(openSubmenu === id ? null : id);
  };

  useEffect(() => {
    // Open the submenu if the current path matches a subitem
    menuItems.forEach((item) => {
      if (
        item.subItems &&
        item.subItems.some((subItem) => isActive(getFullPath(subItem.href)))
      ) {
        setOpenSubmenu(item.id);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  // Function to get the full path
  const getFullPath = (href: string) => {
    const dashboardRoot = "/dashboard"; // Adjust this if your dashboard root changes
    return href ? `${dashboardRoot}/${href}` : dashboardRoot;
  };

  const isActive = (href: string) => pathname === href;
  const handleLogOut = () => {
    Cookies.remove("loginDetails");
    router.push("/login");
  };
  return (
    <div
      className={cn(
        "flex flex-col h-[100dvh] bg-background dark:bg-slate-700 border-r transition-all duration-300 ease-in-out relative ",
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
      <nav
        className={cn(
          "flex-1 px-2 py-4 overflow-y-auto",
          "scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100",
          "dark:scrollbar-thumb-gray-600 dark:scrollbar-track-gray-800",
          openSubmenu && "overflow-hidden"
        )}
      >
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.id}>
              {item.subItems ? (
                <>
                  <Button
                    variant="ghost"
                    className={cn(
                      "w-full flex items-center py-3 transition-colors duration-200",
                      isExpanded ? "justify-start px-4" : "justify-center",
                      item.subItems.some((subItem) =>
                        isActive(getFullPath(subItem.href))
                      ) && "bg-accent text-accent-foreground"
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
                          {item.subItems.map((subItem) => (
                            <li key={subItem.label}>
                              <Link href={getFullPath(subItem.href)} passHref>
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
                          ))}
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
          ))}
        </ul>
      </nav>
      <div
        className={cn(
          "flex items-center p-4 border-t",
          isExpanded ? "justify-between" : "justify-center"
        )}
      >
        {isExpanded && (
          <span className="text-sm font-medium dark:text-white">
            {theme === "dark" ? "Dark Mode" : "Light Mode"}
          </span>
        )}
        {/* Theme Switcher */}
        <button
          onClick={toggleTheme}
          className="relative w-12 h-6 rounded-full p-1 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-yellow-400"
          style={{
            backgroundColor: theme === "dark" ? "#1f2937" : "#fde68a",
          }}
        >
          <span className="sr-only">Toggle theme</span>
          <div
            className={`absolute left-1 top-1 w-4 h-4 rounded-full transition-all duration-300 ${
              theme === "dark"
                ? "bg-gray-600 translate-x-0"
                : "bg-white translate-x-6"
            }`}
          >
            {/* Filament */}
            <div
              className={`absolute inset-0 transition-opacity duration-300 ${
                theme === "dark" ? "opacity-0" : "opacity-100"
              }`}
            >
              <div className="absolute top-1/4 left-1/2 w-px h-2 bg-yellow-400 transform -translate-x-1/2 rotate-45" />
              <div className="absolute top-1/4 left-1/2 w-px h-2 bg-yellow-400 transform -translate-x-1/2 -rotate-45" />
            </div>
          </div>
          {/* Glow effect */}
          <div
            className={`absolute inset-0 rounded-full transition-opacity duration-300 ${
              theme === "dark" ? "opacity-0" : "opacity-40"
            }`}
            style={{
              background: "radial-gradient(circle, #fef08a, transparent 70%)",
            }}
          />
        </button>
      </div>
      <div className="p-4 border-t">
        <Button
          variant="ghost"
          className={cn(
            "w-full flex items-center py-3 transition-colors duration-200",
            isExpanded ? "justify-start px-4" : "justify-center"
          )}
          onClick={() => setIsLogoutModalOpen(true)}
        >
          <LogOut className="h-5 w-5 flex-shrink-0 mr-3" />
          {isExpanded && <span>LogOut</span>}
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
            <Button variant={"destructive"} onClick={handleLogOut}>
              Logout
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
export default Sidebar;
