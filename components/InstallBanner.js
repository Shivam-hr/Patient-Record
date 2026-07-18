"use client";
import { useEffect, useState } from "react";

export default function InstallBanner() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isStandalone, setIsStandalone] = useState(true); // assume installed until checked, avoids flash
  const [isIOS, setIsIOS] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const standalone =
      window.matchMedia("(display-mode: standalone)").matches ||
      window.navigator.standalone === true;
    // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time browser capability check on mount
    setIsStandalone(standalone);
    setIsIOS(/iPad|iPhone|iPod/.test(navigator.userAgent));

    const handler = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };
    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  if (isStandalone || dismissed) return null;

  async function handleInstallClick() {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    await deferredPrompt.userChoice;
    setDeferredPrompt(null);
    setDismissed(true);
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-primary text-white px-4 py-3 flex items-center justify-between gap-3 z-[100] shadow-[0_-4px_16px_rgba(0,0,0,0.15)]">
      {isIOS ? (
        <p className="text-[12.5px] leading-snug flex-1">
          Install this app: tap <b>Share</b> (square with ↑) then <b>&quot;Add to Home Screen&quot;</b>
        </p>
      ) : (
        <p className="text-[13px] font-semibold flex-1">Install this app for quick access</p>
      )}

      <div className="flex items-center gap-2 shrink-0">
        {!isIOS && deferredPrompt && (
          <button
            onClick={handleInstallClick}
            className="bg-white text-primary px-3.5 py-1.5 rounded-lg text-[12.5px] font-extrabold cursor-pointer border-none"
          >
            Install
          </button>
        )}
        <button
          onClick={() => setDismissed(true)}
          aria-label="Dismiss"
          className="text-white/80 text-lg leading-none bg-transparent border-none cursor-pointer px-1"
        >
          ✕
        </button>
      </div>
    </div>
  );
}
