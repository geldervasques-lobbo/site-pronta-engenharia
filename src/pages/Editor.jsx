import { Download, Eye, FileText, Image, KeyRound, Mail, Plus, RotateCcw, Save, Trash2 } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { siteData } from "../data/siteData.js";
import { editorStorageKey, notifySiteDataUpdated } from "../data/useSiteData.js";
import { getStoredEditableData, toEditableData } from "../data/siteEditor.js";
import {
  getDefaultEditableContent,
  getEditorSession,
  getPublishedContent,
  isSupabaseConfigured,
  onEditorAuthChange,
  requestPasswordReset,
  savePublishedContent,
  signInEditor,
  signInWithMagicLink,
  signOutEditor,
  updateEditorPassword,
  uploadSiteAsset,
} from "../lib/siteContentService.js";

function Field({ label, value, onChange, placeholder, type = "text" }) {
  return (
    <label className="grid gap-2">
      <span className="text-sm font-semibold text-graphite-900">{label}</span>
      <input
        type={type}
        value={value ?? ""}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="border border-stone-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-petroleum-700 focus:ring-4 focus:ring-petroleum-700/10"
      />
    </label>
  );
}

function TextArea({ label, value, onChange, rows = 4 }) {
  return (
    <label className="grid gap-2">
      <span className="text-sm font-semibold text-graphite-900">{label}</span>
      <textarea
        value={value ?? ""}
        onChange={(event) => onChange(event.target.value)}
        rows={rows}
        className="resize-y border border-stone-300 bg-white px-4 py-3 text-sm leading-6 outline-none transition focus:border-petroleum-700 focus:ring-4 focus:ring-petroleum-700/10"
      />
    </label>
  );
}

function Panel({ title, icon: Icon, children }) {
  return (
    <section className="border border-stone-200 bg-white p-5 shadow-sm">
      <div className="mb-5 flex items-center gap-3 border-b border-stone-200 pb-4">
        <Icon size={22} className="text-ambercta" />
        <h2 className="text-lg font-semibold text-graphite-950">{title}</h2>
      </div>
      <div className="grid gap-4">{children}</div>
    </section>
  );
}

function ListEditor({ label, values, onChange }) {
  const updateItem = (index, value) => {
    onChange(values.map((item, itemIndex) => (itemIndex === index ? value : item)));
  };

  const removeItem = (index) => {
    onChange(values.filter((_, itemIndex) => itemIndex !== index));
  };

  return (
    <div className="grid gap-3">
      <div className="flex items-center justify-between gap-3">
        <span className="text-sm font-semibold text-graphite-900">{label}</span>
        <button type="button" className="editor-small-button" onClick={() => onChange([...values, ""])}>
          <Plus size={16} />
          Adicionar
        </button>
      </div>
      {values.map((item, index) => (
        <div key={`${label}-${index}`} className="flex gap-2">
          <input
            value={item}
            onChange={(event) => updateItem(index, event.target.value)}
            className="min-w-0 flex-1 border border-stone-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-petroleum-700 focus:ring-4 focus:ring-petroleum-700/10"
          />
          <button type="button" className="editor-icon-button" onClick={() => removeItem(index)} aria-label="Remover item">
            <Trash2 size={17} />
          </button>
        </div>
      ))}
    </div>
  );
}

function ContactEditor({ values, onChange }) {
  const updateContact = (index, key, value) => {
    onChange(values.map((item, itemIndex) => (itemIndex === index ? { ...item, [key]: value } : item)));
  };

  return (
    <div className="grid gap-4">
      <div className="flex items-center justify-between gap-3">
        <span className="text-sm font-semibold text-graphite-900">Contatos</span>
        <button type="button" className="editor-small-button" onClick={() => onChange([...values, { label: "", value: "" }])}>
          <Plus size={16} />
          Adicionar
        </button>
      </div>
      {values.map((contact, index) => (
        <div key={`contact-${index}`} className="grid gap-3 border border-stone-200 bg-stone-50 p-4 sm:grid-cols-[0.8fr_1.2fr_auto]">
          <Field label="Rótulo" value={contact.label} onChange={(value) => updateContact(index, "label", value)} />
          <Field label="Valor" value={contact.value} onChange={(value) => updateContact(index, "value", value)} />
          <button
            type="button"
            className="editor-icon-button self-end"
            onClick={() => onChange(values.filter((_, itemIndex) => itemIndex !== index))}
            aria-label="Remover contato"
          >
            <Trash2 size={17} />
          </button>
        </div>
      ))}
    </div>
  );
}

export default function Editor() {
  const initialData = useMemo(() => getStoredEditableData() ?? toEditableData(siteData), []);
  const [draft, setDraft] = useState(initialData);
  const [status, setStatus] = useState("Carregando editor.");
  const [session, setSession] = useState(null);
  const [isLoading, setIsLoading] = useState(isSupabaseConfigured);
  const [isSaving, setIsSaving] = useState(false);
  const [login, setLogin] = useState({ email: "", password: "" });
  const [passwordReset, setPasswordReset] = useState({ password: "", confirmPassword: "" });
  const [showPasswordReset, setShowPasswordReset] = useState(() => {
    const urlText = `${window.location.search}${window.location.hash}`;
    return urlText.includes("type=recovery") || urlText.includes("recovery") || urlText.includes("code=");
  });

  useEffect(() => {
    if (!isSupabaseConfigured) {
      setStatus("Supabase ainda não configurado. O editor está em modo de rascunho local.");
      return;
    }

    getEditorSession().then((currentSession) => {
      setSession(currentSession);
      setIsLoading(false);
      setStatus(currentSession ? "Sessão ativa." : "Entre com uma conta autorizada para editar o site.");
    });

    return onEditorAuthChange((currentSession) => setSession(currentSession));
  }, []);

  useEffect(() => {
    if (!isSupabaseConfigured || !session) {
      return;
    }

    setStatus("Carregando conteúdo publicado.");
    getPublishedContent()
      .then((content) => {
        setDraft(content ?? getDefaultEditableContent());
        setStatus("Conteúdo publicado carregado. Edite e salve para publicar.");
      })
      .catch((error) => setStatus(`Não foi possível carregar o conteúdo: ${error.message}`));
  }, [session]);

  const update = (key, value) => setDraft((current) => ({ ...current, [key]: value }));
  const updateGroup = (group, key, value) => {
    setDraft((current) => ({ ...current, [group]: { ...current[group], [key]: value } }));
  };

  const saveDraft = async () => {
    setIsSaving(true);

    if (isSupabaseConfigured && session) {
      try {
        await savePublishedContent(draft);
        window.localStorage.setItem(editorStorageKey, JSON.stringify(draft));
        notifySiteDataUpdated();
        setStatus(`Alterações publicadas no Supabase às ${new Date().toLocaleTimeString("pt-BR")}. Abra o site e atualize a página.`);
      } catch (error) {
        setStatus(`Erro ao salvar no Supabase: ${error.message}`);
      } finally {
        setIsSaving(false);
      }
      return;
    }

    window.localStorage.setItem(editorStorageKey, JSON.stringify(draft));
    notifySiteDataUpdated();
    setStatus("Rascunho salvo neste navegador. Configure o Supabase para publicar de qualquer aparelho.");
    setIsSaving(false);
  };

  const resetDraft = () => {
    window.localStorage.removeItem(editorStorageKey);
    const originalData = toEditableData(siteData);
    setDraft(originalData);
    notifySiteDataUpdated();
    setStatus("Rascunho limpo. Os dados originais do projeto voltaram a valer.");
  };

  const exportJson = () => {
    const blob = new Blob([JSON.stringify(draft, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "pronta-site-data.json";
    link.click();
    URL.revokeObjectURL(url);
    setStatus("JSON exportado. Use esse arquivo como referência ou backup do conteúdo.");
  };

  const uploadLogo = async (file) => {
    if (!file) {
      return;
    }

    if (isSupabaseConfigured && session) {
      setStatus("Enviando imagem para o Supabase Storage.");
      try {
        const publicUrl = await uploadSiteAsset(file);
        update("logo", publicUrl);
        setStatus("Imagem enviada. Salve as alterações para publicar a nova logo.");
      } catch (error) {
        setStatus(`Erro ao enviar imagem: ${error.message}`);
      }
      return;
    }

    const reader = new FileReader();
    reader.onload = () => update("logo", reader.result);
    reader.readAsDataURL(file);
    setStatus("Logo carregada para prévia local. Configure o Supabase Storage para publicar imagens.");
  };

  const submitLogin = async (event) => {
    event.preventDefault();
    setStatus("Entrando.");

    try {
      const data = await signInEditor(login.email, login.password);
      setSession(data.session);
      setStatus("Login realizado.");
    } catch (error) {
      setStatus(`Não foi possível entrar: ${error.message}`);
    }
  };

  const sendMagicLink = async () => {
    if (!login.email) {
      setStatus("Informe o e-mail antes de enviar o link mágico.");
      return;
    }

    try {
      await signInWithMagicLink(login.email);
      setStatus("Link mágico enviado. Abra o e-mail neste aparelho ou no aparelho do cliente.");
    } catch (error) {
      setStatus(`Não foi possível enviar o link mágico: ${error.message}`);
    }
  };

  const sendPasswordReset = async () => {
    if (!login.email) {
      setStatus("Informe o e-mail antes de solicitar a redefinição.");
      return;
    }

    try {
      await requestPasswordReset(login.email);
      setStatus("E-mail de redefinição enviado. Abra o link e defina a nova senha no editor.");
    } catch (error) {
      setStatus(`Não foi possível enviar a redefinição: ${error.message}`);
    }
  };

  const submitPasswordReset = async (event) => {
    event.preventDefault();

    if (passwordReset.password.length < 6) {
      setStatus("A nova senha precisa ter pelo menos 6 caracteres.");
      return;
    }

    if (passwordReset.password !== passwordReset.confirmPassword) {
      setStatus("A confirmação de senha não confere.");
      return;
    }

    try {
      await updateEditorPassword(passwordReset.password);
      setPasswordReset({ password: "", confirmPassword: "" });
      setShowPasswordReset(false);
      window.history.replaceState({}, "", "/editar");
      setStatus("Senha atualizada. Você já pode editar o site.");
    } catch (error) {
      setStatus(`Não foi possível atualizar a senha: ${error.message}`);
    }
  };

  const handleSignOut = async () => {
    await signOutEditor();
    setSession(null);
    setStatus("Sessão encerrada.");
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-stone-100 px-4">
        <div className="border border-stone-200 bg-white p-8 shadow-sm">
          <p className="eyebrow">Editor</p>
          <h1 className="mt-3 text-2xl font-semibold text-graphite-950">Carregando acesso seguro.</h1>
        </div>
      </div>
    );
  }

  if (isSupabaseConfigured && !session) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-petroleum-950 px-4 text-white">
        <form className="w-full max-w-md border border-white/10 bg-white p-6 text-graphite-950 shadow-2xl" onSubmit={submitLogin}>
          <p className="eyebrow">Acesso seguro</p>
          <h1 className="mt-3 text-3xl font-semibold">Entrar no editor</h1>
          <p className="mt-3 text-sm leading-6 text-graphite-800/70">
            Use uma conta autorizada no Supabase para editar textos e imagens do site.
          </p>
          <div className="mt-6 grid gap-4">
            <Field label="E-mail" value={login.email} onChange={(value) => setLogin((current) => ({ ...current, email: value }))} />
            <Field label="Senha" type="password" value={login.password} onChange={(value) => setLogin((current) => ({ ...current, password: value }))} />
            <button type="submit" className="btn-primary justify-center">
              Entrar
            </button>
            <button type="button" className="editor-action-button justify-center bg-white text-graphite-900 hover:bg-stone-50" onClick={sendMagicLink}>
              <Mail size={18} />
              Enviar link mágico
            </button>
            <button type="button" className="editor-action-button justify-center bg-white text-graphite-900 hover:bg-stone-50" onClick={sendPasswordReset}>
              <KeyRound size={18} />
              Redefinir senha
            </button>
            <a href="/" className="editor-action-button justify-center bg-white text-graphite-900 hover:bg-stone-50">
              Ver site
            </a>
          </div>
          <p className="mt-5 border-l-4 border-ambercta bg-stone-50 p-3 text-sm leading-6 text-graphite-800">
            {status}
          </p>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-100 text-graphite-900">
      <header className="border-b border-stone-200 bg-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-5 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <div>
            <p className="eyebrow">{isSupabaseConfigured ? "Editor seguro" : "Editor local"}</p>
            <h1 className="mt-2 text-3xl font-semibold text-graphite-950">Editar conteúdo da PRONTA Engenharia</h1>
          </div>
          <div className="flex flex-wrap gap-3">
            <a href="/" className="editor-action-button bg-graphite-900 text-white hover:bg-graphite-800">
              <Eye size={18} />
              Ver site
            </a>
            <button type="button" className="editor-action-button bg-ambercta text-white hover:bg-[#c87320]" onClick={saveDraft} disabled={isSaving}>
              <Save size={18} />
              {isSaving ? "Salvando" : isSupabaseConfigured ? "Publicar" : "Salvar rascunho"}
            </button>
            <button type="button" className="editor-action-button bg-white text-graphite-900 hover:bg-stone-50" onClick={exportJson}>
              <Download size={18} />
              Exportar JSON
            </button>
            <button type="button" className="editor-action-button bg-white text-graphite-900 hover:bg-stone-50" onClick={resetDraft}>
              <RotateCcw size={18} />
              Limpar
            </button>
            {session ? (
              <button type="button" className="editor-action-button bg-white text-graphite-900 hover:bg-stone-50" onClick={handleSignOut}>
                Sair
              </button>
            ) : null}
          </div>
        </div>
      </header>

      <main className="mx-auto grid max-w-7xl gap-6 px-4 py-8 sm:px-6 lg:grid-cols-[0.78fr_1.22fr] lg:px-8">
        <aside className="grid content-start gap-6">
          {showPasswordReset ? (
            <Panel title="Definir nova senha" icon={KeyRound}>
              <form className="grid gap-4" onSubmit={submitPasswordReset}>
                <Field
                  label="Nova senha"
                  type="password"
                  value={passwordReset.password}
                  onChange={(value) => setPasswordReset((current) => ({ ...current, password: value }))}
                />
                <Field
                  label="Confirmar nova senha"
                  type="password"
                  value={passwordReset.confirmPassword}
                  onChange={(value) => setPasswordReset((current) => ({ ...current, confirmPassword: value }))}
                />
                <button type="submit" className="btn-primary justify-center">
                  Atualizar senha
                </button>
              </form>
            </Panel>
          ) : null}

          <Panel title="Marca e imagem" icon={Image}>
            <div className="border border-stone-200 bg-stone-50 p-4">
              <div className="flex h-28 items-center justify-center bg-white p-4">
                <img src={draft.logo} alt="Prévia da logo" className="max-h-full max-w-full object-contain" />
              </div>
            </div>
            <Field label="Caminho da logo" value={draft.logo} onChange={(value) => update("logo", value)} />
            <label className="grid gap-2">
              <span className="text-sm font-semibold text-graphite-900">Carregar imagem para prévia</span>
              <input
                type="file"
                accept="image/png,image/jpeg,image/webp,image/svg+xml"
                onChange={(event) => uploadLogo(event.target.files?.[0])}
                className="border border-stone-300 bg-white px-4 py-3 text-sm"
              />
            </label>
          </Panel>

          <Panel title="Contatos e domínios" icon={FileText}>
            <Field label="Marca" value={draft.brand} onChange={(value) => update("brand", value)} />
            <Field label="Razão social" value={draft.legalName} onChange={(value) => update("legalName", value)} />
            <Field label="WhatsApp exibido" value={draft.whatsappDisplay} onChange={(value) => update("whatsappDisplay", value)} />
            <Field label="Link do WhatsApp" value={draft.whatsappUrl} onChange={(value) => update("whatsappUrl", value)} />
            <Field label="E-mail" value={draft.email} onChange={(value) => update("email", value)} />
            <Field label="Domínio principal" value={draft.domain} onChange={(value) => update("domain", value)} />
            <Field label="Domínio adicional" value={draft.additionalDomain} onChange={(value) => update("additionalDomain", value)} />
          </Panel>
        </aside>

        <div className="grid gap-6">
          <div className="border-l-4 border-ambercta bg-white p-4 text-sm leading-6 text-graphite-800 shadow-sm">
            {status}
          </div>

          <Panel title="Hero" icon={FileText}>
            <Field label="Chamada pequena" value={draft.hero.eyebrow} onChange={(value) => updateGroup("hero", "eyebrow", value)} />
            <Field label="Título principal" value={draft.hero.title} onChange={(value) => updateGroup("hero", "title", value)} />
            <TextArea label="Subtítulo" value={draft.hero.subtitle} onChange={(value) => updateGroup("hero", "subtitle", value)} />
            <TextArea label="Nota técnica do card" value={draft.hero.technicalNote} onChange={(value) => updateGroup("hero", "technicalNote", value)} />
          </Panel>

          <Panel title="Sobre" icon={FileText}>
            <Field label="Etiqueta" value={draft.about.eyebrow} onChange={(value) => updateGroup("about", "eyebrow", value)} />
            <Field label="Título" value={draft.about.title} onChange={(value) => updateGroup("about", "title", value)} />
            <ListEditor
              label="Parágrafos"
              values={draft.about.paragraphs}
              onChange={(value) => updateGroup("about", "paragraphs", value)}
            />
          </Panel>

          <Panel title="Seções e listas" icon={FileText}>
            <Field label="Título dos serviços" value={draft.servicesIntro.title} onChange={(value) => updateGroup("servicesIntro", "title", value)} />
            <TextArea label="Texto dos serviços" value={draft.servicesIntro.text} onChange={(value) => updateGroup("servicesIntro", "text", value)} />
            <ListEditor label="Áreas de atuação" values={draft.areas} onChange={(value) => update("areas", value)} />
            <ListEditor label="Serviços" values={draft.services} onChange={(value) => update("services", value)} />
            <ListEditor label="Setores" values={draft.sectors} onChange={(value) => update("sectors", value)} />
            <ListEditor label="Diferenciais" values={draft.differentials} onChange={(value) => update("differentials", value)} />
          </Panel>

          <Panel title="CTA e contato" icon={FileText}>
            <Field label="Título do CTA" value={draft.cta.title} onChange={(value) => updateGroup("cta", "title", value)} />
            <TextArea label="Texto do CTA" value={draft.cta.text} onChange={(value) => updateGroup("cta", "text", value)} />
            <Field label="Botão do CTA" value={draft.cta.button} onChange={(value) => updateGroup("cta", "button", value)} />
            <Field label="Título do contato" value={draft.contactIntro.title} onChange={(value) => updateGroup("contactIntro", "title", value)} />
            <TextArea label="Texto do contato" value={draft.contactIntro.text} onChange={(value) => updateGroup("contactIntro", "text", value)} />
            <ContactEditor values={draft.contacts} onChange={(value) => update("contacts", value)} />
          </Panel>

          <Panel title="Números de autoridade" icon={FileText}>
            {draft.stats.map((stat, index) => (
              <div key={`stat-${index}`} className="grid gap-3 border border-stone-200 bg-stone-50 p-4 sm:grid-cols-2">
                <Field
                  label="Valor"
                  value={stat.value}
                  onChange={(value) => update("stats", draft.stats.map((item, itemIndex) => (itemIndex === index ? { ...item, value } : item)))}
                />
                <Field
                  label="Descrição"
                  value={stat.label}
                  onChange={(label) => update("stats", draft.stats.map((item, itemIndex) => (itemIndex === index ? { ...item, label } : item)))}
                />
              </div>
            ))}
          </Panel>
        </div>
      </main>
    </div>
  );
}
