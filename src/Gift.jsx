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
    <div className="bg-red-100 font-sans w-full flex flex-col items-center">
      {/* Hero Header */}
      <div className=" pt-24 pb-20 text-center h-15">
        <h1 className="text-5xl font-['Playfair_Display'] font-bold text-zinc-900 italic">
          Gift your family and friends with delicious health
        </h1>
        {/* <p className="text-zinc-500 tracking-[0.3em] uppercase text-[12px] font-bold">
          Hand-picked combinations for a better lifestyle
        </p> */}
      </div>

      {/* Collection Grid */}
      <div className="max-w-300 grid grid-cols-3 gap-15">
        {giftCollections.map((collection) => (
          <div key={collection.id} className="bg-white border border-zinc-200 rounded-2xl flex flex-col transition-all duration-300 overflow-hidden">
            
            <div className="flex flex-col h-full">
            {/* 4-Image Cluster Layout */}
              <div className="mb-12">
                <div className="bg-white grid grid-cols-2 gap-3.5 p-0.5">
                  {collection.teas.slice(0, 4).map((img, index) => (
                    <div key={index} className=" bg-white aspect-square overflow-hidden scale-105 hover:scale-110 transition-transform duration-300">
                      <img 
                        src={img} 
                        alt="Tea component" 
                        className="w-full h-full object-cover rounded-2xl hover:grayscale-0 transition-all duration-300" 
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Content Section */}
            <div className="flex flex-col">
              <div>
                <h3 className="text-3xl h-18 font-['Playfair_Display'] font-bold text-zinc-900 mb-3 border-b-2 border-japanet-red pb-2 flex justify-center items-center">
                  {collection.name}
                </h3>
                
                <div className="space-y-3 mb-6 text-left">
                  <div>
                    <span className="text-[8px] font-bold text-black uppercase tracking-widest block mb-1">Includes:</span>
                    <p className="text-[12px] text-white bg-japanet-red h-8 italic items-center">{collection.consistsOf}</p>
                  </div>

                  <div>
                    {/* <span className="text-[8px] font-bold text-black uppercase tracking-widest block mb-1">Perfect for:</span> */}
                    <p className="text-[13px] text-white leading-relaxed font-light bg-japanet-red h-5 italic">{collection.occasion}</p>
                  </div>
                </div>
              </div>

              <div className="w-full flex items-center justify-between pt-4 border-t border-zinc-100">
                <div>
                  <p className="text-2xl font-['Playfair_Display'] font-bold text-japanet-red">
                    ¥{Math.round(collection.basePrice * 0.9)}
                  </p>
                  <p className="text-xs text-zinc-400 line-through">
                    ¥{collection.basePrice}
                  </p>
                </div>
                {/* <div className=''> */}
                  <button 
                    onClick={() => onAddToCart(collection.id)}
                    className="bg-red-700 text-white w-25 h-5 text-sm font-bold  hover:bg-red-500 transition-colors rounded-[.25em]"
                  >
                    Add to Cart
                  </button>
                {/* </div> */}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Gifts;