// import React from "react";
// import { Calendar } from "lucide-react";

// interface Article {
//   id: number;
//   tag: string;
//   image: string;
//   title: string;
//   desc: string;
//   date: string;
// }
// const articles: Article[] = [
//   {
//     id: 1,
//     tag: "Technology",
//     image: "/images/article.png",
//     title: "The Future of Smart Manufacturing in Aluminium Extrusion",
//     desc: "Exploring how AI and automation are revolutionizing the extrusion industry.",
//     date: "October 28, 2025",
//   },
//   {
//     id: 2,
//     tag: "Innovation",
//     image: "/images/article1.png",
//     title: "5 Innovations Driving Industrial Excellence",
//     desc: "Discover the latest technological advances transforming our production capabilities.",
//     date: "October 22, 2025",
//   },
//   {
//     id: 3,
//     tag: "Sustainability",
//     image: "/images/article2.png",
//     title: "Sustainable Practices in Modern Aluminium Manufacturing",
//     desc: "Our commitment to reducing environmental impact through green initiatives.",
//     date: "October 15, 2025",
//   },
// ];

// const Updates: React.FC = () => {
//   return (
//     <section className="py-16 px-8 lg:px-24 bg-white">
    
//       <div className="flex flex-col md:flex-row justify-between items-start mb-10">
//         <div>
//           <span className="inline-block px-4 py-1 mb-3 text-sm font-medium text-[#ffb600] border border-[#ffb600] bg-[rgba(255,182,0,0.1)] rounded-full">
//             Insights & Updates
//           </span>
//           <h2 className="text-3xl text-gray-900 mb-2">Recent Articles</h2>
//           <p className="text-[#4a5565]">
//             Insights, updates, and expertise from our team.
//           </p>
//         </div>
//          <button className="mt-6 bg-[#ffb600] text-white px-6 py-3 rounded-2xl font-medium transition-all hover:cursor-pointer hover:scale-95">
//           View All Articles →
//         </button>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//         {articles.map((article: Article) => (
//           <div
//             key={article.id}
//             className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-all"
//           >
//             <div className="relative">
//               <img
//                 src={article.image}
//                 alt={article.title}
//                 className="w-full h-56 object-cover"
//               />
//               <span className="absolute top-3 left-3 bg-[#ffb600] text-white text-xs px-3 py-1 rounded-full">
//                 {article.tag}
//               </span>
//             </div>

//             <div className="p-5">
//               <h3 className="text-lg text-gray-900 mb-2">{article.title}</h3>
//               <p className="text-sm text-gray-600 mb-4">{article.desc}</p>

//               <hr className="w-full mb-4 border-gray-200" />

//               <div className="flex items-center justify-between text-sm text-gray-500">
//                 <div className="flex items-center gap-2">
//                   <Calendar size={16} />
//                   {article.date}
//                 </div>
//                 <a
//                   href="#"
//                   className="text-[#ffb600] font-medium hover:underline flex items-center gap-1"
//                 >
//                   Read More →
//                 </a>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </section>
//   );
// };

// export default Updates;
