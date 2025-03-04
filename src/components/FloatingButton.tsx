import { useState, useEffect, useMemo } from 'react';
import { getLithiumPrice, LithiumPriceResponse } from '../services/api';

const FloatingButton = () => {
  const [lithiumPrice, setLithiumPrice] = useState<LithiumPriceResponse | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch lithium price on component mount
  useEffect(() => {
    const fetchLithiumPrice = async () => {
      try {
        console.log('Starting price fetch in component...');
        const data = await getLithiumPrice();
        console.log('Received price data:', data);
        setLithiumPrice(data);
      } catch (error) {
        console.error('Error fetching lithium price:', error);
        // Even if there's an error, set a default price
        setLithiumPrice({
          price: 165.50,
          unit: 'USD/kg',
          timestamp: Date.now(),
          isEstimate: true,
          source: 'fallback'
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchLithiumPrice();
  }, []);

  // Create messages with price information using useMemo
  const messages = useMemo(() => {
    console.log('Current lithium price state:', lithiumPrice);
    
    // Always ensure we have a price to display
    const price = lithiumPrice && typeof lithiumPrice.price === 'number' 
      ? Number(lithiumPrice.price).toFixed(2) 
      : "165.50";
    
    return [
      { text: `AT3 price = ${price} USD`, language: "English" },
      { text: `AT3 precio = ${price} USD`, language: "Spanish" },
      { text: `AT3 preço = ${price} USD`, language: "Portuguese" }
    ];
  }, [lithiumPrice]);

  // Rotate messages every 2 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % messages.length);
    }, 2000);

    return () => clearInterval(interval);
  }, [messages.length]);

  const buttonStyle: React.CSSProperties = {
    position: 'fixed',
    bottom: '30px',
    right: '30px',
    backgroundColor: '#355BEB',
    color: 'white',
    padding: '15px 25px',
    borderRadius: '50px',
    border: 'none',
    boxShadow: '0 4px 8px rgba(0,0,0,0.3)',
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: 'bold',
    zIndex: 9999,
    transition: 'all 0.3s ease',
    minWidth: '280px',
    textAlign: 'center'
  };

  return (
    <button style={buttonStyle}>
      {isLoading ? "Loading..." : messages[currentIndex].text}
    </button>
  );
};

export default FloatingButton;
