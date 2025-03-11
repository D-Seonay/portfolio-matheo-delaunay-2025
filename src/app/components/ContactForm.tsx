"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaEnvelope, FaLinkedin, FaGithub } from "react-icons/fa";
import { useLanguage } from "../context/LanguageContext";

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

export default function ContactForm() {
  const { language } = useLanguage();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | null>(null);

  // Validation des champs
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = language === 'fr' ? 'Le nom est requis' : 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = language === 'fr' ? 'L\'email est requis' : 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = language === 'fr' ? 'Email invalide' : 'Invalid email';
    }

    if (!formData.subject.trim()) {
      newErrors.subject = language === 'fr' ? 'Le sujet est requis' : 'Subject is required';
    }

    if (!formData.message.trim()) {
      newErrors.message = language === 'fr' ? 'Le message est requis' : 'Message is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      setSubmitStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="min-h-screen flex items-center py-20">
      <div className="w-full max-w-6xl mx-auto px-4 space-y-12">
        {/* ... Reste du JSX ... */}
        
        <motion.form
          onSubmit={handleSubmit}
          className="relative bg-[#0a0a0a]/80 backdrop-blur-sm rounded-xl p-6 border border-gray-800/50 space-y-6"
        >
          {/* Notification de statut */}
          <AnimatePresence>
            {submitStatus && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className={`absolute top-0 left-0 right-0 p-4 rounded-t-xl ${
                  submitStatus === 'success' 
                    ? 'bg-green-500/20 text-green-400 border-b border-green-500/20' 
                    : 'bg-red-500/20 text-red-400 border-b border-red-500/20'
                }`}
              >
                {submitStatus === 'success' 
                  ? (language === 'fr' ? 'Message envoyé avec succès !' : 'Message sent successfully!')
                  : (language === 'fr' ? 'Erreur lors de l\'envoi du message.' : 'Error sending message.')}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Champs du formulaire avec validation */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                {language === 'fr' ? 'Nom complet' : 'Full Name'}
              </label>
              <input
                type="text"
                value={formData.name}
                className={`w-full bg-gray-900/50 border ${
                  errors.name ? 'border-red-500' : 'border-gray-800'
                } rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500 transition-colors`}
                placeholder={language === 'fr' ? 'John Doe' : 'John Doe'}
                onChange={(e) => {
                  setFormData({...formData, name: e.target.value});
                  if (errors.name) {
                    setErrors({...errors, name: undefined});
                  }
                }}
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-500">{errors.name}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                {language === 'fr' ? 'Email' : 'Email'}
              </label>
              <input
                type="email"
                value={formData.email}
                className={`w-full bg-gray-900/50 border ${
                  errors.email ? 'border-red-500' : 'border-gray-800'
                } rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500 transition-colors`}
                placeholder={language === 'fr' ? 'john.doe@example.com' : 'john.doe@example.com'}
                onChange={(e) => {
                  setFormData({...formData, email: e.target.value});
                  if (errors.email) {
                    setErrors({...errors, email: undefined});
                  }
                }}
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-500">{errors.email}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                {language === 'fr' ? 'Sujet' : 'Subject'}
              </label>
              <input
                type="text"
                value={formData.subject}
                className={`w-full bg-gray-900/50 border ${
                  errors.subject ? 'border-red-500' : 'border-gray-800'
                } rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500 transition-colors`}
                placeholder={language === 'fr' ? 'Exemple: Projet web' : 'Example: Web project'}
                onChange={(e) => {
                  setFormData({...formData, subject: e.target.value});
                  if (errors.subject) {
                    setErrors({...errors, subject: undefined});
                  }
                }}
              />
              {errors.subject && (
                <p className="mt-1 text-sm text-red-500">{errors.subject}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                {language === 'fr' ? 'Message' : 'Message'}
              </label>
              <textarea
                value={formData.message}
                className={`w-full bg-gray-900/50 border ${
                  errors.message ? 'border-red-500' : 'border-gray-800'
                } rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500 transition-colors`}
                placeholder={language === 'fr' ? 'Exemple: Je souhaite discuter de votre projet...' : 'Example: I want to discuss your project...'}
                onChange={(e) => {
                  setFormData({...formData, message: e.target.value});
                  if (errors.message) {
                    setErrors({...errors, message: undefined});
                  }
                }}
              />
              {errors.message && (
                <p className="mt-1 text-sm text-red-500">{errors.message}</p>
              )}
            </div>
          </div>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            disabled={isSubmitting}
            className={`w-full ${
              isSubmitting 
                ? 'bg-blue-500/50 cursor-not-allowed' 
                : 'bg-blue-500 hover:bg-blue-600'
            } text-white font-medium py-3 rounded-lg transition-colors`}
            type="submit"
          >
            {isSubmitting 
              ? (language === 'fr' ? 'Envoi en cours...' : 'Sending...')
              : (language === 'fr' ? 'Envoyer le message' : 'Send message')}
          </motion.button>
        </motion.form>
      </div>
    </section>
  );
}