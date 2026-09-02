"use client";
import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { removeAllLocalStorage, showToaster } from "@/lib/helperFunctions";
import { apiInstance } from "@/lib/axiosApi";
import { useLocalStorage } from "@/hooks";
import { Loader } from "@/ui";
import { useRouter } from "next/navigation";
import { ADMIN_BLOG_ROUTE, LOGIN_ROUTE } from "@/lib/constant";

export interface Product {
  id: string;
  title: string;
  description?: string;
  image?: string;
  slug?: string;
  page?: string;
  createdAt?: string;
}

export type ProductLoaderType = {
  [key: string]: boolean;
};

export type AuthContextType = {
  isLoading: boolean;
  isDrawerVisible: boolean;
  user: any;
  products: Product[];
  productLoader: ProductLoaderType;

  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  setProductLoader: React.Dispatch<React.SetStateAction<ProductLoaderType>>;
  setIsDrawerVisible: React.Dispatch<React.SetStateAction<boolean>>;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setUser: React.Dispatch<React.SetStateAction<any>>;

  onLogin: (payload: any) => void;
  onLogout: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [products, setProducts] = useState<Product[]>([]);

  const [productLoader, setProductLoader] = useState<ProductLoaderType>({
    extrudedproducts: false,
    newalloy: false,
    diemanufacturing: false,
    fabrication: false,
  });

  const [isDrawerVisible, setIsDrawerVisible] = useLocalStorage(
    false,
    "isDrawerVisible"
  );
  const [user, setUser] = useLocalStorage(null, "user", "cookies");

  const fetchAllProducts = async () => {
    try {
      const res = await axios.get("/api/product?limit=1000");
      setProducts(res.data.data || []);
    } catch (error) {
      console.error("Product fetch error", error);
    }
  };

  useEffect(() => {
    fetchAllProducts();
  }, []);

  const onLogin = async (payload: any) => {
    try {
      setIsLoading(true);
      const res: any = await apiInstance.post(`/auth/login`, {
        username: payload.email,
        password: payload.password,
      });
      setUser(res?.data);
      router.push(ADMIN_BLOG_ROUTE);
      showToaster(res?.message, true);
    } catch (err: any) {
      showToaster(err?.data, false);
    } finally {
      setIsLoading(false);
    }
  };

  const onLogout = async () => {
    setIsLoading(true);
    // The token is stateless, so logging out is purely client-side.
    removeAllLocalStorage(["local", "session", "cookies"]);
    setUser(null);
    router.push(LOGIN_ROUTE);
    setIsLoading(false);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isDrawerVisible,
        products,
        productLoader,
        setProducts,
        setProductLoader,
        setIsDrawerVisible,
        setUser,
        setIsLoading,
        onLogout,
        onLogin,
      }}
    >
      {isLoading ? (
        <div className="main absolute z-30 flex items-center justify-center h-full w-full">
          <Loader
            iconClassName="!text-black !fill-white !stroke-black"
            size={50}
          />
        </div>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
};

export default AuthContext;