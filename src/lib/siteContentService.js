import { mergeEditableData, toEditableData } from "../data/siteEditor.js";
import { siteData } from "../data/siteData.js";
import { isSupabaseConfigured, supabase } from "./supabaseClient.js";

export { isSupabaseConfigured };

const contentKey = "main";
const tableName = "site_content";
const bucketName = "site-assets";

export async function getPublishedContent() {
  if (!isSupabaseConfigured) {
    return null;
  }

  const { data, error } = await supabase
    .from(tableName)
    .select("content")
    .eq("key", contentKey)
    .maybeSingle();

  if (error) {
    console.error("Erro ao carregar conteúdo do Supabase:", error.message);
    return null;
  }

  return data?.content ?? null;
}

export async function savePublishedContent(content) {
  if (!isSupabaseConfigured) {
    throw new Error("Supabase não configurado.");
  }

  const { error } = await supabase.from(tableName).upsert({
    key: contentKey,
    content,
    updated_at: new Date().toISOString(),
  });

  if (error) {
    throw error;
  }
}

export async function signInEditor(email, password) {
  if (!isSupabaseConfigured) {
    throw new Error("Configure as variáveis VITE_SUPABASE_URL e VITE_SUPABASE_ANON_KEY.");
  }

  const { data, error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    throw error;
  }

  return data;
}

export async function signOutEditor() {
  if (!isSupabaseConfigured) {
    return;
  }

  await supabase.auth.signOut();
}

export async function getEditorSession() {
  if (!isSupabaseConfigured) {
    return null;
  }

  const { data } = await supabase.auth.getSession();
  return data.session;
}

export function onEditorAuthChange(callback) {
  if (!isSupabaseConfigured) {
    return () => {};
  }

  const { data } = supabase.auth.onAuthStateChange((_event, session) => callback(session));
  return () => data.subscription.unsubscribe();
}

export async function uploadSiteAsset(file) {
  if (!isSupabaseConfigured) {
    throw new Error("Supabase não configurado.");
  }

  const extension = file.name.split(".").pop()?.toLowerCase() || "png";
  const path = `site/${Date.now()}-${crypto.randomUUID()}.${extension}`;

  const { error } = await supabase.storage.from(bucketName).upload(path, file, {
    cacheControl: "31536000",
    upsert: false,
  });

  if (error) {
    throw error;
  }

  const { data } = supabase.storage.from(bucketName).getPublicUrl(path);
  return data.publicUrl;
}

export function getDefaultEditableContent() {
  return toEditableData(siteData);
}

export function mergePublishedContent(content) {
  return mergeEditableData(siteData, content);
}
