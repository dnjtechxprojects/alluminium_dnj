import { useEffect, useState } from "react";
import {
    error,
    getLocalStorage,
    setLocalStorage,
    StorageTypes,
} from "@/lib/helperFunctions";

const useLocalStorage = (
    defaultValue?: any,
    key?: string,
    type: StorageTypes = "local"
) => {
    const read = () => {
        if (!key) return defaultValue;
        try {
            return getLocalStorage(key, type) ?? defaultValue;
        } catch (err) {
            console.error("useLocalStorage read error:", err);
            return defaultValue;
        }
    };

    const [value, setValue] = useState<any>(() => read());

    const onSetValue = (updaterOrValue: any) => {
        setValue((prev: any) => {
            const persistedNow = key ? getLocalStorage(key, type) : undefined;

            const next =
                typeof updaterOrValue === "function"
                    ? updaterOrValue(prev, persistedNow)
                    : updaterOrValue;

            if (key) {
                try {
                    setLocalStorage(key, next, type);
                } catch (err) {
                    error("useLocalStorage set error:", err);
                }
            }
            return next;
        });
    };

    useEffect(() => {
        setValue(read());
    }, [key, type]);

    useEffect(() => {
        if (!key || type !== "local") return;
        const listener = (e: StorageEvent) => {
            if (e.key !== key) return;
            setValue(read());
        };
        window.addEventListener("storage", listener);
        return () => window.removeEventListener("storage", listener);
    }, [key, type, defaultValue]);

    useEffect(() => {
        if (!key || (type !== "session" && type !== "cookies")) return;

        const channel = new EventTarget();

        const handler = () => setValue(read());
        channel.addEventListener("storage-change", handler);

        return () => channel.removeEventListener("storage-change", handler);
    }, [key, type]);

    return [value, onSetValue] as const;
};

export default useLocalStorage;
