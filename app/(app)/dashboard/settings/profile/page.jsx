"use client";

import Image from "next/image";
import { useSession } from "next-auth/react";
import { Camera, Save } from "lucide-react";
import { useState } from "react";

export default function EditProfilePage() {
  const { data: session } = useSession();
  const [form, setForm] = useState({
    name: session?.user?.name || "Ava Chen",
    username: session?.user?.username || "ava",
    email: session?.user?.email || "ava@devboard.app",
    bio: "Designing calm, dependable product experiences for fast-moving teams.",
    location: "Lisbon, Portugal",
    website: "https://devboard.app",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const avatarSrc = session?.user?.image || "/default-avatar.png";

  return (
    <div className="space-y-6">
      <section className="rounded-[24px] border border-border bg-card/80 p-6 shadow-sm">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.24em] text-muted-foreground">Settings</p>
            <h1 className="mt-2 text-3xl font-semibold text-foreground">Edit profile</h1>
            <p className="mt-2 text-sm text-muted-foreground">Keep your workspace identity polished and up to date.</p>
          </div>
          <div className="rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-sm font-medium text-primary">Preview mode</div>
        </div>
      </section>

      <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
        <aside className="rounded-[24px] border border-border bg-card/80 p-4 shadow-sm">
          <div className="flex items-center gap-3 rounded-2xl border border-border bg-background/70 p-3">
            <div className="flex size-12 items-center justify-center overflow-hidden rounded-2xl border border-border bg-muted/50">
              <Image src={avatarSrc} alt="Profile preview" width={48} height={48} className="object-cover" />
            </div>
            <div>
              <p className="font-semibold text-foreground">{form.name}</p>
              <p className="text-sm text-muted-foreground">@{form.username}</p>
            </div>
          </div>

          <div className="mt-4 space-y-2 text-sm text-muted-foreground">
            <div className="rounded-xl border border-border bg-background/70 p-3">
              <p className="font-medium text-foreground">Profile tips</p>
              <p className="mt-1">Use a clear name and concise bio so collaborators can recognize you quickly.</p>
            </div>
            <div className="rounded-xl border border-border bg-background/70 p-3">
              <p className="font-medium text-foreground">Visibility</p>
              <p className="mt-1">This information is shown in activity updates, mentions, and your workspace profile.</p>
            </div>
          </div>
        </aside>

        <div className="space-y-6">
          <section className="rounded-[24px] border border-border bg-card/80 p-6 shadow-sm">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h2 className="text-lg font-semibold text-foreground">Profile photo</h2>
                <p className="text-sm text-muted-foreground">Choose an image that feels recognizable and polished.</p>
              </div>
              <button
                type="button"
                className="inline-flex items-center gap-2 rounded-full border border-border bg-background/70 px-3 py-2 text-sm font-medium text-foreground transition hover:bg-background"
              >
                <Camera className="size-4" />
                Change photo
              </button>
            </div>
          </section>

          <section className="rounded-[24px] border border-border bg-card/80 p-6 shadow-sm">
            <div className="mb-4">
              <h2 className="text-lg font-semibold text-foreground">Personal details</h2>
              <p className="text-sm text-muted-foreground">Update the details that appear across your workspace.</p>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <label className="space-y-2 text-sm">
                <span className="font-medium text-foreground">Full name</span>
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  className="h-10 w-full rounded-lg border border-input bg-background px-3 text-sm text-foreground outline-none transition focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/50"
                />
              </label>

              <label className="space-y-2 text-sm">
                <span className="font-medium text-foreground">Username</span>
                <input
                  name="username"
                  value={form.username}
                  onChange={handleChange}
                  className="h-10 w-full rounded-lg border border-input bg-background px-3 text-sm text-foreground outline-none transition focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/50"
                />
              </label>

              <label className="space-y-2 text-sm">
                <span className="font-medium text-foreground">Email</span>
                <input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  className="h-10 w-full rounded-lg border border-input bg-background px-3 text-sm text-foreground outline-none transition focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/50"
                />
              </label>

              <label className="space-y-2 text-sm">
                <span className="font-medium text-foreground">Location</span>
                <input
                  name="location"
                  value={form.location}
                  onChange={handleChange}
                  className="h-10 w-full rounded-lg border border-input bg-background px-3 text-sm text-foreground outline-none transition focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/50"
                />
              </label>
            </div>

            <label className="mt-4 block space-y-2 text-sm">
              <span className="font-medium text-foreground">Bio</span>
              <textarea
                name="bio"
                rows={4}
                value={form.bio}
                onChange={handleChange}
                className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground outline-none transition focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/50"
              />
            </label>

            <label className="mt-4 block space-y-2 text-sm">
              <span className="font-medium text-foreground">Website</span>
              <input
                name="website"
                value={form.website}
                onChange={handleChange}
                className="h-10 w-full rounded-lg border border-input bg-background px-3 text-sm text-foreground outline-none transition focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/50"
              />
            </label>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <button
                type="button"
                className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition hover:bg-primary/90"
              >
                <Save className="size-4" />
                Save changes
              </button>
              <p className="text-sm text-muted-foreground">This is a preview experience with dummy data.</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
