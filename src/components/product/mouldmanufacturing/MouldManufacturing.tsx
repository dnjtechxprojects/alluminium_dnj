import ProductPage from "@/components/product/ProductPage";

export default function MouldManufacturing() {
  const contactInfo = {
    title: "High Production Capacity: 700 Moulds per Month",
    description:
      "Our mould manufacturing operations are designed to handle large volumes while maintaining the highest levels of precision and reliability. With a production capacity of over 700 moulds per month, we are equipped to support extensive extrusion operations across various industries, ensuring a consistent and reliable supply of high-quality moulds.",
      seconddescription:"Our mould manufacturing process is rooted in advanced technology and continuous innovation. We leverage cutting-edge tools and techniques to create moulds that are not only technologically superior but also cost-effective, ensuring that our customers receive the best value for their investment. Our focus on optimization and efficiency enables us to offer solutions that reduce waste, enhance productivity, and improve overall performance.",
      secondtitle:"Advanced Mould Manufacturing Solutions",

  };

  return <ProductPage title="Mould Manufacturing" pageKey="DIEMANUFACTURING" contactInfo={contactInfo} />;
}
