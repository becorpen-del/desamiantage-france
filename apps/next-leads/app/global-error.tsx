"use client";

export default function GlobalError({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <html>
      <body style={{ padding: "2rem" }}>
        <h2>Erreur globale</h2>
        <pre style={{ whiteSpace: "pre-wrap" }}>{error?.message}</pre>
        <button onClick={() => reset()} style={{ marginTop: 12 }}>
          Recharger
        </button>
      </body>
    </html>
  );
}
