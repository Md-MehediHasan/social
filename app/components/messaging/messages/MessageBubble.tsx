import Image from "next/image";
import { Message } from "@/app/messages/layout";

interface MessageBubbleProps {
  message: Message;
  sender: "me" | "other";
}


function SenderImage({message,isMe}: {message: Message, isMe: boolean}) {
  return(
     <Image
          src={message.sender.image || "/default-avatar.png"}
          alt={message.sender.name}
          width={40}
          height={40}
          className=  {`rounded-full ${isMe ? "ml-2 " : "mr-2"  }`}
        />
  )
}
function MsgText({ message, isMe }: { message: Message; isMe: boolean }) {
  return (
    <div
      className={`px-4 py-2 text-center max-w-xs rounded-2xl text-sm 
        whitespace-normal break-words
        ${isMe ? "bg-blue-600 text-white rounded-br-none" : "bg-gray-300 rounded-bl-none"}`}
    >
      {message.text}
    </div>
  );
}


export default function MessageBubble({ message, sender }: MessageBubbleProps) {
  const isMe = sender === "me";

  return (
    <div className={`flex items-end ${isMe ? "justify-end" : "justify-start"}`}>
       
      {!isMe &&(<>
       <SenderImage message={message} isMe={isMe}/>
       <MsgText message={message} isMe={isMe} />
      </>)}
{isMe &&(<>
  <MsgText message={message} isMe={isMe} />
   <SenderImage message={message} isMe={isMe}/>
</>)}
      
      

     
    </div>
  );
}
