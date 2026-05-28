import React from 'react';

export function Marquee() {
  return (
    <div className="marquee">
      <div className="marquee-track">
        {[1, 2].map((k) => (
          <div className="marquee-item" key={k}>
            Drive <span className="star" aria-hidden="true">✦</span>
            <em>Rebuild</em> <span className="star" aria-hidden="true">✦</span>
            Conquer <span className="star" aria-hidden="true">✦</span>
            <em>The</em> DRC <em>Way</em> <span className="star" aria-hidden="true">✦</span>
            Drive <span className="star" aria-hidden="true">✦</span>
            <em>Rebuild</em> <span className="star" aria-hidden="true">✦</span>
            Conquer <span className="star" aria-hidden="true">✦</span>
            <em>The</em> DRC <em>Way</em> <span className="star" aria-hidden="true">✦</span>
          </div>
        ))}
      </div>
    </div>
  );
}
