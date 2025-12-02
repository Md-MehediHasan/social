
"use client";
import TopBar from "@/app/components/messaging/layout/Topbar";
import ChatWindow from "@/app/components/messaging/layout/ChatWindow";
import Sidebar from "@/app/components/messaging/layout/Sidebar";

export default function MessagesPage({ params }: { params: { id: string } }) {
  return (
    <div className="h-screen flex flex-col overflow-hidden">

      {/* FIXED TOPBAR */}
      <TopBar />

      {/* TWO-COLUMN LAYOUT UNDER TOPBAR */}
      <div className="flex flex-1  overflow-hidden">

        {/* LEFT SIDEBAR */}
        <div className="hidden md:flex ">
            <Sidebar />
        </div>
    
        {/* RIGHT CHAT WINDOW */}
          <div className="flex-1 overflow-hidden bg-gray-100">
          <ChatWindow noSelection />
        </div>
      
      </div>
    
    </div>
  );
}
