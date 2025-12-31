'use client';

import { useState, useRef, useEffect } from 'react';
import { CATEGORIES, Category } from '@/lib/constants';

interface Message {
      role: 'user' | 'assistant';
      content: string;
}

export default function Home() {
      const [messages, setMessages] = useState<Message[]>([]);
      const [input, setInput] = useState('');
      const [isLoading, setIsLoading] = useState(false);
      const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
      const messagesEndRef = useRef<HTMLDivElement>(null);

      const scrollToBottom = () => {
              messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
      };

      useEffect(() => {
              scrollToBottom();
      }, [messages]);

      const handleCategorySelect = (category: Category) => {
              setSelectedCategory(category);
              const welcomeMessage = category.title + "についてのご相談ですね。" + category.example + "\n\nどのようなことでお困りですか？具体的な状況をお聞かせください。";
              setMessages([{ role: 'assistant', content: welcomeMessage }]);
      };

      const handleSubmit = async (e: React.FormEvent) => {
              e.preventDefault();
              if (!input.trim() || isLoading) return;

              const userMessage = input.trim();
              setInput('');
              setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
              setIsLoading(true);

              try {
                        const response = await fetch('/api/chat', {
                                    method: 'POST',
                                    headers: { 'Content-Type': 'application/json' },
                                    body: JSON.stringify({
                                                  messages: [...messages, { role: 'user', content: userMessage }],
                                                  category: selectedCategory?.id,
                                    }),
                        });

                        if (!response.ok) throw new Error('Failed to send message');

                        const data = await response.json();
                        setMessages(prev => [...prev, { role: 'assistant', content: data.response }]);
              } catch (error) {
                        console.error('Error:', error);
                        setMessages(prev => [...prev, { role: 'assistant', content: '申し訳ございません。エラーが発生しました。再度お試しください。' }]);
              } finally {
                        setIsLoading(false);
              }
      };

      const handleReset = () => {
              setMessages([]);
              setSelectedCategory(null);
      };

      return (
              <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
                    <div className="container mx-auto max-w-4xl px-4 py-8">
                            <header className="text-center mb-8">
                                      <h1 className="text-3xl font-bold text-white mb-2">
                                                  MNP SNS運用ヘルプデスク
                                      </h1>h1>
                                      <p className="text-slate-400">XマーケAI - SNS集客支援アシスタント</p>p>
                            </header>header>
                    
                        {!selectedCategory ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {CATEGORIES.map((category) => (
                                              <button
                                                                  key={category.id}
                                                                  onClick={() => handleCategorySelect(category)}
                                                                  className={"p-6 rounded-xl text-left transition-all hover:scale-105 " + category.color + " text-white shadow-lg"}
                                                                >
                                                              <h3 className="text-lg font-semibold mb-2">{category.title}</h3>h3>
                                                              <p className="text-sm opacity-90">{category.description}</p>p>
                                              </button>button>
                                            ))}
                            </div>div>
                          ) : (
                            <div className="bg-slate-800/50 rounded-2xl shadow-xl border border-slate-700">
                                        <div className="flex items-center justify-between p-4 border-b border-slate-700">
                                                      <span className={"px-3 py-1 rounded-full text-sm " + selectedCategory.color + " text-white"}>
                                                          {selectedCategory.title}
                                                      </span>span>
                                                      <button
                                                                          onClick={handleReset}
                                                                          className="text-slate-400 hover:text-white transition-colors"
                                                                        >
                                                                      カテゴリを変更
                                                      </button>button>
                                        </div>div>
                            
                                        <div className="h-96 overflow-y-auto p-4 space-y-4">
                                            {messages.map((message, index) => (
                                                <div
                                                                      key={index}
                                                                      className={"flex " + (message.role === 'user' ? "justify-end" : "justify-start")}
                                                                    >
                                                                  <div
                                                                                          className={"max-w-[80%] rounded-2xl px-4 py-3 " + (message.role === 'user' ? "bg-blue-600 text-white" : "bg-slate-700 text-slate-100")}
                                                                                        >
                                                                                      <p className="whitespace-pre-wrap">{message.content}</p>p>
                                                                  </div>div>
                                                </div>div>
                                              ))}
                                            {isLoading && (
                                                <div className="flex justify-start">
                                                                  <div className="bg-slate-700 text-slate-100 rounded-2xl px-4 py-3">
                                                                                      <span className="animate-pulse">考え中...</span>span>
                                                                  </div>div>
                                                </div>div>
                                                      )}
                                                      <div ref={messagesEndRef} />
                                        </div>div>
                            
                                        <form onSubmit={handleSubmit} className="p-4 border-t border-slate-700">
                                                      <div className="flex gap-2">
                                                                      <input
                                                                                            type="text"
                                                                                            value={input}
                                                                                            onChange={(e) => setInput(e.target.value)}
                                                                                            placeholder="メッセージを入力..."
                                                                                            className="flex-1 bg-slate-700 text-white rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                                                            disabled={isLoading}
                                                                                          />
                                                                      <button
                                                                                            type="submit"
                                                                                            disabled={isLoading || !input.trim()}
                                                                                            className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                                                                          >
                                                                                        送信
                                                                      </button>button>
                                                      </div>div>
                                        </form>form>
                            </div>div>
                            )}
                    </div>div>
              </main>main>
            );
}</main>
