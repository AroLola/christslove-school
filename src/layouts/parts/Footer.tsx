import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-secondary text-secondary-foreground">
      {/* Gold top border accent */}
      <div className="h-1 bg-primary w-full" />

      <div className="container mx-auto px-4 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* School Identity */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              


              
              
            </div>
            <p className="text-secondary-foreground/70 text-sm leading-relaxed max-w-sm mt-3">
              Nurturing minds, hearts, and faith from Kindergarten through Grade 7. Rooted in
              Christ's love, committed to academic excellence.
            </p>
            <p className="mt-5 text-primary text-sm font-medium italic">
              "Train up a child in the way he should go…" — Proverbs 22:6
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-secondary-foreground font-semibold text-sm tracking-widest uppercase mb-4">
              Quick Links
            </h4>
            <nav className="flex flex-col gap-2.5">
              {[
              { href: '/', label: 'Home' },
              { href: '/about', label: 'About Us' },
              { href: '/academics', label: 'Academics' },
              { href: '/admissions', label: 'Admissions' },
              { href: '/contact', label: 'Contact' }].
              map((item) =>
              <Link
                key={item.href}
                to={item.href}
                className="text-sm text-secondary-foreground/70 hover:text-primary transition-colors">
                
                  {item.label}
                </Link>
              )}
            </nav>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-secondary-foreground font-semibold text-sm tracking-widest uppercase mb-4">
              Contact Us
            </h4>
            <div className="flex flex-col gap-3">
              <div className="flex items-start gap-2.5 text-sm text-secondary-foreground/70">
                <MapPin size={15} className="mt-0.5 shrink-0 text-primary" />
                <span>Erf 283 Gemini Street, Dorado Park<br />P.O. Box 8149, Bachbrecht<br />Windhoek</span>
              </div>
              <div className="flex items-center gap-2.5 text-sm text-secondary-foreground/70">
                <Phone size={15} className="shrink-0 text-primary" />
                <a href="tel:+15551234567" className="hover:text-primary transition-colors">Tel: +264 61 304233<br /> Cell: +264 81 7531121
<br />
                </a>
              </div>
              <div className="flex items-center gap-2.5 text-sm text-secondary-foreground/70">
                <Mail size={15} className="shrink-0 text-primary" />
                <a
                  href="mailto:info@christslovechristianschool.info"
                  className="hover:text-primary transition-colors">inquiries@christslovechristianschool.info


                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-secondary-foreground/20 flex flex-col md:flex-row justify-between items-center gap-3">
          <p className="text-xs text-secondary-foreground/50">
            © {currentYear} Christ's Love Christian School. All rights reserved.
          </p>
          <p className="text-xs text-secondary-foreground/50">
            christslovechristianschool.info
          </p>
        </div>
      </div>
    </footer>);

}