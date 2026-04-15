import React from 'react';
/* Importing your individual tea assets */
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
    price: 4500,
    teas: [darjeeling, green, assam, masala],
    consistsOf: "Darjeeling, Classic Green, Robust Assam, and Warming Masala.",
    occasion: "Best for family breakfast gatherings or a productive start at the office.",
  },
  {
    id: "coll-2",
    name: "Zen & Longevity Box",
    price: 5800,
    teas: [matcha, white, oolong, herbal],
    consistsOf: "Ceremonial Matcha, Anti-aging White Tea, Slimming Oolong, and Detox Herbal.",
    occasion: "A perfect health-focused gift for seniors or wellness enthusiasts.",
  },
  {
    id: "coll-3",
    name: "The Relaxation Suite",
    price: 3200,
    teas: [chamomile, earlgrey, herbal],
    consistsOf: "Calming Chamomile, Stress-reducing Earl Grey, and a Soothing Herbal Mix.",
    occasion: "Ideal for evening winding down or a thoughtful 'Thinking of You' gesture.",
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
      <div className="max-w-[1200px] mx-auto px-10 grid grid-cols-1 lg:grid-cols-2 gap-16">
        {giftCollections.map((collection) => (
          <div key={collection.id} className="bg-white border border-zinc-200 shadow-sm flex flex-col hover:shadow-2xl transition-all duration-500 overflow-hidden">
            
            {/* 4-Image Cluster Layout */}
            <div className="grid grid-cols-2 gap-1 bg-zinc-100 p-1">
              {collection.teas.slice(0, 4).map((img, index) => (
                <div key={index} className="aspect-square overflow-hidden bg-white">
                  <img 
                    src={img} 
                    alt="Tea component" 
                    className="w-full h-full object-cover grayscale-[20%] hover:grayscale-0 transition-all duration-500 scale-105 hover:scale-100" 
                  />
                </div>
              ))}
            </div>

            {/* Content Section */}
            <div className="p-12 flex flex-col items-start">
              <h3 className="text-3xl font-['Playfair_Display'] font-bold text-zinc-900 mb-6 border-b-2 border-red-600 pb-2">
                {collection.name}
              </h3>
              
              <div className="space-y-6 mb-10 text-left">
                <div>
                  <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest block mb-2">This collection includes:</span>
                  <p className="text-sm text-zinc-700 leading-relaxed italic">{collection.consistsOf}</p>
                </div>

                <div>
                  <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest block mb-2">Perfect Occasions:</span>
                  <p className="text-sm text-zinc-600 leading-relaxed font-light">{collection.occasion}</p>
                </div>
              </div>

              <div className="w-full flex items-center justify-between pt-6 border-t border-zinc-100">
                <p className="text-3xl font-['Playfair_Display'] font-bold text-red-600">
                  ₹{collection.price.toLocaleString()}
                </p>
                <button 
                  onClick={() => onAddToCart(collection.id)}
                  className="px-10 py-4 bg-zinc-950 text-white text-[11px] font-bold tracking-[0.3em] uppercase hover:bg-red-700 transition-colors duration-300 shadow-lg"
                >
                  Purchase Collection
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