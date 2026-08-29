'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { Menu, X } from 'lucide-react'
import { NAV_LINKS, SITE_NAME } from '@/lib/constants'

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 80) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.classList.add('overflow-hidden')
    } else {
      document.body.classList.remove('overflow-hidden')
    }
    return () => document.body.classList.remove('overflow-hidden')
  }, [isMobileMenuOpen])

  return (
    <>
      <header
        role='banner'
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out ${
          isScrolled
            ? 'bg-charcoal-700/90 backdrop-blur-lg border-b border-charcoal-600/50 shadow-lg shadow-black/20'
            : 'bg-transparent'
        }`}
      >
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex items-center justify-between h-20 lg:h-24">
            <a href='#hero' className="flex-shrink-0" aria-label={`${SITE_NAME} home`}>
              <Image
                src='/images/aurem-logo.png'
                alt={SITE_NAME || 'Aurem Capital'}
                width={932}
                height={515}
                loading='eager'
                className='h-12 lg:h-14 w-auto object-contain'
                style={{ width: 'auto' }}
              />
            </a>
            
            <nav role='navigation' aria-label='Main navigation' className="hidden lg:block">
              <ul className="flex items-center space-x-8">
                {NAV_LINKS.map((link) => (
                  <li key={link.label}>
                    <a href={link.href} className="text-sm font-medium text-text-secondary hover:text-text-primary transition-colors duration-200">
                      {link.label}
                    </a>
                  </li>
                ))}
                <li>
                  <a href="#lead-form" className="text-sm font-medium text-gold-500 hover:text-gold-400 transition-colors duration-200">
                    Get Started
                  </a>
                </li>
              </ul>
            </nav>

            <button
              aria-label='Toggle menu'
              aria-expanded={isMobileMenuOpen}
              className="lg:hidden text-text-primary focus:outline-none"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-charcoal-950/95 backdrop-blur-md z-40 lg:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <motion.nav
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="fixed inset-0 z-50 flex flex-col items-center justify-center lg:hidden pointer-events-none"
            >
              <div className="pointer-events-auto flex flex-col items-center space-y-6">
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="absolute top-5 right-5 text-text-primary focus:outline-none p-2"
                  aria-label="Close menu"
                >
                  <X size={24} />
                </button>
                {NAV_LINKS.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-2xl font-serif font-medium text-text-primary"
                  >
                    {link.label}
                  </a>
                ))}
                <a
                  href="#lead-form"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-2xl font-serif font-medium text-gold-500"
                >
                  Get Started
                </a>
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
