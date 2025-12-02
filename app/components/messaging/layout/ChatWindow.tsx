import { useEffect, useRef, useContext } from "react";
import { notifyUser, requestNotificationPermission } from "../../../lib/notify";
import { MessageContext, Message } from "@/app/messages/layout";
import { useSession } from "next-auth/react";
import ChatTopbar from "./ChatTopbar";
import Chat from "../messages/MessageInput";
import MessageBubble from "../messages/MessageBubble";

interface ChatWindowProps {
  noSelection?: boolean;
  roomId?: string;
}


export default function ChatWindow({ noSelection }: ChatWindowProps) {
  const ctx = useContext(MessageContext);

  if (!ctx) return null;

  const { scrollRef, messages,roomInfo } = ctx;
  const bottomRef = useRef<HTMLDivElement | null>(null);
  const { data: session } = useSession();

  useEffect(() => {
    requestNotificationPermission();
  }, []);


  useEffect(() => {
    // auto scroll
    if (scrollRef.current)
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;

    if (bottomRef.current)
      bottomRef.current.scrollIntoView({ behavior: "auto" });

    const lastMessage = messages[messages.length - 1];
    if (!lastMessage) return;

    if (
      lastMessage.sender.id !== session?.user?.id &&
      document.visibilityState === "hidden"
    ) {
      notifyUser("New Message Arrive", lastMessage.text, "/notification.wav");
    }
  }, [messages, scrollRef, session]);

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <ChatTopbar />

      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-2 mb-16">
        {!noSelection &&
          messages.map((msg) => (
            <MessageBubble
           
              message={msg}
              sender={msg.sender?.id === session?.user?.id ? "me" : "other"}
            />
          ))}

        <div ref={bottomRef} />
      </div>

      <Chat />
    </div>
  );
}
