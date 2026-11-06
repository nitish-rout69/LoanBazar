import React, { useState, useEffect, useMemo, useRef } from 'react';
import {
  ShieldCheck,
  TrendingUp,
  Percent,
  Calculator,
  Compass,
  ArrowRight,
  CheckCircle2,
  DollarSign,
  Briefcase,
  Home,
  GraduationCap,
  Car,
  Bike,
  Coins,
  ChevronRight,
  ChevronDown,
  Info,
  Sliders,
  Users,
  Award,
  Lock,
  Headphones,
  Search,
  Moon,
  Sun,
  Menu,
  X,
  FileText,
  AlertCircle,
  HelpCircle,
  PhoneCall,
  Clock,
  Sparkles,
  Layers,
  ArrowUpRight,
  Download,
  Share2,
  Check,
  Building2,
  ExternalLink,
  MessageCircle,
  BarChart3,
  User,
  Bell,
  Calendar,
  Send,
  Zap,
  ChevronUp
} from 'lucide-react';

// ==========================================
// STATIC DATA & CONFIGURATION
// ==========================================

const LOAN_PRODUCTS = [
  {
    id: 'personal',
    name: 'Personal Loan',
    category: 'Unsecured',
    tag: 'Instant Disbursal',
    icon: User,
    color: 'from-blue-500 to-indigo-600',
    accentBg: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20',
    minRate: 10.49,
    maxRate: 16.5,
    minAmount: 50000,
    maxAmount: 4000000,
    minTenure: 12,
    maxTenure: 60,
    processingFee: '0.5% - 2.5%',
    turnaround: '24 Hours',
    description: 'Instant liquidity for lifestyle upgrades, emergency medical expenses, or debt consolidation with zero collateral.',
    features: ['Minimal documentation', 'No collateral required', 'Flexible part-prepayment']
  },
  {
    id: 'business',
    name: 'Business Growth Loan',
    category: 'Commercial',
    tag: 'Fuel Your Expansion',
    icon: Briefcase,
    color: 'from-purple-500 to-violet-600',
    accentBg: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
    minRate: 11.99,
    maxRate: 18.0,
    minAmount: 200000,
    maxAmount: 25000000,
    minTenure: 12,
    maxTenure: 84,
    processingFee: '1.0% - 2.0%',
    turnaround: '48 Hours',
    description: 'Working capital, machinery acquisition, and scale-up financing designed for agile MSMEs and established startups.',
    features: ['Collateral-free up to ₹50L', 'Overdraft facilities', 'High loan limits']
  },
  {
    id: 'home',
    name: 'Home Loan',
    category: 'Secured',
    tag: 'Lowest APRs',
    icon: Home,
    color: 'from-emerald-500 to-teal-600',
    accentBg: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    minRate: 8.35,
    maxRate: 10.25,
    minAmount: 1000000,
    maxAmount: 100000000,
    minTenure: 60,
    maxTenure: 360,
    processingFee: '₹5,000 flat or 0.25%',
    turnaround: '3-5 Days',
    description: 'Competitive interest rates and long tenures for purchasing, constructing, or transferring existing home mortgages.',
    features: ['PMAY subsidy eligible', 'Up to 30 years tenure', 'Free balance transfer audit']
  },
  {
    id: 'lap',
    name: 'Loan Against Property',
    category: 'Secured',
    tag: 'High Value Liquidity',
    icon: Building2,
    color: 'from-amber-500 to-orange-600',
    accentBg: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    minRate: 9.15,
    maxRate: 12.0,
    minAmount: 1500000,
    maxAmount: 75000000,
    minTenure: 36,
    maxTenure: 180,
    processingFee: '0.75% - 1.5%',
    turnaround: '5-7 Days',
    description: 'Unlock the latent equity trapped in your residential or commercial real estate while retaining full property ownership.',
    features: ['Up to 70% property valuation', 'Lower interest rates', 'Multi-purpose usability']
  },
  {
    id: 'education',
    name: 'Global Education Loan',
    category: 'Specialized',
    tag: 'Study Abroad Support',
    icon: GraduationCap,
    color: 'from-cyan-500 to-blue-600',
    accentBg: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
    minRate: 9.5,
    maxRate: 13.0,
    minAmount: 300000,
    maxAmount: 15000000,
    minTenure: 24,
    maxTenure: 180,
    processingFee: 'Up to 1%',
    turnaround: '48 Hours',
    description: 'Comprehensive financial coverage covering tuition fees, living expenses, visas, and travel for top global universities.',
    features: ['Moratorium period benefits', 'Tax deductions u/s 80E', '100% tuition coverage']
  },
  {
    id: 'car',
    name: 'New & Used Car Loan',
    category: 'Vehicle',
    tag: 'Up to 100% On-Road',
    icon: Car,
    color: 'from-rose-500 to-pink-600',
    accentBg: 'bg-rose-500/10 text-rose-400 border-rose-500/20',
    minRate: 8.75,
    maxRate: 11.5,
    minAmount: 200000,
    maxAmount: 10000000,
    minTenure: 12,
    maxTenure: 84,
    processingFee: '₹2,500 - 0.5%',
    turnaround: 'Same Day',
    description: 'Drive away in your dream car with instant digital sanctum, zero foreclosure charges on select banks, and on-road funding.',
    features: ['Up to 100% on-road funding', 'Quick online sanction', 'Custom step-up EMIs']
  },
  {
    id: 'twowheeler',
    name: 'Two-Wheeler Loan',
    category: 'Vehicle',
    tag: 'Superfast Approval',
    icon: Bike,
    color: 'from-sky-500 to-cyan-600',
    accentBg: 'bg-sky-500/10 text-sky-400 border-sky-500/20',
    minRate: 9.99,
    maxRate: 16.0,
    minAmount: 30000,
    maxAmount: 500000,
    minTenure: 12,
    maxTenure: 48,
    processingFee: '₹999 flat',
    turnaround: '2 Hours',
    description: 'Special financing for standard motorcycles, super-bikes, and EV two-wheelers with low down payment schemes.',
    features: ['Special green EV rates', 'Minimal KYC requirement', 'Instant dealer disbursal']
  },
  {
    id: 'gold',
    name: 'Gold Loan Online',
    category: 'Secured',
    tag: 'Doorstep Valuation',
    icon: Coins,
    color: 'from-yellow-400 to-amber-600',
    accentBg: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
    minRate: 8.9,
    maxRate: 14.0,
    minAmount: 25000,
    maxAmount: 5000000,
    minTenure: 6,
    maxTenure: 36,
    processingFee: '0.25% or NIL',
    turnaround: '30 Minutes',
    description: 'Instant liquidity against gold jewellery with secure vault storage, insured doorstep valuation, and bullet repayment options.',
    features: ['Doorstep cash/transfer', 'Free safe locker storage', 'Bullet repayment options']
  }
];

const LENDING_PARTNERS = [
  { name: 'HDFC Bank', tier: 'Top Private', rating: '4.9/5', turnaround: '24 hrs', logoText: 'HDFC' },
  { name: 'ICICI Bank', tier: 'Top Private', rating: '4.8/5', turnaround: '36 hrs', logoText: 'ICICI' },
  { name: 'State Bank of India', tier: 'Public Sector', rating: '4.7/5', turnaround: '3-4 days', logoText: 'SBI' },
  { name: 'Axis Bank', tier: 'Top Private', rating: '4.8/5', turnaround: '24 hrs', logoText: 'AXIS' },
  { name: 'Bajaj Finserv', tier: 'NBFC Leader', rating: '4.9/5', turnaround: '12 hrs', logoText: 'BAJAJ' },
  { name: 'Kotak Mahindra', tier: 'Top Private', rating: '4.7/5', turnaround: '24 hrs', logoText: 'KOTAK' },
  { name: 'Tata Capital', tier: 'NBFC', rating: '4.8/5', turnaround: '24 hrs', logoText: 'TATA' },
  { name: 'Aditya Birla Capital', tier: 'NBFC', rating: '4.6/5', turnaround: '48 hrs', logoText: 'ABCL' }
];

const WHY_CHOOSE_US = [
  {
    icon: Building2,
    title: '40+ Lending Partners',
    desc: 'Unbiased matching engine checks prime public/private banks and top tier NBFCs simultaneously.'
  },
  {
    icon: Percent,
    title: 'Lowest APR Guarantee',
    desc: 'Proprietary quote comparison ensures you secure real market-bottom interest rates without hidden marks.'
  },
  {
    icon: Zap,
    title: 'Lightning 24hr Disbursals',
    desc: 'End-to-end digital underwriting workflow cuts standard multi-week banking delays to hours.'
  },
  {
    icon: FileText,
    title: 'Paperless Digital KYC',
    desc: 'Biometric, DigiLocker, and Account Aggregator integrations eliminate tedious physical document runs.'
  },
  {
    icon: Lock,
    title: 'Bank-Grade 256-bit AES',
    desc: 'ISO 27001 compliant security framework. We never sell or broadcast your credit profile without consent.'
  },
  {
    icon: Headphones,
    title: 'Dedicated Loan Concierge',
    desc: 'Certified financial case managers guide your application from verification to final account credit.'
  },
  {
    icon: Award,
    title: 'Zero Impact on CIBIL',
    desc: 'Soft inquiries during eligibility checks preserve your credit score until you finalize the exact lender.'
  },
  {
    icon: Clock,
    title: 'Real-Time Radar Tracking',
    desc: 'Live SMS, WhatsApp, and dashboard milestones so you always know where your file currently stands.'
  }
];

const HOW_IT_WORKS = [
  {
    step: '01',
    title: 'Configure Your Needs',
    desc: 'Select your loan category, desired amount, and ideal repayment tenure on our smart calculator.'
  },
  {
    step: '02',
    title: 'Instant Soft-Check',
    desc: 'Provide basic income & KYC details. Our AI checks eligibility across 40+ lenders without hurting your score.'
  },
  {
    step: '03',
    title: 'Compare & Select Offer',
    desc: 'Review side-by-side sanctioned offers with transparent processing fees, interest rates, and loan terms.'
  },
  {
    step: '04',
    title: 'Disbursal to Bank Account',
    desc: 'E-sign sanction documents digitally and receive capital deposited directly into your linked bank account.'
  }
];

const FAQS = [
  {
    q: 'What is Credix and how does this marketplace work?',
    category: 'General',
    a: 'Credix is a technology-first digital loan marketplace that connects credit seekers with India’s leading RBI-registered banks and NBFCs. We are not a direct lender, but an authorized digital facilitator that transparently compares lending criteria to bring you the highest approval probabilities and lowest rates.'
  },
  {
    q: 'Does checking my loan eligibility on Credix lower my CIBIL score?',
    category: 'Eligibility',
    a: 'No! Our initial eligibility assessment triggers a "Soft Credit Pull" that does not adversely affect your credit score. A formal "Hard Inquiry" is only initiated after you review and select a specific bank partner to proceed with their final sanction.'
  },
  {
    q: 'What documents are typically required for instant personal or business loans?',
    category: 'Documents',
    a: 'For salaried individuals: PAN Card, Aadhaar (DigiLocker verified), last 3 months salary slips, and 6 months bank statements via Account Aggregator. For self-employed individuals: Business registration proof (GST/Udyam), last 2 years audited ITRs, and 12 months primary current account statements.'
  },
  {
    q: 'Can I prepay or foreclose my loan early? Are there penalties?',
    category: 'Repayment',
    a: 'Under Reserve Bank of India (RBI) regulations, floating-rate personal and home loans availed by individual borrowers cannot attract any prepayment or foreclosure penalties. For fixed-rate loans or commercial enterprise facilities, minimal charges (typically 1-3%) may apply based on the specific lender agreement.'
  },
  {
    q: 'How fast can I receive funds once my application is submitted?',
    category: 'Disbursal',
    a: 'For pre-approved personal and two-wheeler loans, disbursals can occur in as little as 2 to 4 hours. Secured facilities like Home Loans and Loans Against Property usually take between 3 to 7 business days due to mandatory legal title and technical property verification.'
  }
];

const BLOG_TIPS = [
  {
    title: 'How to Boost Your CIBIL Score from 650 to 750+ in 90 Days',
    category: 'Credit Health',
    readTime: '4 min read',
    snippet: 'Master credit utilization ratios, timely credit card clearing, and dispute rectification tactics.'
  },
  {
    title: 'Home Loan vs Renting: The Complete 2026 Financial Blueprint',
    category: 'Mortgages',
    readTime: '6 min read',
    snippet: 'A deep quantitative dive into opportunity costs, real estate appreciation, and tax deduction perks.'
  },
  {
    title: 'Debt Consolidation Secrets: Cut Your Combined Monthly EMIs by 35%',
    category: 'Personal Finance',
    readTime: '5 min read',
    snippet: 'Consolidate multiple high-interest credit cards and short-term loans into a single low-APR tranche.'
  }
];

// Helper for Indian Currency Formatting
const formatCurrency = (val) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(val);
};

export default function App() {
  // Theme state
  const [darkMode, setDarkMode] = useState(true);

  // Active view states
  const [activeTab, setActiveTab] = useState('home'); // 'home' | 'products' | 'calculator' | 'eligibility' | 'compare' | 'dashboard' | 'contact'
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Modals
  const [applyModalOpen, setApplyModalOpen] = useState(false);
  const [selectedProductForApply, setSelectedProductForApply] = useState(LOAN_PRODUCTS[0]);
  const [callbackModalOpen, setCallbackModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  // Quick Notification Trigger
  const showToast = (title, message = '') => {
    setToastMessage({ title, message });
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  // Back to top scroll button
  const [showScrollTop, setShowScrollTop] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenApply = (prod = null) => {
    if (prod) setSelectedProductForApply(prod);
    setApplyModalOpen(true);
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 font-sans ${darkMode ? 'bg-[#090D1A] text-slate-100' : 'bg-slate-50 text-slate-800'}`}>
      
      {/* GLOBAL TOAST NOTIFICATION */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-start gap-3 p-4 bg-slate-900/95 border border-indigo-500/40 text-white rounded-2xl shadow-2xl backdrop-blur-xl max-w-sm animate-bounce-subtle">
          <div className="p-2 bg-indigo-500/20 text-indigo-400 rounded-xl">
            <Sparkles className="w-5 h-5" />
          </div>
          <div className="flex-1">
            <h4 className="font-semibold text-sm text-white">{toastMessage.title}</h4>
            {toastMessage.message && <p className="text-xs text-slate-300 mt-0.5">{toastMessage.message}</p>}
          </div>
          <button onClick={() => setToastMessage(null)} className="text-slate-400 hover:text-white">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* SEARCH COMMAND PALETTE MODAL */}
      {searchOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-start justify-center pt-24 px-4">
          <div className="bg-slate-900 border border-slate-700 w-full max-w-xl rounded-2xl shadow-2xl overflow-hidden p-4">
            <div className="flex items-center gap-3 border-b border-slate-800 pb-3">
              <Search className="w-5 h-5 text-indigo-400" />
              <input
                type="text"
                autoFocus
                placeholder="Search loans, calculators, eligibility, or bank rates..."
                className="w-full bg-transparent border-none text-white focus:outline-none placeholder-slate-400 text-base"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button onClick={() => setSearchOpen(false)} className="text-slate-400 hover:text-white p-1">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="mt-4 max-h-72 overflow-y-auto space-y-2">
              {LOAN_PRODUCTS.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.description.toLowerCase().includes(searchQuery.toLowerCase())).map(p => (
                <div
                  key={p.id}
                  onClick={() => {
                    setSelectedProductForApply(p);
                    setSearchOpen(false);
                    handleOpenApply(p);
                  }}
                  className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-800 cursor-pointer transition"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-indigo-500/20 text-indigo-400 rounded-lg">
                      <p.icon className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="font-medium text-white text-sm">{p.name}</p>
                      <p className="text-xs text-slate-400">Starting @ {p.minRate}% p.a. • Up to {formatCurrency(p.maxAmount)}</p>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-500" />
                </div>
              ))}
              {searchQuery && LOAN_PRODUCTS.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase())).length === 0 && (
                <p className="text-center py-6 text-sm text-slate-500">No matching loans or tools found.</p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* NAVBAR */}
      <Navbar
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenApply={() => handleOpenApply()}
        onOpenSearch={() => setSearchOpen(true)}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
      />

      {/* MAIN CONTENT ROUTING / SECTIONS */}
      <main>
        {activeTab === 'home' && (
          <>
            <HeroSection
              onOpenApply={handleOpenApply}
              setActiveTab={setActiveTab}
              showToast={showToast}
            />
            <PartnersMarquee />
            <LoanProductsSection onApply={handleOpenApply} setActiveTab={setActiveTab} />
            <EMICalculatorSection showToast={showToast} onApply={handleOpenApply} />
            <LoanComparisonSection onApply={handleOpenApply} />
            <EligibilityCheckerSection showToast={showToast} onApply={handleOpenApply} />
            <HowItWorksSection />
            <WhyChooseUsSection />
            <DashboardPreviewSection setActiveTab={setActiveTab} />
            <FinancialAdvisorySection showToast={showToast} />
            <FAQSection />
            <CallbackBanner onOpenCallback={() => setCallbackModalOpen(true)} />
          </>
        )}

        {activeTab === 'products' && (
          <div className="pt-28 pb-16 px-4 max-w-7xl mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <span className="px-3 py-1 text-xs font-semibold uppercase tracking-wider text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 rounded-full">
                Tailored Lending Portfolio
              </span>
              <h1 className="text-4xl md:text-5xl font-extrabold mt-3 tracking-tight">
                Financing Solutions Crafted For Every Milestone
              </h1>
              <p className="text-slate-400 mt-4 text-base">
                Discover pre-qualified rates from 40+ premier lending institutions with 100% transparent terms and digital sanctions.
              </p>
            </div>
            <LoanProductsSection onApply={handleOpenApply} setActiveTab={setActiveTab} isFullPage />
          </div>
        )}

        {activeTab === 'calculator' && (
          <div className="pt-28 pb-16 px-4 max-w-7xl mx-auto">
            <EMICalculatorSection showToast={showToast} onApply={handleOpenApply} isFullPage />
          </div>
        )}

        {activeTab === 'eligibility' && (
          <div className="pt-28 pb-16 px-4 max-w-7xl mx-auto">
            <EligibilityCheckerSection showToast={showToast} onApply={handleOpenApply} isFullPage />
          </div>
        )}

        {activeTab === 'compare' && (
          <div className="pt-28 pb-16 px-4 max-w-7xl mx-auto">
            <LoanComparisonSection onApply={handleOpenApply} isFullPage />
          </div>
        )}

        {activeTab === 'dashboard' && (
          <div className="pt-28 pb-16 px-4 max-w-7xl mx-auto">
            <CustomerDashboardView showToast={showToast} onApply={handleOpenApply} />
          </div>
        )}

        {activeTab === 'contact' && (
          <div className="pt-28 pb-16 px-4 max-w-7xl mx-auto">
            <ContactUsSection showToast={showToast} />
          </div>
        )}
      </main>

      {/* FLOATING ACTION BUTTONS */}
      <FloatingWidgets
        onOpenWhatsApp={() => window.open('https://api.whatsapp.com', '_blank')}
        showScrollTop={showScrollTop}
        scrollToTop={scrollToTop}
        onOpenCallback={() => setCallbackModalOpen(true)}
      />

      {/* MULTI-STEP LOAN APPLICATION MODAL */}
      {applyModalOpen && (
        <ApplicationModal
          selectedProduct={selectedProductForApply}
          onClose={() => setApplyModalOpen(false)}
          showToast={showToast}
        />
      )}

      {/* QUICK CALLBACK REQUEST MODAL */}
      {callbackModalOpen && (
        <CallbackModal
          onClose={() => setCallbackModalOpen(false)}
          showToast={showToast}
        />
      )}

      {/* FOOTER */}
      <Footer setActiveTab={setActiveTab} onOpenApply={handleOpenApply} />
    </div>
  );
}

// ==========================================
// 1. NAVBAR COMPONENT
// ==========================================
function Navbar({ darkMode, setDarkMode, activeTab, setActiveTab, onOpenApply, onOpenSearch, mobileMenuOpen, setMobileMenuOpen }) {
  const [scrolled, setScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'products', label: 'Loan Products', hasDropdown: true },
    { id: 'calculator', label: 'EMI Calculator' },
    { id: 'eligibility', label: 'Eligibility' },
    { id: 'compare', label: 'Compare' },
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
      scrolled 
        ? darkMode 
          ? 'bg-[#090D1A]/90 backdrop-blur-md border-b border-slate-800/80 shadow-2xl py-3.5' 
          : 'bg-white/90 backdrop-blur-md border-b border-slate-200 shadow-lg py-3.5'
        : 'bg-transparent py-5'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        
        {/* BRAND LOGO */}
        <div 
          onClick={() => { setActiveTab('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="relative w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-cyan-400 p-[2px] shadow-lg shadow-indigo-500/30 group-hover:shadow-indigo-500/50 transition">
            <div className="w-full h-full bg-[#090D1A] rounded-[10px] flex items-center justify-center">
              <ShieldCheck className="w-6 h-6 text-cyan-400 group-hover:scale-110 transition duration-300" />
            </div>
            <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-emerald-400 rounded-full border-2 border-[#090D1A]"></div>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-xl font-black tracking-tight bg-gradient-to-r from-white via-slate-100 to-indigo-200 bg-clip-text text-transparent">
                CREDIX
              </span>
              <span className="text-[10px] uppercase font-bold tracking-widest px-1.5 py-0.5 rounded bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
                PRO
              </span>
            </div>
            <p className="text-[10px] text-slate-400 tracking-wider font-medium">FINTECH MARKETPLACE</p>
          </div>
        </div>

        {/* DESKTOP NAV LINKS */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
          {navLinks.map((link) => {
            if (link.hasDropdown) {
              return (
                <div 
                  key={link.id} 
                  className="relative"
                  onMouseEnter={() => setDropdownOpen(true)}
                  onMouseLeave={() => setDropdownOpen(false)}
                >
                  <button 
                    onClick={() => setActiveTab('products')}
                    className={`flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium transition ${
                      activeTab === 'products'
                        ? 'text-indigo-400 bg-indigo-500/10'
                        : darkMode ? 'text-slate-300 hover:text-white hover:bg-slate-800/50' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                    }`}
                  >
                    {link.label}
                    <ChevronDown className={`w-3.5 h-3.5 transition duration-200 ${dropdownOpen ? 'rotate-180 text-indigo-400' : ''}`} />
                  </button>

                  {/* Mega Menu Dropdown */}
                  {dropdownOpen && (
                    <div className="absolute top-full left-0 w-80 mt-1 p-2 bg-[#0E1528] border border-slate-700/80 rounded-2xl shadow-2xl backdrop-blur-2xl grid grid-cols-1 gap-1 animate-in fade-in zoom-in-95 duration-150">
                      <div className="px-3 py-2 text-[11px] font-semibold text-slate-400 uppercase tracking-wider border-b border-slate-800">
                        Popular Loan Categories
                      </div>
                      {LOAN_PRODUCTS.map((prod) => (
                        <div
                          key={prod.id}
                          onClick={() => {
                            setActiveTab('products');
                            setDropdownOpen(false);
                          }}
                          className="flex items-center gap-3 p-2 rounded-xl hover:bg-indigo-600/10 hover:border-indigo-500/30 border border-transparent transition cursor-pointer"
                        >
                          <div className={`p-2 rounded-lg ${prod.accentBg}`}>
                            <prod.icon className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="text-xs font-semibold text-white">{prod.name}</div>
                            <div className="text-[10px] text-slate-400">Rates from {prod.minRate}% p.a.</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            }
            return (
              <button
                key={link.id}
                onClick={() => setActiveTab(link.id)}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition ${
                  activeTab === link.id
                    ? 'text-indigo-400 bg-indigo-500/10 font-semibold'
                    : darkMode ? 'text-slate-300 hover:text-white hover:bg-slate-800/50' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                {link.label}
              </button>
            );
          })}
        </nav>

        {/* RIGHT ACTIONS */}
        <div className="hidden sm:flex items-center gap-3">
          {/* Search Trigger */}
          <button
            onClick={onOpenSearch}
            className={`p-2 rounded-xl border transition ${
              darkMode ? 'border-slate-800 bg-slate-900/60 text-slate-300 hover:text-white hover:border-slate-700' : 'border-slate-200 bg-slate-100 text-slate-700 hover:border-slate-300'
            }`}
            title="Search Market"
          >
            <Search className="w-4 h-4" />
          </button>

          {/* Dark / Light Mode Toggle */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className={`p-2 rounded-xl border transition ${
              darkMode ? 'border-slate-800 bg-slate-900/60 text-amber-300 hover:border-slate-700' : 'border-slate-200 bg-slate-100 text-slate-700 hover:border-slate-300'
            }`}
            title="Toggle Theme"
          >
            {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          {/* Primary CTA */}
          <button
            onClick={() => onOpenApply()}
            className="relative group overflow-hidden px-5 py-2.5 rounded-xl font-semibold text-xs tracking-wide uppercase bg-gradient-to-r from-indigo-600 via-indigo-500 to-cyan-500 text-white shadow-lg shadow-indigo-600/30 hover:shadow-indigo-600/50 active:scale-95 transition"
          >
            <span className="relative z-10 flex items-center gap-1.5">
              <span>Apply Now</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition" />
            </span>
          </button>
        </div>

        {/* MOBILE MENU TOGGLE */}
        <div className="flex sm:hidden items-center gap-2">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 text-slate-400 hover:text-white"
          >
            {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* MOBILE FULL-SCREEN DROPDOWN */}
      {mobileMenuOpen && (
        <div className={`lg:hidden px-4 pt-4 pb-6 mt-2 border-b ${
          darkMode ? 'bg-[#090D1A] border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
        }`}>
          <div className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => {
                  setActiveTab(link.id);
                  setMobileMenuOpen(false);
                }}
                className={`text-left px-4 py-2.5 rounded-xl text-sm font-medium transition ${
                  activeTab === link.id
                    ? 'bg-indigo-600 text-white'
                    : 'text-slate-300 hover:bg-slate-800'
                }`}
              >
                {link.label}
              </button>
            ))}
            <div className="pt-3 border-t border-slate-800 flex flex-col gap-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenSearch();
                }}
                className="flex items-center justify-center gap-2 w-full py-2.5 bg-slate-800 rounded-xl text-sm font-medium text-slate-200"
              >
                <Search className="w-4 h-4" /> Search Platform
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenApply();
                }}
                className="flex items-center justify-center gap-2 w-full py-3 bg-gradient-to-r from-indigo-600 to-cyan-500 rounded-xl text-sm font-semibold text-white shadow-lg"
              >
                Apply Now <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

// ==========================================
// 2. HERO SECTION COMPONENT
// ==========================================
function HeroSection({ onOpenApply, setActiveTab, showToast }) {
  // Quick Calculator inside Hero
  const [heroAmount, setHeroAmount] = useState(500000);
  const [heroTenureYears, setHeroTenureYears] = useState(3);
  const [heroCategory, setHeroCategory] = useState('personal');
  const [heroMobile, setHeroMobile] = useState('');

  const selectedProd = useMemo(() => {
    return LOAN_PRODUCTS.find(p => p.id === heroCategory) || LOAN_PRODUCTS[0];
  }, [heroCategory]);

  const quickEstimatedEMI = useMemo(() => {
    const principal = heroAmount;
    const monthlyRate = (selectedProd.minRate / 12) / 100;
    const totalMonths = heroTenureYears * 12;
    const emi = (principal * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) / (Math.pow(1 + monthlyRate, totalMonths) - 1);
    return Math.round(emi);
  }, [heroAmount, heroTenureYears, selectedProd]);

  const handleQuickSubmit = (e) => {
    e.preventDefault();
    if (heroMobile.length < 10) {
      showToast('Validation Alert', 'Please enter a valid 10-digit mobile number.');
      return;
    }
    showToast('Instant Pre-Qualification', `Starting loan application for ${formatCurrency(heroAmount)}...`);
    onOpenApply(selectedProd);
  };

  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
      {/* Background Lighting Gradients & Mesh */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-gradient-to-tr from-indigo-600/20 via-purple-600/15 to-cyan-500/10 rounded-full blur-3xl -z-10 pointer-events-none"></div>
      <div className="absolute top-40 right-10 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl -z-10 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* LEFT: HERO COPY & VALUE PROP */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 text-xs font-semibold uppercase tracking-wider backdrop-blur-md">
              <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
              India's Premier Multi-Lender Network
            </div>

            <h1 className="text-4xl sm:text-5xl xl:text-6xl font-black tracking-tight leading-[1.15]">
              Your Financial Dreams. <br />
              <span className="bg-gradient-to-r from-indigo-400 via-purple-300 to-cyan-400 bg-clip-text text-transparent">
                Our Smarter Solutions.
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed">
              Discover, compare, and lock in guaranteed market-bottom interest rates across 40+ premier banks & NBFCs with zero branch visits, instant digital approvals, and transparent disbursements.
            </p>

            {/* Quick Metrics */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-slate-800">
              <div>
                <p className="text-2xl font-extrabold text-white">₹4,200 Cr+</p>
                <p className="text-xs text-slate-400 font-medium">Loans Facilitated</p>
              </div>
              <div>
                <p className="text-2xl font-extrabold text-emerald-400">8.35%</p>
                <p className="text-xs text-slate-400 font-medium">Lowest Starting APR</p>
              </div>
              <div>
                <p className="text-2xl font-extrabold text-white">40+ Banks</p>
                <p className="text-xs text-slate-400 font-medium">Integrated Network</p>
              </div>
              <div>
                <p className="text-2xl font-extrabold text-cyan-400">99.4%</p>
                <p className="text-xs text-slate-400 font-medium">Customer Trust</p>
              </div>
            </div>

            {/* Action Badges */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={() => onOpenApply()}
                className="px-6 py-3.5 rounded-xl font-bold text-sm tracking-wide bg-gradient-to-r from-indigo-600 via-indigo-500 to-cyan-500 text-white shadow-xl shadow-indigo-600/30 hover:shadow-indigo-600/50 hover:scale-[1.02] active:scale-95 transition flex items-center gap-2"
              >
                <span>Check Pre-Approved Limits</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => setActiveTab('calculator')}
                className="px-6 py-3.5 rounded-xl font-semibold text-sm border border-slate-700 bg-slate-900/60 hover:bg-slate-800 text-slate-200 transition flex items-center gap-2"
              >
                <Calculator className="w-4 h-4 text-cyan-400" />
                <span>Calculate EMI</span>
              </button>
            </div>

            {/* Bank Security Guarantee */}
            <div className="flex items-center gap-4 text-xs text-slate-400 pt-2">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" /> 256-Bit SSL Protection
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-indigo-400" /> Zero Hard Credit Inquiries
              </span>
              <span className="flex items-center gap-1.5">
                <Award className="w-4 h-4 text-yellow-400" /> RBI Direct Lending Facilitator
              </span>
            </div>
          </div>

          {/* RIGHT: INTERACTIVE QUICK LOAN CARD */}
          <div className="lg:col-span-5">
            <div className="relative p-6 sm:p-8 rounded-3xl bg-slate-900/80 border border-slate-700/80 shadow-2xl backdrop-blur-2xl">
              <div className="absolute -top-3 right-6 px-3 py-1 bg-gradient-to-r from-emerald-500 to-teal-500 text-[10px] font-bold text-slate-950 uppercase tracking-wider rounded-full shadow-md">
                Fast-Track Approval
              </div>

              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <div>
                  <h3 className="text-lg font-bold text-white">Instant Eligibility Radar</h3>
                  <p className="text-xs text-slate-400">Real-time quote engine across 40+ lenders</p>
                </div>
                <div className="p-2.5 bg-indigo-500/10 rounded-xl text-indigo-400 border border-indigo-500/20">
                  <Sparkles className="w-5 h-5" />
                </div>
              </div>

              <form onSubmit={handleQuickSubmit} className="mt-5 space-y-4">
                
                {/* Loan Category Selector */}
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1.5">
                    Select Loan Facility
                  </label>
                  <select
                    value={heroCategory}
                    onChange={(e) => {
                      setHeroCategory(e.target.value);
                      const prod = LOAN_PRODUCTS.find(p => p.id === e.target.value);
                      if (prod) {
                        setHeroAmount(Math.min(heroAmount, prod.maxAmount));
                      }
                    }}
                    className="w-full bg-slate-950/70 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500 transition"
                  >
                    {LOAN_PRODUCTS.map(p => (
                      <option key={p.id} value={p.id}>
                        {p.name} (from {p.minRate}% p.a.)
                      </option>
                    ))}
                  </select>
                </div>

                {/* Amount Slider */}
                <div>
                  <div className="flex justify-between items-center text-xs mb-1.5">
                    <span className="text-slate-400">Desired Amount:</span>
                    <span className="font-bold text-white text-base">{formatCurrency(heroAmount)}</span>
                  </div>
                  <input
                    type="range"
                    min={selectedProd.minAmount}
                    max={Math.min(selectedProd.maxAmount, 10000000)}
                    step={25000}
                    value={heroAmount}
                    onChange={(e) => setHeroAmount(Number(e.target.value))}
                    className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                  />
                  <div className="flex justify-between text-[10px] text-slate-500 mt-1">
                    <span>{formatCurrency(selectedProd.minAmount)}</span>
                    <span>{formatCurrency(Math.min(selectedProd.maxAmount, 10000000))}</span>
                  </div>
                </div>

                {/* Tenure Selector */}
                <div>
                  <div className="flex justify-between items-center text-xs mb-1.5">
                    <span className="text-slate-400">Tenure (Years):</span>
                    <span className="font-bold text-white text-sm">{heroTenureYears} Years ({heroTenureYears * 12} Mos)</span>
                  </div>
                  <div className="grid grid-cols-5 gap-1.5">
                    {[1, 2, 3, 5, 7].map((yrs) => (
                      <button
                        key={yrs}
                        type="button"
                        onClick={() => setHeroTenureYears(yrs)}
                        className={`py-1.5 rounded-lg text-xs font-semibold border transition ${
                          heroTenureYears === yrs
                            ? 'bg-indigo-600 border-indigo-500 text-white shadow'
                            : 'bg-slate-800/60 border-slate-700 text-slate-400 hover:text-white'
                        }`}
                      >
                        {yrs}Y
                      </button>
                    ))}
                  </div>
                </div>

                {/* Mobile Input */}
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">
                    Mobile Number (For OTP Verification)
                  </label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs font-semibold text-slate-400">
                      +91
                    </span>
                    <input
                      type="tel"
                      maxLength={10}
                      placeholder="98765 43210"
                      value={heroMobile}
                      onChange={(e) => setHeroMobile(e.target.value.replace(/\D/g, ''))}
                      className="w-full bg-slate-950/70 border border-slate-700 rounded-xl pl-12 pr-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500 tracking-wider placeholder-slate-500 transition"
                      required
                    />
                  </div>
                </div>

                {/* Live Estimated Repayment Box */}
                <div className="p-3.5 bg-indigo-950/40 border border-indigo-500/20 rounded-xl flex items-center justify-between">
                  <div>
                    <span className="text-[11px] text-indigo-300 block">Indicative Monthly EMI</span>
                    <span className="text-xl font-black text-white">{formatCurrency(quickEstimatedEMI)}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-slate-400 block">Applicable APR</span>
                    <span className="text-xs font-bold text-emerald-400">Starting @ {selectedProd.minRate}%</span>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 bg-gradient-to-r from-indigo-600 via-indigo-500 to-cyan-500 text-white font-bold text-sm rounded-xl shadow-lg shadow-indigo-600/30 hover:shadow-indigo-600/50 hover:scale-[1.01] active:scale-98 transition flex items-center justify-center gap-2"
                >
                  <span>Unlock Custom Bank Offers</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>

              <p className="text-[10px] text-center text-slate-500 mt-3">
                *By continuing you authorize Credix to check eligible offers across partnered institutions.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

// ==========================================
// 3. PARTNERS MARQUEE SECTION
// ==========================================
function PartnersMarquee() {
  return (
    <section className="py-10 border-y border-slate-800/80 bg-slate-950/40 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 mb-4 text-center">
        <p className="text-xs font-semibold uppercase tracking-widest text-slate-400">
          Integrated with 40+ RBI-Regulated Banks & Institutional NBFCs
        </p>
      </div>

      <div className="flex overflow-x-hidden space-x-6 py-2 select-none group">
        <div className="flex space-x-6 animate-marquee whitespace-nowrap">
          {LENDING_PARTNERS.concat(LENDING_PARTNERS).map((partner, idx) => (
            <div
              key={idx}
              className="inline-flex items-center gap-3 px-5 py-3 rounded-2xl bg-slate-900/60 border border-slate-800 text-slate-300 hover:border-slate-700 transition"
            >
              <div className="w-8 h-8 rounded-lg bg-indigo-500/20 text-indigo-400 flex items-center justify-center font-black text-xs">
                {partner.logoText.slice(0, 3)}
              </div>
              <div>
                <span className="font-semibold text-xs text-white block">{partner.name}</span>
                <span className="text-[10px] text-slate-400">{partner.tier} • Rating {partner.rating}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ==========================================
// 4. LOAN PRODUCTS SECTION
// ==========================================
function LoanProductsSection({ onApply, setActiveTab, isFullPage }) {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Unsecured', 'Secured', 'Commercial', 'Vehicle', 'Specialized'];

  const filteredProducts = useMemo(() => {
    if (selectedCategory === 'All') return LOAN_PRODUCTS;
    return LOAN_PRODUCTS.filter(p => p.category === selectedCategory);
  }, [selectedCategory]);

  return (
    <section className={`py-16 md:py-24 relative ${isFullPage ? '' : 'border-b border-slate-800/80'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {!isFullPage && (
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <span className="px-3 py-1 text-xs font-semibold uppercase tracking-wider text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 rounded-full">
                Borrowing Options
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-3 tracking-tight">
                Explore Premier Loan Products
              </h2>
              <p className="text-slate-400 text-sm mt-2 max-w-xl">
                Compare institutional terms, maximum borrowing limits, and minimal documentation pathways.
              </p>
            </div>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap gap-2 mt-6 md:mt-0">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition ${
                    selectedCategory === cat
                      ? 'bg-indigo-600 text-white shadow-md'
                      : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map((prod) => {
            const Icon = prod.icon;
            return (
              <div
                key={prod.id}
                className="group relative rounded-3xl bg-slate-900/70 border border-slate-800 p-6 flex flex-col justify-between hover:border-indigo-500/50 hover:shadow-2xl hover:shadow-indigo-500/10 transition-all duration-300"
              >
                {/* Top Badge */}
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-2xl ${prod.accentBg}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                    {prod.tag}
                  </span>
                </div>

                {/* Content */}
                <div>
                  <h3 className="text-lg font-bold text-white group-hover:text-indigo-400 transition">
                    {prod.name}
                  </h3>
                  <p className="text-xs text-slate-400 mt-2 line-clamp-2 leading-relaxed">
                    {prod.description}
                  </p>

                  {/* Financial Stats */}
                  <div className="mt-5 p-3.5 rounded-2xl bg-slate-950/60 border border-slate-800/80 space-y-2">
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-slate-400">Interest Rate:</span>
                      <span className="font-bold text-emerald-400">{prod.minRate}% - {prod.maxRate}% p.a.</span>
                    </div>
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-slate-400">Max Sanction:</span>
                      <span className="font-bold text-white">{formatCurrency(prod.maxAmount)}</span>
                    </div>
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-slate-400">Tenure:</span>
                      <span className="font-medium text-slate-300">Up to {prod.maxTenure / 12} Years</span>
                    </div>
                  </div>

                  {/* Bullet features */}
                  <div className="mt-4 space-y-1.5">
                    {prod.features.map((feat, i) => (
                      <div key={i} className="flex items-center gap-2 text-[11px] text-slate-400">
                        <Check className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center gap-2">
                  <button
                    onClick={() => setActiveTab('compare')}
                    className="flex-1 py-2 px-3 rounded-xl text-xs font-semibold border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white transition text-center"
                  >
                    Compare
                  </button>
                  <button
                    onClick={() => onApply(prod)}
                    className="flex-1 py-2 px-3 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-500 text-white shadow-md shadow-indigo-600/30 transition text-center flex items-center justify-center gap-1"
                  >
                    Apply Now
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

// ==========================================
// 5. ADVANCED DYNAMIC EMI CALCULATOR
// ==========================================
function EMICalculatorSection({ showToast, onApply, isFullPage }) {
  const [loanType, setLoanType] = useState('personal');
  const [loanAmount, setLoanAmount] = useState(1500000);
  const [interestRate, setInterestRate] = useState(10.5);
  const [tenureYears, setTenureYears] = useState(5);
  const [showAmortization, setShowAmortization] = useState(false);

  // Sync loan type defaults
  const handleTypeChange = (typeId) => {
    setLoanType(typeId);
    const prod = LOAN_PRODUCTS.find(p => p.id === typeId);
    if (prod) {
      setInterestRate(prod.minRate);
    }
  };

  // Calculations
  const { monthlyEMI, totalInterest, totalPayment, principalRatio, interestRatio, amortizationSchedule } = useMemo(() => {
    const P = loanAmount;
    const r = (interestRate / 12) / 100;
    const n = tenureYears * 12;

    const emi = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    const roundedEMI = Math.round(emi);
    const totalRepay = Math.round(roundedEMI * n);
    const totInterest = Math.round(totalRepay - P);

    const princRatio = ((P / totalRepay) * 100).toFixed(1);
    const intRatio = ((totInterest / totalRepay) * 100).toFixed(1);

    // Yearly amortization table
    let balance = P;
    const schedule = [];
    for (let yr = 1; yr <= tenureYears; yr++) {
      let yearlyInterest = 0;
      let yearlyPrincipal = 0;
      for (let m = 1; m <= 12; m++) {
        const intForMonth = balance * r;
        const princForMonth = emi - intForMonth;
        yearlyInterest += intForMonth;
        yearlyPrincipal += princForMonth;
        balance -= princForMonth;
        if (balance < 0) balance = 0;
      }
      schedule.push({
        year: yr,
        principalPaid: Math.round(yearlyPrincipal),
        interestPaid: Math.round(yearlyInterest),
        closingBalance: Math.round(balance)
      });
    }

    return {
      monthlyEMI: roundedEMI,
      totalInterest: totInterest,
      totalPayment: totalRepay,
      principalRatio: Number(princRatio),
      interestRatio: Number(intRatio),
      amortizationSchedule: schedule
    };
  }, [loanAmount, interestRate, tenureYears]);

  return (
    <section className={`py-16 md:py-24 relative ${isFullPage ? '' : 'border-b border-slate-800/80'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-cyan-400 bg-cyan-500/10 border border-cyan-500/20 rounded-full">
            Precision Financial Modeling
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-3 tracking-tight">
            Advanced Dynamic EMI Calculator
          </h2>
          <p className="text-slate-400 text-sm mt-2">
            Compute your exact repayment liability, inspect principal versus interest amortizations, and lock in the right tenor.
          </p>

          {/* Quick preset chips */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-6">
            {LOAN_PRODUCTS.slice(0, 5).map(p => (
              <button
                key={p.id}
                onClick={() => handleTypeChange(p.id)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-medium transition ${
                  loanType === p.id
                    ? 'bg-indigo-600 text-white shadow-md'
                    : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                {p.name}
              </button>
            ))}
          </div>
        </div>

        {/* Calculator Main Box */}
        <div className="p-6 sm:p-10 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-2xl backdrop-blur-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            
            {/* LEFT: SLIDERS & INPUTS (7 COLS) */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* 1. Loan Amount */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-xs font-semibold text-slate-300">Loan Amount</label>
                  <div className="relative">
                    <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-xs text-slate-400 font-bold">₹</span>
                    <input
                      type="number"
                      value={loanAmount}
                      onChange={(e) => setLoanAmount(Math.max(10000, Number(e.target.value)))}
                      className="bg-slate-950 border border-slate-700 rounded-lg pl-6 pr-3 py-1.5 text-sm font-bold text-white w-40 text-right focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                </div>
                <input
                  type="range"
                  min={50000}
                  max={20000000}
                  step={50000}
                  value={loanAmount}
                  onChange={(e) => setLoanAmount(Number(e.target.value))}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                />
                <div className="flex justify-between text-[11px] text-slate-500 mt-1">
                  <span>₹50,000</span>
                  <span>₹1 Crore</span>
                  <span>₹2 Crore</span>
                </div>
              </div>

              {/* 2. Interest Rate */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-xs font-semibold text-slate-300">Interest Rate (% Per Annum)</label>
                  <div className="relative">
                    <input
                      type="number"
                      step="0.05"
                      value={interestRate}
                      onChange={(e) => setInterestRate(Math.max(1, Math.min(30, Number(e.target.value))))}
                      className="bg-slate-950 border border-slate-700 rounded-lg pl-3 pr-6 py-1.5 text-sm font-bold text-white w-28 text-right focus:outline-none focus:border-indigo-500"
                    />
                    <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-slate-400 font-bold">%</span>
                  </div>
                </div>
                <input
                  type="range"
                  min={7.5}
                  max={24.0}
                  step={0.1}
                  value={interestRate}
                  onChange={(e) => setInterestRate(Number(e.target.value))}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                />
                <div className="flex justify-between text-[11px] text-slate-500 mt-1">
                  <span>7.5%</span>
                  <span>14.0%</span>
                  <span>24.0%</span>
                </div>
              </div>

              {/* 3. Loan Tenure */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-xs font-semibold text-slate-300">Loan Tenure</label>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-white">{tenureYears} Years</span>
                    <span className="text-xs text-slate-400">({tenureYears * 12} Months)</span>
                  </div>
                </div>
                <input
                  type="range"
                  min={1}
                  max={30}
                  step={1}
                  value={tenureYears}
                  onChange={(e) => setTenureYears(Number(e.target.value))}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-purple-500"
                />
                <div className="flex justify-between text-[11px] text-slate-500 mt-1">
                  <span>1 Year</span>
                  <span>15 Years</span>
                  <span>30 Years</span>
                </div>
              </div>

              {/* Quick Summary Highlights */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-4 border-t border-slate-800">
                <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800">
                  <span className="text-[10px] text-slate-400 block uppercase">Principal Amount</span>
                  <span className="text-sm font-bold text-white">{formatCurrency(loanAmount)}</span>
                </div>
                <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800">
                  <span className="text-[10px] text-slate-400 block uppercase">Total Interest</span>
                  <span className="text-sm font-bold text-cyan-400">{formatCurrency(totalInterest)}</span>
                </div>
                <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800 col-span-2 sm:col-span-1">
                  <span className="text-[10px] text-slate-400 block uppercase">Overall Repayment</span>
                  <span className="text-sm font-bold text-white">{formatCurrency(totalPayment)}</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => setShowAmortization(!showAmortization)}
                  className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 transition"
                >
                  <Layers className="w-3.5 h-3.5 text-indigo-400" />
                  <span>{showAmortization ? 'Hide' : 'View'} Amortization Schedule</span>
                  <ChevronDown className={`w-3.5 h-3.5 transition duration-200 ${showAmortization ? 'rotate-180' : ''}`} />
                </button>

                <button
                  onClick={() => {
                    setLoanAmount(1000000);
                    setInterestRate(10.5);
                    setTenureYears(5);
                    showToast('Calculator Reset', 'Parameters restored to standard defaults.');
                  }}
                  className="px-4 py-2.5 rounded-xl text-xs font-medium text-slate-400 hover:text-slate-200 transition"
                >
                  Reset
                </button>
              </div>
            </div>

            {/* RIGHT: LIVE SVG DONUT & PAYMENT CARD (5 COLS) */}
            <div className="lg:col-span-5 flex flex-col justify-between p-6 sm:p-8 rounded-2xl bg-gradient-to-b from-indigo-950/40 via-slate-950 to-slate-950 border border-indigo-500/20">
              
              <div>
                <span className="text-xs uppercase tracking-wider font-semibold text-indigo-400 block">
                  Computed Monthly Obligation
                </span>
                <div className="text-4xl sm:text-5xl font-black text-white mt-1">
                  {formatCurrency(monthlyEMI)}
                  <span className="text-xs text-slate-400 font-medium ml-1">/ month</span>
                </div>
                <p className="text-xs text-slate-400 mt-2">
                  Calculated based on diminishing balance method per RBI guidelines.
                </p>
              </div>

              {/* Dynamic SVG Donut Chart */}
              <div className="my-6 flex items-center justify-center">
                <div className="relative w-44 h-44 flex items-center justify-center">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                    {/* Background Circle */}
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      stroke="currentColor"
                      strokeWidth="12"
                      className="text-slate-800 fill-none"
                    />
                    {/* Principal Segment */}
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      stroke="#6366F1"
                      strokeWidth="12"
                      strokeDasharray={`${(principalRatio * 251.2) / 100} 251.2`}
                      strokeLinecap="round"
                      className="fill-none transition-all duration-500 ease-out"
                    />
                    {/* Interest Segment */}
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      stroke="#06B6D4"
                      strokeWidth="12"
                      strokeDasharray={`${(interestRatio * 251.2) / 100} 251.2`}
                      strokeDashoffset={`-${(principalRatio * 251.2) / 100}`}
                      strokeLinecap="round"
                      className="fill-none transition-all duration-500 ease-out"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                    <span className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">Repayment</span>
                    <span className="text-sm font-black text-white">{principalRatio}% : {interestRatio}%</span>
                  </div>
                </div>
              </div>

              {/* Legend */}
              <div className="grid grid-cols-2 gap-3 mb-6">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-indigo-500 shrink-0"></span>
                  <div className="text-xs">
                    <span className="text-slate-400 block">Principal</span>
                    <span className="font-bold text-white">{principalRatio}%</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-cyan-400 shrink-0"></span>
                  <div className="text-xs">
                    <span className="text-slate-400 block">Total Interest</span>
                    <span className="font-bold text-white">{interestRatio}%</span>
                  </div>
                </div>
              </div>

              {/* Apply with this calculation */}
              <button
                onClick={() => onApply(LOAN_PRODUCTS.find(p => p.id === loanType))}
                className="w-full py-3.5 bg-gradient-to-r from-indigo-600 via-indigo-500 to-cyan-500 text-white font-bold text-sm rounded-xl shadow-lg shadow-indigo-600/30 hover:shadow-indigo-600/50 hover:scale-[1.01] active:scale-98 transition flex items-center justify-center gap-2"
              >
                <span>Proceed with this Plan</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>

          {/* AMORTIZATION SCHEDULE TABLE (EXPANDABLE) */}
          {showAmortization && (
            <div className="mt-8 pt-8 border-t border-slate-800 animate-in fade-in duration-300">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-base font-bold text-white flex items-center gap-2">
                  <Layers className="w-4 h-4 text-indigo-400" />
                  Annual Amortization Breakdown
                </h4>
                <span className="text-xs text-slate-400">Values in INR (₹)</span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-950 text-slate-400 uppercase font-semibold border-b border-slate-800">
                    <tr>
                      <th className="py-3 px-4">Year</th>
                      <th className="py-3 px-4">Principal Repaid</th>
                      <th className="py-3 px-4">Interest Paid</th>
                      <th className="py-3 px-4">Total Payment (Year)</th>
                      <th className="py-3 px-4 text-right">Remaining Balance</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60">
                    {amortizationSchedule.map((row) => (
                      <tr key={row.year} className="hover:bg-slate-800/40">
                        <td className="py-3 px-4 font-bold text-white">Year {row.year}</td>
                        <td className="py-3 px-4 text-indigo-400 font-semibold">{formatCurrency(row.principalPaid)}</td>
                        <td className="py-3 px-4 text-cyan-400 font-semibold">{formatCurrency(row.interestPaid)}</td>
                        <td className="py-3 px-4 text-white font-medium">{formatCurrency(row.principalPaid + row.interestPaid)}</td>
                        <td className="py-3 px-4 text-right text-slate-300 font-mono">{formatCurrency(row.closingBalance)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

        </div>

      </div>
    </section>
  );
}

// ==========================================
// 6. LOAN COMPARISON MATRIX
// ==========================================
function LoanComparisonSection({ onApply, isFullPage }) {
  const [selectedLoans, setSelectedLoans] = useState(['personal', 'business', 'home']);

  const handleToggleProduct = (id) => {
    if (selectedLoans.includes(id)) {
      if (selectedLoans.length > 2) {
        setSelectedLoans(selectedLoans.filter(item => item !== id));
      }
    } else {
      if (selectedLoans.length < 3) {
        setSelectedLoans([...selectedLoans, id]);
      } else {
        setSelectedLoans([selectedLoans[1], selectedLoans[2], id]);
      }
    }
  };

  const comparedProducts = useMemo(() => {
    return selectedLoans.map(id => LOAN_PRODUCTS.find(p => p.id === id)).filter(Boolean);
  }, [selectedLoans]);

  return (
    <section className={`py-16 md:py-24 relative ${isFullPage ? '' : 'border-b border-slate-800/80'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-purple-400 bg-purple-500/10 border border-purple-500/20 rounded-full">
            Side-By-Side Evaluation
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-3 tracking-tight">
            Transparent Loan Comparison Engine
          </h2>
          <p className="text-slate-400 text-sm mt-2">
            Select up to 3 loan facilities to inspect APR variations, repayment flexibilities, and sanction turnarounds.
          </p>

          {/* Selector pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-6">
            {LOAN_PRODUCTS.map(p => (
              <button
                key={p.id}
                onClick={() => handleToggleProduct(p.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-medium transition flex items-center gap-1.5 ${
                  selectedLoans.includes(p.id)
                    ? 'bg-purple-600 text-white shadow'
                    : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                {selectedLoans.includes(p.id) && <Check className="w-3.5 h-3.5 text-white" />}
                {p.name}
              </button>
            ))}
          </div>
        </div>

        {/* Comparison Table */}
        <div className="overflow-x-auto">
          <div className="min-w-[650px] rounded-3xl bg-slate-900/90 border border-slate-800 overflow-hidden shadow-2xl">
            <div className="grid grid-cols-4 bg-slate-950/80 p-5 border-b border-slate-800 font-semibold text-xs text-slate-400 uppercase tracking-wider">
              <div>Features / Metrics</div>
              {comparedProducts.map(p => (
                <div key={p.id} className="text-white font-bold text-sm flex items-center gap-2">
                  <div className={`p-1.5 rounded-lg ${p.accentBg}`}>
                    <p.icon className="w-3.5 h-3.5" />
                  </div>
                  {p.name}
                </div>
              ))}
            </div>

            <div className="divide-y divide-slate-800/60 text-xs">
              {/* Row 1: Interest Rate */}
              <div className="grid grid-cols-4 p-4 hover:bg-slate-800/30 items-center">
                <span className="font-semibold text-slate-400">Starting Interest Rate</span>
                {comparedProducts.map(p => (
                  <span key={p.id} className="font-bold text-emerald-400 text-sm">
                    {p.minRate}% - {p.maxRate}% p.a.
                  </span>
                ))}
              </div>

              {/* Row 2: Max Amount */}
              <div className="grid grid-cols-4 p-4 hover:bg-slate-800/30 items-center">
                <span className="font-semibold text-slate-400">Maximum Sanction</span>
                {comparedProducts.map(p => (
                  <span key={p.id} className="font-extrabold text-white text-sm">
                    {formatCurrency(p.maxAmount)}
                  </span>
                ))}
              </div>

              {/* Row 3: Loan Tenure */}
              <div className="grid grid-cols-4 p-4 hover:bg-slate-800/30 items-center">
                <span className="font-semibold text-slate-400">Repayment Period</span>
                {comparedProducts.map(p => (
                  <span key={p.id} className="text-slate-200">
                    {p.minTenure / 12} to {p.maxTenure / 12} Years
                  </span>
                ))}
              </div>

              {/* Row 4: Processing Fees */}
              <div className="grid grid-cols-4 p-4 hover:bg-slate-800/30 items-center">
                <span className="font-semibold text-slate-400">Processing Fees</span>
                {comparedProducts.map(p => (
                  <span key={p.id} className="text-slate-300 font-mono">
                    {p.processingFee}
                  </span>
                ))}
              </div>

              {/* Row 5: Turnaround Time */}
              <div className="grid grid-cols-4 p-4 hover:bg-slate-800/30 items-center">
                <span className="font-semibold text-slate-400">Disbursal Turnaround</span>
                {comparedProducts.map(p => (
                  <span key={p.id} className="inline-flex items-center gap-1 text-cyan-400 font-semibold">
                    <Clock className="w-3.5 h-3.5" /> {p.turnaround}
                  </span>
                ))}
              </div>

              {/* Row 6: Security / Collateral */}
              <div className="grid grid-cols-4 p-4 hover:bg-slate-800/30 items-center">
                <span className="font-semibold text-slate-400">Collateral Requirement</span>
                {comparedProducts.map(p => (
                  <span key={p.id} className="text-slate-300">
                    {p.category === 'Unsecured' ? 'Zero Collateral Required' : 'Asset / Property / Title Pledge'}
                  </span>
                ))}
              </div>

              {/* Row 7: Actions */}
              <div className="grid grid-cols-4 p-5 bg-slate-950/40 items-center">
                <span className="font-semibold text-slate-400">Select Facility</span>
                {comparedProducts.map(p => (
                  <div key={p.id} className="pr-4">
                    <button
                      onClick={() => onApply(p)}
                      className="w-full py-2.5 px-3 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-500 text-white shadow-md shadow-indigo-600/30 transition flex items-center justify-center gap-1.5"
                    >
                      <span>Apply {p.name.split(' ')[0]}</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

// ==========================================
// 7. LOAN ELIGIBILITY & DTI CHECKER
// ==========================================
function EligibilityCheckerSection({ showToast, onApply, isFullPage }) {
  const [monthlyIncome, setMonthlyIncome] = useState(85000);
  const [existingEMIs, setExistingEMIs] = useState(15000);
  const [employmentType, setEmploymentType] = useState('Salaried');
  const [creditScore, setCreditScore] = useState(760);

  // Eligibility algorithm
  const { maxEligibleEMI, borrowingCapacity, dtiRatio, eligibilityRating, partnerMatches } = useMemo(() => {
    // Standard banking FOIR (Fixed Obligation to Income Ratio) = 50% for salaried, 55% for self-employed
    const foirMultiplier = employmentType === 'Salaried' ? 0.50 : 0.55;
    const maxAllowableObligation = monthlyIncome * foirMultiplier;
    const netDisposableEMI = Math.max(0, maxAllowableObligation - existingEMIs);

    // Credit score penalty / booster
    let creditMultiplier = 1.0;
    let rating = 'Excellent';
    if (creditScore >= 780) {
      creditMultiplier = 1.15;
      rating = 'Exceptional';
    } else if (creditScore >= 720) {
      creditMultiplier = 1.0;
      rating = 'Prime Standard';
    } else if (creditScore >= 650) {
      creditMultiplier = 0.8;
      rating = 'Fair (Higher APR)';
    } else {
      creditMultiplier = 0.5;
      rating = 'High Risk';
    }

    // Estimate total borrowing capacity based on typical 5-year personal/business repayment
    const assumedTenureMonths = 60;
    const assumedMonthlyRate = (11.0 / 12) / 100;
    const principalEstimator = (netDisposableEMI * (Math.pow(1 + assumedMonthlyRate, assumedTenureMonths) - 1)) / 
      (assumedMonthlyRate * Math.pow(1 + assumedMonthlyRate, assumedTenureMonths));
    
    const finalCapacity = Math.round(principalEstimator * creditMultiplier);
    const dti = monthlyIncome > 0 ? ((existingEMIs / monthlyIncome) * 100).toFixed(1) : 0;

    // Filter potential banks
    const matches = LENDING_PARTNERS.filter(() => creditScore >= 680).slice(0, 4);

    return {
      maxEligibleEMI: Math.round(netDisposableEMI),
      borrowingCapacity: finalCapacity,
      dtiRatio: Number(dti),
      eligibilityRating: rating,
      partnerMatches: matches
    };
  }, [monthlyIncome, existingEMIs, employmentType, creditScore]);

  return (
    <section className={`py-16 md:py-24 relative ${isFullPage ? '' : 'border-b border-slate-800/80'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 rounded-full">
            Underwriting Assessment
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-3 tracking-tight">
            Interactive Loan Eligibility Checker
          </h2>
          <p className="text-slate-400 text-sm mt-2">
            Calculate your debt-to-income (DTI) ratio, evaluate borrowing ceiling, and preview pre-qualified lender matches.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 p-6 sm:p-10 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-2xl backdrop-blur-2xl">
          
          {/* LEFT: INPUTS (7 COLS) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Employment Type */}
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-2">Employment Nature</label>
              <div className="grid grid-cols-2 gap-3">
                {['Salaried', 'Self-Employed / Business'].map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setEmploymentType(type)}
                    className={`py-3 px-4 rounded-xl text-xs font-bold border transition ${
                      employmentType === type
                        ? 'bg-indigo-600 border-indigo-500 text-white shadow-lg shadow-indigo-600/30'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            {/* Monthly Net In-Hand Income */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs font-semibold text-slate-300">Net Monthly In-Hand Income</label>
                <span className="text-base font-extrabold text-white">{formatCurrency(monthlyIncome)}</span>
              </div>
              <input
                type="range"
                min={20000}
                max={500000}
                step={5000}
                value={monthlyIncome}
                onChange={(e) => setMonthlyIncome(Number(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
              />
              <div className="flex justify-between text-[11px] text-slate-500 mt-1">
                <span>₹20,000</span>
                <span>₹2.5 Lakh</span>
                <span>₹5 Lakh+</span>
              </div>
            </div>

            {/* Existing Monthly EMIs */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs font-semibold text-slate-300">Existing Monthly Loan / Card EMIs</label>
                <span className="text-base font-extrabold text-rose-400">{formatCurrency(existingEMIs)}</span>
              </div>
              <input
                type="range"
                min={0}
                max={250000}
                step={2500}
                value={existingEMIs}
                onChange={(e) => setExistingEMIs(Number(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-rose-500"
              />
              <div className="flex justify-between text-[11px] text-slate-500 mt-1">
                <span>₹0 (Debt Free)</span>
                <span>₹1 Lakh</span>
                <span>₹2.5 Lakh</span>
              </div>
            </div>

            {/* Credit Score Slider (300-900) */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs font-semibold text-slate-300">Estimated CIBIL / Experian Credit Score</label>
                <div className="flex items-center gap-2">
                  <span className={`text-base font-black ${creditScore >= 750 ? 'text-emerald-400' : creditScore >= 680 ? 'text-indigo-400' : 'text-amber-400'}`}>
                    {creditScore}
                  </span>
                  <span className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                    {eligibilityRating}
                  </span>
                </div>
              </div>
              <input
                type="range"
                min={300}
                max={900}
                step={5}
                value={creditScore}
                onChange={(e) => setCreditScore(Number(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
              />
              <div className="flex justify-between text-[11px] text-slate-500 mt-1">
                <span>300 (Poor)</span>
                <span>650 (Fair)</span>
                <span>750 (Prime)</span>
                <span>900 (Exceptional)</span>
              </div>
            </div>

            {/* Health indicators */}
            <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 grid grid-cols-2 gap-4">
              <div>
                <span className="text-[10px] uppercase font-semibold text-slate-400 block">Debt-To-Income (DTI)</span>
                <span className={`text-xl font-black ${dtiRatio > 50 ? 'text-rose-400' : dtiRatio > 35 ? 'text-amber-400' : 'text-emerald-400'}`}>
                  {dtiRatio}%
                </span>
                <span className="text-[10px] text-slate-400 block mt-0.5">
                  {dtiRatio > 50 ? 'High Debt Load (Risky)' : dtiRatio > 35 ? 'Moderate DTI' : 'Healthy Borrowing Zone'}
                </span>
              </div>

              <div>
                <span className="text-[10px] uppercase font-semibold text-slate-400 block">Max Available Room (EMI)</span>
                <span className="text-xl font-black text-indigo-400">
                  {formatCurrency(maxEligibleEMI)}
                </span>
                <span className="text-[10px] text-slate-400 block mt-0.5">
                  Unallocated disposable limit
                </span>
              </div>
            </div>

          </div>

          {/* RIGHT: ELIGIBILITY RESULT CARD (5 COLS) */}
          <div className="lg:col-span-5 flex flex-col justify-between p-6 sm:p-8 rounded-2xl bg-gradient-to-b from-slate-950 to-[#0A1024] border border-emerald-500/20">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase tracking-wider font-semibold text-emerald-400">
                  Indicative Loan Potential
                </span>
                <div className="p-2 bg-emerald-500/10 text-emerald-400 rounded-xl">
                  <TrendingUp className="w-4 h-4" />
                </div>
              </div>

              <div className="text-4xl font-black text-white mt-2">
                {borrowingCapacity > 0 ? formatCurrency(borrowingCapacity) : '₹0'}
              </div>
              <p className="text-xs text-slate-400 mt-2">
                Maximum estimated credit sanction based on provided cashflow metrics and credit standing.
              </p>

              {/* Pre-qualified Partner Matches */}
              <div className="mt-6">
                <span className="text-xs font-semibold text-slate-300 block mb-2">
                  Matching Partner Banks for Your Profile:
                </span>
                <div className="space-y-2">
                  {partnerMatches.length > 0 ? (
                    partnerMatches.map((bank, i) => (
                      <div key={i} className="flex items-center justify-between p-2.5 bg-slate-900/60 rounded-xl border border-slate-800">
                        <div className="flex items-center gap-2.5">
                          <div className="w-7 h-7 rounded-lg bg-indigo-500/20 text-indigo-300 font-bold text-[10px] flex items-center justify-center">
                            {bank.logoText}
                          </div>
                          <span className="text-xs font-medium text-white">{bank.name}</span>
                        </div>
                        <span className="text-[10px] font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                          Pre-Qualified
                        </span>
                      </div>
                    ))
                  ) : (
                    <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-xl text-xs text-amber-300">
                      Score requires booster. Try lowering current liabilities or adding a co-applicant.
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-800/80">
              <button
                onClick={() => onApply()}
                className="w-full py-3.5 bg-gradient-to-r from-emerald-600 via-teal-500 to-indigo-600 text-white font-bold text-sm rounded-xl shadow-lg shadow-emerald-600/20 hover:scale-[1.01] active:scale-98 transition flex items-center justify-center gap-2"
              >
                <span>Proceed to Sanction Letter</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <p className="text-[10px] text-center text-slate-500 mt-2">
                *Subject to income tax document verification and underwriter appraisal.
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

// ==========================================
// 8. HOW IT WORKS SECTION
// ==========================================
function HowItWorksSection() {
  return (
    <section className="py-16 md:py-24 relative border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 rounded-full">
            Streamlined Architecture
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-3 tracking-tight">
            How Credix Accelerates Your Capital
          </h2>
          <p className="text-slate-400 text-sm mt-2">
            From initial credit check to instant bank deposit in four transparent, friction-free phases.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {HOW_IT_WORKS.map((step, idx) => (
            <div key={idx} className="relative group">
              <div className="p-8 rounded-3xl bg-slate-900/60 border border-slate-800 hover:border-indigo-500/40 hover:bg-slate-900/90 transition-all duration-300 h-full flex flex-col justify-between">
                <div>
                  <div className="text-4xl font-black bg-gradient-to-r from-indigo-500 to-cyan-400 bg-clip-text text-transparent mb-4 font-mono">
                    {step.step}
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{step.title}</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">{step.desc}</p>
                </div>

                <div className="mt-6 flex items-center gap-1.5 text-xs text-indigo-400 font-semibold group-hover:translate-x-1 transition duration-200">
                  <span>Learn details</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

// ==========================================
// 9. WHY CHOOSE US PILLARS
// ==========================================
function WhyChooseUsSection() {
  return (
    <section className="py-16 md:py-24 relative border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-cyan-400 bg-cyan-500/10 border border-cyan-500/20 rounded-full">
            Engineering Superiority
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-3 tracking-tight">
            Why Borrowers Trust Credix Over Direct Branches
          </h2>
          <p className="text-slate-400 text-sm mt-2">
            We operate exclusively on your behalf, applying high-tech algorithm matching rather than pushy sales quotas.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {WHY_CHOOSE_US.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-3xl bg-slate-900/50 border border-slate-800/80 hover:border-slate-700 hover:bg-slate-900/80 transition-all duration-300 group"
              >
                <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center border border-indigo-500/20 mb-4 group-hover:scale-110 group-hover:bg-indigo-600 group-hover:text-white transition duration-300">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-white mb-2">{item.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">{item.desc}</p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

// ==========================================
// 10. CUSTOMER DASHBOARD PREVIEW / VIEW
// ==========================================
function DashboardPreviewSection({ setActiveTab }) {
  return (
    <section className="py-16 md:py-24 relative border-b border-slate-800/80 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <span className="px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 rounded-full">
              Real-Time Borrower Portal
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              One Unified Dashboard For All Active Facilities
            </h2>
            <p className="text-slate-300 text-sm leading-relaxed">
              Track multi-bank application progress in real time, view upcoming EMI calendar milestones, upload missing KYC documents, and download formal sanction letters.
            </p>

            <div className="space-y-3">
              {[
                'Live pipeline milestone radar (Verification to Disbursal)',
                'Instant digital locker for salary slips, GST returns, and Aadhaar',
                'One-click amortization statement exports for tax audits',
                'Personalized pre-approved top-up credit alerts'
              ].map((feat, i) => (
                <div key={i} className="flex items-center gap-2.5 text-xs text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>

            <button
              onClick={() => setActiveTab('dashboard')}
              className="px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-wider bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/30 transition flex items-center gap-2"
            >
              <span>Launch Live Dashboard</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="lg:col-span-6">
            <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-cyan-400 flex items-center justify-center font-bold text-white text-sm">
                    AK
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">Aditya Kumar</h4>
                    <p className="text-[11px] text-slate-400">KYC Verified • Credix ID #CRX-88219</p>
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  Active
                </span>
              </div>

              {/* Progress Tracker Widget */}
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800">
                <div className="flex justify-between items-center text-xs mb-3">
                  <span className="font-semibold text-slate-300">Home Loan Sanction Progress</span>
                  <span className="font-bold text-indigo-400">Phase 4 of 5 (Sanctioned)</span>
                </div>
                <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div className="bg-gradient-to-r from-indigo-500 to-cyan-400 h-full w-[80%] rounded-full"></div>
                </div>
                <div className="flex justify-between text-[10px] text-slate-500 mt-2 font-medium">
                  <span>Applied</span>
                  <span>KYC Verified</span>
                  <span>Underwriting</span>
                  <span className="text-emerald-400 font-bold">Sanction</span>
                  <span>Disbursal</span>
                </div>
              </div>

              {/* Saved Offers preview */}
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                  <span className="text-[10px] text-slate-400 block uppercase">Sanctioned Limit</span>
                  <span className="text-base font-black text-white">₹45,00,000</span>
                  <span className="text-[10px] text-emerald-400 block mt-0.5">HDFC Bank @ 8.40%</span>
                </div>
                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                  <span className="text-[10px] text-slate-400 block uppercase">Upcoming EMI</span>
                  <span className="text-base font-black text-white">₹38,210</span>
                  <span className="text-[10px] text-slate-400 block mt-0.5">Due: 05th Next Month</span>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

// FULL DASHBOARD PAGE
function CustomerDashboardView({ showToast, onApply }) {
  const [activeTab, setActiveTab] = useState('pipeline'); // 'pipeline' | 'documents' | 'schedule'

  const applications = [
    {
      id: 'CRX-APP-9021',
      type: 'Home Loan',
      lender: 'HDFC Bank',
      amount: 4500000,
      apr: 8.40,
      stage: 'Sanction Issued',
      progress: 80,
      date: '02 Nov 2026',
      statusColor: 'text-emerald-400 bg-emerald-500/10'
    },
    {
      id: 'CRX-APP-8812',
      type: 'Personal Loan',
      lender: 'ICICI Bank',
      amount: 600000,
      apr: 10.75,
      stage: 'Disbursed',
      progress: 100,
      date: '15 Oct 2026',
      statusColor: 'text-indigo-400 bg-indigo-500/10'
    }
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Top Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-indigo-900/40 via-slate-900 to-slate-900 border border-indigo-500/20 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-indigo-600 to-cyan-400 flex items-center justify-center text-white text-xl font-black shadow-lg">
            AK
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-2xl font-bold text-white">Aditya Kumar</h2>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
                Tier-1 Borrower
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              PAN: ABCPK****G • Linked Mobile: +91 98*** **210 • CIBIL Score: 785 (Prime)
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => onApply()}
            className="px-4 py-2.5 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-500 text-white shadow-md transition flex items-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5" />
            Apply For New Loan
          </button>
          <button
            onClick={() => showToast('Statements Exported', 'Financial records summary downloaded.')}
            className="px-4 py-2.5 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition flex items-center gap-1.5"
          >
            <Download className="w-3.5 h-3.5" />
            Export Tax Report
          </button>
        </div>
      </div>

      {/* Dashboard Subtabs */}
      <div className="flex items-center gap-3 border-b border-slate-800 pb-3">
        {[
          { id: 'pipeline', label: 'Active Pipeline & Sanctions', icon: Clock },
          { id: 'documents', label: 'Document Vault (DigiLocker)', icon: FileText },
          { id: 'schedule', label: 'Repayment Calendar & EMIs', icon: Calendar },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition ${
              activeTab === tab.id
                ? 'bg-indigo-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <tab.icon className="w-3.5 h-3.5" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* TAB 1: PIPELINE */}
      {activeTab === 'pipeline' && (
        <div className="space-y-6">
          <h3 className="text-base font-bold text-white">Your Loan Applications Under Review</h3>
          <div className="grid grid-cols-1 gap-6">
            {applications.map(app => (
              <div key={app.id} className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-lg font-bold text-white">{app.type}</h4>
                      <span className="text-xs text-slate-400 font-mono">({app.id})</span>
                    </div>
                    <p className="text-xs text-slate-400">Partner Lender: {app.lender} • Submitted: {app.date}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold border border-current ${app.statusColor}`}>
                      {app.stage}
                    </span>
                    <button
                      onClick={() => showToast('Sanction Letter', `Downloading formal sanction from ${app.lender}...`)}
                      className="px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-300"
                    >
                      View Letter
                    </button>
                  </div>
                </div>

                {/* Progress bar */}
                <div>
                  <div className="flex justify-between text-xs text-slate-400 mb-2">
                    <span>Application Status</span>
                    <span className="font-semibold text-white">{app.progress}% Completed</span>
                  </div>
                  <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-indigo-500 to-emerald-400 h-full rounded-full transition-all duration-700"
                      style={{ width: `${app.progress}%` }}
                    ></div>
                  </div>
                  <div className="grid grid-cols-5 text-[10px] text-slate-500 mt-2 text-center font-medium">
                    <span className="text-emerald-400">Submitted</span>
                    <span className="text-emerald-400">Doc Verification</span>
                    <span className="text-emerald-400">Underwriting</span>
                    <span className={app.progress >= 80 ? 'text-emerald-400 font-bold' : ''}>Sanction</span>
                    <span className={app.progress === 100 ? 'text-emerald-400 font-bold' : ''}>Disbursed</span>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3 pt-3 border-t border-slate-800/80 text-xs">
                  <div>
                    <span className="text-slate-400 block">Sanctioned Amount</span>
                    <span className="font-bold text-white text-sm">{formatCurrency(app.amount)}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Assigned APR</span>
                    <span className="font-bold text-emerald-400 text-sm">{app.apr}% p.a.</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Dedicated Officer</span>
                    <span className="font-medium text-slate-300">Rahul Sharma (Credix)</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: DOCUMENT VAULT */}
      {activeTab === 'documents' && (
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-white">Encrypted KYC & Income Vault</h3>
              <p className="text-xs text-slate-400">Authenticated via DigiLocker & RBI Account Aggregator (256-bit AES)</p>
            </div>
            <button
              onClick={() => showToast('DigiLocker Connected', 'Latest ITR and PAN pulled successfully.')}
              className="px-3 py-2 bg-indigo-600 rounded-xl text-xs font-semibold text-white"
            >
              Sync DigiLocker
            </button>
          </div>

          <div className="divide-y divide-slate-800 text-xs">
            {[
              { name: 'PAN Card (Permanent Account Number)', status: 'Verified via NSDL', date: 'Oct 2026', valid: true },
              { name: 'Aadhaar Biometric e-KYC', status: 'UIDAI Verified', date: 'Oct 2026', valid: true },
              { name: 'Last 3 Months Salary Slips (PDF)', status: 'Approved by Underwriter', date: 'Nov 2026', valid: true },
              { name: '6 Months Primary Bank Statement', status: 'Verified via Aggregator', date: 'Nov 2026', valid: true },
              { name: 'Form 16 / ITR V (Assessment Year 2025-26)', status: 'Verified via Income Tax Portal', date: 'Nov 2026', valid: true },
            ].map((doc, idx) => (
              <div key={idx} className="py-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <FileText className="w-4 h-4 text-indigo-400" />
                  <div>
                    <span className="font-semibold text-white block">{doc.name}</span>
                    <span className="text-[10px] text-slate-400">{doc.status} • Updated {doc.date}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    Verified
                  </span>
                  <button
                    onClick={() => showToast('Document Download', `Downloading ${doc.name}...`)}
                    className="p-1.5 text-slate-400 hover:text-white"
                  >
                    <Download className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: SCHEDULE */}
      {activeTab === 'schedule' && (
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
          <h3 className="text-base font-bold text-white">Upcoming Repayment Mandates (NACH / e-Mandate)</h3>
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
            <div>
              <span className="text-[11px] text-slate-400 block">Next Auto-Debit Date</span>
              <span className="text-xl font-bold text-white">05 December 2026</span>
              <span className="text-xs text-indigo-400 block mt-0.5">ICICI Bank Personal Loan</span>
            </div>
            <div className="text-right">
              <span className="text-[11px] text-slate-400 block">Debit Amount</span>
              <span className="text-xl font-bold text-emerald-400">₹12,840</span>
              <span className="text-[10px] text-slate-400 block mt-0.5">Account: **** 4092</span>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

// ==========================================
// 11. FINANCIAL ADVISORY & BLOG SECTION
// ==========================================
function FinancialAdvisorySection({ showToast }) {
  return (
    <section className="py-16 md:py-24 relative border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <span className="px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 rounded-full">
              Credit Intelligence
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-3 tracking-tight">
              Financial Guides & Advisory
            </h2>
            <p className="text-slate-400 text-sm mt-2">
              Actionable insights from veteran bankers to optimize your debt portfolio and save on interest.
            </p>
          </div>
          <button
            onClick={() => showToast('Blog Archive', 'Loading comprehensive knowledge base...')}
            className="mt-4 md:mt-0 text-xs font-bold text-indigo-400 hover:text-indigo-300 flex items-center gap-1"
          >
            <span>Explore All 40+ Articles</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {BLOG_TIPS.map((post, idx) => (
            <div
              key={idx}
              className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 flex flex-col justify-between transition group"
            >
              <div>
                <div className="flex items-center justify-between mb-3 text-xs">
                  <span className="text-indigo-400 font-semibold">{post.category}</span>
                  <span className="text-slate-500">{post.readTime}</span>
                </div>
                <h3 className="text-base font-bold text-white group-hover:text-indigo-400 transition leading-snug">
                  {post.title}
                </h3>
                <p className="text-xs text-slate-400 mt-2.5 leading-relaxed">
                  {post.snippet}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between text-xs font-medium text-slate-300 group-hover:text-white">
                <span>Read Full Blueprint</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition duration-200" />
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

// ==========================================
// 12. FAQ ACCORDION SECTION
// ==========================================
function FAQSection() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="py-16 md:py-24 relative border-b border-slate-800/80">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-12">
          <span className="px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-cyan-400 bg-cyan-500/10 border border-cyan-500/20 rounded-full">
            Transparent Clarity
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-3 tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-slate-400 text-sm mt-2">
            Clear, honest answers regarding loan terms, pre-closures, fees, and regulatory protections.
          </p>
        </div>

        <div className="space-y-3">
          {FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl bg-slate-900/80 border border-slate-800 overflow-hidden transition"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? -1 : idx)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 font-semibold text-sm text-white hover:text-indigo-400 transition"
                >
                  <span className="flex items-center gap-2.5">
                    <HelpCircle className="w-4 h-4 text-indigo-400 shrink-0" />
                    {faq.q}
                  </span>
                  <ChevronDown className={`w-4 h-4 text-slate-400 shrink-0 transition duration-200 ${isOpen ? 'rotate-180 text-indigo-400' : ''}`} />
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs text-slate-300 leading-relaxed border-t border-slate-800/60 animate-in fade-in duration-200">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

// ==========================================
// 13. INSTANT CALLBACK REQUEST BANNER
// ==========================================
function CallbackBanner({ onOpenCallback }) {
  return (
    <section className="py-16 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-indigo-900/70 via-purple-900/60 to-slate-900 border border-indigo-500/30 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-2xl relative overflow-hidden">
          
          <div className="relative z-10 space-y-2 max-w-xl">
            <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-white/10 text-white border border-white/20">
              Personalized Guidance
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
              Confused Between Multiple Loan Quotes?
            </h3>
            <p className="text-slate-300 text-xs sm:text-sm">
              Schedule an obligation-free 10-minute consultation with a senior Credix loan advisor. We will audit your profile and match the lowest APR lender.
            </p>
          </div>

          <div className="relative z-10 flex flex-wrap items-center gap-3">
            <button
              onClick={onOpenCallback}
              className="px-6 py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider bg-white text-slate-950 hover:bg-slate-100 shadow-xl transition flex items-center gap-2"
            >
              <PhoneCall className="w-4 h-4 text-indigo-600" />
              <span>Request Instant Callback</span>
            </button>
          </div>

          {/* Decorative glow */}
          <div className="absolute right-0 top-0 w-80 h-80 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none"></div>
        </div>
      </div>
    </section>
  );
}

// ==========================================
// 14. CONTACT US SECTION
// ==========================================
function ContactUsSection({ showToast }) {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'General Inquiries',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);
    showToast('Inquiry Received', 'A loan specialist will contact you within 30 minutes.');
  };

  return (
    <div className="max-w-6xl mx-auto space-y-12">
      <div className="text-center max-w-3xl mx-auto">
        <span className="px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 rounded-full">
          Get In Touch
        </span>
        <h1 className="text-4xl font-extrabold text-white mt-3">
          We Are Here To Assist Your Financial Growth
        </h1>
        <p className="text-slate-400 text-sm mt-2">
          Connect with our customer support desks, visit our corporate offices, or request priority callback.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Left: Office & Contact details */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
            <h3 className="text-base font-bold text-white">Corporate Headquarters</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Credix Financial Technologies India Pvt Ltd.<br />
              Tower 4, 11th Floor, Cyber City Tech Hub,<br />
              DLF Phase 2, Gurugram, Haryana - 122002
            </p>

            <div className="space-y-3 pt-3 border-t border-slate-800 text-xs">
              <div className="flex items-center gap-3 text-slate-300">
                <PhoneCall className="w-4 h-4 text-indigo-400" />
                <span>+91 (0124) 489-9000 / 1800-200-CRDX</span>
              </div>
              <div className="flex items-center gap-3 text-slate-300">
                <Send className="w-4 h-4 text-cyan-400" />
                <span>support@credixmarketplace.in</span>
              </div>
              <div className="flex items-center gap-3 text-slate-300">
                <Clock className="w-4 h-4 text-emerald-400" />
                <span>Monday - Saturday: 9:00 AM – 8:00 PM IST</span>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-2">
            <h4 className="text-sm font-bold text-white">Grievance Redressal Officer</h4>
            <p className="text-xs text-slate-400">
              Mr. Sandeep Nambiar, Vice President - Compliance<br />
              Email: grievance@credixmarketplace.in<br />
              RBI Nodal Officer Contact: nodal.officer@credixmarketplace.in
            </p>
          </div>
        </div>

        {/* Right: Contact Form */}
        <div className="lg:col-span-7">
          <div className="p-8 rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl">
            {formSubmitted ? (
              <div className="text-center py-12 space-y-3">
                <div className="w-14 h-14 bg-emerald-500/20 text-emerald-400 rounded-2xl flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-white">Thank You For Reaching Out</h3>
                <p className="text-xs text-slate-400 max-w-md mx-auto">
                  Your ticket reference #CRX-HELP-{Math.floor(1000 + Math.random() * 9000)} has been generated. Our desk officer will respond shortly.
                </p>
                <button
                  onClick={() => setFormSubmitted(false)}
                  className="mt-4 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-xs text-slate-200 rounded-xl"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <h3 className="text-lg font-bold text-white mb-2">Send Direct Message</h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-slate-300 block mb-1">Full Legal Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Ramesh Chandra"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-slate-300 block mb-1">Mobile Number</label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-slate-300 block mb-1">Email Address</label>
                    <input
                      type="email"
                      required
                      placeholder="ramesh@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-slate-300 block mb-1">Query Subject</label>
                    <select
                      value={formData.subject}
                      onChange={(e) => setFormData({...formData, subject: e.target.value})}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-indigo-500"
                    >
                      <option>Personal Loan Inquiries</option>
                      <option>Business Expansion Funding</option>
                      <option>Home Loan Balance Transfer</option>
                      <option>Partner With Credix (DSA / NBFC)</option>
                      <option>Existing File Escalation</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">Message / File Specifics</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Briefly describe your requirements or existing application issues..."
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-indigo-500 resize-none"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 bg-gradient-to-r from-indigo-600 via-indigo-500 to-cyan-500 text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-lg shadow-indigo-600/30 hover:shadow-indigo-600/50 transition"
                >
                  Submit Inquiry
                </button>
              </form>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}

// ==========================================
// 15. MULTI-STEP LOAN APPLICATION MODAL
// ==========================================
function ApplicationModal({ selectedProduct, onClose, showToast }) {
  const [step, setStep] = useState(1);
  const [loanAmount, setLoanAmount] = useState(selectedProduct ? selectedProduct.minAmount * 2 : 500000);
  const [fullName, setFullName] = useState('');
  const [mobile, setMobile] = useState('');
  const [panNumber, setPanNumber] = useState('');
  const [monthlyIncome, setMonthlyIncome] = useState(75000);
  const [city, setCity] = useState('Mumbai');
  const [consentChecked, setConsentChecked] = useState(true);

  const handleNextStep = (e) => {
    e.preventDefault();
    if (step === 1) {
      if (!fullName || mobile.length < 10) {
        showToast('Validation Error', 'Please enter your legal name and 10-digit mobile number.');
        return;
      }
      setStep(2);
    } else if (step === 2) {
      if (panNumber.length < 10) {
        showToast('Invalid PAN', 'Please enter a valid 10-character PAN number.');
        return;
      }
      setStep(3);
    } else if (step === 3) {
      // Simulating verification
      setStep(4);
      showToast('Pre-Approval Success', 'Sanction parameters generated with 3 lending partners.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="relative w-full max-w-xl bg-slate-900 border border-slate-700 rounded-3xl shadow-2xl overflow-hidden p-6 sm:p-8 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
              Fast-Track Application
            </span>
            <span className="text-xs text-slate-400">• Step {step} of 4</span>
          </div>
          <h2 className="text-xl font-bold text-white">
            {step === 4 ? 'Congratulations! Pre-Approval Generated' : `Apply for ${selectedProduct.name}`}
          </h2>
          {step < 4 && (
            <p className="text-xs text-slate-400">
              Starting @ {selectedProduct.minRate}% p.a. • Instant algorithmic sanction check
            </p>
          )}
        </div>

        {/* Stepper Dots */}
        <div className="grid grid-cols-4 gap-2 mb-6">
          {[1, 2, 3, 4].map((s) => (
            <div
              key={s}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                s <= step ? 'bg-gradient-to-r from-indigo-500 to-cyan-400' : 'bg-slate-800'
              }`}
            ></div>
          ))}
        </div>

        {/* STEP 1: PERSONAL & CONTACT */}
        {step === 1 && (
          <form onSubmit={handleNextStep} className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">Full Legal Name (as per PAN)</label>
              <input
                type="text"
                required
                placeholder="e.g. Vikramaditya Verma"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">Mobile Number (Aadhaar Linked)</label>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs font-semibold text-slate-400">+91</span>
                <input
                  type="tel"
                  maxLength={10}
                  required
                  placeholder="98765 43210"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value.replace(/\D/g, ''))}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-12 pr-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-indigo-500 tracking-wider"
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-slate-300 font-semibold">Desired Loan Amount</span>
                <span className="text-white font-bold">{formatCurrency(loanAmount)}</span>
              </div>
              <input
                type="range"
                min={selectedProduct.minAmount}
                max={selectedProduct.maxAmount}
                step={25000}
                value={loanAmount}
                onChange={(e) => setLoanAmount(Number(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
              />
            </div>

            <div className="flex items-start gap-2 pt-2">
              <input
                type="checkbox"
                id="consent"
                checked={consentChecked}
                onChange={(e) => setConsentChecked(e.target.checked)}
                className="mt-0.5 rounded border-slate-700 bg-slate-950 text-indigo-600 focus:ring-0"
              />
              <label htmlFor="consent" className="text-[11px] text-slate-400 leading-tight">
                I authorize Credix and its RBI-registered lending partners to fetch my credit bureau reports (CIBIL/Experian) and contact me via SMS/WhatsApp.
              </label>
            </div>

            <button
              type="submit"
              disabled={!consentChecked}
              className="w-full py-3 bg-gradient-to-r from-indigo-600 via-indigo-500 to-cyan-500 text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-lg shadow-indigo-600/30 hover:shadow-indigo-600/50 disabled:opacity-50 transition"
            >
              Continue to Financial Profile
            </button>
          </form>
        )}

        {/* STEP 2: FINANCIAL & TAX DETAILS */}
        {step === 2 && (
          <form onSubmit={handleNextStep} className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">PAN Card Number</label>
              <input
                type="text"
                maxLength={10}
                required
                placeholder="ABCDE1234F"
                value={panNumber}
                onChange={(e) => setPanNumber(e.target.value.toUpperCase())}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-indigo-500 uppercase tracking-widest font-mono"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">Monthly In-Hand (₹)</label>
                <input
                  type="number"
                  required
                  value={monthlyIncome}
                  onChange={(e) => setMonthlyIncome(Number(e.target.value))}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-indigo-500"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">Current City</label>
                <input
                  type="text"
                  required
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>

            <div className="p-3 bg-indigo-950/40 rounded-xl border border-indigo-500/20 text-xs text-indigo-300 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 shrink-0 text-indigo-400" />
              <span>Soft check only. No negative impact on your official credit score.</span>
            </div>

            <div className="flex gap-2 pt-2">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="w-1/3 py-3 rounded-xl text-xs font-semibold bg-slate-800 text-slate-300 hover:bg-slate-700"
              >
                Back
              </button>
              <button
                type="submit"
                className="w-2/3 py-3 bg-gradient-to-r from-indigo-600 to-cyan-500 text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-lg"
              >
                Proceed to KYC Verification
              </button>
            </div>
          </form>
        )}

        {/* STEP 3: INSTANT VERIFICATION */}
        {step === 3 && (
          <form onSubmit={handleNextStep} className="space-y-4">
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400">PAN Verification</span>
                <span className="text-emerald-400 font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> NSDL Active
                </span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400">DigiLocker Integration</span>
                <span className="text-emerald-400 font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Authenticated
                </span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400">Bank Statement Scrutiny</span>
                <span className="text-indigo-400 font-bold flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" /> Automated Aggregator
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-400 text-center">
              Our automated underwriting engine is querying loan sanctions across 40+ lending institutions...
            </p>

            <button
              type="submit"
              className="w-full py-3.5 bg-gradient-to-r from-emerald-600 via-teal-500 to-indigo-600 text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-lg"
            >
              Generate Pre-Approved Offers
            </button>
          </form>
        )}

        {/* STEP 4: SUCCESS & OFFERS */}
        {step === 4 && (
          <div className="space-y-4 text-center">
            <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 rounded-2xl flex items-center justify-center mx-auto">
              <Sparkles className="w-8 h-8" />
            </div>

            <div>
              <h3 className="text-lg font-bold text-white">Pre-Approval Sanction Ready!</h3>
              <p className="text-xs text-slate-400 mt-1">
                Based on your profile, 3 top institutional lenders have approved your application.
              </p>
            </div>

            {/* Generated Offer Badges */}
            <div className="space-y-2 text-left">
              {[
                { bank: 'HDFC Bank', amount: loanAmount, rate: '10.5% p.a.', fee: '₹999' },
                { bank: 'Bajaj Finserv', amount: loanAmount, rate: '11.2% p.a.', fee: '0.5%' },
              ].map((off, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                  <div>
                    <span className="font-bold text-xs text-white block">{off.bank}</span>
                    <span className="text-[10px] text-slate-400">Sanction: {formatCurrency(off.amount)} • Rate: {off.rate}</span>
                  </div>
                  <button
                    onClick={() => {
                      showToast('Offer Selected', `Case file handed over to ${off.bank} executive.`);
                      onClose();
                    }}
                    className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white"
                  >
                    Accept Offer
                  </button>
                </div>
              ))}
            </div>

            <button
              onClick={onClose}
              className="w-full py-2.5 rounded-xl text-xs font-semibold text-slate-400 hover:text-white"
            >
              Done & Return to Marketplace
            </button>
          </div>
        )}

      </div>
    </div>
  );
}

// ==========================================
// 16. CALLBACK MODAL
// ==========================================
function CallbackModal({ onClose, showToast }) {
  const [phone, setPhone] = useState('');
  const [timeSlot, setTimeSlot] = useState('Within 15 Minutes');

  const handleSubmit = (e) => {
    e.preventDefault();
    showToast('Callback Scheduled', `An advisor will call +91 ${phone} ${timeSlot.toLowerCase()}.`);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="relative w-full max-w-md bg-slate-900 border border-slate-700 rounded-3xl shadow-2xl p-6 sm:p-8 animate-in fade-in zoom-in-95 duration-200">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 bg-indigo-500/20 text-indigo-400 rounded-xl">
            <PhoneCall className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white">Request Priority Callback</h3>
            <p className="text-xs text-slate-400">Zero charges • Certified Loan Concierge</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1">Your Mobile Number</label>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs font-semibold text-slate-400">+91</span>
              <input
                type="tel"
                required
                maxLength={10}
                placeholder="98765 43210"
                value={phone}
                onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-12 pr-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-indigo-500 tracking-wider"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1">Preferred Time Window</label>
            <select
              value={timeSlot}
              onChange={(e) => setTimeSlot(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-indigo-500"
            >
              <option>Within 15 Minutes</option>
              <option>Today Afternoon (2:00 PM - 5:00 PM)</option>
              <option>Evening (6:00 PM - 8:00 PM)</option>
              <option>Tomorrow Morning</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-indigo-600 to-cyan-500 text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-lg"
          >
            Confirm Consultation
          </button>
        </form>
      </div>
    </div>
  );
}

// ==========================================
// 17. FLOATING WIDGETS
// ==========================================
function FloatingWidgets({ onOpenWhatsApp, showScrollTop, scrollToTop, onOpenCallback }) {
  return (
    <div className="fixed bottom-6 left-6 z-40 flex flex-col gap-3">
      {/* WhatsApp Floating CTA */}
      <button
        onClick={onOpenWhatsApp}
        className="group flex items-center gap-2 p-3.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-full shadow-2xl hover:scale-105 active:scale-95 transition duration-200"
        title="Chat on WhatsApp"
      >
        <MessageCircle className="w-5 h-5 fill-current" />
        <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-300 whitespace-nowrap text-xs">
          WhatsApp Support
        </span>
      </button>

      {/* Back to top button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="p-3 bg-slate-900/90 border border-slate-700 text-slate-200 hover:text-white rounded-full shadow-xl hover:scale-105 active:scale-95 transition"
          title="Scroll To Top"
        >
          <ChevronUp className="w-5 h-5" />
        </button>
      )}
    </div>
  );
}

// ==========================================
// 18. FOOTER WITH COMPLIANCE & LEGAL
// ==========================================
function Footer({ setActiveTab, onOpenApply }) {
  return (
    <footer className="bg-slate-950 border-t border-slate-800 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800/80">
          
          {/* Col 1: Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-cyan-400 p-[2px]">
                <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                  <ShieldCheck className="w-5 h-5 text-cyan-400" />
                </div>
              </div>
              <span className="text-xl font-black text-white tracking-tight">CREDIX</span>
            </div>
            <p className="text-slate-400 leading-relaxed max-w-sm">
              Credix is India’s next-generation digital lending marketplace engineered to simplify personal, business, and mortgage financing through transparent algorithmic price discovery.
            </p>
            <div className="text-[11px] text-slate-500 space-y-1">
              <p>CIN: U67190DL2024PTC398110</p>
              <p>Authorized Digital Lending Facilitator & RBI Registered Network Partner</p>
            </div>
          </div>

          {/* Col 2: Loan Products */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-3">Loan Facilities</h4>
            <ul className="space-y-2">
              {LOAN_PRODUCTS.slice(0, 5).map(p => (
                <li key={p.id}>
                  <button
                    onClick={() => {
                      setActiveTab('products');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="hover:text-white transition"
                  >
                    {p.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Financial Tools */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-3">Calculators & Tools</h4>
            <ul className="space-y-2">
              <li><button onClick={() => setActiveTab('calculator')} className="hover:text-white transition">Personal Loan EMI Calculator</button></li>
              <li><button onClick={() => setActiveTab('calculator')} className="hover:text-white transition">Home Loan Amortization</button></li>
              <li><button onClick={() => setActiveTab('eligibility')} className="hover:text-white transition">Debt-to-Income (DTI) Checker</button></li>
              <li><button onClick={() => setActiveTab('compare')} className="hover:text-white transition">Multi-Bank Rate Comparison</button></li>
              <li><button onClick={() => setActiveTab('dashboard')} className="hover:text-white transition">Sanction Radar Portal</button></li>
            </ul>
          </div>

          {/* Col 4: Corporate & Compliance */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-3">Legal & Security</h4>
            <ul className="space-y-2">
              <li><a href="#privacy" className="hover:text-white transition">Privacy Policy (ISO 27001)</a></li>
              <li><a href="#terms" className="hover:text-white transition">Terms & Conditions of Service</a></li>
              <li><a href="#security" className="hover:text-white transition">256-bit Encryption Standards</a></li>
              <li><a href="#fairlending" className="hover:text-white transition">Fair Practices Code (RBI)</a></li>
              <li><button onClick={() => setActiveTab('contact')} className="hover:text-white transition">Grievance Redressal</button></li>
            </ul>
          </div>

        </div>

        {/* REGULATORY DISCLAIMER & APR STATEMENTS */}
        <div className="py-8 border-b border-slate-800/60 space-y-3 text-[11px] text-slate-500 leading-relaxed">
          <p className="font-bold text-slate-400 uppercase tracking-wider">
            Important Regulatory & Lending Disclaimers:
          </p>
          <p>
            Credix (Credix Financial Technologies India Pvt Ltd) is an independent loan facilitator and technological intermediary, not an RBI-registered NBFC or direct banking institution. We do not provide loans directly from our balance sheet. All loan sanctions, interest rate assignments, processing charges, and disbursement timelines are at the sole discretion of our partnered lending institutions (Banks and NBFCs) subject to their respective internal credit criteria and underwriting policies.
          </p>
          <p>
            Annual Percentage Rates (APR) offered across personal loans typically vary between 10.49% to 24.0% per annum with repayment tenures ranging from 12 months to 60 months. Representative Example: For a loan sanction of ₹1,00,000 availed at an interest rate of 12.0% p.a. for a tenure of 12 months, the monthly EMI will be ₹8,885, with a total interest payable of ₹6,619 and total repayment of ₹1,06,619 (excluding nominal processing fees & GST).
          </p>
        </div>

        {/* BOTTOM BAR */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <p>© {new Date().getFullYear()} Credix Financial Technologies India Pvt Ltd. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span>Made with precision for modern Indian borrowers</span>
            <div className="flex items-center gap-1.5 text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              All Systems Operational
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
}