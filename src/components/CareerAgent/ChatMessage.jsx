import React from 'react';
import { motion } from 'motion/react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

const ChatMessage = ({ message, isUser, timestamp }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}
    >
      <div className={`flex items-start space-x-3 max-w-[80%] ${isUser ? 'flex-row-reverse space-x-reverse' : ''}`}>
        {/* Avatar */}
        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
          isUser 
            ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white' 
            : 'bg-gradient-to-r from-purple-500 to-cyan-500 text-white'
        }`}>
          {isUser ? 'U' : 'AI'}
        </div>

        {/* Message Content */}
        <div className={`rounded-2xl px-4 py-3 ${
          isUser 
            ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white' 
            : 'bg-gray-700/50 text-gray-100 border border-gray-600/30'
        }`}>
          {/* Message Text with Markdown Support */}
          <div className="prose prose-invert max-w-none">
            <ReactMarkdown
              components={{
                code({ node, inline, className, children, ...props }) {
                  const match = /language-(\w+)/.exec(className || '');
                  return !inline && match ? (
                    <SyntaxHighlighter
                      style={atomDark}
                      language={match[1]}
                      PreTag="div"
                      {...props}
                    >
                      {String(children).replace(/\n$/, '')}
                    </SyntaxHighlighter>
                  ) : (
                    <code className={className} {...props}>
                      {children}
                    </code>
                  );
                },
                // Render children directly to avoid coercing objects to strings
                h1: ({ children }) => <h1 className="text-xl font-bold text-white mb-2">{children}</h1>,
                h2: ({ children }) => <h2 className="text-lg font-semibold text-white mb-2">{children}</h2>,
                h3: ({ children }) => <h3 className="text-base font-semibold text-white mb-1">{children}</h3>,
                p: ({ children }) => <p className="text-sm leading-relaxed mb-2">{children}</p>,
                ul: ({ children }) => <ul className="list-disc list-inside space-y-1 mb-2">{children}</ul>,
                ol: ({ children }) => <ol className="list-decimal list-inside space-y-1 mb-2">{children}</ol>,
                li: ({ children }) => <li className="text-sm">{children}</li>,
                strong: ({ children }) => <strong className="font-semibold text-white">{children}</strong>,
                em: ({ children }) => <em className="italic">{children}</em>,
                blockquote: ({ children }) => (
                  <blockquote className="border-l-4 border-indigo-400 pl-4 italic text-gray-300">
                    {children}
                  </blockquote>
                ),
              }}
            >
              {message}
            </ReactMarkdown>
          </div>

          {/* Timestamp */}
          <div className={`text-xs text-gray-400 mt-2 ${isUser ? 'text-right' : 'text-left'}`}>
            {timestamp}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ChatMessage;
