import { Metadata } from "next";
import { getSetting } from "@/lib/actions/setting.actions";
import AboutContent from "@/components/shared/AboutContent";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "About Us | NRB visible School",
    description:
      "Learn more about our mission, mentors, and how we help students succeed.",
    keywords: [
      "About NRB visible School",
      "Mission",
      "Mentors",
      "Student Success",
      "NSDA",
      "BTEB",
    ],
    alternates: {
      canonical: "https://octal.edu.bd/about",
    },
    openGraph: {
      title: "About Us | NRB visible School",
      description:
        "Learn more about our mission, mentors, and how we help students succeed.",
      url: "https://octal.edu.bd/about",
      siteName: "NRB visible School",
      images: [
        {
          url: "https://octal.edu.bd/assets/images/placeholder.png",
          width: 1200,
          height: 630,
          alt: "About NRB visible School",
        },
      ],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: "About Us | NRB visible School",
      description:
        "Learn more about our mission, mentors, and how we help students succeed.",
      images: "/assets/images/placeholder.png",
    },
  };
}

export default async function AboutPage() {
  const settings = await getSetting();

  return <AboutContent settings={settings} />;
}
