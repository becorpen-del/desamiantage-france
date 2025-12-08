"use client";

import { FormEvent, useEffect, useMemo, useRef, useState, type RefObject } from "react";

import { useTracking } from "@/lib/tracking";
import {
  fireLeadEvent,
  formatPhoneInput,
  getBrandName,
  HONEYPOT_FIELD_NAME,
  MIN_SUBMIT_DELAY_MS,
} from "@/lib/utils";
import {
  BUILDING_TYPES,
  DEADLINE_OPTIONS,
  PRESTATION_TYPES,
  containsBannedWord,
  leadSchema,
  type LeadPayload,
} from "@/lib/validators";

type SelectOption = {
  value: LeadPayload["typeBatiment"] | LeadPayload["typePrestation"] | LeadPayload["delai"];
  label: string;
};

type ContactFormProps = {
  city?: string;
  postalCode?: string;
};

type FormErrors = Partial<Record<keyof LeadPayload, string>>;
type SubmitStatus = "idle" | "loading" | "success" | "error";

/* eslint-disable no-unused-vars */
declare global {
  interface Window {
    grecaptcha?: {
      ready(callback: () => void): void;
      execute(siteKey: string, options: { action: string }): Promise<string>;
    };
    gtag?: (...args: unknown[]) => void;
  }
}
/* eslint-enable no-unused-vars */

const brandName = getBrandName();
const recaptchaSiteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

const buildingOptions: Array<{ value: (typeof BUILDING_TYPES)[number]; label: string }> = [
  { value: "Maison", label: "Maison individuelle" },
  { value: "Appartement", label: "Appartement / Copropriété" },
  { value: "Tertiaire", label: "Locaux tertiaires / ERP" },
  { value: "Industriel", label: "Site industriel / Logistique" },
];

const prestationOptions: Array<{ value: (typeof PRESTATION_TYPES)[number]; label: string }> = [
  { value: "Diagnostic", label: "Diagnostic amiante (DTA, RAT, DAAT)" },
  { value: "Retrait", label: "Retrait / confinement MPCA intérieur" },
  { value: "Toiture", label: "Toiture fibrociment & bardages" },
  { value: "Industriel", label: "Intervention industrielle lourde" },
];

const deadlineOptions: Array<{ value: (typeof DEADLINE_OPTIONS)[number]; label: string }> = [
  { value: "Urgent 48h", label: "Urgent (intervention sous 48 h)" },
  { value: "< 7 jours", label: "Intervention planifiée sous 7 jours" },
  { value: "> 7 jours", label: "Prévisionnel &gt; 7 jours" },
];

function useClickOutside(ref: RefObject<HTMLElement>, onClose: () => void) {
  useEffect(() => {
    function handle(event: MouseEvent) {
      if (!ref.current) return;
      if (!ref.current.contains(event.target as Node)) {
        onClose();
      }
    }
    document.addEventListener("mousedown", handle);
    return () => document.removeEventListener("mousedown", handle);
  }, [onClose, ref]);
}

type CustomSelectProps<T extends SelectOption["value"]> = {
  label: string;
  name: string;
  value: T;
  options: Array<SelectOption & { value: T }>;
  error?: string;
  // eslint-disable-next-line no-unused-vars
  onChange: (value: T) => void;
};

function CustomSelect<T extends SelectOption["value"]>({
  label,
  name,
  value,
  options,
  error,
  onChange,
}: CustomSelectProps<T>) {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  useClickOutside(wrapperRef, () => setOpen(false));

  const selected = options.find(option => option.value === value) ?? options[0];
  const fieldId = `${name}-select`;
  const errorId = error ? `${name}-error` : undefined;

  return (
    <label className="flex flex-col gap-1 text-sm text-slate-700">
      {label}
      {/* Wrapper en relative pour ancrer le menu déroulant en absolute juste sous le champ */}
      <div ref={wrapperRef} className="relative">
        <button
          type="button"
          id={fieldId}
          aria-haspopup="listbox"
          aria-expanded={open}
          aria-describedby={errorId}
          onClick={() => setOpen(prev => !prev)}
          className={`flex w-full items-center justify-between rounded-md border px-3 py-2 text-left text-base focus:outline-none ${
            error ? "border-red-400" : "border-slate-200 focus:border-brand"
          }`}
        >
          <span className="text-slate-900">{selected?.label}</span>
          <svg
            aria-hidden
            className={`h-4 w-4 text-slate-400 transition-transform ${open ? "rotate-180" : ""}`}
            viewBox="0 0 20 20"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M6 8l4 4 4-4" />
          </svg>
        </button>

        {open ? (
          // Menu positionné en absolute sous le champ, largeur 100%, z-index élevé pour mobile
          <ul
            role="listbox"
            aria-labelledby={fieldId}
            className="absolute left-0 top-full z-50 mt-1 max-h-60 w-full overflow-auto rounded-lg border border-slate-200 bg-white text-sm text-slate-900 shadow-lg"
          >
            {options.map(option => (
              <li key={option.value}>
                <button
                  type="button"
                  role="option"
                  aria-selected={option.value === value}
                  onClick={() => {
                    onChange(option.value);
                    setOpen(false);
                  }}
                  className={`flex w-full items-center justify-between px-3 py-2 text-left hover:bg-slate-50 ${
                    option.value === value ? "bg-slate-100 font-semibold text-slate-900" : "text-slate-700"
                  }`}
                >
                  <span>{option.label}</span>
                  {option.value === value ? (
                    <svg
                      aria-hidden
                      className="h-4 w-4 text-brand"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M5 13l4 4L19 7" />
                    </svg>
                  ) : null}
                </button>
              </li>
            ))}
          </ul>
        ) : null}
      </div>
      {error ? (
        <span id={errorId} className="text-xs text-red-600">
          {error}
        </span>
      ) : null}
    </label>
  );
}

function buildInitialPayload(city?: string, postalCode?: string): LeadPayload {
  return {
    nom: "",
    email: "",
    telephone: "",
    codePostal: postalCode ?? "",
    ville: city ?? "",
    typeBatiment: "Appartement",
    typePrestation: "Diagnostic",
    description: "",
    delai: "< 7 jours",
    consentement: true,
    honeypot: "",
    recaptchaToken: undefined,
    submitDelay: Date.now(),
    utm: {},
    gclid: undefined,
  };
}

export function ContactForm({ city, postalCode }: ContactFormProps) {
  const formRef = useRef<HTMLFormElement | null>(null);
  const tracking = useTracking();
  const [formData, setFormData] = useState<LeadPayload>(() => buildInitialPayload(city, postalCode));
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [toast, setToast] = useState<{ type: "success" | "error"; message: string } | null>(null);

  useEffect(() => {
    setFormData(prev => ({
      ...prev,
      ville: city ?? prev.ville,
      codePostal: postalCode ?? prev.codePostal,
      submitDelay: Date.now(),
    }));
  }, [city, postalCode]);

  useEffect(() => {
    if (!toast) {
      return;
    }

    const timeout = window.setTimeout(() => setToast(null), 6000);
    return () => window.clearTimeout(timeout);
  }, [toast]);

  const utmPayload = useMemo(() => {
    const { gclid, ...rest } = tracking;
    return {
      utm: rest,
      gclid: gclid ?? undefined,
    };
  }, [tracking]);

  const handleFieldChange = <Key extends keyof LeadPayload>(key: Key, value: LeadPayload[Key]) => {
    setFormData(prev => ({ ...prev, [key]: value }));
    setErrors(prev => ({ ...prev, [key]: undefined }));
  };

  const runRecaptcha = async () => {
    if (!recaptchaSiteKey || !window.grecaptcha) {
      return undefined;
    }

    await new Promise<void>(resolve => {
      window.grecaptcha?.ready(resolve);
    });

    return window.grecaptcha?.execute(recaptchaSiteKey, { action: "lead" });
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (status === "loading") {
      return;
    }

    const now = Date.now();
    if (now - formData.submitDelay < MIN_SUBMIT_DELAY_MS) {
      setToast({
        type: "error",
        message: "Merci de vérifier votre demande avant l'envoi.",
      });
      return;
    }

    setStatus("loading");
    setToast(null);
    setErrors({});

    try {
      const recaptchaToken = await runRecaptcha();
      const payload: LeadPayload = {
        ...formData,
        ...utmPayload,
        recaptchaToken: recaptchaToken ?? undefined,
      };

      if (containsBannedWord(payload.description) || containsBannedWord(payload.nom)) {
        setStatus("error");
        setToast({
          type: "error",
          message: "Le message contient des termes bloqués. Merci de reformuler.",
        });
        return;
      }

      const parsed = leadSchema.safeParse(payload);
      if (!parsed.success) {
        const fieldErrors: FormErrors = {};
        parsed.error.issues.forEach(issue => {
          const field = issue.path[0] as keyof LeadPayload;
          fieldErrors[field] = issue.message;
        });
        setErrors(fieldErrors);
        setStatus("error");
        setToast({
          type: "error",
          message: "Certains champs nécessitent une correction.",
        });
        return;
      }

      const response = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });

      const data = (await response.json()) as { ok?: boolean; error?: string; leadScore?: number };
      if (!response.ok || !data.ok) {
        throw new Error(data.error ?? `Erreur serveur (${response.status})`);
      }

      fireLeadEvent(data.leadScore);
      setToast({
        type: "success",
        message: "Merci ! Votre demande a bien été enregistrée. Nous vous recontactons sous 2 heures ouvrées.",
      });
      setStatus("success");
      setFormData(buildInitialPayload(city, postalCode));
      formRef.current?.reset();
    } catch (error) {
      console.error(error);
      setStatus("error");
      setToast({
        type: "error",
        message: "Impossible d'envoyer votre demande pour le moment. Réessayez ou appelez-nous.",
      });
    }
  };

  const isLoading = status === "loading";

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      aria-describedby="lead-form-feedback"
      className="flex flex-col gap-6 rounded-3xl border border-slate-200 bg-white p-8 shadow-xl shadow-slate-200/60 lg:sticky lg:top-24"
    >
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold text-slate-900">Demande de devis désamiantage</h2>
        <p className="text-sm text-slate-600">
          Un conseiller {brandName} vous rappelle sous 2 heures ouvrées pour qualifier votre projet et engager une
          entreprise certifiée SS3/SS4.
        </p>
      </div>

      {toast ? (
        <div
          id="lead-form-feedback"
          role="alert"
          className={`rounded-md px-3 py-2 text-sm ${
            toast.type === "success"
              ? "border border-emerald-200 bg-emerald-50 text-emerald-700"
              : "border border-red-200 bg-red-50 text-red-700"
          }`}
        >
          {toast.message}
        </div>
      ) : (
        <span id="lead-form-feedback" className="sr-only">
          {status === "success"
            ? "Demande envoyée. Nous revenons vers vous rapidement."
            : "Formulaire de demande de devis désamiantage."}
        </span>
      )}

      <div className="grid gap-4 md:grid-cols-2">
        <label className="flex flex-col gap-1 text-sm text-slate-700">
          Nom et prénom*
          <input
            name="nom"
            value={formData.nom}
            onChange={event => handleFieldChange("nom", event.target.value)}
            required
            className={`rounded-md border px-3 py-2 text-base focus:outline-none ${
              errors.nom ? "border-red-400" : "border-slate-200 focus:border-brand"
            }`}
            autoComplete="name"
            maxLength={80}
            aria-invalid={Boolean(errors.nom)}
            aria-describedby={errors.nom ? "error-nom" : undefined}
          />
          {errors.nom ? (
            <span id="error-nom" className="text-xs text-red-600">
              {errors.nom}
            </span>
          ) : null}
        </label>

        <label className="flex flex-col gap-1 text-sm text-slate-700">
          E-mail professionnel*
          <input
            name="email"
            type="email"
            value={formData.email}
            onChange={event => handleFieldChange("email", event.target.value)}
            required
            className={`rounded-md border px-3 py-2 text-base focus:outline-none ${
              errors.email ? "border-red-400" : "border-slate-200 focus:border-brand"
            }`}
            autoComplete="email"
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "error-email" : undefined}
          />
          {errors.email ? (
            <span id="error-email" className="text-xs text-red-600">
              {errors.email}
            </span>
          ) : null}
        </label>

        <label className="flex flex-col gap-1 text-sm text-slate-700">
          Téléphone (mobile de préférence)*
          <input
            name="telephone"
            value={formData.telephone}
            onChange={event => handleFieldChange("telephone", formatPhoneInput(event.target.value))}
            required
            className={`rounded-md border px-3 py-2 text-base focus:outline-none ${
              errors.telephone ? "border-red-400" : "border-slate-200 focus:border-brand"
            }`}
            inputMode="tel"
            autoComplete="tel"
            aria-invalid={Boolean(errors.telephone)}
            aria-describedby={errors.telephone ? "error-telephone" : undefined}
          />
          {errors.telephone ? (
            <span id="error-telephone" className="text-xs text-red-600">
              {errors.telephone}
            </span>
          ) : null}
        </label>

        <label className="flex flex-col gap-1 text-sm text-slate-700">
          Code postal*
          <input
            name="codePostal"
            value={formData.codePostal}
            onChange={event =>
              handleFieldChange("codePostal", event.target.value.replace(/[^0-9]/g, "").slice(0, 5))
            }
            required
            className={`rounded-md border px-3 py-2 text-base focus:outline-none ${
              errors.codePostal ? "border-red-400" : "border-slate-200 focus:border-brand"
            }`}
            inputMode="numeric"
            autoComplete="postal-code"
            maxLength={5}
            aria-invalid={Boolean(errors.codePostal)}
            aria-describedby={errors.codePostal ? "error-codePostal" : undefined}
          />
          {errors.codePostal ? (
            <span id="error-codePostal" className="text-xs text-red-600">
              {errors.codePostal}
            </span>
          ) : null}
        </label>

        <label className="md:col-span-2 flex flex-col gap-1 text-sm text-slate-700">
          Ville d&apos;intervention*
          <input
            name="ville"
            value={formData.ville}
            onChange={event => handleFieldChange("ville", event.target.value)}
            required
            className={`rounded-md border px-3 py-2 text-base focus:outline-none ${
              errors.ville ? "border-red-400" : "border-slate-200 focus:border-brand"
            }`}
            autoComplete="address-level2"
            aria-invalid={Boolean(errors.ville)}
            aria-describedby={errors.ville ? "error-ville" : undefined}
          />
          {errors.ville ? (
            <span id="error-ville" className="text-xs text-red-600">
              {errors.ville}
            </span>
          ) : null}
        </label>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <CustomSelect
          label="Type de bâtiment*"
          name="typeBatiment"
          value={formData.typeBatiment}
          options={buildingOptions}
          error={errors.typeBatiment}
          onChange={val => handleFieldChange("typeBatiment", val)}
        />

        <CustomSelect
          label="Type de prestation*"
          name="typePrestation"
          value={formData.typePrestation}
          options={prestationOptions}
          error={errors.typePrestation}
          onChange={val => handleFieldChange("typePrestation", val)}
        />

        <label className="md:col-span-2 flex flex-col gap-1 text-sm text-slate-700">
          Décrivez votre besoin (diagnostic, retrait, matériaux concernés...)*
          <textarea
            name="description"
            value={formData.description}
            onChange={event => handleFieldChange("description", event.target.value)}
            rows={5}
            required
            className={`rounded-md border px-3 py-2 text-base focus:outline-none ${
              errors.description ? "border-red-400" : "border-slate-200 focus:border-brand"
            }`}
            aria-invalid={Boolean(errors.description)}
            aria-describedby={errors.description ? "error-description" : undefined}
            placeholder="Précisez le contexte (diagnostic, retrait, surfaces, accès, présence d'occupants...)."
          />
          {errors.description ? (
            <span id="error-description" className="text-xs text-red-600">
              {errors.description}
            </span>
          ) : null}
        </label>

        <label className="flex flex-col gap-1 text-sm text-slate-700">
          Délai souhaité*
          <select
            name="delai"
            value={formData.delai}
            onChange={event => handleFieldChange("delai", event.target.value as LeadPayload["delai"])}
            className={`rounded-md border px-3 py-2 text-base focus:outline-none ${
              errors.delai ? "border-red-400" : "border-slate-200 focus:border-brand"
            }`}
          >
            {deadlineOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          {errors.delai ? (
            <span id="error-delai" className="text-xs text-red-600">
              {errors.delai}
            </span>
          ) : null}
        </label>
      </div>

      <label className="flex items-start gap-2 text-sm text-slate-600">
        <input
          type="checkbox"
          checked={formData.consentement}
          onChange={() => handleFieldChange("consentement", true)}
          className="mt-1 h-4 w-4 rounded border-slate-300 text-brand focus:ring-brand"
          required
        />
        <span>
          J&apos;accepte que {brandName} traite mes données pour me recontacter au sujet de ma demande. Les informations
          ne seront jamais revendues.
        </span>
      </label>

      <input
        type="text"
        name={HONEYPOT_FIELD_NAME}
        autoComplete="off"
        tabIndex={-1}
        aria-hidden
        className="hidden"
        value={formData.honeypot}
        onChange={event => handleFieldChange("honeypot", event.target.value)}
      />

      <button
        type="submit"
        className="inline-flex items-center justify-center rounded-full bg-brand px-6 py-3 text-base font-semibold text-white transition hover:bg-brand/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
        disabled={isLoading}
      >
        {isLoading ? "Envoi en cours..." : "Obtenir un devis en 2 min"}
      </button>
      <p className="text-xs text-slate-400">
        Vos données sont traitées conformément à notre{" "}
        <a className="underline underline-offset-4 hover:text-brand" href="/politique-confidentialite">
          politique de confidentialité
        </a>
        . Champs obligatoires signalés par une *.
      </p>
    </form>
  );
}
