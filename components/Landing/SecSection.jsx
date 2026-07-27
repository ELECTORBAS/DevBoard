"use client";
import { useState } from "react";
import OptionWheel from "../ui/OptionWheel/OptionWheel";
import FeaturePreview from "./FeaturePreview";

export const features = [
  {
    id: "kanban",
    title: "Kanban Boards",
    subtitle: "Plan, organize, and deliver with confidence.",
    description:
      "Manage projects using an intuitive drag-and-drop Kanban board designed for individuals and teams.",
    bullets: [
      "Drag & drop task management",
      "Custom columns and workflows",
      "Priority labels and due dates",
      "Real-time board updates",
    ],
    image: "/assets/features/kanban.webp",
    color: "#38bdf8", // Sky Blue
  },
  {
    id: "collaboration",
    title: "Team Collaboration",
    subtitle: "Work together without the chaos.",
    description:
      "Invite teammates, assign work, and keep everyone aligned with shared project workspaces.",
    bullets: [
      "Assign tasks instantly",
      "Member roles and permissions",
      "Activity history",
      "Shared project workspaces",
    ],
    image: "/assets/features/collaboration.webp",
    color: "#34d399", // Emerald Green
  },
  {
    id: "uploads",
    title: "File Uploads",
    subtitle: "Keep every project asset in one place.",
    description:
      "Upload images, documents, and other files directly to tasks using secure cloud storage.",
    bullets: [
      "Cloudinary powered storage",
      "Image previews",
      "Secure file management",
      "Attach files to any task",
    ],
    image: "/assets/features/uploads.webp",
    color: "#a78bfa", // Lavender/Purple
  },
  {
    id: "analytics",
    title: "Analytics",
    subtitle: "Measure progress at a glance.",
    description:
      "Visual dashboards help you understand productivity, project health, and team performance.",
    bullets: [
      "Interactive charts",
      "Task completion insights",
      "Project progress tracking",
      "Performance metrics",
    ],
    image: "/assets/features/analytics.webp",
    color: "#fb923c", // Warm Orange
  },
  {
    id: "notifications",
    title: "Notifications",
    subtitle: "Never miss an important update.",
    description:
      "Stay informed with real-time notifications whenever tasks, projects, or teammates make changes.",
    bullets: [
      "Real-time activity updates",
      "Task assignment alerts",
      "Deadline reminders",
      "Project event notifications",
    ],
    image: "/assets/features/notifications.webp",
    color: "#f472b6", // Rose/Pink
  },
  {
    id: "authentication",
    title: "Google Authentication",
    subtitle: "Sign in securely in seconds.",
    description:
      "Authenticate using your Google account with a fast, secure, and seamless login experience.",
    bullets: [
      "One-click Google Sign-In",
      "Secure Auth.js authentication",
      "Protected routes",
      "Persistent user sessions",
    ],
    image: "/assets/features/authentication.webp",
    color: "#f87171", // Soft Red
  },
];

const SecSection = () => {
  const [selectedIndex, setSelectedIndex] = useState(2);
  const currentFeature = features[selectedIndex];

  return (
    <section className="features-showcase">
      {/* Ambient background glow */}
      <div
        className="features-showcase__glow"
        style={{
          width: "600px",
          height: "600px",
          background: `radial-gradient(circle, ${currentFeature.color} 0%, transparent 70%)`,
          top: "40%",
          left: "20%",
          transform: "translate(-50%, -50%)",
          zIndex: 0,
        }}
      />

      <div className="features-showcase__header">
        <h1 className="features-showcase__title">
          Everything you need to ship projects
        </h1>

        <p className="features-showcase__subtitle">
          Powerful features designed for developers and teams.
        </p>
      </div>

      <div className="features-showcase__grid">
        <OptionWheel
          items={features.map((f) => f.title)}
          defaultSelected={2}
          textColor="#71717a"
          activeColor={currentFeature.color}
          side="left"
          fontSize={3}
          spacing={1.4}
          curve={1}
          tilt={6}
          blur={2}
          fade={0.25}
          smoothing={200}
          inset={80}
          loop={false}
          draggable
          soundUrl="/assets/sounds/click-soft.mp3"
          soundVolume={0.5}
          onChange={(index) => setSelectedIndex(index)}
        />

        <FeaturePreview feature={currentFeature} />
      </div>
    </section>
  );
};

export default SecSection;