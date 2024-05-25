import { Icons } from "@/components/icons";
import { LucideIcon } from "lucide-react";

export type MainNavItem = NavItem;

export type DashboardConfig = {
  mainNav: MainNavItem[];
};

type AuthForm = {
  email?: string;
  username?: string;
  password: string;
};

type Meta = {
  total?: number;
  perPage: ?number;
  currentPage?: number;
  next?: number;
  totalPage?: number;
  previous?: number;
  pages?: number[];
};

type User = {
  id: number;
  username: string;
  firstName: string;
  lastName: string;
  age: number;
  gender: string;
  email: string;
  phone: string;
  birthDate: string;
  image: string;
};

type UserSummary = {
  id: number;
  username: string;
  profile: string;
  email: string;
};

interface Users extends Meta {
  users: User[];
}

type NavItem = {
  title: string;
  label?: string;
  icon: LucideIcon;
  href: string;
};

type Tag = {
  id?: number;
  name: string;
  color: string;
  level?: number;
};

type Email = {
  id: number;
  subject: string;
  body: string;
  level?: number;
  is_read: boolean;
  created_at: string;
  from: UserSummary;
  recipient: Recipient;
  tags: Tag[];
};

type EmailMeta = {
  data: Email[];
  meta?: Meta;
  status?: string;
  message?: string;
};

type SearchParams = {
  searchParams: { [key: string]: string | string[] | undefined };
};

type Recipient = {
  id: number;
  is_read: boolean;
  read_date: string;
  to_id: number;
  status: string;
};
