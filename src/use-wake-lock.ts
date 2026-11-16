import { useEffect } from "react"

export function useWakeLock(): void {
  useEffect(() => {
    if (!("wakeLock" in navigator)) {
      return
    }
    let lock: WakeLockSentinel | undefined
    const request = async () => {
      if (document.visibilityState === "visible") {
        lock = await navigator.wakeLock.request("screen").catch(() => undefined)
      }
    }
    void request()
    document.addEventListener("visibilitychange", request)
    return () => {
      document.removeEventListener("visibilitychange", request)
      void lock?.release()
    }
  }, [])
}
