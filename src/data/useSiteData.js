import { useEffect, useState } from "react";
import { editorStorageKey, getActiveSiteData } from "./siteEditor.js";
import { getPublishedContent, mergePublishedContent } from "../lib/siteContentService.js";

export function useSiteData() {
  const [data, setData] = useState(() => getActiveSiteData());

  useEffect(() => {
    let isMounted = true;

    const updateData = () => {
      setData(getActiveSiteData());

      getPublishedContent().then((content) => {
        if (isMounted && content) {
          setData(mergePublishedContent(content));
        }
      });
    };

    updateData();

    window.addEventListener("storage", updateData);
    window.addEventListener("pronta-site-editor-updated", updateData);

    return () => {
      isMounted = false;
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
