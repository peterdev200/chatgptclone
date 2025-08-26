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
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [suggestionsSeen, setSuggestionsSeen] = useState(false);
  const [highlightedSuggestion, setHighlightedSuggestion] = useState<
    number | null
  >(null);
  const threadRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Example suggestions, you can replace with dynamic ones
  const suggestions = [
    "What is the latest news in AI?",
    "Summarize this article for me.",
    "How do I learn TypeScript?",
    "Suggest a good book on productivity.",
    "Explain quantum computing in simple terms.",
  ];

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

    // mark suggestions as seen (user interacted)
    setSuggestionsSeen(true);

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
    // If suggestions are visible, handle navigation
    if (
      isInputFocused &&
      !inputValue &&
      !suggestionsSeen &&
      suggestions.length > 0
    ) {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setHighlightedSuggestion((prev) => {
          if (prev === null) return 0;
          return prev < suggestions.length - 1 ? prev + 1 : 0;
        });
        return;
      }
      if (e.key === "ArrowUp") {
        e.preventDefault();
        setHighlightedSuggestion((prev) => {
          if (prev === null) return suggestions.length - 1;
          return prev > 0 ? prev - 1 : suggestions.length - 1;
        });
        return;
      }
      if (e.key === "Enter" && highlightedSuggestion !== null) {
        e.preventDefault();
        handleSuggestionClick(suggestions[highlightedSuggestion]);
        return;
      }
      if (e.key === "Escape") {
        setHighlightedSuggestion(null);
        setSuggestionsSeen(true);
        return;
      }
    }
    // Normal send
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(inputValue);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(e.target.value);
    autoResize(e.target);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInputValue(suggestion);
    if (inputRef.current) {
      inputRef.current.focus();
      autoResize(inputRef.current);
    }
    setSuggestionsSeen(true);
    setHighlightedSuggestion(null);
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
    <div className="flex flex-col h-screen">
      {/* Empty state */}
      {messages.length === 0 && (
        <section className="empty flex-1 flex  justify-center p-8 items-center">
          <div className="empty__inner text-center w-full">
            <h2 className="empty__title text-3xl font-bold mb-8 text-gray-800 dark:text-gray-200">
              What&apos;s on the agenda today?
            </h2>

            <div
              className="askbar max-w-3xl mx-auto flex items-center justify-center"
              role="search"
            >
              <div className="relative w-full ">
                <textarea
                  className="askbar__input w-full p-4 pr-20 border border-gray-300 dark:border-gray-600 rounded-4xl resize-none bg-whscrollbarite dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent scrollbar-hidden"
                  placeholder="Ask anything"
                  rows={1}
                  aria-label="Ask anything"
                  value={inputValue}
                  onChange={handleInputChange}
                  onKeyDown={handleKeyDown}
                  ref={inputRef}
                  onFocus={() => setIsInputFocused(true)}
                  onBlur={() => setIsInputFocused(false)}
                />

                {/* Suggestions dropdown */}
                {isInputFocused && !inputValue && !suggestionsSeen && (
                  <div className="absolute left-0 right-0 mt-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-10 text-left">
                    {suggestions.map((suggestion, idx) => (
                      <button
                        key={idx}
                        className={`w-full text-left px-4 py-2 transition-colors text-gray-800 dark:text-gray-100 ${
                          highlightedSuggestion === idx
                            ? "bg-blue-100 dark:bg-blue-900" // highlighted
                            : "hover:bg-gray-100 dark:hover:bg-gray-800"
                        }`}
                        onMouseDown={(e) => {
                          e.preventDefault();
                          handleSuggestionClick(suggestion);
                        }}
                        tabIndex={-1}
                        aria-selected={highlightedSuggestion === idx}
                      >
                        <span className="inline-flex items-center gap-2 w-full">
                          {/* Search icon */}
                          <svg
                            className="w-4 h-4 text-gray-400 flex-shrink-0"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                          >
                            <circle cx="11" cy="11" r="8" />
                            <line x1="21" y1="21" x2="16.65" y2="16.65" />
                          </svg>
                          <span className="flex-1 text-left">{suggestion}</span>
                          {/* Arrow icon */}
                          <svg
                            className="w-4 h-4 text-gray-400 flex-shrink-0"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                          >
                            <path
                              d="M9 18l6-6-6-6"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </span>
                      </button>
                    ))}
                  </div>
                )}

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
          className="thread flex-1 overflow-y-auto px-4 py-6 scrollbar-custom"
          aria-live="polite"
          ref={threadRef}
        >
          <div className="thread__inner space-y-6 pt-16">
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
                  className={`msg__bubble max-full p-4 rounded-lg break-words whitespace-pre-wrap ${
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
                className="input w-full p-4 pr-20 border border-gray-300 dark:border-gray-600 rounded-4xl resize-none bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent scrollbar-hidden"
                placeholder="Ask anything"
                rows={1}
                aria-label="Message input"
                value={inputValue}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                onFocus={() => setIsInputFocused(true)}
                onBlur={() => setIsInputFocused(false)}
              />

              {/* Suggestions dropdown */}
              {isInputFocused && !inputValue && !suggestionsSeen && (
                <div className="absolute left-0 right-0 mt-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-10 text-left">
                  {suggestions.map((suggestion, idx) => (
                    <button
                      key={idx}
                      className={`w-full text-left px-4 py-2 transition-colors text-gray-800 dark:text-gray-100 ${
                        highlightedSuggestion === idx
                          ? "bg-blue-100 dark:bg-blue-900"
                          : "hover:bg-gray-100 dark:hover:bg-gray-800"
                      }`}
                      onMouseDown={(e) => {
                        e.preventDefault();
                        handleSuggestionClick(suggestion);
                      }}
                      tabIndex={-1}
                      aria-selected={highlightedSuggestion === idx}
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              )}

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
