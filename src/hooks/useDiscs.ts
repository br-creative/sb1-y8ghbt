import { useState, useEffect } from 'react';
import { Disc } from '../types';
import discData from '../data/discs.json';

export function useDiscs() {
  const [discs, setDiscs] = useState<Disc[]>(discData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  return { 
    discs, 
    loading, 
    error
  };
}