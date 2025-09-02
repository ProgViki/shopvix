// hooks/useClaims.ts
import { useState, useEffect } from 'react';

interface Claim {
  id: string;
  title: string;
  claimType: string;
  amount: number;
  status: string;
  createdAt: string;
  proofUrl?: string;
}

export const useClaims = () => {
  const [claims, setClaims] = useState<Claim[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchClaims = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/claims', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch claims');
      }

      const data = await response.json();
      setClaims(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClaims();
  }, []);

  return {
    claims,
    loading,
    error,
    refetch: fetchClaims,
  };
};