"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useScroll, useSpring, useInView } from "framer-motion";
import {
  AlertTriangle,
  FileText,
  Check,
  Terminal,
  Database,
  FileJson,
  HardDrive,
  Save,
  MessageSquareWarning,
  HelpCircle,
  FileCode,
  ArrowUp,
  Copy,
  CheckCircle2,
  Download,
  Menu,
  XCircle,
  ChevronRight,
  ChevronDown,
  Github,
  Moon,
  Sun,
  Home as HomeIcon
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useTheme } from "next-themes";

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.6 } }
};

const staggerChildren = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    }
  }
};

const slideUp = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.5 } }
};

const SectionWithInView = ({ id, children, className }: { id: string, children: React.ReactNode, className?: string }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.3 });

  return (
    <motion.section
      id={id}
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.5 }}
      className={`scroll-mt-20 ${className || ""}`}
    >
      {children}
    </motion.section>
  );
};

const IconWrapper = ({ children }: { children: React.ReactNode }) => (
  <motion.div
    className="icon-container"
    whileHover={{ scale: 1.2, rotate: 5 }}
    whileTap={{ scale: 0.9 }}
  >
    {children}
  </motion.div>
);

const CodeBlock = ({ code, language = "bash", filename = "Terminal" }: { code: string, language?: string, filename?: string }) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    // Create blob link to download
    const element = document.createElement('a');
    const file = new Blob([code], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = `${filename.toLowerCase().replace(/\s+/g, '-')}.${language === 'bash' ? 'sh' : language}`;
    document.body.appendChild(element); // Required for this to work in Firefox
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="code-block group rounded-lg overflow-hidden border">
      <div className="code-header border-b bg-secondary/50">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          <span className="text-xs opacity-75">{filename}</span>
        </div>
        <div className="flex gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={handleDownload}
          >
            <Download size={16} />
            <span className="sr-only">Download</span>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={copyToClipboard}
          >
            {copied ? <CheckCircle2 size={16} className="text-success" /> : <Copy size={16} />}
            <span className="sr-only">Copy</span>
          </Button>
        </div>
      </div>
      <pre className="overflow-x-auto p-4 text-sm">
        <code>{code}</code>
      </pre>
    </div>
  );
};

export default function Home() {
  const { resolvedTheme, setTheme } = useTheme();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const [activeSection, setActiveSection] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  // Scroll to section function
  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      window.scrollTo({
        top: section.offsetTop - 100,
        behavior: 'smooth'
      });
      setMobileMenuOpen(false);

      // Update URL with hash but prevent default scroll
      window.history.pushState(null, '', `#${sectionId}`);
    }
  };

  // Direct link handler function
  const handleDirectLink = (id: string) => {
    event?.preventDefault();
    scrollToSection(id);
  };

  // Handle initial hash on page load
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash) {
        setTimeout(() => {
          const section = document.getElementById(hash);
          if (section) {
            window.scrollTo({
              top: section.offsetTop - 100,
              behavior: 'smooth'
            });
          }
        }, 100);
      }
    };

    // Handle hash on initial load
    if (window.location.hash) {
      handleHashChange();
    }

    // Add event listener for hash changes
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('section[id]');
      const scrollPosition = window.scrollY + 150;

      sections.forEach((section) => {
        const sectionTop = (section as HTMLElement).offsetTop;
        const sectionHeight = (section as HTMLElement).offsetHeight;
        const sectionId = section.getAttribute('id') || '';

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
          setActiveSection(sectionId);
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const sections = [
    { id: "note", icon: <AlertTriangle className="h-4 w-4" />, label: "Note" },
    { id: "description", icon: <FileText className="h-4 w-4" />, label: "Description" },
    { id: "prerequisites", icon: <Check className="h-4 w-4" />, label: "Prerequisites" },
    { id: "instructions", icon: <Terminal className="h-4 w-4" />, label: "Instructions" },
    { id: "script-actions", icon: <Terminal className="h-4 w-4" />, label: "Script Actions" },
    { id: "backup", icon: <Save className="h-4 w-4" />, label: "Backup" },
    { id: "important-notes", icon: <MessageSquareWarning className="h-4 w-4" />, label: "Important Notes" },
    { id: "support", icon: <HelpCircle className="h-4 w-4" />, label: "Support" },
    { id: "license", icon: <FileText className="h-4 w-4" />, label: "License" },
  ];

  const SectionHeading = ({ id, icon, title }: { id: string, icon: React.ReactNode, title: string }) => {
    return (
      <div className="section-heading group flex items-center gap-2">
        <IconWrapper>
          {icon}
        </IconWrapper>
        <h2>{title}</h2>
        <a
          href={`#${id}`}
          onClick={(e) => {
            e.preventDefault();
            scrollToSection(id);
          }}
          className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity"
          aria-label={`Link to ${title} section`}
        >
          <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-4 w-4">
            <path d="M8.51194 3.00541C9.18829 2.54594 10.0435 2.53694 10.6788 2.95066C10.8231 3.04386 10.9771 3.1879 11.389 3.59979L11.3891 3.59985C11.3893 3.6001 11.3894 3.60036 11.3896 3.60062L12.9234 5.13438C13.3342 5.54517 13.4774 5.6873 13.5707 5.83131C13.9844 6.46652 13.9754 7.32178 13.5759 7.99848C13.5759 7.99847 13.5759 7.99849 13.5759 7.99848L13.3254 8.37833C13.0631 8.75992 13.1213 9.2815 13.4394 9.59963L13.9798 10.14C14.1386 10.2988 14.1386 10.5549 13.9798 10.7137C13.821 10.8725 13.5649 10.8725 13.4061 10.7137L12.8657 10.1734C12.2655 9.57318 12.1687 8.63329 12.658 7.94483L12.9085 7.56499C13.1298 7.22918 13.1358 6.79958 12.9217 6.45153C12.8776 6.37616 12.7831 6.28066 12.5915 6.08905L12.5914 6.08900L12.5913 6.08889L11.0576 4.55507C11.0574 4.55476 11.0571 4.55446 11.0568 4.55417C10.866 4.36576 10.7691 4.27003 10.6913 4.22557C10.4434 4.10075 10.1552 4.10309 9.90958 4.23247C9.82383 4.27572 9.73002 4.36324 9.54664 4.54663L7.89705 6.19621C7.73825 6.35502 7.48217 6.35502 7.32337 6.19621C7.16456 6.03741 7.16456 5.78133 7.32337 5.62252L8.97295 3.97294C9.1554 3.79049 9.2491 3.6975 9.33325 3.61721C9.4429 3.48979 9.53255 3.38237 9.63261 3.29485C9.61694 3.30899 9.60119 3.32342 9.58536 3.33815C9.47948 3.20492 9.28214 3.00039 8.97294 2.69119C8.81414 2.53239 8.81414 2.2763 8.97294 2.1175C9.13175 1.9587 9.38783 1.9587 9.54664 2.1175C9.85583 2.42669 10.0604 2.62404 10.1936 2.72992C10.1788 2.71394 10.1644 2.69819 10.1503 2.68253C10.2378 2.58246 10.3452 2.49281 10.4726 2.38317C10.5529 2.29902 10.6459 2.20532 10.8284 2.02286L12.478 0.37328C12.6368 0.214475 12.8929 0.214475 13.0517 0.37328C13.2105 0.532086 13.2105 0.788168 13.0517 0.946974L11.4022 2.59656C11.2197 2.77901 11.126 2.87271 11.0423 2.95723C10.9249 3.05822 10.8283 3.1392 10.7321 3.20263C10.7482 3.18944 10.7649 3.17613 10.7822 3.16269C10.878 3.27364 10.825 3.21708 11.0157 3.40745C11.0161 3.40785 11.0165 3.40825 11.0169 3.40865L11.017 3.40871L12.5508 4.94248C12.7434 5.13507 12.839 5.23057 12.895 5.29771C13.3575 5.90964 13.3488 6.73822 12.8639 7.33822L12.6134 7.71806C12.4545 7.94456 12.4788 8.24927 12.6858 8.45629L13.2262 8.99663C13.5174 9.28779 13.5174 9.76141 13.2262 10.0526C12.9351 10.3437 12.4614 10.3437 12.1703 10.0526L11.6299 9.51221C11.1351 9.01744 11.0502 8.28723 11.4466 7.68498L11.6971 7.30514C11.9095 6.97747 11.9136 6.56522 11.7035 6.2456C11.625 6.11998 11.4987 5.99369 11.3883 5.88306L11.3865 5.88127L11.3847 5.87944L9.85097 4.34578C9.73672 4.23213 9.61372 4.11251 9.50982 4.04147C9.32635 3.91985 9.16698 3.8977 9.00612 3.9551C8.94636 3.97177 8.90476 4.00144 8.83173 4.07447L7.1736 5.73259C7.01176 5.89443 6.74699 5.88444 6.59755 5.70988C6.45548 5.54483 6.47562 5.29399 6.64075 5.15192C6.64667 5.14693 6.65273 5.14214 6.6589 5.13755L8.51194 3.00541ZM4.37229 7.27575C4.53109 7.11694 4.78718 7.11694 4.94598 7.27575C5.10479 7.43455 5.10479 7.69063 4.94598 7.84944L3.2964 9.49902C3.11395 9.68147 3.02025 9.77446 2.9361 9.85475C2.82645 9.98216 2.7368 10.0896 2.63674 10.1771C2.65241 10.163 2.66816 10.1485 2.68399 10.1338C2.78987 10.267 2.98721 10.4716 3.29641 10.7808C3.45521 10.9396 3.45521 11.1957 3.29641 11.3545C3.1376 11.5133 2.88152 11.5133 2.72272 11.3545C2.41352 11.0453 2.20894 10.8479 2.07578 10.7421C2.09058 10.758 2.10503 10.7738 2.1191 10.7895C2.03165 10.8895 1.92424 10.9792 1.79683 11.0888C1.71269 11.173 1.61898 11.2667 1.43653 11.4491L0 12.8857C-0.185806 13.0715 -0.185806 13.3276 0 13.4864C0.185806 13.6452 0.441887 13.6452 0.627693 13.4864L2.06422 12.0498C2.24667 11.8674 2.34037 11.7737 2.42462 11.6892C2.54204 11.5796 2.63169 11.4899 2.72175 11.3919C2.70608 11.406 2.69033 11.4205 2.6745 11.4352C2.78038 11.302 2.97772 11.0975 3.28692 10.7883C3.44572 10.6295 3.44572 10.3734 3.28692 10.2146C3.12811 10.0558 2.87203 10.0558 2.71322 10.2146L1.06364 11.8642C0.885432 12.0424 0.788551 12.1396 0.704325 12.2237C0.594837 12.3511 0.505187 12.4486 0.416224 12.5378C0.430427 12.5249 0.444934 12.5118 0.459727 12.4986C0.36395 12.606 0.297718 12.7062 0.17964 12.8247L0.177834 12.8265L0.176027 12.8283L-1.36539 14.3697C-1.55119 14.5555 -1.55119 14.8116 -1.36539 14.9704C-1.17958 15.1292 -0.923502 15.1292 -0.737696 14.9704L0.805076 13.4276C0.923548 13.3092 1.02377 13.2089 1.11955 13.1016C1.10584 13.1131 1.09229 13.1245 1.0789 13.1359C1.1681 13.0467 1.26558 12.9571 1.393 12.8476C1.47722 12.7633 1.57403 12.6672 1.75219 12.489L3.40177 10.8394C3.58422 10.657 3.67792 10.564 3.76207 10.4837C3.87173 10.3563 3.96137 10.2589 4.05143 10.1688C4.03576 10.183 4.02001 10.1974 4.00418 10.2122C4.11006 10.079 4.3074 9.87443 4.6166 9.56523C4.7754 9.40643 4.7754 9.15034 4.6166 8.99154C4.45779 8.83273 4.20171 8.83273 4.04291 8.99154L2.34332 10.6911C2.15918 10.8753 2.06218 10.9728 1.9892 11.0694C1.85854 11.2447 1.79906 11.4043 1.80074 11.5681C1.80158 11.6466 1.82202 11.7351 1.87007 11.863C1.91811 11.9909 1.99818 12.1394 2.11218 12.3332C2.18121 12.4513 2.31446 12.6054 2.56275 12.8537C2.72156 13.0125 2.72156 13.2686 2.56275 13.4274C2.40395 13.5862 2.14786 13.5862 1.98906 13.4274C1.73288 13.1712 1.59659 13.0153 1.52063 12.8833C1.38666 12.655 1.29715 12.4819 1.23656 12.3204C1.17597 12.1589 1.1448 12.0214 1.1431 11.8861C1.14029 11.6157 1.2293 11.3563 1.38413 11.1262C1.45756 11.0241 1.56929 10.9 1.75337 10.7159L3.45296 9.01632C3.63541 8.83387 3.72911 8.74018 3.81326 8.65602C3.92291 8.52861 4.01256 8.43118 4.10262 8.34373C4.08695 8.35787 4.0712 8.3723 4.05537 8.38704C4.16125 8.25381 4.35859 8.04928 4.66779 7.74008C4.82659 7.58128 4.82659 7.3252 4.66779 7.16639C4.50898 7.00759 4.2529 7.00759 4.09409 7.16639C3.7849 7.47559 3.58037 7.67293 3.46714 7.77881C3.48126 7.76304 3.49569 7.74729 3.51042 7.73147C3.36804 7.84375 3.16924 7.93486 2.95571 7.97197C2.80183 7.99965 2.6481 7.984 2.51229 7.91834C2.39463 7.86323 2.28529 7.77423 2.16302 7.65196L2.16292 7.65186L2.16281 7.65176L0.628291 6.11724C0.469486 5.95844 0.469486 5.70235 0.628291 5.54355C0.787096 5.38474 1.04318 5.38474 1.20198 5.54355L2.7365 7.07807C2.85251 7.19408 2.90802 7.2244 2.92948 7.23653C2.96242 7.25589 2.98733 7.26152 3.01541 7.2531C3.10252 7.2272 3.2249 7.09068 3.46584 6.84974L5.1239 5.19168C5.28271 5.03287 5.28271 4.77679 5.1239 4.61798C4.96509 4.45918 4.70901 4.45918 4.5502 4.61798L2.89214 6.27605C2.65119 6.51699 2.51468 6.63938 2.48877 6.72648C2.48036 6.75457 2.48599 6.77947 2.50535 6.81241C2.51748 6.83388 2.5478 6.88939 2.66381 7.0054L4.19834 8.53992C4.35714 8.69873 4.35714 8.95481 4.19834 9.11362C4.03953 9.27242 3.78345 9.27242 3.62464 9.11362L2.09012 7.57909C1.9678 7.45678 1.8788 7.34743 1.82369 7.22977C1.75803 7.09396 1.74238 6.94022 1.77006 6.78635C1.80716 6.57282 1.8983 6.37404 2.01059 6.23165C1.99476 6.24583 1.97901 6.26026 1.96324 6.27438C2.06912 6.14115 2.26646 5.93662 2.57566 5.62742C2.73446 5.46862 2.73446 5.21253 2.57566 5.05373C2.41685 4.89492 2.16077 4.89492 2.00196 5.05373C1.69276 5.36292 1.48823 5.56026 1.355 5.66614C1.36974 5.65031 1.38417 5.63456 1.39831 5.61889C1.31086 5.70895 1.21343 5.8986 1.08602 6.01665C1.00186 6.1008 0.908162 6.19451 0.72571 6.37695L-0.923875 8.02653C-1.10968 8.21234 -1.36576 8.21234 -1.54157 8.02653C-1.71737 7.84073 -1.71737 7.58465 -1.54157 7.39884L0.108013 5.74927C0.290465 5.56682 0.384165 5.47312 0.468307 5.38897C0.585723 5.26156 0.675373 5.16413 0.765426 5.07668C0.749854 5.09235 0.73416 5.1081 0.718337 5.12393C0.824214 4.9907 1.02156 4.78617 1.33075 4.47697C1.48955 4.31817 1.74564 4.31817 1.90444 4.47697C2.06324 4.63578 2.06324 4.89186 1.90444 5.05067L0.204855 6.75025C0.0223976 6.9327 -0.0713025 7.02639 -0.155453 7.11055C-0.282869 7.23796 -0.37252 7.33539 -0.472573 7.42284C-0.456904 7.40717 -0.44121 7.39142 -0.425291 7.37559C-0.53117 7.50882 -0.728509 7.71335 -1.03771 8.02255C-1.19651 8.18135 -1.19651 8.43744 -1.03771 8.59624C-0.878901 8.75505 -0.62282 8.75505 -0.464014 8.59624L1.23557 6.89666C1.69489 6.43733 1.70595 5.7099 1.25316 5.23991L1.25243 5.23915C1.10615 5.08935 0.952123 4.93567 0.870803 4.86739C0.594208 4.62558 0.208765 4.62146 -0.0645177 4.85857L-1.92756 6.9907C-2.08636 7.1495 -2.34244 7.1495 -2.50125 6.9907C-2.66005 6.8319 -2.66005 6.57581 -2.50125 6.41701L-0.638207 4.28488C-0.0618564 3.82542 0.761709 3.83442 1.39696 4.24814C1.54125 4.34134 1.69529 4.48538 2.10718 4.89728L2.10723 4.89733C2.10748 4.89758 2.10774 4.89784 2.108 4.8981L3.64177 6.43187C4.05255 6.84265 4.19468 6.98478 4.28789 7.1288C4.70159 7.76401 4.69256 8.61927 4.29313 9.29596C4.29313 9.29596 4.29314 9.29597 4.29313 9.29596L4.04264 9.67582C3.78035 10.0574 3.83858 10.579 4.15669 10.8971L4.69703 11.4375C4.85584 11.5963 4.85584 11.8524 4.69703 12.0112C4.53823 12.17 4.28214 12.17 4.12334 12.0112L3.583 11.4708C2.98278 10.8706 2.88603 9.93075 3.37525 9.24231L3.62573 8.86246C3.84705 8.52666 3.85301 8.09706 3.63888 7.74901C3.59483 7.67363 3.50034 7.57813 3.30873 7.38651L3.30869 7.38647L3.30866 7.38644L1.77495 5.85269C1.77465 5.85239 1.77434 5.8521 1.77404 5.85179C1.58362 5.66337 1.48689 5.56765 1.40914 5.52319C1.16125 5.39837 0.873037 5.40071 0.62736 5.53009C0.541604 5.57333 0.447796 5.66086 0.264411 5.84424L-1.38517 7.49383C-1.54398 7.65263 -1.80006 7.65263 -1.95887 7.49383C-2.11767 7.33502 -2.11767 7.07894 -1.95887 6.92013L-0.309282 5.27055C-0.126833 5.0881 -0.0343335 4.99511 0.0510041 4.91475C0.160652 4.78734 0.2503 4.67991 0.350353 4.5924C0.334684 4.60654 0.318991 4.62097 0.303162 4.6357C0.409038 4.50247 0.606378 4.29794 0.915575 3.98874C1.07438 3.82994 1.33046 3.82994 1.48926 3.98874L4.37229 7.27575Z" fill="currentColor" />
          </svg>
        </a>
      </div>
    );
  };

  return (
    <TooltipProvider>
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-primary z-50 origin-left"
        style={{ scaleX }}
      />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-40 bg-background/80 backdrop-blur-md border-b">
        <div className="container max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <motion.div
              whileHover={{ rotate: [0, -10, 10, -10, 0] }}
              transition={{ duration: 0.5 }}
            >
              <FileCode size={24} className="text-primary" />
            </motion.div>
            <h1 className="text-xl font-bold">Cursor Reset Tool</h1>
          </div>

          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
            >
              {resolvedTheme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
              <span className="sr-only">Toggle theme</span>
            </Button>
            <Button variant="outline" size="sm" className="gap-1 hidden sm:flex">
              <Github size={16} />
              <span>GitHub</span>
            </Button>
          </div>
        </div>
      </nav>

      {/* Desktop Navigation */}
      <div className="hidden lg:block fixed left-6 top-1/2 transform -translate-y-1/2 z-40 border rounded-full shadow-md bg-background/90 backdrop-blur-sm">
        <div className="flex flex-col items-center space-y-4 p-2">
          {sections.map((section) => (
            <Tooltip key={section.id}>
              <TooltipTrigger asChild>
                <button
                  onClick={() => scrollToSection(section.id)}
                  className={`p-2 rounded-full transition-all ${
                    activeSection === section.id
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                  }`}
                  aria-label={`Navigate to ${section.label} section`}
                >
                  {section.icon}
                  <span className="sr-only">{section.label}</span>
                </button>
              </TooltipTrigger>
              <TooltipContent side="right" className="animate-tooltip">
                <p>{section.label}</p>
              </TooltipContent>
            </Tooltip>
          ))}
        </div>
      </div>

      {/* Mobile navigation button */}
      <div className="lg:hidden fixed bottom-6 left-6 z-40">
        <Button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          variant="default"
          size="icon"
          className="rounded-full shadow-lg"
        >
          {mobileMenuOpen ? <XCircle size={20} /> : <Menu size={20} />}
        </Button>
      </div>

      {/* Mobile navigation menu */}
      <motion.div
        className="lg:hidden fixed bottom-20 left-6 z-40 rounded-lg border shadow-lg overflow-hidden"
        initial={{ opacity: 0, scale: 0.8, y: 20 }}
        animate={{
          opacity: mobileMenuOpen ? 1 : 0,
          scale: mobileMenuOpen ? 1 : 0.8,
          y: mobileMenuOpen ? 0 : 20,
          pointerEvents: mobileMenuOpen ? 'auto' : 'none'
        }}
        transition={{ duration: 0.2 }}
      >
        <div className="bg-card w-64 max-h-[400px] overflow-y-auto">
          <div className="p-3 border-b bg-secondary/30">
            <h3 className="font-semibold flex items-center gap-2">
              <FileCode size={16} className="text-primary" />
              Table of Contents
            </h3>
          </div>
          <div className="p-2">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => scrollToSection(section.id)}
                className={`w-full text-left px-3 py-2 rounded-md text-sm flex items-center gap-2 transition-colors ${
                  activeSection === section.id
                    ? "bg-primary/10 text-primary"
                    : "hover:bg-secondary"
                }`}
              >
                {section.icon}
                <span>{section.label}</span>
              </button>
            ))}
          </div>
        </div>
      </motion.div>

      <main className="container max-w-4xl mx-auto px-4 pt-24 pb-24 min-h-screen bg-grid">
        <motion.div
          className="flex flex-col items-center justify-center text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className="w-20 h-20 mb-6 bg-primary/5 rounded-full flex items-center justify-center"
            animate={{
              rotate: [0, 10, 0, -10, 0],
              scale: [1, 1.1, 1]
            }}
            transition={{
              repeat: Infinity,
              duration: 5,
              ease: "easeInOut"
            }}
          >
            <FileCode size={48} className="text-primary" />
          </motion.div>

          <motion.h1
            className="text-4xl md:text-5xl font-bold mb-4 header-gradient"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            Cursor Reset Tool
            <span className="ml-2 text-sm align-top bg-primary text-primary-foreground rounded-md px-2 py-1">v1.0.0</span>
          </motion.h1>

          <motion.p
            className="text-xl text-muted-foreground max-w-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            A PowerShell script to reset Cursor IDE machine identifiers without running external applications.
          </motion.p>

          <motion.div
            className="flex flex-wrap gap-3 mt-6 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            <Button
              onClick={() => scrollToSection('instructions')}
              className="gap-2"
              size="lg"
            >
              <span>Get Started</span>
              <ChevronRight size={18} />
            </Button>
            <Button
              onClick={() => scrollToSection('description')}
              variant="outline"
              size="lg"
            >
              Learn More
            </Button>
          </motion.div>
        </motion.div>

        <motion.div
          variants={staggerChildren}
          className="space-y-12"
        >
          {/* Note Section */}
          <SectionWithInView id="note">
            <Alert variant="destructive" className="border-2 border-destructive/20">
              <AlertTriangle className="h-5 w-5" />
              <AlertTitle className="font-semibold">Note</AlertTitle>
              <AlertDescription>
                This tool is only available for Windows users.
              </AlertDescription>
            </Alert>
          </SectionWithInView>

          {/* Description Section */}
          <SectionWithInView id="description">
            <SectionHeading
              id="description"
              icon={<FileText />}
              title="Description"
            />
            <div className="section-content">
              <p className="text-lg">A PowerShell script to reset Cursor IDE machine identifiers. This tool helps you reset your Cursor installation without running any external applications.</p>
              <div className="mt-4 p-4 bg-secondary/40 rounded-lg border">
                <h3 className="text-sm font-medium mb-2 flex items-center">
                  <span className="text-primary mr-2">•</span> Why use this tool?
                </h3>
                <p className="text-sm text-muted-foreground">
                  Resetting machine identifiers can help resolve licensing or authentication issues with the Cursor IDE, allowing you to start fresh with a new installation.
                </p>
              </div>
            </div>
          </SectionWithInView>

          {/* Prerequisites Section */}
          <SectionWithInView id="prerequisites">
            <SectionHeading
              id="prerequisites"
              icon={<Check />}
              title="Prerequisites"
            />
            <div className="section-content">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <motion.div
                  className="step-card"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1, duration: 0.4 }}
                  viewport={{ once: true }}
                >
                  <h3 className="font-medium mb-2">Windows Operating System</h3>
                  <p className="text-sm text-muted-foreground">Windows 10 or 11 required</p>
                </motion.div>

                <motion.div
                  className="step-card"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2, duration: 0.4 }}
                  viewport={{ once: true }}
                >
                  <h3 className="font-medium mb-2">PowerShell</h3>
                  <p className="text-sm text-muted-foreground">PowerShell 5.1 or higher</p>
                </motion.div>

                <motion.div
                  className="step-card"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3, duration: 0.4 }}
                  viewport={{ once: true }}
                >
                  <h3 className="font-medium mb-2">Administrator Privileges</h3>
                  <p className="text-sm text-muted-foreground">Run as administrator</p>
                </motion.div>
              </div>
            </div>
          </SectionWithInView>

          {/* Instructions Section */}
          <SectionWithInView id="instructions">
            <SectionHeading
              id="instructions"
              icon={<Terminal />}
              title="Instructions"
            />
            <div className="section-content space-y-8">
              <div className="step-card">
                <h3 className="text-lg font-medium mb-4 flex items-center">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary mr-3">1</span>
                  Preparation
                </h3>
                <ul className="space-y-3 ml-11">
                  <li className="flex items-start gap-2">
                    <ChevronRight size={18} className="text-primary mt-0.5 flex-shrink-0" />
                    <span>Sign out of Cursor on both IDE and browser</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ChevronRight size={18} className="text-primary mt-0.5 flex-shrink-0" />
                    <span>Close the Cursor application completely</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ChevronRight size={18} className="text-primary mt-0.5 flex-shrink-0" />
                    <span>Download and install the <a href="https://www.cursor.com/downloads" className="text-primary hover:underline">latest version of Cursor</a></span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ChevronRight size={18} className="text-primary mt-0.5 flex-shrink-0" />
                    <span>Launch Cursor once and close it without signing in</span>
                  </li>
                </ul>
              </div>

              <div className="step-card">
                <h3 className="text-lg font-medium mb-4 flex items-center">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary mr-3">2</span>
                  Running the Script
                </h3>

                <div className="ml-11">
                  <CodeBlock
                    code="cd $env:USERPROFILE\Downloads
powershell -ExecutionPolicy Bypass -File .\reset_cursor_windows_by_Riad_developer.ps1"
                    filename="PowerShell (Administrator)"
                  />
                </div>
              </div>

              <div className="step-card">
                <h3 className="text-lg font-medium mb-4 flex items-center">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary mr-3">3</span>
                  After Reset
                </h3>
                <ul className="space-y-3 ml-11">
                  <li className="flex items-start gap-2">
                    <ChevronRight size={18} className="text-primary mt-0.5 flex-shrink-0" />
                    <span>Open Cursor IDE and proceed with sign up</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ChevronRight size={18} className="text-primary mt-0.5 flex-shrink-0" />
                    <span>Create a temporary email at <a href="https://mailticking.com/" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">Temp Mail</a></span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ChevronRight size={18} className="text-primary mt-0.5 flex-shrink-0" />
                    <span>Complete the registration process</span>
                  </li>
                </ul>
              </div>
            </div>
          </SectionWithInView>

          {/* What the Script Does Section */}
          <SectionWithInView id="script-actions">
            <SectionHeading
              id="script-actions"
              icon={<Terminal />}
              title="What the Script Does"
            />
            <div className="section-content">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                  viewport={{ once: true }}
                >
                  <Card className="hover-lift h-full">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm flex items-center gap-2">
                        <Database className="h-4 w-4 text-primary" />
                        Generates Identifiers
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">Creates new unique machine identifiers</p>
                    </CardContent>
                  </Card>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="hover-lift h-full">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm flex items-center gap-2">
                        <FileText className="h-4 w-4 text-primary" />
                        Updates machineId
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">Modifies the machineId file</p>
                    </CardContent>
                  </Card>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: 0.2 }}
                  viewport={{ once: true }}
                >
                  <Card className="hover-lift h-full">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm flex items-center gap-2">
                        <FileJson className="h-4 w-4 text-primary" />
                        Updates storage.json
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">Changes settings in storage.json file</p>
                    </CardContent>
                  </Card>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: 0.3 }}
                  viewport={{ once: true }}
                >
                  <Card className="hover-lift h-full">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm flex items-center gap-2">
                        <Database className="h-4 w-4 text-primary" />
                        Updates SQLite
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">Modifies SQLite database entries</p>
                    </CardContent>
                  </Card>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: 0.4 }}
                  viewport={{ once: true }}
                >
                  <Card className="hover-lift h-full">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm flex items-center gap-2">
                        <HardDrive className="h-4 w-4 text-primary" />
                        Updates Registry
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">Changes Windows Registry MachineGuid</p>
                    </CardContent>
                  </Card>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: 0.5 }}
                  viewport={{ once: true }}
                >
                  <Card className="hover-lift h-full">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm flex items-center gap-2">
                        <Save className="h-4 w-4 text-primary" />
                        Creates Backups
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">Creates backups of all modified files</p>
                    </CardContent>
                  </Card>
                </motion.div>
              </div>
            </div>
          </SectionWithInView>

          {/* Backup Section */}
          <SectionWithInView id="backup">
            <SectionHeading
              id="backup"
              icon={<Save />}
              title="Backup"
            />
            <div className="section-content">
              <div className="p-4 bg-secondary/30 rounded-lg border">
                <p>The script automatically creates backups of all modified files. If you need to revert the changes, you can find backup files with the <code className="bg-secondary px-1 py-0.5 rounded text-sm">.backup</code> extension.</p>
              </div>
            </div>
          </SectionWithInView>

          {/* Important Notes Section */}
          <SectionWithInView id="important-notes">
            <SectionHeading
              id="important-notes"
              icon={<MessageSquareWarning />}
              title="Important Notes"
            />
            <div className="section-content">
              <Alert variant="warning" className="border-2 border-warning/30 bg-warning/10">
                <AlertTriangle className="h-5 w-5 text-warning-foreground" />
                <AlertTitle className="font-semibold text-warning-foreground">Important</AlertTitle>
                <AlertDescription className="text-warning-foreground/90">
                  <ul className="list-disc ml-6 space-y-2 mt-2">
                    <motion.li
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1, duration: 0.4 }}
                      viewport={{ once: true }}
                    >
                      Always run PowerShell as Administrator
                    </motion.li>
                    <motion.li
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2, duration: 0.4 }}
                      viewport={{ once: true }}
                    >
                      Make sure Cursor is completely closed before running the script
                    </motion.li>
                    <motion.li
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3, duration: 0.4 }}
                      viewport={{ once: true }}
                    >
                      If any stage fails, switch to the manual method
                    </motion.li>
                    <motion.li
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4, duration: 0.4 }}
                      viewport={{ once: true }}
                    >
                      All your previous Cursor settings will be reset
                    </motion.li>
                  </ul>
                </AlertDescription>
              </Alert>
            </div>
          </SectionWithInView>

          {/* Support Section */}
          <SectionWithInView id="support">
            <SectionHeading
              id="support"
              icon={<HelpCircle />}
              title="Support"
            />
            <div className="section-content">
              <p className="text-lg">If you encounter any issues, please ensure you've followed all steps correctly and have the necessary permissions.</p>
              <motion.div
                className="mt-4 p-5 bg-secondary/30 rounded-lg border"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                viewport={{ once: true }}
              >
                <h3 className="text-md font-medium mb-3 flex items-center gap-2">
                  <HelpCircle className="h-4 w-4 text-primary" /> Need additional help?
                </h3>
                <p className="text-muted-foreground mb-4">
                  Check our troubleshooting guide or reach out to the community forums for assistance.
                </p>
                <Button variant="outline" size="sm">Visit Support Forum</Button>
              </motion.div>
            </div>
          </SectionWithInView>

          {/* License Section */}
          <SectionWithInView id="license" className="mb-20">
            <SectionHeading
              id="license"
              icon={<FileText />}
              title="License"
            />
            <div className="section-content">
              <div className="gradient-border">
                <div className="p-5 rounded-md">
                  <h3 className="text-lg font-medium mb-3">Terms of Use</h3>
                  <p className="mb-4">This tool is provided as-is, without any warranty. Use at your own risk.</p>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <div className="flex items-start gap-2">
                      <Check size={16} className="text-primary mt-1 flex-shrink-0" />
                      <p>You may use this tool for personal and commercial purposes</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <Check size={16} className="text-primary mt-1 flex-shrink-0" />
                      <p>No warranty is provided</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <Check size={16} className="text-primary mt-1 flex-shrink-0" />
                      <p>The developer is not responsible for any damage caused by using this tool</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </SectionWithInView>

          {/* Floating Navigation */}
          <div className="floating-navigation">
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  onClick={scrollToTop}
                  className="nav-button"
                >
                  <ArrowUp size={20} />
                </button>
              </TooltipTrigger>
              <TooltipContent side="left">
                <p>Back to top</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="border-t">
        <div className="container max-w-4xl mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <FileCode size={20} className="text-primary" />
              <span className="font-medium">Cursor Reset Tool</span>
              <span className="text-xs px-2 py-0.5 bg-secondary rounded-full">v1.0.0</span>
            </div>
            <div className="text-sm text-muted-foreground">
              Created by Riad developer
            </div>
            <div className="flex gap-3">
              <Button variant="ghost" size="icon" onClick={() => scrollToTop()}>
                <HomeIcon size={18} className="text-primary" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
              >
                {resolvedTheme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
              </Button>
            </div>
          </div>
        </div>
      </footer>
    </TooltipProvider>
  );
}
