import React, { useState } from "react";
import { CheckCircle } from "lucide-react";

export default function CompetitionNotifications() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      source: "SocialManager",
      message: "New competition challenge has been released. Submit before deadline.",
      time: "10m",
      read: false,
    },
    {
      id: 2,
      source: "FeedbackHub Team",
      message: "Your last submission has been reviewed and scored.",
      time: "30m",
      read: false,
    },
    {
      id: 3,
      source: "SocialManager",
      message: "Leaderboard has been updated. Check your ranking.",
      time: "2h",
      read: true,
    },
    {
      id: 4,
      source: "FeedbackHub Team",
      message: "Feedback report is now available for your latest task.",
      time: "5h",
      read: false,
    },
    {
      id: 5,
      source: "SocialManager",
      message: "Reminder: Weekly challenge closes tonight at 11:59 PM.",
      time: "1d",
      read: true,
    },
  ]);

  const markAsRead = (id) => {
    setMessages((prev) =>
      prev.map((msg) =>
        msg.id === id ? { ...msg, read: true } : msg
      )
    );
  };

  const markAllAsRead = () => {
    setMessages((prev) =>
      prev.map((msg) => ({ ...msg, read: true }))
    );
  };

  const unreadCount = messages.filter((m) => !m.read).length;

  return (
    <div className="min-h-screen bg-white flex justify-center p-4 mt-12">

      <div className="w-full max-w-2xl space-y-4">

        {/* HEADER */}
        <div className="bg-green-50 border border-green-200 rounded-2xl p-4 flex justify-between items-center">

          <div>
            <h1 className="text-lg font-bold text-green-800">
              Competition Notifications
            </h1>
            <p className="text-xs text-green-600">
              {unreadCount} unread update{unreadCount !== 1 && "s"}
            </p>
          </div>

          <button
            onClick={markAllAsRead}
            className="bg-green-600 text-white text-xs px-3 py-1 rounded-full"
          >
            Mark all read
          </button>

        </div>

        {/* LIST */}
        <div className="space-y-3">

          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex items-center gap-3 p-4 rounded-2xl border transition
                ${
                  msg.read
                    ? "bg-white border-green-100"
                    : "bg-green-50 border-green-300"
                }`}
            >

              {/* ICON */}
              <div className="h-10 w-10 rounded-xl bg-green-100 flex items-center justify-center">
                <CheckCircle className="h-5 w-5 text-green-600" />
              </div>

              {/* CONTENT */}
              <div className="flex-1">

                <p className="text-sm font-bold text-green-900">
                  {msg.source}
                </p>

                <p className="text-xs text-gray-700">
                  {msg.message}
                </p>

                <p className="text-[10px] text-gray-400">
                  {msg.time}
                </p>

              </div>

              {/* ACTION */}
              {!msg.read ? (
                <button
                  onClick={() => markAsRead(msg.id)}
                  className="text-xs bg-green-600 text-white px-3 py-1 rounded-full"
                >
                  Mark read
                </button>
              ) : (
                <span className="text-xs text-green-600 font-semibold">
                  Read
                </span>
              )}

            </div>
          ))}
        </div>
      </div>
    </div>
  );
}