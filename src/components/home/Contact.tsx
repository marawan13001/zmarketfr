
import React from 'react';
import { MapPin, Phone, Mail, Clock, ArrowRight } from 'lucide-react';
import ScrollReveal from '../ui/ScrollReveal';

interface ContactInfoProps {
  icon: React.ReactNode;
  title: string;
  content: React.ReactNode;
  delay: number;
}

const ContactInfo: React.FC<ContactInfoProps> = ({ icon, title, content, delay }) => {
  return (
    <ScrollReveal delay={delay} direction="up">
      <div className="flex items-start">
        <div className="w-12 h-12 rounded-lg bg-brand-orange/10 flex items-center justify-center text-brand-orange mr-4 shrink-0">
          {icon}
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-1 text-gray-900">{title}</h3>
          <div className="text-gray-600">{content}</div>
        </div>
      </div>
    </ScrollReveal>
  );
};

const Contact: React.FC = () => {
  return (
    <section id="contact" className="py-20 md:py-32 bg-brand-gray relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-brand-orange rounded-full blur-[150px] opacity-10 z-0"></div>
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-brand-orange rounded-full blur-[150px] opacity-10 z-0"></div>
      
      <div className="container px-4 mx-auto relative z-10">
        <div className="text-center mb-16">
          <ScrollReveal delay={50} direction="up">
            <span className="inline-block py-1 px-3 mb-6 rounded-full bg-brand-orange/10 text-brand-orange font-medium text-sm">
              Contact & Localisation
            </span>
          </ScrollReveal>
          
          <ScrollReveal delay={100} direction="up">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
              Venez Nous <span className="text-brand-orange">Rendre Visite</span>
            </h2>
          </ScrollReveal>
          
          <ScrollReveal delay={150} direction="up">
            <p className="text-gray-600 max-w-2xl mx-auto">
              Nous serions ravis de vous accueillir dans notre magasin pour vous faire découvrir notre sélection de produits Halal.
            </p>
          </ScrollReveal>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <ContactInfo 
              icon={<MapPin size={24} />}
              title="Adresse"
              content={<p>123 Avenue de la République<br />75011 Paris, France</p>}
              delay={200}
            />
            
            <ContactInfo 
              icon={<Phone size={24} />}
              title="Téléphone"
              content={<p>+33 (0)1 23 45 67 89</p>}
              delay={300}
            />
            
            <ContactInfo 
              icon={<Mail size={24} />}
              title="Email"
              content={<p>contact@halaldelices.fr</p>}
              delay={400}
            />
            
            <ContactInfo 
              icon={<Clock size={24} />}
              title="Horaires d'ouverture"
              content={
                <div>
                  <p>Lundi - Samedi: 9h00 - 20h00</p>
                  <p>Dimanche: 10h00 - 18h00</p>
                </div>
              }
              delay={500}
            />
            
            <ScrollReveal delay={600} direction="up">
              <a 
                href="#"
                className="inline-flex items-center font-medium text-brand-orange hover:text-brand-orange/80 transition-colors mt-4"
              >
                Voir sur Google Maps
                <ArrowRight size={16} className="ml-1" />
              </a>
            </ScrollReveal>
          </div>
          
          <ScrollReveal delay={700} direction="left">
            <div className="rounded-xl overflow-hidden shadow-lg border border-gray-100 h-[400px] lg:h-[450px] w-full">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2624.9916256937845!2d2.3709401!3d48.8580924!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e66dfb72cf8f15%3A0x608b324ec1d1e25a!2sParis%2C%20France!5e0!3m2!1sen!2sus!4v1653896080427!5m2!1sen!2sus" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen={true} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

export default Contact;
