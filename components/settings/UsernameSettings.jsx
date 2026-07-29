"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";

export default function UsernameSettings() {
  const { data: session, update } = useSession();
  const [username, setUsername] = useState(session?.user?.username ?? "");
  const [status, setStatus] = useState({ type: "idle", message: "" });
  const [loading, setLoading] = useState(false);

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
    <form onSubmit={handleSubmit} className="space-y-3 rounded-lg border border-slate-200 p-4">
      <div>
        <label htmlFor="username" className="mb-1 block text-sm font-medium text-slate-700">
          Username
        </label>
        <input
          id="username"
          type="text"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          className="w-full rounded-md border border-slate-300 px-3 py-2"
          placeholder="Enter a unique username"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white disabled:opacity-60"
      >
        {loading ? "Saving..." : "Save username"}
      </button>

      {status.message ? (
        <p className={`text-sm ${status.type === "error" ? "text-red-600" : "text-green-600"}`}>
          {status.message}
        </p>
      ) : null}
    </form>
  );
}
