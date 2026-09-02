// import React from "react";
// import { TrendingUp, Target, Award, Globe2 } from "lucide-react";

// interface ImpactItem {
//   icon: React.ReactNode;
//   number: string;
//   text: string;
// }
// const Impact: React.FC = () => {
//   const data: ImpactItem[] = [
//     { icon: <TrendingUp size={26} />, number: "0", text: "Years of Experience" },
//     { icon: <Target size={26} />, number: "0", text: "Industries Served" },
//     { icon: <Award size={26} />, number: "0", text: "Certifications" },
//     { icon: <Globe2 size={26} />, number: "0", text: "Countries Export" },
//   ];
//   return (
//     <div
//       className="py-16 bg-cover bg-center text-white mt-17"
//       style={{
//         backgroundImage: "url('/images/process-bg.png')",
//       }}
//     >
//       <div className="flex flex-col items-center px-4">
//        <div className="text-[#FFB600] text-sm flex justify-center items-center h-9 w-44 border border-[#FFB600] rounded-3xl mb-4 bg-[rgba(255,182,0,0.15)]">
//           Our Impact
//         </div>
//         <h2 className="text-5xl text-center mb-12">
//           Leading the Industry
//         </h2>
//         <div className="flex flex-wrap justify-center gap-33 ">
//           {data.map((item, index) => (
//             <div key={index} className="flex flex-col items-center text-center">
//               <div className="h-14 w-14 flex justify-center items-center rounded-xl bg-[#FFB600] text-black shadow-md mb-4">
//                 {item.icon}
//               </div>
//               <h3 className="text-5xl ">{item.number}</h3>
//               <p className="text-sm text-[#99a1af] mt-1">{item.text}</p>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };
// export default Impact;
