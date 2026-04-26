import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  Sparkles, BookOpen, BrainCircuit, PlayCircle, ArrowRight, 
  CheckCircle, Star, Users, Zap, MessageSquare, 
  ChevronRight, Globe, Mail, User, Play, Award
} from 'lucide-react';

const Home = () => {
  const { token } = useAuth();

  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      {/* 1. Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32">
        {/* Dynamic Background Effects */}
        <div className="absolute top-0 right-0 -z-10 translate-x-1/3 -translate-y-1/4 w-[800px] h-[800px] bg-primary/20 rounded-full blur-[120px] opacity-60 mix-blend-screen"></div>
        <div className="absolute bottom-0 left-0 -z-10 -translate-x-1/3 translate-y-1/4 w-[600px] h-[600px] bg-accent/20 rounded-full blur-[100px] opacity-60 mix-blend-screen"></div>
        <div className="absolute top-1/2 left-1/2 -z-10 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[400px] bg-blue-500/10 rounded-[100%] blur-[120px] opacity-50 mix-blend-screen transform -rotate-12"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          
          {/* Floating Elements (Visible on lg screens) */}
          <div className="hidden lg:flex absolute top-10 -left-12 glass-effect p-4 rounded-2xl items-center gap-4 animate-[bounce_4s_infinite] shadow-xl z-10 border-primary/20">
            <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-green-400" />
            </div>
            <div>
              <p className="text-sm font-bold text-white">Smart Notes Ready</p>
              <p className="text-xs text-gray-400">Quantum Physics - Saved 2 hrs</p>
            </div>
          </div>

          <div className="hidden lg:flex absolute top-40 right-0 glass-effect p-4 rounded-2xl items-center gap-4 animate-[bounce_5s_infinite_0.5s] shadow-xl z-10 border-accent/20">
            <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center">
              <BrainCircuit className="w-6 h-6 text-accent" />
            </div>
            <div>
              <p className="text-sm font-bold text-white">Quiz Mastered</p>
              <p className="text-xs text-gray-400">Score: 95% • 150XP Earned</p>
            </div>
          </div>

          <div className="text-center max-w-4xl mx-auto relative z-20">
            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full glass-effect text-sm font-medium text-primary mb-8 border border-primary/30 shadow-[0_0_15px_rgba(99,102,241,0.2)]">
              <Sparkles className="w-4 h-4" />
              <span className="tracking-wide uppercase text-xs font-bold">Next-Gen AI Learning Platform</span>
            </div>
            
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tight mb-8 leading-[1.1]">
              Master Any Skill <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-blue-400">
                10x Faster
              </span>
            </h1>
            
            <p className="text-lg md:text-2xl text-gray-400 mb-12 max-w-3xl mx-auto leading-relaxed">
              Upload any course video and let our AI generate comprehensive notes, interactive flashcards, and adaptive quizzes. Stop pausing, start learning.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Link 
                to={token ? "/dashboard" : "/register"} 
                className="w-full sm:w-auto px-10 py-5 bg-gradient-to-r from-primary to-primary-hover hover:from-primary-hover hover:to-primary text-white rounded-full font-bold transition-all shadow-[0_0_30px_rgba(99,102,241,0.4)] hover:shadow-[0_0_40px_rgba(99,102,241,0.6)] transform hover:-translate-y-1 flex items-center justify-center gap-3 text-lg"
              >
                Start Learning For Free
                <ArrowRight className="w-6 h-6" />
              </Link>
              <a 
                href="#how-it-works" 
                className="w-full sm:w-auto px-10 py-5 glass-effect hover:bg-dark-border/50 text-white rounded-full font-bold transition-all flex items-center justify-center gap-3 text-lg group"
              >
                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-colors">
                  <Play className="w-4 h-4 text-white ml-1" />
                </div>
                See How It Works
              </a>
            </div>
            <p className="mt-6 text-sm text-gray-500 flex items-center justify-center gap-2">
              <CheckCircle className="w-4 h-4 text-primary" /> No credit card required. Cancel anytime.
            </p>
          </div>
        </div>
      </section>

      {/* 2. Stats Section */}
      <section className="border-y border-dark-border bg-dark-card/40 backdrop-blur-md relative z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-dark-border">
            <div className="px-4">
              <p className="text-4xl font-extrabold text-white mb-2">50K+</p>
              <p className="text-sm text-gray-400 font-medium uppercase tracking-wider">Active Learners</p>
            </div>
            <div className="px-4">
              <p className="text-4xl font-extrabold text-white mb-2">1M+</p>
              <p className="text-sm text-gray-400 font-medium uppercase tracking-wider">Notes Generated</p>
            </div>
            <div className="px-4">
              <p className="text-4xl font-extrabold text-white mb-2">98%</p>
              <p className="text-sm text-gray-400 font-medium uppercase tracking-wider">Knowledge Retention</p>
            </div>
            <div className="px-4">
              <div className="flex items-center justify-center gap-1 mb-2">
                <p className="text-4xl font-extrabold text-white">4.9</p>
                <Star className="w-6 h-6 text-yellow-400 fill-yellow-400 -mt-2" />
              </div>
              <p className="text-sm text-gray-400 font-medium uppercase tracking-wider">Average Rating</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Deep-Dive Features Section */}
      <section id="features" className="py-32 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-primary font-bold tracking-wide uppercase text-sm mb-3">Powerful Features</h2>
            <h3 className="text-4xl md:text-5xl font-bold mb-6">Everything you need to ace your exams</h3>
            <p className="text-xl text-gray-400">Our AI doesn't just summarize; it understands the context and builds a personalized curriculum for you.</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 mb-24">
            {[
              {
                icon: <BookOpen className="w-8 h-8 text-primary" />,
                title: "Smart Summaries",
                desc: "Turn 2-hour lectures into 5-minute reads. AI extracts the core concepts, definitions, and formulas automatically.",
                color: "primary"
              },
              {
                icon: <BrainCircuit className="w-8 h-8 text-accent" />,
                title: "Adaptive Quizzes",
                desc: "Test your knowledge with quizzes that adapt to your skill level. Identify weak points before the actual exam.",
                color: "accent"
              },
              {
                icon: <MessageSquare className="w-8 h-8 text-blue-500" />,
                title: "24/7 AI Tutor",
                desc: "Stuck on a tricky concept? Chat with our AI tutor trained on your specific video lecture for exact answers.",
                color: "blue-500"
              }
            ].map((feature, idx) => (
              <div key={idx} className={`p-10 rounded-3xl glass-effect hover:bg-dark-card/80 transition-all duration-300 hover:-translate-y-2 border-t-4 border-t-${feature.color}/50 group`}>
                <div className={`w-16 h-16 bg-${feature.color}/10 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform`}>
                  {feature.icon}
                </div>
                <h4 className="text-2xl font-bold mb-4">{feature.title}</h4>
                <p className="text-gray-400 leading-relaxed text-lg">{feature.desc}</p>
              </div>
            ))}
          </div>

          {/* Feature Highlight 1 */}
          <div className="flex flex-col lg:flex-row items-center gap-16 mb-32">
            <div className="lg:w-1/2">
              <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center mb-6">
                <Zap className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-3xl md:text-4xl font-bold mb-6 leading-tight">Focus on listening, not writing</h3>
              <p className="text-xl text-gray-400 mb-8 leading-relaxed">
                While you watch the lecture, our AI is working in the background. It transcribes, analyzes, and formats beautiful markdown notes complete with code snippets and key takeaways.
              </p>
              <ul className="space-y-4">
                {['Automatic transcriptions', 'Highlighting key concepts', 'Export to PDF/Markdown'].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-lg font-medium">
                    <CheckCircle className="w-6 h-6 text-primary" /> {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="lg:w-1/2 w-full relative">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 blur-[80px] -z-10 rounded-full"></div>
              <div className="glass-effect rounded-2xl p-2 border-dark-border shadow-2xl relative">
                {/* Mockup UI */}
                <div className="bg-dark-bg rounded-xl border border-dark-border overflow-hidden">
                  <div className="border-b border-dark-border bg-dark-card p-4 flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>
                  <div className="p-8">
                    <div className="h-6 w-3/4 bg-dark-border rounded mb-6"></div>
                    <div className="h-4 w-full bg-dark-border rounded mb-3"></div>
                    <div className="h-4 w-5/6 bg-dark-border rounded mb-3"></div>
                    <div className="h-4 w-4/6 bg-dark-border rounded mb-6"></div>
                    <div className="p-4 bg-primary/10 border border-primary/20 rounded-lg">
                      <div className="h-4 w-1/3 bg-primary/40 rounded mb-2"></div>
                      <div className="h-4 w-1/2 bg-primary/30 rounded"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. How It Works Section */}
      <section id="how-it-works" className="py-32 bg-dark-card/30 border-y border-dark-border relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-primary font-bold tracking-wide uppercase text-sm mb-3">Workflow</h2>
            <h3 className="text-4xl md:text-5xl font-bold">3 Steps to Mastery</h3>
          </div>

          <div className="grid md:grid-cols-3 gap-12 relative">
            {/* Connecting line for desktop */}
            <div className="hidden md:block absolute top-12 left-[15%] right-[15%] h-0.5 bg-gradient-to-r from-primary/0 via-primary/50 to-accent/0 -z-10"></div>

            {[
              { step: "01", title: "Add Your Course", desc: "Paste a YouTube link or upload your video lecture directly into the platform.", icon: <PlayCircle className="w-8 h-8" /> },
              { step: "02", title: "AI Magic Happens", desc: "Our engine analyzes the content, creating structured notes and flashcards instantly.", icon: <Sparkles className="w-8 h-8" /> },
              { step: "03", title: "Review & Test", desc: "Read the summaries, chat with the AI tutor, and take quizzes to solidify your knowledge.", icon: <Award className="w-8 h-8" /> }
            ].map((item, idx) => (
              <div key={idx} className="relative text-center">
                <div className="w-24 h-24 mx-auto bg-dark-bg border-2 border-dark-border rounded-full flex items-center justify-center mb-8 relative group cursor-pointer hover:border-primary transition-colors z-10 shadow-xl">
                  <div className="absolute inset-0 bg-primary/10 rounded-full scale-0 group-hover:scale-100 transition-transform duration-300"></div>
                  <span className="text-gray-400 group-hover:text-primary transition-colors">{item.icon}</span>
                  <div className="absolute -top-3 -right-3 w-8 h-8 bg-primary text-white font-bold rounded-full flex items-center justify-center text-sm shadow-lg">
                    {item.step}
                  </div>
                </div>
                <h4 className="text-2xl font-bold mb-4">{item.title}</h4>
                <p className="text-gray-400 text-lg leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Testimonials */}
      <section className="py-32 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-primary font-bold tracking-wide uppercase text-sm mb-3">Wall of Love</h2>
            <h3 className="text-4xl md:text-5xl font-bold">Loved by ambitious learners</h3>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { quote: "This platform saved my finals. The AI notes are scarily accurate and the quizzes showed me exactly what I was missing.", author: "Sarah Jenkins", role: "Computer Science Student" },
              { quote: "I use this for my corporate training videos. Instead of watching 2 hours of HR material, I read the 5-min summary. Brilliant.", author: "David Chen", role: "Product Manager" },
              { quote: "The AI Tutor feels like having a professor on standby 24/7. It explains complex calculus problems in simple terms.", author: "Elena Rodriguez", role: "Engineering Major" }
            ].map((testi, idx) => (
              <div key={idx} className="glass-effect p-8 rounded-3xl relative">
                <div className="flex gap-1 mb-6">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />)}
                </div>
                <p className="text-lg text-gray-300 mb-8 leading-relaxed italic">"{testi.quote}"</p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-primary to-accent flex items-center justify-center text-white font-bold text-xl">
                    {testi.author.charAt(0)}
                  </div>
                  <div>
                    <p className="font-bold">{testi.author}</p>
                    <p className="text-sm text-gray-400">{testi.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. CTA Banner */}
      <section className="py-24 relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="glass-effect rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden border-primary/30">
            {/* Inner Glow */}
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20"></div>
            
            <div className="relative z-10">
              <h2 className="text-4xl md:text-6xl font-extrabold mb-6">Ready to transform the way you learn?</h2>
              <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">Join over 50,000 learners who are mastering new skills in half the time.</p>
              <Link 
                to={token ? "/dashboard" : "/register"} 
                className="inline-flex items-center justify-center px-10 py-5 bg-white text-dark-bg hover:bg-gray-100 rounded-full font-bold transition-all shadow-[0_0_30px_rgba(255,255,255,0.3)] transform hover:-translate-y-1 gap-3 text-xl"
              >
                Get Started For Free
                <ChevronRight className="w-6 h-6" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Footer */}
      <footer className="bg-dark-bg border-t border-dark-border pt-20 pb-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-12 mb-16">
            <div className="col-span-2 lg:col-span-2">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                  <BookOpen className="text-white w-5 h-5" />
                </div>
                <span className="text-xl font-bold tracking-tight">Leanify<span className="text-primary">AI</span></span>
              </div>
              <p className="text-gray-400 mb-6 max-w-sm">The intelligent learning companion that helps you master any subject faster through AI-powered summaries, quizzes, and tutoring.</p>
              <div className="flex gap-4">
                <a href="#" className="w-10 h-10 rounded-full glass-effect flex items-center justify-center text-gray-400 hover:text-white hover:border-primary transition-all"><Mail className="w-5 h-5" /></a>
                <a href="#" className="w-10 h-10 rounded-full glass-effect flex items-center justify-center text-gray-400 hover:text-white hover:border-primary transition-all"><Globe className="w-5 h-5" /></a>
                <a href="#" className="w-10 h-10 rounded-full glass-effect flex items-center justify-center text-gray-400 hover:text-white hover:border-primary transition-all"><User className="w-5 h-5" /></a>
              </div>
            </div>
            
            <div>
              <h4 className="font-bold mb-6 uppercase text-sm tracking-wider">Product</h4>
              <ul className="space-y-4">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Features</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Use Cases</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Integrations</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-6 uppercase text-sm tracking-wider">Resources</h4>
              <ul className="space-y-4">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Community</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Contact Support</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-6 uppercase text-sm tracking-wider">Legal</h4>
              <ul className="space-y-4">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Terms of Service</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Cookie Policy</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-dark-border pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-gray-500 text-sm">
            <p>© {new Date().getFullYear()} LeanifyAI Inc. All rights reserved.</p>
            <div className="flex gap-6">
              <span>Made with ❤️ for learners</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
