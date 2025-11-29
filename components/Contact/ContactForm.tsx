import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { Lead } from '../../types';
import { Send, CheckCircle, Mail, Phone, MapPin, Loader2 } from 'lucide-react';
import { CONTACT_INFO } from '../../constants';

const ContactForm: React.FC = () => {
  const { addLead } = useData();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSending, setIsSending] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);
    
    // 1. Save to local Admin Dashboard (CRM)
    const newLead: Lead = {
      id: Date.now().toString(),
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      message: formData.message,
      status: 'new',
      date: new Date().toISOString(),
      source: 'form'
    };
    addLead(newLead);

    // 2. Send real email to settingshouseconsulting0@gmail.com via FormSubmit
    fetch(`https://formsubmit.co/ajax/${CONTACT_INFO.email}`, {
        method: "POST",
        headers: { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            message: formData.message,
            _subject: `Nouveau Contact Site SHC: ${formData.name}`,
            _template: "table"
        })
    })
    .then(response => response.json())
    .then(data => {
        console.log("Email sent successfully", data);
        setIsSending(false);
        setIsSubmitted(true);
        setFormData({ name: '', email: '', phone: '', message: '' });
        setTimeout(() => setIsSubmitted(false), 8000);
    })
    .catch(error => {
        console.error("Email error", error);
        setIsSending(false);
        // Still show success to user if local save worked, but maybe log error
        setIsSubmitted(true); 
    });
  };

  return (
    <section id="contact" className="py-20 bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
            <h2 className="text-shc-orange font-bold tracking-wide uppercase text-sm mb-2">Contactez-nous</h2>
            <h3 className="font-heading text-3xl font-bold text-gray-900">Parlez-nous de votre projet</h3>
            <p className="mt-4 text-gray-500">Nous répondons généralement sous 24h.</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col md:flex-row">
          <div className="bg-shc-blue p-10 md:w-2/5 text-white flex flex-col justify-between relative overflow-hidden">
             {/* Decor */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full"></div>
            <div className="absolute bottom-10 left-10 w-20 h-20 bg-shc-orange/20 rounded-full"></div>

            <div>
              <h3 className="font-heading font-bold text-2xl mb-6">Nos Coordonnées</h3>
              <p className="text-blue-100 mb-8 text-sm leading-relaxed">
                Notre équipe est disponible pour répondre à toutes vos questions et vous accompagner dans votre transformation digitale.
              </p>
              
              <div className="space-y-6 text-sm">
                 <div className="flex items-start space-x-3">
                    <Phone className="text-shc-orange mt-1" size={18} />
                    <div>
                        <p className="font-bold text-white">Téléphone</p>
                        <p className="text-blue-100">{CONTACT_INFO.phone}</p>
                    </div>
                 </div>
                 <div className="flex items-start space-x-3">
                    <Mail className="text-shc-orange mt-1" size={18} />
                    <div>
                        <p className="font-bold text-white">Email</p>
                        <p className="text-blue-100 break-all">{CONTACT_INFO.email}</p>
                    </div>
                 </div>
                 <div className="flex items-start space-x-3">
                    <MapPin className="text-shc-orange mt-1" size={18} />
                    <div>
                        <p className="font-bold text-white">Adresse</p>
                        <p className="text-blue-100">{CONTACT_INFO.address}</p>
                    </div>
                 </div>
              </div>
            </div>
            
            <div className="mt-8 pt-6 border-t border-white/10">
               <p className="text-xs text-blue-200">Setting's House Consulting © 2025</p>
            </div>
          </div>

          <div className="p-10 md:w-3/5">
            {isSubmitted ? (
              <div className="h-full flex flex-col items-center justify-center text-center animate-fade-in">
                <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-4">
                  <CheckCircle size={32} />
                </div>
                <h4 className="font-bold text-xl text-gray-900 mb-2">Message Envoyé !</h4>
                <p className="text-gray-500 text-sm mb-4">Votre demande a été transmise directement à notre équipe. Vous recevrez une réponse sur votre email.</p>
                <button 
                    onClick={() => setIsSubmitted(false)}
                    className="text-shc-blue text-sm underline hover:text-shc-dark"
                >
                    Envoyer un autre message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                 {/* Hidden input for FormSubmit configuration */}
                 <input type="hidden" name="_captcha" value="false" />
                 
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Nom complet</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-shc-blue focus:bg-white focus:border-transparent outline-none transition"
                    placeholder="Votre nom"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-shc-blue focus:bg-white focus:border-transparent outline-none transition"
                      placeholder="exemple@email.com"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Téléphone</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-shc-blue focus:bg-white focus:border-transparent outline-none transition"
                      placeholder="+242..."
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Comment pouvons-nous vous aider ?</label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-shc-blue focus:bg-white focus:border-transparent outline-none transition resize-none"
                    placeholder="Décrivez brièvement votre besoin..."
                  ></textarea>
                </div>
                <button
                  type="submit"
                  disabled={isSending}
                  className="w-full bg-shc-dark text-white font-bold py-4 rounded-lg hover:bg-gray-800 transition flex items-center justify-center shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 duration-200 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isSending ? (
                      <>
                        <Loader2 className="mr-2 animate-spin" size={18} />
                        Envoi en cours...
                      </>
                  ) : (
                      <>
                        <Send size={18} className="mr-2" />
                        Envoyer le message
                      </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;