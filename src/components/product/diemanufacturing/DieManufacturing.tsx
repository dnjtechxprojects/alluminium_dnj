import ProductPage from "@/components/product/ProductPage";

export default function DieManufacturing() {
  const contactInfo = {
    image: "/images/die.png",
    title: "High Production Capacity: 700 Dies per Month",
    description:
      "Our die manufacturing operations are designed to handle large volumes while maintaining the highest levels of precision and reliability. With a production capacity of over 700 dies per month, we are equipped to support extensive extrusion operations across various industries, ensuring a consistent and reliable supply of high-quality dies.",
      seconddescription:"Our die manufacturing process is rooted in advanced technology and continuous innovation. We leverage cutting-edge tools and techniques to create dies that are not only technologically superior but also cost-effective, ensuring that our customers receive the best value for their investment. Our focus on optimization and efficiency enables us to offer solutions that reduce waste, enhance productivity, and improve overall performance.",
      secondtitle:"Advanced Die Manufacturing Solutions",

  };

  return <ProductPage title="Die Manufacturing" pageKey="DIEMANUFACTURING" contactInfo={contactInfo} />;
}
