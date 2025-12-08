"use client";

import Image from "next/image";
import Link from "next/link";
import type { Route } from "next";
import { useCallback, useEffect, useRef, useState } from "react";

function useOutsideClose<T extends HTMLElement>(onClose: () => void) {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    function onDoc(event: MouseEvent) {
      if (!ref.current) return;
      if (!ref.current.contains(event.target as Node)) {
        onClose();
      }
    }

    document.addEventListener("mousedown", onDoc);

    return () => {
      document.removeEventListener("mousedown", onDoc);
    };
  }, [onClose]);

  return ref;
}

type NavItem = { href: Route; label: string };

const dropdownItems: { services: NavItem[]; villes: NavItem[]; pricing: NavItem[] } = {
  services: [
    { href: "/types-desamiantage/toiture/" as Route, label: "Désamiantage toiture" },
    { href: "/desamiantage-fibrociment/" as Route, label: "Désamiantage fibrociment" },
    { href: "/diagnostic-amiante/" as Route, label: "Diagnostic amiante" },
    { href: "/types-desamiantage/dalles-de-sol" as Route, label: "Désamiantage dalles de sol" },
    { href: "/tous-les-services/" as Route, label: "Tous les services →" },
  ],
  villes: [
    { href: "/paris" as Route, label: "Paris" },
    { href: "/bordeaux" as Route, label: "Bordeaux" },
    { href: "/lyon" as Route, label: "Lyon" },
    { href: "/toulouse" as Route, label: "Toulouse" },
    { href: "/nantes" as Route, label: "Nantes" },
  ],
  pricing: [
    { href: "/prix-desamiantage/" as Route, label: "💰 Guide des prix" },
    { href: "/prix-desamiantage-au-m2/" as Route, label: "📏 Prix au m²" },
    { href: "/devis-desamiantage/" as Route, label: "📋 Exemple de devis" },
    { href: "/tarif-desamiantage/" as Route, label: "🏷️ Grille tarifaire" },
  ],
};

export default function SiteHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<null | "services" | "villes" | "pricing">(null);

  const closeDropdown = useCallback(() => setOpenDropdown(null), []);
  const wrapRef = useOutsideClose<HTMLDivElement>(closeDropdown);

  useEffect(() => {
    document.documentElement.style.overflow = mobileOpen ? "hidden" : "";

    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [mobileOpen]);

  useEffect(() => {
    if (!mobileOpen) {
      closeDropdown();
    }
  }, [mobileOpen, closeDropdown]);

  const onToggle = (key: "services" | "villes" | "pricing") => {
    setOpenDropdown(prev => (prev === key ? null : key));
  };
  const handleNavigate = useCallback(() => {
    closeDropdown();
    setMobileOpen(false);
  }, [closeDropdown]);

  return (
    <header className="main-header">
      <div className="container">
        <div className="header-content">
          <div className="logo">
            {/* Bloc marque statique : uniquement le logo officiel pour éviter toute divergence SSR/CSR */}
            <Link href="/" aria-label="Retour à l'accueil" className="flex items-center">
              <Image
                src="/images/Désamiantage-test-2.png"
                alt="Désamiantage-France"
                width={320}
                height={320}
                className="h-14 w-auto sm:h-16 lg:h-20"
                priority
              />
            </Link>
          </div>

          <nav className={`main-nav${mobileOpen ? " mobile-open" : ""}`} role="navigation" aria-label="Navigation principale">
            <ul className="nav-list">
              <li className={`nav-item${openDropdown === "services" ? " active" : ""}`}>
                <button
                  type="button"
                  className="nav-link"
                  aria-expanded={openDropdown === "services"}
                  aria-haspopup="true"
                  onClick={() => onToggle("services")}
                >
                  Services
                  <svg className="icon-chevron" width="10" height="6" viewBox="0 0 10 6" data-open={openDropdown === "services"}>
                    <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.5" fill="none" />
                  </svg>
                </button>
                {openDropdown === "services" ? (
                  <div ref={wrapRef} className="dropdown-menu">
                    <div className="dropdown-section">
                      <h3>Par type de travaux</h3>
                      <ul>
                        {dropdownItems.services.map(item => (
                          <li key={item.href}>
                            <Link href={item.href} onClick={handleNavigate}>
                              {item.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ) : null}
              </li>

              <li className={`nav-item${openDropdown === "villes" ? " active" : ""}`}>
                <button
                  type="button"
                  className="nav-link"
                  aria-expanded={openDropdown === "villes"}
                  aria-haspopup="true"
                  onClick={() => onToggle("villes")}
                >
                  Trouver un pro
                  <svg className="icon-chevron" width="10" height="6" viewBox="0 0 10 6" data-open={openDropdown === "villes"}>
                    <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.5" fill="none" />
                  </svg>
                </button>
                {openDropdown === "villes" ? (
                  <div ref={wrapRef} className="dropdown-menu">
                    <div className="dropdown-section">
                      <h3>Villes principales</h3>
                      <ul className="cities-list">
                        {dropdownItems.villes.map(item => (
                          <li key={item.href}>
                            <Link href={item.href} onClick={handleNavigate}>
                              <span className="city-name">{item.label}</span>
                              <span className="city-badge" aria-hidden>
                                ⭐
                              </span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                      <div className="dropdown-divider" />
                      <div className="search-widget">
                        <p>
                          <strong>Autre ville ?</strong>
                        </p>
                        <form action="/desamiantage-france" method="GET">
                          <input type="search" name="ville" placeholder="Ex: Marseille, Lille..." aria-label="Rechercher une ville" />
                          <button type="submit" aria-label="Valider la recherche">
                            →
                          </button>
                        </form>
                      </div>
                      <Link href="/desamiantage-france" className="view-all" onClick={handleNavigate}>
                        📍 Voir toutes les villes →
                      </Link>
                    </div>
                  </div>
                ) : null}
              </li>

              <li className={`nav-item${openDropdown === "pricing" ? " active" : ""}`}>
                <button
                  type="button"
                  className="nav-link"
                  aria-expanded={openDropdown === "pricing"}
                  aria-haspopup="true"
                  onClick={() => onToggle("pricing")}
                >
                  Prix &amp; Devis
                  <svg className="icon-chevron" width="10" height="6" viewBox="0 0 10 6" data-open={openDropdown === "pricing"}>
                    <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.5" fill="none" />
                  </svg>
                </button>
                {openDropdown === "pricing" ? (
                  <div ref={wrapRef} className="dropdown-menu">
                    <div className="dropdown-section">
                      <h3>Estimez votre projet</h3>
                      <ul>
                        {dropdownItems.pricing.map(item => (
                          <li key={item.href}>
                            <Link href={item.href} onClick={handleNavigate}>
                              {item.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                      <div className="dropdown-divider" />
                      <div className="cta-box-dropdown">
                        <p>
                          <strong>Besoin d&apos;un devis ?</strong>
                        </p>
                        <Link href="/devis-gratuit" className="btn-dropdown" onClick={handleNavigate}>
                          Recevoir 3 devis gratuits
                        </Link>
                      </div>
                    </div>
                  </div>
                ) : null}
              </li>
            </ul>
          </nav>

          <div className="header-cta">
            <Link href="/devis-gratuit" className="btn-cta" onClick={handleNavigate}>
              Obtenir 3 devis gratuits
            </Link>
          </div>

          <button
            type="button"
            className={`mobile-menu-toggle${mobileOpen ? " active" : ""}`}
            aria-label={mobileOpen ? "Fermer le menu" : "Ouvrir le menu"}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen(value => !value)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>

      </div>
    </header>
  );
}
