import { siteData } from "./siteData.js";

export const editorStorageKey = "pronta-site-editor-draft";

export function toEditableData(data = siteData) {
  return {
    brand: data.brand,
    legalName: data.legalName,
    foundedAt: data.foundedAt,
    location: data.location,
    serviceRegion: data.serviceRegion,
    domain: data.domain,
    additionalDomain: data.additionalDomain,
    email: data.email,
    whatsappDisplay: data.whatsappDisplay,
    whatsappUrl: data.whatsappUrl,
    logo: data.logo,
    hero: data.hero,
    about: data.about,
    servicesIntro: data.servicesIntro,
    sectorsIntro: data.sectorsIntro,
    differentialsIntro: data.differentialsIntro,
    cta: data.cta,
    contactIntro: data.contactIntro,
    stats: data.stats,
    areas: data.areas.map(({ title }) => title),
    services: data.services.map(({ title }) => title),
    sectors: data.sectors,
    differentials: data.differentials.map(({ title }) => title),
    contacts: data.contacts.map(({ label, value }) => ({ label, value })),
  };
}

export function getStoredEditableData() {
  try {
    const rawData = window.localStorage.getItem(editorStorageKey);
    return rawData ? JSON.parse(rawData) : null;
  } catch {
    return null;
  }
}

function mergeIconList(baseItems, editedTitles) {
  return editedTitles
    .filter(Boolean)
    .map((title, index) => ({
      ...(baseItems[index] ?? baseItems[0]),
      title,
    }));
}

export function mergeEditableData(baseData, editableData) {
  if (!editableData) {
    return baseData;
  }

  return {
    ...baseData,
    ...editableData,
    stats: editableData.stats ?? baseData.stats,
    areas: mergeIconList(baseData.areas, editableData.areas ?? []),
    services: mergeIconList(baseData.services, editableData.services ?? []),
    sectors: editableData.sectors ?? baseData.sectors,
    differentials: mergeIconList(baseData.differentials, editableData.differentials ?? []),
    contacts: (editableData.contacts ?? baseData.contacts).map((contact, index) => ({
      ...(baseData.contacts[index] ?? baseData.contacts[0]),
      ...contact,
    })),
  };
}

export function getActiveSiteData() {
  if (typeof window === "undefined") {
    return siteData;
  }

  return mergeEditableData(siteData, getStoredEditableData());
}
