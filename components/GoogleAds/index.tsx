import React from 'react';
import { useAdSlot } from './useAddSlot';

function Ad({ ...props }) {
  const { adInfo } = props;
  const windowAny: any = typeof window !== "undefined" &&  window;
  const { googletag } = windowAny;
  const [isTransitioning, setTransitioning] = React.useState(false);

  useAdSlot({
    sizes: adInfo.sizes,
    id: adInfo.id,
    adCode: adInfo.adCode,
    isTransitioning
  });

  React.useEffect(() => {
    setTransitionComplete;
    return setTransitionStarted;
  }, []);

  const setTransitionStarted = () => {
    setTransitioning(true);

    // destroy all ad slots
    googletag?.cmd.push(function () {
      googletag?.destroySlots();
    });
  };

  const setTransitionComplete = () => {
    setTransitioning(false);
  };

  return (
    <div id={`${adInfo.id}`} style={{ backgroundColor: 'rgba(0,0,0,0.3)' }}>
      {/* <script>
        {windowAny.googletag.cmd.push(function () {
          googletag.display(adInfo.id);
        })}
      </script> */}
    </div>
  );
}

export default Ad;
