import {
  MessageCircle,
  Users,
  Hash,
  Search,
  Bell,
  Settings,
  Plus,
  MoreHorizontal,
  Send,
  Smile,
  Paperclip,
  Mic,
  Phone,
  Video,
  CheckCheck,
  Zap,
} from "lucide-react";

function Home() {
  const conversations = [
    {
      name: "Ahmed",
      message: "Hey, are you free today?",
      time: "10:32 AM",
      letter: "A",
      unread: 2,
      online: true,
    },
    {
      name: "Omar",
      message: "Let's finish the project tonight.",
      time: "09:45 AM",
      letter: "O",
      unread: 0,
      online: true,
    },
    {
      name: "Sara",
      message: "That sounds great!",
      time: "Yesterday",
      letter: "S",
      unread: 1,
      online: true,
    },
    {
      name: "Ali",
      message: "I'll send you the files.",
      time: "Yesterday",
      letter: "A",
      unread: 0,
      online: false,
    },
    {
      name: "Youssef",
      message: "Are you joining the room?",
      time: "Monday",
      letter: "Y",
      unread: 0,
      online: true,
    },
  ];

  return (
    <div className="min-h-screen bg-[#0b0f17] text-[#dfe2ee] font-[Inter]">
      <div className="flex min-h-screen">
        {/* ================= SIDEBAR ================= */}
        <aside className="hidden lg:flex w-[76px] shrink-0 bg-[#111827]/85 backdrop-blur-xl border-r border-white/[0.06] flex-col items-center py-5">
          {/* Logo */}
          <div className="relative w-11 h-11 rounded-xl bg-[#0066ff] flex items-center justify-center shadow-[0_0_22px_rgba(0,102,255,0.25)]">
            <MessageCircle size={21} strokeWidth={2.2} />

            <span className="absolute -right-1 -bottom-1 w-3 h-3 rounded-full bg-[#10b981] border-2 border-[#111827] shadow-[0_0_8px_#10b981]" />
          </div>

          {/* Navigation */}
          <nav className="flex flex-col items-center gap-3 mt-10">
            <button className="relative w-11 h-11 rounded-lg bg-[#0066ff]/15 text-[#7da7ff] flex items-center justify-center border border-[#0066ff]/20">
              <MessageCircle size={20} />

              <span className="absolute -right-[2px] top-2 w-1 h-7 rounded-full bg-[#0066ff] shadow-[0_0_10px_#0066ff]" />
            </button>

            <button className="w-11 h-11 rounded-lg text-[#8c90a1] hover:text-[#dfe2ee] hover:bg-white/[0.04] flex items-center justify-center transition">
              <Users size={20} />
            </button>

            <button className="w-11 h-11 rounded-lg text-[#8c90a1] hover:text-[#dfe2ee] hover:bg-white/[0.04] flex items-center justify-center transition">
              <Hash size={20} />
            </button>

            <button className="w-11 h-11 rounded-lg text-[#8c90a1] hover:text-[#dfe2ee] hover:bg-white/[0.04] flex items-center justify-center transition">
              <Plus size={20} />
            </button>
          </nav>

          {/* Bottom */}
          <div className="mt-auto flex flex-col items-center gap-4">
            <button className="w-11 h-11 rounded-lg text-[#8c90a1] hover:text-[#dfe2ee] hover:bg-white/[0.04] flex items-center justify-center transition">
              <Settings size={20} />
            </button>

            <div className="relative">
              <div className="w-10 h-10 rounded-full bg-[#262a33] border border-white/[0.08] flex items-center justify-center text-sm font-semibold text-[#b3c5ff]">
                M
              </div>

              <span className="absolute right-0 bottom-0 w-2.5 h-2.5 rounded-full bg-[#10b981] border-2 border-[#111827] shadow-[0_0_8px_#10b981]" />
            </div>
          </div>
        </aside>

        {/* ================= CHAT LIST ================= */}
        <aside className="hidden md:flex w-[300px] xl:w-[330px] shrink-0 bg-[#0f131c] border-r border-white/[0.06] flex-col">
          {/* Header */}
          <div className="h-[72px] px-5 flex items-center justify-between border-b border-white/[0.06]">
            <div>
              <h1 className="text-[18px] font-semibold tracking-[-0.01em] text-[#dfe2ee] font-[IBM_Plex_Sans]">
                Messages
              </h1>

              <p className="text-[12px] text-[#8c90a1] mt-0.5">
                12 conversations
              </p>
            </div>

            <button className="w-9 h-9 rounded-lg bg-[#0066ff] hover:bg-[#0054d6] flex items-center justify-center transition shadow-[0_0_15px_rgba(0,102,255,0.2)]">
              <Plus size={18} />
            </button>
          </div>

          {/* Search */}
          <div className="px-4 py-4">
            <div className="relative">
              <Search
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8c90a1]"
              />

              <input
                type="text"
                placeholder="Search conversations..."
                className="w-full h-10 pl-9 pr-3 rounded-lg bg-[#181c24] border border-white/[0.06] outline-none text-[13px] text-[#dfe2ee] placeholder:text-[#666b7c] focus:border-[#0066ff]/40 focus:bg-[#1c2028] transition"
              />
            </div>
          </div>

          {/* Filters */}
          <div className="px-4 pb-3 flex items-center gap-5">
            <button className="text-[12px] font-medium text-[#b3c5ff]">
              All
            </button>

            <button className="text-[12px] text-[#8c90a1] hover:text-[#dfe2ee]">
              Unread
            </button>

            <button className="text-[12px] text-[#8c90a1] hover:text-[#dfe2ee]">
              Groups
            </button>
          </div>

          {/* Conversations */}
          <div className="flex-1 overflow-y-auto px-2">
            {conversations.map((conversation, index) => (
              <button
                key={conversation.name}
                className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg text-left transition group ${
                  index === 0 ? "bg-[#1c2028]" : "hover:bg-[#181c24]"
                }`}
              >
                {/* Avatar */}
                <div className="relative shrink-0">
                  <div className="w-10 h-10 rounded-full bg-[#262a33] border border-white/[0.06] flex items-center justify-center text-sm font-semibold text-[#c2c6d8]">
                    {conversation.letter}
                  </div>

                  {conversation.online && (
                    <span className="absolute right-0 bottom-0 w-2.5 h-2.5 rounded-full bg-[#10b981] border-2 border-[#0f131c] shadow-[0_0_7px_#10b981]" />
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-[13px] font-medium text-[#dfe2ee] truncate">
                      {conversation.name}
                    </p>

                    <span className="text-[10px] text-[#666b7c] whitespace-nowrap">
                      {conversation.time}
                    </span>
                  </div>

                  <p className="text-[12px] text-[#8c90a1] truncate mt-1">
                    {conversation.message}
                  </p>
                </div>

                {/* Unread */}
                {conversation.unread > 0 && (
                  <span className="min-w-5 h-5 px-1.5 rounded-full bg-[#0066ff] text-white text-[10px] font-semibold flex items-center justify-center shadow-[0_0_10px_rgba(0,102,255,0.25)]">
                    {conversation.unread}
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* User footer */}
          <div className="p-3 border-t border-white/[0.06]">
            <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-[#181c24] transition cursor-pointer">
              <div className="relative">
                <div className="w-9 h-9 rounded-full bg-[#262a33] flex items-center justify-center text-sm font-semibold text-[#b3c5ff]">
                  M
                </div>

                <span className="absolute right-0 bottom-0 w-2 h-2 rounded-full bg-[#10b981] border border-[#0f131c]" />
              </div>

              <div className="flex-1 min-w-0">
                <p className="text-[13px] font-medium truncate">Mohamed</p>

                <p className="text-[11px] text-[#10b981]">Online</p>
              </div>

              <MoreHorizontal size={17} className="text-[#666b7c]" />
            </div>
          </div>
        </aside>

        {/* ================= MAIN CHAT ================= */}
        <main className="flex-1 min-w-0 flex flex-col bg-[#0b0f17]">
          {/* Top bar */}
          <header className="h-[72px] shrink-0 px-5 lg:px-7 border-b border-white/[0.06] bg-[#0f131c]/85 backdrop-blur-xl flex items-center justify-between">
            {/* User */}
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-[#262a33] flex items-center justify-center font-semibold text-[#b3c5ff]">
                  A
                </div>

                <span className="absolute right-0 bottom-0 w-2.5 h-2.5 rounded-full bg-[#10b981] border-2 border-[#0f131c] shadow-[0_0_7px_#10b981]" />
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-[14px] font-semibold text-[#dfe2ee]">
                    Ahmed
                  </h2>

                  <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-[#10b981]/10 text-[#10b981] border border-[#10b981]/15">
                    Online
                  </span>
                </div>

                <p className="text-[11px] text-[#8c90a1] mt-0.5">Active now</p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-1">
              <button className="w-9 h-9 rounded-lg text-[#8c90a1] hover:text-[#dfe2ee] hover:bg-[#181c24] flex items-center justify-center transition">
                <Phone size={18} />
              </button>

              <button className="w-9 h-9 rounded-lg text-[#8c90a1] hover:text-[#dfe2ee] hover:bg-[#181c24] flex items-center justify-center transition">
                <Video size={18} />
              </button>

              <button className="w-9 h-9 rounded-lg text-[#8c90a1] hover:text-[#dfe2ee] hover:bg-[#181c24] flex items-center justify-center transition">
                <Bell size={18} />
              </button>

              <div className="w-px h-5 bg-white/[0.08] mx-2" />

              <button className="w-9 h-9 rounded-lg text-[#8c90a1] hover:text-[#dfe2ee] hover:bg-[#181c24] flex items-center justify-center transition">
                <MoreHorizontal size={18} />
              </button>
            </div>
          </header>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-5 lg:px-10 py-6">
            <div className="max-w-4xl mx-auto">
              {/* Date */}
              <div className="flex items-center gap-4 mb-8">
                <div className="flex-1 h-px bg-white/[0.05]" />

                <span className="text-[10px] uppercase tracking-[0.08em] text-[#666b7c]">
                  Today
                </span>

                <div className="flex-1 h-px bg-white/[0.05]" />
              </div>

              {/* Incoming */}
              <div className="flex items-end gap-3 mb-5">
                <div className="w-8 h-8 shrink-0 rounded-full bg-[#262a33] flex items-center justify-center text-xs font-semibold text-[#c2c6d8]">
                  A
                </div>

                <div>
                  <p className="text-[11px] text-[#666b7c] mb-1 ml-1">Ahmed</p>

                  <div className="max-w-[420px] bg-[#1e293b]/75 backdrop-blur-md border border-white/[0.08] rounded-[20px] rounded-bl-[4px] px-4 py-3">
                    <p className="text-[14px] leading-5 text-[#f8fafc]">
                      Hey! Are you free today? I wanted to talk about the new
                      project.
                    </p>
                  </div>

                  <p className="text-[10px] text-[#666b7c] mt-1 ml-1">
                    10:28 AM
                  </p>
                </div>
              </div>

              {/* Outgoing */}
              <div className="flex justify-end mb-5">
                <div className="max-w-[420px]">
                  <div className="bg-[#0066ff] rounded-[20px] rounded-br-[4px] px-4 py-3 shadow-[0_4px_18px_rgba(0,102,255,0.16)]">
                    <p className="text-[14px] leading-5 text-white">
                      Yeah, I'm free. Let's discuss it now.
                    </p>
                  </div>

                  <div className="flex justify-end items-center gap-1 mt-1 mr-1">
                    <span className="text-[10px] text-[#666b7c]">10:29 AM</span>

                    <CheckCheck size={13} className="text-[#0066ff]" />
                  </div>
                </div>
              </div>

              {/* Incoming */}
              <div className="flex items-end gap-3 mb-5">
                <div className="w-8 h-8 shrink-0 rounded-full bg-[#262a33] flex items-center justify-center text-xs font-semibold text-[#c2c6d8]">
                  A
                </div>

                <div>
                  <div className="bg-[#1e293b]/75 backdrop-blur-md border border-white/[0.08] rounded-[20px] rounded-bl-[4px] px-4 py-3">
                    <p className="text-[14px] leading-5 text-[#f8fafc]">
                      Perfect. I pushed the latest changes to the repository.
                      Take a look when you can.
                    </p>
                  </div>

                  <p className="text-[10px] text-[#666b7c] mt-1 ml-1">
                    10:31 AM
                  </p>
                </div>
              </div>

              {/* Typing */}
              <div className="flex items-end gap-3">
                <div className="w-8 h-8 shrink-0 rounded-full bg-[#262a33] flex items-center justify-center text-xs font-semibold text-[#c2c6d8]">
                  A
                </div>

                <div className="bg-[#1e293b]/75 border border-white/[0.08] rounded-[18px] rounded-bl-[4px] px-4 py-3">
                  <div className="flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#94a3b8] animate-bounce" />

                    <span
                      className="w-1.5 h-1.5 rounded-full bg-[#94a3b8] animate-bounce"
                      style={{ animationDelay: "120ms" }}
                    />

                    <span
                      className="w-1.5 h-1.5 rounded-full bg-[#94a3b8] animate-bounce"
                      style={{ animationDelay: "240ms" }}
                    />
                  </div>
                </div>

                <span className="text-[10px] text-[#666b7c]">
                  Ahmed is typing...
                </span>
              </div>
            </div>
          </div>

          {/* ================= INPUT ================= */}
          <div className="px-5 lg:px-10 pb-5">
            <div className="max-w-4xl mx-auto">
              <div className="relative bg-[#0f172a]/80 backdrop-blur-xl border border-white/[0.08] rounded-2xl p-2 shadow-[0_8px_32px_rgba(0,0,0,0.35),0_0_20px_rgba(0,102,255,0.08)]">
                <div className="flex items-end gap-2">
                  <button className="w-10 h-10 shrink-0 rounded-xl text-[#8c90a1] hover:text-[#dfe2ee] hover:bg-white/[0.05] flex items-center justify-center transition">
                    <Paperclip size={19} />
                  </button>

                  <textarea
                    rows="1"
                    placeholder="Write a message..."
                    className="flex-1 resize-none bg-transparent outline-none text-[14px] text-[#dfe2ee] placeholder:text-[#666b7c] py-2.5"
                  />

                  <button className="w-10 h-10 shrink-0 rounded-xl text-[#8c90a1] hover:text-[#dfe2ee] hover:bg-white/[0.05] flex items-center justify-center transition">
                    <Smile size={19} />
                  </button>

                  <button className="w-10 h-10 shrink-0 rounded-xl text-[#8c90a1] hover:text-[#dfe2ee] hover:bg-white/[0.05] flex items-center justify-center transition">
                    <Mic size={19} />
                  </button>

                  <button className="w-10 h-10 shrink-0 rounded-xl bg-[#0066ff] hover:bg-[#0054d6] text-white flex items-center justify-center transition active:scale-95 shadow-[0_0_15px_rgba(0,102,255,0.25)]">
                    <Send size={17} />
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-center gap-1.5 mt-2">
                <Zap size={11} className="text-[#8c90a1]" />

                <span className="text-[10px] text-[#666b7c]">
                  Real-time messaging
                </span>
              </div>
            </div>
          </div>
        </main>

        {/* ================= RIGHT PANEL ================= */}
        <aside className="hidden xl:flex w-[280px] shrink-0 bg-[#0f131c] border-l border-white/[0.06] flex-col">
          {/* Header */}
          <div className="h-[72px] px-5 flex items-center border-b border-white/[0.06]">
            <div>
              <h2 className="text-[14px] font-semibold text-[#dfe2ee]">
                Conversation
              </h2>

              <p className="text-[11px] text-[#8c90a1] mt-0.5">
                Ahmed's profile
              </p>
            </div>
          </div>

          {/* Profile */}
          <div className="px-5 py-7 text-center border-b border-white/[0.06]">
            <div className="relative inline-flex">
              <div className="w-20 h-20 rounded-full bg-[#262a33] border border-white/[0.08] flex items-center justify-center text-2xl font-semibold text-[#b3c5ff]">
                A
              </div>

              <span className="absolute right-1 bottom-1 w-4 h-4 rounded-full bg-[#10b981] border-[3px] border-[#0f131c] shadow-[0_0_10px_#10b981]" />
            </div>

            <h3 className="text-[16px] font-semibold mt-4">Ahmed</h3>

            <p className="text-[11px] text-[#10b981] mt-1">Active now</p>

            <p className="text-[12px] text-[#8c90a1] mt-3">Software Engineer</p>
          </div>

          {/* Quick actions */}
          <div className="p-4 border-b border-white/[0.06]">
            <div className="grid grid-cols-3 gap-2">
              <button className="h-14 rounded-lg bg-[#181c24] hover:bg-[#262a33] border border-white/[0.05] flex flex-col items-center justify-center gap-1 transition">
                <Phone size={17} className="text-[#b3c5ff]" />
                <span className="text-[10px] text-[#8c90a1]">Call</span>
              </button>

              <button className="h-14 rounded-lg bg-[#181c24] hover:bg-[#262a33] border border-white/[0.05] flex flex-col items-center justify-center gap-1 transition">
                <Video size={17} className="text-[#d0bcff]" />
                <span className="text-[10px] text-[#8c90a1]">Video</span>
              </button>

              <button className="h-14 rounded-lg bg-[#181c24] hover:bg-[#262a33] border border-white/[0.05] flex flex-col items-center justify-center gap-1 transition">
                <Bell size={17} className="text-[#4edea3]" />
                <span className="text-[10px] text-[#8c90a1]">Mute</span>
              </button>
            </div>
          </div>

          {/* Shared */}
          <div className="p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-[12px] font-semibold text-[#c2c6d8]">
                Shared files
              </h3>

              <span className="text-[10px] text-[#666b7c]">12 files</span>
            </div>

            <div className="space-y-2">
              <div className="p-3 rounded-lg bg-[#181c24] border border-white/[0.05]">
                <p className="text-[11px] text-[#dfe2ee] truncate">
                  project-update.pdf
                </p>
                <p className="text-[10px] text-[#666b7c] mt-1">2.4 MB</p>
              </div>

              <div className="p-3 rounded-lg bg-[#181c24] border border-white/[0.05]">
                <p className="text-[11px] text-[#dfe2ee] truncate">
                  design-assets.zip
                </p>
                <p className="text-[10px] text-[#666b7c] mt-1">18.7 MB</p>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

export default Home;
