import axios from 'axios';

const METAL_PRICE_API_KEY = '55b19df20c2f4e8d05830a6d46fc3e3e';
const TROY_OUNCE_TO_KG = 0.031103477; // Conversion factor from troy ounces to kilograms
const FALLBACK_PRICE = 165.50;

interface MetalPriceResponse {
  success: boolean;
  base: string;
  timestamp: number;
  rates: {
    XLI?: number;     // Lithium price in USD per troy ounce
    USDXLI?: number;  // USD to Lithium rate
  };
}

export async function fetchLithiumPrice() {
  try {
    console.log('Starting lithium price fetch...');

    const response = await axios.get<MetalPriceResponse>(
      'https://api.metalpriceapi.com/v1/latest',
      {
        params: {
          api_key: METAL_PRICE_API_KEY,
          base: 'USD',
          currencies: 'XLI',
          unit: 'kilogram' // Request price in kilograms directly
        },
        timeout: 5000
      }
    );

    if (!response.data.success) {
      throw new Error('API request failed');
    }

    // Get the lithium price - if kilogram unit is not supported, convert from troy ounces
    let pricePerKg: number;
    
    if (response.data.rates.USDXLI) {
      // Direct USD to Lithium rate
      pricePerKg = response.data.rates.USDXLI;
    } else if (response.data.rates.XLI) {
      // Convert from troy ounces if necessary
      const pricePerOunce = 1 / response.data.rates.XLI; // Inverse because rate is XLI/USD
      pricePerKg = pricePerOunce / TROY_OUNCE_TO_KG;
    } else {
      throw new Error('No lithium price data in response');
    }

    return {
      price: Number(pricePerKg.toFixed(2)),
      unit: 'USD/kg',
      timestamp: response.data.timestamp,
      source: 'api'
    };

  } catch (error: any) {
    console.error('API Error:', error.message);

    // Return fallback data
    return {
      price: FALLBACK_PRICE,
      unit: 'USD/kg',
      timestamp: Date.now(),
      isEstimate: true,
      source: 'fallback'
    };
  }
}
