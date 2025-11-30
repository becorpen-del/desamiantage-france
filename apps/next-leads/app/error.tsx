"use client";

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <main style={{ padding: "2rem" }}>
      <h2>Une erreur est survenue</h2>
      <pre style={{ whiteSpace: "pre-wrap" }}>{error?.message}</pre>
      <button onClick={() => reset()} style={{ marginTop: 12 }}>
        Recharger
      </button>
    </main>
  );
}
