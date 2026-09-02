import ProductPage from "@/components/product/ProductPage";

export default function Fabrication() {
  const contactInfo = {
    image: "/images/fab.png",
    title: "Why Aluminium Fabrication Matters",
    description:
      "Aluminium is a versatile and highly sought-after material in modern manufacturing due to its lightweight, corrosion-resistant, and recyclable properties. Its strength-to-weight ratio makes it ideal for applications where durability and weight reduction are key, such as in transportation, aerospace, construction, and renewable energy.",
      seconddescription:"We specialize in cutting aluminium to custom specifications using advanced CNC cutting technology, ensuring accuracy and precision in every project. Whether it’s simple shapes or complex geometries, our cutting processes allow for consistent and repeatable results.",
      secondtitle:"Custom Cutting and Forming",
  };

  return (
    <ProductPage 
      title="Fabrication" 
      pageKey="FABRICATION" 
      contactInfo={contactInfo}
    />
  );
}
