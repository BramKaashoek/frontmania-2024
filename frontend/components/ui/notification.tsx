'use client';

import { useEffect, useState } from 'react';

export const Notification = ({
  title,
  body,
}: {
  title: string;
  body: string;
}) => {
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    setShowNotification(true);
  }, []);

  if (!showNotification) return null;

  return (
    <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-10">
      <p className="font-bold">{title}</p>
      <p>{body}</p>
    </div>
  );
};
