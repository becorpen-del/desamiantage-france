(function () {
  const COOKIE_STORAGE_KEY = "desamiant-cookie-consent";
  const TRACKING_STORAGE_KEY = "desamiant-tracking";
  const BANNED_WORDS = [
    "viagra",
    "casino",
    "bitcoin",
    "escort",
    "xxx",
    "porn",
    "loan",
    "credit rapide",
    "work from home",
    "cheap pills",
  ];

  function containsBannedWord(text) {
    if (!text) return false;
    const lower = text.toLowerCase();
    return BANNED_WORDS.some(word => lower.includes(word));
  }

  function extractDigits(value) {
    return (value || "").replace(/\D/g, "");
  }

  function formatPhoneInput(value) {
    if (!value) return "";
    const trimmed = value.trim();
    const isIntl = trimmed.startsWith("+");
    const digits = extractDigits(trimmed);

    if (!digits) {
      return isIntl ? "+" : "";
    }

    if (isIntl) {
      return `+${digits.replace(/(\d{1,3})(?=\d)/g, "$1 ")}`.trim();
    }

    if (digits.length <= 10) {
      return digits.replace(/(\d{2})(?=\d)/g, "$1 ").trim();
    }

    return digits.replace(/(\d{3})(?=\d)/g, "$1 ").trim();
  }

  function parseTrackingFromSearch() {
    const params = new URLSearchParams(window.location.search);
    const tracking = {
      source: params.get("utm_source") || null,
      medium: params.get("utm_medium") || null,
      campaign: params.get("utm_campaign") || null,
      term: params.get("utm_term") || null,
      content: params.get("utm_content") || null,
      gclid: params.get("gclid") || null,
    };
    return tracking;
  }

  function mergeTracking(primary, fallback) {
    return {
      source: primary.source || fallback?.source || null,
      medium: primary.medium || fallback?.medium || null,
      campaign: primary.campaign || fallback?.campaign || null,
      term: primary.term || fallback?.term || null,
      content: primary.content || fallback?.content || null,
      gclid: primary.gclid || fallback?.gclid || null,
    };
  }

  function loadStoredTracking() {
    try {
      const raw = window.localStorage.getItem(TRACKING_STORAGE_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch (error) {
      console.warn("Impossible de lire le tracking", error);
      return null;
    }
  }

  function storeTracking(tracking) {
    try {
      window.localStorage.setItem(TRACKING_STORAGE_KEY, JSON.stringify(tracking));
    } catch (error) {
      console.warn("Impossible d'enregistrer le tracking", error);
    }
  }

  function populateTrackingFields(form, tracking) {
    const fields = {
      source: form.querySelector("[data-utm-source]"),
      medium: form.querySelector("[data-utm-medium]"),
      campaign: form.querySelector("[data-utm-campaign]"),
      term: form.querySelector("[data-utm-term]"),
      content: form.querySelector("[data-utm-content]"),
      gclid: form.querySelector("[data-utm-gclid]"),
    };

    if (fields.source) fields.source.value = tracking.source || "";
    if (fields.medium) fields.medium.value = tracking.medium || "";
    if (fields.campaign) fields.campaign.value = tracking.campaign || "";
    if (fields.term) fields.term.value = tracking.term || "";
    if (fields.content) fields.content.value = tracking.content || "";
    if (fields.gclid) fields.gclid.value = tracking.gclid || "";
  }

  function setSubmitDelay(form) {
    const field = form.querySelector("[data-submit-delay]");
    if (field) {
      field.value = Date.now().toString();
    }
  }

  function showFeedback(form, message, variant) {
    const zone = form.querySelector("[data-form-feedback]");
    if (!zone) return;
    zone.textContent = message;
    zone.classList.remove("text-emerald-600", "text-red-600");
    zone.classList.add(variant === "success" ? "text-emerald-600" : "text-red-600");
  }

  function validateForm(form) {
    const nom = form.elements.namedItem("nom").value.trim();
    const email = form.elements.namedItem("email").value.trim();
    const telephone = form.elements.namedItem("telephone").value.trim();
    const codePostal = form.elements.namedItem("codePostal").value.trim();
    const ville = form.elements.namedItem("ville").value.trim();
    const description = form.elements.namedItem("description").value.trim();
    const consentement = form.elements.namedItem("consentement").checked;

    if (nom.length < 2) return "Merci de préciser votre nom.";
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) return "Adresse e-mail invalide.";
    if (extractDigits(telephone).length < 10) return "Numéro de téléphone invalide.";
    if (!/^\d{5}$/.test(codePostal)) return "Code postal invalide.";
    if (ville.length < 2) return "Merci d'indiquer la ville.";
    if (description.length < 20) return "Décrivez votre projet (20 caractères minimum).";
    if (!consentement) return "Le consentement est requis.";
    if (containsBannedWord(description) || containsBannedWord(nom)) return "Formulaire rejeté (contenu suspect).";
    return null;
  }

  function buildPayload(form, tracking) {
    return {
      nom: form.elements.namedItem("nom").value.trim(),
      email: form.elements.namedItem("email").value.trim(),
      telephone: form.elements.namedItem("telephone").value.trim(),
      codePostal: form.elements.namedItem("codePostal").value.trim(),
      ville: form.elements.namedItem("ville").value.trim(),
      typeBatiment: form.elements.namedItem("typeBatiment").value,
      typePrestation: form.elements.namedItem("typePrestation").value,
      description: form.elements.namedItem("description").value.trim(),
      delai: form.elements.namedItem("delai").value,
      consentement: true,
      submitDelay: Number(form.querySelector("[data-submit-delay]").value || "0"),
      utm: {
        source: tracking.source,
        medium: tracking.medium,
        campaign: tracking.campaign,
        term: tracking.term,
        content: tracking.content,
      },
      gclid: tracking.gclid,
    };
  }

  function handleForms(tracking) {
    const forms = document.querySelectorAll("form[data-webhook]");

    forms.forEach(form => {
      populateTrackingFields(form, tracking);
      setSubmitDelay(form);

      const phoneInput = form.elements.namedItem("telephone");
      if (phoneInput) {
        phoneInput.addEventListener("input", event => {
          event.target.value = formatPhoneInput(event.target.value);
        });
      }

      form.addEventListener("reset", () => {
        setTimeout(() => {
          setSubmitDelay(form);
          populateTrackingFields(form, tracking);
        }, 0);
      });

      form.addEventListener("submit", async event => {
        const webhook = form.getAttribute("data-webhook");
        if (!webhook) {
          return;
        }

        event.preventDefault();
        const minDelay = Number(form.getAttribute("data-min-delay") || "2500");
        const errorMessage = validateForm(form);
        if (errorMessage) {
          showFeedback(form, errorMessage, "error");
          return;
        }

        const payload = buildPayload(form, tracking);
        const elapsed = Date.now() - payload.submitDelay;
        if (elapsed < minDelay) {
          showFeedback(form, "Merci de vérifier les informations avant envoi.", "error");
          return;
        }

        const submitButton = form.querySelector("button[type=submit]");
        if (submitButton) {
          submitButton.disabled = true;
        }
        showFeedback(form, "Envoi en cours...", "success");

        try {
          const response = await fetch(webhook, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
          });

          if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
          }

          showFeedback(form, "Merci ! Votre demande a bien été envoyée.", "success");
          form.reset();
          setSubmitDelay(form);
        } catch (error) {
          console.error(error);
          showFeedback(form, "Impossible d'envoyer la demande. Merci de réessayer ou de nous contacter par téléphone.", "error");
        } finally {
          if (submitButton) {
            submitButton.disabled = false;
          }
        }
      });
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    // Sticky CTA
    const cta = document.querySelector("[data-sticky-cta]");
    if (cta) {
      const toggle = () => {
        const visible = window.scrollY > 300;
        cta.classList.toggle("translate-y-0", visible);
        cta.classList.toggle("translate-y-24", !visible);
      };
      toggle();
      window.addEventListener("scroll", toggle);
    }

    // Cookie banner
    const cookieBanner = document.querySelector("[data-cookie-banner]");
    const cookieButton = document.querySelector("[data-cookie-accept]");
    if (cookieBanner && cookieButton) {
      const updateVisibility = () => {
        const accepted = window.localStorage.getItem(COOKIE_STORAGE_KEY) === "accepted";
        if (accepted) {
          cookieBanner.remove();
        } else {
          cookieBanner.classList.remove("hidden");
        }
      };
      cookieButton.addEventListener("click", () => {
        window.localStorage.setItem(COOKIE_STORAGE_KEY, "accepted");
        cookieBanner.remove();
      });
      updateVisibility();
    }

    const fromUrl = parseTrackingFromSearch();
    const stored = loadStoredTracking();
    const tracking = mergeTracking(fromUrl, stored);
    storeTracking(tracking);

    handleForms(tracking);

    const yearNode = document.getElementById("year");
    if (yearNode) {
      yearNode.textContent = String(new Date().getFullYear());
    }
  });
})();
