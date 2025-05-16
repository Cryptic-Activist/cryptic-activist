import { GA_ID, IS_PRODUCTION } from '@/constants';

import { GoogleAnalytics } from '@next/third-parties/google';

const Analytics = () => {
  return <>{IS_PRODUCTION && <GoogleAnalytics gaId={GA_ID} />}</>;
};

export default Analytics;
