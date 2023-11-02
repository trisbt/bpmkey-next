import React from 'react'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import { Typography } from '@mui/material'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import Link from 'next/link'
const page = () => {
    return (
        <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems:'center'}}>
            <Grid container item xs={10} justifyContent='center' padding='1em'>
                <Grid container item justifyContent='center' textAlign='center'  >
                    <Grid item >
                        <Typography variant='h3' paddingBottom='.5em'>
                            Privacy Policy for BPMKey.com
                        </Typography>
                        <Typography variant='h5' textAlign='center' paddingBottom='.5em'>
                            Effective date: 11/2/2023
                        </Typography>
                    </Grid>

                    <Grid item >
                        <Typography variant='h7' >
                            This privacy policy ("Policy") describes how BPMKey.com ("Company", "we", "our", or "us") collects, uses, and shares personal information of users of this website, bpmkey.com (the "Site"). Please read this Policy carefully to understand our policies and practices regarding your information and how we will treat it. By using our Site, you agree to this Policy. If you do not agree with our policies and practices, your choice is not to use our Site.
                        </Typography>
                    </Grid>
                </Grid>

                <Grid container item justifyContent='flex-start' >


                    <Grid item paddingTop='1em' >
                        <Typography variant='h5' fontWeight='bold' paddingBottom='.5em'>
                            1. Information Collection and Use
                        </Typography>
                    </Grid>

                    <Grid item >
                        <Typography variant='h7' paddingBottom='.5em'>
                            When you use our Service, we may ask you to provide us with certain personally identifiable information that can be used to contact or identify you. Personally identifiable information may include, but is not limited to:
                        </Typography>

                        <List disablePadding>
                            <ListItem component="li">
                                <Typography variant='h7'>
                                    - Email Address
                                </Typography>
                            </ListItem>
                            <ListItem component="li">
                                <Typography variant='h7' >
                                    - First and Last Name
                                </Typography>
                            </ListItem>
                        </List>
                        <Typography variant='h7' paddingBottom='.5em'>
                            We use this information to provide and improve our Service and to communicate with you about your account, updates, and promotional materials.
                        </Typography>
                    </Grid>

                    <Grid item paddingTop='1em' >
                        <Typography variant='h5' fontWeight='bold' paddingBottom='.5em'>
                            2. Usage Data
                        </Typography>
                        <Typography variant='h7' paddingBottom='.5em'>
                            We may also collect information about how our Service is accessed and used. This usage data may include information such as your computer's Internet Protocol address (e.g., IP address), browser type, browser version, the pages of our Service that you visit, the time and date of your visit, the time spent on those pages, unique device identifiers, and other diagnostic data.
                        </Typography>
                    </Grid>

                    <Grid item paddingTop='1em' >
                        <Typography variant='h5' fontWeight='bold' paddingBottom='.5em'>
                            3. Tracking & Cookies Data
                        </Typography>
                        <Typography variant='h7' paddingBottom='.5em'>
                            We use cookies and similar tracking technologies to track the activity on our Service and hold certain information. Cookies are files with a small amount of data, which may include an anonymous unique identifier. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our Service.
                        </Typography>
                    </Grid>

                    <Grid item paddingTop='1em' >
                        <Typography variant='h5' fontWeight='bold' paddingBottom='.5em'>
                            4. Use of Data
                        </Typography>
                        <Typography variant='h7' paddingBottom='.5em'>
                            We use the collected data for various purposes:
                        </Typography>
                    </Grid>

                    <Grid item paddingTop='1em'>
                        <Typography variant='h7' paddingBottom='.5em'>
                            <span style={{ fontWeight: 'bold' }}>Personal Information</span> When you use our Service, we may ask you to provide us with certain personally identifiable information that can be used to contact or identify you. Personally identifiable information may include, but is not limited to:
                        </Typography>

                        <List disablePadding>
                            <ListItem component="li">
                                <Typography variant='h7'>
                                    - To provide and maintain our Service
                                </Typography>
                            </ListItem>
                            <ListItem component="li">
                                <Typography variant='h7' >
                                    - To notify you about changes to our Service
                                </Typography>
                            </ListItem>
                            <ListItem component="li">
                                <Typography variant='h7'>
                                    - To allow you to participate in interactive features of our Service when you choose to do so
                                </Typography>
                            </ListItem>
                            <ListItem component="li">
                                <Typography variant='h7' >
                                    - To provide customer care and support
                                </Typography>
                            </ListItem>
                            <ListItem component="li">
                                <Typography variant='h7'>
                                    - To provide analysis or valuable information so that we can improve our Service
                                </Typography>
                            </ListItem>
                            <ListItem component="li">
                                <Typography variant='h7' >
                                    - To monitor the usage of our Service
                                </Typography>
                            </ListItem>
                            <ListItem component="li">
                                <Typography variant='h7' >
                                    - To detect, prevent and address technical issues
                                </Typography>
                            </ListItem>
                        </List>

                    </Grid>

                    <Grid item paddingTop='1em' >
                        <Typography variant='h5' fontWeight='bold' paddingBottom='.5em'>
                            5. Google Analytics
                        </Typography>
                        <Typography variant='h7' paddingBottom='.5em'>
                            We use Google Analytics to track and analyze the usage of our Service. Google Analytics is a web analytics service offered by Google that tracks and reports website traffic. Google uses the data collected to track and monitor the use of our Service. This data is shared with other Google services. Google may use the collected data to contextualize and personalize the ads of its own advertising network.
                        </Typography>
                        <Typography variant='h7' paddingBottom='.5em'>
                            For more information on the privacy practices of Google, please visit the Google Privacy & Terms web page: <Link href='https://policies.google.com/privacy' style={{ fontWeight: 'bold', }}>https://policies.google.com/privacy</Link>
                        </Typography>
                    </Grid>

                    <Grid item paddingTop='1em' >
                        <Typography variant='h5' fontWeight='bold' paddingBottom='.5em'>
                            6. Advertising
                        </Typography>
                        <Typography variant='h7' paddingBottom='.5em'>
                            This site displays advertisements through several partners, including Google AdSense. Google AdSense will collect and use certain data for advertising purposes.
                        </Typography>
                        <Typography variant='h7' paddingBottom='.5em'>
                            For more information on the privacy practices of Google, please visit the Google Privacy & Terms web page: <Link href='https://policies.google.com/privacy' style={{ fontWeight: 'bold', }}>https://policies.google.com/privacy</Link>
                        </Typography>
                    </Grid>

                    <Grid item paddingTop='1em' >
                        <Typography variant='h5' fontWeight='bold' paddingBottom='.5em'>
                            7. Disclosure of Data
                        </Typography>
                        <Typography variant='h7' paddingBottom='.5em'>
                            We may disclose your personal information in the good faith belief that such action is necessary to:
                        </Typography>
                    </Grid>

                    <Grid item paddingTop='1em'>
                        <Typography variant='h7' paddingBottom='.5em'>
                            <span style={{ fontWeight: 'bold' }}>Personal Information</span> When you use our Service, we may ask you to provide us with certain personally identifiable information that can be used to contact or identify you. Personally identifiable information may include, but is not limited to:
                        </Typography>

                        <List disablePadding>
                            <ListItem component="li">
                                <Typography variant='h7'>
                                    - To comply with a legal obligation
                                </Typography>
                            </ListItem>
                            <ListItem component="li">
                                <Typography variant='h7' >
                                    - To protect and defend the rights or property of BpmKey
                                </Typography>
                            </ListItem>
                            <ListItem component="li">
                                <Typography variant='h7'>
                                    - To prevent or investigate possible wrongdoing in connection with the Service
                                </Typography>
                            </ListItem>
                            <ListItem component="li">
                                <Typography variant='h7' >
                                    - To protect the personal safety of users of the Service or the public
                                </Typography>
                            </ListItem>
                            <ListItem component="li">
                                <Typography variant='h7'>
                                    - To protect against legal liability
                                </Typography>
                            </ListItem>
                        </List>

                    </Grid>

                    <Grid item paddingTop='1em' >
                        <Typography variant='h5' fontWeight='bold' paddingBottom='.5em'>
                            8. Security of Data
                        </Typography>
                        <Typography variant='h7' paddingBottom='.5em'>
                            The security of your data is important to us, but remember that no method of transmission over the Internet or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your personal data, we cannot guarantee its absolute security.
                        </Typography>
                    </Grid>

                    <Grid item paddingTop='1em' >
                        <Typography variant='h5' fontWeight='bold' paddingBottom='.5em'>
                            9. Retention of Data
                        </Typography>
                        <Typography variant='h7' paddingBottom='.5em'>
                            We will retain your personal information only for as long as is necessary for the purposes set out in this Privacy Policy. We will retain and use your personal information to the extent necessary to comply with our legal obligations (for example, if we are required to retain your data to comply with applicable laws), resolve disputes, and enforce our legal agreements and policies.                    </Typography>
                    </Grid>

                    <Grid item paddingTop='1em' >
                        <Typography variant='h5' fontWeight='bold' paddingBottom='.5em'>
                            10. Transfer of Data
                        </Typography>
                        <Typography variant='h7' paddingBottom='.5em'>
                            Your information, including personal data, may be transferred to and maintained on computers located outside of your state, province, country, or other governmental jurisdiction where the data protection laws may differ from those of your jurisdiction.
                        </Typography>
                        <Typography variant='h7' paddingBottom='.5em'>
                            If you are located outside the United States of America and choose to provide information to us, please note that we transfer the data, including personal data, to the United States of America and process it there.                    </Typography>
                        <Typography variant='h7' paddingBottom='.5em'>
                            Your consent to this Privacy Policy followed by your submission of such information represents your agreement to that transfer.
                        </Typography>
                    </Grid>

                    <Grid item paddingTop='1em' >
                        <Typography variant='h5' fontWeight='bold' paddingBottom='.5em'>
                            11. Links to Other Sites
                        </Typography>
                        <Typography variant='h7' paddingBottom='.5em'>
                            Our Service may contain links to other sites that are not operated by us. If you click on a third-party link, you will be directed to that third party's site. We strongly advise you to review the Privacy Policy of every site you visit.
                        </Typography>

                        <Typography variant='h7' paddingBottom='.5em'>
                            We have no control over and assume no responsibility for the content, privacy policies, or practices of any third-party sites or services.
                        </Typography>
                    </Grid>

                    <Grid item paddingTop='1em' >
                        <Typography variant='h5' fontWeight='bold' paddingBottom='.5em'>
                            12. Children's Privacy
                        </Typography>
                        <Typography variant='h7' paddingBottom='.5em'>
                            Our Service does not address anyone under the age of 13 ("Children"). We do not knowingly collect personally identifiable information from anyone under the age of 13. If you are a parent or guardian and you are aware that your child has provided us with personal data, please contact us. If we become aware that we have collected personal data from children without verification of parental consent, we take steps to remove that information from our servers.
                        </Typography>
                    </Grid>

                    <Grid item paddingTop='1em' >
                        <Typography variant='h5' fontWeight='bold' paddingBottom='.5em'>
                            13. Changes to This Privacy Policy
                        </Typography>
                        <Typography variant='h7' paddingBottom='.5em'>
                            We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.
                        </Typography>
                        <Typography variant='h7' paddingBottom='.5em'>
                            We will let you know via email and/or a prominent notice on our Service, prior to the change becoming effective and update the "Last updated" date at the top of this Privacy Policy.
                        </Typography>
                        <Typography variant='h7' paddingBottom='.5em'>
                            You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page.
                        </Typography>
                    </Grid>

                    <Grid item paddingTop='1em' >
                        <Typography variant='h5' fontWeight='bold' paddingBottom='.5em'>
                            14. Contact Us
                        </Typography>
                        <Typography variant='h7' paddingBottom='.5em'>
                            If you have any questions about this Privacy Policy, please contact us:
                        </Typography>
                    </Grid>

                </Grid>
            </Grid>
        </div>
    )
}

export default page