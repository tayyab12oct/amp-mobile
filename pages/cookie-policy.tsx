import dynamic from 'next/dynamic';

const CookiePolicy = dynamic(() => import('../screens/CookiePolicy'));

export default CookiePolicy;
