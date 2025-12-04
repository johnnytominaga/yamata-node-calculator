// Fetch ETH price from CoinMarketCap API
// Note: In production, you'd want to use environment variables for the API key
// For now, we'll use a fallback or allow it to fail gracefully

export async function fetchEthPrice(): Promise<number> {
  try {
    // Try to fetch from CoinGecko (free, no API key required)
    const response = await fetch(
      'https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd',
      { next: { revalidate: 3600 } } // Cache for 1 hour
    );

    if (!response.ok) {
      throw new Error('Failed to fetch ETH price');
    }

    const data = await response.json();
    return data.ethereum?.usd || 3500; // Fallback to $3500
  } catch (error) {
    console.error('Error fetching ETH price:', error);
    return 3500; // Fallback to $3500
  }
}
