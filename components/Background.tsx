export function Background() {
  return (
    <div
      className="fixed inset-0 -z-10 overflow-hidden pointer-events-none"
      aria-hidden="true"
    >
      {/* Grid */}
      <div className="absolute inset-0 bg-grid" />

      {/* Gradient orbs */}
      <div className="orb orb-1" />
      <div className="orb orb-2" />
      <div className="orb orb-3" />

      {/* Noise */}
      <div className="absolute inset-0 noise-overlay" />
    </div>
  );
}
