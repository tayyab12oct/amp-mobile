import dynamic from 'next/dynamic';

const Faq = dynamic(() => import('../screens/ContactUs'));

export default Faq;
