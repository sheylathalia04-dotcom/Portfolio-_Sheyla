import React, { useState, useEffect } from 'react';
import { User } from 'firebase/auth';
import {
  Mail,
  FileText,
  Send,
  Trash2,
  ExternalLink,
  Plus,
  RefreshCw,
  Search,
  CheckCircle2,
  AlertCircle,
  LogOut,
  User as UserIcon,
  Clock,
  Sparkles,
  FileEdit,
  X,
  FileCheck,
  ShieldCheck,
  Inbox,
  Lock,
} from 'lucide-react';
import {
  initAuth,
  googleSignIn,
  logout,
  getAccessToken,
} from '../services/googleAuth';
import {
  listGmailMessages,
  sendGmailMessage,
  deleteGmailMessage,
  GmailMessageItem,
  getGmailProfile,
  GmailProfile,
} from '../services/gmailService';
import {
  listGoogleDocs,
  getGoogleDocContent,
  createGoogleDoc,
  appendTextToGoogleDoc,
  GoogleDocFile,
  GoogleDocDetail,
} from '../services/docsService';
import { PERSONAL_INFO } from '../data/portfolioData';

interface WorkspaceProps {
  onNavigateHome?: () => void;
}

export const Workspace: React.FC<WorkspaceProps> = () => {
  // Auth state
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [authLoading, setAuthLoading] = useState<boolean>(true);
  const [authError, setAuthError] = useState<string | null>(null);

  // Tabs: 'gmail' | 'docs'
  const [activeTab, setActiveTab] = useState<'gmail' | 'docs'>('gmail');

  // Gmail State
  const [gmailProfile, setGmailProfile] = useState<GmailProfile | null>(null);
  const [emails, setEmails] = useState<GmailMessageItem[]>([]);
  const [loadingEmails, setLoadingEmails] = useState(false);
  const [emailSearchQuery, setEmailSearchQuery] = useState('');
  const [selectedEmail, setSelectedEmail] = useState<GmailMessageItem | null>(null);

  // Gmail Compose State
  const [composeOpen, setComposeOpen] = useState(false);
  const [composeTo, setComposeTo] = useState('');
  const [composeSubject, setComposeSubject] = useState('');
  const [composeBody, setComposeBody] = useState('');
  const [sendingEmail, setSendingEmail] = useState(false);

  // Docs State
  const [docs, setDocs] = useState<GoogleDocFile[]>([]);
  const [loadingDocs, setLoadingDocs] = useState(false);
  const [selectedDocDetail, setSelectedDocDetail] = useState<GoogleDocDetail | null>(null);
  const [loadingDocDetail, setLoadingDocDetail] = useState(false);
  const [newDocModalOpen, setNewDocModalOpen] = useState(false);
  const [newDocTitle, setNewDocTitle] = useState('');
  const [creatingDoc, setCreatingDoc] = useState(false);
  const [appendText, setAppendText] = useState('');
  const [appendingText, setAppendingText] = useState(false);

  // Mandatory Confirmation Dialog State (Per Skill Safety Rule)
  const [confirmDialog, setConfirmDialog] = useState<{
    isOpen: boolean;
    title: string;
    description: string;
    confirmLabel: string;
    isDestructive?: boolean;
    onConfirm: () => Promise<void>;
  }>({
    isOpen: false,
    title: '',
    description: '',
    confirmLabel: '',
    isDestructive: false,
    onConfirm: async () => {},
  });

  const [notification, setNotification] = useState<{
    type: 'success' | 'error';
    message: string;
  } | null>(null);

  const showNotification = (type: 'success' | 'error', message: string) => {
    setNotification({ type, message });
    setTimeout(() => {
      setNotification((prev) => (prev?.message === message ? null : prev));
    }, 5000);
  };

  // Auth initialization
  useEffect(() => {
    const unsubscribe = initAuth(
      (authUser, authToken) => {
        setUser(authUser);
        setToken(authToken);
        setAuthLoading(false);
      },
      () => {
        setUser(null);
        setToken(null);
        setAuthLoading(false);
      }
    );
    return () => unsubscribe();
  }, []);

  // Fetch data when authenticated
  useEffect(() => {
    if (token) {
      if (activeTab === 'gmail') {
        loadGmailData(token);
      } else {
        loadDocsData(token);
      }
    }
  }, [token, activeTab]);

  const handleSignIn = async () => {
    setAuthLoading(true);
    setAuthError(null);
    try {
      const result = await googleSignIn();
      if (result) {
        setUser(result.user);
        setToken(result.accessToken);
        showNotification('success', `Sesión iniciada con éxito como ${result.user.email}`);
      }
    } catch (err: unknown) {
      const error = err as Error;
      console.error(error);
      setAuthError(error.message || 'Error al iniciar sesión con Google');
      showNotification('error', 'No se pudo completar el inicio de sesión con Google');
    } finally {
      setAuthLoading(false);
    }
  };

  const handleSignOut = async () => {
    await logout();
    setUser(null);
    setToken(null);
    setEmails([]);
    setDocs([]);
    setSelectedEmail(null);
    setSelectedDocDetail(null);
    showNotification('success', 'Sesión cerrada correctamente');
  };

  const loadGmailData = async (accessToken: string, query = emailSearchQuery) => {
    setLoadingEmails(true);
    try {
      const [profile, msgList] = await Promise.all([
        getGmailProfile(accessToken).catch(() => null),
        listGmailMessages(accessToken, query, 15),
      ]);
      if (profile) setGmailProfile(profile);
      setEmails(msgList);
    } catch (err: unknown) {
      const error = err as Error;
      showNotification('error', `Error al cargar Gmail: ${error.message}`);
    } finally {
      setLoadingEmails(false);
    }
  };

  const loadDocsData = async (accessToken: string) => {
    setLoadingDocs(true);
    try {
      const fileList = await listGoogleDocs(accessToken);
      setDocs(fileList);
    } catch (err: unknown) {
      const error = err as Error;
      showNotification('error', `Error al cargar Google Docs: ${error.message}`);
    } finally {
      setLoadingDocs(false);
    }
  };

  // Open email detail
  const handleSelectEmail = (msg: GmailMessageItem) => {
    setSelectedEmail(msg);
  };

  // Preset email for Sheyla
  const openComposeForSheyla = () => {
    setComposeTo(PERSONAL_INFO.email);
    setComposeSubject(`Contacto profesional / Oportunidad para Sheyla Thalía`);
    setComposeBody(
      `Hola Sheyla,\n\nHe visto tu portfolio en Administración de Sistemas Informáticos y Redes (ASIR) e Inteligencia Artificial y me gustaría contactar contigo para:\n\n[Escribe aquí los detalles del proyecto o propuesta]\n\nUn cordial saludo,\n${user?.displayName || 'Contacto'}`
    );
    setComposeOpen(true);
  };

  // Submit send email with mandatory confirmation
  const handleRequestSendEmail = (e: React.FormEvent) => {
    e.preventDefault();
    if (!composeTo || !composeSubject || !composeBody) {
      showNotification('error', 'Por favor completa todos los campos del correo');
      return;
    }

    setConfirmDialog({
      isOpen: true,
      title: 'Confirmar envío de correo con Gmail',
      description: `¿Confirmas que deseas enviar este correo desde tu cuenta de Gmail (${user?.email}) a "${composeTo}" con el asunto "${composeSubject}"?`,
      confirmLabel: 'Sí, Enviar Correo',
      isDestructive: false,
      onConfirm: async () => {
        if (!token) return;
        setSendingEmail(true);
        try {
          await sendGmailMessage(token, {
            to: composeTo,
            subject: composeSubject,
            body: composeBody,
          });
          showNotification('success', `Correo enviado exitosamente a ${composeTo}`);
          setComposeOpen(false);
          setComposeTo('');
          setComposeSubject('');
          setComposeBody('');
          loadGmailData(token);
        } catch (err: unknown) {
          const error = err as Error;
          showNotification('error', `Error al enviar correo: ${error.message}`);
        } finally {
          setSendingEmail(false);
        }
      },
    });
  };

  // Delete email with mandatory confirmation
  const handleRequestDeleteEmail = (msg: GmailMessageItem) => {
    setConfirmDialog({
      isOpen: true,
      title: 'Eliminar correo de Gmail',
      description: `¿Estás seguro de que deseas eliminar el correo "${msg.subject}" de ${msg.from}? Esta acción modificará tu cuenta de Gmail.`,
      confirmLabel: 'Eliminar Correo',
      isDestructive: true,
      onConfirm: async () => {
        if (!token) return;
        try {
          await deleteGmailMessage(token, msg.id);
          showNotification('success', 'Correo eliminado correctamente');
          setEmails((prev) => prev.filter((m) => m.id !== msg.id));
          if (selectedEmail?.id === msg.id) setSelectedEmail(null);
        } catch (err: unknown) {
          const error = err as Error;
          showNotification('error', `Error al eliminar correo: ${error.message}`);
        }
      },
    });
  };

  // Open Doc Detail
  const handleViewDoc = async (docFile: GoogleDocFile) => {
    if (!token) return;
    setLoadingDocDetail(true);
    try {
      const detail = await getGoogleDocContent(token, docFile.id);
      setSelectedDocDetail(detail);
    } catch (err: unknown) {
      const error = err as Error;
      showNotification('error', `Error al leer contenido de Google Docs: ${error.message}`);
    } finally {
      setLoadingDocDetail(false);
    }
  };

  // Create doc with confirmation
  const handleRequestCreateDoc = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDocTitle.trim()) {
      showNotification('error', 'Introduce un título para el nuevo documento');
      return;
    }

    setConfirmDialog({
      isOpen: true,
      title: 'Crear nuevo documento en Google Docs',
      description: `¿Confirmas la creación de un nuevo documento titulado "${newDocTitle.trim()}" en tu Google Drive (${user?.email})?`,
      confirmLabel: 'Crear Documento',
      isDestructive: false,
      onConfirm: async () => {
        if (!token) return;
        setCreatingDoc(true);
        try {
          const created = await createGoogleDoc(token, newDocTitle.trim());
          showNotification('success', `Documento "${created.title}" creado con éxito`);
          setNewDocModalOpen(false);
          setNewDocTitle('');
          loadDocsData(token);
        } catch (err: unknown) {
          const error = err as Error;
          showNotification('error', `Error al crear documento: ${error.message}`);
        } finally {
          setCreatingDoc(false);
        }
      },
    });
  };

  // Append text to doc with confirmation
  const handleRequestAppendText = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDocDetail || !appendText.trim()) return;

    setConfirmDialog({
      isOpen: true,
      title: 'Agregar contenido a Google Docs',
      description: `¿Confirmas que deseas insertar este texto al final del documento "${selectedDocDetail.title}"?`,
      confirmLabel: 'Guardar en Documento',
      isDestructive: false,
      onConfirm: async () => {
        if (!token) return;
        setAppendingText(true);
        try {
          await appendTextToGoogleDoc(token, selectedDocDetail.documentId, appendText.trim());
          showNotification('success', 'Texto añadido correctamente al documento');
          // Reload doc detail
          const updated = await getGoogleDocContent(token, selectedDocDetail.documentId);
          setSelectedDocDetail(updated);
          setAppendText('');
        } catch (err: unknown) {
          const error = err as Error;
          showNotification('error', `Error al actualizar documento: ${error.message}`);
        } finally {
          setAppendingText(false);
        }
      },
    });
  };

  return (
    <div className="pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Toast Notification */}
        {notification && (
          <div
            className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-3 rounded-xl shadow-xl text-sm font-medium transition-all ${
              notification.type === 'success'
                ? 'bg-emerald-600 text-white'
                : 'bg-rose-600 text-white'
            }`}
          >
            {notification.type === 'success' ? (
              <CheckCircle2 className="w-5 h-5 shrink-0" />
            ) : (
              <AlertCircle className="w-5 h-5 shrink-0" />
            )}
            <span>{notification.message}</span>
            <button
              onClick={() => setNotification(null)}
              className="ml-2 hover:opacity-80 p-0.5"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 text-xs font-semibold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Integración Google Workspace</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-3">
            Gmail & Google Docs
          </h1>
          <p className="text-base text-slate-600 dark:text-slate-400">
            Conecta tu cuenta de Google Workspace para gestionar correos directamente con Gmail y redactar o consultar tus documentos de Google Docs de forma segura.
          </p>
        </div>

        {/* Authentication Card */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xs mb-8">
          {authLoading ? (
            <div className="flex items-center justify-center py-6 gap-3 text-slate-500">
              <RefreshCw className="w-5 h-5 animate-spin text-blue-600" />
              <span>Verificando conexión con Google...</span>
            </div>
          ) : !user ? (
            <div className="text-center max-w-xl mx-auto py-4">
              <div className="w-14 h-14 bg-blue-50 dark:bg-blue-950/60 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-blue-100 dark:border-blue-900/50">
                <Lock className="w-7 h-7 text-blue-600 dark:text-blue-400" />
              </div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                Conectar con Google Workspace
              </h2>
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-6">
                Inicia sesión con tu cuenta de Google para acceder a tus bandejas de Gmail y tus documentos de Google Docs con permisos autorizados.
              </p>

              {authError && (
                <div className="mb-6 p-3 bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 rounded-xl text-xs text-rose-700 dark:text-rose-300 flex items-center gap-2 text-left">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{authError}</span>
                </div>
              )}

              {/* Official Google Sign-In Button as mandated by skill rules */}
              <div className="flex justify-center">
                <button
                  type="button"
                  onClick={handleSignIn}
                  className="inline-flex items-center gap-3 px-6 py-3 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 hover:border-slate-400 dark:hover:border-slate-600 rounded-xl shadow-xs hover:shadow-md transition-all font-medium text-slate-700 dark:text-slate-200 text-sm active:scale-98 cursor-pointer"
                >
                  <svg className="w-5 h-5 shrink-0" viewBox="0 0 48 48">
                    <path
                      fill="#EA4335"
                      d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
                    />
                    <path
                      fill="#4285F4"
                      d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
                    />
                    <path
                      fill="#34A853"
                      d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
                    />
                  </svg>
                  <span>Sign in with Google</span>
                </button>
              </div>

              <div className="mt-4 flex items-center justify-center gap-2 text-xs text-slate-500">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                <span>Autenticación oficial y segura con Firebase Auth & OAuth 2.0</span>
              </div>
            </div>
          ) : (
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                {user.photoURL ? (
                  <img
                    src={user.photoURL}
                    alt={user.displayName || 'Google User'}
                    className="w-12 h-12 rounded-full border border-blue-500/50 shadow-xs"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/60 flex items-center justify-center text-blue-700 dark:text-blue-300 font-bold">
                    <UserIcon className="w-6 h-6" />
                  </div>
                )}
                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-bold text-slate-900 dark:text-white">
                      {user.displayName || 'Usuario de Google'}
                    </p>
                    <span className="px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 text-[10px] font-bold uppercase tracking-wider">
                      Conectado
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-mono">
                    {user.email}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={openComposeForSheyla}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-blue-50 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300 hover:bg-blue-100 dark:hover:bg-blue-900/50 text-xs font-semibold transition-colors"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Escribir a Sheyla</span>
                </button>

                <button
                  onClick={handleSignOut}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-semibold transition-colors"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Cerrar sesión</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Workspace Feature Tabs */}
        {user && (
          <div className="space-y-6">
            {/* Tabs Selector */}
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-2">
              <div className="flex gap-2">
                <button
                  onClick={() => setActiveTab('gmail')}
                  className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-sm transition-all cursor-pointer ${
                    activeTab === 'gmail'
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  <Mail className="w-4 h-4" />
                  <span>Gmail</span>
                  {gmailProfile && (
                    <span className="ml-1 text-[11px] px-1.5 py-0.2 rounded-full bg-white/20 text-white font-mono">
                      {gmailProfile.messagesTotal || emails.length}
                    </span>
                  )}
                </button>

                <button
                  onClick={() => setActiveTab('docs')}
                  className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-sm transition-all cursor-pointer ${
                    activeTab === 'docs'
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  <FileText className="w-4 h-4" />
                  <span>Google Docs</span>
                  {docs.length > 0 && (
                    <span className="ml-1 text-[11px] px-1.5 py-0.2 rounded-full bg-white/20 text-white font-mono">
                      {docs.length}
                    </span>
                  )}
                </button>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2">
                {activeTab === 'gmail' ? (
                  <>
                    <button
                      onClick={() => token && loadGmailData(token)}
                      disabled={loadingEmails}
                      className="p-2 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 transition-colors"
                      title="Actualizar correos"
                    >
                      <RefreshCw className={`w-4 h-4 ${loadingEmails ? 'animate-spin' : ''}`} />
                    </button>
                    <button
                      onClick={() => setComposeOpen(true)}
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700 text-xs font-semibold shadow-xs transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Redactar</span>
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => token && loadDocsData(token)}
                      disabled={loadingDocs}
                      className="p-2 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 transition-colors"
                      title="Actualizar documentos"
                    >
                      <RefreshCw className={`w-4 h-4 ${loadingDocs ? 'animate-spin' : ''}`} />
                    </button>
                    <button
                      onClick={() => setNewDocModalOpen(true)}
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700 text-xs font-semibold shadow-xs transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Nuevo Documento</span>
                    </button>
                  </>
                )}
              </div>
            </div>

            {/* TAB 1: GMAIL VIEW */}
            {activeTab === 'gmail' && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Email List Left */}
                <div className={`${selectedEmail ? 'lg:col-span-5' : 'lg:col-span-12'} space-y-4`}>
                  {/* Search bar */}
                  <div className="relative">
                    <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="Buscar en Gmail (ej: from, subject)..."
                      value={emailSearchQuery}
                      onChange={(e) => setEmailSearchQuery(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && token) {
                          loadGmailData(token, emailSearchQuery);
                        }
                      }}
                      className="w-full pl-9 pr-24 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-xs focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                    />
                    {emailSearchQuery && (
                      <button
                        onClick={() => {
                          setEmailSearchQuery('');
                          if (token) loadGmailData(token, '');
                        }}
                        className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 px-2 py-0.5"
                      >
                        Limpiar
                      </button>
                    )}
                  </div>

                  {/* List Container */}
                  <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden divide-y divide-slate-100 dark:divide-slate-800 shadow-xs">
                    {loadingEmails ? (
                      <div className="py-12 flex flex-col items-center justify-center text-slate-400 text-xs gap-3">
                        <RefreshCw className="w-5 h-5 animate-spin text-blue-600" />
                        <span>Cargando mensajes de Gmail...</span>
                      </div>
                    ) : emails.length === 0 ? (
                      <div className="py-12 text-center text-slate-400 text-xs px-4">
                        <Inbox className="w-8 h-8 mx-auto mb-2 opacity-50" />
                        <p className="font-semibold text-slate-600 dark:text-slate-300">
                          No se encontraron mensajes
                        </p>
                        <p className="mt-1">
                          Prueba a limpiar la búsqueda o redacta un nuevo mensaje.
                        </p>
                      </div>
                    ) : (
                      emails.map((msg) => (
                        <div
                          key={msg.id}
                          onClick={() => handleSelectEmail(msg)}
                          className={`p-4 transition-colors cursor-pointer text-left ${
                            selectedEmail?.id === msg.id
                              ? 'bg-blue-50/70 dark:bg-blue-950/40 border-l-4 border-l-blue-600'
                              : 'hover:bg-slate-50 dark:hover:bg-slate-800/60'
                          }`}
                        >
                          <div className="flex items-start justify-between gap-2 mb-1">
                            <span className="font-semibold text-xs text-slate-900 dark:text-white truncate max-w-[200px]">
                              {msg.from || 'Remitente'}
                            </span>
                            <span className="text-[10px] text-slate-400 whitespace-nowrap">
                              {msg.date ? new Date(msg.date).toLocaleDateString('es-ES') : ''}
                            </span>
                          </div>
                          <p className="text-xs font-medium text-slate-800 dark:text-slate-200 truncate mb-1">
                            {msg.subject || '(Sin asunto)'}
                          </p>
                          <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1">
                            {msg.snippet || 'Sin vista previa'}
                          </p>
                        </div>
                      ))
                    )}
                  </div>
                </div>

                {/* Email Detail Right */}
                {selectedEmail && (
                  <div className="lg:col-span-7 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-xs flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-4 mb-4">
                        <div>
                          <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1">
                            {selectedEmail.subject}
                          </h3>
                          <div className="text-xs text-slate-600 dark:text-slate-400 space-y-0.5">
                            <p>
                              <strong className="text-slate-800 dark:text-slate-200">De:</strong>{' '}
                              {selectedEmail.from}
                            </p>
                            {selectedEmail.to && (
                              <p>
                                <strong className="text-slate-800 dark:text-slate-200">Para:</strong>{' '}
                                {selectedEmail.to}
                              </p>
                            )}
                            {selectedEmail.date && (
                              <p className="text-[11px] text-slate-400">
                                {new Date(selectedEmail.date).toLocaleString('es-ES')}
                              </p>
                            )}
                          </div>
                        </div>

                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => handleRequestDeleteEmail(selectedEmail)}
                            className="p-2 text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 rounded-lg transition-colors"
                            title="Eliminar mensaje"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => setSelectedEmail(null)}
                            className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg"
                            title="Cerrar vista"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      {/* Email Body */}
                      <div className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-wrap max-h-96 overflow-y-auto pr-2">
                        {selectedEmail.bodyText || selectedEmail.snippet || '(Sin contenido legible)'}
                      </div>
                    </div>

                    <div className="pt-4 mt-6 border-t border-slate-200 dark:border-slate-800 flex justify-end gap-2">
                      <button
                        onClick={() => {
                          setComposeTo(selectedEmail.from || '');
                          setComposeSubject(`Re: ${selectedEmail.subject}`);
                          setComposeOpen(true);
                        }}
                        className="inline-flex items-center gap-1.5 px-4 py-2 bg-blue-600 text-white rounded-xl text-xs font-semibold hover:bg-blue-700 transition-colors"
                      >
                        <Send className="w-3.5 h-3.5" />
                        <span>Responder</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* TAB 2: GOOGLE DOCS VIEW */}
            {activeTab === 'docs' && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Docs list */}
                <div className={`${selectedDocDetail ? 'lg:col-span-5' : 'lg:col-span-12'} space-y-4`}>
                  <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden divide-y divide-slate-100 dark:divide-slate-800 shadow-xs">
                    {loadingDocs ? (
                      <div className="py-12 flex flex-col items-center justify-center text-slate-400 text-xs gap-3">
                        <RefreshCw className="w-5 h-5 animate-spin text-blue-600" />
                        <span>Cargando documentos de Google Docs...</span>
                      </div>
                    ) : docs.length === 0 ? (
                      <div className="py-12 text-center text-slate-400 text-xs px-4">
                        <FileText className="w-8 h-8 mx-auto mb-2 opacity-50" />
                        <p className="font-semibold text-slate-600 dark:text-slate-300">
                          No se encontraron documentos
                        </p>
                        <p className="mt-1">
                          Crea tu primer documento con el botón superior.
                        </p>
                      </div>
                    ) : (
                      docs.map((docItem) => (
                        <div
                          key={docItem.id}
                          className={`p-4 transition-colors flex items-center justify-between gap-3 ${
                            selectedDocDetail?.documentId === docItem.id
                              ? 'bg-blue-50/70 dark:bg-blue-950/40 border-l-4 border-l-blue-600'
                              : 'hover:bg-slate-50 dark:hover:bg-slate-800/60'
                          }`}
                        >
                          <div
                            onClick={() => handleViewDoc(docItem)}
                            className="cursor-pointer flex-1 min-w-0"
                          >
                            <div className="flex items-center gap-2 mb-1">
                              <FileEdit className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0" />
                              <span className="font-semibold text-xs text-slate-900 dark:text-white truncate">
                                {docItem.name}
                              </span>
                            </div>
                            <p className="text-[11px] text-slate-400 flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              <span>
                                {docItem.modifiedTime
                                  ? `Modificado el ${new Date(docItem.modifiedTime).toLocaleDateString('es-ES')}`
                                  : 'Documento de Google'}
                              </span>
                            </p>
                          </div>

                          <div className="flex items-center gap-1.5 shrink-0">
                            <button
                              onClick={() => handleViewDoc(docItem)}
                              className="px-2.5 py-1.5 rounded-lg bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 text-xs font-semibold hover:bg-blue-100 dark:hover:bg-blue-900 transition-colors"
                            >
                              Ver
                            </button>
                            {docItem.webViewLink && (
                              <a
                                href={docItem.webViewLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-1.5 text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                                title="Abrir en Google Docs"
                              >
                                <ExternalLink className="w-4 h-4" />
                              </a>
                            )}
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>

                {/* Doc Content Preview and Editor */}
                {selectedDocDetail && (
                  <div className="lg:col-span-7 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-xs flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-4 mb-4">
                        <div className="flex-1 min-w-0">
                          <h3 className="text-base font-bold text-slate-900 dark:text-white truncate mb-1">
                            {selectedDocDetail.title}
                          </h3>
                          <p className="text-xs text-slate-400">
                            Documento sincronizado con Google Docs API
                          </p>
                        </div>

                        <div className="flex items-center gap-2">
                          <a
                            href={`https://docs.google.com/document/d/${selectedDocDetail.documentId}/edit`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"
                          >
                            <span>Abrir en Docs</span>
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                          <button
                            onClick={() => setSelectedDocDetail(null)}
                            className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      {/* Content Box */}
                      <div className="mb-6">
                        <label className="block text-xs font-semibold text-slate-500 mb-2 uppercase tracking-wider">
                          Contenido del Documento:
                        </label>
                        <div className="bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl p-4 text-xs sm:text-sm text-slate-800 dark:text-slate-200 max-h-64 overflow-y-auto font-mono whitespace-pre-wrap leading-relaxed">
                          {selectedDocDetail.plainText || '(El documento está vacío)'}
                        </div>
                      </div>

                      {/* Append text tool */}
                      <form onSubmit={handleRequestAppendText} className="space-y-3">
                        <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                          Añadir nuevo texto o nota al final del documento:
                        </label>
                        <textarea
                          rows={3}
                          value={appendText}
                          onChange={(e) => setAppendText(e.target.value)}
                          placeholder="Escribe el texto que deseas incorporar a este documento de Google Docs..."
                          className="w-full p-3 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-xs sm:text-sm focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                        />
                        <div className="flex justify-end">
                          <button
                            type="submit"
                            disabled={!appendText.trim() || appendingText}
                            className="inline-flex items-center gap-1.5 px-4 py-2 bg-blue-600 text-white rounded-xl text-xs font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50"
                          >
                            <FileCheck className="w-3.5 h-3.5" />
                            <span>{appendingText ? 'Añadiendo...' : 'Insertar en Documento'}</span>
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* Modal: Redactar Correo Gmail */}
        {composeOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs">
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl w-full max-w-xl overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-150">
              <div className="flex items-center justify-between p-4 border-b border-slate-200 dark:border-slate-800">
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-blue-600" />
                  <h3 className="font-bold text-sm text-slate-900 dark:text-white">
                    Redactar Correo con Gmail
                  </h3>
                </div>
                <button
                  onClick={() => setComposeOpen(false)}
                  className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1 rounded-lg"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleRequestSendEmail} className="p-4 sm:p-6 space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Para:
                  </label>
                  <input
                    type="email"
                    required
                    value={composeTo}
                    onChange={(e) => setComposeTo(e.target.value)}
                    placeholder="destinatario@ejemplo.com"
                    className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Asunto:
                  </label>
                  <input
                    type="text"
                    required
                    value={composeSubject}
                    onChange={(e) => setComposeSubject(e.target.value)}
                    placeholder="Asunto del correo"
                    className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Mensaje:
                  </label>
                  <textarea
                    rows={6}
                    required
                    value={composeBody}
                    onChange={(e) => setComposeBody(e.target.value)}
                    placeholder="Escribe el mensaje..."
                    className="w-full p-3 text-xs sm:text-sm bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                  />
                </div>

                <div className="flex items-center justify-between pt-2">
                  <button
                    type="button"
                    onClick={openComposeForSheyla}
                    className="text-xs text-blue-600 hover:underline"
                  >
                    Usar plantilla para Sheyla
                  </button>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setComposeOpen(false)}
                      className="px-4 py-2 border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-600 dark:text-slate-400 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800"
                    >
                      Cancelar
                    </button>
                    <button
                      type="submit"
                      disabled={sendingEmail}
                      className="inline-flex items-center gap-1.5 px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold transition-colors disabled:opacity-50"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>{sendingEmail ? 'Enviando...' : 'Enviar Correo'}</span>
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Modal: Crear Nuevo Documento Google Docs */}
        {newDocModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs">
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl w-full max-w-md overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-150">
              <div className="flex items-center justify-between p-4 border-b border-slate-200 dark:border-slate-800">
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-blue-600" />
                  <h3 className="font-bold text-sm text-slate-900 dark:text-white">
                    Crear Documento en Google Docs
                  </h3>
                </div>
                <button
                  onClick={() => setNewDocModalOpen(false)}
                  className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1 rounded-lg"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleRequestCreateDoc} className="p-5 space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Título del nuevo documento:
                  </label>
                  <input
                    type="text"
                    required
                    value={newDocTitle}
                    onChange={(e) => setNewDocTitle(e.target.value)}
                    placeholder="Ej: Informe Técnico ASIR - Redes y Seguridad"
                    className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                  />
                </div>

                <div className="flex items-center justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setNewDocModalOpen(false)}
                    className="px-4 py-2 border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-600 dark:text-slate-400 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    disabled={creatingDoc || !newDocTitle.trim()}
                    className="inline-flex items-center gap-1.5 px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold transition-colors disabled:opacity-50"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>{creatingDoc ? 'Creando...' : 'Crear Documento'}</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* MANDATORY Safety Confirmation Dialog Modal */}
        {confirmDialog.isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl w-full max-w-md overflow-hidden shadow-2xl p-6 animate-in fade-in zoom-in-95 duration-150">
              <div className="flex items-center gap-3 mb-3">
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                    confirmDialog.isDestructive
                      ? 'bg-rose-100 text-rose-600 dark:bg-rose-950/60 dark:text-rose-400'
                      : 'bg-blue-100 text-blue-600 dark:bg-blue-950/60 dark:text-blue-400'
                  }`}
                >
                  <AlertCircle className="w-5 h-5" />
                </div>
                <h4 className="text-base font-bold text-slate-900 dark:text-white">
                  {confirmDialog.title}
                </h4>
              </div>

              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
                {confirmDialog.description}
              </p>

              <div className="flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setConfirmDialog((prev) => ({ ...prev, isOpen: false }))}
                  className="px-4 py-2 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  onClick={async () => {
                    const action = confirmDialog.onConfirm;
                    setConfirmDialog((prev) => ({ ...prev, isOpen: false }));
                    await action();
                  }}
                  className={`px-4 py-2 text-xs font-semibold text-white rounded-xl shadow-xs transition-colors ${
                    confirmDialog.isDestructive
                      ? 'bg-rose-600 hover:bg-rose-700'
                      : 'bg-blue-600 hover:bg-blue-700'
                  }`}
                >
                  {confirmDialog.confirmLabel}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
