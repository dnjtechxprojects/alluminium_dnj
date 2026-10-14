import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Linkedin, Instagram, MapPin, Phone, Mail } from "lucide-react";
import { PaperTexture } from "@/components/common/PaperBackground";

interface SubLink {
  name: string;
  href: string;
}

interface FooterLinkGroup {
  title: string;
  children: SubLink[];
}

interface ContactItem {
  icon: React.ReactNode;
  label: string;
  text: string;
  href?: string;
}

export const footerLinks: FooterLinkGroup[] = [
  {
    title: "About Us",
    children: [
      { name: "Leadership", href: "/about/leadership" },
      // { name: "Dealers", href: "/about/dealers" }, // hidden for now
      { name: "Capabilities", href: "/about/capabilities" },
    ],
  },
  {
    title: "Products",
    children: [
      { name: "Extruded Products", href: "/product/extrudedproducts" },
      { name: "New Alloy", href: "/product/newalloy" },
      { name: "Mould Manufacturing", href: "/product/mouldmanufacturing" },
      // { name: "Fabrication", href: "/product/fabrication" },
    ],
  },
  {
    title: "Segments",
    children: [
      { name: "Building Construction", href: "/segments/buildingconstruction" },
      { name: "Automobile", href: "/segments/automobile" },
      { name: "Transportations", href: "/segments/transportations" },
      { name: "Aerospace", href: "/segments/aerospace" },
      { name: "Industrial", href: "/segments/industrial" },
      { name: "Defense", href: "/segments/defense" },
      { name: "Renewable Energy", href: "/segments/renewableenergy" },
    ],
  },
  {
    title: "Connect",
    children: [
      { name: "Contact Us", href: "/connect/contactus" },
      { name: "Blogs", href: "/connect/blog" },
    ],
  },
];

export const contacts: ContactItem[] = [
  {
    icon: <MapPin className="size-5" />,
    label: "Visit",
    text: "Block No.-907 & 908, Sevni, Surat, Gujarat - 394320",
  },
  {
    icon: <Phone className="size-5" />,
    label: "Call",
    text: "+91 96388 11159",
    href: "tel:+919638811159",
  },
  {
    icon: <Mail className="size-5" />,
    label: "Email",
    text: "info@natrajaluform.com",
    href: "mailto:info@natrajaluform.com",
  },
];

export const socialLinks = [
  {
    label: "LinkedIn",
    icon: <Linkedin className="size-[18px]" />,
    href: "https://www.linkedin.com/company/natraj-aluform-pvt-ltd/",
  },
  {
    label: "Instagram",
    icon: <Instagram className="size-[18px]" />,
    href: "https://www.instagram.com/natrajaluform?igsh=ampsZjV3M3J2dTRw&utm_source=qr",
  },
];

/**
 * Paper-themed footer: a slightly deeper sheet than the page above it, with
 * the same eyebrows, hairline rules and gold accents as the inner pages.
 */
const Footer: React.FC = () => {
  return (
    <footer
      className="relative isolate overflow-hidden border-t border-[#212121]/10 text-[#212121]"
      style={{ backgroundColor: "#F1EDE4" }}
    >
      <PaperTexture glows={false} />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-48 -top-40 -z-10 h-[460px] w-[460px] rounded-full bg-[#FFB600]/20 blur-[120px]"
      />

      <div className="mx-auto max-w-7xl px-5 pt-16 sm:px-8 md:pt-20 lg:px-12">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <Link href="/" aria-label="Natraj Aluform home">
              <Image
                src="/svg/black-logo.svg"
                alt="Natraj Aluform Logo"
                width={190}
                height={60}
                className="h-11 w-auto"
              />
            </Link>
            <p className="mt-6 max-w-sm text-base leading-relaxed text-[#4a5565]">
              Leading aluminium extrusion manufacturer committed to innovation,
              quality, and sustainability.
            </p>
            <div className="mt-6 flex gap-3">
              {socialLinks.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={item.label}
                  className="flex size-10 items-center justify-center rounded-full border border-[#212121]/15 bg-white/50 text-[#212121] transition hover:border-[#FFB600] hover:bg-[#FFB600]"
                >
                  {item.icon}
                </a>
              ))}
            </div>
          </div>

          <nav
            aria-label="Footer"
            className="grid grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-4 lg:col-span-8"
          >
            {footerLinks.map((section) => (
              <div key={section.title}>
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#9C6200]">
                  {section.title}
                </p>
                <ul className="mt-5 space-y-3 text-[15px]">
                  {section.children.map((item) => (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className="text-[#212121]/70 transition hover:text-[#212121]"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <ul className="mt-14 grid gap-6 border-y border-[#212121]/10 py-8 md:grid-cols-3">
          {contacts.map((item) => {
            const body = (
              <>
                <span className="flex size-11 shrink-0 items-center justify-center rounded-full border border-[#FFB600]/60 bg-white/60 text-[#9C6200]">
                  {item.icon}
                </span>
                <span>
                  <span className="block text-xs font-semibold uppercase tracking-[0.3em] text-[#6b6b6b]">
                    {item.label}
                  </span>
                  <span className="mt-1 block font-semibold leading-snug text-[#212121]">
                    {item.text}
                  </span>
                </span>
              </>
            );
            return (
              <li key={item.label}>
                {item.href ? (
                  <a href={item.href} className="flex items-start gap-4 transition hover:text-[#9C6200]">
                    {body}
                  </a>
                ) : (
                  <div className="flex items-start gap-4">{body}</div>
                )}
              </li>
            );
          })}
        </ul>

        <p className="py-6 text-sm text-[#6b6b6b]">
          © {new Date().getFullYear()} Natraj Aluform Private Limited. All rights reserved.
        </p>
      </div>

      {/* Oversized faint wordmark, cropped by the bottom edge. */}
      <p
        aria-hidden
        className="pointer-events-none -mb-[0.2em] select-none whitespace-nowrap text-center text-[clamp(2.5rem,10vw,10.5rem)] font-extrabold leading-none tracking-tighter text-[#212121]/[0.06]"
      >
        NATRAJ ALUFORM
      </p>
    </footer>
  );
};

export default Footer;
