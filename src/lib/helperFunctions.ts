"use client";

// PROJECT IMPRT
import { toast } from "sonner";
import Cookies from "js-cookie";
import { MOBILE_SIZE } from "./constant";

export const prepareWindow = (): any => {
  return typeof window !== "undefined" ? window : null;
};

export const prepareResponseToaster = (res: any) => {
  if (res?.status) {
    showToaster(res.message, res?.status || true);
  } else {
    showToaster("Something Went Wrong!", false);
  }
};

export const showToaster = (message: string, status: boolean = true) => {
  if (status) {
    toast.success(message, {
      style: {
        background: "#d4edda",
        color: "#155724",
      },
    });
  } else {
    toast.error(message || "Something went wrong!", {
      style: {
        background: "#f8d7da",
        color: "#721c24",
      },
    });
  }
};

export const storageTypes = {
  local: prepareWindow()?.localStorage,
  session: prepareWindow()?.sessionStorage,
  cookies: prepareWindow() ? Cookies : null,
};

export type StorageTypes = keyof typeof storageTypes;

export const setLocalStorage = (
  key: string,
  value: any,
  type: StorageTypes = "local",
  options = { expires: 365 }
) => {
  if (type === "local") {
    prepareWindow()?.localStorage.setItem(key, JSON.stringify(value || ""));
  } else if (type === "session") {
    prepareWindow()?.sessionStorage.setItem(key, JSON.stringify(value || ""));
  } else if (type === "cookies") {
    if (prepareWindow()) {
      Cookies.set(key, JSON.stringify(value), options);
    }
  }
};

export const removeLocalStorage = (
  key: string,
  type: StorageTypes = "local"
) => {
  if (type === "local") {
    prepareWindow()?.localStorage.removeItem(key);
  } else if (type === "session") {
    prepareWindow()?.sessionStorage.removeItem(key);
  } else if (type === "cookies") {
    if (prepareWindow()) {
      Cookies.remove(key);
    }
  }
};

export const removeAllLocalStorage = (types: StorageTypes[] = ["local"]) => {
  if (types?.includes("local")) {
    prepareWindow()?.localStorage.clear();
  }
  if (types?.includes("session")) {
    prepareWindow()?.sessionStorage.clear();
  }
  if (types?.includes("cookies")) {
    if (prepareWindow()) {
      const cookies = Cookies.get();

      Object.keys(cookies).forEach((cookie) => {
        Cookies.remove(cookie);
      });
    }
  }
};

export const getLocalStorage = (key: string, type: StorageTypes = "local") => {
  if (type === "local") {
    const newValue = prepareWindow()?.localStorage.getItem(key);
    return newValue ? JSON.parse(newValue) : null;
  } else if (type === "session") {
    const newValue = prepareWindow()?.sessionStorage.getItem(key);
    return newValue ? JSON.parse(newValue) : null;
  } else if (type === "cookies") {
    let newValue: any;
    if (prepareWindow()) {
      newValue = Cookies.get(key);
    }


    
    return newValue ? JSON.parse(newValue) : null;
  }
};

export const copyToClipboard = async (
  text: string,
  props?: { isToast?: boolean }
) => {
  try {
    await prepareWindow()?.navigator.clipboard.writeText(text);
    if (props?.isToast) {
      showToaster(`Copy :- ${text}`);
    }
  } catch (err) {
    error("Failed to copy text: ", err);
    if (props?.isToast) {
      showToaster(`Failed to copy text.`, false);
    }
  }
};

export const dateFormatter = (
  d: Date,
  options: any = { year: "numeric", month: "long", day: "numeric" }
) => {
  const date = new Date(d);

  const formattedDate = date.toLocaleDateString("en-US", options);

  return formattedDate;
};

export const dateFormatterShorter = (d: Date) => {
  const date = new Date(d);
  const today = new Date();
  const yesterday = new Date();
  yesterday.setDate(today.getDate() - 1);

  const format = (d: any) => d.toISOString().split("T")[0];

  if (format(date) === format(today)) {
    return "Today";
  } else if (format(date) === format(yesterday)) {
    return "Yesterday";
  } else {
    return date.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
    });
  }
};

export const prepareDateFormat = (date: any, formatter = "-") => {
  if (!date) return "";
  const d = new Date(date),
    month = "" + (d.getMonth() + 1),
    day = "" + d.getDate(),
    year = d.getFullYear();

  return [year, month?.padStart(2, "0"), day?.padStart(2, "0")].join(formatter);
};

// export const prepareMonthRange = (
//   year: number,
//   month: number,
//   formatter = "-"
// ) => {
//   const startDate = new Date(+year, +month, 1);

//   const endDate = new Date(+year, +month + 1, 0);

//   return {
//     start_date: prepareDateFormat(startDate, formatter),
//     end_date: prepareDateFormat(endDate, formatter),
//   };
// };

export const prepareMonthRange = (
  year: string,
  month: string,
) => {

  const startDate = `${year?.toString()}-${(+month + 1)?.toString()?.padStart(2, "0")}-01`;
  const lastDate = new Date(+year, +month + 1, 0).getDate();
  
  const endDate = `${year?.toString()}-${(+month + 1)?.toString()?.padStart(2, "0")}-${lastDate?.toString()?.padStart(2,"0")}`;

  return {
    start_date: startDate,
    end_date: endDate,
  };
};

export const passwordValidation = (
  yup: any,
  message = "Please enter your password"
) => {
  return yup.string().required(message);
  return yup
    .string()
    .required(message)
    .min(6, "Password must be at least 6 characters")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    .matches(/[0-9]/, "Password must contain at least one number")
    .matches(
      /[@$!%*?&#]/,
      "Password must contain at least one special character"
    );
};

export const onClearAllStorage = (reload = false) => {
  removeAllLocalStorage(["local", "session", "cookies"]);

  if (reload) {
    prepareWindow()?.location.reload();
  }
};

export const copyHTMLandMarkdownToClipboard = (content: string, html: any) => {
  try {
    prepareWindow()?.navigator.clipboard.write([
      new ClipboardItem({
        "text/plain": new Blob([content], { type: "text/plain" }),
        "text/html": new Blob([html], { type: "text/html" }),
      }),
    ]);
  } catch (err) {
    error("Error copying HTML: ", err);
  }
};

export const prepareSystemMode = () => {
  return prepareWindow()?.matchMedia("(prefers-color-scheme: dark)").matches
    ? "Dark"
    : "Light";
};

export const detectOS = () => {
  let platform = "win";
  if (prepareWindow()) {
    const p = prepareWindow()?.navigator.userAgent.toLowerCase();
    if (p.includes("mac")) {
      platform = "mac";
    } else if (p.includes("win")) {
      platform = "win";
    }
  }

  return platform;
};

export const error = (...payload: any) => {
  if (process.env.NODE_ENV !== "production") {
    console.error(...payload);
  }
};

export const log = ({ ...payload }: any) => {
  if (process.env.NODE_ENV !== "production") {
    console.log(...payload);
  }
};

export const warn = ({ ...payload }: any) => {
  if (process.env.NODE_ENV !== "production") {
    console.warn(...payload);
  }
};

interface OpenWindowPorps {
  url: string;
  title: string;
  width?: number;
  height?: number;
  left?: number;
  top?: number;
}

export const openWindow = (props: OpenWindowPorps) => {
  const { url, title, width = 700, height = 600 } = props;

  const dualScreenLeft =
    prepareWindow()?.screenLeft ?? prepareWindow()?.screenX;
  const dualScreenTop = prepareWindow()?.screenTop ?? prepareWindow()?.screenY;

  const screenWidth = prepareWindow()?.screen.availWidth;
  const screenHeight = prepareWindow()?.screen.availHeight;

  const finalLeft = dualScreenLeft + (screenWidth - width) / 2;
  const finalTop = dualScreenTop + (screenHeight - height) / 2;

  const newWindow = prepareWindow()?.open(
    url,
    title,
    `width=${width},height=${height},top=${finalTop},left=${finalLeft}`
  );

  newWindow?.focus();

  return newWindow;
};

export const prepareCategorizeData = (
  data: any[]
): {
  label: string;
  data: any[];
}[] => {
  const now = new Date();
  const startOfToday = new Date(now.setHours(0, 0, 0, 0));
  const startOfYesterday = new Date(startOfToday);
  startOfYesterday.setDate(startOfToday.getDate() - 1);
  const startOf7DaysAgo = new Date(startOfToday);
  startOf7DaysAgo.setDate(startOfToday.getDate() - 7);
  const startOf30DaysAgo = new Date(startOfToday);
  startOf30DaysAgo.setDate(startOfToday.getDate() - 30);

  const today: any[] = [];
  const yesterday: any[] = [];
  const previous7Days: any[] = [];
  const previous30Days: any[] = [];
  const months: Record<string, any[]> = {};

  const newItems = [...(data || [])];
  newItems
    ?.sort(
      (a, b) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    )
    .forEach((item) => {
      const date = new Date(item.created_at);

      if (date >= startOfToday) today.push(item);
      else if (date >= startOfYesterday) yesterday.push(item);
      else if (date >= startOf7DaysAgo) previous7Days.push(item);
      else if (date >= startOf30DaysAgo) previous30Days.push(item);
      else {
        const monthYear = date.toLocaleString("default", {
          month: "long",
          year: "numeric",
        });
        if (!months[monthYear]) months[monthYear] = [];
        months[monthYear].push(item);
      }
    });

  const monthsArray = Object.keys(months).map((month) => ({
    label: month,
    data: months[month],
  }));

  return [
    { label: "Today", data: today },
    { label: "Yesterday", data: yesterday },
    { label: "Previous 7 Days", data: previous7Days },
    { label: "Previous 30 Days", data: previous30Days },
    ...monthsArray,
  ].filter((category) => category.data.length > 0);
};

export const prepareIsMobile = () => {
  return prepareWindow()?.innerWidth <= MOBILE_SIZE;
};

export const prepareObject = (text: string): Record<string, string[]> => {
  const cleaned = text.trim();

  // Remove Markdown code blocks like ```json ... ```
  if (cleaned.startsWith("```")) {
    const stripped = cleaned
      .replace(/```(?:json)?\s*/g, "")
      .replace(/```$/, "")
      .trim();
    return JSON.parse(stripped);
  }

  return JSON.parse(cleaned);
};

export const prepareDateMonth = () => {
  return `${new Date().getDate()}/${new Date().getMonth()}`;
};

export const onDownloadFile = (file: any) => {
  const fileURL = URL.createObjectURL(file);
  const a = prepareWindow()?.document.createElement("a");
  a.href = fileURL;
  a.download = file.name;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(fileURL);
};

export const prepareMonths = () => {
  return Array.from({ length: 12 }, (_, i) => ({
    value: (i)?.toString(), // 0-indexed for JS Date
    title: new Date(0, i).toLocaleString("default", { month: "long" }),
  }));
};

export const prepareYears = (pastYears = 20, futureYears = 0) => {
  const currentYear = new Date().getFullYear();
  return Array.from(
    { length: pastYears + futureYears + 1 },
    (_, i) => currentYear - pastYears + i
  ).map((year) => ({ value: year?.toString(), title: year?.toString() }));
};

export const prepareCurrentMonthYear = () => {
  const today = new Date();
  const month = today.getMonth() + 1;
  const year = today.getFullYear();
  return { month: month?.toString(), year: year?.toString() };
};

export const prepareParams = (url: string, param: string) => {

  if(!url){
    return null
  }
  const urlObj = new URL(url);
  const params = new URLSearchParams(urlObj.search);
  return params.get(param)
}