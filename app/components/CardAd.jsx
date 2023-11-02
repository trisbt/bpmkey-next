'use client'
import { useEffect } from "react";

function CardAd() {
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
            {/* AdSense Ad Card unit */}
            <ins
                className="adsbygoogle"
                style={{
                    display: 'inline-block',
                    width: '80vw',
                    height: '200px',
                    // border: '1px solid red',
                    // display: 'block',
                    // backgroundColor: 'black',
                    // height: '10em',
                    // width: '65vw',
                    // borderRadius: '.2em',
                    // margin: '10px 10px 0',
                    // boxShadow: 3,
                }}
                data-ad-client={`${process.env.NEXT_PUBLIC_GOOGLE_ADSENSE}`}
                data-ad-slot="4917966981"
                data-ad-format="fluid"
                data-ad-layout-key="-hl+5+v-9g+fn"
                data-full-width-responsive="true"
            >
            </ins>
        </div>
    );
}

export default CardAd;

