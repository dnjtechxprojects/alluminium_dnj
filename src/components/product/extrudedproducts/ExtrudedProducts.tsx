import ProductPage from "@/components/product/ProductPage";

export default function ExtrudedProducts() {
  const contactInfo = {
    image: "/images/extruded.png",
    title: "X-ray Color Sorting and Shredding Cycle: Aluminium Recycling",
    description:
      "As part of our commitment to sustainability and quality, we utilize an X-ray color sorting system for high-efficiency aluminium material separation. This system processes up to 5 metric tons per hour, ensuring that only the highest-quality aluminium scrap is recycled. ",
      seconddescription:"To ensure optimal melt quality, National Industries operates four rotary melt furnaces, each capable of handling 6 to 18 tons per batch. These furnaces are integral to our production process, allowing us to produce consistent, high-quality molten aluminium that meets the rigorous demands of extrusion.",
      secondtitle:"Rotary Melt Furnaces: Enhanced Aluminium Melting Capacity",
  };

  return (
    <ProductPage 
      title="Extruded Products" 
      pageKey="EXTRUDEDPRODUCTS" 
      contactInfo={contactInfo}
    />
  );
}
