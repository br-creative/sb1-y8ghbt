import React from 'react';
import { Disc } from '../types';
import { ShoppingCart } from 'lucide-react';

interface DiscCardProps {
  disc: Disc;
  selectedDisc?: Disc | null;
  isComparison?: boolean;
  getFlightNumberColor?: (selected: number, compared: number) => string;
}

export function DiscCard({ disc, selectedDisc, isComparison, getFlightNumberColor }: DiscCardProps) {
  const handleAddToCart = () => {
    window.open(`https://www.prodigydisc.com/search?q=${encodeURIComponent(disc.name)}`, '_blank');
  };

  return (
    <div className="bg-brand-white rounded-lg shadow-md p-6 border border-brand-grey hover:shadow-lg transition-shadow">
      <h3 className="font-display text-[20px] text-brand-black">{disc.name}</h3>
      <p className="text-brand-grey text-sm mb-4">{disc.brand} · {disc.type}</p>
      <div className="grid grid-cols-4 gap-4 text-center mb-4">
        <div>
          <p className="text-xs text-brand-grey">Speed</p>
          <p className={`font-bold ${isComparison && selectedDisc ? getFlightNumberColor!(selectedDisc.speed, disc.speed) : 'text-brand-black'}`}>
            {disc.speed}
          </p>
        </div>
        <div>
          <p className="text-xs text-brand-grey">Glide</p>
          <p className={`font-bold ${isComparison && selectedDisc ? getFlightNumberColor!(selectedDisc.glide, disc.glide) : 'text-brand-black'}`}>
            {disc.glide}
          </p>
        </div>
        <div>
          <p className="text-xs text-brand-grey">Turn</p>
          <p className={`font-bold ${isComparison && selectedDisc ? getFlightNumberColor!(selectedDisc.turn, disc.turn) : 'text-brand-black'}`}>
            {disc.turn}
          </p>
        </div>
        <div>
          <p className="text-xs text-brand-grey">Fade</p>
          <p className={`font-bold ${isComparison && selectedDisc ? getFlightNumberColor!(selectedDisc.fade, disc.fade) : 'text-brand-black'}`}>
            {disc.fade}
          </p>
        </div>
      </div>
      {isComparison && (
        <button
          onClick={handleAddToCart}
          className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-brand-green text-brand-white rounded-lg hover:bg-brand-green/90 transition-colors font-display"
        >
          <ShoppingCart size={18} />
          Shop {disc.name}
        </button>
      )}
    </div>
  );
}