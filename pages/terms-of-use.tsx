import dynamic from 'next/dynamic';

const TermOfUse = dynamic(() => import('../components/TermsOfUse'));

export default TermOfUse;
