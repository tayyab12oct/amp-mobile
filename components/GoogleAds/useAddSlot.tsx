import { useEffect } from 'react';
import { useTransitionState } from '../../containers/TransitionState';

export async function useAdSlot({ sizes, id, adCode, isTransitioning }) {
  // const { isTransitioning, slotList, addToSlot }: any = useTransitionState();

  const windowAny: any = typeof window !== 'undefined' && window;
  const { googletag } = windowAny;

  useEffect(() => {
    if (!isTransitioning && typeof window !== undefined) {
      // if (slotList.indexOf(id) === -1) {
      googletag?.cmd.push(function () {
        // const adMapping = googletag.sizeMapping();
        // Object.keys(mapping).forEach((breakpoint) => {
        //   adMapping.addSize([Number(breakpoint), 0], [mapping[breakpoint]]);
        // });
        // const builtMapping = adMapping.build();
        googletag
          ?.defineSlot(adCode, sizes, id)
          //   .defineSizeMapping(builtMapping)
          .addService(googletag.pubads());

        // A) Enable with defaults.
        // googletag?.pubads().enableLazyLoad();

        // B) Enable without lazy fetching. Additional calls override previous
        // ones.
        //googletag?.pubads().enableLazyLoad({ fetchMarginPercent: -1 });

        // C) Enable lazy loading with...
        googletag?.pubads().enableLazyLoad({
          // Fetch slots within 5 viewports.
          fetchMarginPercent: 50,
          // Render slots within 2 viewports.
          renderMarginPercent: 50,
          // Double the above values on mobile, where viewports are smaller
          // and users tend to scroll faster.
          mobileScaling: 5,
        });

        // Register event handlers to observe lazy loading behavior.
        // googletag?.pubads().addEventListener('slotRequested', function (event) {
        //   updateSlotStatus(event.slot.getSlotElementId(), 'fetched');
        // });

        // googletag?.pubads().addEventListener('slotOnload', function (event) {
        //   updateSlotStatus(event.slot.getSlotElementId(), 'rendered');
        // });

        googletag?.enableServices();
      });

      googletag?.cmd.push(function () {
        googletag?.display(id);
      });

      // const val = slotList ? slotList.push(id) : [id]
      // addToSlot(val);

      // }
    }
    // console.log('executing res  ', slotList)
  }, [sizes, id, isTransitioning]);
}

function updateSlotStatus(slotId, state) {
  console.log('ads' + slotId + '-' + state);
}
