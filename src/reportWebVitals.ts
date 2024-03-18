import { ReportHandler } from 'web-vitals';

/**
 * Reports web vital metrics.
 * This function is triggered automatically by index.js and uses the web-vitals library to measure performance.
 * Metrics:
 * - CLS (Cumulative Layout Shift): Measures visual stability.
 * - FID (First Input Delay): Measures responsiveness.
 * - FCP (First Contentful Paint): Measures the time from page load to the first bit of content rendered.
 * - LCP (Largest Contentful Paint): Measures loading performance.
 * - TTFB (Time to First Byte): Measures the time until the server starts to send the first byte of the first resource.
 * @param {ReportHandler} onPerfEntry - The callback function to handle the metrics.
 */
const reportWebVitals = async (onPerfEntry?: ReportHandler) => {
  if (onPerfEntry && typeof onPerfEntry === 'function') {
    try {
      const vitals = await import('web-vitals');
      const { getCLS, getFID, getFCP, getLCP, getTTFB } = vitals;

      getCLS(onPerfEntry);
      getFID(onPerfEntry);
      getFCP(onPerfEntry);
      getLCP(onPerfEntry);
      getTTFB(onPerfEntry);
    } catch (error) {
      console.error("Failed to load 'web-vitals' library:", error);
    }
  }
};

export default reportWebVitals;
