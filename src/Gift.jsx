import React from 'react';
import darjeeling from "./assets/images/Darjeeling.jpg";
import earlgrey from "./assets/images/earl.jpg";
import assam from "./assets/images/assam.jpg";
import chamomile from "./assets/images/chamomile.jpg";
import matcha from "./assets/images/matcha.jpg";
import oolong from "./assets/images/oolong.jpg";
import green from "./assets/images/green.jpg";
import white from "./assets/images/white.jpg";
import masala from "./assets/images/masala.jpg";
import herbal from "./assets/images/herbal.jpg";

const giftCollections = [
  {
    id: "coll-1",
    name: "The Traditional Morning Set",
    basePrice: 4500,
    teas: [darjeeling, green, assam, masala],
    consistsOf: "Darjeeling, Classic Green, Robust Assam, and Warming Masala.",
    occasion: "Best for family breakfast gatherings or a productive start at the office.",
  },
  {
    id: "coll-2",
    name: "Zen & Longevity Box",
    basePrice: 5800,
    teas: [matcha, white, oolong, herbal],
    consistsOf: "Ceremonial Matcha, Anti-aging White Tea, Slimming Oolong, and Detox Herbal.",
    occasion: "A perfect health-focused gift for seniors or wellness enthusiasts.",
  },
  {
    id: "coll-3",
    name: "The Relaxation Suite",
    basePrice: 3200,
    teas: [chamomile, earlgrey, herbal, green],
    consistsOf: "Calming Chamomile, Stress-reducing Earl Grey, Soothing Herbal Mix, and Green Tea.",
    occasion: "Ideal for evening winding down or a thoughtful 'Thinking of You' gesture.",
  },
  {
    id: "coll-4",
    name: "Premium Earl Lover's Collection",
    basePrice: 4200,
    teas: [earlgrey, green, white, assam],
    consistsOf: "Earl Grey, Fresh Green Tea, Delicate White Tea, and Robust Assam.",
    occasion: "Perfect for tea connoisseurs and classic tea lovers.",
  },
  {
    id: "coll-5",
    name: "Wellness Warrior Pack",
    basePrice: 5500,
    teas: [matcha, herbal, oolong, chamomile],
    consistsOf: "Energizing Matcha, Detox Herbal, Metabolism-boosting Oolong, and Calming Chamomile.",
    occasion: "A thoughtful gift for health-conscious friends and fitness enthusiasts.",
  },
  {
    id: "coll-6",
    name: "Executive's Afternoon Escape",
    basePrice: 4000,
    teas: [darjeeling, oolong, white, masala],
    consistsOf: "Premium Darjeeling, Silky Oolong, Elegant White Tea, and Aromatic Masala.",
    occasion: "Designed for busy professionals who deserve a quality afternoon break.",
  }
];

function Gifts({ onAddToCart }) {
  return (
    <div className="bg-stone-50 font-sans w-full flex flex-col items-center">
      {/* Hero Header */}
      <div className="pt-24 pb-20 text-center px-8">
        <h1 className="text-5xl font-['Playfair_Display'] font-bold text-zinc-900 mb-6 italic">
          Gift your family and friends with delicious health
        </h1>
        <p className="text-zinc-500 tracking-[0.3em] uppercase text-[12px] font-bold">
          Hand-picked combinations for a better lifestyle
        </p>
      </div>

      {/* Collection Grid */}
      <div className="max-w-[1400px] mx-auto px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {giftCollections.map((collection) => (
          <div key={collection.id} className="bg-white border border-zinc-200 shadow-sm flex flex-col hover:shadow-lg transition-all duration-300 overflow-hidden">
            
            {/* 4-Image Cluster Layout */}
            <div className="grid grid-cols-2 gap-0.5 bg-zinc-100 p-0.5">
              {collection.teas.slice(0, 4).map((img, index) => (
                <div key={index} className="aspect-square overflow-hidden bg-white">
                  <img 
                    src={img} 
                    alt="Tea component" 
                    className="w-full h-full object-cover grayscale-[20%] hover:grayscale-0 transition-all duration-300" 
                  />
                </div>
              ))}
            </div>

            {/* Content Section */}
            <div className="p-6 flex flex-col items-start justify-between flex-grow">
              <div>
                <h3 className="text-xl font-['Playfair_Display'] font-bold text-zinc-900 mb-3 border-b-2 border-red-600 pb-2">
                  {collection.name}
                </h3>
                
                <div className="space-y-3 mb-6 text-left">
                  <div>
                    <span className="text-[8px] font-bold text-zinc-400 uppercase tracking-widest block mb-1">Includes:</span>
                    <p className="text-xs text-zinc-700 leading-relaxed">{collection.consistsOf}</p>
                  </div>

                  <div>
                    <span className="text-[8px] font-bold text-zinc-400 uppercase tracking-widest block mb-1">Perfect for:</span>
                    <p className="text-xs text-zinc-600 leading-relaxed font-light">{collection.occasion}</p>
                  </div>
                </div>
              </div>

              <div className="w-full flex items-center justify-between pt-4 border-t border-zinc-100">
                <div>
                  <p className="text-2xl font-['Playfair_Display'] font-bold text-red-600">
                    ¥{Math.round(collection.basePrice * 0.9)}
                  </p>
                  <p className="text-xs text-zinc-400 line-through">
                    ¥{collection.basePrice}
                  </p>
                </div>
                <button 
                  onClick={() => onAddToCart(collection.id)}
                  className="px-4 py-2 bg-zinc-950 text-white text-[9px] font-bold tracking-[0.2em] uppercase hover:bg-red-700 transition-colors duration-300"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Gifts;