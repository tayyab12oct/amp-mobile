import Head from 'next/head';
import React from 'react';

function Header() {
  return (
    <>
      <Head>
        <style amp-custom="">{`
          .header {
            background-color: #1c0a3970;
            background-image: linear-gradient(to bottom, #680faa28, #3579d828);
            display:flex;
            align-items:center;
            padding:10px 15px;
            justify-content:space-between;
          }
          .icon-container{
            display:flex;
            align-items:center;
            justify-content:center;
          }
          .search{
            margin:0 25px;
          }
          .logo{
            margin-left:calc(120px - 60px)
          }
        `}</style>
      </Head>
      <nav class="header">
        <amp-img
          src="https://i.imgur.com/pvOhBJP.png"
          width="18px"
          height="12px"
        />
        <amp-img
          src="https://images.ottplay.com/static/new_logo.svg"
          width="120px"
          height="35px"
          className="logo"
        />
        <div className="icon-container">
          <amp-img
            src="https://images.ottplay.com/static/searchIcon.svg"
            width="17px"
            height="17px"
            className="search"
          />
          <amp-img
            src="https://images.ottplay.com/static/profile2.svg"
            width="20px"
            height="20px"
          />
        </div>
      </nav>
      ;
    </>
  );
}
export default Header;
