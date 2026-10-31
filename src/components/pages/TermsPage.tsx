// Godrej Mahalunge - Terms & Conditions
// Project-specific wording (disclaimer, RERA, partnership) follows godrejsmahalunge.com.
import LegalPage from '@/components/LegalPage';
import { projectSnapshot } from '@/lib/data';

export default function TermsPage() {
  const tel = projectSnapshot.phone;
  return (
    <LegalPage
      title="Terms & Conditions"
      updated="9 October 2026"
      intro={
        <p>
          These Terms &amp; Conditions govern your use of the Godrej Mahalunge website, which presents Godrej Mahalunge,
          Mahalunge, West Pune, a project by Godrej Properties. By
          accessing this website you agree to these terms. If you do not agree, please do not use the website.
        </p>
      }
      sections={[
        {
          heading: 'Information on this website',
          body: (
            <>
              <p>
                The images and other details herein are only indicative. The Promoter reserves the right to change any
                or all of these in the interest of the development, as per provision of law.
              </p>
              <p>
                Artist’s impressions are used to illustrate amenities, specifications, images, and other details.
                Tolerance of +/- 3% is possible in the unit areas on account of design and construction variances. All
                brands stated are subject to final decision of the project architect.
              </p>
            </>
          ),
        },
        {
          heading: 'Not an offer',
          body: (
            <p>
              This electronic / printed material does not constitute an offer and/or contract of any type between the
              Promoter and the recipient. No booking or allotment shall be deemed to have been made on the basis of this
              electronic / printed material. Any booking is subject only to the terms of the agreement for sale executed
              between the parties.
            </p>
          ),
        },
        {
          heading: 'RERA registration',
          body: (
            <p>
              Godrej Mahalunge is registered with the Maharashtra Real Estate Regulatory Authority (MahaRERA). Registration details are available at{' '}
              <a href="https://maharera.maharashtra.gov.in" target="_blank" rel="noopener noreferrer">maharera.maharashtra.gov.in</a>.
              Prices, offers and payment plans shown on this website are indicative and subject to change; the final
              terms are those in the agreement for sale.
            </p>
          ),
        },
        {
          heading: 'Enquiries and communication',
          body: (
            <p>
              By submitting your details through this website, you confirm they are accurate and that you authorise
              Godrej Properties and its representatives to contact you by phone call, SMS, WhatsApp or email regarding Godrej
              Mahalunge, even if your number is registered on the DND/NDNC registry. How we handle your information is set out
              in our <a href="/privacy-policy">Privacy Policy</a>.
            </p>
          ),
        },
        {
          heading: 'Intellectual property',
          body: (
            <p>
              All content on this website, including text, renders, images, logos and design, belongs to Godrej Properties or
              its licensors. You may not copy, reproduce, distribute or use it for any commercial purpose without prior
              written permission.
            </p>
          ),
        },
        {
          heading: 'Third-party links and services',
          body: (
            <p>
              This website may link to or embed third-party services such as Google Maps and the MahaRERA website. We are
              not responsible for the content, availability or privacy practices of those services.
            </p>
          ),
        },
        {
          heading: 'Limitation of liability',
          body: (
            <p>
              The website is provided on an “as is” basis. While we take care to keep information accurate and current,
              Godrej Properties makes no warranty as to its completeness or accuracy and shall not be liable for any loss or
              damage arising from reliance on it. Please verify all details with our sales team before making any decision.
            </p>
          ),
        },
        {
          heading: 'Governing law',
          body: <p>These terms are governed by the laws of India. Any dispute shall be subject to the exclusive jurisdiction of the courts at Mumbai.</p>,
        },
        {
          heading: 'Changes and contact',
          body: (
            <p>
              We may update these terms at any time; the version on this page applies. For any question, call us on{' '}
              <a href={`tel:${tel.replace(/\s+/g, '')}`}>{tel}</a> or use the enquiry form on this website.
            </p>
          ),
        },
      ]}
    />
  );
}
