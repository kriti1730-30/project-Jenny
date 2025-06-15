import React, { useState, useEffect, useRef } from 'react';
import { Play, Code, Zap, Users, Download, ArrowRight, Check, Star, Github, Twitter, Menu, X, ChevronDown, Sparkles, Globe, Shield, RotateCcw, Clock, History, Rewind, FastForward, Pause } from 'lucide-react';

const CodeEditor = ({ code, onChange, language = 'jenny' }) => {
  const [highlightedCode, setHighlightedCode] = useState('');
  const [isExecuting, setIsExecuting] = useState(false);

  useEffect(() => {
    // Enhanced syntax highlighting for Jenny with time travel keywords
    const highlighted = code
      .replace(/\b(jenny|when|then|else|loop|break|continue|function|return|var|const|let|revert|undo|checkpoint|timeline|travel_to|save_state|restore_state)\b/g, '<span style="color: #A855F7;">$1</span>')
      .replace(/\b(\d+)\b/g, '<span style="color: #F59E0B;">$1</span>')
      .replace(/"([^"]*)"/g, '<span style="color: #10B981;">"$1"</span>')
      .replace(/\/\/.*$/gm, '<span style="color: #6B7280;">$&</span>')
      .replace(/\b(true|false|null|undefined|past|present|future)\b/g, '<span style="color: #EF4444;">$1</span>')
      .replace(/\b(time_travel|@checkpoint|@revert|@undo)\b/g, '<span style="color: #06B6D4;">$1</span>');
    
    setHighlightedCode(highlighted);
  }, [code]);

  const executeCode = () => {
    setIsExecuting(true);
    setTimeout(() => setIsExecuting(false), 2000);
  };

  return (
    <div className="relative group">
      <div className="bg-gray-950 rounded-3xl border border-gray-800/50 overflow-hidden shadow-2xl backdrop-blur-sm">
        <div className="flex items-center justify-between px-8 py-5 bg-gradient-to-r from-gray-900/80 to-gray-800/80 border-b border-gray-700/50">
          <div className="flex items-center space-x-4">
            <div className="flex space-x-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            </div>
            <span className="text-sm text-gray-400 font-medium">main.jenny</span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2 text-xs text-gray-500">
              <Clock className="w-4 h-4" />
              <span>Timeline: Active</span>
            </div>
            <button 
              onClick={executeCode}
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-all duration-300 font-medium text-sm shadow-lg hover:shadow-xl"
              disabled={isExecuting}
            >
              {isExecuting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>Executing...</span>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4" />
                  <span>Run Jenny</span>
                </>
              )}
            </button>
          </div>
        </div>
        <div className="relative">
          <textarea
            value={code}
            onChange={(e) => onChange(e.target.value)}
            className="w-full h-96 p-8 bg-transparent text-transparent caret-purple-400 outline-none font-mono text-sm relative z-10 overflow-auto leading-relaxed resize-none"
            spellCheck={false}
            placeholder="// Start coding with Jenny..."
          />
          <div 
            className="absolute top-0 left-0 w-full h-full p-8 pointer-events-none font-mono text-sm text-white whitespace-pre-wrap overflow-hidden leading-relaxed"
            dangerouslySetInnerHTML={{ __html: highlightedCode }}
          />
        </div>
      </div>
      
      {/* Time Travel Controls */}
      <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 bg-gray-900/90 backdrop-blur-sm border border-gray-700/50 rounded-2xl px-6 py-3 flex items-center space-x-4 opacity-0 group-hover:opacity-100 transition-all duration-300">
        <button className="text-gray-400 hover:text-purple-400 transition-colors p-1">
          <Rewind className="w-4 h-4" />
        </button>
        <button className="text-gray-400 hover:text-purple-400 transition-colors p-1">
          <RotateCcw className="w-4 h-4" />
        </button>
        <div className="w-px h-4 bg-gray-700"></div>
        <span className="text-xs text-gray-500 font-medium">Time Travel Controls</span>
        <div className="w-px h-4 bg-gray-700"></div>
        <button className="text-gray-400 hover:text-purple-400 transition-colors p-1">
          <FastForward className="w-4 h-4" />
        </button>
        <button className="text-gray-400 hover:text-purple-400 transition-colors p-1">
          <History className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

const FeatureCard = ({ icon: Icon, title, description, delay = 0, gradient = "from-purple-500 to-pink-500" }) => (
  <div 
    className="group bg-white/[0.02] backdrop-blur-sm border border-white/10 rounded-3xl p-8 hover:bg-white/[0.05] transition-all duration-700 hover:scale-[1.02] hover:border-white/20 hover:shadow-2xl hover:shadow-purple-500/10"
    style={{ animationDelay: `${delay}ms` }}
  >
    <div className={`bg-gradient-to-br ${gradient} w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500 shadow-lg`}>
      <Icon className="w-8 h-8 text-white" />
    </div>
    <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-purple-200 transition-colors">{title}</h3>
    <p className="text-gray-300 leading-relaxed group-hover:text-gray-200 transition-colors">{description}</p>
  </div>
);

const StatCard = ({ number, label, suffix = "", icon: Icon }) => (
  <div className="text-center group cursor-pointer">
    <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 backdrop-blur-sm border border-purple-500/20 rounded-2xl p-6 mb-4 group-hover:border-purple-400/40 transition-all duration-300 group-hover:scale-105">
      <Icon className="w-8 h-8 text-purple-400 mx-auto mb-3" />
      <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform duration-300">
        {number}{suffix}
      </div>
    </div>
    <div className="text-gray-400 text-lg font-medium group-hover:text-gray-300 transition-colors">{label}</div>
  </div>
);

const TimelineVisualization = () => {
  const [activeStep, setActiveStep] = useState(0);
  const steps = [
    { time: "T-0", action: "Initial State", color: "bg-green-500" },
    { time: "T-1", action: "Function Call", color: "bg-blue-500" },
    { time: "T-2", action: "State Change", color: "bg-purple-500" },
    { time: "T-3", action: "Error Detected", color: "bg-red-500" },
    { time: "T-1", action: "Revert to T-1", color: "bg-yellow-500" },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-gray-950/50 backdrop-blur-sm border border-gray-800/50 rounded-2xl p-6">
      <h4 className="text-white font-bold mb-4 flex items-center">
        <History className="w-5 h-5 text-purple-400 mr-2" />
        Live Timeline Visualization
      </h4>
      <div className="space-y-3">
        {steps.map((step, index) => (
          <div 
            key={index}
            className={`flex items-center space-x-4 p-3 rounded-xl transition-all duration-500 ${
              index === activeStep ? 'bg-purple-500/20 border border-purple-500/30' : 'bg-gray-800/30'
            }`}
          >
            <div className={`w-3 h-3 rounded-full ${step.color} ${index === activeStep ? 'animate-pulse' : ''}`}></div>
            <span className="text-gray-400 font-mono text-sm">{step.time}</span>
            <span className={`text-sm font-medium ${index === activeStep ? 'text-white' : 'text-gray-500'}`}>
              {step.action}
            </span>
            {index === activeStep && (
              <div className="ml-auto">
                <div className="w-2 h-2 bg-purple-400 rounded-full animate-ping"></div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [code, setCode] = useState(`// Welcome to Jenny - Time Travel Programming Language
jenny timeTravel_demo() {
  var userData = { name: "Alice", score: 100 }
  
  // Create a checkpoint before risky operations
  @checkpoint "before_update"
  
  // Simulate some operations
  userData.score += 50
  userData.level = "advanced"
  
  // Oops! Something went wrong
  when userData.score > 120 then {
    // Time travel back to our checkpoint
    @revert "before_update"
    
    // Try a different approach
    userData.score += 20
    userData.bonus = true
  }
  
  // Advanced time travel - go to specific timeline
  timeline.save_state("success_state")
  
  // If we need to undo the last 3 operations
  @undo 3
  
  // Or travel to a specific point in time
  travel_to("success_state")
  
  return userData
}

// Event-driven time travel
when error.detected() then {
  revert.to_last_stable_state()
  notify("Reverted to stable state automatically!")
}`);

  const [output, setOutput] = useState(`🕰️  Jenny Time Travel Engine Initialized
✨ Checkpoint "before_update" created at T-0
🔄 State change detected: score = 150
⚠️  Condition triggered: score > 120
🚀 Time travel initiated: reverting to T-0
✅ Successfully reverted to checkpoint
🎯 Alternative path executed: score = 120
💾 Timeline saved as "success_state"
⏱️  Execution completed in 0.002s
🔮 Time travel operations: 2 successful`);

  const features = [
    {
      icon: RotateCcw,
      title: "Time Travel Debugging",
      description: "Step backwards through your code execution, undo operations, and fix bugs by traveling to any point in your program's timeline.",
      gradient: "from-purple-500 to-pink-500"
    },
    {
      icon: History,
      title: "Checkpoint System",
      description: "Create named checkpoints in your code and instantly revert to them when things go wrong. Perfect for experimental programming.",
      gradient: "from-blue-500 to-purple-500"
    },
    {
      icon: Clock,
      title: "Timeline Visualization",
      description: "See your program's execution as a visual timeline. Understand complex state changes and debug with unprecedented clarity.",
      gradient: "from-green-500 to-blue-500"
    },
    {
      icon: Zap,
      title: "Instant State Recovery",
      description: "Automatically detect errors and revert to the last stable state. Your programs become self-healing and more resilient.",
      gradient: "from-orange-500 to-red-500"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-purple-950/50 to-gray-950 relative overflow-x-hidden">
      {/* Enhanced Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-purple-900/30 via-transparent to-transparent"></div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-pink-900/20 via-transparent to-transparent"></div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/10 via-transparent to-transparent"></div>
      
      {/* Animated Background Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-purple-400/30 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`
            }}
          />
        ))}
      </div>
      
      {/* Navigation */}
      <nav className="relative z-50 px-6 py-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 via-pink-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg shadow-purple-500/25">
              <Clock className="w-7 h-7 text-white" />
            </div>
            <div>
              <span className="text-3xl font-bold text-white">Jenny</span>
              <div className="text-xs text-purple-300 font-medium">Time Travel Programming</div>
            </div>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-gray-300 hover:text-white transition-colors font-medium hover:scale-105 transform duration-200">Features</a>
            <a href="#playground" className="text-gray-300 hover:text-white transition-colors font-medium hover:scale-105 transform duration-200">Playground</a>
            <a href="#docs" className="text-gray-300 hover:text-white transition-colors font-medium hover:scale-105 transform duration-200">Documentation</a>
            <a href="#community" className="text-gray-300 hover:text-white transition-colors font-medium hover:scale-105 transform duration-200">Community</a>
            <button className="bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 text-white px-8 py-3 rounded-2xl hover:shadow-lg hover:shadow-purple-500/25 hover:scale-105 transition-all duration-300 font-semibold">
              Get Started
            </button>
          </div>

          <button 
            className="md:hidden text-white p-3 rounded-xl hover:bg-white/10 transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Enhanced Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-gray-950/95 backdrop-blur-xl border border-gray-800/50 rounded-3xl mx-6 mt-6 p-8 shadow-2xl">
            <div className="flex flex-col space-y-6">
              <a href="#features" className="text-gray-300 hover:text-white transition-colors font-medium py-3 hover:pl-2 duration-200">Features</a>
              <a href="#playground" className="text-gray-300 hover:text-white transition-colors font-medium py-3 hover:pl-2 duration-200">Playground</a>
              <a href="#docs" className="text-gray-300 hover:text-white transition-colors font-medium py-3 hover:pl-2 duration-200">Documentation</a>
              <a href="#community" className="text-gray-300 hover:text-white transition-colors font-medium py-3 hover:pl-2 duration-200">Community</a>
              <button className="bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 text-white px-8 py-4 rounded-2xl hover:shadow-lg transition-all duration-300 font-semibold text-left mt-4">
                Get Started
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="px-6 py-20 md:py-32">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center space-x-3 bg-gradient-to-r from-purple-500/10 to-pink-500/10 backdrop-blur-sm border border-purple-500/20 rounded-full px-8 py-4 mb-12">
            <Sparkles className="w-5 h-5 text-purple-400" />
            <span className="text-sm font-medium text-white">Introducing Jenny 1.0 - Time Travel Programming</span>
            <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
          </div>
          
          <h1 className="text-7xl md:text-9xl font-bold text-white mb-12 leading-tight">
            Code with
            <br />
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
              Time Travel
            </span>
          </h1>
          
          <p className="text-2xl md:text-3xl text-gray-300 mb-16 max-w-4xl mx-auto leading-relaxed">
            Jenny revolutionizes programming with built-in time travel. Debug by going backwards, 
            create checkpoints, and undo any operation with simple, intuitive syntax.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-8 justify-center items-center">
            <button className="bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 text-white px-12 py-5 rounded-2xl hover:shadow-2xl hover:shadow-purple-500/25 hover:scale-105 transition-all duration-300 flex items-center space-x-4 group font-semibold text-xl">
              <span>Start Time Traveling</span>
              <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="border border-gray-600 text-gray-300 px-12 py-5 rounded-2xl hover:bg-white/10 hover:border-gray-500 transition-all duration-300 flex items-center space-x-4 font-semibold text-xl">
              <Play className="w-6 h-6" />
              <span>Watch Demo</span>
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="px-6 py-20 md:py-32">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-24">
            <h2 className="text-6xl md:text-7xl font-bold text-white mb-8">
              Revolutionary Features
            </h2>
            <p className="text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
              Jenny introduces time travel as a first-class programming concept, making debugging and 
              experimentation more intuitive than ever before.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-10">
            {features.map((feature, index) => (
              <FeatureCard 
                key={feature.title}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
                gradient={feature.gradient}
                delay={index * 200}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Code Playground Section */}
      <section id="playground" className="px-6 py-20 md:py-32">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-6xl md:text-7xl font-bold text-white mb-8">
              Try Jenny Now
            </h2>
            <p className="text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Experience time travel programming in our interactive playground. Write code, create checkpoints, 
              and see the magic of temporal debugging in action.
            </p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-16">
            <div>
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-3xl font-bold text-white flex items-center">
                  <Code className="w-8 h-8 text-purple-400 mr-3" />
                  Interactive Editor
                </h3>
              </div>
              <CodeEditor code={code} onChange={setCode} />
            </div>
            
            <div className="space-y-8">
              <div>
                <h3 className="text-3xl font-bold text-white mb-6 flex items-center">
                  <Zap className="w-8 h-8 text-purple-400 mr-3" />
                  Live Output
                </h3>
                <div className="bg-gray-950/50 backdrop-blur-sm border border-gray-800/50 rounded-3xl p-8 h-80 overflow-auto shadow-2xl">
                  <pre className="text-green-400 font-mono text-sm whitespace-pre-wrap leading-relaxed">{output}</pre>
                </div>
              </div>
              
              <TimelineVisualization />
              
              <div className="bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-purple-500/10 backdrop-blur-sm border border-purple-500/20 rounded-3xl p-8">
                <h4 className="text-white font-bold mb-4 flex items-center text-xl">
                  <Check className="w-6 h-6 text-green-400 mr-3" />
                  Time Travel Active
                </h4>
                <p className="text-gray-300 leading-relaxed text-lg">
                  Your code is running with full time travel capabilities. Every operation is tracked, 
                  checkpoints are automatically created, and you can revert to any previous state instantly.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="px-6 py-20 md:py-32 bg-black/20 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Trusted by Time Travelers
            </h2>
            <p className="text-xl text-gray-300">
              Join the growing community of developers exploring the future of programming
            </p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-12">
            <StatCard number="50" suffix="K+" label="Time Travelers" icon={Users} />
            <StatCard number="2.5" suffix="M+" label="Time Jumps" icon={RotateCcw} />
            <StatCard number="99.9" suffix="%" label="Revert Success" icon={Check} />
            <StatCard number="∞" suffix="" label="Possibilities" icon={Sparkles} />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 py-20 md:py-32">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-6xl md:text-7xl font-bold text-white mb-12">
            Ready to Travel
            <br />
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
              Through Time?
            </span>
          </h2>
          <p className="text-2xl text-gray-300 mb-16 max-w-3xl mx-auto leading-relaxed">
            Join thousands of developers who are already building the future with Jenny's 
            revolutionary time travel programming paradigm.
          </p>
          <div className="flex flex-col sm:flex-row gap-8 justify-center">
            <button className="bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 text-white px-12 py-5 rounded-2xl hover:shadow-2xl hover:shadow-purple-500/25 hover:scale-105 transition-all duration-300 font-semibold text-xl">
              Start Free Trial
            </button>
            <button className="border border-gray-600 text-gray-300 px-12 py-5 rounded-2xl hover:bg-white/10 hover:border-gray-500 transition-all duration-300 font-semibold text-xl">
              View Documentation
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-20 border-t border-gray-800/50 bg-black/20 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-5 gap-16">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-4 mb-8">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 via-pink-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <Clock className="w-7 h-7 text-white" />
                </div>
                <div>
                  <span className="text-3xl font-bold text-white">Jenny</span>
                  <div className="text-sm text-purple-300 font-medium">Time Travel Programming</div>
                </div>
              </div>
              <p className="text-gray-400 leading-relaxed mb-8 max-w-md text-lg">
                The world's first programming language with built-in time travel capabilities. 
                Debug, experiment, and code with unprecedented control over program execution.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white transition-colors p-3 rounded-xl hover:bg-white/10">
                  <Github className="w-6 h-6" />
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors p-3 rounded-xl hover:bg-white/10">
                  <Twitter className="w-6 h-6" />
                </a>
              </div>
            </div>
            
            <div>
              <h4 className="text-white font-bold mb-8 text-xl">Product</h4>
              <div className="space-y-4">
                <a href="#" className="block text-gray-400 hover:text-white transition-colors py-1">Features</a>
                <a href="#" className="block text-gray-400 hover:text-white transition-colors py-1">Pricing</a>
                <a href="#" className="block text-gray-400 hover:text-white transition-colors py-1">Changelog</a>
                <a href="#" className="block text-gray-400 hover:text-white transition-colors py-1">Roadmap</a>
              </div>
            </div>
            
            <div>
              <h4 className="text-white font-bold mb-8 text-xl">Resources</h4>
              <div className="space-y-4">
                <a href="#" className="block text-gray-400 hover:text-white transition-colors py-1">Documentation</a>
                <a href="#" className="block text-gray-400 hover:text-white transition-colors py-1">Tutorials</a>
                <a href="#" className="block text-gray-400 hover:text-white transition-colors py-1">API Reference</a>
                <a href="#" className="block text-gray-400 hover:text-white transition-colors py-1">Examples</a>
              </div>
            </div>
            
            <div>
              <h4 className="text-white font-bold mb-8 text-xl">Company</h4>
              <div className="space-y-4">
                <a href="#" className="block text-gray-400 hover:text-white transition-colors py-1">About</a>
                <a href="#" className="block text-gray-400 hover:text-white transition-colors py-1">Blog</a>
                <a href="#" className="block text-gray-400 hover:text-white transition-colors py-1">Careers</a>
                <a href="#" className="block text-gray-400 hover:text-white transition-colors py-1">Contact</a>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800/50 mt-16 pt-12 text-center">
            <p className="text-gray-400 text-lg">
              © 2024 Jenny Technologies. All rights reserved. Time travel responsibly.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;