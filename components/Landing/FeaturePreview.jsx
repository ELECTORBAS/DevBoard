"use client";

import {
  Kanban,
  Users,
  UploadCloud,
  Lock,
  CheckCircle2,
  Check,
  ShieldCheck,
} from "lucide-react";

const FeaturePreview = ({ feature }) => {
  const renderVisualMockup = () => {
    switch (feature.id) {
      case "kanban":
        return (
          <div className="mockup-panel">
            <div className="mockup-panel__header">
              <span className="mockup-panel__label">Sprint Board</span>
              <div className="status-dots">
                <span className="status-dot" />
                <span className="status-dot" />
                <span className="status-dot" />
              </div>
            </div>

            <div className="kanban-board">
              {/* To Do Column */}
              <div className="kanban-column">
                <div className="kanban-column__header">
                  <span className="kanban-column__label">To Do</span>
                  <span className="count-badge">2</span>
                </div>

                <div className="task-card task-card--hover">
                  <div className="task-card__title">Landing Page UI</div>
                  <div className="task-card__meta">
                    <span className="tag-pill tag-pill--sky">UI</span>
                    <span>Jul 30</span>
                  </div>
                </div>

                <div className="task-card">
                  <div className="task-card__title">Drizzle Migrations</div>
                  <div className="task-card__meta">
                    <span className="tag-pill tag-pill--neutral">Backend</span>
                    <span>Aug 2</span>
                  </div>
                </div>
              </div>

              {/* In Progress Column */}
              <div className="kanban-column">
                <div className="kanban-column__header">
                  <span className="kanban-column__label">In Progress</span>
                  <span className="count-badge--accent" style={{ backgroundColor: `${feature.color}15`, color: feature.color }}>1</span>
                </div>

                <div
                  className="task-card--accent"
                  style={{ border: `1px solid ${feature.color}35`, boxShadow: `0 4px 12px ${feature.color}08` }}
                >
                  <div className="task-card__title">OAuth Integration</div>
                  <p className="task-card__desc">Configure Google Auth client</p>
                  <div className="task-card__meta">
                    <span className="status-pill" style={{ backgroundColor: feature.color }}>Active</span>
                    <div className="avatar-stack">
                      <div className="avatar-chip avatar-chip--sm bg-blue-600">JD</div>
                      <div className="avatar-chip avatar-chip--sm bg-emerald-600">SK</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Done Column */}
              <div className="kanban-column">
                <div className="kanban-column__header">
                  <span className="kanban-column__label">Done</span>
                  <span className="count-badge">1</span>
                </div>

                <div className="task-card--done">
                  <div className="task-card__title--done">Repository Setup</div>
                  <div className="task-card__meta task-card__meta--done">
                    <span className="task-card__done-label"><CheckCircle2 className="w-3 h-3 text-emerald-500" /> Done</span>
                    <span>Jul 24</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      case "collaboration":
        return (
          <div className="mockup-panel">
            <div className="mockup-panel__header">
              <div className="icon-label">
                <Users className="w-4 h-4 animate-pulse" style={{ color: feature.color }} />
                <span className="mockup-panel__label">Team Space</span>
              </div>
              <div className="avatar-stack--tight">
                <div className="avatar-chip avatar-chip--md bg-blue-500">JD</div>
                <div className="avatar-chip avatar-chip--md bg-emerald-500">SK</div>
                <div className="avatar-chip avatar-chip--md bg-purple-500">AM</div>
                <div className="avatar-chip avatar-chip--md avatar-chip--muted">+3</div>
              </div>
            </div>

            <div className="chat-thread">
              <div className="chat-bubble">
                <div className="chat-bubble__meta">
                  <span className="chat-bubble__name">Sarah Kelly</span>
                  <span className="timestamp">10:42 AM</span>
                </div>
                <p className="chat-bubble__text">I just updated the design specs on Kanban cards. Can someone double-check the landing page requirements?</p>
              </div>

              <div className="chat-bubble chat-bubble--reply">
                <div className="chat-bubble__indicator" style={{ backgroundColor: feature.color }} />
                <div className="chat-bubble__meta">
                  <span className="chat-bubble__name">John Doe</span>
                  <span className="timestamp">10:45 AM</span>
                </div>
                <p className="chat-bubble__text">Looks great Sarah! I will claim the OAuth card and start implementation this afternoon.</p>
              </div>

              <div className="typing-indicator">
                <div className="typing-indicator__dot" />
                <span className="typing-indicator__text">Alex Miller is typing...</span>
              </div>
            </div>
          </div>
        );
      case "uploads":
        return (
          <div className="mockup-panel">
            <div className="mockup-panel__header">
              <span className="mockup-panel__label">Cloud Storage</span>
              <span className="pill-badge">Cloudinary Secured</span>
            </div>

            <div className="uploads-panel">
              {/* Drag Drop Area */}
              <div
                className="upload-dropzone"
                style={{ borderColor: `${feature.color}30` }}
              >
                <UploadCloud className="w-8 h-8 transition-transform duration-300 hover:scale-110" style={{ color: feature.color }} />
                <div>
                  <p className="upload-dropzone__title">Drag & drop files here</p>
                  <p className="upload-dropzone__subtitle">JPEG, PNG, SVG or PDF up to 20MB</p>
                </div>
              </div>

              {/* Uploading Files list */}
              <div className="upload-list">
                <div className="upload-item">
                  <div className="upload-item__header">
                    <span className="upload-item__name">feature-preview.webp</span>
                    <span className="upload-item__percent" style={{ color: feature.color }}>76%</span>
                  </div>
                  <div className="progress-track">
                    <div
                      className="progress-fill"
                      style={{ width: "76%", backgroundColor: feature.color }}
                    />
                  </div>
                  <div className="upload-item__meta">
                    <span>1.2 MB / 1.6 MB</span>
                    <span>1.8 MB/s</span>
                  </div>
                </div>

                <div className="upload-item--done">
                  <span className="upload-item__name--done">deployment-config.yaml</span>
                  <span className="upload-item__status">
                    <Check className="w-3.5 h-3.5" /> Complete
                  </span>
                </div>
              </div>
            </div>
          </div>
        );
      case "analytics":
        return (
          <div className="mockup-panel">
            <div className="mockup-panel__header">
              <span className="mockup-panel__label">Workspace Metrics</span>
              <span className="live-indicator">
                <span className="live-indicator__dot" /> Real-time
              </span>
            </div>

            <div className="analytics-panel">
              {/* Summary Cards */}
              <div className="stat-grid">
                <div className="stat-card">
                  <span className="stat-label">Sprint Velocity</span>
                  <div className="stat-value">
                    42
                    <span className="stat-value__delta">+18%</span>
                  </div>
                </div>
                <div className="stat-card">
                  <span className="stat-label">Avg. Cycle Time</span>
                  <div className="stat-value">
                    2.4<span className="stat-value__unit">days</span>
                  </div>
                </div>
              </div>

              {/* Custom SVG Line Chart */}
              <div className="chart-card">
                <div className="chart-card__gridlines">
                  <div className="chart-card__gridline" />
                  <div className="chart-card__gridline" />
                  <div className="chart-card__gridline" />
                </div>

                <svg className="chart-card__svg" viewBox="0 0 100 30" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id={`glowGrad-${feature.id}`} x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor={feature.color} stopOpacity="0.25" />
                      <stop offset="100%" stopColor={feature.color} stopOpacity="0" />
                    </linearGradient>
                  </defs>

                  {/* Fill Area */}
                  <path
                    d="M 0 30 L 0 22 Q 25 8 50 20 T 90 4 L 100 6 L 100 30 Z"
                    fill={`url(#glowGrad-${feature.id})`}
                  />

                  {/* Line Path */}
                  <path
                    d="M 0 22 Q 25 8 50 20 T 90 4 L 100 6"
                    fill="none"
                    stroke={feature.color}
                    strokeWidth="2"
                    strokeLinecap="round"
                  />

                  {/* Highlight Node */}
                  <circle cx="90" cy="4" r="3" fill={feature.color} />
                  <circle cx="90" cy="4" r="1.2" fill="#fff" />
                </svg>

                <div className="chart-card__labels">
                  <span>Mon</span>
                  <span>Wed</span>
                  <span>Fri</span>
                  <span>Sun</span>
                </div>
              </div>
            </div>
          </div>
        );
      case "notifications":
        return (
          <div className="mockup-panel">
            <div className="mockup-panel__header">
              <span className="mockup-panel__label">Inbox Notifications</span>
              <span className="notif-badge">
                <span className="notif-badge__dot" /> 3 New
              </span>
            </div>

            <div className="notif-list">
              <div
                className="notif-item"
                style={{ borderLeft: `3.5px solid ${feature.color}` }}
              >
                <div className="activity-item__header">
                  <span className="notif-item__title">Deadline Reminder</span>
                  <span className="timestamp">Just now</span>
                </div>
                <p className="notif-item__text">Task "Database Migration Script" is approaching its scheduled deadline in 2 hours.</p>
              </div>

              <div className="activity-item activity-item--dim">
                <div className="activity-item__header">
                  <span className="activity-item__title">PR Merged</span>
                  <span className="timestamp--muted">12m ago</span>
                </div>
                <p className="activity-item__text">Branch <code>feature/google-oauth</code> was successfully merged into <strong>main</strong>.</p>
              </div>

              <div className="activity-item activity-item--dimmer">
                <div className="activity-item__header">
                  <span className="activity-item__title">Comment Added</span>
                  <span className="timestamp--muted">1h ago</span>
                </div>
                <p className="activity-item__text">Sarah commented: "Verified the API response payload, works fine."</p>
              </div>
            </div>
          </div>
        );
      case "authentication":
        return (
          <div className="mockup-panel mockup-panel--centered">
            <div className="auth-card">
              <div
                className="auth-card__icon"
                style={{ backgroundColor: `${feature.color}15`, border: `1px solid ${feature.color}25` }}
              >
                <Lock className="w-5 h-5" style={{ color: feature.color }} />
              </div>
              <h3 className="auth-card__title">Secure Authorization</h3>
              <p className="auth-card__subtitle">
                Connect your account via secure OAuth providers.
              </p>

              <div className="auth-card__actions">
                <button className="google-btn">
                  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24">
                    <path fill="#EA4335" d="M12 5.04c1.66 0 3.2.57 4.38 1.69l3.27-3.27C17.68 1.54 15.02 1 12 1 7.35 1 3.4 3.65 1.54 7.54l3.86 3C6.35 7.54 8.96 5.04 12 5.04z" />
                    <path fill="#4285F4" d="M23.49 12.27c0-.81-.07-1.59-.2-2.34H12v4.44h6.44c-.28 1.44-1.09 2.66-2.31 3.48l3.6 2.79c2.1-1.94 3.76-4.8 3.76-8.37z" />
                    <path fill="#FBBC05" d="M5.4 14.46c-.25-.75-.39-1.56-.39-2.46s.14-1.71.39-2.46l-3.86-3C.54 8.56 0 10.22 0 12s.54 3.44 1.54 5.46l3.86-3z" />
                    <path fill="#34A853" d="M12 23c3.24 0 5.97-1.07 7.96-2.91l-3.6-2.79c-.99.66-2.27 1.06-4.36 1.06-3.04 0-5.65-2.5-6.6-5.5l-3.86 3C3.4 20.35 7.35 23 12 23z" />
                  </svg>
                  Continue with Google
                </button>
              </div>

              <div className="auth-card__note">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                <span>JWT Session Authentication Active</span>
              </div>
            </div>
          </div>
        );
      default:
        return (
          <div className="mockup-panel--empty">
            <p className="mockup-panel__empty-text">
              {feature.title} Preview
            </p>
          </div>
        );
    }
  };

  return (
    <div className="feature-preview">
      <p
        className="feature-preview__eyebrow"
        style={{ color: feature.color }}
      >
        {feature.subtitle}
      </p>

      <h2 className="feature-preview__title">
        {feature.title}
      </h2>

      <p className="feature-preview__description">
        {feature.description}
      </p>

      <ul className="feature-preview__bullets">
        {feature.bullets.map((bullet) => (
          <li
            key={bullet}
            className="feature-preview__bullet"
          >
            <span
              className="feature-preview__bullet-dot"
              style={{
                backgroundColor: feature.color,
                boxShadow: `0 0 8px ${feature.color}`
              }}
            />
            {bullet}
          </li>
        ))}
      </ul>

      {/* Dynamic Glow Preview Mockup Box */}
      <div
        className="feature-preview__mockup"
        style={{
          borderColor: `${feature.color}25`,
          boxShadow: `0 20px 45px -10px ${feature.color}15, inset 0 1px 0 0 rgba(255,255,255,0.05)`
        }}
      >
        {/* Decorative Top Accent Glow Line */}
        <div
          className="feature-preview__mockup-accent"
          style={{
            backgroundImage: `linear-gradient(to right, ${feature.color}80, ${feature.color}10)`
          }}
        />

        {/* Render interactive custom mockup visual */}
        <div className="feature-preview__mockup-body">
          {renderVisualMockup()}
        </div>
      </div>
    </div>
  );
};

export default FeaturePreview;