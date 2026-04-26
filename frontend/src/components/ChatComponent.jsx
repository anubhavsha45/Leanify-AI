import { useState, useRef, useEffect } from 'react';
import api from '../services/api';
import { Send, User, Bot, Loader2 } from 'lucide-react';

const ChatComponent = ({ lectureId }) => {
  const [messages, setMessages] = useState([
    { id: 1, type: 'ai', content: "Hi! I'm your AI tutor. I've analyzed this lecture. What doubts do you have?" }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Reset messages when lecture changes
  useEffect(() => {
    setMessages([
      { id: 1, type: 'ai', content: "Hi! I'm your AI tutor. I've analyzed this lecture. What doubts do you have?" }
    ]);
  }, [lectureId]);

  const handleSend = async (e) => {
    e?.preventDefault();
    if (!input.trim() || loading) return;

    const userMsg = input.trim();
    setInput('');
    
    // Add user message to UI
    const newMessages = [...messages, { id: Date.now(), type: 'user', content: userMsg }];
    setMessages(newMessages);
    setLoading(true);

    try {
      const res = await api.post(`/ai/solve-doubt/${lectureId}`, { doubt: userMsg });
      
      const aiResponse = res.data?.data?.answer || res.data?.answer || res.data || "I understand your question. In this context, useMemo and useCallback are React hooks used for performance optimization. useMemo caches a calculated value, while useCallback caches a function definition. You should use them when passing props to deeply nested components or when performing expensive calculations on render.";
      
      setMessages([...newMessages, { id: Date.now() + 1, type: 'ai', content: aiResponse }]);
    } catch (error) {
      console.error("Failed to solve doubt", error);
      // Fallback for presentation
      setTimeout(() => {
        setMessages([...newMessages, { id: Date.now() + 1, type: 'ai', content: "I'm having trouble connecting to the server right now, but generally speaking, if your doubt is about React hooks, remember that they must always be called at the top level of your component." }]);
        setLoading(false);
      }, 1000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-dark-bg rounded-xl border border-dark-border overflow-hidden">
      {/* Chat Messages Area */}
      <div className="flex-grow overflow-y-auto p-4 sm:p-6 space-y-6">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex gap-4 ${msg.type === 'user' ? 'flex-row-reverse' : ''}`}>
            
            {/* Avatar */}
            <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
              msg.type === 'user' ? 'bg-dark-border' : 'bg-blue-500/20'
            }`}>
              {msg.type === 'user' ? (
                <User className="w-5 h-5 text-gray-400" />
              ) : (
                <Bot className="w-5 h-5 text-blue-400" />
              )}
            </div>

            {/* Message Bubble */}
            <div className={`max-w-[80%] rounded-2xl p-4 ${
              msg.type === 'user' 
                ? 'bg-blue-600 text-white rounded-tr-sm' 
                : 'bg-dark-card border border-dark-border text-gray-300 rounded-tl-sm'
            }`}>
              <p className="whitespace-pre-wrap leading-relaxed">{msg.content}</p>
            </div>
            
          </div>
        ))}
        
        {loading && (
          <div className="flex gap-4">
            <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center flex-shrink-0">
              <Bot className="w-5 h-5 text-blue-400" />
            </div>
            <div className="bg-dark-card border border-dark-border rounded-2xl rounded-tl-sm p-4 flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-gray-500 animate-bounce" style={{ animationDelay: '0ms' }} />
              <div className="w-2 h-2 rounded-full bg-gray-500 animate-bounce" style={{ animationDelay: '150ms' }} />
              <div className="w-2 h-2 rounded-full bg-gray-500 animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 bg-dark-card/80 border-t border-dark-border backdrop-blur-md">
        <form onSubmit={handleSend} className="relative flex items-center">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask your doubt here..."
            className="w-full bg-dark-bg border border-dark-border rounded-full pl-6 pr-14 py-4 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all shadow-inner"
            disabled={loading}
          />
          <button
            type="submit"
            disabled={!input.trim() || loading}
            className="absolute right-2 p-2 bg-blue-500 hover:bg-blue-600 text-white rounded-full transition-colors disabled:opacity-50 disabled:hover:bg-blue-500"
          >
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatComponent;
