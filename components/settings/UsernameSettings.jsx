"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";

export default function UsernameSettings() {
  const { data: session, update } = useSession();
  const currentUsername = session?.user?.username ?? "";
  const [username, setUsername] = useState(currentUsername);
  const [prevUsername, setPrevUsername] = useState(currentUsername);
  const [status, setStatus] = useState({ type: "idle", message: "" });
  const [loading, setLoading] = useState(false);

  // Sync state if session username changes externally
  if (currentUsername && currentUsername !== prevUsername) {
    setPrevUsername(currentUsername);
    setUsername(currentUsername);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setStatus({ type: "idle", message: "" });

    try {
      const response = await fetch("/api/settings/username", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Unable to update username");
      }

      await update({ username: data.username });
      setStatus({ type: "success", message: "Username updated successfully" });
    } catch (error) {
      setStatus({ type: "error", message: error.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-1.5">
        <label htmlFor="username" className="text-sm font-medium text-foreground">
          Username
        </label>
        <input
          id="username"
          type="text"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          className="h-10 w-full rounded-lg border border-input bg-background px-3 text-sm text-foreground outline-none transition focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/50"
          placeholder="Enter a unique username"
        />
        <p className="text-xs text-muted-foreground">
          Your unique handle (e.g. john-doe). Used for mentions and workspace identification.
        </p>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-60"
      >
        {loading ? "Saving..." : "Save username"}
      </button>

      {status.message ? (
        <p className={`text-sm ${status.type === "error" ? "text-destructive" : "text-emerald-500"}`}>
          {status.message}
        </p>
      ) : null}
    </form>
  );
}
