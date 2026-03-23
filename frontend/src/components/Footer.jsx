import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../assets/NVA4GET.svg';
import { 
  GithubOutlined, 
  XOutlined, 
  LinkedinOutlined, 
  MailOutlined 
} from '@ant-design/icons';

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#EBE1D1] border-t border-[#0D4715]/10 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          
          {/* Brand Column */}
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="transform transition-transform hover:scale-105 active:scale-9 inline-block mb-4">
              <img src={Logo} alt="NVA4GET" className="h-10 w-auto" />
            </Link>
            <p className="text-[#0D4715]/70 text-sm leading-relaxed max-w-xs">
              The ultimate productivity companion designed to help you organize your daily life, one task at a time.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-[#0D4715] font-bold mb-6 uppercase tracking-wider text-xs">Product</h4>
            <ul className="space-y-4">
              <li><Link to="/" className="text-[#0D4715]/80 hover:text-[#E9762B] transition-colors text-sm">Dashboard</Link></li>
              <li><Link to="/" className="text-[#0D4715]/80 hover:text-[#E9762B] transition-colors text-sm">Features</Link></li>
              <li><Link to="/" className="text-[#0D4715]/80 hover:text-[#E9762B] transition-colors text-sm">Pricing</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-[#0D4715] font-bold mb-6 uppercase tracking-wider text-xs">Support</h4>
            <ul className="space-y-4">
              <li><Link to="https://github.com/Tobex360" className="text-[#0D4715]/80 hover:text-[#E9762B] transition-colors text-sm">Help Center</Link></li>
              <li><Link to="https://github.com/Tobex360" className="text-[#0D4715]/80 hover:text-[#E9762B] transition-colors text-sm">Terms of Service</Link></li>
              <li><Link to="https://github.com/Tobex360" className="text-[#0D4715]/80 hover:text-[#E9762B] transition-colors text-sm">Privacy Policy</Link></li>
            </ul>
          </div>

          {/* Social & Contact */}
          <div>
            <h4 className="text-[#0D4715] font-bold mb-6 uppercase tracking-wider text-xs">Stay Connected</h4>
            <div className="flex gap-4 mb-6">
              <a href="https://x.com/mirrorman_ult" className="text-xl text-[#0D4715] hover:text-[#E9762B] transition-transform hover:-translate-y-1"><XOutlined /></a>
              <a href="https://www.linkedin.com/in/tobechukwu-echefu-1318b6336/" className="text-xl text-[#0D4715] hover:text-[#E9762B] transition-transform hover:-translate-y-1"><LinkedinOutlined /></a>
              <a href="https://github.com/Tobex360" className="text-xl text-[#0D4715] hover:text-[#E9762B] transition-transform hover:-translate-y-1"><GithubOutlined /></a>
            </div>
            <div className="flex items-center gap-2 text-[#0D4715]/80 text-sm">

              <a href="mailto:tobex360@gmail.com" className="text-l text-[#0D4715] hover:text-[#E9762B] transition-transform">
                <MailOutlined />
              <span>tobex360@gmail.com</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-[#0D4715]/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[#0D4715]/50 text-xs font-medium">
            © {currentYear} NVA4GET. All rights reserved.
          </p>
          <div className="flex gap-6">
             <span className="text-[#0D4715]/40 text-xs">Powered by Echefu Tobechukwu</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;