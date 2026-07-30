import UsernameSettings from "@/components/settings/UsernameSettings";

export const metadata = {
  title: "Settings | DevBoard",
  description: "Manage your account settings",
};

export default function SettingsPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground">Account Settings</h1>
        <p className="text-sm text-muted-foreground">
          Manage your profile and account preferences.
        </p>
      </div>

      <div className="space-y-6">
        <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
          <h2 className="mb-4 text-lg font-semibold text-foreground">Profile Information</h2>
          <UsernameSettings />
        </div>
      </div>
    </div>
  );
}