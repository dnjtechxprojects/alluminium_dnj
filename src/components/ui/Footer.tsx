import React from "react";
import Link from "next/link";
import {
  Linkedin,
  Instagram,
  MapPin,
  Phone,
  Mail,
} from "lucide-react";

interface SubLink {
  name: string;
  href: string;
}

interface FooterLinkGroup {
  title: string;
  href: string;
  children: SubLink[];
}

interface ContactItem {
  icon: React.ReactNode;
  text: string;
}

const footerLinks: FooterLinkGroup[] = [
  {
    title: "About Us",
    href: "",
    children: [
      { name: "Leadership", href: "/about/leadership" },
      { name: "Dealers", href: "/about/dealers" },
      { name: "Capabilities", href: "/about/capabilities" },
    ],
  },
  {
    title: "Products",
    href: "",
    children: [
      { name: "Extruded Products", href: "/product/extrudedproducts" },
      { name: "New Alloy", href: "/product/newalloy" },
      { name: "Die Manufacturing", href: "/product/diemanufacturing" },
      { name: "Fabrication", href: "/product/fabrication" },
    ],
  },
  {
    title: "Segments",
    href: "",
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
    href: "",
    children: [
      { name: "Contact Us", href: "/connect/contactus" },
      { name: "Blogs", href: "/connect/blog" },
    ],
  },
];

const contacts: ContactItem[] = [
  {
    icon: <MapPin className="w-5 h-5 text-[#ffb600] mt-1" />,
    text: "Block No.-907 & 908, Sevni, Surat, Gujarat - 394320",
  },
  {
    icon: <Phone className="w-4 h-4 text-[#ffb600]" />,
    text: " +91 96388 11159",
  },
  {
    icon: <Mail className="w-4 h-4 text-[#ffb600]" />,
    text: "info@natrajaluform.com",
  },
];

const socialLinks = [
  {
    icon: <Linkedin />,
    href: "https://www.linkedin.com/company/natraj-aluform-pvt-ltd/",
  },
  {
    icon: <Instagram />,
    href: "https://www.instagram.com/natrajaluform?igsh=ampsZjV3M3J2dTRw&utm_source=qr",
  },
];

const Footer: React.FC = () => {
  return (
    <footer
      className="text-gray-300 py-10 px-6 lg:px-24 bg-cover bg-center"
      style={{ backgroundImage: "url('/images/process-bg.png')" }}
    >
      <div className="grid grid-cols-1 md:grid-cols-4 gap-10 border-b border-gray-700 pb-8">
        
        <div>
          <Link href="/">
            <img
              src="/svg/white-logo.svg"
              alt="Natraj Aluform Logo"
              className="h-10 mb-4"
            />
          </Link>

          <p className="text-sm leading-relaxed text-[#99a1af]">
            Leading aluminium extrusion manufacturer committed to innovation,
            quality, and sustainability.
          </p>

          <div className="flex space-x-3 mt-4">
            {socialLinks.map((item, i) => (
              <a
                key={i}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#ffffff1a] hover:bg-[#ffb600] p-2 rounded-xl transition duration-300 hover:scale-110"
              >
                {React.cloneElement(item.icon, {
                  className: "w-4 h-4 text-white",
                })}
              </a>
            ))}
          </div>
        </div>

        <div className="md:col-span-2">
          <h3 className="text-lg text-white mb-6">Quick Links</h3>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-14">
            {footerLinks.map((section) => (
              <div key={section.title}>
                <Link
                  href={section.href}
                  className="block text-white font-semibold mb-3 hover:text-[#ffb600] transition"
                >
                  {section.title}
                </Link>

                <ul className="space-y-2 text-sm">
                  {section.children.map((item) => (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className="text-[#99a1af] hover:text-[#ffb600] transition"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-lg text-white mb-4">Contact</h3>
          <ul className="space-y-3 text-sm">
            {contacts.map((item, index) => (
              <li key={index} className="flex items-start gap-2">
                {item.icon}
                <span className="text-[#99a1af]">{item.text}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-center mt-6 text-sm text-[#99a1af]">
        <p>© 2025 Natraj Aluform Private Limited. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
