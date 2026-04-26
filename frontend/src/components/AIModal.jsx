import { useState } from 'react';
import { X, FileText, BrainCircuit, MessageSquare, Sparkles } from 'lucide-react';
import NotesComponent from './NotesComponent';
import QuizComponent from './QuizComponent';
import ChatComponent from './ChatComponent';

const AIModal = ({ isOpen, onClose, lectureId, lectureTitle }) => {
  const [activeTab, setActiveTab] = useState('notes');

  if (!isOpen) return null;

  const tabs = [
    { id: 'notes', label: 'AI Notes', icon: FileText },
    { id: 'quiz', label: 'Generate Quiz', icon: BrainCircuit },
    { id: 'doubt', label: 'Solve Doubt', icon: MessageSquare }
  ];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm">
      <div 
        className="glass-effect w-full max-w-4xl h-[85vh] rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-dark-border animate-in fade-in zoom-in duration-200"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-dark-border bg-dark-card/80">
          <div className="flex items-center gap-3">
            <div className="bg-primary/20 p-2 rounded-lg">
              <Sparkles className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">AI Assistant</h2>
              <p className="text-xs text-gray-400">Context: {lectureTitle}</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-white hover:bg-dark-border rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation */}
        <div className="flex border-b border-dark-border bg-dark-bg/50 px-4">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-6 py-4 font-medium text-sm transition-all relative ${
                activeTab === tab.id 
                  ? 'text-white' 
                  : 'text-gray-400 hover:text-gray-200 hover:bg-dark-card/50'
              }`}
            >
              <tab.icon className={`w-4 h-4 ${activeTab === tab.id ? 'text-primary' : ''}`} />
              {tab.label}
              {activeTab === tab.id && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary shadow-[0_0_8px_rgba(99,102,241,0.8)]" />
              )}
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="flex-grow overflow-hidden relative bg-dark-bg">
          {/* Subtle gradient background based on active tab */}
          <div className={`absolute inset-0 opacity-10 pointer-events-none transition-colors duration-500 ${
            activeTab === 'notes' ? 'bg-gradient-to-br from-primary to-transparent' :
            activeTab === 'quiz' ? 'bg-gradient-to-br from-accent to-transparent' :
            'bg-gradient-to-br from-blue-500 to-transparent'
          }`} />
          
          <div className="absolute inset-0 overflow-y-auto p-6 z-10">
            {activeTab === 'notes' && <NotesComponent lectureId={lectureId} />}
            {activeTab === 'quiz' && <QuizComponent lectureId={lectureId} />}
            {activeTab === 'doubt' && <ChatComponent lectureId={lectureId} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIModal;
