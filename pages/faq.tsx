import dynamic from 'next/dynamic';

const Faq = dynamic(() => import('../screens/Faq'));

export default Faq;
