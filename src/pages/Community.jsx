import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import {
  MessageCircle,
  Send,
  Users,
  LogOut,
  Circle,
  ShieldCheck,
  ArrowLeft,
  Construction,
  Sparkles,
} from "lucide-react";

const SOCKET_URL = "https://challengehub-backend-o6ok.onrender.com";

const CommunityHub = () => {
  const socketRef = useRef(null);
  const messageWindowRef = useRef(null);

  const [username, setUsername] = useState("");
  const [usernameInput, setUsernameInput] = useState("");
  const [users, setUsers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [chatInput, setChatInput] = useState("");
  const [connected, setConnected] = useState(false);
  const [error, setError] = useState("");
  const [typingUsers, setTypingUsers] = useState([]);

  // =========================================================
  // SOCKET CONNECTION
  // =========================================================

  useEffect(() => {
    const socket = io(SOCKET_URL, {
      transports: ["websocket", "polling"],
      autoConnect: true,
      reconnection: true,
      reconnectionAttempts: Infinity,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
    });

    socketRef.current = socket;

    socket.on("connect", () => {
      console.log("Socket connected:", socket.id);

      setConnected(true);
      setError("");

      setUsername((currentUsername) => {
        if (currentUsername) {
          socket.emit("register-user", currentUsername);
        }

        return currentUsername;
      });
    });

    socket.on("disconnect", (reason) => {
      console.log("Socket disconnected:", reason);
      setConnected(false);
    });

    socket.on("connect_error", (err) => {
      console.error("Socket connection error:", err.message);

      setConnected(false);
      setError("Unable to connect to the community server.");
    });

    socket.on("registration-success", (data) => {
      if (!data?.username) return;

      setUsername(data.username);
      setUsernameInput(data.username);
      setError("");
    });

    socket.on("registration-error", (data) => {
      setError(
        data?.message || "Unable to register your username."
      );

      setUsername("");
    });

    socket.on("update-user-list", (activeUsers) => {
      if (!Array.isArray(activeUsers)) {
        setUsers([]);
        return;
      }

      setUsers(activeUsers);
    });

    socket.on("online-count", (data) => {
      console.log("Online count:", data?.count);
    });

    socket.on("chat-message", (data) => {
      if (!data) return;

      setMessages((prev) => [
        ...prev,
        {
          ...data,
          id: `${Date.now()}-${Math.random()}`,
        },
      ]);
    });

    socket.on("user-typing", (data) => {
      if (!data?.socketId || !data?.username) return;

      setTypingUsers((prev) => {
        if (
          prev.some(
            (user) => user.socketId === data.socketId
          )
        ) {
          return prev;
        }

        return [...prev, data];
      });
    });

    socket.on("user-stop-typing", (data) => {
      if (!data?.socketId) return;

      setTypingUsers((prev) =>
        prev.filter(
          (user) => user.socketId !== data.socketId
        )
      );
    });

    return () => {
      socket.removeAllListeners();
      socket.disconnect();
      socketRef.current = null;
    };
  }, []);

  // =========================================================
  // AUTO SCROLL
  // =========================================================

  useEffect(() => {
    const element = messageWindowRef.current;

    if (!element) return;

    element.scrollTop = element.scrollHeight;
  }, [messages]);

  // =========================================================
  // REGISTER
  // =========================================================

  const registerUser = () => {
    const name = usernameInput.trim();

    if (!name) {
      setError("Please enter a valid username.");
      return;
    }

    if (name.length > 30) {
      setError("Username must be 30 characters or less.");
      return;
    }

    const socket = socketRef.current;

    if (!socket?.connected) {
      setError(
        "The community server is still connecting. Please wait."
      );
      return;
    }

    setError("");

    socket.emit("register-user", name);
  };

  // =========================================================
  // SEND MESSAGE
  // =========================================================

  const sendChatMessage = () => {
    const message = chatInput.trim();

    if (!message) return;

    const socket = socketRef.current;

    if (!socket?.connected) {
      setError("You are disconnected from the server.");
      return;
    }

    if (!username) {
      setError("Please join the community first.");
      return;
    }

    socket.emit("send-message", message);

    setChatInput("");
    socket.emit("stop-typing");
  };

  // =========================================================
  // INPUT
  // =========================================================

  const handleChatInput = (event) => {
    const value = event.target.value;

    setChatInput(value);

    const socket = socketRef.current;

    if (!socket?.connected || !username) return;

    if (value.trim()) {
      socket.emit("typing");
    } else {
      socket.emit("stop-typing");
    }
  };

  const handleUsernameKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      registerUser();
    }
  };

  const handleChatKeyDown = (event) => {
    if (
      event.key === "Enter" &&
      !event.shiftKey
    ) {
      event.preventDefault();
      sendChatMessage();
    }
  };

  // =========================================================
  // LEAVE COMMUNITY
  // =========================================================

  const leaveCommunity = () => {
    const socket = socketRef.current;

    if (socket) {
      socket.disconnect();
    }

    setUsername("");
    setUsernameInput("");
    setMessages([]);
    setUsers([]);
    setTypingUsers([]);
    setChatInput("");
    setError("");

    setTimeout(() => {
      if (socketRef.current) {
        socketRef.current.connect();
      }
    }, 300);
  };

  // =========================================================
  // BACK TO DASHBOARD
  // =========================================================

  const goToDashboard = () => {
    leaveCommunity();

    // If your dashboard uses React Router,
    // replace this with:
    // navigate("/dashboard");

    window.location.href = "/dashboard";
  };

  const currentSocketId =
    socketRef.current?.id;

  // =========================================================
  // JOIN SCREEN
  // =========================================================

  if (!username) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-100 via-white to-emerald-50 flex items-center justify-center p-4 sm:p-6">

        <div className="w-full max-w-md">

          {/* Back */}

          <button
            onClick={goToDashboard}
            className="mb-5 flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-emerald-600 transition"
          >
            <ArrowLeft size={17} />
            Back to Dashboard
          </button>

          {/* Logo */}

          <div className="text-center mb-6">

            <div className="mx-auto w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-green-700 flex items-center justify-center shadow-lg shadow-emerald-200">
             <img src="./logo.jpg" alt="logo" style={{ borderRadius: "50%"}}/>
            </div>

            <h1 className="mt-5 text-3xl font-black text-slate-900">
              ChallengeHub Community
            </h1>

            <p className="mt-2 text-sm text-slate-500">
              A live community space for ChallengeHub users.
            </p>

          </div>

          {/* Development Notice */}

          <div className="mb-4 rounded-2xl border border-amber-200 bg-amber-50 p-4">

            <div className="flex gap-3">

              <div className="shrink-0 w-9 h-9 rounded-xl bg-amber-100 flex items-center justify-center">
                <Construction
                  size={18}
                  className="text-amber-600"
                />
              </div>

              <div>

                <p className="text-sm font-bold text-amber-800">
                  Community is currently in development
                </p>

                <p className="mt-1 text-xs leading-5 text-amber-700">
                  You're previewing an early version of the
                  ChallengeHub community experience while we
                  continue building it.
                </p>

              </div>

            </div>

          </div>

          {/* Card */}

          <div className="bg-white rounded-3xl border border-slate-200 shadow-xl shadow-slate-200/60 p-6 sm:p-7">

            <div className="flex items-center gap-3 mb-6">

              <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center">
                <Users
                  size={20}
                  className="text-emerald-600"
                />
              </div>

              <div>

                <h2 className="font-bold text-slate-800">
                  Join the community
                </h2>

                <p className="text-xs text-slate-500">
                  Choose a display name
                </p>

              </div>

            </div>

            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Username
            </label>

            <input
              type="text"
              value={usernameInput}
              onChange={(event) => {
                setUsernameInput(event.target.value);
                setError("");
              }}
              onKeyDown={handleUsernameKeyDown}
              placeholder="Enter your username..."
              maxLength={30}
              autoFocus
              className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 transition"
            />

            {error && (
              <p className="mt-2 text-sm text-red-500">
                {error}
              </p>
            )}

            <button
              onClick={registerUser}
              disabled={!connected}
              className="w-full mt-4 bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 disabled:from-slate-400 disabled:to-slate-500 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-emerald-200 transition flex items-center justify-center gap-2"
            >
              <MessageCircle size={19} />

              {connected
                ? "Enter Community"
                : "Connecting..."}
            </button>

            <div className="flex items-center justify-center gap-2 mt-5 text-xs text-slate-400">

              <span
                className={`w-2 h-2 rounded-full ${
                  connected
                    ? "bg-emerald-500 animate-pulse"
                    : "bg-yellow-400"
                }`}
              />

              {connected
                ? "Community server connected"
                : "Connecting to server..."}

            </div>

          </div>

          <div className="flex items-center justify-center gap-2 mt-5 text-xs text-slate-400">
            <ShieldCheck size={15} />
            Keep conversations respectful.
          </div>

        </div>

      </div>
    );
  }

  // =========================================================
  // COMMUNITY
  // =========================================================

  return (
    <div className="h-[100dvh] w-full bg-slate-950 flex flex-col overflow-hidden">

      {/* =====================================================
          TOP BAR
      ===================================================== */}

      <header className="shrink-0 h-16 bg-slate-900 border-b border-slate-800 px-3 sm:px-5 flex items-center justify-between">

        <div className="flex items-center gap-3 min-w-0">

          <button
            onClick={goToDashboard}
            className="shrink-0 w-9 h-9 rounded-xl bg-slate-800 hover:bg-emerald-500/10 text-slate-300 hover:text-emerald-400 flex items-center justify-center transition"
            title="Back to Dashboard"
          >
            <ArrowLeft size={18} />
          </button>

          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-green-700 flex items-center justify-center shadow-lg shrink-0">

            <MessageCircle
              size={19}
              className="text-white"
            />

          </div>

          <div className="min-w-0">

            <div className="flex items-center gap-2">

              <h1 className="font-bold text-white truncate">
                ChallengeHub Community
              </h1>

              <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-[10px] font-bold text-amber-400">
                <Construction size={10} />
                BUILDING
              </span>

            </div>

            <div className="flex items-center gap-1.5">

              <span
                className={`w-1.5 h-1.5 rounded-full ${
                  connected
                    ? "bg-emerald-500"
                    : "bg-red-500"
                }`}
              />

              <span className="text-[11px] text-slate-500">
                {connected
                  ? `${users.length} online`
                  : "Disconnected"}
              </span>

            </div>

          </div>

        </div>

        <div className="flex items-center gap-2">

          <div className="hidden md:flex items-center gap-1.5 text-xs text-slate-500">
            <Sparkles
              size={13}
              className="text-emerald-500"
            />
            Early Preview
          </div>

          <button
            onClick={leaveCommunity}
            title="Leave community"
            className="w-9 h-9 rounded-xl bg-slate-800 hover:bg-red-500/10 hover:text-red-400 text-slate-400 flex items-center justify-center transition"
          >
            <LogOut size={17} />
          </button>

        </div>

      </header>

      {/* =====================================================
          MOBILE DEVELOPMENT NOTICE
      ===================================================== */}

      <div className="md:hidden shrink-0 px-3 py-2 bg-amber-500/5 border-b border-amber-500/10">

        <div className="flex items-center gap-2">

          <Construction
            size={13}
            className="text-amber-400 shrink-0"
          />

          <p className="text-[10px] leading-4 text-amber-400">
            Community preview — this feature is still being built.
          </p>

        </div>

      </div>

      {/* =====================================================
          MAIN LAYOUT
      ===================================================== */}

      <div className="flex-1 min-h-0 flex">

        {/* ===================================================
            SIDEBAR
        =================================================== */}

        <aside className="hidden md:flex md:w-72 lg:w-80 shrink-0 bg-slate-900 border-r border-slate-800 flex-col">

          <div className="px-5 py-4 border-b border-slate-800 flex items-center justify-between">

            <div className="flex items-center gap-2">

              <span className="relative flex h-2.5 w-2.5">

                <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-70 animate-ping" />

                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />

              </span>

              <span className="text-sm font-bold text-white">
                Online Members
              </span>

            </div>

            <span className="px-2.5 py-1 rounded-full bg-slate-800 text-xs font-bold text-emerald-400">
              {users.length}
            </span>

          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-2">

            {users.length === 0 ? (

              <div className="text-center py-10 text-slate-600">

                <Users
                  size={28}
                  className="mx-auto mb-3"
                />

                <p className="text-sm">
                  No members online
                </p>

              </div>

            ) : (

              users.map((user) => {

                const isMe =
                  user.socketId === currentSocketId;

                return (
                  <div
                    key={user.socketId}
                    className={`flex items-center gap-3 p-3 rounded-xl transition ${
                      isMe
                        ? "bg-emerald-500/10 border border-emerald-500/20"
                        : "bg-slate-800/40 hover:bg-slate-800"
                    }`}
                  >

                    <div className="relative shrink-0">

                      <div className="w-9 h-9 rounded-full bg-gradient-to-br from-slate-600 to-slate-700 flex items-center justify-center text-sm font-bold text-white">

                        {String(
                          user.username || "?"
                        )
                          .charAt(0)
                          .toUpperCase()}

                      </div>

                      <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-500 border-2 border-slate-900" />

                    </div>

                    <div className="min-w-0 flex-1">

                      <p
                        className={`text-sm font-semibold truncate ${
                          isMe
                            ? "text-emerald-400"
                            : "text-slate-200"
                        }`}
                      >

                        {String(user.username || "Unknown")}

                        {isMe && (
                          <span className="ml-1.5 text-xs text-emerald-500">
                            (You)
                          </span>
                        )}

                      </p>

                      <p className="text-[11px] text-slate-500">
                        Online now
                      </p>

                    </div>

                  </div>
                );
              })

            )}

          </div>

          <div className="p-4 border-t border-slate-800">

            <div className="bg-slate-800/60 rounded-xl p-3">

              <div className="flex items-center gap-3">

                <div className="w-8 h-8 rounded-full bg-emerald-600 flex items-center justify-center text-xs font-bold text-white">

                  {username
                    .charAt(0)
                    .toUpperCase()}

                </div>

                <div className="min-w-0">

                  <p className="text-xs text-slate-500">
                    Signed in as
                  </p>

                  <p className="text-sm text-white font-semibold truncate">
                    {username}
                  </p>

                </div>

              </div>

            </div>

          </div>

        </aside>

        {/* ===================================================
            CHAT
        =================================================== */}

        <main className="flex-1 min-w-0 min-h-0 flex flex-col bg-slate-950">

          {/* Chat Header */}

          <div className="shrink-0 px-4 sm:px-6 py-3 border-b border-slate-800 bg-slate-950">

            <div className="flex items-center justify-between">

              <div>

                <h2 className="text-white font-bold text-sm sm:text-base">
                  General Chat
                </h2>

                <p className="text-[11px] text-slate-500 mt-0.5">
                  Live community conversation
                </p>

              </div>

              <div className="md:hidden flex items-center gap-1.5 text-xs text-slate-500">

                <Users size={14} />

                {users.length}

              </div>

            </div>

          </div>

          {/* Messages */}

          <div
            ref={messageWindowRef}
            className="flex-1 min-h-0 overflow-y-auto px-3 sm:px-5 md:px-7 py-4 sm:py-6 space-y-3 sm:space-y-4"
          >

            {messages.length === 0 ? (

              <div className="h-full flex items-center justify-center px-5">

                <div className="text-center max-w-sm">

                  <div className="w-14 h-14 sm:w-16 sm:h-16 mx-auto rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center">

                    <MessageCircle
                      size={26}
                      className="text-slate-600"
                    />

                  </div>

                  <h3 className="mt-5 text-white font-bold text-sm sm:text-base">
                    Welcome to the ChallengeHub Community
                  </h3>

                  <p className="mt-2 text-xs sm:text-sm text-slate-500 leading-6">
                    Say hello and start a conversation
                    with members currently online.
                  </p>

                  <div className="mt-5 inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-amber-500/5 border border-amber-500/10">

                    <Construction
                      size={13}
                      className="text-amber-400"
                    />

                    <span className="text-[10px] sm:text-xs text-amber-400">
                      Community features are still being built.
                    </span>

                  </div>

                </div>

              </div>

            ) : (

              messages.map((message) => {

                if (message.system) {

                  return (
                    <div
                      key={message.id}
                      className="flex justify-center"
                    >

                      <div className="max-w-[90%] bg-slate-900 border border-slate-800 text-slate-500 text-[10px] sm:text-xs px-3 sm:px-4 py-2 rounded-full text-center">
                        {String(
                          message.message || ""
                        )}
                      </div>

                    </div>
                  );
                }

                const isMe =
                  message.senderId ===
                  currentSocketId;

                return (
                  <div
                    key={message.id}
                    className={`flex ${
                      isMe
                        ? "justify-end"
                        : "justify-start"
                    }`}
                  >

                    <div
                      className={`max-w-[88%] sm:max-w-md ${
                        isMe
                          ? "bg-emerald-600 text-white rounded-2xl rounded-br-md"
                          : "bg-slate-900 text-slate-100 border border-slate-800 rounded-2xl rounded-bl-md"
                      } px-3.5 sm:px-4 py-2.5 sm:py-3 shadow-lg`}
                    >

                      <p
                        className={`text-[10px] sm:text-[11px] font-bold mb-1 ${
                          isMe
                            ? "text-emerald-200"
                            : "text-sky-400"
                        }`}
                      >

                        {isMe
                          ? "You"
                          : String(
                              message.senderName ||
                                "Anonymous"
                            )}

                      </p>

                      <p className="text-xs sm:text-sm leading-5 sm:leading-6 whitespace-pre-wrap break-words">
                        {String(
                          message.message || ""
                        )}
                      </p>

                    </div>

                  </div>
                );
              })

            )}

          </div>

          {/* Typing */}

          {typingUsers.length > 0 && (

            <div className="shrink-0 px-4 sm:px-6 pb-2">

              <p className="text-[11px] text-slate-500">

                {typingUsers
                  .map((user) =>
                    String(user.username)
                  )
                  .join(", ")}

                {" "}
                {typingUsers.length === 1
                  ? "is"
                  : "are"}{" "}
                typing...

              </p>

            </div>

          )}

          {/* Composer */}

          <div className="shrink-0 p-3 sm:p-4 md:p-5 bg-slate-900 border-t border-slate-800">

            <div className="max-w-4xl mx-auto">

              <div className="flex gap-2 sm:gap-3">

                <input
                  type="text"
                  value={chatInput}
                  onChange={handleChatInput}
                  onKeyDown={handleChatKeyDown}
                  placeholder={
                    connected
                      ? "Write a message..."
                      : "Disconnected..."
                  }
                  maxLength={1000}
                  disabled={!connected}
                  className="flex-1 min-w-0 bg-slate-800 border border-slate-700 text-white placeholder-slate-500 px-3 sm:px-4 py-3 rounded-xl outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition disabled:opacity-50 text-sm"
                />

                <button
                  onClick={sendChatMessage}
                  disabled={
                    !chatInput.trim() ||
                    !connected
                  }
                  className="shrink-0 w-12 sm:w-auto sm:px-5 md:px-6 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:bg-slate-800 disabled:text-slate-600 text-white font-bold transition flex items-center justify-center gap-2"
                >

                  <Send size={17} />

                  <span className="hidden sm:inline">
                    Send
                  </span>

                </button>

              </div>

              <p className="text-[10px] text-slate-600 mt-2 text-center">
                Enter to send
              </p>

            </div>

          </div>

        </main>

      </div>

    </div>
  );
};

export default CommunityHub;
