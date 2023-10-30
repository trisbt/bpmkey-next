'use client'
import { useEffect } from "react";

function VerticalAd() {
  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (err) {
      console.error(err);
    }
  }, []); 

    return (
      <div>
        AdSense Ad unit
        <ins 
          className="adsbygoogle"
          style={{ display: 'block', backgroundColor:'white', width:'10em' }}
          data-ad-client="ca-pub-5259100144989457"
          data-ad-slot="5255320436"
          data-ad-format="auto"
          data-full-width-responsive="true">
        </ins>
      </div>
    );
  }
  
  export default VerticalAd;

