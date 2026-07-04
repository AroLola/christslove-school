import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';

export default function Header() {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/academics', label: 'Academics' },
  { href: '/admissions', label: 'Admissions' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/contact', label: 'Contact' }];


  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border shadow-sm">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex h-20 md:h-24 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center shrink-0">
            <img
              src="/airo-assets/images/layouts/header/christs-love-christian-school"
              alt="Christ's Love Christian School"
              className="h-14 md:h-16 w-auto object-contain shrink-0 self-center" />
            
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) =>
            <Link
              key={item.href}
              to={item.href}
              className={`text-sm font-medium tracking-wide transition-colors relative group ${
              location.pathname === item.href ?
              'text-secondary' :
              'text-foreground/70 hover:text-secondary'}`
              }>
              
                {item.label}
                <span
                className={`absolute -bottom-1 left-0 h-0.5 bg-primary transition-all duration-300 ${
                location.pathname === item.href ? 'w-full' : 'w-0 group-hover:w-full'}`
                } />
              
              </Link>
            )}
          </nav>

          {/* CTA + Mobile Toggle */}
          <div className="flex items-center gap-3">
            <Link
              to="/admissions"
              className="hidden md:inline-flex items-center px-5 py-2.5 bg-primary text-primary-foreground text-sm font-semibold rounded tracking-wide hover:bg-primary/90 transition-colors">
              
              Enroll Now
            </Link>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 hover:bg-muted rounded-md transition-colors text-foreground"
              aria-label="Toggle menu">
              
              {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen &&
        <div className="md:hidden border-t border-border py-4 bg-background">
            <nav className="flex flex-col gap-1">
              {navItems.map((item) =>
            <Link
              key={item.href}
              to={item.href}
              className={`text-sm font-medium py-3 px-2 transition-colors border-b border-border/50 last:border-0 ${
              location.pathname === item.href ?
              'text-secondary' :
              'text-foreground/70 hover:text-secondary'}`
              }
              onClick={() => setIsMobileMenuOpen(false)}>
              
                  {item.label}
                </Link>
            )}
              <Link
              to="/admissions"
              className="mt-3 inline-flex items-center justify-center px-5 py-3 bg-primary text-primary-foreground text-sm font-semibold rounded tracking-wide hover:bg-primary/90 transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}>
              
                Enroll Now
              </Link>
            </nav>
          </div>
        }
      </div>
    </header>);

}