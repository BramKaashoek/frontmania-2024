"use client";

import { useEffect, useState } from "react";

export const ClsNotification = () => {
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    // Simulate a delay before showing the notification
    setShowNotification(true);
  }, []);

  if (!showNotification) return null;

  return (
    <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-10">
      <p className="font-bold">Notification</p>
      <p>This notification causes a layout shift to demonstrate CLS.</p>
    </div>
  );
};
