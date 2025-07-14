"use client"

import type React from "react"
import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"
import {
  Menu,
  X,
  ArrowRight,
  Star,
  Zap,
  Shield,
  Users,
  ChevronLeft,
  ChevronRight,
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Sparkles,
  Rocket,
  Globe,
  Code,
  Award,
  TrendingUp,
  Target,
  Layers,
  Smartphone,
  Monitor,
  Tablet,
  Cloud,
  Cpu,
  Database,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

// Smooth scroll utility using native browser API
const smoothScrollTo = (target: string) => {
  if (typeof window !== "undefined") {
    const element = document.querySelector(target)
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  }
}

// Parallax Background Component
const ParallaxBackground = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const layer1Ref = useRef<HTMLDivElement>(null)
  const layer2Ref = useRef<HTMLDivElement>(null)
  const layer3Ref = useRef<HTMLDivElement>(null)
  const layer4Ref = useRef<HTMLDivElement>(null)
  const layer5Ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (typeof window === "undefined") return

    const handleScroll = () => {
      const scrollY = window.scrollY

      // Layer 1 - Slowest (background stars)
      if (layer1Ref.current) {
        layer1Ref.current.style.transform = `translateY(${scrollY * 0.1}px) rotate(${scrollY * 0.01}deg)`
      }

      // Layer 2 - Slow (large shapes)
      if (layer2Ref.current) {
        layer2Ref.current.style.transform = `translateY(${scrollY * 0.2}px) translateX(${scrollY * 0.05}px)`
      }

      // Layer 3 - Medium (medium shapes)
      if (layer3Ref.current) {
        layer3Ref.current.style.transform = `translateY(${scrollY * 0.3}px) translateX(${scrollY * -0.03}px) rotate(${scrollY * -0.02}deg)`
      }

      // Layer 4 - Fast (small elements)
      if (layer4Ref.current) {
        layer4Ref.current.style.transform = `translateY(${scrollY * 0.5}px) translateX(${scrollY * 0.08}px)`
      }

      // Layer 5 - Fastest (foreground particles)
      if (layer5Ref.current) {
        layer5Ref.current.style.transform = `translateY(${scrollY * 0.7}px) translateX(${scrollY * -0.1}px) rotate(${scrollY * 0.03}deg)`
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div ref={containerRef} className="fixed inset-0 pointer-events-none overflow-hidden">
      {/* Layer 1 - Background Stars */}
      <div ref={layer1Ref} className="absolute inset-0">
        {[...Array(50)].map((_, i) => (
          <div
            key={`star-${i}`}
            className="absolute w-1 h-1 bg-white/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      {/* Layer 2 - Large Geometric Shapes */}
      <div ref={layer2Ref} className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-gradient-to-r from-blue-500/8 to-cyan-500/8 rounded-full blur-3xl" />
        <div className="absolute top-2/3 left-1/6 w-48 h-48 bg-gradient-to-r from-green-500/8 to-teal-500/8 rounded-full blur-2xl" />
      </div>

      {/* Layer 3 - Medium Shapes */}
      <div ref={layer3Ref} className="absolute inset-0">
        <div className="absolute top-1/6 right-1/3 w-32 h-32 bg-gradient-to-r from-yellow-500/15 to-orange-500/15 rounded-full blur-xl" />
        <div className="absolute bottom-1/4 left-1/3 w-40 h-40 bg-gradient-to-r from-indigo-500/12 to-purple-500/12 rounded-full blur-xl" />
        <div className="absolute top-1/2 right-1/6 w-24 h-24 bg-gradient-to-r from-pink-500/18 to-red-500/18 rounded-full blur-lg" />
      </div>

      {/* Layer 4 - Small Elements */}
      <div ref={layer4Ref} className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <div
            key={`element-${i}`}
            className="absolute w-2 h-2 bg-gradient-to-r from-cyan-400/30 to-blue-400/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              transform: `scale(${0.5 + Math.random() * 0.5})`,
            }}
          />
        ))}
      </div>

      {/* Layer 5 - Foreground Particles */}
      <div ref={layer5Ref} className="absolute inset-0">
        {[...Array(15)].map((_, i) => (
          <div
            key={`particle-${i}`}
            className="absolute w-3 h-3 bg-gradient-to-r from-white/20 to-purple-400/20 rounded-full blur-sm"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
            }}
          />
        ))}
      </div>
    </div>
  )
}

// Custom Cursor Component
const CustomCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null)
  const followerRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (typeof window === "undefined") return

    // Only show cursor on desktop
    const checkDevice = () => {
      setIsVisible(window.innerWidth > 1024)
    }

    checkDevice()
    window.addEventListener("resize", checkDevice)

    if (!isVisible) return

    const cursor = cursorRef.current
    const follower = followerRef.current

    const moveCursor = (e: MouseEvent) => {
      if (cursor && follower) {
        cursor.style.transform = `translate(${e.clientX - 8}px, ${e.clientY - 8}px)`
        follower.style.transform = `translate(${e.clientX - 16}px, ${e.clientY - 16}px)`
      }
    }

    const handleMouseEnter = () => {
      if (cursor && follower) {
        cursor.style.transform += " scale(1.5)"
        follower.style.transform += " scale(1.5)"
      }
    }

    const handleMouseLeave = () => {
      if (cursor && follower) {
        cursor.style.transform = cursor.style.transform.replace(" scale(1.5)", "")
        follower.style.transform = follower.style.transform.replace(" scale(1.5)", "")
      }
    }

    document.addEventListener("mousemove", moveCursor)

    const interactiveElements = document.querySelectorAll("button, a, input, textarea, .interactive")
    interactiveElements.forEach((el) => {
      el.addEventListener("mouseenter", handleMouseEnter)
      el.addEventListener("mouseleave", handleMouseLeave)
    })

    return () => {
      document.removeEventListener("mousemove", moveCursor)
      window.removeEventListener("resize", checkDevice)
      interactiveElements.forEach((el) => {
        el.removeEventListener("mouseenter", handleMouseEnter)
        el.removeEventListener("mouseleave", handleMouseLeave)
      })
    }
  }, [isVisible])

  if (!isVisible) return null

  return (
    <>
      <div
        ref={cursorRef}
        className="fixed w-4 h-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full pointer-events-none z-50 mix-blend-difference hidden lg:block transition-transform duration-100"
      />
      <div
        ref={followerRef}
        className="fixed w-8 h-8 border-2 border-purple-500 rounded-full pointer-events-none z-50 opacity-50 hidden lg:block transition-transform duration-300"
      />
    </>
  )
}

// Particle System Component
const ParticleSystem = () => {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (typeof window === "undefined") return

    const container = containerRef.current
    if (!container) return

    const particleCount = window.innerWidth < 768 ? 20 : 50

    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement("div")
      particle.className = "absolute w-1 h-1 bg-gradient-to-r from-blue-400 to-purple-600 rounded-full opacity-70"
      particle.style.left = Math.random() * 100 + "%"
      particle.style.top = Math.random() * 100 + "%"
      container.appendChild(particle)

      // Simple CSS animation instead of GSAP
      particle.style.animation = `float ${Math.random() * 3 + 2}s infinite linear`
      particle.style.animationDelay = `${Math.random() * 2}s`
    }

    return () => {
      if (container) {
        container.innerHTML = ""
      }
    }
  }, [])

  return <div ref={containerRef} className="absolute inset-0 overflow-hidden pointer-events-none" />
}

// Loading Screen Component
const LoadingScreen = ({ onComplete }: { onComplete: () => void }) => {
  const loadingRef = useRef<HTMLDivElement>(null)
  const progressRef = useRef<HTMLDivElement>(null)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    if (typeof window === "undefined") return

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer)
          setTimeout(onComplete, 500)
          return 100
        }
        return prev + 2
      })
    }, 50)

    return () => clearInterval(timer)
  }, [onComplete])

  return (
    <div
      ref={loadingRef}
      className="fixed inset-0 bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center z-50"
    >
      <div className="text-center px-4">
        <div className="text-6xl md:text-8xl mb-8 animate-pulse">✨</div>
        <div className="w-48 sm:w-64 h-1 bg-gray-700 rounded-full mb-8 overflow-hidden mx-auto">
          <div
            ref={progressRef}
            className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full transition-all duration-100"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="text-xl md:text-2xl font-bold text-white">
          {progress < 100 ? "Loading..." : "Welcome to the Future"}
        </div>
      </div>
    </div>
  )
}

// Enhanced Navbar
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState("home")
  const navRef = useRef<HTMLElement>(null)

  const navItems = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Features", href: "#features" },
    { name: "Services", href: "#services" },
    { name: "Testimonials", href: "#testimonials" },
    { name: "Contact", href: "#contact" },
  ]

  useEffect(() => {
    if (typeof window === "undefined") return

    const handleScroll = () => {
      setScrolled(window.scrollY > 50)

      // Update active section based on scroll position
      const sections = navItems.map((item) => item.href.substring(1))
      const currentSection = sections.find((section) => {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          return rect.top <= 100 && rect.bottom >= 100
        }
        return false
      })

      if (currentSection) {
        setActiveSection(currentSection)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [navItems])

  const handleNavClick = (href: string) => {
    setIsOpen(false)
    smoothScrollTo(href)
  }

  return (
    <motion.nav
      ref={navRef}
      className={`fixed top-0 w-full z-40 transition-all duration-500 ${scrolled ? "bg-white/10 backdrop-blur-xl border-b border-white/20 shadow-2xl" : "bg-transparent"
        }`}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1, delay: 2.5 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 sm:h-20">
          <motion.div
            className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent interactive cursor-pointer"
            whileHover={{ scale: 1.1 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
            onClick={() => smoothScrollTo("#home")}
          >
            ✨ NEXUS
          </motion.div>

          {/* Desktop Menu */}
          <div className="hidden lg:flex space-x-6 xl:space-x-8">
            {navItems.map((item, index) => (
              <motion.button
                key={item.name}
                onClick={() => handleNavClick(item.href)}
                className={`relative text-white/90 hover:text-white transition-colors text-base xl:text-lg font-medium group interactive ${activeSection === item.href.substring(1) ? "text-white" : ""
                  }`}
                whileHover={{ y: -2 }}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 + 2.5 }}
              >
                {item.name}
                <span
                  className={`absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-purple-400 to-pink-400 transition-all duration-300 ${activeSection === item.href.substring(1) ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                />
              </motion.button>
            ))}
          </div>

          {/* Desktop CTA Button */}
          <motion.div className="hidden md:block" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-4 lg:px-6 py-2 lg:py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 interactive text-sm lg:text-base"
              onClick={() => handleNavClick("#contact")}
            >
              Get Started
              <Sparkles className="ml-2 w-4 h-4" />
            </Button>
          </motion.div>

          {/* Mobile Menu Button */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 text-white interactive"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </motion.button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden bg-black/20 backdrop-blur-xl rounded-2xl mt-4 overflow-hidden"
            >
              {navItems.map((item, index) => (
                <motion.button
                  key={item.name}
                  onClick={() => handleNavClick(item.href)}
                  className={`block w-full text-left px-6 py-4 text-white/90 hover:text-white hover:bg-white/10 transition-all interactive ${activeSection === item.href.substring(1) ? "bg-white/10 text-white" : ""
                    }`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  {item.name}
                </motion.button>
              ))}
              <motion.div
                className="p-4"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: navItems.length * 0.1 }}
              >
                <Button
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-3 rounded-full font-semibold interactive"
                  onClick={() => handleNavClick("#contact")}
                >
                  Get Started
                  <Sparkles className="ml-2 w-4 h-4" />
                </Button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  )
}

// Enhanced Hero Section with Advanced Parallax
const HeroSection = () => {
  const heroRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const typewriterRef = useRef<HTMLDivElement>(null)
  const [typewriterText, setTypewriterText] = useState("IMPOSSIBLE")

  const { scrollY } = useScroll()
  const y1 = useTransform(scrollY, [0, 1000], [0, -300])
  const y2 = useTransform(scrollY, [0, 1000], [0, -200])
  const y3 = useTransform(scrollY, [0, 1000], [0, -100])
  const opacity1 = useTransform(scrollY, [0, 500], [1, 0])
  const scale1 = useTransform(scrollY, [0, 500], [1, 1.2])

  useEffect(() => {
    if (typeof window === "undefined") return

    // Typewriter effect
    const typewriterTexts = ["IMPOSSIBLE", "EXTRAORDINARY", "REVOLUTIONARY", "MAGNIFICENT", "INCREDIBLE"]
    let currentIndex = 0

    const typewriterInterval = setInterval(() => {
      currentIndex = (currentIndex + 1) % typewriterTexts.length
      setTypewriterText(typewriterTexts[currentIndex])
    }, 3000)

    return () => clearInterval(typewriterInterval)
  }, [])

  return (
    <section
      ref={heroRef}
      id="home"
      className="min-h-screen flex items-center justify-center relative overflow-hidden px-4 sm:px-6 lg:px-8"
      style={{
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      }}
    >
      {/* Parallax Layer 1 - Background */}
      <motion.div style={{ y: y1, opacity: opacity1, scale: scale1 }} className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/50 via-blue-900/30 to-indigo-900/50" />
        <ParticleSystem />
        {/* Large background shapes */}
        <div className="absolute top-1/4 left-1/6 w-96 h-96 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/6 w-80 h-80 bg-gradient-to-r from-blue-400/15 to-cyan-400/15 rounded-full blur-3xl" />
      </motion.div>

      {/* Parallax Layer 2 - Mid elements */}
      <motion.div style={{ y: y2 }} className="absolute inset-0">
        <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-gradient-to-r from-yellow-400/25 to-orange-400/25 rounded-full blur-2xl" />
        <div className="absolute bottom-1/3 left-1/4 w-48 h-48 bg-gradient-to-r from-green-400/20 to-teal-400/20 rounded-full blur-xl" />
        {/* Floating geometric shapes */}
        <div className="absolute top-1/2 left-1/3 w-32 h-32 bg-gradient-to-r from-indigo-400/30 to-purple-400/30 rounded-lg blur-lg rotate-45" />
        <div className="absolute top-2/3 right-1/3 w-24 h-24 bg-gradient-to-r from-pink-400/35 to-red-400/35 rounded-full blur-lg" />
      </motion.div>

      {/* Parallax Layer 3 - Foreground elements */}
      <motion.div style={{ y: y3 }} className="absolute inset-0">
        {/* Small floating particles */}
        {[...Array(15)].map((_, i) => (
          <div
            key={`float-${i}`}
            className="absolute w-4 h-4 bg-gradient-to-r from-white/30 to-cyan-400/30 rounded-full blur-sm animate-float"
            style={{
              left: `${20 + Math.random() * 60}%`,
              top: `${20 + Math.random() * 60}%`,
              animationDelay: `${Math.random() * 3}s`,
            }}
          />
        ))}
      </motion.div>

      <div className="max-w-7xl mx-auto text-center relative z-10">
        <motion.h1
          ref={titleRef}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black text-white leading-tight mb-6 sm:mb-8"
          style={{
            textShadow: "0 0 30px rgba(255,255,255,0.5)",
          }}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 3 }}
        >
          Create The
          <span className="block">
            <span
              ref={typewriterRef}
              className="bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 bg-clip-text text-transparent"
            >
              {typewriterText}
            </span>
            <span className="animate-pulse text-white">|</span>
          </span>
        </motion.h1>

        <motion.p
          ref={subtitleRef}
          className="text-lg sm:text-xl lg:text-2xl text-white/90 max-w-4xl mx-auto mb-8 sm:mb-12 leading-relaxed px-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 3.5 }}
        >
          Transform your wildest ideas into stunning digital experiences with cutting-edge technology, breathtaking
          animations, and designs that captivate every visitor.
        </motion.p>

        <motion.div
          ref={ctaRef}
          className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center px-4"
          initial={{ opacity: 0, y: 50, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, delay: 4 }}
        >
          <motion.div
            whileHover={{
              scale: 1.05,
              boxShadow: "0 20px 40px rgba(139, 92, 246, 0.3)",
            }}
            whileTap={{ scale: 0.95 }}
            className="group w-full sm:w-auto"
          >
            <Button
              size="lg"
              className="w-full sm:w-auto bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 hover:from-purple-700 hover:via-pink-700 hover:to-red-700 text-white px-8 sm:px-12 py-4 sm:py-6 text-lg sm:text-xl font-bold rounded-full shadow-2xl border-2 border-white/20 backdrop-blur-sm interactive"
              onClick={() => smoothScrollTo("#about")}
            >
              <Rocket className="mr-2 sm:mr-3 w-5 sm:w-6 h-5 sm:h-6" />
              Launch Your Vision
              <motion.div
                className="ml-2 sm:ml-3"
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
              >
                <ArrowRight size={20} />
              </motion.div>
            </Button>
          </motion.div>

          <motion.div
            whileHover={{
              scale: 1.05,
              backgroundColor: "rgba(255,255,255,0.1)",
            }}
            whileTap={{ scale: 0.95 }}
            className="w-full sm:w-auto"
          >
            <Button
              variant="outline"
              size="lg"
              className="w-full sm:w-auto px-8 sm:px-12 py-4 sm:py-6 text-lg sm:text-xl font-bold rounded-full bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white hover:bg-white/20 hover:border-white/50 interactive"
              onClick={() => smoothScrollTo("#features")}
            >
              <Globe className="mr-2 sm:mr-3 w-5 sm:w-6 h-5 sm:h-6" />
              Explore Magic
            </Button>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-6 sm:bottom-10 left-1/2 transform -translate-x-1/2 hidden sm:block"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
        >
          <div
            className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center interactive cursor-pointer"
            onClick={() => smoothScrollTo("#about")}
          >
            <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-pulse" />
          </div>
        </motion.div>
      </div>
    </section>
  )
}

// Enhanced About Section with Parallax
const AboutSection = () => {
  const sectionRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  const stats = [
    { number: "500+", label: "Projects Completed", icon: <Award className="w-6 h-6" /> },
    { number: "98%", label: "Client Satisfaction", icon: <TrendingUp className="w-6 h-6" /> },
    { number: "50+", label: "Team Members", icon: <Users className="w-6 h-6" /> },
    { number: "24/7", label: "Support Available", icon: <Shield className="w-6 h-6" /> },
  ]

  useEffect(() => {
    if (typeof window === "undefined") return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.3 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="about"
      className="py-16 sm:py-20 lg:py-32 bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900 relative overflow-hidden"
    >
      {/* Parallax Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-64 sm:w-96 h-64 sm:h-96 bg-purple-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-64 sm:w-96 h-64 sm:h-96 bg-pink-500/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12 sm:mb-16 lg:mb-20">
          <motion.h2
            className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-black text-white mb-4 sm:mb-6"
            initial={{ opacity: 0, y: 100 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1 }}
          >
            About
            <span className="block bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              Our Vision
            </span>
          </motion.h2>
          <motion.p
            className="text-lg sm:text-xl text-white/80 max-w-3xl mx-auto px-4"
            initial={{ opacity: 0, y: 50 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            We're not just building websites - we're crafting digital experiences that push the boundaries of what's
            possible.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 mb-16 sm:mb-20">
          <motion.div
            className="about-element"
            initial={{ opacity: 0, y: 50 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4 sm:mb-6">
              Innovation Meets Excellence
            </h3>
            <p className="text-base sm:text-lg text-white/70 mb-6 leading-relaxed">
              With cutting-edge technology and creative brilliance, we transform ideas into digital masterpieces. Our
              team of experts combines technical expertise with artistic vision to deliver solutions that exceed
              expectations.
            </p>
            <p className="text-base sm:text-lg text-white/70 leading-relaxed">
              From concept to deployment, we ensure every pixel serves a purpose and every interaction tells a story.
            </p>
          </motion.div>

          <motion.div
            className="about-element grid grid-cols-2 gap-4 sm:gap-6"
            initial={{ opacity: 0, y: 50 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 sm:p-6 border border-white/20">
              <Target className="w-8 h-8 sm:w-10 sm:h-10 text-purple-400 mb-3 sm:mb-4" />
              <h4 className="text-lg sm:text-xl font-bold text-white mb-2">Precision</h4>
              <p className="text-sm sm:text-base text-white/70">Every detail matters in our pursuit of perfection.</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 sm:p-6 border border-white/20">
              <Layers className="w-8 h-8 sm:w-10 sm:h-10 text-pink-400 mb-3 sm:mb-4" />
              <h4 className="text-lg sm:text-xl font-bold text-white mb-2">Depth</h4>
              <p className="text-sm sm:text-base text-white/70">Multi-layered solutions for complex challenges.</p>
            </div>
          </motion.div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="about-element bg-white/10 backdrop-blur-sm rounded-2xl p-4 sm:p-6 lg:p-8 border border-white/20 text-center group interactive"
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
              initial={{ opacity: 0, y: 50 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              style={{ transitionDelay: `${index * 0.1}s` }}
            >
              <div className="text-purple-400 mb-3 sm:mb-4 flex justify-center group-hover:scale-110 transition-transform">
                {stat.icon}
              </div>
              <div className="text-2xl sm:text-3xl lg:text-4xl font-black text-white mb-2">{stat.number}</div>
              <p className="text-xs sm:text-sm lg:text-base text-white/70">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// Technology Showcase Section
const TechnologyShowcase = () => {
  const sectionRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  const technologies = [
    { icon: <Cloud className="w-12 h-12" />, name: "Cloud Computing", color: "from-blue-500 to-cyan-500" },
    { icon: <Cpu className="w-12 h-12" />, name: "AI & Machine Learning", color: "from-purple-500 to-pink-500" },
    { icon: <Database className="w-12 h-12" />, name: "Big Data Analytics", color: "from-green-500 to-teal-500" },
    { icon: <Code className="w-12 h-12" />, name: "Advanced Frameworks", color: "from-orange-500 to-red-500" },
    { icon: <Shield className="w-12 h-12" />, name: "Cybersecurity", color: "from-indigo-500 to-purple-500" },
    { icon: <Zap className="w-12 h-12" />, name: "Performance Optimization", color: "from-yellow-500 to-orange-500" },
  ]

  useEffect(() => {
    if (typeof window === "undefined") return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.3 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="py-16 sm:py-20 lg:py-32 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12 sm:mb-16 lg:mb-20">
          <motion.h2
            className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-black text-white mb-4 sm:mb-6"
            initial={{ opacity: 0, y: 50 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1 }}
          >
            Technology
            <span className="block bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              Arsenal
            </span>
          </motion.h2>
          <motion.p
            className="text-lg sm:text-xl text-white/80 max-w-3xl mx-auto px-4"
            initial={{ opacity: 0, y: 30 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Powered by the most advanced technologies and frameworks in the industry.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {technologies.map((tech, index) => (
            <motion.div
              key={index}
              className="tech-card group interactive"
              whileHover={{ scale: 1.05, y: -10 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              initial={{ opacity: 0, y: 100 }}
              animate={isVisible ? { opacity: 1, y: 0, rotateY: 0 } : {}}
              style={{ transitionDelay: `${index * 0.2}s` }}
            >
              <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-6 sm:p-8 border border-white/10 hover:border-white/20 transition-all duration-300 h-full">
                <div
                  className={`inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r ${tech.color} text-white rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300`}
                >
                  {tech.icon}
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-4 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-300 transition-all duration-300">
                  {tech.name}
                </h3>
                <div className="w-full h-1 bg-gray-700 rounded-full overflow-hidden">
                  <div
                    className={`h-full bg-gradient-to-r ${tech.color} rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`}
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// Features Section
const FeaturesSection = () => {
  const sectionRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  const features = [
    {
      icon: <Zap className="w-8 sm:w-10 h-8 sm:h-10" />,
      title: "Lightning Speed",
      description: "Blazing fast performance with cutting-edge optimization techniques that leave competitors behind.",
      color: "from-yellow-400 to-orange-500",
      bgColor: "from-yellow-400/10 to-orange-500/10",
    },
    {
      icon: <Shield className="w-8 sm:w-10 h-8 sm:h-10" />,
      title: "Fort Knox Security",
      description: "Military-grade security protocols protecting your data with unbreachable encryption.",
      color: "from-green-400 to-blue-500",
      bgColor: "from-green-400/10 to-blue-500/10",
    },
    {
      icon: <Users className="w-8 sm:w-10 h-8 sm:h-10" />,
      title: "Team Synergy",
      description: "Revolutionary collaboration tools that synchronize minds and amplify productivity exponentially.",
      color: "from-purple-400 to-pink-500",
      bgColor: "from-purple-400/10 to-pink-500/10",
    },
    {
      icon: <Code className="w-8 sm:w-10 h-8 sm:h-10" />,
      title: "AI-Powered",
      description: "Next-generation artificial intelligence that adapts, learns, and evolves with your needs.",
      color: "from-blue-400 to-purple-500",
      bgColor: "from-blue-400/10 to-purple-500/10",
    },
  ]

  useEffect(() => {
    if (typeof window === "undefined") return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.3 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="features"
      className="py-16 sm:py-20 lg:py-32 bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12 sm:mb-16 lg:mb-20">
          <motion.h2
            className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-black text-white mb-4 sm:mb-6"
            style={{
              textShadow: "0 0 30px rgba(255,255,255,0.3)",
            }}
            initial={{ opacity: 0, y: 100 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1 }}
          >
            Superpowers
            <span className="block bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              Unleashed
            </span>
          </motion.h2>
          <motion.p
            className="text-lg sm:text-xl text-white/80 max-w-3xl mx-auto px-4"
            initial={{ opacity: 0, y: 50 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Experience features so advanced, they feel like magic. Built for the future, available today.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="feature-card group relative interactive"
              whileHover={{
                y: -10,
                rotateY: 5,
                rotateX: 5,
              }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              initial={{ opacity: 0, y: 100, scale: 0.8 }}
              animate={isVisible ? { opacity: 1, y: 0, scale: 1 } : {}}
              style={{ transitionDelay: `${index * 0.2}s` }}
            >
              <div
                className={`relative p-6 sm:p-8 rounded-3xl bg-gradient-to-br ${feature.bgColor} backdrop-blur-xl border border-white/10 shadow-2xl overflow-hidden h-full`}
                style={{
                  background: `linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)`,
                }}
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-r ${feature.color} opacity-0 group-hover:opacity-20 transition-opacity duration-500 rounded-3xl`}
                />

                <motion.div
                  className={`inline-flex items-center justify-center w-16 sm:w-20 h-16 sm:h-20 bg-gradient-to-r ${feature.color} text-white rounded-2xl mb-4 sm:mb-6 shadow-lg`}
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                >
                  {feature.icon}
                </motion.div>

                <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-300 transition-all duration-300">
                  {feature.title}
                </h3>

                <p className="text-sm sm:text-base text-white/70 leading-relaxed group-hover:text-white/90 transition-colors duration-300">
                  {feature.description}
                </p>

                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Sparkles className="w-5 sm:w-6 h-5 sm:h-6 text-white/50" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// Services Section
const ServicesSection = () => {
  const sectionRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  const services = [
    {
      icon: <Monitor className="w-12 h-12" />,
      title: "Web Development",
      description: "Custom websites and web applications built with cutting-edge technologies.",
      features: ["React & Next.js", "Full-Stack Solutions", "Performance Optimization", "SEO Ready"],
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: <Smartphone className="w-12 h-12" />,
      title: "Mobile Apps",
      description: "Native and cross-platform mobile applications for iOS and Android.",
      features: ["React Native", "Flutter", "Native iOS/Android", "App Store Optimization"],
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: <Tablet className="w-12 h-12" />,
      title: "UI/UX Design",
      description: "Beautiful, intuitive designs that convert visitors into customers.",
      features: ["User Research", "Wireframing", "Prototyping", "Design Systems"],
      color: "from-green-500 to-teal-500",
    },
  ]

  useEffect(() => {
    if (typeof window === "undefined") return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.3 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="services"
      className="py-16 sm:py-20 lg:py-32 bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 relative overflow-hidden"
    >

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12 sm:mb-16 lg:mb-20">
          <motion.h2
            className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-black text-white mb-4 sm:mb-6"
            initial={{ opacity: 0, y: 50 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1 }}
          >
            Our
            <span className="block bg-gradient-to-r from-yellow-400 to-pink-400 bg-clip-text text-transparent">
              Services
            </span>
          </motion.h2>
          <motion.p
            className="text-lg sm:text-xl text-white/80 max-w-3xl mx-auto px-4"
            initial={{ opacity: 0, y: 30 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Comprehensive digital solutions tailored to your unique needs and goals.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              className="service-card group interactive"
              whileHover={{ scale: 1.02, y: -10 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              initial={{ opacity: 0, y: 100, }}
              animate={isVisible ? { opacity: 1, y: 0, } : {}}
              style={{ transitionDelay: `${index * 0.3}s` }}
            >
              <div className="bg-white/10 backdrop-blur-xl p-6 sm:p-8 rounded-3xl border border-white/20 shadow-2xl h-full">
                <div
                  className={`inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r ${service.color} text-white rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300`}
                >
                  {service.icon}
                </div>

                <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4">{service.title}</h3>
                <p className="text-base sm:text-lg text-white/70 mb-6 leading-relaxed">{service.description}</p>

                <ul className="space-y-2 mb-6">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-white/80">
                      <div className={`w-2 h-2 bg-gradient-to-r ${service.color} rounded-full mr-3`} />
                      {feature}
                    </li>
                  ))}
                </ul>

                <Button
                  className={`w-full bg-gradient-to-r ${service.color} hover:shadow-lg transition-all duration-300 interactive`}
                  onClick={() => smoothScrollTo("#contact")}
                >
                  Learn More
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// Testimonials Section
const TestimonialsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const sectionRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "CEO, TechVision",
      content:
        "This platform didn't just transform our business—it revolutionized our entire industry. The results are beyond extraordinary.",
      avatar: "/placeholder.svg?height=80&width=80",
      company: "TechVision",
      rating: 5,
    },
    {
      name: "Marcus Rodriguez",
      role: "CTO, InnovateNow",
      content:
        "Mind-blowing performance and reliability. Our productivity skyrocketed by 400% and our clients are absolutely amazed.",
      avatar: "/placeholder.svg?height=80&width=80",
      company: "InnovateNow",
      rating: 5,
    },
    {
      name: "Elena Volkov",
      role: "Creative Director, DesignLab",
      content:
        "Pure magic in digital form. The user experience is so intuitive and beautiful, it feels like art come to life.",
      avatar: "/placeholder.svg?height=80&width=80",
      company: "DesignLab",
      rating: 5,
    },
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    }, 6000)
    return () => clearInterval(timer)
  }, [testimonials.length])

  useEffect(() => {
    if (typeof window === "undefined") return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.3 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="testimonials"
      className="py-16 sm:py-20 lg:py-32 bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 sm:mb-16 lg:mb-20"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-black text-white mb-4 sm:mb-6">
            Success
            <span className="block bg-gradient-to-r from-yellow-400 to-pink-400 bg-clip-text text-transparent">
              Stories
            </span>
          </h2>
          <p className="text-lg sm:text-xl text-white/80 px-4">
            Real transformations from real people who dared to dream bigger.
          </p>
        </motion.div>

        <div className="testimonial-container relative max-w-5xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 100, rotateY: 90 }}
              animate={{ opacity: 1, x: 0, rotateY: 0 }}
              exit={{ opacity: 0, x: -100, rotateY: -90 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              className="relative"
            >
              <div
                className="bg-white/10 backdrop-blur-xl p-8 sm:p-12 lg:p-16 rounded-3xl shadow-2xl border border-white/20 text-center relative overflow-hidden"
                style={{
                  background: "linear-gradient(135deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.05) 100%)",
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-3xl" />

                <div className="flex justify-center mb-6 sm:mb-8">
                  {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ delay: i * 0.1, type: "spring", stiffness: 200 }}
                    >
                      <Star className="w-6 sm:w-8 h-6 sm:h-8 text-yellow-400 fill-current mx-1" />
                    </motion.div>
                  ))}
                </div>

                <blockquote className="text-xl sm:text-2xl lg:text-3xl text-white mb-8 sm:mb-12 italic font-light leading-relaxed">
                  "{testimonials[currentIndex].content}"
                </blockquote>

                <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
                  <motion.img
                    src={testimonials[currentIndex].avatar}
                    alt={testimonials[currentIndex].name}
                    className="w-16 sm:w-20 h-16 sm:h-20 rounded-full border-4 border-white/30 shadow-xl"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                  />
                  <div className="text-center sm:text-left">
                    <h4 className="text-xl sm:text-2xl font-bold text-white mb-1">{testimonials[currentIndex].name}</h4>
                    <p className="text-white/70 text-base sm:text-lg">{testimonials[currentIndex].role}</p>
                    <p className="text-white/50 text-sm">{testimonials[currentIndex].company}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex justify-center items-center mt-8 sm:mt-12 space-x-4 sm:space-x-6">
            <motion.button
              onClick={() => setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)}
              className="bg-white/10 backdrop-blur-sm p-3 sm:p-4 rounded-full border border-white/20 hover:bg-white/20 transition-all duration-300 interactive"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <ChevronLeft className="w-5 sm:w-6 h-5 sm:h-6 text-white" />
            </motion.button>

            <div className="flex space-x-2 sm:space-x-3">
              {testimonials.map((_, index) => (
                <motion.button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-3 sm:w-4 h-3 sm:h-4 rounded-full transition-all duration-300 interactive ${index === currentIndex
                    ? "bg-gradient-to-r from-purple-400 to-pink-400 scale-125"
                    : "bg-white/30 hover:bg-white/50"
                    }`}
                  whileHover={{ scale: 1.2 }}
                />
              ))}
            </div>

            <motion.button
              onClick={() => setCurrentIndex((prev) => (prev + 1) % testimonials.length)}
              className="bg-white/10 backdrop-blur-sm p-3 sm:p-4 rounded-full border border-white/20 hover:bg-white/20 transition-all duration-300 interactive"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <ChevronRight className="w-5 sm:w-6 h-5 sm:h-6 text-white" />
            </motion.button>
          </div>
        </div>
      </div>
    </section>
  )
}

// Contact Section
const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [focusedField, setFocusedField] = useState<string | null>(null)
  const sectionRef = useRef<HTMLElement>(null)
  const formRef = useRef<HTMLFormElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (typeof window === "undefined") return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.3 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Form submitted:", formData)
  }

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="py-16 sm:py-20 lg:py-32 bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          className="text-center mb-12 sm:mb-16 lg:mb-20"
          initial={{ opacity: 0, y: 50 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1 }}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-black text-white mb-4 sm:mb-6">
            Let's Create
            <span className="block bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              Magic Together
            </span>
          </h2>
          <p className="text-lg sm:text-xl text-white/80 max-w-3xl mx-auto px-4">
            Ready to transform your vision into reality? Let's start an extraordinary journey.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Contact Info */}
          <div className="space-y-6 sm:space-y-8">
            {[
              {
                icon: <Mail className="w-6 sm:w-8 h-6 sm:h-8" />,
                title: "Email",
                info: "hello@nexus.com",
                color: "from-blue-400 to-cyan-400",
              },
              {
                icon: <Phone className="w-6 sm:w-8 h-6 sm:h-8" />,
                title: "Phone",
                info: "+1 (555) 123-4567",
                color: "from-purple-400 to-pink-400",
              },
              {
                icon: <MapPin className="w-6 sm:w-8 h-6 sm:h-8" />,
                title: "Location",
                info: "San Francisco, CA",
                color: "from-green-400 to-blue-400",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                className="flex items-center space-x-4 sm:space-x-6 group interactive"
                whileHover={{ x: 10 }}
                transition={{ type: "spring", stiffness: 300 }}
                initial={{ opacity: 0, y: 50 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                style={{ transitionDelay: `${index * 0.2}s` }}
              >
                <div
                  className={`bg-gradient-to-r ${item.color} p-3 sm:p-4 rounded-2xl shadow-lg group-hover:shadow-xl transition-all duration-300`}
                >
                  {item.icon}
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-1">{item.title}</h3>
                  <p className="text-white/70 text-base sm:text-lg">{item.info}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Contact Form */}
          <motion.form
            ref={formRef}
            className="space-y-6 sm:space-y-8"
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 50 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="relative">
              <motion.div
                animate={{
                  scale: focusedField === "name" ? 1.02 : 1,
                  boxShadow: focusedField === "name" ? "0 0 30px rgba(139, 92, 246, 0.5)" : "0 0 0px transparent",
                }}
                transition={{ duration: 0.3 }}
              >
                <Input
                  type="text"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  onFocus={() => setFocusedField("name")}
                  onBlur={() => setFocusedField(null)}
                  className="w-full p-4 sm:p-6 text-base sm:text-lg bg-white/10 backdrop-blur-sm border-2 border-white/20 rounded-2xl text-white placeholder-white/50 focus:border-purple-400 focus:bg-white/15 transition-all duration-300"
                />
              </motion.div>
            </div>

            <div className="relative">
              <motion.div
                animate={{
                  scale: focusedField === "email" ? 1.02 : 1,
                  boxShadow: focusedField === "email" ? "0 0 30px rgba(139, 92, 246, 0.5)" : "0 0 0px transparent",
                }}
                transition={{ duration: 0.3 }}
              >
                <Input
                  type="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  onFocus={() => setFocusedField("email")}
                  onBlur={() => setFocusedField(null)}
                  className="w-full p-4 sm:p-6 text-base sm:text-lg bg-white/10 backdrop-blur-sm border-2 border-white/20 rounded-2xl text-white placeholder-white/50 focus:border-purple-400 focus:bg-white/15 transition-all duration-300"
                />
              </motion.div>
            </div>

            <div className="relative">
              <motion.div
                animate={{
                  scale: focusedField === "message" ? 1.02 : 1,
                  boxShadow: focusedField === "message" ? "0 0 30px rgba(139, 92, 246, 0.5)" : "0 0 0px transparent",
                }}
                transition={{ duration: 0.3 }}
              >
                <Textarea
                  placeholder="Your Message"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  onFocus={() => setFocusedField("message")}
                  onBlur={() => setFocusedField(null)}
                  className="w-full p-4 sm:p-6 text-base sm:text-lg min-h-[120px] sm:min-h-[150px] bg-white/10 backdrop-blur-sm border-2 border-white/20 rounded-2xl text-white placeholder-white/50 focus:border-purple-400 focus:bg-white/15 transition-all duration-300 resize-none"
                />
              </motion.div>
            </div>

            <motion.div
              whileHover={{
                scale: 1.05,
                boxShadow: "0 20px 40px rgba(139, 92, 246, 0.4)",
              }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                type="submit"
                size="lg"
                className="w-full bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 hover:from-purple-700 hover:via-pink-700 hover:to-red-700 text-white py-4 sm:py-6 text-lg sm:text-xl font-bold rounded-2xl shadow-2xl border-2 border-white/20 interactive"
              >
                <Sparkles className="mr-2 sm:mr-3 w-5 sm:w-6 h-5 sm:h-6" />
                Send Message
                <ArrowRight className="ml-2 sm:ml-3 w-5 sm:w-6 h-5 sm:h-6" />
              </Button>
            </motion.div>
          </motion.form>
        </div>
      </div>
    </section>
  )
}

// Footer
const Footer = () => {
  const footerRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  const socialLinks = [
    { icon: <Facebook className="w-5 sm:w-6 h-5 sm:h-6" />, href: "#", color: "hover:text-blue-400" },
    { icon: <Twitter className="w-5 sm:w-6 h-5 sm:h-6" />, href: "#", color: "hover:text-cyan-400" },
    { icon: <Instagram className="w-5 sm:w-6 h-5 sm:h-6" />, href: "#", color: "hover:text-pink-400" },
    { icon: <Linkedin className="w-5 sm:w-6 h-5 sm:h-6" />, href: "#", color: "hover:text-blue-500" },
  ]

  const footerLinks = [
    {
      title: "Quick Links",
      links: [
        { name: "Home", href: "#home" },
        { name: "About", href: "#about" },
        { name: "Features", href: "#features" },
        { name: "Services", href: "#services" },
      ],
    },
    {
      title: "Services",
      links: [
        { name: "Web Development", href: "#services" },
        { name: "Mobile Apps", href: "#services" },
        { name: "UI/UX Design", href: "#services" },
        { name: "Consulting", href: "#contact" },
      ],
    },
    {
      title: "Support",
      links: [
        { name: "Documentation", href: "#" },
        { name: "Help Center", href: "#" },
        { name: "Contact Us", href: "#contact" },
        { name: "Privacy Policy", href: "#" },
      ],
    },
  ]

  useEffect(() => {
    if (typeof window === "undefined") return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.3 },
    )

    if (footerRef.current) {
      observer.observe(footerRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <footer
      ref={footerRef}
      className="bg-gradient-to-br from-gray-900 via-purple-900 to-black text-white relative overflow-hidden"
    >
      {/* Animated Wave Divider */}
      <div className="absolute top-0 left-0 w-full">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-16 sm:h-20">
          <motion.path
            d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
            fill="url(#waveGradient)"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 3, ease: "easeInOut" }}
          />
          <defs>
            <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#667eea" />
              <stop offset="100%" stopColor="#764ba2" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 sm:pt-32 pb-8 sm:pb-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 sm:gap-12 mb-12 sm:mb-16">
          <motion.div
            className="col-span-1 sm:col-span-2 lg:col-span-2"
            initial={{ opacity: 0, y: 50 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <motion.h3
              className="text-3xl sm:text-4xl font-black mb-4 sm:mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent interactive cursor-pointer"
              whileHover={{ scale: 1.05 }}
              onClick={() => smoothScrollTo("#home")}
            >
              ✨ NEXUS
            </motion.h3>
            <p className="text-white/70 mb-6 sm:mb-8 max-w-md text-base sm:text-lg leading-relaxed">
              Crafting extraordinary digital experiences that push the boundaries of what's possible. Join us in shaping
              the future of technology.
            </p>
            <div className="flex space-x-3 sm:space-x-4">
              {socialLinks.map((link, index) => (
                <motion.a
                  key={index}
                  href={link.href}
                  className={`bg-white/10 backdrop-blur-sm p-3 sm:p-4 rounded-2xl border border-white/20 text-white/70 ${link.color} transition-all duration-300 hover:bg-white/20 hover:border-white/40 interactive`}
                  whileHover={{
                    scale: 1.1,
                    rotate: 360,
                    boxShadow: "0 10px 30px rgba(139, 92, 246, 0.3)",
                  }}
                  transition={{ duration: 0.3 }}
                >
                  {link.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {footerLinks.map((section, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.1 }}
            >
              <h4 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-white">{section.title}</h4>
              <ul className="space-y-2 sm:space-y-3">
                {section.links.map((link, linkIndex) => (
                  <motion.li key={linkIndex} whileHover={{ x: 5 }} transition={{ type: "spring", stiffness: 300 }}>
                    <button
                      onClick={() => smoothScrollTo(link.href)}
                      className="text-white/70 hover:text-white transition-colors text-base sm:text-lg hover:text-purple-400 interactive text-left"
                    >
                      {link.name}
                    </button>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="border-t border-white/20 pt-6 sm:pt-8 text-center"
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <p className="text-white/60 text-base sm:text-lg">
            &copy; {new Date().getFullYear()} NEXUS. All rights reserved. Built with ❤️ and lots of ☕
          </p>
        </motion.div>
      </div>
    </footer>
  )
}

// Main App Component
export default function AnimatedLandingPage() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (typeof window === "undefined") return

    // Register only ScrollTrigger
    gsap.registerPlugin(ScrollTrigger)

    // Set up GSAP config
    gsap.config({
      nullTargetWarn: false,
    })

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [])

  return (
    <div
      className="overflow-x-hidden"
      style={{
        cursor: typeof window !== "undefined" && window.innerWidth > 1024 ? "none" : "auto",
      }}
    >
      <CustomCursor />
      <ParallaxBackground />

      {loading && <LoadingScreen onComplete={() => setLoading(false)} />}

      <div className={loading ? "hidden" : "block"}>
        <Navbar />
        <HeroSection />
        <AboutSection />
        <TechnologyShowcase />
        <FeaturesSection />
        <ServicesSection />
        <TestimonialsSection />
        <ContactSection />
        <Footer />
      </div>
    </div>
  )
}
