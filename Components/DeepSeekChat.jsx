'use client';
import React, { useState, useRef, useEffect } from 'react';

export default function DeepSeekChat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      // Add placeholder for assistant message
      setMessages(prev => [...prev, { role: 'assistant', content: '' }]);

      const response = await fetch('/api/deepseek', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: [...messages, userMessage] })
      });

      if (!response.body) throw new Error('No response body');

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let done = false;
      let buffer = '';

      while (!done) {
        const { value, done: doneReading } = await reader.read();
        done = doneReading;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');
        buffer = lines.pop(); // keep incomplete line for next chunk

        for (const line of lines) {
          const trimmed = line.trim();
          if (!trimmed.startsWith('data:')) continue;

          const jsonStr = trimmed.replace('data: ', '');
          if (jsonStr === '[DONE]') {
            done = true;
            break;
          }

          try {
            const parsed = JSON.parse(jsonStr);
            const delta = parsed.choices?.[0]?.delta?.content;

            if (delta) {
              setMessages(prev => {
                const last = prev[prev.length - 1];
                const updated = { ...last, content: last.content + delta };
                return [...prev.slice(0, -1), updated];
              });
            }
          } catch (err) {
            console.error('Failed to parse stream chunk:', err);
          }
        }
      }
    } catch (error) {
      console.error('Error:', error);
      setMessages(prev => [...prev.slice(0, -1), {
        role: 'assistant',
        content: '⚠️ Failed to get response. Please try again.'
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div id='deepseek' className='flex flex-col md:flex-row gap-10 justify-around items-center p-8 min-h-[600px] bg-gradient-to-r from-indigo-50 via-white to-indigo-50'>

      {/* Left Panel: Text Info */}
      <div className="max-w-sm flex flex-col justify-center space-y-6 px-4">
        <h1 className="text-4xl font-extrabold text-gray-800">
          Welcome to Your Blog Assistant
        </h1>
        <p className="text-lg text-gray-600">
          Get quick help with your blog writing. Whether you want to summarize, brainstorm, or create content for:
        </p>
        <ul className="list-disc list-inside text-gray-600 space-y-2">
          <li><strong>Lifestyle</strong> – Tips and hacks to enrich daily living.</li>
          <li><strong>Technology</strong> – Latest trends and how-tos.</li>
          <li><strong>Startup</strong> – Ideas, growth hacks, and success stories.</li>
        </ul>

      </div>

      {/* Right Panel: Chat UI */}
      <div className="max-w-2xl w-full border rounded-lg shadow-lg bg-white">
        <div className="p-4 bg-gray-600 text-white rounded-t-lg">
          <h2 className="text-xl font-bold">Tech & Lifestyle Assistant</h2>
          <p className="text-sm opacity-80">Ask about blogging, tech trends, or digital lifestyle</p>
        </div>

        <div className="h-96 overflow-y-auto p-4 space-y-4">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-xs md:max-w-md rounded-xl p-4 ${
                  msg.role === 'user'
                    ? 'bg-indigo-100 text-gray-800 rounded-tr-none'
                    : 'bg-gray-100 text-gray-800 rounded-tl-none'
                }`}
              >
                {msg.content}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-gray-100 p-4 rounded-xl rounded-tl-none">
                <div className="flex space-x-2">
                  <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"></div>
                  <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <form onSubmit={handleSubmit} className="p-4 border-t flex">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about tech, blogging, or digital lifestyle..."
            className="flex-1 px-4 py-2 border rounded-l-lg focus:outline-none text-gray-600 focus:ring-2 focus:ring-indigo-500"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="bg-gray-700 hover:bg-gray-900 text-white px-6 py-2 rounded-r-lg  disabled:opacity-50 transition-colors"
          >
            {isLoading ? 'Sending...' : 'Send'}
          </button>
        </form>
      </div>
    </div>
  );
}
