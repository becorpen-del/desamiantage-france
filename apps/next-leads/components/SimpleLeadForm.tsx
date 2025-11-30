 "use client";

import { FormEvent, useEffect, useMemo, useState } from "react";

import { fireLeadEvent, formatPhoneInput, MIN_SUBMIT_DELAY_MS } from "@/lib/utils";
import { leadSchema, type LeadPayload } from "@/lib/validators";

type ContactMode = "telephone" | "email";

const FALLBACK_EMAIL = "contact@desamiant-pro.fr";
const FALLBACK_PHONE = "0100000000";

function isValidEmail(value: string): boolean {
  return /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(value.trim());
}

function normalizePhone(value: string): { formatted: string; digits: string } {
  const formatted = formatPhoneInput(value);
  const digits = formatted.replace(/\D/g, "");
  return { formatted, digits };
}

export function SimpleLeadForm() {
  const [postalCode, setPostalCode] = useState("");
  const [contactValue, setContactValue] = useState("");
  const [contactMode, setContactMode] = useState<ContactMode>("telephone");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [feedback, setFeedback] = useState<string | null>(null);
  const [startedAt, setStartedAt] = useState(() => Date.now());

  useEffect(() => {
    setStartedAt(Date.now());
  }, []);

  const isLoading = status === "loading";

  const description = useMemo(
    () =>
      `CTA dalles de sol amiante - contact via ${contactMode}: ${contactValue || "non communiqué"}. Projet retrait de dalles/colles.`,
    [contactMode, contactValue],
  );

  const validateInputs = () => {
    if (!/^\d{5}$/.test(postalCode.trim())) {
      return "Indiquez un code postal à 5 chiffres.";
    }

    if (contactMode === "telephone") {
      const { digits } = normalizePhone(contactValue);
      if (digits.length < 10 || !digits.startsWith("0")) {
        return "Numéro de téléphone français attendu.";
      }
    } else {
      if (!isValidEmail(contactValue)) {
        return "Renseignez un e-mail professionnel valide.";
      }
    }

    return null;
  };

  const buildPayload = (): LeadPayload => {
    const { formatted, digits } = normalizePhone(contactValue);
    const hasPhone = contactMode === "telephone" && digits.length >= 10 && digits.startsWith("0");
    const hasEmail = contactMode === "email" && isValidEmail(contactValue);

    return {
      nom: "Visiteur site",
      email: hasEmail ? contactValue.trim().toLowerCase() : FALLBACK_EMAIL,
      telephone: hasPhone ? formatted : FALLBACK_PHONE,
      codePostal: postalCode.trim(),
      ville: "À préciser",
      typeBatiment: "Appartement",
      typePrestation: "Retrait",
      description,
      delai: "< 7 jours",
      consentement: true,
      honeypot: "",
      recaptchaToken: undefined,
      submitDelay: startedAt,
      utm: {
        source: null,
        medium: null,
        campaign: null,
        term: null,
        content: null,
      },
      gclid: undefined,
    };
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isLoading) return;

    const errorMessage = validateInputs();
    if (errorMessage) {
      setFeedback(errorMessage);
      setStatus("error");
      return;
    }

    if (Date.now() - startedAt < MIN_SUBMIT_DELAY_MS) {
      setFeedback("Merci de vérifier vos informations avant l'envoi.");
      setStatus("error");
      return;
    }

    setStatus("loading");
    setFeedback(null);

    try {
      const payload = buildPayload();
      const parsed = leadSchema.safeParse(payload);
      if (!parsed.success) {
        throw new Error("Données incomplètes, merci de réessayer.");
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
      setStatus("success");
      setFeedback("Demande envoyée. Un conseiller vous rappelle sous 2h ouvrées.");
      setContactValue("");
      setPostalCode("");
      setStartedAt(Date.now());
    } catch (error) {
      console.error(error);
      setStatus("error");
      setFeedback("Impossible d'envoyer la demande pour le moment. Réessayez plus tard.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm shadow-slate-200/60"
    >
      <div className="flex flex-wrap gap-2 text-sm font-semibold text-slate-800">
        <span role="img" aria-label="loupe">
          🔍
        </span>
        Besoin d&apos;enlever vos dalles amiantées ?
      </div>

      <div className="grid gap-3 md:grid-cols-[1fr_1fr]">
        <label className="flex flex-col gap-1 text-sm text-slate-700">
          Code postal*
          <input
            type="text"
            inputMode="numeric"
            maxLength={5}
            value={postalCode}
            onChange={event => setPostalCode(event.target.value.replace(/[^0-9]/g, "").slice(0, 5))}
            className="rounded-md border border-slate-200 px-3 py-2 text-base focus:border-brand focus:outline-none"
            required
          />
        </label>

        <div className="space-y-2">
          <div className="flex gap-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
            <label className="inline-flex items-center gap-1">
              <input
                type="radio"
                name="contactMode"
                value="telephone"
                checked={contactMode === "telephone"}
                onChange={() => setContactMode("telephone")}
              />
              Téléphone
            </label>
            <label className="inline-flex items-center gap-1">
              <input
                type="radio"
                name="contactMode"
                value="email"
                checked={contactMode === "email"}
                onChange={() => setContactMode("email")}
              />
              Email
            </label>
          </div>
          <label className="flex flex-col gap-1 text-sm text-slate-700">
            {contactMode === "telephone" ? "Téléphone mobile" : "Email professionnel"}*
            <input
              type={contactMode === "telephone" ? "tel" : "email"}
              inputMode={contactMode === "telephone" ? "tel" : "email"}
              value={contactValue}
              onChange={event => setContactValue(event.target.value)}
              className="rounded-md border border-slate-200 px-3 py-2 text-base focus:border-brand focus:outline-none"
              required
              placeholder={contactMode === "telephone" ? "06 12 34 56 78" : "vous@entreprise.fr"}
            />
          </label>
        </div>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="inline-flex w-full items-center justify-center rounded-full bg-brand px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-brand/90 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isLoading ? "Envoi en cours..." : "Recevoir 3 devis gratuits"}
      </button>

      {feedback ? (
        <p
          className={`text-sm ${
            status === "success" ? "text-emerald-700" : "text-red-700"
          }`}
        >
          {feedback}
        </p>
      ) : null}
      <p className="text-xs text-slate-500">
        Intervention par entreprises certifiées SS4/SS3 · Données stockées en France · Pas de démarchage hors projet.
      </p>
    </form>
  );
}
