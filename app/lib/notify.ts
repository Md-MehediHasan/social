// lib/notify.ts
export async function requestNotificationPermission() {
  if (!("Notification" in window)) return;

  if (Notification.permission === "default") {
    await Notification.requestPermission(); // Only asks once
  }
}

export function notifyUser(title: string, body: string, soundUrl: string = "/notification.mp3") {
  if (!("Notification" in window)) return;

  // Show notification only if user granted permission
  if (Notification.permission === "granted") {
    new Notification(title, {
      body,
      icon: "/logo.png", // optional
    });
  }

  // Play notification sound
  const audio = new Audio(soundUrl);
  audio.play().catch(() => {console.log("audio not played")}); // catch errors if user blocks autoplay
}
