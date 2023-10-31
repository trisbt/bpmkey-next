'use client'
import { useEffect } from "react";

function VerticalAd() {
  useEffect(() => {
    const insElem = document.querySelector('.adsbygoogle:not([data-ad-loaded])');
    if (insElem && !insElem.hasAttribute('data-adsbygoogle-status')) {
      window.adsbygoogle = window.adsbygoogle || [];
      window.adsbygoogle.push({});
      insElem.setAttribute('data-ad-loaded', 'true'); // Mark this ins as loaded
    }
  }, []);

  return (
    <div>
      {/* AdSense Ad unit */}
      <ins
        className="adsbygoogle"
        style={{
          display: 'inline-block',
          width: '90px',
          height: '728px',
          // display: 'block', 
          // backgroundColor:'white', 
          // width:'10em' 
        }}
        data-ad-client={`${process.env.NEXT_PUBLIC_GOOGLE_ADSENSE}`}
        data-ad-slot="5255320436"
        data-ad-format="auto"
        data-full-width-responsive="true">
      </ins>
    </div>
  );
}

export default VerticalAd;

