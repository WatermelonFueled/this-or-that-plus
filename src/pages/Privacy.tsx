const Privacy = () => (
  <article className="flex flex-col gap-6 max-w-2xl mx-auto p-8 md:p-12 bg-gray-100 dark:bg-gray-900">
    <header className="flex flex-col gap-4">
      <h1 className="heading mb-6">
        Privacy Policy
      </h1>
      <p>
        This Privacy Policy describes how your personal information is collected, used, and shared when you visit or make a purchase from This or That Plus (the “Site”).
      </p>
    </header>
    <section className="flex flex-col gap-4">
      <h2 className="text-lg font-bold">
        PERSONAL INFORMATION WE COLLECT
      </h2>
      <p>
        When you visit the Site, we automatically collect certain information about your device, including information about your web browser, IP address, time zone, and some of the cookies that are installed on your device. Additionally, as you browse the Site, we collect information about the individual web pages or products that you view, what websites or search terms referred you to the Site, and information about how you interact with the Site. We refer to this automatically-collected information as “Device Information.”
      </p>
      <section className="flex flex-col gap-4">
        <h3>
          We may collect Device Information using the following technologies:
        </h3>
        <ul className="list-disc list-inside">
          <li>
            “Cookies” are data files that are placed on your device or computer and often include an anonymous unique identifier. For more information about cookies, and how to disable cookies, visit http://www.allaboutcookies.org.
          </li>
          <li>
            “Log files” track actions occurring on the Site, and collect data including your IP address, browser type, Internet service provider, referring/exit pages, and date/time stamps.
          </li>
          <li>
            “Web beacons,” “tags,” and “pixels” are electronic files used to record information about how you browse the Site.
          </li>
        </ul>
      </section>
      <p>
        When we talk about “Personal Information” in this Privacy Policy, we are talking both about Device Information and Order Information.
      </p>
    </section>
    <section className="flex flex-col gap-4">
      <h2 className="text-lg font-bold">
        HOW DO WE USE YOUR PERSONAL INFORMATION?
      </h2>
      <p>
        We use the Device Information that we collect to help us screen for potential risk and fraud (in particular, your IP address), and more generally to improve and optimize our Site (for example, by generating analytics about how our customers browse and interact with the Site, and to assess the success of our marketing and advertising campaigns).
      </p>
      <p>
        We share your Personal Information with third parties to help us use your Personal Information, as described above. We also use Google Analytics to help us understand how our users use the Site--you can read more about how Google uses your Personal Information here: https://www.google.com/intl/en/policies/privacy/. You can also opt-out of Google Analytics here: https://tools.google.com/dlpage/gaoptout.
      </p>
      <p>
        Finally, we may also share your Personal Information to comply with applicable laws and regulations, to respond to a subpoena, search warrant or other lawful request for information we receive, or to otherwise protect our rights.
      </p>
      {/* [[INCLUDE IF USING REMARKETING OR TARGETED ADVERTISING]]
      BEHAVIOURAL ADVERTISING
      As described above, we use your Personal Information to provide you with targeted advertisements or marketing communications we believe may be of interest to you.  For more information about how targeted advertising works, you can visit the Network Advertising Initiative’s (“NAI”) educational page at http://www.networkadvertising.org/understanding-online-advertising/how-does-it-work.

      You can opt out of targeted advertising by:
      [[
      INCLUDE OPT-OUT LINKS FROM WHICHEVER SERVICES BEING USED.
      COMMON LINKS INCLUDE:
      FACEBOOK - https://www.facebook.com/settings/?tab=ads
      GOOGLE - https://www.google.com/settings/ads/anonymous
      BING - https://advertise.bingads.microsoft.com/en-us/resources/policies/personalized-ads
      ]]Additionally, you can opt out of some of these services by visiting the Digital Advertising Alliance’s opt-out portal at:  http://optout.aboutads.info/. */}
    </section>
    <section className="flex flex-col gap-4">
      <h2 className="text-lg font-bold">
        DO NOT TRACK
      </h2>
      <p>
        Please note that we do not alter our Site’s data collection and use practices when we see a Do Not Track signal from your browser.
      </p>
    </section>
    {/* [[INCLUDE IF LOCATED IN OR IF STORE HAS CUSTOMERS IN EUROPE]]

    YOUR RIGHTS
    If you are a European resident, you have the right to access personal information we hold about you and to ask that your personal information be corrected, updated, or deleted. If you would like to exercise this right, please contact us through the contact information below.Additionally, if you are a European resident we note that we are processing your information in order to fulfill contracts we might have with you (for example if you make an order through the Site), or otherwise to pursue our legitimate business interests listed above.  Additionally, please note that your information will be transferred outside of Europe, including to Canada and the United States.


    DATA RETENTION
    When you place an order through the Site, we will maintain your Order Information for our records unless and until you ask us to delete this information. */}

    {/* [[INSERT IF AGE RESTRICTION IS REQUIRED]]
    MINORS
    The Site is not intended for individuals under the age of [[INSERT AGE]]. */}

    <section className="flex flex-col gap-4">
      <h2 className="text-lg font-bold">
        CHANGES
      </h2>
      <p>
        We may update this privacy policy from time to time in order to reflect, for example, changes to our practices or for other operational, legal or regulatory reasons.
      </p>
    </section>
    <section className="flex flex-col gap-4">
      <h2 className="text-lg font-bold">
        CONTACT US
      </h2>
      <p>
        For more information about our privacy practices, if you have questions, or if you would like to make a complaint, please contact us by e-mail at <a href="david@watermelonfueled.com">david@watermelonfueled.com</a>.
      </p>
    </section>
  </article>
)

export default Privacy
