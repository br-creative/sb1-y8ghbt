import React, { useState, useMemo } from 'react';
import { Search, AlertCircle, Loader2 } from 'lucide-react';
import { useDiscs } from './hooks/useDiscs';
import { DiscCard } from './components/DiscCard';
import { Disc } from './types';

function App() {
  const { discs, loading, error } = useDiscs();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDisc, setSelectedDisc] = useState<Disc | null>(null);
  const [matches, setMatches] = useState<Disc[]>([]);

  const nonProdigyDiscs = useMemo(() => {
    return discs.filter(disc => disc.brand !== 'Prodigy Disc');
  }, [discs]);

  const filteredDiscs = useMemo(() => {
    return nonProdigyDiscs.filter(disc => 
      disc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      disc.brand.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery, nonProdigyDiscs]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setSelectedDisc(null);
    setMatches([]);
  };

  const calculateSimilarityScore = (disc1: Disc, disc2: Disc) => {
    const speedDiff = Math.abs(disc1.speed - disc2.speed);
    const glideDiff = Math.abs(disc1.glide - disc2.glide);
    const turnDiff = Math.abs(disc1.turn - disc2.turn);
    const fadeDiff = Math.abs(disc1.fade - disc2.fade);
    
    return speedDiff * 1.5 + glideDiff + turnDiff + fadeDiff;
  };

  const findMatches = (disc: Disc) => {
    const prodigyDiscs = discs.filter(d => d.brand === 'Prodigy Disc');
    
    const scoredMatches = prodigyDiscs.map(d => ({
      disc: d,
      score: calculateSimilarityScore(disc, d)
    }));

    const sortedMatches = scoredMatches
      .sort((a, b) => a.score - b.score)
      .slice(0, 3)
      .map(match => match.disc);

    setSelectedDisc(disc);
    setMatches(sortedMatches);
  };

  const getFlightNumberColor = (selected: number, compared: number) => {
    const diff = Math.abs(selected - compared);
    if (diff <= 0.5) return 'text-brand-green';
    if (diff <= 1) return 'text-yellow-600';
    return 'text-red-600';
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-brand-white">
        <div className="flex items-center gap-2">
          <Loader2 className="h-6 w-6 animate-spin text-brand-green" />
          <span className="text-brand-black">Loading disc data...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-brand-white">
        <div className="text-center text-red-600">
          <AlertCircle className="h-8 w-8 mx-auto mb-2" />
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-white p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="font-display text-heading text-brand-black mb-2">
            <span className="inline-flex items-center gap-2">
              <Search className="h-8 w-8 text-brand-green" />
              Find Your Prodigy Disc Match
            </span>
          </h1>
          <p className="font-body text-body text-brand-grey">Search for any disc to find similar Prodigy options</p>
        </div>
        
        <div className="relative mb-8">
          <div className="relative">
            <input
              type="text"
              placeholder="Search for a disc..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="w-full px-4 py-3 pl-12 rounded-lg border border-brand-grey focus:ring-2 focus:ring-brand-green focus:border-transparent shadow-sm bg-brand-white text-brand-black placeholder-brand-grey"
            />
            <Search className="absolute left-4 top-3.5 text-brand-grey" size={20} />
          </div>
          
          {searchQuery && (
            <div className="absolute z-10 w-full mt-2 bg-brand-white rounded-lg shadow-lg border border-brand-grey max-h-96 overflow-y-auto">
              {filteredDiscs.map((disc) => (
                <button
                  key={`${disc.brand}-${disc.name}`}
                  onClick={() => {
                    findMatches(disc);
                    setSearchQuery('');
                  }}
                  className="w-full text-left px-4 py-3 hover:bg-brand-green/10 transition-colors border-b border-brand-grey/20 last:border-0"
                >
                  <div className="font-display text-brand-black">{disc.name}</div>
                  <div className="text-sm text-brand-grey">
                    {disc.brand} · {disc.type} · Speed: {disc.speed} · Glide: {disc.glide} · Turn: {disc.turn} · Fade: {disc.fade}
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        {selectedDisc && (
          <div className="mb-8">
            <h2 className="font-display text-heading text-brand-black mb-4">Selected Disc:</h2>
            <DiscCard disc={selectedDisc} />
          </div>
        )}

        {matches.length > 0 ? (
          <div>
            <h2 className="font-display text-heading text-brand-black mb-4">Best Prodigy Matches:</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {matches.map((disc) => (
                <DiscCard
                  key={`${disc.brand}-${disc.name}`}
                  disc={disc}
                  selectedDisc={selectedDisc}
                  isComparison={true}
                  getFlightNumberColor={getFlightNumberColor}
                />
              ))}
            </div>
          </div>
        ) : selectedDisc && (
          <div className="text-center p-8 bg-brand-white rounded-lg shadow-md border border-brand-grey">
            <AlertCircle className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
            <h3 className="font-display text-heading text-brand-black mb-2">No Exact Matches Found</h3>
            <p className="text-brand-grey">Try searching for a different disc with similar flight numbers.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;