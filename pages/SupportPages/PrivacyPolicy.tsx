import * as React from 'react';

import { Grid, Hidden } from '@material-ui/core';

import Helmet from 'react-helmet';
import SEO from '../../components/Seo';
import { Theme } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles';

export default function PrivacyPolicy(props) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <SEO>
        <meta name="robots" content="noindex,nofollow" />
        <meta name="googlebot" content="noindex,nofollow" />
      </SEO>
      <Grid xs={12} container>
        <Grid sm={1} lg={2} item></Grid>
        <Grid
          // xs={12}
          // sm={10}
          // lg={8}
          container
          spacing={2}
          direction="row"
          justify="space-between"
          alignItems="stretch"
        >
          <Grid item xs={12} md={8} className={classes.div_left}>
            <Grid xs={12} className={classes.header}>
              Privacy Policy
            </Grid>
            <Grid className={classes.about_content}>
              {
                'Welcome to OTTplay (the “Site”). The Site is provided and controlled by Hindustan Media Ventures Limited (“HMVL”, “we” or “us”). HMVL is vigilant about protecting your privacy and recognizes the importance of maintaining the privacy of every user who visits our Site.  We value your privacy and appreciate your trust. We are committed to be transparent about the data we collect about you, how it is used and with whom it is shared.'
              }
            </Grid>
            <Grid
              className={classes.about_content}
              style={{ margin: '15px 0px 0px 0px' }}
            >
              {
                'This Privacy Policy details our collection, use and disclosure of personal and non-personal data you give to us when you access or use HMVL’s online services and websites, and software provided by us on or in connection with such services or Sites (collectively, the “Services”). We try to be as transparent as possible, so you can always see and act upon what is being done with your data.'
              }
            </Grid>
            <Grid
              className={classes.about_content}
              style={{ margin: '15px 0px 25px 0px' }}
            >
              {
                'By visiting and/or using our Site, you agree to this Privacy Policy. We strongly recommend that you read this Privacy Policy so that you understand our approach towards the use of your personal data. By accepting the policy at the time of registration, you explicitly approve and provide consent to our collection, storage, use and disclosure of your personal information as described in this Policy and terms and conditions.'
              }
            </Grid>
            <Grid className={classes.header}>
              Changes to this Privacy Policy
            </Grid>
            <Grid
              className={classes.about_content}
              style={{ margin: '0px 0px 25px 0px' }}
            >
              {
                'This Privacy Policy (“Policy”) can be updated at any time. We encourage users to frequently check this page for any changes. You acknowledge and agree that it is your responsibility to review this Policy periodically and become aware of those modifications.'
              }
            </Grid>
            <Grid className={classes.header}>
              What Information do we Collect
            </Grid>
            <Grid
              className={classes.about_content}
              style={{ margin: '0px 0px 25px 0px' }}
            >
              {
                'We collect information directly from you, when you visit/surf our Site, certain personal information about you such as your IP Address, etc. may be automatically stored with us. However, if you choose to avail of certain services on our Site, you shall be required to provide certain personal information for the registration and/or access to such services/web pages e.g. contact details, location data. Such information may include, without limitation, your first and last name, user name & password, email address, contact address, mobile/telephone number(s), information about your computer hardware and software and such other information as may be required for your interaction with the services and from which your identity is discernible. We may also collect demographic information that is not unique to you such as code, preferences, favorites, etc. In addition to the above we may indirectly also collect information about you when you use certain third party services available on our Site. We may also collect certain information about the use of our Site by you, such as the services you access/use or areas you visit. We use this information to deliver our web pages to you upon request, to tailor our Site to the interests of our Site users, to measure traffic on the Site. This information may also be used by our advertisers / third party companies to personalize content, ads etc.'
              }
            </Grid>
            <Grid className={classes.header}>How we collect Information</Grid>
            <Grid
              className={classes.about_content}
              style={{ margin: '0px 0px 25px 0px' }}
            >
              {
                'We collect information directly from you when you register with us.'
              }
              <ul>
                <li>
                  {
                    'We collect information (whether you are registered or not registered with us) when you browse our Sites/apps, open or respond to an email from us (promotional or informational),'
                  }
                </li>
                <li>
                  {
                    'When you post a comment on our Site or raise a query/question to us through phone or email,'
                  }
                </li>
                <li>
                  {
                    'We collect information from you when you register with us by linking your social media or third party accounts. By doing this, you are authorizing them to share with us certain information from such accounts, and authorizing us to collect, store, and use this in accordance with this Policy,'
                  }
                </li>
                <li>
                  {
                    'We collect information from you using third party tools, browser cookies and web beacons in order to improve user experience,'
                  }
                </li>
                <li>
                  {
                    'We may collect non-personal information about the computer, mobile device or other device you use to access the service, such as IP address, geo-location information, unique device identifiers, browser type, browser language and other information for the purpose of providing customized information on the browser,'
                  }
                </li>
                <li>
                  {
                    'Our mobile application and Sites may capture your current location if you choose to enable GPS feature in the app or browser.'
                  }
                </li>
              </ul>
            </Grid>
            <Grid className={classes.header}>Use of Information</Grid>
            <Grid className={classes.about_content}>
              {
                'If you choose to provide us with the above mentioned information, you consent to the use, transfer, processing and storage of the information so provided by you on our servers. The information provided by you shall not be given to third parties (third parties for this purpose do not include our group / holding / subsidiary companies and or our service partners / associates) for marketing purposes and other related activities without your prior consent.'
              }
            </Grid>
            <Grid
              className={classes.about_content}
              style={{ margin: '15px 0px 0px 0px' }}
            >
              {'The information provided by you shall be used by us to:'}
              <ul>
                <li>
                  {
                    'Improve our Site and enable us to provide you the most user-friendly experience which is safe, smooth and customized,'
                  }
                </li>
                <li>
                  {
                    'Improve and customize our services, content and other commercial / non-commercial features on the Site,'
                  }
                </li>
                <li>
                  {
                    'Contact you to get your opinion on our current products and services or possible new products and/or services that may be offered by us,'
                  }
                </li>
                <li>
                  {
                    'Send you information on our products, services, special deals, promotions,'
                  }
                </li>
                <li>
                  {'Ask you to send feedback on any or all of our services,'}
                </li>
                <li>
                  {
                    'Send you marketing/promotional communications (If you do not wish to receive such marketing/promotional communications from us you may indicate your preferences at the time of registration or by following the instructions provided on the Site or by providing instructions to this effect),'
                  }
                </li>
                <li>
                  {'Create various surveys and analysis in form of reports,'}
                </li>
                <li>
                  {
                    'Send newsletter(s) to you (Provided you subscribe to the same),'
                  }
                </li>
                <li>{'Services may be of your interest,'}</li>
                <li>
                  {'Provide customer support and the services you request,'}
                </li>
                <li>{'Resolve disputes, if any and troubleshooting,'}</li>
                <li>
                  {
                    'Avoid/check illegal and/or potentially prohibited activities and to enforce Agreements,'
                  }
                </li>
                <li>
                  {
                    'Provide service updates and promotional offers related to our services/products,'
                  }
                </li>
                <li>
                  {
                    'Comply with any court judgment / decree / order / directive / legal & government authority /applicable law,'
                  }
                </li>
                <li>
                  {
                    'Investigate potential violations or applicable national & international laws,'
                  }
                </li>
                <li>
                  {
                    'Investigate deliberate damage to the Site/services or its legitimate operation,'
                  }
                </li>
                <li>
                  {
                    'Detect, prevent, or otherwise address security and/or technical issues,'
                  }
                </li>
                <li>
                  {
                    'Protect the rights, property or safety of HMVL and/or its Directors, employees and the general public at large,'
                  }
                </li>
                <li>{'Respond to Claims of third parties,'}</li>
                <li>
                  {
                    'The members of our corporate family and group, affiliates, service providers and third parties under a contract to provide joint services, contents and marketing communications,'
                  }
                </li>
                <li>
                  {
                    'Other third parties to whom you explicitly require us to send the information.'
                  }
                </li>
              </ul>
            </Grid>
            <Grid
              className={classes.about_content}
              style={{ margin: '15px 0px 0px 0px' }}
            >
              {
                'Your information shall be disclosed to our employees/service providers who provide services to us vis-a-vis our Site and the services/products therein. These service providers/employees will have access to the information provided by you in order to perform their functions/services efficiently.'
              }
            </Grid>
            <Grid
              className={classes.about_content}
              style={{ margin: '15px 0px 0px 0px' }}
            >
              {
                'Based upon the personally identifiable information you provide us, we will send you a welcoming email to verify your username and password. We will also communicate with you in response to your inquiries with respect to our services/content, to provide the services you request, and to manage your account. We will communicate with you by email or telephone, in accordance with your wishes. We will also send you SMS alerts from time to time to update you on new matched jobs and other updates.'
              }
            </Grid>
            <Grid
              className={classes.about_content}
              style={{ margin: '15px 0px 0px 0px' }}
            >
              {
                'We may also share your information with third parties (including operators of third-party Sites and/or social networking Sites) in order to show you targeted advertisements and other content that has been customized for you. Such advertisements will only relate to HMVL’s services, products, and features.'
              }
            </Grid>
            <Grid
              className={classes.about_content}
              style={{ margin: '15px 0px 25px 0px' }}
            >
              {
                'In order to provide certain services to you, we may on occasion supplement the personal information you submitted to us with information from third party sources (third parties for this purpose may include our group / holding / subsidiary companies and or our service partners /associates). We reserve the right to disclose your personally identifiable information as required by law and when we believe that disclosure is necessary to protect our rights and/or to comply with a judicial proceeding, court order, or legal process served on our Site.'
              }
            </Grid>
            <Grid className={classes.header}>
              Changing Your Personal Information
            </Grid>
            <Grid className={classes.about_content}>
              {
                'You can access and modify your personal information by signing on to the Site. We will not modify the information provided by you. However, we recommend that you update your personal information as soon as such changes are necessitated.'
              }
            </Grid>
            <Grid
              className={classes.about_content}
              style={{ margin: '15px 0px 25px 0px' }}
            >
              {
                'Where you make a public posting, you may not be able to change or remove it nor shall you be able to close your account. Upon your request, we will close your account and remove your personal information from view as soon as reasonably possible, based on your account activity and in accordance with applicable law(s). However, we will retain your personal information from closed accounts to comply with law, Avoid/check illegal and/or potentially prohibited activities and to enforce User Agreements; Comply with any court judgment / decree / order / directive / legal & government authority /applicable law; Investigate potential violations or applicable national & international laws; Investigate deliberate damage to the Site/services or its legitimate operation; Detect, prevent, or otherwise address security and/or technical issues; Protect the rights, property or safety of HMVL and/or its Directors, employees and the general public at large; Respond to Claims of third parties; and take such other actions as may be permitted by law.'
              }
            </Grid>
            <Grid className={classes.header}>
              Cookies and Other Tracking Technologies
            </Grid>
            <Grid className={classes.about_content}>
              {
                'Some of our Web pages utilize "cookies" and other tracking technologies. A "cookie" is a small text file that may be used, for example, to collect information about Web Site activity. Some cookies and other technologies may serve to recall Personal Information previously indicated by a Web user. Most browsers allow you to control cookies, including whether or not to accept them and how to remove them.'
              }
            </Grid>
            <Grid
              className={classes.about_content}
              style={{ margin: '15px 0px 0px 0px' }}
            >
              {
                'You may set most browsers to notify you if you receive a cookie, or you may choose to block cookies with your browser, but please note that if you choose to erase or block your cookies, you will need to re-enter your original user ID and password to gain access to certain parts of the Site and App.'
              }
            </Grid>
            <Grid
              className={classes.about_content}
              style={{ margin: '15px 0px 0px 0px' }}
            >
              {
                'Tracking technologies may record information such as Internet domain and host names; Internet protocol (IP) addresses; browser software and operating system types; clickstream patterns; and dates and times that our Site is accessed. Our use of cookies and other tracking technologies allows us to improve our Web Site and your Web experience. We may also analyze information that does not contain Personal Information for trends and statistics.'
              }
            </Grid>
            <Grid
              className={classes.about_content}
              style={{ margin: '15px 0px 0px 0px' }}
            >
              {
                'Google Analytics: Google Analytics is a web analytics service offered by Google that tracks and reports Site traffic. Google uses the data collected to track and monitor the use of our Service. This data is shared with other Google services. Google may use the collected data to contextualize and personalize the ads of its own advertising network. You can opt-out of having made your activity on the Service available to Google Analytics by installing the Google Analytics opt-out browser add-on. The add-on prevents the Google Analytics JavaScript (ga.js, analytics.js, and dc.js) from sharing information with Google Analytics about visits activity.'
              }
            </Grid>
            <Grid
              className={classes.about_content}
              style={{ margin: '15px 0px 25px 0px' }}
            >
              {
                'Link to other Sites: Our Services may contain links to other Sites that are not operated by us. If you click on a third party link, you will be directed to that third party’s Site. We strongly advise you to review the Privacy Policy of every Site you visit. We have no control over and assume no responsibility for the content, privacy policies or practices of any third party Sites or services.'
              }
            </Grid>
            <Grid className={classes.header}>
              Information within our Corporate Group or in Connection with a
              Sale, Merger, or Other Business Transfer
            </Grid>
            <Grid
              className={classes.about_content}
              style={{ margin: '0px 0px 25px 0px' }}
            >
              {
                'We may share your information with a parent, subsidiary, or other affiliate of our corporate group. We may share your information in connection with a substantial corporate transaction, such as the sale of a Site, a merger, consolidation, asset sale, or in the unlikely event of bankruptcy.'
              }
            </Grid>
            <Grid className={classes.header}>
              How long do we store your Information
            </Grid>
            <Grid
              className={classes.about_content}
              style={{ margin: '0px 0px 25px 0px' }}
            >
              {
                'We will only keep your information for as long as necessary to carry out our obligations to you or for as long as we are required by law. We cannot remove your information when there is a legal storage requirement, such as book-keeping rules or when there are other legal grounds to keep the information, such as an ongoing contractual relationship, or for accounting purposes, for example, where you have bought a subscription or services. If we no longer need your data, we will delete it or make it anonymous by removing all details that identify you. If we have asked for your permission to process your personal data and we have no other lawful grounds to continue with that processing, and you withdraw your permission, we will delete your personal data.'
              }
            </Grid>
            <Grid className={classes.header}>Account Protection</Grid>
            <Grid
              className={classes.about_content}
              style={{ margin: '0px 0px 25px 0px' }}
            >
              {
                'Your password is the key to your account / profile. You shall be solely responsible for all the activities happening under your username and you shall be solely responsible for keeping your password secure. Do not disclose your password to anyone. If you share your password or your personal information with others, you shall be solely responsible for all actions taken under your username and you may lose substantial control over your personal information and may be subject to legally binding actions taken on your behalf. Therefore, if your password has been compromised for any reason, you should immediately change your password.'
              }
            </Grid>
            <Grid className={classes.header}>
              Children’s Personal Information
            </Grid>
            <Grid
              className={classes.about_content}
              style={{ margin: '0px 0px 25px 0px' }}
            >
              {
                'We do not aim any of our products or services directly at children under the age of eighteen (18) and we do not knowingly collect personal information about children under the age of eighteen (18). If you are under the age of eighteen (18) or the age of majority in your local jurisdiction, you must use the Site under the supervision of your parent, legal guardian or responsible adult.'
              }
            </Grid>
            <Grid className={classes.header}>Security</Grid>
            <Grid
              className={classes.about_content}
              style={{ margin: '0px 0px 25px 0px' }}
            >
              {
                'The security of your personal information is important to us. When you enter your personal information, we treat the data as an asset that must be protected and use tools (encryption, passwords, physical security, etc.) to protect your personal information against unauthorized access and disclosure. However, no method of transmission over the Internet, or method of electronic storage, is 100 percent (100%) secure, therefore, while we strive to use commercially acceptable means to protect your personal information, we cannot guarantee its absolute security nor can we guarantee that third parties shall not unlawfully intercept or access transmissions or private communications, and that other users may abuse or misuse your personal information that you provide. Therefore, although we work hard to protect your information, we do not promise, and you should not expect, that your personal information or private communications will always remain private. Please note that information collected by third parties may not have the same security protections as information you submit to us, and we are not responsible for protecting the security of such information.'
              }
            </Grid>
            <Grid className={classes.header}>Links to Other Sites</Grid>
            <Grid className={classes.about_content}>
              {
                'The Site contains links to other Sites that are not owned or controlled by us. Please be aware that we and/or the Site are not responsible for the privacy practices of such other websites.'
              }
            </Grid>
            <Grid
              className={classes.about_content}
              style={{ margin: '15px 0px 0px 0px' }}
            >
              {
                'We encourage you to be aware when you leave our Site and to read the privacy statements of each and every Website that collects personally identifiable information.'
              }
            </Grid>
            <Grid
              className={classes.about_content}
              style={{ margin: '15px 0px 25px 0px' }}
            >
              {
                'This privacy statement applies only to information collected by the Site or to our other related Sites provided it appears at the footer of the page therein. It does not apply to third party advertisements which appear on our Sites and we suggest you read the privacy statements of such advertisers.'
              }
            </Grid>
            <Grid className={classes.header}>Contact Us</Grid>
            <Grid
              className={classes.about_content}
              style={{ margin: '0px 0px 25px 0px' }}
            >
              {
                'All questions, comments and requests regarding this policy should be addressed to:'
              }
              <br />
              <strong>Mailing Address: </strong>
              {
                'Hindustan Media Ventures Limited, Attn: Legal Department, Hindustan Times House, 18-20, Second Floor, Kasturba Gandhi Marg, New Delhi – 110 001, India'
              }
              <br />
              <strong>Email Address: </strong>
              <a href="mailto:contactottplay@htmedialabs.com">
                {'contactottplay@htmedialabs.com'}
              </a>
            </Grid>
          </Grid>
          <Grid item xs={12} md={4}></Grid>
        </Grid>
        <Grid sm={1} lg={2} item></Grid>
      </Grid>
    </div>
  );
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    height: '100%',
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  movie_option_container: {
    padding: '0px !important',
  },
  about_content: {
    opacity: '0.7',
    lineHeight: '1.5',
    textAlign: 'justify',
    color: 'white',
    fontSize: 'clamp(12px, 1.1vw, 16px)',
    '& ul': {
      paddingLeft: 25,
    },
    '& a': {
      color: '#FF4376',
      textDecoration: 'none',
    },
  },
  div_left: {
    padding: '3rem 8px 0px 30px !important',
  },
  header: {
    textAlign: 'left',
    color: 'white',
    marginBottom: '4px',
    fontSize: 'clamp(16px, 2vw, 24px)',
  },
  movie_container: {
    margin: 0,
  },
  [theme.breakpoints.down('xs')]: {
    div_left: {
      padding: '2rem 8px 0px 30px !important',
    },
  },
}));
