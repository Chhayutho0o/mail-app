import { DashboardConfig } from "@/types";


export const dashboardConfig: DashboardConfig = {
  mainNav: [
    {
      title: "Games",
      href: "/games",
    },
    {
      title: "News",
      href: "/news",
    },
    {
      title: "Users",
      href: "/users",
    },
    {
      title: "Post",
      href: "/posts",
    },
    {
      title: "Settings",
      href: "/settings",
      items: [
        {
          title: "Roles",
          href: "/settings/roles"
        },
        {
          title: "Tags",
          href: "/settings/tags"
        },
      ]
    },
  ],
}