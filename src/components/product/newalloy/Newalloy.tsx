import ProductPage from "@/components/product/ProductPage";

export default function Newalloy() {
  const contactInfo = {
    image: "/images/Aluminium-alloys.png",
    title: "Innovative New Alloy Technology",
    description:
      "We continuously develop and introduce new aluminium alloy formulations to meet evolving industry demands. Our research and development team works to create alloys that offer superior strength, durability, and performance characteristics for next-generation applications.",
      seconddescription:"Developed to meet high-strength demands, these alloys use reduced scandium (0.18%–0.5%) to lower production costs while significantly improving performance.Ideal for high-stress structural components in electric vehicles and aerospace.",
      secondtitle:"Low-Scandium Aluminium-Magnesium (Al-Mg-Sc) Alloys",
  };

  return (
    <ProductPage 
      title="New Alloy" 
      pageKey="NEWALLOY" 
      contactInfo={contactInfo}
    />
  );
}
