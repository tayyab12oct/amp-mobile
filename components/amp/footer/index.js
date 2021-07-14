import Head from "next/head";
import React from "react";

function Header() {
  return (
    <>
      <Head>
        <style amp-custom="">{`
            body{
                font-family: "Montserrat", "Arial", "sans-serif";
            }
          .footer{
              background-color: #0E051E;
              min-height: 100vh;
              width: 100%;
          }
          .logo{
            margin-top: 10px;
            margin-left:calc(160px - 65px)
        }
        .text-c{
            color: #D4C4F2;
            font-weight: 400;
            text-align: center;
          }
          .social1{
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: center; 
            padding-bottom: 15px;
          }
          .icons{
            height: 30px;
            width: 30px;
            margin-right: 10px;
            
          }
          .rounded{
              border-radius: 100%;
              margin-right: 10px;
          }
          .btn{
              display: flex;
              flex-direction: row;
             justify-content: center;
          }
         .openbtn{
             display: flex;
             flex-direction: row;
             justify-content: center;
             background-color: transparent;
             color: #ffffff;
             padding: 15px;
             border-radius: 50px;
             outline: none;
             border: 1px solid #35284C;
             text-align: center;
             margin-right: 5px;
             padding-left: 20px;
         }
         .btn-icon{
            height: 10px;
            width: 10px;
            margin-right: 10px;
            display: flex;
            justify-content: center;
            align-items: center;
            margin-top: 2px;
         }
         .btn-icons{
            height: 10px;
            width: 10px;
            margin-right: 10px;
            display: flex;
            justify-content: center;
            align-items: center;
            margin-top: 2px;
         }
         .arrow-sign{
             display: flex;
             justify-content: center;
             align-items: center;
         }
         .openbtn-arrow{
             display: flex;
             justify-content: center;
             background-color: transparent;
             color: #ffffff;
             padding: 15px;
             border-radius: 50px;
             outline: none;
             border: 1px solid #35284C;
             text-align: center;
             margin-right: 5px;
             padding-left: 20px;
            }
            .btn-arrow{
               height: 10px;
               width: 20px;
               margin-left: 10px;
               margin-top: 3px;
            }
            .line{
                border-bottom: 2px solid #2E283A;
                padding-top: 15px;
                display: flex;
                margin: 0 10px;
                justify-content: center;
              }
              .list{
                  display: flex;
                  flex-direction: row;
                  justify-content: space-between;
                  flex-wrap: wrap;
                  padding: 20px;
              }
              .list ul {
                  width: 37%;
              }
              .list ul li{
                  color: #625577;
                  list-style: none;
              }
              .f-list1{
                display: flex;
                justify-content: center;
              }
              .f-list1 ul{
                list-style-type: circle;

            }
            .f-list1 ul li{
              color:#B0A1CB;
              display: inline;
              flex-direction: row;
              margin-right:15px;
              font-size: 15px;
              text-align: center;
            }
          
              .f-list{
                  display: flex;
                  justify-content: center;
                }
                .f-list ul{
                  list-style-type: circle;

              }
              .f-list ul li{
                color:#B0A1CB;
                display: inline;
                flex-direction: row;
                margin-right:15px;
                font-size: 16px;
                text-align: center;
                margin-left: 1px;
              }
              .text-end{
                color: #7D7095;
                font-weight: 400;
                text-align: center;
              }
        `}</style>
      </Head>
      <div className="footer">
        <amp-img
          src="https://images.ottplay.com/static/new_logo.svg"
          width="180px"
          height="50px"
          className="logo"
        />
        <amp-fit-text
          className="text-c"
          width="200"
          height="25"
          layout="responsive"
          max-font-size="15"
        >
          Follow us
        </amp-fit-text>
        <div className="social1">
          <amp-social-share
            className="rounded"
            width="30"
            height="30"
            type="facebook"
            aria-label="Share on Facebook"
            data-param-app_id="254325784911610"
          ></amp-social-share>

          <amp-social-share
            className="rounded"
            width="30"
            height="30"
            type="twitter"
            aria-label="Share on Twitter"
          ></amp-social-share>

          {/* <amp-img
            src="/static/follow_images/inst.svg"
            width="auto"
            height="auto"
            layout="responsive"
            alt="instagram"
            className="icons"
          />
          <amp-img
            img
            src="/static/follow_images/utube.svg"
            width="auto"
            height="auto"
            layout="responsive"
            alt="yt"
            className="icons"
          /> */}
        </div>
        <amp-fit-text
          className="text-c"
          width="200"
          height="25"
          layout="responsive"
          max-font-size="15"
        >
          Download App
        </amp-fit-text>
        <div className="btn">
          <button className="openbtn">
            <amp-img
              src="https://images.ottplay.com/static/playStoreLogo.svg"
              width="auto"
              height="auto"
              layout="responsive"
              alt="playstore"
              className="btn-icon"
            />
            Google Play
          </button>
          <button className="openbtn">
            <amp-img
              src="https://images.ottplay.com/static/iosLogo.svg"
              width="auto"
              height="auto"
              layout="responsive"
              alt="apple"
              className="btn-icons"
            />
            App Store
          </button>
        </div>
        <amp-fit-text
          className="text-c"
          width="200"
          height="25"
          layout="responsive"
          max-font-size="15"
        >
          Take tour watchlist wherever you go
        </amp-fit-text>
        <div className="arrow-sign">
          <button className="openbtn-arrow">
            Sign In
            <amp-img
              src="https://images.ottplay.com/static/rightArrow.svg"
              width="auto"
              height="auto"
              layout="responsive"
              alt="arrow"
              className="btn-arrow"
            />
          </button>
        </div>
        <div className="line"></div>
        <div className="list">
          <ul>
            <li>For You</li>
            <li>Home</li>
            <li>Movies</li>
            <li>Shows</li>
            <li>Languages</li>
          </ul>
          <ul>
            <li>Genre</li>
            <li>Streaming services</li>
            <li>Watch List</li>
            <li>Latest News</li>
            <li>Reviews</li>
          </ul>
          <ul>
            <li>For You</li>
            <li>Home</li>
            <li>Movies</li>
            <li>Shows</li>
            <li>Languages</li>
          </ul>
          <ul>
            <li>For You</li>
            <li>Home</li>
            <li>Movies</li>
            <li>Shows</li>
            <li>Languages</li>
          </ul>
        </div>
        <div className="line"></div>
        <amp-fit-text
          className="text-c"
          width="200"
          height="25"
          layout="responsive"
          max-font-size="18"
        >
          Partner sites:
        </amp-fit-text>
        <div className="f-list1">
          <ul>
            <li>Hindustan Times</li>
            <li>.</li>
            <li>Live Hindustan</li>
            <li>.</li>

            <li>Live Mint</li>
          </ul>
        </div>
        <div className="f-list">
          <ul>
            <li>Desimartini</li>
            <li>.</li>

            <li>Shine</li>
            <li>.</li>

            <li>Healthshots</li>
            <li>.</li>

            <li>Slurrp</li>
          </ul>
        </div>
        <div className="line"></div>
        <amp-fit-text
          className="text-end"
          width="200"
          height="25"
          layout="responsive"
          max-font-size="15"
        >
          copyright @ 2021 OTTplay, Hindustan Media Ventures Limited
        </amp-fit-text>
      </div>
    </>
  );
}
export default Header;
