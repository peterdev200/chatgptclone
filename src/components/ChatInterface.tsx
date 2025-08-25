"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";

interface Message {
  id: string;
  role: "user" | "assistant";
  text: string;
  timestamp: Date;
}

export default function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const threadRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const autoResize = (element: HTMLTextAreaElement) => {
    element.style.height = "auto";
    element.style.height = Math.min(element.scrollHeight, 200) + "px";
  };

  const scrollToBottom = () => {
    if (threadRef.current) {
      threadRef.current.scrollTop = threadRef.current.scrollHeight + 2000;
    }
  };

  const createMessage = (role: "user" | "assistant", text: string): Message => {
    return {
      id: Date.now().toString(),
      role,
      text,
      timestamp: new Date(),
    };
  };

  const addMessage = (role: "user" | "assistant", text: string) => {
    const newMessage = createMessage(role, text);
    setMessages((prev) => [...prev, newMessage]);
  };

  const sendMessage = async (text: string) => {
    const trimmedText = text.trim();
    if (!trimmedText) return;

    // Add user message
    addMessage("user", trimmedText);
    setInputValue("");

    // Auto-resize input
    if (inputRef.current) {
      autoResize(inputRef.current);
    }

    // Simulate AI response
    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      addMessage(
        "assistant",
        `You said: "${trimmedText}". What would you like to do next?`
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(inputValue);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(e.target.value);
    autoResize(e.target);
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (inputRef.current) {
      autoResize(inputRef.current);
    }
  }, []);

  return (
    <div className="flex-1 flex flex-col">
      {/* Empty state */}
      {messages.length === 0 && (
        <section className="empty flex-1 flex  justify-center p-8 pt-20">
          <div className="empty__inner text-center w-full">
            <div className="title_roll mb-8 flex justify-center">
              <div className="our_logo_div flex justify-center items-center w-[20vh] rounded-md bg-white">
                <Image
                  src="/logofinal.PNG"
                  alt="Ditto GPT Logo"
                  width={100}
                  height={100}
                  className="lo_go px-6 py-2 w-full "
                />
              </div>
            </div>
            <h2 className="empty__title text-3xl font-bold mb-8 text-gray-800 dark:text-gray-200">
              What&apos;s on the agenda today?
            </h2>

            <div
              className="askbar max-w-4xl mx-auto flex items-center justify-center"
              role="search"
            >
              <div className="relative w-full ">
                <textarea
                  className="askbar__input w-full p-4 pr-20 border border-gray-300 dark:border-gray-600 rounded-full resize-none bg-whscrollbarite dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent scrollbar-hidden"
                  placeholder="Ask anything"
                  rows={1}
                  aria-label="Ask anything"
                  value={inputValue}
                  onChange={handleInputChange}
                  onKeyDown={handleKeyDown}
                  ref={inputRef}
                />

                <div className="askbar__tail absolute right-2 top-1/2 transform -translate-y-1/2 flex gap-2">
                  <button
                    className="askbar__btn p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    title="Voice"
                  >
                    <svg
                      className="w-5 h-5"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M12 1a3 3 0 0 1 3 3v6a3 3 0 1 1-6 0V4a3 3 0 0 1 3-3z"></path>
                      <path d="M19 10a7 7 0 0 1-14 0"></path>
                      <path d="M12 19v4"></path>
                    </svg>
                  </button>
                  <button
                    className="askbar__btn primary bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full transition-colors"
                    title="Send"
                    onClick={() => sendMessage(inputValue)}
                  >
                    <svg
                      className="w-5 h-5"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M22 2L11 13M22 2L15 22L11 13L2 9L22 2Z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Chat thread */}
      {messages.length > 0 && (
        <section
          className="thread flex-1 overflow-y-auto p-4"
          aria-live="polite"
          ref={threadRef}
        >
          <div className="thread__inner space-y-6">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`msg flex gap-4 ${
                  message.role === "assistant" ? "justify-start" : "justify-end"
                }`}
              >
                {message.role === "assistant" && (
                  <div className="msg__avatar w-8 h-8 bg-gray-300 dark:bg-gray-600 rounded-full flex items-center justify-center text-sm font-medium text-gray-700 dark:text-gray-300">
                    A
                  </div>
                )}

                <div
                  className={`msg__bubble max-w-3xl p-4 rounded-lg ${
                    message.role === "user"
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                  }`}
                >
                  {message.text}
                </div>

                {message.role === "user" && (
                  <div className="msg__avatar w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-sm font-medium text-white">
                    U
                  </div>
                )}
              </div>
            ))}

            {isLoading && (
              <div className="msg flex gap-4 justify-start">
                <div className="msg__avatar w-8 h-8 bg-gray-300 dark:bg-gray-600 rounded-full flex items-center justify-center text-sm font-medium text-gray-700 dark:text-gray-300">
                  A
                </div>
                <div className="msg__bubble bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div
                      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0.1s" }}
                    ></div>
                    <div
                      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0.2s" }}
                    ></div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Message composer */}
      {messages.length > 0 && (
        <footer className="composer border-t border-gray-200 dark:border-gray-700 p-4">
          <div className="composer__inner max-w-4xl mx-auto">
            <div className="relative">
              <textarea
                ref={inputRef}
                className="input w-full p-4 pr-20 border border-gray-300 dark:border-gray-600 rounded-full resize-none bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent scrollbar-hidden"
                placeholder="Ask anything"
                rows={1}
                aria-label="Message input"
                value={inputValue}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
              />

              <button
                className="send absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full transition-colors"
                onClick={() => sendMessage(inputValue)}
                aria-label="Send"
              >
                <svg
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M22 2L11 13M22 2L15 22L11 13L2 9L22 2Z" />
                </svg>
              </button>
            </div>

            <div className="hint text-sm text-gray-500 dark:text-gray-400 mt-2 text-center">
              Enter to send • Shift+Enter for newline
            </div>
          </div>
        </footer>
      )}
    </div>
  );
}
