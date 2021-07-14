import * as React from 'react';

import { Grid, Hidden } from '@material-ui/core';

import Helmet from 'react-helmet';
import SEO from '../../components/Seo';
import { Theme } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles';

export default function TermOfUse(props) {
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
              Terms Of Use
            </Grid>
            <Grid
              className={classes.about_content}
              style={{ margin: '5px 0px 15px 0px' }}
            >
              {
                'This Terms and Conditions (this “Agreement or Terms”) shall governs your use of products including services from Hindustan Media Ventures Limited, OTTplay platform (“HMVL”, “or “we” or “us”) as offered from time to time, unless other terms and conditions expressly govern. The User(s) of the OTTplay website ("User"/ “You”) must carefully read and agree to the following Terms including any future amendments before using the website. The expressions “You” “Your” or “User(s)” refers to any person who accesses or uses the website for any purpose (commercial or non-commercial).'
              }
            </Grid>
            <Grid className={classes.about_content}>
              {
                'These Terms govern User’s access to and use of the website, mobile application or other platform where these Terms are posted (“Site”). By using or connecting to the Site through a third party or by accessing, browsing, or using the Site in any manner, User(s) agree to be bound to these Terms and our Privacy Policy, whether or not User registered/member with us. We/Site/HMVL reserves the right to deny access to any person who violates these Terms. If You do not agree to or do not wish to be bound by the Agreement, You may not access or otherwise use the website in any manner.'
              }
            </Grid>
            <Grid
              className={classes.about_content}
              style={{ margin: '15px 0px 25px 0px' }}
            >
              {
                'We will do our utmost to ensure that availability of the Site is uninterrupted and that transmission is error-free. However, due to the nature of the Internet, this cannot be guaranteed. Also, User(s) access to the Site may also be occasionally suspended or restricted to allow for repairs, maintenance, or services at any time without prior notice. We will attempt to limit the frequency and duration of any such suspension or restriction.'
              }
            </Grid>
            <Grid className={classes.header}>Eligibility</Grid>
            <Grid className={classes.about_content}>
              {
                'User(s) represent and warrant that they have the right to avail or use the Product provided by HMVL, including but limited to the website or any other services which may be provided by HMVL in relation to the use of the Site ("Product "). HMVL Product can only be availed by those individuals, which are authorised under applicable law to form legally binding agreements. User(s) may use this Web Site and/or Products herein solely for personal purposes. Any commercial gain from the use of the Site and/or any the Product herein is prohibited and punishable under applicable law.'
              }
            </Grid>
            <Grid
              style={{ margin: '15px 0px 0px 0px' }}
              className={classes.about_content}
            >
              {
                'The User(s) shall do its own due diligence before entering into any transaction or purchase of any Product on the website. HMVL Product shall not available to User(s) whose accounts have been temporarily or indefinitely suspended by HMVL.'
              }
            </Grid>
            <Grid
              style={{ margin: '15px 0px 0px 0px' }}
              className={classes.about_content}
            >
              {
                'To become a registered User(s) of the Web Site a proper procedure has been made available on the Web Site which is for the convenience of User(s) so that they can easily use the website.'
              }
            </Grid>
            <Grid
              style={{ margin: '15px 0px 0px 0px' }}
              className={classes.about_content}
            >
              {
                'User(s) can become registered User(s) by filling an on-line registration form on the Web Site by providing the required information (including name, contact information, etc.). HMVL will establish an account ("Account") for the User(s) upon successful registration and will assign a user alias ("User ID") and password ("Password") for log-in access to the User(s)’s Account.'
              }
            </Grid>
            <Grid
              style={{ margin: '15px 0px 0px 0px' }}
              className={classes.about_content}
            >
              {
                'User(s) registering on the Web Site on behalf of another User represent and warrant that: (a) they have the requisite authority to bind such User under this Agreement all information provided to HMVL during the registration process is true, accurate, current and complete.'
              }
            </Grid>
            <Grid
              style={{ margin: '15px 0px 25px 0px' }}
              className={classes.about_content}
            >
              {
                'User(s) agree that by registering on the Site or website, they consent to the inclusion of their personal data in HMVL on-line database and authorize HMVL to share such information with other User(s). HMVL may refuse registration and deny participation and associated User ID and Password to any User(s) for whatever reason. HMVL may suspend or terminate a registered membership at any time without any prior notification in interest of HMVL or general interest of its User(s) without assigning any reason thereof and there shall arise no further liability on HMVL of whatsoever nature due to the suspension or termination of the User account.'
              }
            </Grid>
            <Grid className={classes.header}>Product</Grid>
            <Grid className={classes.about_content}>
              {
                'The term “Product" shall mean and refer to the HMVL Product, for the Users to enroll.'
              }
            </Grid>
            <Grid
              style={{ margin: '15px 0px 25px 0px' }}
              className={classes.about_content}
            >
              {
                'The User is required to enroll and participate in the Product for the use of Product. We may change, suspend or discontinue any aspect of Product at any time. We may also impose or limit any feature or restrict access to parts or all of the Product without notice or liability.  We reserve the right to modify the Product at any time, without any prior approval or consent from the User(s).'
              }
            </Grid>
            <Grid className={classes.header}>Content</Grid>
            <Grid className={classes.about_content}>
              {
                'All materials or Products published or available (including, but not limited to text, photographs, graphics, images, illustrations, designs, audio clips, video clips, “look and feel,” metadata, data, or compilations, arrangement & assembly, all also known as the "Content") are protected by copyright, property and owned or controlled by us or the party credited as the provider of the Content. User shall abide by all additional copyright notices, information, or restrictions contained in any Content accessed through the Products. We grant User a limited, non-exclusive, non-transferable right to access the Product and Content. Except for the foregoing, no right, title or interest shall be transferred to User.'
              }
            </Grid>
            <Grid
              style={{ margin: '15px 0px 25px 0px' }}
              className={classes.about_content}
            >
              {
                'User must not copy, sell, reproduce, republish, upload, post, modify or modify the said Content, transmit or distribute such Content in any way, including by e-mail or other electronic means and whether directly or indirectly and User must not assist any other person to do so. Without the prior written consent of the owner, modification of the Content and or use of the Content on any other website or networked computer environment or use of the Content for any purpose other than personal, non-commercial use is a violation of the copyrights, trademarks and other proprietary rights, and is prohibited. Any use for which User receive any remuneration, whether in money or otherwise, is a commercial use for the purposes of this clause. The use of the Content on any other website or in a networked computer environment for any purpose is prohibited. User shall not copy or adapt our code that is created to generate any Content or the pages making up any of its website which is also protected by our copyright.'
              }
            </Grid>
            <Grid className={classes.header}>Privacy</Grid>
            <Grid
              className={classes.about_content}
              style={{ margin: '0px 0px 25px 0px' }}
            >
              {
                'By using the HMVL Product, User hereby agrees and indicates that he or she has understand the disclosure practices described in the Privacy Policy. Personal information supplied by User(s) during the use of the Web Site is governed by HMVL Privacy Policy. Notwithstanding User’s registration with National Do Not Call Registry (In Fully or Partly blocked category under National Customer Preference Register set up under Telecom Regulatory Authority of India), User  hereby expresses his or her  interest and accord its willful consent to receive communication (including commercial communication) in relation to Products provided by us. User further confirms that any communication, as mentioned hereinabove, shall not be construed as Unsolicited Commercial Communication under the TRAI guidelines and User has specifically opted to receive communication in this regard on the telephone or mobile number provided by him or her.'
              }
            </Grid>
            <Grid className={classes.header}>General Terms</Grid>
            <Grid className={classes.header}>
              Rights and Duties of the User(s)
            </Grid>
            <Grid
              className={classes.about_content}
              style={{ margin: '0px 0px 25px 0px' }}
            >
              <ul>
                <li>
                  {
                    'User shall be solely responsible for maintaining the confidentiality of their account, user name and passwords and for restricting access to its computer to prevent unauthorised access to the account. User shall be solely responsible for all activities happening under its Username whether authorized or not. User agrees to immediately notify us in case of any unauthorized use of its  Account and Password or User has any reason to believe that the password has become known to anyone else.'
                  }
                </li>
                <li>
                  {
                    'User shall be responsible for use of the Site, and for any consequences arising thereof. The User agrees to use the Site in accordance with all laws, rules and regulations, as applicable from time to time, including without limitation IT laws and laws relating to unfair competition, antidiscrimination, false advertising and defamation. The User further agrees that the usage of Site by the User shall not violate any third party rights including but not limited to Intellectual Property Rights, Right of Privacy and Right of Publicity. In addition to above, the User will not use the Site in order to transmit, distribute, store or destroy material, including without limitation Content, that is defamatory, obscene, threatening, abusive or hateful. Any violation of any of the foregoing, including the terms and conditions mentioned herein shall result in immediate termination of this Terms and Conditions. Moreover, we reserve the right to seek damages from any such User to the extent permitted by law.'
                  }
                </li>
                <li>
                  {
                    'User is also prohibited from violating or attempting to violate the security of Site, including, without limitation the following activities'
                  }
                </li>
                <ul>
                  <li>
                    {
                      'Accessing data not intended for such User or logging into a server or account which the User is not authorized to access.'
                    }
                  </li>
                  <li>
                    {
                      'Attempting to probe, scan or test the vulnerability of a system or network or to breach security or authentication measures without proper authorization.'
                    }
                  </li>
                  <li>
                    {
                      'Attempting to interfere with access of Product to any User, host or network, including, without limitation, via means of submitting a virus to web-Site, overloading, "flooding", "spamming", "mailbombing" or "crashing".'
                    }
                  </li>
                  <li>
                    {
                      'Violations of system or network security may result in civil or criminal liability. We will investigate occurrences which may involve such violations and may involve, and cooperate with, law enforcement authorities in prosecuting the User who are involved in such violations.'
                    }
                  </li>
                </ul>
                <li>
                  {
                    'We specifically prohibit the posting of any User(s) content which provides the following and/or has the effect of the following; The list below is for illustration only and is not a complete list of all prohibited User Content. The User Content:'
                  }
                </li>
                <ul>
                  <li>
                    {
                      'Is implicitly or explicitly offensive, such as User Content that engages in, endorses or promotes racism, bigotry, hatred or physical harm of any kind against any group or individual.'
                    }
                  </li>
                  <li>
                    {
                      'Harasses, incites harassment or advocates harrassment of another group or individual.'
                    }
                  </li>
                  <li>
                    {
                      'Involves the transmission of "junk mail", "chain letters," or unsolicited mass mailing or "spamming".'
                    }
                  </li>
                  <li>
                    {
                      'Promotes or endorses false or misleading information or illegal activities or conduct that is abusive, threatening, obscene, defamatory, libelous or which amounts to contempt of any judicial authority.'
                    }
                  </li>
                  <li>
                    {
                      'Contains restricted or password only access pages, or hidden pages or images.'
                    }
                  </li>
                  <li>
                    {
                      'Displays or links to obscene, indecent pornographic, material of any kind.'
                    }
                  </li>
                  <li>
                    {
                      'Provides instructional information about illegal activities or other activities prohibited by these Terms, including without limitation, provides or creates computer viruses or pirating any media; and solicits passwords or personal identifying information from other Users.'
                    }
                  </li>
                </ul>
                <li>
                  {
                    'We reserves the right without prior notice to access, read preserve and/or disclose the personal information of the User if the same is required'
                  }
                </li>
                <ul>
                  <li>
                    {
                      'In order to comply with any court judgment/decree/order/directive.'
                    }
                  </li>
                  <li>{'By any legal/government authority.'}</li>
                  <li>{'By applicable law.'}</li>
                  <li>
                    {
                      'By professional/legal advisers, directors, employees/agents/representatives of HMVL in connection with this Agreement or otherwise.'
                    }
                  </li>
                  <li>
                    {
                      'For investigating potential violations of the terms herein or applicable national & international laws.'
                    }
                  </li>
                  <li>
                    {
                      'For investigating deliberate damage to the Products or its legitimate operation.'
                    }
                  </li>
                  <li>{'For responding to support requests or'}</li>
                  <li>
                    {
                      'For protecting the rights, property or safety of HMVL and/or its Directors, employees and the general public at large.'
                    }
                  </li>
                </ul>
                <li>
                  {
                    'We reserves the right to store and process the personal information provided by the User in India or any other country where HMVL or its agents/representatives/group companies maintain storage and processing facilities and the User by using the Product herein consents to any such transfer of information outside India without prior notice.'
                  }
                </li>
                <li>
                  {
                    'We reserve the right to create limits/restrictions on use of the Product at its sole discretion without assigning any reason whatsoever and without giving any prior notices.'
                  }
                </li>
                <li>
                  {
                    'We do not warrant that web-Site will operate without any technical error and is free from any computer viruses or other harmful mechanisms. We shall not be liable in any manner whatsoever for any consequences, claims, damages, costs etc. arising out of any of the above-said reasons or due to any force majeure factors and/or due to any reasons beyond the control of HMVL. We to the fullest extent permitted by law, disclaims all warranties, whether express or implied, including the warranty of merchantability, fitness for particular purpose and non-infringement. We makes no warranties about the accuracy, reliability, completeness, or timeliness of the content, services, software, text, graphics, and links used on the Site.'
                  }
                </li>
                <li>
                  {
                    'HMVL’s maximum liability arising out of or in connection with the Site, regardless of the cause of action (whether in contract, tort, breach of warranty or otherwise), will not exceed the amount paid towards the enrolment by the User.'
                  }
                </li>
                <li>
                  {
                    'We shall not be responsible or liable in any manner whatsoever for the exercise or non-exercise of its rights herein.'
                  }
                </li>
                <li>
                  {
                    'All HMVL trade names, trademarks, logos, domain names including without limitation, Hindustan, HMVL, etc. and all content on OTTplay, are the exclusive property of HMVL and the User shall not use the same without the prior written permission of HMVL.'
                  }
                </li>
                <li>
                  {`We reserves the right in its sole discretion to investigate and take legal action against anyone who engages in any illegal or prohibited conduct or otherwise violates these Terms of Use, including without limitation, removing the User Content from the Site and/or terminating the offending User's ability to access the Site and/or use HMVL Product. We may take any other action with respect to User Content or User actions that it deems necessary or appropriate in its sole discretion if it believes it may create liability for us or may cause us to lose (in whole or in part) the services of its ISPs or other suppliers.`}
                </li>
                <li>
                  {`We reserves the right, in its sole discretion, to amend or revise these terms & conditions at any point of time, without prior notice and the User agrees to be bound by such amendments or revisions. It is therefore suggested that the User must periodically review the updated version of these terms & conditions.`}
                </li>
                <li>
                  {`User shall ensure that the details provided to us are correct and complete. User should inform us immediately of any changes to the information that was provided when registering on Site. User can access and update much of the information which was provided to us. Users agree and acknowledge that User will use its account on the Site to purchase products only for its personal use and not for business purposes. We reserve the right to refuse access to the Site, terminate accounts, remove or edit content at any time without notice to User.`}
                </li>
              </ul>
            </Grid>
            <Grid className={classes.header}>
              Disclaimers of Warranties and Limitation of Liability
            </Grid>
            <Grid className={classes.about_content}>
              {
                'USER HEREBY AGREE THAT YOUR ACCESS TO, AND USE OF, THE SERVICES, PRODUCTS, AVAILABLE IS ON AN "AS-IS", "AS AVAILABLE" BASIS AND HT SPECIFICALLY DISCLAIM ANY REPRESENTATIONS OR WARRANTIES, EXPRESS OR IMPLIED, INCLUDING, WITHOUT LIMITATION, ANY REPRESENTATIONS OR WARRANTIES OF MERCHANTABILITY OR FITNESS FOR A PARTICULAR PURPOSE.'
              }
            </Grid>
            <Grid
              className={classes.about_content}
              style={{ margin: '15px 0px 0px 0px' }}
            >
              {
                'Without prejudice to the forgoing paragraph, we do not warrant that:'
              }
            </Grid>
            <Grid
              className={classes.about_content}
              style={{ margin: '15px 0px 0px 0px' }}
            >
              {
                'This Site will be constantly available or available at all; or the information on this Site is complete, true, accurate or non-misleading.'
              }
            </Grid>
            <Grid
              className={classes.about_content}
              style={{ margin: '15px 0px 0px 0px' }}
            >
              {
                'We will not be liable to User in any way or in relation to the Contents of, or use of, or otherwise in connection with, the Site. We does not warrant that this Site; information, Content, materials, Product (including software) or Services included on or otherwise made available to User through the Site; their servers; or electronic communication sent from us are free of viruses or other harmful components. All the Contents of this Site are only for general information or use. They do not constitute advice and should not be relied upon in making (or refraining from making) any decision.'
              }
            </Grid>
            <Grid
              className={classes.about_content}
              style={{ margin: '15px 0px 0px 0px' }}
            >
              {
                'The information from or through this Site is provided on "AS IS" basis, and all warranties, expressed or implied of any kind, regarding any matter pertaining to any goods, Service or channel, including without limitation, the implied warranties of merchantability, fitness for a particular purpose, and non-infringement are disclaimed and excluded. Certain links on the Site lead to resources located on servers maintained by third parties over whom we have no control or connection, business or otherwise as these Sites are external to us. User hereby agrees and understands that by visiting such Sites User is beyond the HT’s website. We therefore neither endorses nor offers any judgment or warranty and accepts no responsibility or liability for the authenticity/availability of any of the goods/Services/or for any damage, loss or harm, direct or consequential or any violation of local or international laws that may be incurred by your visit and/or transaction/s on these Sites.'
              }
            </Grid>
            <Grid
              className={classes.about_content}
              style={{ margin: '15px 0px 0px 0px' }}
            >
              {
                'HINDUSTAN MEDIA VENTURES LIMITED AND ITS AFFILIATES AND THEIR RESPECTIVE, DIRECTORS, OFFICERS, EMPLOYEES, CONTENT PROVIDERS, AGENTS ("THE HT PARTIES") WILL NOT BE LIABLE (JOINTLY OR SEVERALLY) TO USER OR ANY OTHER PERSON AS A RESULT OF ACCESS OR USE OF THE PRODUCTS OR SERVICES OR CONTENT, FOR INDIRECT, CONSEQUENTIAL, SPECIAL, INCIDENTAL, PUNITIVE, OR EXEMPLARY DAMAGES, INCLUDING, WITHOUT LIMITATION, LOST PROFITS, LOST SAVINGS AND LOST REVENUES (COLLECTIVELY, THE "EXCLUDED DAMAGES"), WHETHER OR NOT CHARACTERIZED IN NEGLIGENCE, TORT, CONTRACT, OR OTHER THEORY OF LIABILITY, EVEN IF ANY OF THE HT PARTIES HAVE BEEN ADVISED OF THE POSSIBILITY OF OR COULD HAVE FORESEEN ANY OF THE EXCLUDED DAMAGES, AND IRRESPECTIVE OF ANY FAILURE OF AN ESSENTIAL PURPOSE OF A LIMITED REMEDY.'
              }
            </Grid>
            <Grid
              className={classes.about_content}
              style={{ margin: '15px 0px 25px 0px' }}
            >
              <strong>Indemnity: </strong>
              {
                'User shall indemnify and hold harmless HMVL its owner, affiliates, subsidiaries, group companies (as applicable) and their respective officers, directors, agents, and employees, from any claim or demand, or actions including reasonable attorneys fees, made by any third party or penalty imposed due to or arising out of User  breach of this Terms of Use, Privacy Policy and other Policies, or violation of any law, rules or regulations or the rights (including infringement of intellectual property rights) of a third party.'
              }
            </Grid>
            <Grid className={classes.header}>Communications</Grid>
            <Grid className={classes.about_content}>
              {
                'When User visits the Site, User is communicating with us electronically. User will be required to provide a valid phone number or e-mail while placing an order with us. We may communicate with User by e-mail, SMS, phone call or by any other mode of communication. For contractual purposes, User consent to receive communications (including transactional, promotional and/or commercial messages), from us with respect to User use of the Site and/or User order placed on the Site.'
              }
            </Grid>
            <Grid
              className={classes.about_content}
              style={{ margin: '15px 0px 0px 0px' }}
            >
              <strong>Children: </strong>
              {
                'Use of Site is available only to Users or persons who can form a legally binding contract under the Indian Contract Act, 1872. If you are a minor i.e. under the age of 18 years, you may use Site only with the involvement of a parent or guardian.'
              }
            </Grid>
            <Grid
              className={classes.about_content}
              style={{ margin: '15px 0px 25px 0px' }}
            >
              <strong>Applicable Law: </strong>
              {
                'Terms of Use and all the disputes arising between the User and HMVL shall be governed by and interpreted and construed in accordance with the laws of India. The place of jurisdiction shall be exclusively in New Delhi.'
              }
            </Grid>
            <Grid className={classes.header}>MISCELLANEOUS</Grid>
            <Grid
              className={classes.about_content}
              style={{ margin: '0px 0px 25px 0px' }}
            >
              <ul>
                <li>
                  {
                    'Headings for any section of the Agreement are for reference purposes only and in no way define, limit, construe or describe the scope or extent of such section.'
                  }
                </li>
                <li>
                  {
                    'HMVL’s failure to enforce any right or failure to act with respect to any breach by a User(s) under the Agreement and/or Privacy Policy will not be deemed to be a waiver of that right or HMVL waiver of the right to act with respect with subsequent or similar breaches.'
                  }
                </li>
                <li>
                  {
                    'HMVL shall have the right to assign its obligations and duties in this Agreement and in any other agreement relating HMVL Product to any person or entity.'
                  }
                </li>
                <li>
                  {
                    'If any provision of this Agreement is held to be invalid or unenforceable, such provision shall be struck out and the remaining provisions of the Agreement shall be enforced.'
                  }
                </li>
                <li>
                  {
                    'Any complaints or concerns with regards to Product or any breach of this Agreement or Privacy Policy can addressed to contactottplay@htmedialabs.com.'
                  }
                </li>
                <li>
                  {
                    'The Agreement and the privacy policy constitute the entire agreement between the User(s) and HMVL with respect to access to and use of the Web Site, superseding any prior written or oral agreements in relation to the same subject matter herein.'
                  }
                </li>
              </ul>
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
