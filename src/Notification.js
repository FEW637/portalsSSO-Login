// src/Notification.js
import React, { useEffect } from "react";

function Notification({ message, onClose }) {
  useEffect(() => {
    // ตั้งเวลาให้การแจ้งเตือนหายไปหลังจาก 2 วินาที
    const timer = setTimeout(() => {
      onClose();
    }, 2000);

    return () => clearTimeout(timer); // ลบ timer เมื่อ component ถูกถอดออก
  }, [onClose]);

  return (
    <div className="fixed bottom-4 right-4 p-4 bg-white border border-gray-300 rounded-lg shadow-md transition-transform transform translate-y-4 opacity-0 animate-slide-up">
      <div className="flex items-center">
        <span className="text-green-500 mr-2">✔️</span>
        <span className="text-black font-medium">{message}</span>
      </div>
    </div>
  );
}

export default Notification;
