"use client";
import {
  AlarmClockCheck,
  Check,
  CookingPot,
  Salad,
  Truck,
  Box,
  Users,
} from "lucide-react";
import { memo } from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { UserButton } from "@clerk/nextjs";
import { LucideIcon } from "lucide-react";

type NavItem = {
  id: string;
  title: string;
  url: string;
  icon: LucideIcon;
};

// Dashboard section
const MENU_ITEMS_dashboard: NavItem[] = [
  {
    id: "dashboard",
    title: "Tableau de bord",
    url: "/admin",
    icon: Box,
  },
];

// Products, Categories, Packs
const MENU_ITEMS_products: NavItem[] = [
  { id: "products", title: "Produits", url: "/admin/produits", icon: Box },
  { id: "categories", title: "Catégories", url: "/admin/categories", icon: Box },
  { id: "packs", title: "Packs", url: "/admin/packs", icon: Box },
];

// Store admins / settings
const MENU_ITEMS_admins: NavItem[] = [
  { id: "store-admins", title: "Admins", url: "/admin/users", icon: Users },
];


const SidebarItem = memo(
  ({ link, isActive }: { link: NavItem; isActive: boolean }) => (
    <SidebarMenuItem>
      <SidebarMenuButton
        asChild
        tooltip={link.title}
        isActive={isActive}
        className={`
          flex items-center gap-2 rounded-md px-3 py-2 text-sm
          hover:bg-primary hover:text-white
          data-[active=true]:bg-primary data-[active=true]:text-white
        `}
      >
        <Link href={link.url} className="flex w-full items-center gap-2">
          <link.icon className="w-5 h-5" />
          <span>{link.title}</span>
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  )
);

SidebarItem.displayName = "SidebarItem";

export const AppSidebar = memo(() => {
  const pathname = usePathname();

  return (
    <Sidebar collapsible="icon" className="">
      {/* Header */}
      <SidebarHeader className="">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              
              className="flex items-center gap-2 p-2"
            >
              <Box className="w-5 h-5" />
              <span>Soluker</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      {/* Content */}
      <SidebarContent className="flex-1 ">
        {/* Orders */}
        <SidebarGroup>
          <SidebarGroupLabel>Commandes</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {MENU_ITEMS_dashboard.map((item) => (
                <SidebarItem
                  key={item.id}
                  link={item}
                  isActive={pathname === item.url}
                />
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Products / Categories / Packs */}
        <SidebarGroup>
          <SidebarGroupLabel>Produits & Packs</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {MENU_ITEMS_products.map((item) => (
                <SidebarItem
                  key={item.id}
                  link={item}
                  isActive={pathname === item.url}
                />
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Admins */}
        <SidebarGroup>
          <SidebarGroupLabel>Gestion du magasin</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {MENU_ITEMS_admins.map((item) => (
                <SidebarItem
                  key={item.id}
                  link={item}
                  isActive={pathname === item.url}
                />
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* Footer */}
      <SidebarFooter className="">
        <SidebarMenu>
          <SidebarMenuItem className="text-center">
            <UserButton />
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
});

AppSidebar.displayName = "AppSidebar";
