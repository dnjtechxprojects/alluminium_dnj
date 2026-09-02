"use client";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const [activeDesktopMenu, setActiveDesktopMenu] = useState<
    "about" | "product" | "segments" | "connect" | null
  >(null);

  const [aboutSubmenuOpen, setAboutSubmenuOpen] = useState(false);
  const [productsSubmenuOpen, setProductsSubmenuOpen] = useState(false);
  const [segmentsSubmenuOpen, setSegmentsSubmenuOpen] = useState(false);
  const [connectSubmenuOpen, setConnectSubmenuOpen] = useState(false);
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

if (!safePath) return null;
  const whiteBgPages = [
    "/about/leadership",
    "/about/dealers",
    "/about/capabilities",
    "/product/extrudedproducts",
    "/product/newalloy",
    "/product/diemanufacturing",
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
    setAboutSubmenuOpen(false);
    setProductsSubmenuOpen(false);
    setSegmentsSubmenuOpen(false);
    setConnectSubmenuOpen(false);
  };

  const openDesktopMenu = (
    menu: "about" | "product" | "segments" | "connect"
  ) => {
    setActiveDesktopMenu(menu);
  };

  const toggleMobileMenu = (
    menu: "about" | "product" | "segments" | "connect"
  ) => {
    if (menu === "about") {
      setAboutSubmenuOpen(!aboutSubmenuOpen);
      setProductsSubmenuOpen(false);
      setSegmentsSubmenuOpen(false);
      setConnectSubmenuOpen(false);
    } else if (menu === "product") {
      setProductsSubmenuOpen(!productsSubmenuOpen);
      setAboutSubmenuOpen(false);
      setSegmentsSubmenuOpen(false);
      setConnectSubmenuOpen(false);
    } else if (menu === "segments") {
      setSegmentsSubmenuOpen(!segmentsSubmenuOpen);
      setAboutSubmenuOpen(false);
      setProductsSubmenuOpen(false);
      setConnectSubmenuOpen(false);
    } else {
      setConnectSubmenuOpen(!connectSubmenuOpen);
      setAboutSubmenuOpen(false);
      setProductsSubmenuOpen(false);
      setSegmentsSubmenuOpen(false);
    }
  };

   return (
   <nav
  className={`fixed top-0 left-0 z-50 w-full h-20 flex justify-between items-center px-8 md:px-16 ${
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
            className="object-contain max-sm:w-[150px] cursor-pointer"
          />
        </Link>
      </div>

      <div
        onClick={() => setMenuOpen(!menuOpen)}
        className="cursor-pointer hover:opacity-80 transition-opacity z-[70] ml-auto"
      >
        {menuOpen ? (
          <Image src="/svg/menu1.svg" alt="Close Menu" width={30} height={30}  className="max-sm:h-[26px] max-sm:w-[26px]"/>
        ) : (
          <Image src="/svg/menu.svg" alt="Open Menu" width={30} height={30} className="max-sm:h-[26px] max-sm:w-[26px]"/>
        )}
      </div>

     <AnimatePresence initial={false}>

        {menuOpen && (
          <motion.div
          initial={{ y: "-100%" }}
          animate={{ y: 0 }}
          exit={{ y: "-100%" }}
          transition={{ duration: 0.5 }}
          className="fixed top-0 left-0 w-full h-screen flex flex-col lg:pl-20 justify-center space-y-8 z-40"
          style={{
            backgroundImage: "url('/images/navbar-bg.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundColor: isWhiteBg ? "rgba(255, 255, 255, 0.8)" : "transparent",
          }}
        >

            <ul className="lg:text-6xl text-xl font-medium space-y-7 text-start text-[#2F2F2F] lg:w-100 -mt-10 md:mt-0">

              <li
                className="group cursor-pointer ml-3 relative"
                onMouseEnter={() => openDesktopMenu("about")}
              >
                <div className="flex justify-between items-center lg:block" onClick={() => toggleMobileMenu("about")}>
                  <span className="lg:hidden text-2xl">
                    <Image src="/svg/about.svg" width={30} height={30} alt="" />
                  </span>

                  <span className="hidden lg:block absolute left-0 top-1/2 -translate-y-1/2 h-1 w-0 bg-[#2F2F2F] group-hover:w-20 transition-all"></span>

                  <span className="relative  z-10 lg:group-hover:ml-24 transition-all ml-4">
                    About Us
                  </span>

                  <span className="lg:hidden text-2xl flex ml-auto px-10">
                    <Image src="/svg/Down 3.svg" width={40} height={40} alt="" />
                  </span>
                </div>

                <AnimatePresence mode="wait" initial={false}>

                  {aboutSubmenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="lg:hidden ml-16 mt-3 flex flex-col space-y-3 text-[17px] text-gray-700"
                    >
                      <Link href="/about/leadership" onClick={closeMenu}>Leaderships</Link>
                      <Link href="/about/dealers" onClick={closeMenu}>Dealers</Link>
                      <Link href="/about/capabilities" onClick={closeMenu}>Capabilities</Link>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>

              <li
                className="group cursor-pointer ml-3 relative"
                onMouseEnter={() => openDesktopMenu("product")}
              >
                <div className="flex justify-between items-center lg:block" onClick={() => toggleMobileMenu("product")}>
                    <span className="lg:hidden text-2xl">
                    <Image src="/svg/proucts.svg" width={30} height={30} alt="" />
                  </span>

                 <span className="hidden lg:block absolute left-0 top-1/2 -translate-y-1/2 h-1 w-0 bg-[#2F2F2F] group-hover:w-20 transition-all"></span>
                  <span className="relative z-10 lg:group-hover:ml-24 transition-all ml-4">
                    Products
                  </span>

                  <span className="lg:hidden ml-auto px-10 text-2xl">
                    <Image src="/svg/Down 3.svg" width={40} height={40} alt="" />
                  </span>
                </div>

               <AnimatePresence mode="wait" initial={false}>

                  {productsSubmenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="lg:hidden ml-16 mt-3 flex flex-col space-y-3 text-[17px] text-gray-700"
                    >
                      <Link href="/product/extrudedproducts" onClick={closeMenu}>Extruded Products</Link>
                      <Link href="/product/newalloy" onClick={closeMenu}>New Alloy</Link>
                      <Link href="/product/diemanufacturing" onClick={closeMenu}>Die Manufacturing</Link>
                      <Link href="/product/fabrication" onClick={closeMenu}>Fabrication</Link>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>

              <li
                className="group cursor-pointer ml-3 relative"
                onMouseEnter={() => openDesktopMenu("segments")}
              >
                <div className="flex justify-between items-center lg:block" onClick={() => toggleMobileMenu("segments")}>
                  <span className="lg:hidden text-2xl">
                    <Image src="/svg/segments.svg" width={30} height={30} alt="" />
                  </span>

                  <span className="hidden lg:block absolute left-0 top-1/2 -translate-y-1/2 h-1 w-0 bg-[#2F2F2F] group-hover:w-20 transition-all"></span>

                  <span className="relative z-10 lg:group-hover:ml-24 transition-all ml-4">
                    Segments
                  </span>

                  <span className="lg:hidden ml-auto px-10 text-2xl">
                    <Image src="/svg/Down 3.svg" width={40} height={40} alt="" />
                  </span>
                </div>

               <AnimatePresence mode="wait" initial={false}>

                  {segmentsSubmenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="lg:hidden ml-16 mt-3 flex flex-col space-y-3 text-[17px] text-gray-700"
                    >
                      <Link href="/segments/buildingconstruction" onClick={closeMenu}>Building Construction</Link>
                      <Link href="/segments/automobile" onClick={closeMenu}>Automobile</Link>
                      <Link href="/segments/transportations" onClick={closeMenu}>Transportations</Link>
                      <Link href="/segments/aerospace" onClick={closeMenu}>Aerospace</Link>
                      <Link href="/segments/industrial" onClick={closeMenu}>Industrial</Link>
                      <Link href="/segments/defense" onClick={closeMenu}>Defense</Link>
                      <Link href="/segments/renewableenergy" onClick={closeMenu}>Renewable Energy</Link>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>

              <li
                className="group cursor-pointer ml-3 relative"
                onMouseEnter={() => openDesktopMenu("connect")}
              >
                <div className="flex items-center lg:block" onClick={() => toggleMobileMenu("connect")}>
                  <span className="lg:hidden text-2xl">
                    <Image src="/svg/Group.svg" width={30} height={30} alt="" />
                  </span>

                  <span className="hidden lg:block absolute left-0 top-1/2 h-1 w-0 bg-[#2F2F2F] group-hover:w-20 transition-all"></span>

                  <span className="relative z-10 lg:group-hover:ml-24 transition-all ml-4">
                    Connect
                  </span>

                  <span className="lg:hidden ml-auto px-10 text-2xl">
                    <Image src="/svg/Down 3.svg" width={40} height={40} alt="" />
                  </span>
                </div>

               <AnimatePresence mode="wait" initial={false}>

                  {connectSubmenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="lg:hidden ml-16 mt-3 flex flex-col space-y-3 text-[17px] text-gray-700"
                    >
                      <Link href="/connect/contactus" onClick={closeMenu}>Contact Us</Link>
                      {/* <Link href="/connect/inthenews" onClick={closeMenu}>In The News</Link> */}
                      <Link href="/connect/blog" onClick={closeMenu}>Blogs</Link>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            </ul>

            <div className="lg:hidden absolute bottom-2 w-full flex justify-center px-6">
              <Link
                href="/connect/contactus"
                onClick={closeMenu}
                className="bg-black text-white px-6 py-3 rounded-2xl flex items-center gap-3 w-[170px] justify-center"
              >
                Contact Us →
              </Link>
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
          <Link href="/about/leadership" onClick={closeMenu}>Leaderships</Link>
          <Link href="/about/dealers" onClick={closeMenu}>Dealers</Link>
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
                      <Link href="/product/diemanufacturing" onClick={closeMenu}>Die Manufacturing</Link>
                      <Link href="/product/fabrication" onClick={closeMenu}>Fabrication</Link>
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
