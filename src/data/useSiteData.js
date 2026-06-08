import { useEffect, useState } from "react";
import { editorStorageKey, getActiveSiteData } from "./siteEditor.js";

export function useSiteData() {
  const [data, setData] = useState(() => getActiveSiteData());

  useEffect(() => {
    const updateData = () => setData(getActiveSiteData());

    window.addEventListener("storage", updateData);
    window.addEventListener("pronta-site-editor-updated", updateData);

    return () => {
      window.removeEventListener("storage", updateData);
      window.removeEventListener("pronta-site-editor-updated", updateData);
    };
  }, []);

  return data;
}

export function notifySiteDataUpdated() {
  window.dispatchEvent(new Event("pronta-site-editor-updated"));
}

export { editorStorageKey };
