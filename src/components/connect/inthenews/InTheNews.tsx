// "use client";
// import { useState } from "react";
// import SectionHeader from "@/components/common/SectionHeader";

// interface NewsItem {
//   id: number;
//   title: string;
//   description?: string;
//   date: string;
//   highlight?: boolean;
//   bg?: string;
//   textColor?: string;
//   image?: string;
// }

// export default function LatestNews() {
//   const [news] = useState<NewsItem[]>([
//     {
//       id: 1,
//       title: "New Extrusion Line Commissioned",
//       description:
//         "We successfully commissioned a new high-capacity extrusion line to improve productivity and precision.",
//       date: "March 2025",
//       highlight: true,
//       textColor: "#ffffff",
//       image: "/images/news1.png",
//     },
//     {
//       id: 2,
//       title: "Participation in Industry Expo",
//       date: "February 2025",
//       image: "/images/news2.png",
//     },
//     {
//       id: 3,
//       title: "Sustainability Initiative Launched",
//       date: "January 2025",
//       image: "/images/news3.png",
//     },
//     {
//       id: 4,
//       title: "Quality Certification Achieved",
//       date: "December 2024",
//       image: "/images/news4.png",
//     },
//     {
//       id: 5,
//       title: "New Export Markets Opened",
//       date: "November 2024",
//       image: "/images/news5.png",
//     },
//     {
//       id: 6,
//       title: "Customer Excellence Award",
//       date: "October 2024",
//       image: "/images/news6.png",
//     },
//     {
//       id: 7,
//       title: "Automation Systems Upgrade",
//       date: "September 2024",
//       image: "/images/news7.png",
//       textColor: "#ffffff",
//     },
//     { 
//       id: 8,
//       title: "New R&D Initiative Launched",
//       description:
//         "A dedicated research and development initiative was introduced to accelerate innovation in aluminium solutions.",
//       date: "September 2024",
//       bg: "#0e1623",
//       textColor: "#ffffff",
//     },
//   ]);

//   return (
//     <div className="w-full py-16 px-4 md:px-12 lg:px-20 bg-white">
//       <SectionHeader title="In the News" />

//       <div className="flex justify-center mb-10">
//         <span className="inline-block px-5 py-3 bg-[#fffbf2] text-[#ffb600] border border-[#ffb600] text-sm rounded-full font-medium">
//           Latest News
//         </span>
//       </div>

//       <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 px-5">
//         <div className="md:row-span-2">
//           {news
//             .filter((n) => n.highlight)
//             .map((item) => (
//               <div
//                 key={item.id}
//                 className="rounded-2xl p-8 relative h-[380px] flex flex-col justify-end bg-cover bg-center"
//                 style={{
//                   backgroundImage: `linear-gradient(rgba(0,0,0,.45), rgba(0,0,0,.45)), url(${item.image})`,
//                 }}
//               >
//                 <ArrowBtn />

//                 <h2 className="lg:text-[28px] text-lg font-semibold text-white ">
//                   {item.title}
//                 </h2>

//                 {item.description && (
//                   <p className="mt-3 text-white text-lg">
//                     {item.description}
//                   </p>
//                 )}

//                 <p className="text-white text-sm mt-4">{item.date}</p>
//               </div>
//             ))}
//         </div>

//         <div className="flex flex-col gap-6">
//           {news
//             .filter((n) => !n.highlight)
//             .slice(0, 2)
//             .map((item) => (
//               <div
//                 key={item.id}
//                 className="rounded-2xl p-8 relative h-[180px] flex flex-col justify-between bg-cover bg-center"
//                 style={{
//                   backgroundImage: `linear-gradient(rgba(0,0,0,.45), rgba(0,0,0,.45)), url(${item.image})`,
//                 }}
//               >
//                 <ArrowBtn />
//                 <h2 className="lg:text-[28px] text-lg font-semibold text-white md:mt-15 mt-7">
//                   {item.title}
//                 </h2>
//                 <p className="text-white text-sm mt-1">{item.date}</p>
//               </div>
//             ))}
//         </div>
//       </div>

//       <hr className="mt-10 border border-[#e5e7eb]" />

//       <div className="max-w-6xl mx-auto flex gap-2 mt-6 px-2">
//         <div className="flex items-center bg-[#101828] text-white px-4 py-3 rounded-full w-[230px] gap-2 justify-between">
//           <span className="text-sm opacity-90">Search</span>
//           <img src="/icons/loupe.png" className="w-4 h-4" />
//         </div>

//         <div className="flex items-center bg-[#f2f2f2] px-5 py-3 rounded-full gap-4">
//           <span className="font-semibold text-[15px] text-black">Year</span>
//           <span className="text-gray-400 text-sm">2024</span>
//           <span className="text-gray-400 text-sm">2025</span>
//           <span className="text-gray-400 text-sm">2026</span>
//           <img src="/icons/Category.png" className="w-5 h-5 pr-1" />
//         </div>
//       </div>

//       <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 mt-10 px-5">
//         {news.slice(3, 8).map((item, index) => {
//           const isLast = index === 4;

//           return (
//             <div
//               key={item.id}
//               className={`
//                 rounded-2xl p-10 relative flex flex-col justify-between
//                 ${isLast ? "md:col-span-2 h-[220px]" : "h-[200px]"}
//                 bg-cover bg-center
//               `}
//               style={
//                 isLast
//                   ? { background: item.bg } 
//                   : {
//                       backgroundImage: `linear-gradient(rgba(0,0,0,.45), rgba(0,0,0,.45)), url(${item.image})`,
//                     }
//               }
//             >
//               <ArrowBtn />

//               <h2
//                 className="lg:text-[28px] text-lg font-semibold lg:mt-13 mt-4 md:mt-8"
//                 style={{ color: item.textColor || "#ffffff" }}
//               >
//                 {item.title}
//               </h2>

//               {item.description && (
//                 <p className="text-gray-200 text-sm mt-2">
//                   {item.description}
//                 </p>
//               )}

//               <p className="text-gray-300 text-sm">{item.date}</p>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// }

// const ArrowBtn = () => (
//   <button className="absolute -top-1 -right-1">
//     <div className="bg-white h-20 w-20 rounded-bl-4xl flex items-center justify-center">
//       <div className="bg-[#101828] h-16 w-16 rounded-full flex justify-center items-center ">
//         <span className="text-white text-5xl">↗</span>
//       </div>
//     </div>
//   </button>
// );
