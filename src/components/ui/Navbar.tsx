"use client";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Phone } from "lucide-react";
import { CATALOGUE_PAGE, CATALOGUE_SECTION_ID } from "@/lib/catalogue";

// Stacked extruded tubes and a coil, the header shortcut to the catalogue downloads
function ProfilesIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="1 4 47.5 20"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.4}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <path d="M5.5 13.67 2 16v7h14l6-4v-7h-3.5M2 16h14v7M16 16l6-4M9 16v7" />
      <path d="M5.5 16V9h7v7M5.5 9l6-4h7l-6 4M18.5 5v7l-6 4" />
      <path d="M4 18h3v3H4zM11 18h3v3h-3zM7.5 11h3v3h-3z" />
      <path d="M30 5h12M30 23h12M30 5a5.5 9 0 0 0 0 18" />
      <ellipse cx="42" cy="14" rx="5.5" ry="9" />
      <ellipse cx="42" cy="14" rx="3" ry="5" />
      <ellipse cx="42" cy="14" rx="1.1" ry="1.9" />
    </svg>
  );
}

type MenuKey = "about" | "product" | "segments" | "connect";

const mobileMenu: {
  key: MenuKey;
  label: string;
  links: { label: string; href: string }[];
}[] = [
  {
    key: "about",
    label: "About Us",
    links: [
      { label: "Leadership", href: "/about/leadership" },
      // { label: "Dealers", href: "/about/dealers" },
      { label: "Capabilities", href: "/about/capabilities" },
    ],
  },
  {
    key: "product",
    label: "Products",
    links: [
      { label: "Extruded Products", href: "/product/extrudedproducts" },
      { label: "New Alloy", href: "/product/newalloy" },
      { label: "Mould Manufacturing", href: "/product/mouldmanufacturing" },
      // { label: "Fabrication", href: "/product/fabrication" },
    ],
  },
  {
    key: "segments",
    label: "Segments",
    links: [
      { label: "Building Construction", href: "/segments/buildingconstruction" },
      { label: "Automobile", href: "/segments/automobile" },
      { label: "Transportations", href: "/segments/transportations" },
      { label: "Aerospace", href: "/segments/aerospace" },
      { label: "Industrial", href: "/segments/industrial" },
      { label: "Defense", href: "/segments/defense" },
      { label: "Renewable Energy", href: "/segments/renewableenergy" },
    ],
  },
  {
    key: "connect",
    label: "Connect",
    links: [
      { label: "Contact Us", href: "/connect/contactus" },
      // { label: "In The News", href: "/connect/inthenews" },
      { label: "Blogs", href: "/connect/blog" },
    ],
  },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const [activeDesktopMenu, setActiveDesktopMenu] = useState<MenuKey | null>(
    null
  );

  const [mobileSubmenu, setMobileSubmenu] = useState<MenuKey | null>(null);
  const aboutScrollRef = useRef<HTMLDivElement>(null);
  const productScrollRef = useRef<HTMLDivElement>(null);
  const segmentsScrollRef = useRef<HTMLDivElement>(null);
  const connectScrollRef = useRef<HTMLDivElement>(null);

  const scrollMenu = (ref: any, direction: "left" | "right") => {
    if (ref.current) {
      ref.current.scrollBy({
        left: direction === "left" ? -250 : 250,
        behavior: "smooth",
      });
    }
  };

const pathname = usePathname();
const [safePath, setSafePath] = useState<string | null>(null);

useEffect(() => {
  setSafePath(pathname);
}, [pathname]);

// Stop the page behind the full-screen menu from scrolling
useEffect(() => {
  document.body.style.overflow = menuOpen ? "hidden" : "";
  return () => {
    document.body.style.overflow = "";
  };
}, [menuOpen]);

if (!safePath) return null;
  const whiteBgPages = [
    "/about/leadership",
    "/about/dealers",
    "/about/capabilities",
    "/product/extrudedproducts",
    "/product/newalloy",
    "/product/mouldmanufacturing",
    "/product/fabrication",
    "/segments/buildingconstruction",
    "/segments/automobile",
    "/segments/transportations",
    "/segments/aerospace",
    "/segments/industrial",
    "/segments/defense",
    "/segments/renewableenergy",
    "/connect/contactus",
    "/connect/inthenews",
    "/connect/blog",
    "/connect/blog/1",
  ];

 const isWhiteBg = whiteBgPages.includes(safePath);

  const closeMenu = () => {
    setMenuOpen(false);
    setActiveDesktopMenu(null);
    setMobileSubmenu(null);
  };

  const openDesktopMenu = (menu: MenuKey) => {
    setActiveDesktopMenu(menu);
  };

  const toggleMobileMenu = (menu: MenuKey) => {
    setMobileSubmenu((current) => (current === menu ? null : menu));
  };

  // Already on the products page: scroll there instead of re-navigating
  const openCatalogue = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (safePath !== CATALOGUE_PAGE) return;
    e.preventDefault();
    document
      .getElementById(CATALOGUE_SECTION_ID)
      ?.scrollIntoView({ behavior: "smooth" });
  };

   return (
   <nav
  className={`fixed top-0 left-0 z-50 w-full h-20 flex justify-between items-center px-5 sm:px-8 md:px-16 ${
    isWhiteBg ? "bg-white" : "bg-cover"
  }`}
  style={
    !isWhiteBg
      ? { backgroundImage: "url('/images/navbar-bg.png')" }
      : {}
  }
>


      <div className="absolute left-10 max-sm:left-5 z-[60]">
        <Link href="/">
          <Image
            src="/svg/black-logo.svg"
            alt="Logo"
            width={190}
            height={190}
            className="object-contain max-sm:w-[min(150px,41vw)] cursor-pointer"
          />
        </Link>
      </div>

      <div className="ml-auto flex items-center gap-1 sm:gap-3 lg:gap-7">
      <Link
        href="/connect/contactus"
        aria-label="Contact us"
        title="Contact us"
        className="flex h-10 w-9 items-center justify-center text-[#2F2F2F] transition-colors hover:text-[#FFB600]"
      >
        <Phone className="h-[21px] w-[21px] lg:h-6 lg:w-6" strokeWidth={1.5} />
      </Link>

      <Link
        href={`${CATALOGUE_PAGE}#${CATALOGUE_SECTION_ID}`}
        onClick={openCatalogue}
        aria-label="Download catalogue"
        title="Download catalogue"
        className="flex h-10 items-center justify-center px-0.5 text-[#2F2F2F] transition-colors hover:text-[#FFB600]"
      >
        <ProfilesIcon className="h-5 w-auto lg:h-6" />
      </Link>

      <button
        type="button"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label={menuOpen ? "Close menu" : "Open menu"}
        aria-expanded={menuOpen}
        className="cursor-pointer hover:opacity-80 transition-opacity z-[70]"
      >
        {/* Round three-line icon that turns into an X */}
        <span className="relative flex h-11 w-11 lg:h-12 lg:w-12 items-center justify-center rounded-full border border-[#2F2F2F]/70">
          <span
            className={`absolute h-[1.5px] w-[18px] rounded-full bg-[#2F2F2F] transition-transform duration-300 ${
              menuOpen ? "rotate-45" : "-translate-y-[6px]"
            }`}
          />
          <span
            className={`absolute h-[1.5px] w-[18px] rounded-full bg-[#2F2F2F] transition-opacity duration-200 ${
              menuOpen ? "opacity-0" : "opacity-100"
            }`}
          />
          <span
            className={`absolute h-[1.5px] w-[18px] rounded-full bg-[#2F2F2F] transition-transform duration-300 ${
              menuOpen ? "-rotate-45" : "translate-y-[6px]"
            }`}
          />
        </span>
      </button>
      </div>

     <AnimatePresence initial={false}>

        {menuOpen && (
          <motion.div
          initial={{ y: "-100%" }}
          animate={{ y: 0 }}
          exit={{ y: "-100%" }}
          transition={{ duration: 0.5 }}
          className="fixed top-0 left-0 w-full h-dvh flex flex-col lg:pl-20 justify-center space-y-8 z-40"
          style={{
            backgroundImage: "url('/images/navbar-bg.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundColor: isWhiteBg ? "rgba(255, 255, 255, 0.8)" : "transparent",
          }}
        >

            {/* Desktop menu */}
            <ul className="hidden lg:block lg:text-6xl font-medium space-y-7 text-start text-[#2F2F2F] lg:w-100">

              <li
                className="group cursor-pointer ml-3 relative"
                onMouseEnter={() => openDesktopMenu("about")}
              >
                <div>
                  <span className="absolute left-0 top-1/2 -translate-y-1/2 h-1 w-0 bg-[#2F2F2F] group-hover:w-20 transition-all"></span>

                  <span className="relative z-10 group-hover:ml-24 transition-all ml-4">
                    About Us
                  </span>
                </div>
              </li>

              <li
                className="group cursor-pointer ml-3 relative"
                onMouseEnter={() => openDesktopMenu("product")}
              >
                <div>
                  <span className="absolute left-0 top-1/2 -translate-y-1/2 h-1 w-0 bg-[#2F2F2F] group-hover:w-20 transition-all"></span>

                  <span className="relative z-10 group-hover:ml-24 transition-all ml-4">
                    Products
                  </span>
                </div>
              </li>

              <li
                className="group cursor-pointer ml-3 relative"
                onMouseEnter={() => openDesktopMenu("segments")}
              >
                <div>
                  <span className="absolute left-0 top-1/2 -translate-y-1/2 h-1 w-0 bg-[#2F2F2F] group-hover:w-20 transition-all"></span>

                  <span className="relative z-10 group-hover:ml-24 transition-all ml-4">
                    Segments
                  </span>
                </div>
              </li>

              <li
                className="group cursor-pointer ml-3 relative"
                onMouseEnter={() => openDesktopMenu("connect")}
              >
                <div>
                  <span className="absolute left-0 top-1/2 h-1 w-0 bg-[#2F2F2F] group-hover:w-20 transition-all"></span>

                  <span className="relative z-10 group-hover:ml-24 transition-all ml-4">
                    Connect
                  </span>
                </div>
              </li>
            </ul>

            {/* Mobile menu */}
            <div className="lg:hidden absolute inset-0 flex flex-col overflow-y-auto overscroll-contain pt-32 pb-10">
              <ul className="flex flex-col gap-1 px-10 sm:px-16">
                {mobileMenu.map((menu, index) => {
                  const isOpen = mobileSubmenu === menu.key;
                  const isDimmed = mobileSubmenu !== null && !isOpen;

                  return (
                    <motion.li
                      key={menu.key}
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 + index * 0.07, duration: 0.4 }}
                    >
                      <button
                        type="button"
                        onClick={() => toggleMobileMenu(menu.key)}
                        aria-expanded={isOpen}
                        className={`relative py-2.5 text-[28px] md:text-[40px] leading-tight font-medium tracking-tight transition-colors duration-300 ${
                          isDimmed ? "text-[#2F2F2F]/40" : "text-[#2F2F2F]"
                        }`}
                      >
                        {menu.label}
                        <span
                          className={`absolute left-0 bottom-1.5 h-[3px] w-full rounded-full bg-linear-to-r from-[#FFB600] to-[#FFB600]/0 origin-left transition-transform duration-300 ${
                            isOpen ? "scale-x-100" : "scale-x-0"
                          }`}
                        />
                      </button>

                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                            className="overflow-hidden"
                          >
                            <div className="ml-1 mt-1 mb-4 flex flex-col border-l border-[#2F2F2F]/15 pl-5">
                              {menu.links.map((link) => {
                                const isCurrent = safePath === link.href;

                                return (
                                  <Link
                                    key={link.href}
                                    href={link.href}
                                    onClick={closeMenu}
                                    className={`relative py-2 text-[17px] md:text-xl transition-colors ${
                                      isCurrent
                                        ? "font-semibold text-[#2F2F2F] before:absolute before:-left-[22px] before:top-1/2 before:h-5 before:w-[3px] before:-translate-y-1/2 before:rounded-full before:bg-[#FFB600]"
                                        : "text-[#5F5F5F] hover:text-[#2F2F2F]"
                                    }`}
                                  >
                                    {link.label}
                                  </Link>
                                );
                              })}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.li>
                  );
                })}
              </ul>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + mobileMenu.length * 0.07, duration: 0.4 }}
                className="mt-auto px-10 sm:px-16 pt-12"
              >
                <Link
                  href="/connect/contactus"
                  onClick={closeMenu}
                  className="inline-flex items-center gap-3 rounded-full bg-[#2F2F2F] px-7 py-3.5 text-[15px] font-medium text-white"
                >
                  Contact Us <span aria-hidden>→</span>
                </Link>
              </motion.div>
            </div>

          <AnimatePresence mode="wait" initial={false}>

  {activeDesktopMenu === "about" && (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 40 }}
      className="hidden lg:flex absolute bottom-16 right-20 flex-col gap-6 text-xl font-medium text-[#2F2F2F]"
    >

      <Image
        src="/svg/Line.svg"
        width={200}
        height={10}
        alt=""
        className="w-[55%] ml-auto"
      />

      <div className="relative w-[55%] ml-auto flex items-center justify-center">

        <button
          onClick={() => scrollMenu(aboutScrollRef, "left")}
          className="absolute left-0"
        >
          <Image src="/icons/left-chevron.png" width={38} height={38} alt="left" className="hover:cursor-pointer"/>
          
        </button>

        <div
          ref={aboutScrollRef}
          className="overflow-x-auto scrollbar-hide scroll-smooth flex gap-14 mx-14  whitespace-nowrap justify-center"
          style={{ maxWidth: "[60%]" }}
        >
          <Link href="/about/leadership" onClick={closeMenu}>Leadership</Link>
          {/* <Link href="/about/dealers" onClick={closeMenu}>Dealers</Link> */}
          <Link href="/about/capabilities" onClick={closeMenu}>Capabilities</Link>
        </div>

        <button
          onClick={() => scrollMenu(aboutScrollRef, "right")}
          className="absolute right-0"
        >
          <Image src="/icons/chevron.png" width={38} height={38} alt="right" className="hover:cursor-pointer"/>
        </button>

      </div>

      <Image
        src="/svg/Line.svg"
        width={200}
        height={10}
        alt=""
        className="w-[55%] ml-auto"
      />

    </motion.div>
  )}
</AnimatePresence>


            <AnimatePresence mode="wait" initial={false}>

              {activeDesktopMenu === "product" && (
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 40 }}
                  className="hidden lg:flex absolute bottom-16 right-20 flex-col gap-6 text-xl font-medium text-[#2F2F2F]"
                >
                  <Image
                  src="/svg/Line.svg"
                  width={200}
                  height={10}
                  alt=""
                  className="w-[60%] ml-auto"
                />

             <div className="relative w-[60%] ml-auto flex items-center justify-center">
                    <button onClick={() => scrollMenu(productScrollRef, "left")} className="absolute left-0">
                      <Image src="/icons/left-chevron.png" width={38} height={38} alt="left" className="hover:cursor-pointer"/>
                    </button>

                    <div
                      ref={productScrollRef}
                       className="overflow-x-auto scrollbar-hide scroll-smooth flex gap-8  pr-10 whitespace-nowrap  items-start justify-start"
                    style={{ maxWidth: "90%" }}
                  >
                      <Link href="/product/extrudedproducts" onClick={closeMenu}>Extruded Products</Link>
                      <Link href="/product/newalloy" onClick={closeMenu}>New Alloy</Link>
                      <Link href="/product/mouldmanufacturing" onClick={closeMenu}>Mould Manufacturing</Link>
                      {/* <Link href="/product/fabrication" onClick={closeMenu}>Fabrication</Link> */}
                   </div>
                  <button onClick={() => scrollMenu(productScrollRef, "right")} className="absolute right-0">
                      <Image src="/icons/chevron.png" width={38} height={38} alt="right" className="hover:cursor-pointer" />
                    </button>
                  </div>

                   <Image src="/svg/Line.svg" width={200} height={10} alt="" className="w-[60%] ml-auto" />
                </motion.div> 
              )}
            </AnimatePresence>

            <AnimatePresence mode="wait" initial={false}>

              {activeDesktopMenu === "segments" && (
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 40 }}
                  className="hidden lg:flex absolute bottom-16 right-20 flex-col gap-6 text-xl font-medium text-[#2F2F2F]"
                >
                  <Image
                  src="/svg/Line.svg"
                  width={200}
                  height={10}
                  alt=""
                  className="w-[60%] ml-auto"
                />

                  <div className="relative w-[60%] ml-auto flex items-center justify-center">
                    <button onClick={() => scrollMenu(segmentsScrollRef, "left")}
                      className="absolute left-0">
                      <Image src="/icons/left-chevron.png" width={38} height={38} alt="left" className="hover:cursor-pointer"/>
                    </button>

                   <div
                    ref={segmentsScrollRef}
                    className="overflow-x-auto scrollbar-hide scroll-smooth flex gap-8  pr-10 whitespace-nowrap items-start"
                    style={{ maxWidth: "90%" }}
                  >

                      <Link href="/segments/buildingconstruction" onClick={closeMenu}>Building Construction</Link>
                      <Link href="/segments/automobile" onClick={closeMenu}>Automobile</Link>
                      <Link href="/segments/transportations" onClick={closeMenu}>Transportations</Link>
                      <Link href="/segments/aerospace" onClick={closeMenu}>Aerospace</Link>
                      <Link href="/segments/industrial" onClick={closeMenu}>Industrial</Link>
                      <Link href="/segments/defense" onClick={closeMenu}>Defense</Link>
                      <Link href="/segments/renewableenergy" onClick={closeMenu}>Renewable Energy</Link>
                    </div>

                    <button onClick={() => scrollMenu(segmentsScrollRef, "right")}
                      className="absolute right-0">
                      <Image src="/icons/chevron.png" width={38} height={38} alt="right" className="hover:cursor-pointer" />
                    </button>
                  </div>

                  <Image src="/svg/Line.svg" width={200} height={10} alt="" className="w-[60%] ml-auto" />
                </motion.div>
              )}
            </AnimatePresence>


           <AnimatePresence mode="wait" initial={false}>

              {activeDesktopMenu === "connect" && (
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 40 }}
                  className="hidden lg:flex absolute bottom-16 right-20 flex-col gap-6 text-xl font-medium text-[#2F2F2F]"
    >
                  <Image
                    src="/svg/Line.svg"
                    width={200}
                    height={10}
                    alt=""
                    className="w-[50%] ml-auto"
                  />

                  <div className="relative w-[50%] ml-auto flex items-center justify-center">
                    <button onClick={() => scrollMenu(connectScrollRef, "left")}
                      className="absolute left-0">
                       <Image src="/icons/left-chevron.png" width={38} height={38} alt="left" className="hover:cursor-pointer" />
                    </button>

                    <div
                      ref={connectScrollRef}
                      className="overflow-x-auto scrollbar-hide scroll-smooth flex gap-14 mx-14  whitespace-nowrap justify-center"
                    style={{ maxWidth: "[50%]" }}
                  >
                      <Link href="/connect/contactus" onClick={closeMenu}>Contact Us</Link>
                      {/* <Link href="/connect/inthenews" onClick={closeMenu}>In The News</Link> */}
                      <Link href="/connect/blog" onClick={closeMenu}>Blogs</Link>
                    </div>

                    <button onClick={() => scrollMenu(connectScrollRef, "right")}
                      className="absolute right-0">
                       <Image src="/icons/chevron.png" width={38} height={38} alt="right" className="hover:cursor-pointer"/>
                    </button>
                  </div>

                   <Image src="/svg/Line.svg" width={200} height={10} alt="" className="w-[50%] ml-auto" />
                </motion.div>
              )}
            </AnimatePresence>

          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
