import dynamic from 'next/dynamic';

const PrivayPolicy = dynamic(() => import('../components/PrivacyPolicy'));

export default PrivayPolicy;
