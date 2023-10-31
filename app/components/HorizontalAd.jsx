'use client'
import { useEffect } from 'react';

function HorizontalAd() {
  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (err) {
      console.error(err);
    }
  }, []);

  return (
    <div>
      {/* AdSense Horizontal Ad unit */}
      <ins
        className="adsbygoogle"
        style={{
          display: 'block', width: '88vw',
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

