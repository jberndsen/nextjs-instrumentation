import React from 'react';
import './index.scss';
import { useProbe, QuotationProbe } from '@nextjs-instrumentation/instrumentation';

export const Index = () => {
  /**
   * You announce domain events using a specific domain probe, which you can
   * get using the useProbe hook. Domain probes logically group a bunch of
   * events that apps may raise within that domain.
   */
  const probe = useProbe(QuotationProbe);

  const addToCart = (productId, event) => {
    console.log(`adding ${productId} to cart`);
    probe.addedToCart({productId, quantity: 5}, event);
  };

  const checkAvailability = (productId, event) => {
    console.log(`checking availability for: ${productId}`);
    probe.checkedAvailability({productId}, event);
  };

  return (
    <div className="app" data-context="product-detail-page">
      <main data-context="recently-viewed">
        <h2>Recently viewed</h2>
        <div>
          <details open data-context="list-order:1">
            <summary>Screwdriver</summary>
            <button onClick={(event) => checkAvailability(1, event)}>Check Availability</button>
            <button onClick={(event) => addToCart(1, event)}>ADD TO CART</button>
          </details>
          <details data-context="list-order:2">
            <summary>Battery</summary>
            <button onClick={(event) => checkAvailability(2, event)}>Check Availability</button>
            <button onClick={(event) => addToCart(2, event)}>ADD TO CART</button>
          </details>
          <details data-context="list-order:3">
            <summary>Tractor</summary>
            <button onClick={(event) => checkAvailability(3, event)}>Check Availability</button>
            <button onClick={(event) => addToCart(3, event)}>ADD TO CART</button>
          </details>
        </div>
      </main>
    </div>
  );
};

export default Index;
