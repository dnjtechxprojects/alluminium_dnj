// UI IMPORT
import { IconKey } from "@/ui/icons";

// TYPES
export interface MenuItemsTypes {
  // id: string;
  icon: IconKey;
  title: string;
  url: string;
  subItems?: MenuItemsTypes[];
}

/* ============================== MENU ITEMS ============================== */

export const menuItems: MenuItemsTypes[] = [
  {
    // id: "",
    icon: "Dashboard",
    title: "Blog",
    url: "/admin-blog",
  },
  {
    // id: "documents",
    icon: "Documents",
    title: "Product",
    url: "/admin-product",
  },
  // {
  //   // id: "upload-documents",
  //   icon: "Upload",
  //   title: "Upload Documents",
  //   url: "/upload-documents",
  // },
  // {
  //   // id: "users",
  //   icon: "Users",
  //   title: "Users",
  //   url: "/users",
  // },
  // {
  //   // id: "user-activity",
  //   icon: "UserSetting",
  //   title: "User Activity",
  //   url: "/user-activity",
  // },
  // {
  //   // id: "recent-chat",
  //   icon: "RecentChat",
  //   title: "Recent Chat",
  //   url: "/recent-chat",
  // },
  // {
  //   // id: "sections",
  //   icon: "Sections",
  //   title: "Sections Manage",
  //   url: "/sections",
  // },
  // {
  //   // id: "custom-questions",
  //   icon: "CustomQuestions",
  //   title: "Custom Questions",
  //   url: "/custom-questions",
  // },
  // {
  //   // id: "email-template",
  //   icon: "Email",
  //   title: "Email Template",
  //   url: "/email-template",
  // },
];
