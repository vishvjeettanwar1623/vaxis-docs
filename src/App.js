import React, { useState, useEffect, useRef } from 'react';

/**
 * 🧠 Vaxis Docs - ReactJS Application Component
 * Converts the Claude Docs warm aesthetic portal into a state-driven React application.
 */

// Documentation sections data structure for search
const docPages = [
  { id: 'overview', title: 'Getting Started - Overview', desc: 'Introduction to Vaxis, core problem of AI context blindness, and semantic graph solutions.' },
  { id: 'quickstart', title: 'Getting Started - Quickstart', desc: 'Terminal installation procedures, commands registering projects, and MCP integration configs.' },
  { id: 'how-vaxis-works', title: 'Core Concepts - How Vaxis works', desc: 'Differential syntactic pipeline, AST ingestion, parsers and Directed Graph linkages.' },
  { id: 'obsidian', title: 'Core Concepts - Obsidian Vault', desc: 'Persistent local storage architecture and 3D visual coupling graph benefits.' },
  { id: 'traversal', title: 'Core Concepts - Graph Traversal', desc: 'Algorithmic Breadth-First Search (BFS) path slicing and token compacting steps.' },
  { id: 'token-math', title: 'Core Concepts - Token Savings Math', desc: 'Cost matrices comparing standard blind greps against target graph slices.' },
  { id: 'cli', title: 'Developer Guide - CLI Command Reference', desc: 'Commander-based arguments for vaxis setup, sync, context compilation, and stdio servers.' },
  { id: 'architecture', title: 'Developer Guide - Under the Hood', desc: 'The modular package source hierarchy, AST dispatchers, linking models, and vault writers.' },
  { id: 'trials', title: 'Empirical Proof - A/B Trials Logs', desc: 'IDE session metrics for scroll indicators, multi-file timeline widgets, and theme toggle patches.' },
  { id: 'log-analyzer', title: 'Empirical Proof - Diagnostics Utility', desc: 'Interactive console log analytics playground simulating analyze_trial12.js sweeps.' }
];

const archSpecs = {
  cli: {
    title: 'src/cli.js (Command Center)',
    desc: 'Registers CLI handlers using Commander. Runs vaxis setup, sync, context with slice limits, and logs boot configurations.'
  },
  pipeline: {
    title: 'src/pipeline.js (Orchestrator)',
    desc: 'Sequentially coordinates directory scanning, AST parsing dispatchers, semantic double-bracket linkers, and file cache storage.'
  },
  scanner: {
    title: 'src/scanner.js (Ingestion)',
    desc: 'Traverses directories asynchronously, automatically respecting .gitignore configurations to completely ignore standard binary/modules noise.'
  },
  parsers: {
    title: 'src/parsers/index.js (Analyzers)',
    desc: 'Directs Javascript, plaintext, or CSS modules to specialized AST traversers to capture import scopes, variables, and function nodes.'
  },
  linker: {
    title: 'src/linker.js (Graph Linker)',
    desc: 'Resolves relative file path dependencies to build directed double-bracket wikilinks and highlights overlapping imports.'
  },
  vault: {
    title: 'src/vault/ (Knowledge Vault)',
    desc: 'Writes note profiles cleanly inside the designated Obsidian vault directory, appending central indices (_brain.md) and YAML metadata outlines.'
  }
};

const vaxisKnowledgeBase = [
  {
    title: "Branding, Style, Sumie Cybernetic, Colors and Visual Spec",
    keywords: ["branding", "style", "visual", "colors", "font", "theme", "sumi-e", "typography", "cybernetic", "indigo", "gold"],
    content: "Vaxis uses the 'Sumi-e Cybernetic' visual style (Zen & Ink wash meets high-performance graph computation). It features a dark-mode space with organic scrolls, neon-indigo dependency nodes, and glowing ochre-gold links. The background uses Midnight Obsidian (#060608 to #0c0c0e), translucent charcoal glass cards, ochre-gold CLI accents (#d4af37), and neon violet AI MCP highlights (#5D3FD3). Headers use the Outfit font, body text uses Inter, and code blocks use Fira Code."
  },
  {
    title: "Vaxis Core Vision, coordinator, memory, local-first",
    keywords: ["vaxis", "core", "vision", "coordinator", "memory", "local-first", "obsidian", "mcp"],
    content: "Vaxis (VaultAxis) is a local-first, graph-guided developer memory and AI context coordinator. It indexes codebase repositories into semantic nodes and dependency links inside a centralized Obsidian knowledge vault, exposing high-density, line-sliced prompt payloads to AI agents via the Model Context Protocol (MCP) in under 100 milliseconds."
  },
  {
    title: "Quickstart Guide, Installation, Commands, Setup, Registration, Configuration, uninstall",
    keywords: ["install", "installation", "setup", "quickstart", "init", "sync", "npm", "brew", "winget", "add", "context", "uninstall", "commands"],
    content: "To install Vaxis globally, use one of the following commands:\n" +
      "- Native Install: npm install -g @vaxis/cli\n" +
      "- Homebrew: brew install vaxis-cli\n" +
      "- WinGet: winget install Vaxis.CLI\n\n" +
      "To uninstall Vaxis globally, run:\n" +
      "- npm uninstall -g @vaxis/cli\n" +
      "- brew uninstall vaxis-cli\n\n" +
      "Setup & Registration steps:\n" +
      "- Configure vault: vaxis setup --vault ~/Obsidian/DeveloperVault\n" +
      "- Register current codebase: vaxis init <project-name>\n" +
      "- Scan and sync dependencies: vaxis sync\n" +
      "- Track external folder: vaxis add <path>\n" +
      "- Retrieve line-sliced context: vaxis context <project> <file> --depth 1 --lines"
  },
  {
    title: "The Core Problem of AI context blindness and token bloat",
    keywords: ["problem", "context", "blindness", "token", "bloat", "cursor", "cline", "copilot", "assistant", "grep"],
    content: "Modern LLM coding assistants (such as Cursor, Cline, or Copilot) suffer from context blindness and token window bloat. When modifying multi-file projects, they either: 1. Guess blindly (using slow, expensive grep searches, hitting limits, ignoring key imports). 2. Overload the context window (reading entire files of 800+ lines just to locate a single 5-line CSS class or JS selector, leading to high API fees, slow response times, and model hallucinations)."
  },
  {
    title: "The Vaxis Solution, semantic nodes and wikilinks",
    keywords: ["solution", "vaxis", "wikilinks", "mcp", "obsidian", "nodes", "graph", "vault"],
    content: "Vaxis represents your codebase as semantic node clusters inside a local Obsidian Knowledge Vault. Each source module becomes a markdown note, linked to its imports, exports, functions, and cross-project overlaps via double-bracket wikilinks. This local memory graph is exposed directly to the AI agent via a Model Context Protocol (MCP) server, allowing agents to retrieve line-sliced code ranges with imports in under 100ms."
  },
  {
    title: "Technical Architecture and File Components under the hood",
    keywords: ["architecture", "files", "components", "modules", "cli", "pipeline", "scanner", "parsers", "babel", "plaintext", "linker", "cache", "vault", "mcp"],
    content: "Vaxis modular architecture breakdown:\n" +
      "- src/cli.js (Command Center): Exposes vaxis setup, init, add, sync, context, and mcp commander-based arguments.\n" +
      "- src/pipeline.js (Orchestrator): Orchestrates data-ingestion, scanner, parser, cache, and linker.\n" +
      "- src/scanner.js (Ingestion Engine): Traverses directories using glob, respecting .gitignore, bypassing binaries and node_modules.\n" +
      "- src/parsers/index.js (Analyzers): Dispatches extensions to babel.js (core JS/TS AST parsing) or plaintext.js (regex plain text, CSS, HTML fallback).\n" +
      "- src/linker.js (Graph Coordinator): Builds Directed Graph of file nodes (imports as edges), resolving absolute path wikilinks and cross-project shared overlaps.\n" +
      "- src/cache.js (Local Cache): Cache based on file change times, reducing subsequent scans to under 200ms.\n" +
      "- src/vault/ (Vault Builders): Writes notes (writer.js), indexing central index _brain.md (brain.js), templates notes (noteTemplate.js)."
  },
  {
    title: "Why Obsidian? Persistent Graph UI, Privacy and wikilinks",
    keywords: ["obsidian", "vault", "ui", "privacy", "graphs", "local-first", "lock-in", "markdown"],
    content: "Vaxis uses Obsidian as its storage and visualization layer. Obsidian is a popular, offline-first, markdown-based personal knowledge management tool. Key benefits: 1. Local-First Privacy: Codebase structural maps remain private on your computer; no files are sent to a cloud server. 2. Interactive Graph View: Obsidian's built-in 3D Graph View visualizes codebase coupling, dependency networks, and circular/orphan modules. 3. No Database Lock-in: Plain text markdown files are accessible in any editor, tracked in git, and navigated manually."
  },
  {
    title: "Graph Traversal BFS and Line Slicing Mechanics",
    keywords: ["traversal", "bfs", "slicing", "depth", "neighbors", "compaction", "lines", "prompt", "payload"],
    content: "When context is requested, Vaxis performs BFS traversal: At depth 0, target file content. At depth 1, target's first-degree neighbors. At depth N, deeper dependency trees. Slicing Mechanics: If --lines is active, Vaxis extracts only specific line ranges containing referenced classes, functions, or CSS variables, compacting paths and metadata into single-line summaries to create high-density prompt payloads with zero boilerplate."
  },
  {
    title: "Token Reduction Mathematics and cost savings formulas",
    keywords: ["math", "mathematics", "tokens", "cost", "savings", "reduction", "formula", "baseline", "ggan", "efficiency"],
    content: "Token cost math comparisons:\n" +
      "1. Without Vaxis (Blind Scanning): Prompt tokens = sum of file sizes + search noise. Reading 5 files of 800 lines (~25k chars/file) + directory scans = ~32,250 input tokens.\n" +
      "2. With Vaxis (Graph Slicing): Prompt tokens = size of target file + sum of sliced neighbors. Target file (25k chars) + 4 sliced neighbors (2,500 chars/slice) = ~8,750 input tokens.\n" +
      "This achieves a total savings of 72.8% Token Cost Reduction!"
  },
  {
    title: "Performance matrix and use scenarios suitability guidelines",
    keywords: ["suitability", "scenario", "matrix", "performance", "matrix", "legacy", "refactor", "bug", "formatting", "binary", "cloud", "sandbox"],
    content: "Performance Scenario Matrix:\n" +
      "- Complex Multi-File Refactors: Outperforms standard agents (traces import paths directly).\n" +
      "- Legacy Codebase Navigation: Outperforms standard agents (maps undocumented coupling).\n" +
      "- High-Difficulty Bug Fixing: Outperforms standard agents (pinpoints exact class inheritance).\n" +
      "- Single-File Small CSS Tweaks: Average/Neutral (token overhead paid on first turn).\n" +
      "- Isolated Code Formatting: Not Recommended (unnecessary for isolated layouts).\n" +
      "- Binary Assets / Media Editing: Strict Limitation (does not parse images or binaries).\n" +
      "- Sandboxed / Cloud IDEs: Strict Limitation (requires terminal execution access)."
  },
  {
    title: "Developer A/B Trials Logs and Metrics (CSS, GSAP, Theme)",
    keywords: ["trials", "comparison", "metrics", "css", "gsap", "theme", "toggle", "delta", "savings", "trial 1", "trial 2", "trial 3"],
    content: "Developer trials parsed from transcript logs:\n" +
      "- Trial 1: CSS Scroll Progress Bar. Prompt: 'Change the top scroll progress bar thickness to 6px, and color it with a linear gradient of imperial gold pigment (Ochre Gold) with a gold neon glow shadow.' Result: 0 blind scans, 320 output tokens with Vaxis vs 2 blind scans + 1 read and 1001 output tokens without (68% output token savings).\n" +
      "- Trial 2: Multi-File Structural Navigation. Prompt: 3-part layout adjustment on customizer swatches, GSAP timeline containers, and JS event clickers. Result: 22 rounds, 83k input tokens with Vaxis vs 31 rounds, 115k input tokens without (29% rounds saved, 27.6% input token savings).\n" +
      "- Trial 3: Five-File Premium Day/Night Theme Refactor. Prompt: Theme toggle across 5 CSS/JS/HTML files. Result: 15 reads, 18 patches with Vaxis vs 21 reads, 22 patches without (12.3% input token savings, 28.5% redundant reads saved, 18.1% micro-patches saved)."
  },
  {
    title: "Diagnostics Log Analyzer, compilation and transcript.jsonl parsing",
    keywords: ["diagnostics", "analytics", "analyze_trial12.js", "transcript.jsonl", "logs", "parsing", "algorithm", "token estimation", "timestamp", "duration"],
    content: "Log analysis is compiled using the NodeJS script analyze_trial12.js, which processes transcript.jsonl lines from brain/<session-id>/.system_generated/logs/transcript.jsonl. It parses: 1. Timestamp tracking: first message to final response, calculating exact duration in seconds. 2. Token estimation: 4 characters per token ratio for input (prompts/tools) and output (thinking/markdown). 3. Tool classification: matches call names to identify behavioral exploration vs. code patching cycles."
  },
  {
    title: "How Vaxis Works, AST parsing, ingestion, graph coordination, differential pipeline",
    keywords: ["how vaxis works", "ast parsing", "ingestion", "graph coordination", "differential pipeline", "syntactic pipeline", "traversal", "babel", "plaintext"],
    content: "Vaxis operates through a differential syntactic pipeline:\n" +
      "1. Traversal & Ingestion: vaxis sync traverses directories using glob, ignoring node_modules and binaries.\n" +
      "2. AST Parsing: Dispatches JS/TS to babel.js (using @babel/parser to extract imports, exports, functions) and fallback to plaintext.js.\n" +
      "3. Graph Coordination: Linker builds a Directed Graph, resolving relative paths to double-bracket wikilinks."
  },
  {
    title: "CLI Command Reference, sub-commands, parameters, flags",
    keywords: ["cli", "commands", "reference", "vaxis setup", "vaxis init", "vaxis sync", "vaxis context", "vaxis mcp", "vaxis add", "parameters", "flags"],
    content: "Vaxis CLI Commands list:\n" +
      "- vaxis setup --vault <path>: Sets up global configurations pointing to Obsidian vault.\n" +
      "- vaxis init <project-name>: Registers a codebase folder with the Vaxis core project.\n" +
      "- vaxis add <path>: Registers a project at the specified directory path.\n" +
      "- vaxis sync [--force]: Differential scan that updates modified dependencies, writing markdown notes inside Obsidian vault.\n" +
      "- vaxis context <project-name> <file> [--depth] [--lines]: Executes BFS directed checks, assembling compressed slices of file contents.\n" +
      "- vaxis mcp: Initiates stdio Model Context Protocol (MCP) JSON-RPC services."
  }
];

const answerQuestionLocally = (query, chatMessages = []) => {
  const cleanQuery = query.toLowerCase().trim();
  const cleanQueryAlpha = cleanQuery.replace(/[^\w\s]/g, '');
  
  // 1. Handle greeting separately and robustly
  const greetings = ['hi', 'hello', 'hey', 'greetings', 'yo'];
  const isGreeting = greetings.some(g => cleanQueryAlpha === g || cleanQueryAlpha.startsWith(g + ' '));
  if (isGreeting) {
    return "Hello! I am the Vaxis Assistant. I can help answer questions about the Vaxis specifications, architecture, installation, or trials. What would you like to know?";
  }
  
  // Section index to Page redirection mapping
  const pageRedirectNames = {
    0: "Overview",
    1: "Overview",
    2: "Quickstart",
    3: "Overview",
    4: "Overview",
    5: "Under the Hood",
    6: "Obsidian Vault",
    7: "Graph Traversal BFS",
    8: "Token Savings Math",
    9: "Under the Hood",
    10: "A/B Trials Logs",
    11: "Diagnostics Utility",
    12: "How Vaxis works",
    13: "CLI Reference"
  };
  
  const pageToDefaultIndex = {
    "Overview": 1,
    "Quickstart": 2,
    "Under the Hood": 5,
    "Obsidian Vault": 6,
    "Graph Traversal BFS": 7,
    "Token Savings Math": 8,
    "A/B Trials Logs": 10,
    "Diagnostics Utility": 11,
    "How Vaxis works": 12,
    "CLI Reference": 13
  };
  
  // Check if the user expresses not understanding
  const notUnderstandingTerms = [
    "dont understand", "don't understand", "do not understand", 
    "didnt understand", "didn't understand", "did not understand", 
    "not understanding", "dont get it", "dont get", "don't get", 
    "what do you mean", "explain", "clueless", "how to do it", 
    "show me", "give me", "commands", "what is the method", "tell me",
    "stuck", "confused", "help"
  ];
  const expressesNotUnderstanding = notUnderstandingTerms.some(term => cleanQuery.includes(term) || cleanQueryAlpha.includes(term));
  
  // If user says "I don't understand" or similar, scan history to find what page we redirected them to
  if (expressesNotUnderstanding) {
    let lastPointedPage = null;
    if (chatMessages) {
      for (let i = chatMessages.length - 1; i >= 0; i--) {
        const msg = chatMessages[i];
        if (msg.role === 'ai') {
          const matchedPage = Object.keys(pageToDefaultIndex).find(page => 
            msg.content.includes(`on the ${page} page`) || msg.content.includes(`navigate to the '${page}'`)
          );
          if (matchedPage) {
            lastPointedPage = matchedPage;
            break;
          }
        }
      }
    }
    
    if (lastPointedPage) {
      const fallbackIdx = pageToDefaultIndex[lastPointedPage];
      return vaxisKnowledgeBase[fallbackIdx].content;
    }
  }

  // 2. Identify the target matching section
  let matchedIndex = -1;
  
  // Direct Heuristics matching
  if (cleanQuery.includes('install') || cleanQuery.includes('uninstall') || cleanQuery.includes('quickstart') || cleanQuery.includes('npm') || cleanQuery.includes('brew') || cleanQuery.includes('winget')) {
    matchedIndex = 2;
  } else if (cleanQuery.includes('setup') || cleanQuery.includes('init') || cleanQuery.includes('vaxis') || cleanQuery.includes('commands') || cleanQuery.includes('reference') || cleanQuery.includes('cli')) {
    matchedIndex = 13;
  } else if (cleanQuery.includes('cli.js') || cleanQuery.includes('pipeline.js') || cleanQuery.includes('scanner.js') || cleanQuery.includes('linker.js') || cleanQuery.includes('cache.js') || cleanQuery.includes('vault/')) {
    matchedIndex = 5;
  } else if (cleanQuery.includes('architect') || cleanQuery.includes('modular') || cleanQuery.includes('pipeline') || cleanQuery.includes('scanner') || cleanQuery.includes('linker') || cleanQuery.includes('cache') || cleanQuery.includes('under the hood')) {
    matchedIndex = 5;
  } else if (cleanQuery.includes('brand') || cleanQuery.includes('style') || cleanQuery.includes('color') || cleanQuery.includes('font') || cleanQuery.includes('visual') || cleanQuery.includes('sumi-e') || cleanQuery.includes('cybernetic')) {
    matchedIndex = 0;
  } else if (cleanQuery.includes('obsidian') || cleanQuery.includes('vault')) {
    matchedIndex = 6;
  } else if (cleanQuery.includes('traversal') || cleanQuery.includes('bfs') || cleanQuery.includes('slicing') || cleanQuery.includes('depth')) {
    matchedIndex = 7;
  } else if (cleanQuery.includes('math') || cleanQuery.includes('token') || cleanQuery.includes('savings') || cleanQuery.includes('reduction') || cleanQuery.includes('cost')) {
    matchedIndex = 8;
  } else if (cleanQuery.includes('matrix') || cleanQuery.includes('scenario') || cleanQuery.includes('suitability') || cleanQuery.includes('legacy') || cleanQuery.includes('refactor') || cleanQuery.includes('bug')) {
    matchedIndex = 9;
  } else if (cleanQuery.includes('trial') || cleanQuery.includes('ab') || cleanQuery.includes('metrics') || cleanQuery.includes('comparison')) {
    matchedIndex = 10;
  } else if (cleanQuery.includes('diagnostic') || cleanQuery.includes('analyze') || cleanQuery.includes('log') || cleanQuery.includes('transcript')) {
    matchedIndex = 11;
  } else if (cleanQuery.includes('works') || cleanQuery.includes('ast') || cleanQuery.includes('ingest') || cleanQuery.includes('parse') || cleanQuery.includes('coordinate') || cleanQuery.includes('pipeline')) {
    matchedIndex = 12;
  } else if (cleanQuery.includes('vision') || cleanQuery.includes('coordinator') || cleanQuery.includes('solution') || cleanQuery.includes('problem') || cleanQuery.includes('memory')) {
    matchedIndex = 1;
  }
  
  // Fallback to Keyword Token Similarity Search
  if (matchedIndex === -1) {
    const stopWords = new Set([
      'a', 'about', 'above', 'after', 'again', 'against', 'all', 'am', 'an', 'and', 'any', 'are', 'arent', 
      'as', 'at', 'be', 'because', 'been', 'before', 'being', 'below', 'between', 'both', 'but', 'by', 
      'can', 'cant', 'cannot', 'could', 'couldnt', 'did', 'didnt', 'do', 'does', 'doesnt', 'doing', 'dont', 
      'down', 'during', 'each', 'few', 'for', 'from', 'further', 'had', 'hadnt', 'has', 'hasnt', 'have', 
      'havent', 'having', 'he', 'hed', 'hell', 'hes', 'her', 'here', 'heres', 'hers', 'herself', 'him', 
      'himself', 'his', 'how', 'hows', 'i', 'id', 'ill', 'im', 'ive', 'if', 'in', 'into', 'is', 'isnt', 
      'it', 'its', 'itself', 'lets', 'me', 'more', 'most', 'mustnt', 'my', 'myself', 'no', 'nor', 'not', 
      'of', 'off', 'on', 'once', 'only', 'or', 'other', 'ought', 'our', 'ours', 'ourselves', 'out', 'over', 
      'own', 'same', 'shant', 'she', 'shed', 'shell', 'shes', 'should', 'shouldnt', 'so', 'some', 'such', 
      'than', 'that', 'thats', 'the', 'their', 'theirs', 'them', 'themselves', 'then', 'there', 'theres', 
      'these', 'they', 'theyd', 'theyll', 'theyre', 'theyve', 'this', 'those', 'through', 'to', 'too', 
      'under', 'until', 'up', 'very', 'was', 'wasnt', 'we', 'wed', 'well', 'were', 'weve', 'werent', 
      'what', 'whats', 'when', 'whens', 'where', 'wheres', 'which', 'while', 'who', 'whos', 'whom', 
      'why', 'whys', 'with', 'wont', 'would', 'wouldnt', 'you', 'youd', 'youll', 'youre', 'youve', 
      'your', 'yours', 'yourself', 'yourselves', 'vaxis', 'docs', 'please', 'tell', 'show', 'explain',
      'find', 'search', 'give', 'get'
    ]);
    
    const queryTokens = cleanQuery
      .replace(/[^\w\s]/g, ' ')
      .split(/\s+/)
      .filter(token => token && !stopWords.has(token));
      
    if (queryTokens.length > 0) {
      let highestScore = 0;
      vaxisKnowledgeBase.forEach((section, idx) => {
        let score = 0;
        const titleTokens = section.title.toLowerCase().replace(/[^\w\s]/g, ' ').split(/\s+/).filter(Boolean);
        const contentTokens = section.content.toLowerCase().replace(/[^\w\s]/g, ' ').split(/\s+/).filter(Boolean);
        const keywords = section.keywords.map(k => k.toLowerCase());
        
        queryTokens.forEach(token => {
          if (titleTokens.includes(token)) score += 5.0;
          else if (titleTokens.some(t => t.startsWith(token) || token.startsWith(t))) score += 2.0;
          
          if (keywords.includes(token)) score += 4.0;
          else if (keywords.some(k => k.startsWith(token) || token.startsWith(k))) score += 1.5;
          
          const occurrences = contentTokens.filter(t => t === token).length;
          if (occurrences > 0) score += Math.min(occurrences, 6) * 0.8;
          else {
            const occurrencesSub = contentTokens.filter(t => t.startsWith(token) || token.startsWith(t)).length;
            if (occurrencesSub > 0) score += Math.min(occurrencesSub, 3) * 0.3;
          }
        });
        
        if (score > highestScore) {
          highestScore = score;
          matchedIndex = idx;
        }
      });
      
      if (highestScore < 1.5) {
        matchedIndex = -1;
      }
    }
  }
  
  if (matchedIndex === -1) {
    return "I am only trained to answer based on this Vaxis dataset. I can't answer other things.";
  }
  
  const targetPage = pageRedirectNames[matchedIndex];
  
  // Check if the user has already been redirected to this page in history
  const pointedToPage = chatMessages && chatMessages.some(m => 
    m.role === 'ai' && 
    (m.content.includes(`on the ${targetPage} page`) || m.content.includes(`navigate to the '${targetPage}'`))
  );
  
  if (pointedToPage) {
    return vaxisKnowledgeBase[matchedIndex].content;
  } else {
    return `You can find details about this on the ${targetPage} page. Please navigate to the '${targetPage}' page in the sidebar.`;
  }
};;

export default function App() {
  // --- Navigation & Layout ---
  const [activeSection, setActiveSection] = useState('overview');
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [copiedLinkSec, setCopiedLinkSec] = useState('');

  // --- Right Table of Contents (Outline) & Scroll-Spy ---
  const [tocHeadings, setTocHeadings] = useState([]);
  const [activeTocId, setActiveTocId] = useState('');

  // --- Tabs (Quickstart) ---
  const [activeInstallTab, setActiveInstallTab] = useState('tab-native');

  // --- SVG Architecture Graph ---
  const [activeArchNode, setActiveArchNode] = useState('cli');

  // --- Calculator ---
  const [calcFiles, setCalcFiles] = useState(5);
  const [calcLines, setCalcLines] = useState(800);
  const [calcSlice, setCalcSlice] = useState(80);

  // --- Terminal Simulator ---
  const [isTraceRunning, setIsTraceRunning] = useState(false);
  const [terminalLogs, setTerminalLogs] = useState([]);
  const termBodyRef = useRef(null);

  // --- Fuzzy Search Overlay ---
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const searchInputRef = useRef(null);

  // --- Docs Assistant Chatbot ---
  const [chatOpen, setChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    {
      role: 'system',
      content: 'Welcome to the Vaxis Assistant! Ask any question about Vaxis specifications, architecture, or trials.'
    }
  ]);
  const [chatInputText, setChatInputText] = useState('');
  const chatMessagesEndRef = useRef(null);

  // Sync scroll positions and parse headings for TOC on page switch
  useEffect(() => {
    try {
      window.scrollTo(0, 0);
    } catch (e) {
      // Ignore JSDOM unimplemented error
    }

    const sectionEl = document.getElementById(activeSection);
    if (!sectionEl) return;

    const headings = Array.from(sectionEl.querySelectorAll('h2'));
    const mapped = headings.map((h, idx) => {
      if (!h.id) {
        h.id = `heading-${activeSection}-${idx}`;
      }
      return { id: h.id, text: h.textContent };
    });

    setTocHeadings(mapped);
    if (mapped.length > 0) {
      setActiveTocId(mapped[0].id);
    } else {
      setActiveTocId('');
    }
  }, [activeSection]);

  // Scroll Spy logic to highlight active heading outline on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sectionEl = document.getElementById(activeSection);
      if (!sectionEl) return;

      const headings = sectionEl.querySelectorAll('h2');
      let currentId = '';

      headings.forEach(heading => {
        const top = heading.getBoundingClientRect().top;
        if (top < 140) {
          currentId = heading.id;
        }
      });

      if (currentId) {
        setActiveTocId(currentId);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeSection]);

  // Keyboard Shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setSearchOpen(true);
        setSearchQuery('');
        setSearchResults([]);
      }
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'i') {
        e.preventDefault();
        setChatOpen(prev => !prev);
      }
      if (e.key === 'Escape') {
        setSearchOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Auto-focus search input when search modal is opened
  useEffect(() => {
    if (searchOpen && searchInputRef.current) {
      setTimeout(() => {
        searchInputRef.current.focus();
      }, 50);
    }
  }, [searchOpen]);

  // Auto-scroll chat messages panel to bottom
  useEffect(() => {
    if (chatMessagesEndRef.current && typeof chatMessagesEndRef.current.scrollIntoView === 'function') {
      chatMessagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatMessages, chatOpen]);

  // Auto-scroll terminal simulator body to bottom
  useEffect(() => {
    if (termBodyRef.current) {
      termBodyRef.current.scrollTop = termBodyRef.current.scrollHeight;
    }
  }, [terminalLogs]);

  // Switch pages
  const handlePageSwitch = (id) => {
    setActiveSection(id);
    setMobileNavOpen(false);
  };

  // Copy page link
  const handleCopyPageLink = (id) => {
    const url = `${window.location.origin}${window.location.pathname}#${id}`;
    navigator.clipboard.writeText(url).then(() => {
      setCopiedLinkSec(id);
      setTimeout(() => {
        setCopiedLinkSec('');
      }, 2000);
    });
  };

  // SVG Active Edge highlight manager
  const isEdgeActive = (from, to) => {
    return activeArchNode === from || activeArchNode === to;
  };

  // Search filter
  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query.trim().length === 0) {
      setSearchResults([]);
      return;
    }

    const filtered = docPages.filter(page =>
      page.title.toLowerCase().includes(query.toLowerCase()) ||
      page.desc.toLowerCase().includes(query.toLowerCase())
    );
    setSearchResults(filtered);
  };

  // Math calculator variables
  const computedValues = React.useMemo(() => {
    const charPerLine = 40;
    const charPerToken = 4;

    const tokenBaseline = Math.round((calcFiles * calcLines * charPerLine) / charPerToken) + 1000;
    const tokenVaxis = Math.round(((calcLines + (calcFiles - 1) * calcSlice) * charPerLine) / charPerToken);
    const savingsPct = Math.max(0, Math.round(((tokenBaseline - tokenVaxis) / tokenBaseline) * 100));

    return {
      baseline: tokenBaseline.toLocaleString(),
      vaxis: tokenVaxis.toLocaleString(),
      pct: savingsPct
    };
  }, [calcFiles, calcLines, calcSlice]);

  // Terminal Simulator Executor
  const runTraceSimulator = () => {
    if (isTraceRunning) return;
    setIsTraceRunning(true);
    setTerminalLogs([]);

    const steps = [
      { text: 'node analyze_trial12.js --session 7d9270cf', delay: 700, type: 'input' },
      { text: '[SYSTEM] Loading trace transcript transcript.jsonl...', delay: 400, type: 'system' },
      { text: '[SYSTEM] File parsed successfully. Parsing token counters...', delay: 500, type: 'system' },
      { text: '   -> Cold start: 2026-05-25T22:15:09Z', delay: 200, type: 'info' },
      { text: '   -> Completion: 2026-05-25T22:18:11Z', delay: 200, type: 'info' },
      { text: '   -> Duration benchmark: 182 seconds.', delay: 300, type: 'success' },
      { text: '   -> Input tokens (Standard): 31,200 tokens.', delay: 300, type: 'info' },
      { text: '   -> Input tokens (Vaxis):    27,797 tokens.', delay: 300, type: 'info' },
      { text: '   -> Net prompt savings:      3,403 tokens saved (+10.9%).', delay: 400, type: 'success' },
      { text: '   -> Redundant tool calls:    10 calls eliminated successfully.', delay: 400, type: 'success' },
      { text: '[SUCCESS] Log parsing diagnostic completed in 8ms.', delay: 300, type: 'success' }
    ];

    const showNextLine = (idx) => {
      if (idx >= steps.length) {
        setIsTraceRunning(false);
        return;
      }
      setTerminalLogs(prev => [...prev, steps[idx]]);
      setTimeout(() => {
        showNextLine(idx + 1);
      }, steps[idx].delay);
    };

    showNextLine(0);
  };

  // Submit Question to Local retrieval engine using keyword similarity matching
  const handleSendChat = () => {
    const query = chatInputText.trim();
    if (!query) return;

    setChatInputText('');
    setChatMessages(prev => [...prev, { role: 'user', content: query }]);
    setChatMessages(prev => [...prev, { role: 'ai', content: 'Searching local database...', isSearching: true }]);

    setTimeout(() => {
      const answer = answerQuestionLocally(query, chatMessages);
      setChatMessages(prev => {
        const filtered = prev.filter(m => !m.isSearching);
        return [...filtered, { role: 'ai', content: answer }];
      });
    }, 300);
  };

  return (
    <div className="app-wrapper">
      
      {/* Sticky Top Header */}
      <header>
        <div className="header-container">
          
          {/* Logo Branding (No emoji, version label removed) */}
          <div className="logo-section" onClick={() => handlePageSwitch('overview')}>
            Vaxis Docs
          </div>
          
          {/* Search Input Box */}
          <div className="search-container">
            <input 
              type="text" 
              className="search-input" 
              placeholder="Search documentation..." 
              readOnly 
              onClick={() => {
                setSearchOpen(true);
                setSearchQuery('');
                setSearchResults([]);
              }}
            />
            <span className="search-shortcut">Ctrl K</span>
          </div>
          
          {/* Action Buttons (No sparkles) */}
          <div className="header-actions">
            <button className="btn-ask-ai" onClick={() => setChatOpen(prev => !prev)}>
              Vaxis Assistant
            </button>
            {/* Mobile Hamburger Toggle */}
            <button className="mobile-nav-toggle" id="mobile-toggle" onClick={() => setMobileNavOpen(prev => !prev)}>Menu</button>
          </div>
          
        </div>
      </header>

      {/* Three-Column Docs Layout */}
      <div className="docs-layout">
        
        {/* Left Sidebar: Documentation Hierarchy Navigation (No emojis) */}
        <aside className={`left-sidebar ${mobileNavOpen ? 'active' : ''}`}>
          
          {/* Getting Started */}
          <div className="nav-group">
            <div className="nav-group-title">Getting started</div>
            <ul className="nav-items">
              <li>
                <a 
                  href="#overview"
                  onClick={(e) => { e.preventDefault(); handlePageSwitch('overview'); }} 
                  className={`nav-item-link ${activeSection === 'overview' ? 'active' : ''}`}
                >
                  Overview
                </a>
              </li>
              <li>
                <a 
                  href="#quickstart"
                  onClick={(e) => { e.preventDefault(); handlePageSwitch('quickstart'); }} 
                  className={`nav-item-link ${activeSection === 'quickstart' ? 'active' : ''}`}
                >
                  Quickstart
                </a>
              </li>
            </ul>
          </div>
          
          {/* Core Concepts */}
          <div className="nav-group">
            <div className="nav-group-title">Core concepts</div>
            <ul className="nav-items">
              <li>
                <a 
                  href="#how-vaxis-works"
                  onClick={(e) => { e.preventDefault(); handlePageSwitch('how-vaxis-works'); }} 
                  className={`nav-item-link ${activeSection === 'how-vaxis-works' ? 'active' : ''}`}
                >
                  How Vaxis works
                </a>
              </li>
              <li>
                <a 
                  href="#obsidian"
                  onClick={(e) => { e.preventDefault(); handlePageSwitch('obsidian'); }} 
                  className={`nav-item-link ${activeSection === 'obsidian' ? 'active' : ''}`}
                >
                  Obsidian Vault
                </a>
              </li>
              <li>
                <a 
                  href="#traversal"
                  onClick={(e) => { e.preventDefault(); handlePageSwitch('traversal'); }} 
                  className={`nav-item-link ${activeSection === 'traversal' ? 'active' : ''}`}
                >
                  Graph Traversal BFS
                </a>
              </li>
              <li>
                <a 
                  href="#token-math"
                  onClick={(e) => { e.preventDefault(); handlePageSwitch('token-math'); }} 
                  className={`nav-item-link ${activeSection === 'token-math' ? 'active' : ''}`}
                >
                  Token Savings Math
                </a>
              </li>
            </ul>
          </div>
          
          {/* Developer Guide */}
          <div className="nav-group">
            <div className="nav-group-title">Developer Guide</div>
            <ul className="nav-items">
              <li>
                <a 
                  href="#cli"
                  onClick={(e) => { e.preventDefault(); handlePageSwitch('cli'); }} 
                  className={`nav-item-link ${activeSection === 'cli' ? 'active' : ''}`}
                >
                  CLI Reference
                </a>
              </li>
              <li>
                <a 
                  href="#architecture"
                  onClick={(e) => { e.preventDefault(); handlePageSwitch('architecture'); }} 
                  className={`nav-item-link ${activeSection === 'architecture' ? 'active' : ''}`}
                >
                  Under the Hood
                </a>
              </li>
            </ul>
          </div>
          
          {/* Empirical Proof */}
          <div className="nav-group">
            <div className="nav-group-title">Empirical Proof</div>
            <ul className="nav-items">
              <li>
                <a 
                  href="#trials"
                  onClick={(e) => { e.preventDefault(); handlePageSwitch('trials'); }} 
                  className={`nav-item-link ${activeSection === 'trials' ? 'active' : ''}`}
                >
                  A/B Trials Logs
                </a>
              </li>
              <li>
                <a 
                  href="#log-analyzer"
                  onClick={(e) => { e.preventDefault(); handlePageSwitch('log-analyzer'); }} 
                  className={`nav-item-link ${activeSection === 'log-analyzer' ? 'active' : ''}`}
                >
                  Diagnostics Utility
                </a>
              </li>
            </ul>
          </div>
          
        </aside>

        {/* Center Column: Core Content Sheets */}
        <main className="center-content">
          <div className="content-reader">
            
            {/* ==================== PAGE: OVERVIEW ==================== */}
            <article id="overview" className={`doc-section ${activeSection === 'overview' ? 'active' : ''}`}>
              <div className="doc-metadata-bar">
                <span className="doc-category">Getting Started</span>
                <button className="btn-copy-page" onClick={() => handleCopyPageLink('overview')}>
                  {copiedLinkSec === 'overview' ? 'Link copied' : 'Copy link'}
                </button>
              </div>
              
              <h1>Overview</h1>
              <p>
                Vaxis (VaultAxis) is a local-first, graph-guided developer memory and AI context coordinator. It indexes codebase repositories into semantic nodes and dependency links inside a centralized Obsidian knowledge vault, exposing high-density, line-sliced prompt payloads to AI agents via the Model Context Protocol (MCP) in under 100 milliseconds.
              </p>
              
              <h2>The Core Problem</h2>
              <p>
                Modern LLM coding assistants (such as Claude Code, Cursor, or Copilot) suffer from context blindness and token window bloat. When modifying multi-file projects, they either:
              </p>
              <ul>
                <li><strong>Guess blindly:</strong> Executing slow, expensive, and superficial search queries across all folders, hitting standard limits, and ignoring key import targets.</li>
                <li><strong>Overload the context window:</strong> Reading entire files (800+ lines) just to locate a single 5-line CSS class or JS selector, leading to astronomical API fees, slow response times, and model hallucinations.</li>
              </ul>
              
              <h2>The Vaxis Solution</h2>
              <p>
                Vaxis represents your codebase as semantic node clusters inside a local Obsidian Knowledge Vault. Each source module becomes a markdown note, linked to its imports, exports, functions, and cross-project overlaps via double-bracket wikilinks.
              </p>
              <p>
                This local memory graph is exposed directly to the AI agent via a Model Context Protocol (MCP) server. The agent can traverse the graph, locate precise files, and retrieve highly compressed line-sliced code ranges with its dependent imports in under 100 milliseconds.
              </p>
              
              <div className="callout info">
                <div className="callout-title">Zen Cybernetic Concept</div>
                This local memory graph is exposed straight to your AI coding agents via standard stdio JSON-RPC. Agents can traverse the graph paths, resolve relative targets, and load highly compressed slices of code files along with their active imports instantly.
              </div>
            </article>

            {/* ==================== PAGE: QUICKSTART ==================== */}
            <article id="quickstart" className={`doc-section ${activeSection === 'quickstart' ? 'active' : ''}`}>
              <div className="doc-metadata-bar">
                <span className="doc-category">Getting Started</span>
                <button className="btn-copy-page" onClick={() => handleCopyPageLink('quickstart')}>
                  {copiedLinkSec === 'quickstart' ? 'Link copied' : 'Copy link'}
                </button>
              </div>
              
              <h1>Quickstart Guide</h1>
              <p>
                Set up Vaxis on your local computer to connect codebase structural directories directly to your terminal or editor AI agent.
              </p>
              
              <h2>Installation</h2>
              <p>
                Install the Vaxis Command Line Interface globally utilizing your preferred package manager.
              </p>
              
              <div className="tab-container">
                <div className="tab-bar">
                  <button 
                    className={`tab-btn ${activeInstallTab === 'tab-native' ? 'active' : ''}`}
                    onClick={() => setActiveInstallTab('tab-native')}
                  >
                    Native Install
                  </button>
                  <button 
                    className={`tab-btn ${activeInstallTab === 'tab-brew' ? 'active' : ''}`}
                    onClick={() => setActiveInstallTab('tab-brew')}
                  >
                    Homebrew
                  </button>
                  <button 
                    className={`tab-btn ${activeInstallTab === 'tab-winget' ? 'active' : ''}`}
                    onClick={() => setActiveInstallTab('tab-winget')}
                  >
                    WinGet
                  </button>
                </div>
                
                {activeInstallTab === 'tab-native' && (
                  <div className="tab-content active" id="tab-native">
                    <CodeBlock filename="bash" code="npm i -g @vaxis/cli" />
                  </div>
                )}
                
                {activeInstallTab === 'tab-brew' && (
                  <div className="tab-content active" id="tab-brew">
                    <CodeBlock filename="bash" code="brew install vaxis-cli" />
                  </div>
                )}
                
                {activeInstallTab === 'tab-winget' && (
                  <div className="tab-content active" id="tab-winget">
                    <CodeBlock filename="powershell" code="winget install Vaxis.CLI" />
                  </div>
                )}
              </div>
              
              <h2>Setup & Registration Steps</h2>
              
              <p>
                First, configure your global vault directory to point to your local Obsidian Vault.
              </p>
              <CodeBlock filename="bash" code="vaxis setup --vault ~/Obsidian/DeveloperVault" />
              
              <p>
                Next, register your current codebase project under a custom name.
              </p>
              <CodeBlock filename="bash" code="vaxis init my-web-app" />
              
              <p>
                Now, scan the registered project directory and compile its dependency graph notes.
              </p>
              <CodeBlock filename="bash" code="vaxis sync" />
              
              <p>
                Alternatively, you can add and track specific external folders using the CLI tools.
              </p>
              <CodeBlock filename="bash" code="vaxis add ~/Documents/vaxis-docs" />

              <p>
                Finally, you can request line-sliced target context maps directly from your terminal.
              </p>
              <CodeBlock filename="bash" code="vaxis context my-web-app src/features/navigation/nav_interactions.js --depth 1 --lines" />
              
              <h2>Integrate with AI Agents</h2>
              <p>
                To hook Vaxis up to your Model Context Protocol (MCP) compatible agents (e.g., Claude Code, Cursor, or Cline), add the following server configuration.
              </p>
              
              <CodeBlock 
                filename="claude_desktop_config.json" 
                code={`{
  "mcpServers": {
    "vaxis": {
      "command": "<PATH_TO_NODE_EXECUTABLE>",
      "args": [
        "<PATH_TO_VAXIS_BIN_DIRECTORY>/vaxis.js",
        "mcp"
      ],
      "disabled": false
    }
  }
}`} 
              />
            </article>

            {/* ==================== PAGE: HOW VAXIS WORKS ==================== */}
            <article id="how-vaxis-works" className={`doc-section ${activeSection === 'how-vaxis-works' ? 'active' : ''}`}>
              <div className="doc-metadata-bar">
                <span className="doc-category">Core Concepts</span>
                <button className="btn-copy-page" onClick={() => handleCopyPageLink('how-vaxis-works')}>
                  {copiedLinkSec === 'how-vaxis-works' ? 'Link copied' : 'Copy link'}
                </button>
              </div>
              
              <h1>How Vaxis Works</h1>
              <p>
                Vaxis operates through a differential syntactic pipeline, converting raw code text into high-density semantic linkages.
              </p>
              
              <h2>1. Traversal & Ingestion</h2>
              <p>
                When running <code>vaxis sync</code>, the Ingestion Engine traverses directories using glob-based matching. It respects <code>.gitignore</code> configurations, bypassing binary folders (such as images, bundles, zip packages) and dependencies like <code>node_modules</code>.
              </p>
              
              <h2>2. AST Parsing</h2>
              <p>
                Exposed files are passed to extension-specialized syntactic parsers:
              </p>
              <ul>
                <li><strong>parsers/index.js:</strong> Dispatches files based on extensions.</li>
                <li><strong>parsers/babel.js:</strong> Core JS/TS parser. Uses <code>@babel/parser</code> and <code>@babel/traverse</code> to convert modules into Abstract Syntax Trees, extracting explicit imports, public exports, declared functions, variables, constructors, and event listeners.</li>
                <li><strong>parsers/plaintext.js:</strong> Fallback regex parser extracting styles and configuration rules for plain text, CSS, HTML, and Markdown files.</li>
              </ul>
              
              <h2>3. Graph Coordination</h2>
              <p>
                The Graph Linker coordinates the compiled AST extractions to build a Directed Graph:
              </p>
              <ul>
                <li>Nodes are files (e.g., utils.js).</li>
                <li>Edges represent imports or dependency paths.</li>
                <li>Relative imports are resolved to absolute file paths, forming double-bracket wikilinks.</li>
                <li>Detects cross-project shared overlaps, establishing reciprocating backlinks.</li>
              </ul>
              
              <div className="callout info">
                <div className="callout-title">Performance Cache</div>
                During subsequent synchronizations, the cache checks file metadata modifications. If clean, it skips parsing, completing synchronization in less than 200 milliseconds.
              </div>
            </article>

            {/* ==================== PAGE: OBSIDIAN ==================== */}
            <article id="obsidian" className={`doc-section ${activeSection === 'obsidian' ? 'active' : ''}`}>
              <div className="doc-metadata-bar">
                <span className="doc-category">Core Concepts</span>
                <button className="btn-copy-page" onClick={() => handleCopyPageLink('obsidian')}>
                  {copiedLinkSec === 'obsidian' ? 'Link copied' : 'Copy link'}
                </button>
              </div>
              
              <h1>Obsidian Vault Integration</h1>
              <p>
                Vaxis utilizes Obsidian as its storage, editor, and visual interface layer. Obsidian is a popular, offline-first personal knowledge management system that renders plaintext markdown networks.
              </p>
              
              <h2>Key Benefits</h2>
              <ul>
                <li><strong>Local-First Privacy:</strong> Your codebase metadata remains completely private on your local drive. No structural details are sent to external servers.</li>
                <li><strong>Interactive Visual Graphs:</strong> Access Obsidian's Graph View to visually inspect architectural coupling, deep dependency paths, and orphan code modules.</li>
                <li><strong>No Vendor Lock-In:</strong> Plain text markdown notes are accessible in any editor and integrate cleanly with git.</li>
              </ul>
              
              <h2>Interactive Architectural Flow</h2>
              <p>
                Click on the active modules inside this diagram to view their technical outlines.
              </p>
              
              {/* SVG architecture graph mini widget */}
              <div className="arch-svg-container">
                <svg className="mini-svg-graph" viewBox="0 0 540 280">
                  {/* Links */}
                  <line className={`mini-edge ${isEdgeActive('cli', 'pipeline') ? 'active' : ''}`} x1="80" y1="140" x2="200" y2="140" />
                  <line className={`mini-edge ${isEdgeActive('pipeline', 'scanner') ? 'active' : ''}`} x1="200" y1="140" x2="300" y2="60" />
                  <line className={`mini-edge ${isEdgeActive('pipeline', 'parsers') ? 'active' : ''}`} x1="200" y1="140" x2="300" y2="140" />
                  <line className={`mini-edge ${isEdgeActive('pipeline', 'linker') ? 'active' : ''}`} x1="200" y1="140" x2="300" y2="220" />
                  <line className={`mini-edge ${isEdgeActive('linker', 'vault') ? 'active' : ''}`} x1="300" y1="220" x2="440" y2="220" />
                  
                  {/* Nodes */}
                  <g className={`mini-node ${activeArchNode === 'cli' ? 'active' : ''}`} onClick={() => setActiveArchNode('cli')}>
                    <rect className="mini-node-bg" x="30" y="115" width="80" height="50" rx="6" />
                    <text className="mini-node-text" x="70" y="145">cli.js</text>
                  </g>
                  <g className={`mini-node ${activeArchNode === 'pipeline' ? 'active' : ''}`} onClick={() => setActiveArchNode('pipeline')}>
                    <rect className="mini-node-bg" x="150" y="115" width="90" height="50" rx="6" />
                    <text className="mini-node-text" x="195" y="145">pipeline.js</text>
                  </g>
                  <g className={`mini-node ${activeArchNode === 'scanner' ? 'active' : ''}`} onClick={() => setActiveArchNode('scanner')}>
                    <rect className="mini-node-bg" x="260" y="35" width="80" height="50" rx="6" />
                    <text className="mini-node-text" x="300" y="65">scanner.js</text>
                  </g>
                  <g className={`mini-node ${activeArchNode === 'parsers' ? 'active' : ''}`} onClick={() => setActiveArchNode('parsers')}>
                    <rect className="mini-node-bg" x="260" y="115" width="80" height="50" rx="6" />
                    <text className="mini-node-text" x="300" y="145">parsers/</text>
                  </g>
                  <g className={`mini-node ${activeArchNode === 'linker' ? 'active' : ''}`} onClick={() => setActiveArchNode('linker')}>
                    <rect className="mini-node-bg" x="260" y="195" width="80" height="50" rx="6" />
                    <text className="mini-node-text" x="300" y="225">linker.js</text>
                  </g>
                  <g className={`mini-node ${activeArchNode === 'vault' ? 'active' : ''}`} onClick={() => setActiveArchNode('vault')}>
                    <rect className="mini-node-bg" x="400" y="195" width="85" height="50" rx="6" />
                    <text className="mini-node-text" x="442" y="225">vault/</text>
                  </g>
                </svg>
              </div>
              
              <div className="arch-panel-desc">
                <h4>{archSpecs[activeArchNode]?.title}</h4>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0' }}>
                  {archSpecs[activeArchNode]?.desc}
                </p>
              </div>
            </article>

            {/* ==================== PAGE: TRAVERSAL ==================== */}
            <article id="traversal" className={`doc-section ${activeSection === 'traversal' ? 'active' : ''}`}>
              <div className="doc-metadata-bar">
                <span className="doc-category">Core Concepts</span>
                <button className="btn-copy-page" onClick={() => handleCopyPageLink('traversal')}>
                  {copiedLinkSec === 'traversal' ? 'Link copied' : 'Copy link'}
                </button>
              </div>
              
              <h1>Graph Traversal BFS</h1>
              <p>
                When an AI agent requests context, Vaxis performs an incremental Breadth-First Search (BFS) across import links. Starting from the target node, Vaxis performs a BFS traversal up to the user-specified depth limit:
              </p>
              <ul>
                <li><strong>At depth 0:</strong> It includes the target file's raw content.</li>
                <li><strong>At depth 1:</strong> It includes the first-degree neighbors (all files that import the target, or that the target imports).</li>
                <li><strong>At depth N:</strong> It traverses deeper down the import dependency tree.</li>
              </ul>
              
              <h2>Slicing Mechanics</h2>
              <p>
                If the lines flag is active, Vaxis doesn't output the full content of neighboring nodes. Instead, it extracts:
              </p>
              <ul>
                <li>Only the specific line ranges containing referenced classes, functions, or CSS variables.</li>
                <li>Raw file paths, structural metadata, and wiki-links are compacted into short, single-line summaries.</li>
                <li>This creates the ideal LLM prompt payload: high-density code references with zero surrounding boilerplate.</li>
              </ul>
              
              <CodeBlock filename="Terminal CLI" code="vaxis context style_ink.css --depth 1 --lines" />
            </article>

            {/* ==================== PAGE: TOKEN MATH ==================== */}
            <article id="token-math" className={`doc-section ${activeSection === 'token-math' ? 'active' : ''}`}>
              <div className="doc-metadata-bar">
                <span className="doc-category">Core Concepts</span>
                <button className="btn-copy-page" onClick={() => handleCopyPageLink('token-math')}>
                  {copiedLinkSec === 'token-math' ? 'Link copied' : 'Copy link'}
                </button>
              </div>
              
              <h1>Token Savings Math</h1>
              <p>
                Vaxis is designed to maximize Prompt Token Efficiency, reducing prompt bloat mathematically by limiting neighbor modules to clean, context-relevant slices.
              </p>
              
              <h2>1. The Cost of Blind Scanning (Without Vaxis)</h2>
              <p>
                To complete a multi-file refactor, a standard AI agent reads entire files in order to understand selectors and dependencies:
              </p>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: 'var(--color-gold-light)', marginBottom: '0.75rem' }}>
                Baseline Prompt Bloat = Sum of Size(File) + Search Noise
              </p>
              <p>
                If the agent reads 5 files of 800 lines each (~25,000 characters per file):
              </p>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: 'var(--color-gold-light)', marginBottom: '0.75rem' }}>
                Input Characters = 5 * 25,000 + 4,000 (Directory scans) = 129,000 characters
              </p>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: 'var(--color-gold-light)', marginBottom: '1.25rem' }}>
                Prompt Tokens = 129,000 / 4 characters/token = 32,250 input tokens
              </p>
              
              <h2>2. The Cost of Graph Slicing (With Vaxis)</h2>
              <p>
                By using Vaxis context slicing, the agent receives only the annotated index and exact line ranges:
              </p>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: 'var(--color-gold-light)', marginBottom: '0.75rem' }}>
                GGAN Prompt Bloat = Size(File_target) + Sum of Slice(Neighbor)
              </p>
              <p>
                Vaxis slices neighboring files to only their relevant lines (~2,500 characters per slice):
              </p>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: 'var(--color-gold-light)', marginBottom: '0.75rem' }}>
                Input Characters = 25,000 (Target file) + 4 * 2,500 (Sliced neighbors) = 35,000 characters
              </p>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: 'var(--color-gold-light)', marginBottom: '1.25rem' }}>
                Prompt Tokens = 35,000 / 4 characters/token = 8,750 input tokens
              </p>
              
              <p>
                This achieves a total savings of <strong>72.8% Token Cost Reduction</strong>.
              </p>
              
              <h2>Live Math Estimator</h2>
              <p>
                Adjust sliders below to see prompt token reductions dynamically.
              </p>
              
              <div className="inline-calc">
                <div className="inline-calc-sliders">
                  
                  <div className="slider-group">
                    <div className="slider-header">
                      <span>Files in refactor sweep</span>
                      <span className="slider-value">{calcFiles}</span>
                    </div>
                    <input 
                      type="range" 
                      className="inline-slider" 
                      min="2" 
                      max="15" 
                      value={calcFiles}
                      onChange={(e) => setCalcFiles(parseInt(e.target.value))}
                    />
                  </div>
                  
                  <div className="slider-group">
                    <div className="slider-header">
                      <span>Avg file size (lines)</span>
                      <span className="slider-value">{calcLines}</span>
                    </div>
                    <input 
                      type="range" 
                      className="inline-slider" 
                      min="100" 
                      max="2000" 
                      step="50" 
                      value={calcLines}
                      onChange={(e) => {
                        const newLines = parseInt(e.target.value);
                        setCalcLines(newLines);
                        if (calcSlice > newLines) {
                          setCalcSlice(newLines);
                        }
                      }}
                    />
                  </div>
                  
                  <div className="slider-group">
                    <div className="slider-header">
                      <span>Neighbor sliced limit (lines)</span>
                      <span className="slider-value">{calcSlice}</span>
                    </div>
                    <input 
                      type="range" 
                      className="inline-slider" 
                      min="10" 
                      max={calcLines} 
                      step="10" 
                      value={calcSlice}
                      onChange={(e) => setCalcSlice(parseInt(e.target.value))}
                    />
                  </div>
                  
                </div>
                
                <div className="inline-calc-result">
                  <div style={{ fontSize: '0.8rem', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>Calculated Token Reduction</div>
                  <div style={{ fontFamily: 'var(--font-header)', fontSize: '2.25rem', color: 'var(--color-gold-light)', fontWeight: '500' }}>
                    {computedValues.pct}% saved
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '1rem', borderTop: '1px dashed var(--border-color)', paddingTop: '0.5rem', width: '100%', textAlign: 'center' }}>
                    Standard: <span style={{ fontFamily: 'var(--font-mono)' }}>{computedValues.baseline}</span> vs Vaxis: <span style={{ fontFamily: 'var(--font-mono)' }}>{computedValues.vaxis}</span>
                  </div>
                </div>
              </div>
            </article>

            {/* ==================== PAGE: CLI REFERENCE ==================== */}
            <article id="cli" className={`doc-section ${activeSection === 'cli' ? 'active' : ''}`}>
              <div className="doc-metadata-bar">
                <span className="doc-category">Developer Guide</span>
                <button className="btn-copy-page" onClick={() => handleCopyPageLink('cli')}>
                  {copiedLinkSec === 'cli' ? 'Link copied' : 'Copy link'}
                </button>
              </div>
              
              <h1>CLI Command Reference</h1>
              <p>
                A listing of CLI sub-commands and active parameters included in the <code>@vaxis/cli</code> package.
              </p>
              
              <div className="table-container">
                <table className="docs-table">
                  <thead>
                    <tr>
                      <th>Command</th>
                      <th>Parameters / Flags</th>
                      <th>Functional Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td><code>vaxis setup</code></td>
                      <td><code>--vault &lt;path&gt;</code></td>
                      <td>Sets up global configurations, routing target metadata outputs to the Obsidian vault directory.</td>
                    </tr>
                    <tr>
                      <td><code>vaxis init</code></td>
                      <td><code>&lt;project-name&gt;</code></td>
                      <td>Registers a codebase folder with the Vaxis core project mapping configuration.</td>
                    </tr>
                    <tr>
                      <td><code>vaxis add</code></td>
                      <td><code>&lt;path&gt;</code></td>
                      <td>Registers a project at the specified directory path to start tracking its files.</td>
                    </tr>
                    <tr>
                      <td><code>vaxis sync</code></td>
                      <td><code>--force</code></td>
                      <td>Differential scan that updates modified dependencies, writing markdown notes inside the Obsidian vault.</td>
                    </tr>
                    <tr>
                      <td><code>vaxis context</code></td>
                      <td><code>&lt;project-name&gt; &lt;file&gt; [--depth] [--lines]</code></td>
                      <td>Executes BFS directed checks, assembling compressed slices of file contents.</td>
                    </tr>
                    <tr>
                      <td><code>vaxis mcp</code></td>
                      <td>N/A</td>
                      <td>Initiates stdio Model Context Protocol (MCP) JSON-RPC services.</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </article>

            {/* ==================== PAGE: UNDER THE HOOD ==================== */}
            <article id="architecture" className={`doc-section ${activeSection === 'architecture' ? 'active' : ''}`}>
              <div className="doc-metadata-bar">
                <span className="doc-category">Developer Guide</span>
                <button className="btn-copy-page" onClick={() => handleCopyPageLink('architecture')}>
                  {copiedLinkSec === 'architecture' ? 'Link copied' : 'Copy link'}
                </button>
              </div>
              
              <h1>Under the Hood</h1>
              <p>
                Vaxis is designed as a modular, lightweight Node.js utility.
              </p>
              
              <h2>File-by-File Breakdown</h2>
              <div className="table-container">
                <table className="docs-table">
                  <thead>
                    <tr>
                      <th>File Component</th>
                      <th>Design Responsibility</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td><code>src/cli.js</code></td>
                      <td>Pipes commander-based arguments directly to their respective handlers. It manages flags, parameters, and interactive prompts. It exposes the user interfaces for setup, init, add, sync, context, and mcp.</td>
                    </tr>
                    <tr>
                      <td><code>src/pipeline.js</code></td>
                      <td>Orchestrates the entire data-ingestion pipeline. When a project is scanned, the pipeline coordinates the Scanner, Parser, Cache Manager, and Linker sequentially to compile the semantic graph.</td>
                    </tr>
                    <tr>
                      <td><code>src/scanner.js</code></td>
                      <td>Uses glob-based matching to traverse the directory. It automatically respects .gitignore rules, completely ignoring binary files, image assets, built bundles (dist/, build/), and dependency directories (node_modules/).</td>
                    </tr>
                    <tr>
                      <td><code>src/parsers/index.js</code></td>
                      <td>Inspects file extensions and dispatches the file to its specialized parser.</td>
                    </tr>
                    <tr>
                      <td><code>src/parsers/babel.js</code></td>
                      <td>The core JS analyzer. Uses @babel/parser to convert raw Javascript files into an Abstract Syntax Tree (AST) and @babel/traverse to extract imports, exports, and internal nodes.</td>
                    </tr>
                    <tr>
                      <td><code>src/parsers/plaintext.js</code></td>
                      <td>A fallback parser for plain text, CSS, HTML, and Markdown files, extracting key selectors and basic configurations.</td>
                    </tr>
                    <tr>
                      <td><code>src/linker.js</code></td>
                      <td>Takes AST extractions and builds a Directed Graph. Edges are imports, nodes are files. Resolves relative imports, builds double-bracket wikilinks, and detects cross-project overlaps.</td>
                    </tr>
                    <tr>
                      <td><code>src/cache.js</code></td>
                      <td>Maintains a local cache based on file system change times. During a vaxis sync, only files that have been modified since the last index are parsed, reducing subsequent scan times from minutes to less than 200ms.</td>
                    </tr>
                    <tr>
                      <td><code>src/vault/writer.js</code></td>
                      <td>Orchestrates the creation of markdown notes in the Obsidian vault under project directories.</td>
                    </tr>
                    <tr>
                      <td><code>src/vault/brain.js</code></td>
                      <td>Compiles the central index _brain.md file, which maps all registered projects across the entire system.</td>
                    </tr>
                    <tr>
                      <td><code>src/vault/noteTemplate.js</code></td>
                      <td>Standardizes note formats, generating YAML frontmatter, lists of exposed functions/exports, active dependencies, and clean backlinks.</td>
                    </tr>
                    <tr>
                      <td><code>src/commands/context.js</code></td>
                      <td>Executes BFS directed checks, assembling compressed slices of file contents.</td>
                    </tr>
                    <tr>
                      <td><code>src/commands/mcp.js</code></td>
                      <td>Boots the local stdio JSON-RPC server. Conforms to Model Context Protocol, exposing list_projects, sync_project, search_notes, and get_context tools.</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <h2>Performance Suitability Matrix</h2>
              <div className="table-container">
                <table className="docs-table">
                  <thead>
                    <tr>
                      <th>Codebase / Task Scenario</th>
                      <th>Performance</th>
                      <th>Why?</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td><strong>Complex Multi-File Refactors</strong></td>
                      <td>Outperforms standard agents</td>
                      <td>The agent instantly traces import paths across multiple files without guess-reading files or running blind greps.</td>
                    </tr>
                    <tr>
                      <td><strong>Legacy Codebase Navigation</strong></td>
                      <td>Outperforms standard agents</td>
                      <td>Quickly maps out undocumented dependencies and lets the agent target variables with absolute precision.</td>
                    </tr>
                    <tr>
                      <td><strong>High-Difficulty Bug Fixing</strong></td>
                      <td>Outperforms standard agents</td>
                      <td>Pinpoints exact function definitions and class inheritance relationships across separate files.</td>
                    </tr>
                    <tr>
                      <td><strong>Single-File Small CSS Tweaks</strong></td>
                      <td>Average / Neutral</td>
                      <td>The minor token overhead of loading Vaxis rules is paid on the first turn, yielding neutral returns for ultra-small, single-file edits.</td>
                    </tr>
                    <tr>
                      <td><strong>Isolated Code Formatting</strong></td>
                      <td>Not Recommended</td>
                      <td>Trivially simple edits (like indentation or formatting) do not require graph-awareness; Vaxis setup is unnecessary here.</td>
                    </tr>
                    <tr>
                      <td><strong>Binary Assets / Media Editing</strong></td>
                      <td>Strict Limitation</td>
                      <td>Vaxis is a text-based semantic parser; it does not parse or index images, compiled binaries, or zip archives.</td>
                    </tr>
                    <tr>
                      <td><strong>Sandboxed / Cloud IDEs</strong></td>
                      <td>Strict Limitation</td>
                      <td>If the AI agent is running in a fully sandboxed environment with no terminal execution access, it cannot execute vaxis CLI queries.</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </article>

            {/* ==================== PAGE: A/B TRIALS ==================== */}
            <article id="trials" className={`doc-section ${activeSection === 'trials' ? 'active' : ''}`}>
              <div className="doc-metadata-bar">
                <span className="doc-category">Empirical Proof</span>
                <button className="btn-copy-page" onClick={() => handleCopyPageLink('trials')}>
                  {copiedLinkSec === 'trials' ? 'Link copied' : 'Copy link'}
                </button>
              </div>
              
              <h1>A/B Developer Trials</h1>
              <p>
                These empirical trials compare native LLM assistant execution (Without Vaxis) against graph-guided BFS slicing (With Vaxis).
              </p>
              
              <h2>Trial 1: CSS Scroll Progress Bar</h2>
              <ul className="spaced-list">
                <li><strong>Objective:</strong> Change the top scroll progress bar thickness to 6px, apply an imperial gold pigment gradient, and add a gold neon glow shadow.</li>
                <li><strong>The Prompt:</strong> "Change the top scroll progress bar to have a thickness of 6px, and color it with a linear gradient of imperial gold pigment (Ochre Gold) with a gold neon glow shadow."</li>
                <li><strong>A/B Logs Path:</strong> VS Code Chat Session logs database.</li>
                <li><strong>Execution Comparison (Without Vaxis):</strong> Lacking codebase context, the agent called <code>grep_search</code> twice seeking "scroll-progress" across the entire codebase (returning 50+ lines of node_modules noise). It then had to blindly read <code>style_ink.css</code> before writing the code.</li>
                <li><strong>Execution Comparison (With Vaxis):</strong> The agent instantly executed <code>vaxis context style_ink.css</code> in its terminal, retrieved the exact lines, and patched <code>.scroll-progress-bar</code> directly with zero guesswork.</li>
              </ul>
              
              <h3>Metrics Comparison</h3>
              <div className="table-container">
                <table className="docs-table">
                  <thead>
                    <tr>
                      <th>Parameter</th>
                      <th>Without Vaxis (Baseline)</th>
                      <th>With Vaxis (GGAN Enabled)</th>
                      <th>Delta / Savings</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Prompt Input Tokens</td>
                      <td>23,136 tokens</td>
                      <td>23,550 tokens</td>
                      <td>+1.7% (Cold-start setup)</td>
                    </tr>
                    <tr>
                      <td>Completion Output Tokens</td>
                      <td>1,001 tokens</td>
                      <td>320 tokens</td>
                      <td>68.0% (681 tokens saved)</td>
                    </tr>
                    <tr>
                      <td>Exploratory scans</td>
                      <td>2 blind greps + 1 file read</td>
                      <td>0 (targeted directly)</td>
                      <td>100% Eliminated</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              
              <h2>Trial 2: Multi-File Structural Navigation</h2>
              <ul className="spaced-list">
                <li><strong>Objective:</strong> Apply a 3-part layout adjustment involving keyframe pulsing borders on customizer swatches, GSAP scale-up timelines on the main car image container, and active-state JS click event listeners.</li>
                <li><strong>A/B Logs Path:</strong> <code>c8350eb1-63c7-4aaf-9020-a9fa05fcbd87.jsonl</code> (Without) vs <code>9a570741-6a62-4ecc-9ffb-0c84c4ba459d.jsonl</code> (With Vaxis)</li>
                <li><strong>Execution Comparison (Without Vaxis):</strong> Copilot had to execute 31 rounds of active loops split across three separate user messages. It blindly scanned directories (<code>grep_search</code> and <code>read_file</code> repeatedly) to find the navigation styles and selector scripts.</li>
                <li><strong>Execution Comparison (With Vaxis):</strong> Copilot loaded .ai-rules, triggered <code>vaxis context</code> with <code>--lines</code> and <code>--multi</code> in its terminal, and got the precise target points. By combining the 3 parts into a single consolidated request, the agent bypassed exploratory searching and focused exclusively on patching code.</li>
              </ul>
              
              <h3>Metrics Comparison</h3>
              <div className="table-container">
                <table className="docs-table">
                  <thead>
                    <tr>
                      <th>Parameter</th>
                      <th>Without Vaxis (Baseline)</th>
                      <th>With Vaxis (GGAN Enabled)</th>
                      <th>Delta / Savings</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>LLM Call Round-Trips</td>
                      <td>31 rounds</td>
                      <td>22 rounds</td>
                      <td>29.0% (9 rounds saved)</td>
                    </tr>
                    <tr>
                      <td>Prompt Input Tokens</td>
                      <td>115,317 tokens</td>
                      <td>83,480 tokens</td>
                      <td>27.6% (31,837 tokens saved)</td>
                    </tr>
                    <tr>
                      <td>Completion Output Tokens</td>
                      <td>2,025 tokens</td>
                      <td>994 tokens</td>
                      <td>50.9% (1,031 tokens saved)</td>
                    </tr>
                    <tr>
                      <td>Blind Code Search Tools</td>
                      <td>31 tool calls</td>
                      <td>22 tool calls</td>
                      <td>29.0%</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <h2>Trial 3: Five-File Premium Day/Night Theme Refactor</h2>
              <ul className="spaced-list">
                <li><strong>Objective:</strong> Implement a premium, animated day/night theme toggle requiring synchronized modifications across 5 separate JS, HTML, and CSS files (<code>style_ink.css</code>, <code>components_ink.css</code>, <code>nav_interactions.js</code>, <code>parallax_animations.js</code>, <code>index.html</code>).</li>
                <li><strong>A/B Logs Path:</strong> <code>397bf825-a271-48e4-b173-fd99e9cb5d10</code> (Baseline) vs <code>7d9270cf-4e3b-4438-9be8-c4f2bbea9c0e</code> (GGAN with Vaxis MCP)</li>
                <li><strong>Execution Comparison (Without Vaxis):</strong> Lacking an orienting semantic layer, the baseline agent performed a highly fragmented discovery and edit cycle. It had to execute 21 separate <code>view_file</code> calls to locate the exact styling properties across <code>components_ink.css</code> and <code>style_ink.css</code>, repeatedly reading code and guessing ranges. When making edits, it wrote changes in 22 micro-patches rather than larger blocks, wasting loops on small line changes.</li>
                <li><strong>Execution Comparison (With Vaxis):</strong> Armed with Vaxis MCP integration and oriented by the .ai-rules structure, the GGAN agent operated with far higher structural discipline. It completed the complex 5-file refactor in only 15 file reads and 18 patches (consolidating related changes and avoiding trial-and-error editing).</li>
              </ul>
              
              <h3>Metrics Comparison</h3>
              <div className="table-container">
                <table className="docs-table">
                  <thead>
                    <tr>
                      <th>Parameter</th>
                      <th>Without Vaxis (Baseline)</th>
                      <th>With Vaxis (GGAN Enabled)</th>
                      <th>Delta / Savings</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Est. Input Tokens</td>
                      <td>26,217 tokens</td>
                      <td>22,989 tokens</td>
                      <td>12.3% (3,228 tokens saved)</td>
                    </tr>
                    <tr>
                      <td>Est. Total Tokens</td>
                      <td>31,200 tokens</td>
                      <td>27,797 tokens</td>
                      <td>10.9% (3,403 tokens saved)</td>
                    </tr>
                    <tr>
                      <td>Total Tool Invocations</td>
                      <td>50 calls</td>
                      <td>42 calls</td>
                      <td>16.0% (8 calls saved)</td>
                    </tr>
                    <tr>
                      <td>View File / Read Calls</td>
                      <td>21 calls</td>
                      <td>15 calls</td>
                      <td>28.5% (6 redundant reads saved)</td>
                    </tr>
                    <tr>
                      <td>Code Edit / Patch Calls</td>
                      <td>22 calls</td>
                      <td>18 calls</td>
                      <td>18.1% (4 micro-patches saved)</td>
                    </tr>
                    <tr>
                      <td>LLM Round-Trips (Planner)</td>
                      <td>52 steps</td>
                      <td>45 steps</td>
                      <td>13.4% (7 steps saved)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </article>

            {/* ==================== PAGE: LOG ANALYZER ==================== */}
            <article id="log-analyzer" className={`doc-section ${activeSection === 'log-analyzer' ? 'active' : ''}`}>
              <div className="doc-metadata-bar">
                <span className="doc-category">Empirical Proof</span>
                <button className="btn-copy-page" onClick={() => handleCopyPageLink('log-analyzer')}>
                  {copiedLinkSec === 'log-analyzer' ? 'Link copied' : 'Copy link'}
                </button>
              </div>
              
              <h1>Diagnostics Utility</h1>
              <p>
                To compile the exact comparative metrics and verify our findings with absolute academic rigor, we wrote a specialized Node.js log-parsing script (<code>analyze_trial12.js</code>).
              </p>
              
              <h2>1. Logging Infrastructure</h2>
              <p>
                During execution, the Antigravity IDE writes every step, tool invocation, and API interaction into a structured JSON Lines (.jsonl) file named transcript.jsonl inside the local session directory:
              </p>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: 'var(--color-gold-light)', marginBottom: '1.25rem' }}>
                %USERPROFILE%\.gemini\antigravity-ide\brain\[session-id]\.system_generated\logs\transcript.jsonl
              </p>
              
              <h2>2. The Parsing Algorithm</h2>
              <p>
                The <code>analyze_trial12.js</code> script processes the .jsonl logs line-by-line:
              </p>
              <ol>
                <li><strong>Timestamp tracking:</strong> Captures the ISO timestamp of the first user message and the final agent response, calculating the exact duration in seconds.</li>
                <li><strong>Token Estimation:</strong> Characters inside user prompts, system declarations, and tool return payloads are parsed to calculate the Input Token count (using the standard 4 characters per token ratio). Characters inside the agent's thinking tags and markdown outputs are parsed to calculate the Output Token count.</li>
                <li><strong>Tool Classification:</strong> Matches every tool call to its respective name (e.g., call_mcp_tool, view_file, grep_search, replace_file_content) to count exact tool usage metrics, revealing the exact exploration vs. patching behavioral breakdown.</li>
              </ol>
              
              <h2>Diagnostics Log Terminal</h2>
              <p>
                Trigger the simulated diagnostics trace sandbox below to see log analysis in action.
              </p>
              
              <div className="inline-term">
                <div className="term-header">
                  <span className="term-header-title">bash — analyze_trial12.js — node</span>
                </div>
                <div className="term-body" ref={termBodyRef}>
                  {terminalLogs.length === 0 ? (
                    <div className="term-input-line">
                      <span className="term-prompt">vaxis-docs&gt;</span>
                      <span>Press the button below to initiate simulated trace diagnostics...</span>
                    </div>
                  ) : (
                    terminalLogs.map((log, idx) => (
                      <div key={idx}>
                        {log.type === 'input' ? (
                          <div className="term-input-line">
                            <span className="term-prompt">vaxis-docs&gt;</span>
                            <span>{log.text}</span>
                          </div>
                        ) : (
                          <div className={`term-output ${log.type}`}>
                            {log.text}
                          </div>
                        )}
                      </div>
                    ))
                  )}
                </div>
                <button 
                  className="term-btn-run" 
                  disabled={isTraceRunning}
                  onClick={runTraceSimulator}
                >
                  {isTraceRunning ? 'Simulating trace...' : 'Run Trace Simulator'}
                </button>
              </div>
            </article>

            {/* Bottom Inline Ask Bar */}
            <div className="inline-ask-wrapper">
              <div className="inline-ask-bar" onClick={() => setChatOpen(true)}>
                <span className="ask-placeholder">Ask Vaxis Assistant...</span>
                <span className="ask-kbd">Ctrl I</span>
              </div>
            </div>

          </div>
        </main>

        {/* Right Sidebar: On This Page Table of Contents */}
        <aside className="right-sidebar">
          <div className="toc-title">On this page</div>
          <ul className="toc-list">
            {tocHeadings.length === 0 ? (
              <li className="toc-item">
                <span className="toc-item-link">On this page</span>
              </li>
            ) : (
              tocHeadings.map(h => (
                <li key={h.id} className="toc-item">
                  <button 
                    onClick={() => {
                      const el = document.getElementById(h.id);
                      if (el) {
                        if (typeof el.scrollIntoView === 'function') {
                          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        }
                      }
                      setActiveTocId(h.id);
                    }}
                    className={`toc-item-link ${activeTocId === h.id ? 'active' : ''}`}
                    style={{ background: 'transparent', border: 'none', cursor: 'pointer', padding: 0, textAlign: 'left' }}
                  >
                    {h.text}
                  </button>
                </li>
              ))
            )}
          </ul>
        </aside>

      </div>

      {/* Floating Ask AI Chat Console */}
      <div className={`ask-ai-widget ${chatOpen ? 'active' : ''}`}>
        <div className="chat-header">
          <span className="chat-title">Vaxis Assistant</span>
          <button className="chat-close" onClick={() => setChatOpen(false)}>✕</button>
        </div>
        <div className="chat-messages">
          {chatMessages.map((msg, idx) => (
            <div key={idx} className={`chat-message ${msg.role}`}>
              {msg.content}
            </div>
          ))}
          <div ref={chatMessagesEndRef} />
        </div>
        
        <div className="chat-input-area">
          <input 
            type="text" 
            className="chat-text-input" 
            placeholder="Ask a question about Vaxis..."
            value={chatInputText}
            onChange={(e) => setChatInputText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                handleSendChat();
              }
            }}
          />
          <button className="btn-chat-send" onClick={handleSendChat}>Send</button>
        </div>
      </div>

      {/* Search Modal Overlay Dialog */}
      <div className={`search-modal ${searchOpen ? 'active' : ''}`} onClick={(e) => {
        if (e.target.classList.contains('search-modal')) {
          setSearchOpen(false);
        }
      }}>
        <div className="search-dialog">
          <div className="modal-search-header">
            <span style={{ color: 'var(--text-muted)', marginRight: '8px' }}>Search</span>
            <input 
              type="text" 
              className="modal-search-input" 
              placeholder="Search page manuals..."
              ref={searchInputRef}
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </div>
          <ul className="modal-results">
            {searchQuery.trim().length > 0 && searchResults.length === 0 && (
              <li className="modal-result-item">
                <div className="modal-result-title" style={{ color: 'var(--text-muted)' }}>
                  No documentation pages matched.
                </div>
              </li>
            )}
            {searchResults.map(page => (
              <li key={page.id} className="modal-result-item" onClick={() => {
                handlePageSwitch(page.id);
                setSearchOpen(false);
              }}>
                <div className="modal-result-title">{page.title}</div>
                <div className="modal-result-desc">{page.desc}</div>
              </li>
            ))}
          </ul>
        </div>
      </div>

    </div>
  );
}

// Sub-component for code copying to avoid state pollution
function CodeBlock({ filename, code }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="code-block-container">
      <div className="code-header">
        <span className="code-filename">{filename}</span>
        <button className="btn-copy-code" onClick={handleCopy}>
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>
      <pre><code>{code}</code></pre>
    </div>
  );
}
