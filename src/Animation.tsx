import React from 'react';
import { observer } from 'mobx-react';
import { useSpring, animated } from 'react-spring';
import range from 'lodash-es/range';

import './Animation.css';

const items = range(10);

// @ts-ignore
const interp = i => r => `translate3d(0, ${15 * Math.sin(r + (i * 2 * Math.PI) / 1.6)}px, 0)`;

function Animation(): React.ReactElement {
  // @ts-ignore
  const { radians } = useSpring({
    to: async (next: any) => {
      while (1) await next({ radians: 2 * Math.PI });
    },
    from: { radians: 0 },
    config: { duration: 3500 },
    reset: true
  });

  return (
    <div className="animation-root">
      {items.map(i => (
        <animated.div
          key={i}
          className="box"
          style={{ transform: radians.interpolate(interp(i)) }}
        />
      ))}
    </div>
  );
}

export default observer(Animation);
