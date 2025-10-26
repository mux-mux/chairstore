import styled from 'styled-components';

const PrivacyPolicy = () => {
  return (
    <Wrapper>
      <Heading>Privacy Policy</Heading>
      <Updated>
        Last Updated: <time dateTime="2025-09-25">2025 September 25</time>
      </Updated>
      <p>
        Chair Store (&quot;Company,&quot; &quot;we,&quot; &quot;us,&quot; or
        &quot;our&quot;) respects your privacy and is committed to protecting it
        through this Privacy Policy. This policy describes how we collect, use,
        disclose, and safeguard your information when you use our website,
        products, and services (collectively, the &quot;Services&quot;).
      </p>
      <p>
        1. Information We do not Collect any types of information:
        <ul>
          <li>
            Personal Information: Name, email address, phone number, and other
            contact details.
          </li>
          <li>
            Usage Data: Information about how you use our Services, including IP
            address, browser type, and device information.
          </li>
          <li>
            Cookies and Tracking Technologies: We may use cookies and similar
            tracking technologies to improve your experience.
          </li>
        </ul>
      </p>
      <p>
        2. How We Use Your Information We use the information we collect for the
        following purposes:
        <ul>
          <li>To provide, operate, and improve our Services.</li>
          <li>
            To communicate with you regarding updates, promotions, or support.
          </li>
          <li>To analyze usage trends and enhance user experience.</li>
          <li>To comply with legal obligations and enforce our policies.</li>
        </ul>
      </p>
      <p>
        3. Sharing of Information We do not sell or rent your personal
        information. However, we may share it with: Service Providers:
        <ul>
          <li>Third-party vendors who assist in providing our Services.</li>
          <li>
            Legal Authorities: If required by law, regulation, or legal process.
          </li>
          <li>
            Business Transfers: In case of a merger, acquisition, or sale of
            assets.
          </li>
        </ul>
      </p>
      <p>
        4. Data Security We implement reasonable security measures to protect
        your information from unauthorized access, alteration, or disclosure.
        However, no system is completely secure, and we cannot guarantee
        absolute security.
      </p>
      <p>
        5. Third-Party Links Our Services may contain links to third-party
        websites. We are not responsible for their privacy practices, so we
        encourage you to review their policies before providing any personal
        information.
      </p>
      <p>
        6. Children’s Privacy Our Services are not intended for children under
        13. We do not knowingly collect personal information from children
        without parental consent.
      </p>
      <p>
        7. Changes to This Policy We may update this Privacy Policy from time to
        time. We will notify you of significant changes by posting the revised
        policy on our website.
      </p>
      <p>
        8. Contact Us If you have any questions about this Privacy Policy,
        please contact us at{' '}
        <a href="mailto:kobylyukh@gmail.com">kobylyukh@gmail.com</a>.
      </p>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  margin: ${({ theme }) => theme.space[0]} auto;
  width: 100%;
  max-width: 880px;
  text-align: left;
`;

const Updated = styled.p`
  font-size: ${({ theme }) => theme.fontSize[0]};
`;

const Heading = styled.h2`
  text-align: center;
`;

export default PrivacyPolicy;
