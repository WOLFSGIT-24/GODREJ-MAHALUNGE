// Godrej Mahalunge - Privacy Policy
import LegalPage from '@/components/LegalPage';
import { projectSnapshot } from '@/lib/data';

export default function PrivacyPolicyPage() {
  const tel = projectSnapshot.phone;
  return (
    <LegalPage
      title="Privacy Policy"
      updated="9 October 2026"
      intro={
        <p>
          This Privacy Policy explains how the Godrej Mahalunge website collects, uses and protects the personal
          information you share with us when you enquire about Godrej Mahalunge, West Pune, a project by
          Godrej Properties. By using this website and submitting an enquiry, you agree to the practices described below.
        </p>
      }
      sections={[
        {
          heading: 'Information we collect',
          body: (
            <>
              <p>When you submit an enquiry or request a brochure, we collect the details you enter in the form:</p>
              <ul>
                <li>Full name</li>
                <li>Mobile number</li>
                <li>Email address</li>
                <li>City</li>
                <li>Preferred configuration (3 Bed or 4 Bed Residence)</li>
                <li>Budget range</li>
              </ul>
              <p>We also record the date and time of your submission. We do not ask for payment details, identity documents or any sensitive personal information on this website.</p>
            </>
          ),
        },
        {
          heading: 'How we use your information',
          body: (
            <>
              <p>We use the information you provide to:</p>
              <ul>
                <li>Respond to your enquiry and share project details, plans, pricing and availability</li>
                <li>Arrange site visits and follow-up conversations with our sales team</li>
                <li>Contact you by phone call, SMS, WhatsApp or email about Godrej Mahalunge</li>
                <li>Maintain records of enquiries and improve our service</li>
              </ul>
              <p>
                By submitting an enquiry, you authorise Godrej Properties and its representatives to contact you through
                these channels, even if your number is registered on the National Do Not Call (DND/NDNC) registry.
              </p>
            </>
          ),
        },
        {
          heading: 'How your information is processed and shared',
          body: (
            <>
              <p>
                Enquiry details are transmitted securely to our lead-management system and
                shared only with the sales team and authorised channel partners handling your enquiry.
              </p>
              <p>
                We do not sell, rent or trade your personal information. We may disclose it where required by law,
                regulation or a lawful request from a government authority.
              </p>
            </>
          ),
        },
        {
          heading: 'Cookies and third-party services',
          body: (
            <>
              <p>
                This website stores a small setting in your browser so the introductory animation plays only once per
                visit. It also embeds a Google Map to show the project location; Google may set its own cookies when the
                map loads, subject to Google's privacy policy.
              </p>
              <p>You can block or clear cookies through your browser settings; the website will continue to work.</p>
            </>
          ),
        },
        {
          heading: 'Data retention and security',
          body: (
            <p>
              We keep enquiry details only as long as needed to respond to you and for legitimate business and legal
              record-keeping. We use reasonable technical and organisational safeguards, including encrypted (HTTPS)
              transmission, to protect your information. No method of transmission over the internet is completely
              secure, and we cannot guarantee absolute security.
            </p>
          ),
        },
        {
          heading: 'Your choices and rights',
          body: (
            <>
              <p>You may at any time:</p>
              <ul>
                <li>Ask us what personal information we hold about you</li>
                <li>Ask us to correct or update your details</li>
                <li>Ask us to delete your details or stop contacting you</li>
                <li>Withdraw consent for marketing communication</li>
              </ul>
              <p>To make a request, contact us using the details below. We will respond within a reasonable time, in line with applicable Indian law, including the Digital Personal Data Protection Act, 2023.</p>
            </>
          ),
        },
        {
          heading: 'Children',
          body: <p>This website is intended for adults. We do not knowingly collect information from anyone under 18 years of age.</p>,
        },
        {
          heading: 'Changes to this policy',
          body: <p>We may update this Privacy Policy from time to time. The latest version will always be available on this page, with the date of the last update shown at the top.</p>,
        },
        {
          heading: 'Contact us',
          body: (
            <p>
              For any question about this policy or your personal information, call us on{' '}
              <a href={`tel:${tel.replace(/\s+/g, '')}`}>{tel}</a> or submit a request through the enquiry form on this
              website. MahaRERA Registration No. P51800055792.
            </p>
          ),
        },
      ]}
    />
  );
}
