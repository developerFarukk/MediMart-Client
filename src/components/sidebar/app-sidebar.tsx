

"use client"

import * as React from "react"
import medimart from '@/assets/nextmart.png'
import { BriefcaseMedical, DollarSign, Frame, IdCardIcon, LifeBuoy, LucideListOrdered, Map, PieChart, Send,  StoreIcon, User2, UserCircle,
  type LucideIcon 
} from "lucide-react"
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar"
import { NavMain } from "./nav-main"
import { NavUser } from "./nav-user"
import Link from "next/link"
import Image from "next/image"
import { useUser } from "@/context/UserContext"
import { NavCustomer } from "./nav-customer"

interface NavItem {
  title: string;
  url: string;
  icon: LucideIcon;
  isActive?: boolean;
  items?: {
    title: string;
    url: string;
  }[];
}

interface CustomerNavItem extends NavItem {
  items: {
    title: string;
    url: string;
  }[];
}

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },

  navMain: [
    {
      title: "Medicin Managments",
      url: "#",
      icon: BriefcaseMedical,
      isActive: false,
      items: [
        {
          title: "Add Medicin",
          url: "/admin/addmedicin",
        },
        {
          title: "All Medicins",
          url: "/admin/medicines",
        },
      ],
    },
    {
      title: "User Managments",
      url: "#",
      icon: User2,
      isActive: false,
      items: [
        {
          title: "All Users",
          url: "/admin/users",
        },
      ],
    },
    {
      title: "Orders Managments",
      url: "#",
      icon: LucideListOrdered,
      isActive: false,
      items: [
        {
          title: "All Orders",
          url: "/admin/orders",
        },
      ],
    },
    {
      title: "Payment managments",
      url: "#",
      icon: DollarSign,
      isActive: false,
      items: [
        {
          title: "Success payments",
          url: "/admin/successpayment",
        },
      ],
    },
  ] as NavItem[],

  navSecondary: [
    {
      title: "Support",
      url: "#",
      icon: LifeBuoy,
    },
    {
      title: "Feedback",
      url: "#",
      icon: Send,
    },
  ],

  projects: [
    {
      name: "Design Engineering",
      url: "#",
      icon: Frame,
    },
    {
      name: "Sales & Marketing",
      url: "#",
      icon: PieChart,
    },
    {
      name: "Travel",
      url: "#",
      icon: Map,
    },
  ],

  navCustomer: [
    {
      title: "Cart Managments",
      url: "#",
      icon: IdCardIcon,
      isActive: false,
      items: [
        {
          title: "My Card",
          url: "/customer/cart",
        },
      ],
    },
    {
      title: "Order Managments",
      url: "#",
      icon: StoreIcon,
      isActive: false,
      items: [
        {
          title: "Order History",
          url: "/customer/orders",
        },
      ],
    },
    {
      title: "Profile Managments",
      url: "#",
      icon: UserCircle,
      isActive: false,
      items: [
        {
          title: "Profile",
          url: "/customer/profile",
        },
      ],
    },
  ] as CustomerNavItem[],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { user } = useUser();

  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton className="bg-fuchsia-400 hover:bg-fuchsia-500" size="lg" asChild>
              <Link href="/">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg">
                  <Image src={medimart} height={40} width={40} alt="medimart" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">Medi Mart</span>
                  <span className="truncate text-xs">{user?.role}</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        {user?.role === "customer" && (
          <NavCustomer items={data.navCustomer} />
        )}
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  )
}