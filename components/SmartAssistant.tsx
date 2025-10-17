import React, { useState, useRef, useEffect } from 'react';
import { getSmartAssistantResponse } from '../services/geminiService';
import { useCart } from '../context/CartContext';

interface SmartAssistantProps {
  isOpen: boolean;
  onToggle: () => void;
}

const AssistantIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" viewBox="0 0 20 20" fill="currentColor">
        <path d="M10 2a6 6 0 00-6 6v3.586l-1.707 1.707A1 1 0 003 15v1a1 1 0 001 1h12a1 1 0 001-1v-1a1 1 0 00-.293-.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
    </svg>
);

const SendIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
    </svg>
);


type ChatMessage = {
  role: 'user' | 'model';
  parts: { text: string }[];
};

const SmartAssistant: React.FC<SmartAssistantProps> = ({ isOpen, onToggle }) => {
  const { cartItems } = useCart();
  const [prompt, setPrompt] = useState('');
  const [history, setHistory] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [history]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim() || isLoading) return;

    const userMessage: ChatMessage = { role: 'user', parts: [{ text: prompt }] };
    setHistory(prev => [...prev, userMessage]);
    setPrompt('');
    setIsLoading(true);

    const responseText = await getSmartAssistantResponse(prompt, history, cartItems);
    
    const modelMessage: ChatMessage = { role: 'model', parts: [{ text: responseText }] };
    setHistory(prev => [...prev, modelMessage]);
    setIsLoading(false);
  };

  return (
    <>
      <button
        onClick={onToggle}
        className={`fixed bottom-6 right-6 h-16 w-16 bg-gradient-to-br from-purple-600 to-purple-700 rounded-full flex items-center justify-center shadow-lg text-white transform transition-all duration-300 ease-in-out hover:scale-110 ${isOpen ? 'rotate-90 scale-0' : 'rotate-0 scale-100'}`}
        aria-label="Toggle Smart Assistant"
      >
        <AssistantIcon />
      </button>
      
      <div className={`fixed bottom-6 right-6 w-[calc(100%-3rem)] max-w-sm h-[70vh] max-h-[500px] bg-white rounded-2xl shadow-2xl flex flex-col transition-all duration-300 ease-in-out origin-bottom-right ${isOpen ? 'scale-100 opacity-100' : 'scale-75 opacity-0 pointer-events-none'}`}>
        <div className="flex justify-between items-center p-4 border-b bg-gray-50 rounded-t-2xl">
          <h3 className="font-bold text-lg text-gray-800">Shopping Assistant</h3>
          <button onClick={onToggle} className="text-gray-400 hover:text-gray-700">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>
        <div className="flex-grow p-4 overflow-y-auto bg-gray-100">
          <div className="space-y-4">
             {history.map((msg, index) => (
                <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-xs md:max-w-sm rounded-2xl px-4 py-2 ${msg.role === 'user' ? 'bg-purple-600 text-white rounded-br-none' : 'bg-white text-gray-800 rounded-bl-none border'}`}>
                        <p className="text-sm" style={{ whiteSpace: 'pre-wrap' }}>{msg.parts[0].text}</p>
                    </div>
                </div>
            ))}
            {isLoading && (
                 <div className="flex justify-start">
                    <div className="max-w-xs md:max-w-sm rounded-2xl px-4 py-3 bg-white border">
                        <div className="flex items-center space-x-2">
                           <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                           <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                           <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce"></div>
                        </div>
                    </div>
                </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>
        <form onSubmit={handleSubmit} className="p-4 border-t bg-white rounded-b-2xl">
            <div className="relative">
                <input
                    type="text"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="Ask for recipes, products..."
                    className="w-full pl-4 pr-12 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500"
                    disabled={isLoading}
                />
                <button type="submit" className="absolute right-1 top-1/2 -translate-y-1/2 bg-purple-600 h-10 w-10 rounded-full flex items-center justify-center text-white hover:bg-purple-700 disabled:bg-gray-300 transition-colors" disabled={isLoading || !prompt.trim()}>
                    <SendIcon />
                </button>
            </div>
        </form>
      </div>
    </>
  );
};

export default SmartAssistant;
