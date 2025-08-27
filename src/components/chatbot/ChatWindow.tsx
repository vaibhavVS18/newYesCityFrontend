import React, { useEffect, useRef } from "react";

export interface Message {
  sender: "user" | "bot";
  content: React.ReactNode;
}

interface Props {
  messages: Message[];
}

export default function ChatWindow({ messages }: Props) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div
  className="flex flex-col space-y-4 p-2 mt-[50px] border-5 border-red fixed w-full pb-40  
             h-full overflow-y-auto bg-transparent" 
>

  {messages.map((msg, index) => (
    <div
      key={index}
      className={`p-3 rounded-lg max-w-xl break-words ${
        msg.sender === "user"
          ? "bg-blue-200 self-end"
          : "bg-gray-200 self-start"
      }`}
    >
      {msg.content}
    </div>
  ))}
  <div ref={bottomRef} />
</div>

  );
}
