
const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="footer-id" className="w-full bg-teal-950 text-white border-t border-zinc-900 mt-auto font-sans flex flex-col items-center">
      
      <div className="w-full max-w-315 px-20 text-white">
        
        <div className="grid grid-cols-4 gap-24">
          
          {/* The about grid*/}
          <div className="flex flex-col items-start">
            
            <h4 className="text-[12px] tracking-[0.3em] font-['Playfair_Display'] font-bold text-zinc-200 uppercase">Our Story</h4>
            <p className="text-xs leading-relaxed opacity-80 max-w-45">
              A high-quality mail-order tea store for busy professionals and health-conscious seniors by providing expert-curated tea selections.

            </p>
            <a href="https://corporate.japanet.co.jp/ja/" target="_blank" rel="noopener noreferrer" className="text-[11px] tracking-widest text-red-700 hover:text-red-500 transition-colors uppercase font-bold">
              Visit Japanet Global →
            </a>
          </div>

          {/* customer care grid with customer contact options */}
          <div className="flex flex-col items-start">
            <h4 className="text-[12px] tracking-[0.3em] font-['Playfair_Display'] font-bold text-zinc-200 uppercase">Customer Care</h4>
            <ul className="text-[11px] tracking-[0.3em] space-y-7 text-white">
              <li><a href="#about" className="hover:text-red-700 transition-colors">About Us</a></li>
              <li><a href="#reviews" className="hover:text-red-700 transition-colors">Customer Reviews</a></li>
              <li><a href="#shipping" className="hover:text-red-700 transition-colors">Shipping & Returns</a></li>
              <li><a href="#faq" className="hover:text-red-700 transition-colors">FAQ</a></li>
            </ul>
          </div>

          {/* company contact details */}
          <div className="flex flex-col items-start">
            <h4 className="text-[12px] tracking-[0.3em] font-['Playfair_Display'] font-bold text-zinc-300 uppercase">Contact</h4>
            <div className="text-[11px] tracking-[0.3em] space-y-7 uppercase font-bold">
              <p className="opacity-80 leading-relaxed text-zinc-400">Nagasaki, Japanet</p>
              <p className="text-red-700">support@japanettea.com</p>
              <p className="opacity-80 text-zinc-400">+81 350 TEA 825</p>
            </div>
          </div>

          {/* newsletter registrations options */}
          <div className="flex flex-col items-start">
            <h4 className="text-[11px] tracking-[0.3em] font-['Playfair_Display'] text-zinc-200 uppercase">Join the Ceremony</h4>
            <p className="text-[11px] tracking-widest opacity-80 uppercase">Get 10% off your first harvest.</p>
            <form className="w-full flex border-b border-zinc-800 pb-3 focus-within:border-red-600 transition-colors">
              <input 
                type="email" 
                placeholder="EMAIL ADDRESS" 
                className="bg-transparent border-none text-[11px] tracking-widest w-full focus:outline-none placeholder:text-white-200 text-white uppercase" 
              />
              <button type="submit" className="text-red-700 text-[11px] font-bold tracking-widest hover:text-white transition-colors">JOIN</button>
            </form>
          </div>
        </div>

        {/* copyright line */}
        <div className="w-full border-t border-zinc-900 flex flex-col justify-between items-center text-[10px] tracking-[0.3em] font-bold uppercase">
          <div className=" opacity-70">
            © {currentYear} Japanet Tea Holdings. All Rights Reserved.
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;