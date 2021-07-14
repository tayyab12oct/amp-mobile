import React from 'react';
import { useRouter } from 'next/router';

function ActiveLink ({ children, href, className = {} }) {
  const router = useRouter();
  const style = {
    marginRight: 10,
    color: router.asPath === href ? 'white' : 'white',
    ...className,
  };

  const handleClick = (e) => {
    e.preventDefault();
    router.push(href);
  };

  return (
    <a href={href} onClick={handleClick} style={style}>
      {children}
    </a>
  );
}

export default ActiveLink;
