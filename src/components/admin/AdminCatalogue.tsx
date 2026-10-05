"use client";

import { useEffect, useState } from "react";
import { apiInstance } from "@/lib/axiosApi";
import { showToaster } from "@/lib/helperFunctions";
import { CATALOGUE_HEADING, CATALOGUES } from "@/lib/catalogue";

type UploadedMap = Record<string, string>;

export default function AdminCatalogue() {
  const [uploaded, setUploaded] = useState<UploadedMap>({});
  const [uploadingSlot, setUploadingSlot] = useState<string | null>(null);

  useEffect(() => {
    const fetchCatalogues = async () => {
      try {
        const res: any = await apiInstance.get("/catalogue");
        const map: UploadedMap = {};
        (res.data || []).forEach((item: { slot: string; updatedAt: string }) => {
          map[item.slot] = item.updatedAt;
        });
        setUploaded(map);
      } catch (err) {
        console.error("Fetch error", err);
      }
    };
    fetchCatalogues();
  }, []);

  const handleUpload = async (
    slot: string,
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;

    try {
      setUploadingSlot(slot);
      const formData = new FormData();
      formData.append("slot", slot);
      formData.append("file", file);

      const json: any = await apiInstance.post("/catalogue", formData);

      showToaster(json.message, true);
      setUploaded((prev) => ({ ...prev, [slot]: json.data.updatedAt }));
    } catch (error) {
      console.error(error);
    } finally {
      setUploadingSlot(null);
    }
  };

  return (
    <div className="w-full py-6 px-6 bg-white">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">{CATALOGUE_HEADING}</h1>
        <p className="text-gray-500 mb-8">
          These PDFs are downloadable from the Extruded Products page.
          Uploading a new file replaces the current one.
        </p>

        <div className="grid gap-6 md:grid-cols-2">
          {CATALOGUES.map(({ slot, title }) => {
            const updatedAt = uploaded[slot];
            const isUploading = uploadingSlot === slot;

            return (
              <div key={slot} className="border rounded-xl p-5 space-y-4">
                <h2 className="text-xl font-semibold">{title}</h2>

                {updatedAt ? (
                  <div className="text-sm text-gray-600 space-y-1">
                    <p>
                      Last uploaded: {new Date(updatedAt).toLocaleString()}
                    </p>
                    <a
                      href={`/api/catalogue/${slot}`}
                      className="text-blue-600 underline"
                    >
                      Download current PDF
                    </a>
                  </div>
                ) : (
                  <p className="text-sm text-gray-400">No PDF uploaded yet</p>
                )}

                <input
                  type="file"
                  accept="application/pdf"
                  disabled={uploadingSlot !== null}
                  onChange={(e) => handleUpload(slot, e)}
                  className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4
                    file:rounded file:border-0 file:text-sm file:font-semibold
                    file:bg-black file:text-white hover:file:cursor-pointer disabled:opacity-50"
                />

                {isUploading && (
                  <p className="text-sm text-gray-500">Uploading...</p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
