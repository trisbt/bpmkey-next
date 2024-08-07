'use client'
import { useEffect } from "react";

function MultiAd() {
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
            {/* AdSense MultiAd Card unit */}
            <ins
                className="adsbygoogle"
                style={{
                    display: 'inline-block',
                    width: '90vw',
                    height: '100px',
                    // border:'1px solid red',
                    borderRadius: '.2em',
                }}
                data-ad-client={`${process.env.NEXT_PUBLIC_GOOGLE_ADSENSE}`}
                data-ad-slot="3828865145"
                data-ad-format="autorelaxed"
                data-matched-content-rows-num="2,1"
                data-matched-content-columns-num="2,4"
                data-matched-content-ui-type="image_stacked,image_stacked"
            // data-full-width-responsive="true"
            >
            </ins>
        </div>
    );
}

export default MultiAd;

