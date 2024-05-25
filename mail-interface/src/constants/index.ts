import {
  AlertCircle,
  Archive,
  ArchiveX,
  File,
  Inbox,
  MessagesSquare,
  Send,
  ShoppingCart,
  Trash2,
  Users2,
} from "lucide-react";

export const NAV_ITEMS = {
  section1: [
    {
      title: "Inbox",
      label: "128",
      icon: Inbox,
      variant: "default",
      href: "/",
    },
    {
      title: "Drafts",
      label: "9",
      icon: File,
      href: "/drafts",
    },
    {
      title: "Sent",
      label: "",
      icon: Send,
      href: "/sent",
    },
    {
      title: "Junk",
      label: "23",
      icon: ArchiveX,
      href: "/junk",
    },
    {
      title: "Trash",
      label: "",
      icon: Trash2,
      href: "/trash",
    },
    {
      title: "Archive",
      label: "",
      icon: Archive,
      href: "/archive",
    },
  ],
  section2: [
    {
      title: "Social",
      label: "972",
      icon: Users2,
      href: "/socials",
    },
    {
      title: "Updates",
      label: "342",
      icon: AlertCircle,
      href: "/updates",
    },
    {
      title: "Forums",
      label: "128",
      icon: MessagesSquare,
      href: "/forums",
    },
    {
      title: "Shopping",
      label: "8",
      icon: ShoppingCart,
      href: "/shoppings",
    },
    {
      title: "Promotions",
      label: "21",
      icon: Archive,
      href: "/promotions",
    },
  ],
};

export const RESIZABLE_VALUE = {
  defaultLayout: [16, 35, 49],
  defaultCollapsed: false,
  navCollapsedSize: 4,
};
