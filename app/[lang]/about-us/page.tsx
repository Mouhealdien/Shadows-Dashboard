import React from "react";
import { Locale } from "../../../i18n-config";
import { getDictionary } from "../../../get-dictionary";
import Link from "next/link";

const page = async ({ params: { lang } }: { params: { lang: Locale } }) => {
  const dictionary = await getDictionary(lang);
  return (
    <p>
      This text is rendered on the server: {dictionary["aboutPage"]}
      <Link style={{ padding: 20 }} href={`/${lang}/testpage`}>
        Move to test
      </Link>
      <Link href={`/${lang}`}>Move to Home</Link>
    </p>
  );
};

export default page;
