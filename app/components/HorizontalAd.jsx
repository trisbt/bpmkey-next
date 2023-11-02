'use client'
import { useEffect } from 'react';

function HorizontalAd() {
  useEffect(() => {
    const insElem = document.querySelector('.adsbygoogle:not([data-ad-loaded])');
    if (insElem && !insElem.hasAttribute('data-adsbygoogle-status')) {
      window.adsbygoogle = window.adsbygoogle || [];
      window.adsbygoogle.push({});
      insElem.setAttribute('data-ad-loaded', 'true'); // Mark this ins as loaded
    }
  }, []);

  return (
    <div style={{ textAlign: 'center' }}>
      {/* AdSense Horizontal Ad unit */}
      <ins
        className="adsbygoogle"
        style={{
          display: 'block',
          width: '95vw',
          // height: '120px',
          // border: '1px solid red',

          // display: 'block', width: '88vw',
          // backgroundColor: 'white',  
        }}
        data-ad-client={`${process.env.NEXT_PUBLIC_GOOGLE_ADSENSE}`}
        data-ad-slot="7286492910"
        data-ad-format="auto"
        data-full-width-responsive="true">
      </ins>
    </div>
  );
}

export default HorizontalAd;

