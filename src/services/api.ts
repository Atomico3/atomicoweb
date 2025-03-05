
import { fetchLithiumPrice } from '../api/lithium-price';

export interface LithiumPriceResponse {
  price: number;
  unit: string;
  timestamp: number;
  isEstimate?: boolean;
  source: 'api' | 'fallback';
}

// Use the actual lithium price API implementation
export const getLithiumPrice = async (): Promise<LithiumPriceResponse> => {
  try {
    console.log('Attempting to fetch real lithium price...');
    
    // Call the actual API implementation instead of using hardcoded values
    const priceData = await fetchLithiumPrice();
    console.log('API response:', priceData);
    return {
      ...priceData,
      source: 'api' as const
    };
    
  } catch (error) {
    console.error('Failed to fetch lithium price:', error);
    return {
      price: 165.50,
      unit: 'USD/kg',
      timestamp: Date.now(),
      isEstimate: true,
      source: 'fallback'
    };
  }
};
