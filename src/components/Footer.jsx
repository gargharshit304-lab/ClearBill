import { motion } from 'framer-motion'
import { Lock, Code, Share2, Briefcase, Mail } from 'lucide-react'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const socialLinks = [
    { icon: Code, href: '#', label: 'GitHub' },
    { icon: Share2, href: '#', label: 'Twitter' },
    { icon: Briefcase, href: '#', label: 'LinkedIn' },
    { icon: Mail, href: '#', label: 'Email' },
  ]

  const footerLinks = [
    { title: 'Product', links: ['Features', 'Security', 'FAQ', 'Blog'] },
    { title: 'Company', links: ['About', 'Privacy', 'Terms', 'Contact'] },
    { title: 'Resources', links: ['Documentation', 'Support', 'Changelog', 'Status'] },
  ]

  return (
    <footer className="bg-slate-900 text-white py-16 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-primary rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-lg">C</span>
              </div>
              <span className="text-2xl font-bold">ClearBill</span>
            </div>
            <p className="text-gray-400">
              AI-powered healthcare bill analysis. Understand your bills before you pay.
            </p>

            {/* Privacy Message */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="flex items-center gap-2 text-sm text-blue-300 bg-blue-900/20 p-3 rounded-lg border border-blue-700/30"
            >
              <Lock size={16} />
              <span>No medical data stored permanently</span>
            </motion.div>
          </motion.div>

          {/* Links */}
          {footerLinks.map((section, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="space-y-4"
            >
              <h4 className="font-semibold text-white">{section.title}</h4>
              <ul className="space-y-2">
                {section.links.map((link, linkIdx) => (
                  <li key={linkIdx}>
                    <motion.a
                      href="#"
                      className="text-gray-400 hover:text-white transition-colors"
                      whileHover={{ x: 5 }}
                    >
                      {link}
                    </motion.a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 my-12"></div>

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row justify-between items-center gap-8"
        >
          {/* Copyright */}
          <div className="text-gray-400 text-sm">
            <p>© {currentYear} ClearBill. All rights reserved.</p>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            {socialLinks.map((social, idx) => {
              const Icon = social.icon
              return (
                <motion.a
                  key={idx}
                  href={social.href}
                  className="p-3 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 transition-all"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={social.label}
                >
                  <Icon size={20} />
                </motion.a>
              )
            })}
          </div>

          {/* CTA */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn-primary py-2 px-6 text-sm"
          >
            Get Started
          </motion.button>
        </motion.div>

        {/* Privacy Notice */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="mt-12 p-4 bg-blue-900/10 border border-blue-700/20 rounded-lg text-center text-sm text-gray-300"
        >
          <p className="flex items-center justify-center gap-2">
            <Lock size={16} className="text-blue-400" />
            ClearBill is privacy-first. We never sell your data. All medical information is encrypted
            and deleted after analysis.
          </p>
        </motion.div>
      </div>
    </footer>
  )
}
