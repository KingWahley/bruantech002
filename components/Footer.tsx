import Image from 'next/image';
import Link from 'next/link';
import { getSiteSettings } from '@/lib/actions/settings';

export default async function Footer() {
  const settings = await getSiteSettings();

  const footerLinks = [
    { name: "Home", href: "/" },
    { name: "Company", href: "/company" },
    { name: "Solutions", href: "/solutions" },
    { name: "Case studies", href: "/case-studies" },
    { name: "Blog", href: "/blog" },
  ];

  return (
    <footer className="w-full bg-white pt-12 pb-8 md:pt-10 md:pb-10 z-10 relative">
      <div className="max-w-[95%] md:max-w-[90%] mx-auto w-full flex flex-col gap-8 md:gap-6">
        
        {/* Top Section: Logo/Text & Links */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 px-4">
          
          {/* Left: Logo & Description */}
          <div className="flex flex-col gap-5 max-w-sm">
            <Link href="/" className="flex items-center gap-3 w-max">
              <div className="relative w-8 h-8">
                <Image 
                  src="/bruantechlogo.png" 
                  alt="Bruantech Logo"
                  fill
                  className="object-contain"
                />
              </div>
              <span className="text-xl font-bold tracking-wide text-primary">
                BRUANTECH
              </span>
            </Link>
            <p className="text-[#242627] text-base md:text-lg leading-relaxed">
              {settings?.siteDescription || "Keep your business running smoothly with dependable IT solutions"}
            </p>
          </div>

          {/* Right: Navigation Links */}
          <nav className="flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-8">
            {footerLinks.map((link) => (
              <Link 
                key={link.name} 
                href={link.href}
                className="text-[#242627] hover:text-[#5EB3C3] text-base font-medium transition-colors flex items-center gap-1"
              >
                {link.name}
              </Link>
            ))}
          </nav>
        </div>

        {/* Bottom Section: Copyright & Legal */}
        <div className="w-full pt-4 md:pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-400">
          <p>{settings?.footerText || `© ${new Date().getFullYear()} Bruantech. All rights reserved.`}</p>
          
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="hover:text-[#5EB3C3] transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-[#5EB3C3] transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
}