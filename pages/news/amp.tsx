import Footer from '../../components/amp/footer';
import Head from 'next/head';
import Navbar from '../../components/amp/header';
import React from 'react';
export const config = {
  amp: true,
};
function Amp() {
  return (
    <>
      <Head>
        <style amp-custom="">{`
          body{
            font-family: "Montserrat", "Arial", "sans-serif";
          }
          .bg {
            width: 100%;
            min-height: 100vh;
            background-position: center;
            background-size: cover;
            background-repeat: no-repeat;
            background-image: url(https://images.ottplay.com/static/backgroundImage-updated.jpg) !important;
            
          }
          .section{
            diisplay: flex;
            justify-content: center;
            margin-left: 10px;
            margin-right: 10px;
          }
          .main-tag{
            background-color: #591582;
            margin-top: -20px;
            padding-top: 10px;
            padding-bottom:  10px;
            
          }
          .aside-tag{
            color: #fff;
            display: flex;
            justify-content: start;
            align-items: start;
            margin-left: 10px;
            margin-top: 0;
            font-weight: 400;
          }
          .head-icon{
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            margin-top: 20px;
          }
          .text-left{
            color: #967EBC;
          }
          .share{
            height: 30px;
            width: 30px;
          }
          .main-text{
            color: #fff;
            font-weight: 600;
            padding-top: 12px;
          }
          .main-text2{
            color: #9B7FB5;
            font-weight: 400;
            padding-top: 10px;
          }
          .line{
            border-bottom: 1px solid #543474;
            padding-top: 15px;
          }
          .text1{
            color: #ffffff;
            font-weight: 600;
            padding-bottom: 4px;
          }
          .text2{
            color: #9B7FB5;
            font-weight: 400;
          }
          .text-list{
            display: block;
            color: #ffffff;
            font-weight: 400;
            padding-bottom: 4px;
            text-align: justify;
            line-height: 1.43;
          }
          .b-text{
            color: #ffffff;
            font-weight: 400;
            padding-top: 4px;
          }
          .social{
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: flex-start; 
            padding-bottom: 15px;
          }
          .icons{
            height: 30px;
            width: 30px;
            margin-right: 10px;
          }
        `}</style>
      </Head>
      <div className="bg">
        <Navbar />
        <div className="main-tag">
          <amp-fit-text
            className="aside-tag"
            width="200"
            height="10"
            layout="responsive"
            max-font-size="12"
          >
            Home <span className="ottplay-63">»</span> News
          </amp-fit-text>
        </div>
        <div className="section">
          <div className="head-icon">
            <amp-fit-text
              className="text-left"
              width="200"
              height="10"
              layout="responsive"
              max-font-size="20"
            >
              News
            </amp-fit-text>
            <amp-img
              src="/static/follow_images/dark_share.svg"
              alt="share icon"
              width="auto"
              height="auto"
              layout="responsive"
              className="share"
            />
          </div>
          <amp-fit-text
            className="main-text"
            width="200"
            height="20"
            layout="responsive"
            max-font-size="24"
          >
            Vijay Sithupathi clarifies if he would be part of The Family Man 3
          </amp-fit-text>
          <amp-fit-text
            className="main-text2"
            width="200"
            height="25"
            layout="responsive"
            max-font-size="15"
          >
            The family Man 2 featured samantha Akkineni in the lead role.
          </amp-fit-text>

          <div className="line"></div>
          <amp-fit-text
            className="text1"
            width="200"
            height="25"
            layout="responsive"
            max-font-size="22"
          >
            Shaheen
          </amp-fit-text>
          <amp-fit-text
            className="text2"
            width="200"
            height="25"
            layout="responsive"
            max-font-size="15"
          >
            Jul 12, 2021
          </amp-fit-text>
          <amp-img
            src="https://images.ottplay.com/images/vijay-sethupathi-354?impolicy=ottplay-20210210&amp;width=600"
            width="436"
            height="200"
            layout="responsive"
          />
          <amp-fit-text
            className="text2"
            width="200"
            height="25"
            layout="responsive"
            max-font-size="15"
          >
            Vijay Sethupathi
          </amp-fit-text>
          <amp-fit-text
            className="text-list"
            width="200"
            height="50"
            layout="responsive"
            max-font-size="18"
          >
            The Family Man 2 released almost a month back but is still in the
            news. Actor Uday Mahesh who played a retired agent in the show
            especially has been hogging the limelight for his role. After the
            success of bringing in Samantha and Uday Mahesh in the second
            instalment, there were reports that the makers wanted to take it a
            step ahead and approach Vijay Sethupathi for The Family Man 3.
          </amp-fit-text>
          <amp-fit-text
            className="text-list"
            width="200"
            height="50"
            layout="responsive"
            max-font-size="18"
          >
            The speculation grew stronger since Vijay is already working with
            The Family Man makers Raj DK for their upcoming project with Shahid
            Kapoor and Raashi Khanna. While denying the news of him joining The
            Family Man franchise, Vijay did express his desire to work with
            Manoj Bajpayee.
          </amp-fit-text>
          <amp-fit-text
            className="text-list"
            width="200"
            height="50"
            layout="responsive"
            max-font-size="18"
          >
            I am only doing Raj and DK’s web series with Shahid Kapoor. I
            haven’t been offered any series or film with Manoj Bajpayee though
            I’d love to work with him,” the actor told SpotboyE.
          </amp-fit-text>
          <amp-fit-text
            className="text-list"
            width="200"
            height="50"
            layout="responsive"
            max-font-size="18"
          >
            Vijay has already explored the OTT space and will star in the
            Netflix anthology Navarasa, which will start streaming from August
            6. The project with Raj & DK, which will feature Shahid in the lead
            role, is also a web series.
          </amp-fit-text>
          <amp-fit-text
            className="text-list"
            width="200"
            height="50"
            layout="responsive"
            max-font-size="18"
          >
            Vijay is also going to be seen in the silent Bollywood film Gandhi
            Talks next. The film is written, directed and produced by Kishor
            Pandurang Belekar.
          </amp-fit-text>
          <amp-fit-text
            className="text-list"
            width="200"
            height="50"
            layout="responsive"
            max-font-size="18"
          >
            The makers of The Family Man, even if it is a Hindi web series, have
            been receptive to casting actors from the South Indian film industry
            including Priyamani (as Srikant’s wife), Devadarshini, Ravindra
            Vijay, Sundeep Kishan, Neeraj Madhav to name a few.
          </amp-fit-text>
          <amp-fit-text
            className="b-text"
            width="200"
            height="50"
            layout="responsive"
            max-font-size="22"
          >
            Share
          </amp-fit-text>
          <div className="social">
            <amp-social-share
              className="rounded"
              width="30"
              height="30"
              type="twitter"
              aria-label="Share on Twitter"
            ></amp-social-share>
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
              type="whatsapp"
              aria-label="Share on Whatsapp"
              data-param-app_id="254325784911610"
            ></amp-social-share>

            {/* <amp-img
              src="https://image.flaticon.com/icons/png/512/2111/2111646.png"
              height="50"
              layout="responsive"
              alt="tele"
              className="icons"

            /> */}
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}
export default Amp;
