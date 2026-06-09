import React from "react";
import CategoryBar from "../components/CategoryBar";
import HeroSection from "../components/HeroSection";
import PromoSection from "../components/PromoSection";
import DealShowcase from "../components/DealShowcase";
import SupplierQuoteSection from "../components/SupplierQuoteSection";
import RecommendedItems from "../components/RecommendedItems";
import ExtraServices from "../components/ExtraServices";
import SuppliersByRegion from "../components/SuppliersByRegion";
import Newsletter from "../components/Newsletter";
import heroImg from "../assets/images/hero-placeholder.png";
import promoBgImg1 from "../assets/images/promoSection-bg-img1.svg";
import promoBgImg2 from "../assets/images/promoSection-bg-img2.svg";

const Home = () => {
  const promoSections = [
    {
      title: "Home and outdoor",
      subtitle: "Best deals on furniture and home items",
      accent: "bg-amber-50",
      image: promoBgImg1,
      items: [
        { name: "Soft chairs", price: 19 },
        { name: "Sofa & chair", price: 19 },
        { name: "Kitchen dishes", price: 19 },
        { name: "Smart watches", price: 19 },
        { name: "Kitchen mixer", price: 100 },
        { name: "Blenders", price: 39 },
        { name: "Home appliance", price: 19 },
        { name: "Coffee maker", price: 10 },
      ],
    },
    {
      title: "Consumer electronics and gadgets",
      subtitle: "Popular items for everyday use",
      accent: "bg-blue-50",
      image: promoBgImg2,
      items: [
        { name: "Smart watches", price: 19 },
        { name: "Cameras", price: 89 },
        { name: "Headphones", price: 10 },
        { name: "Smart watches", price: 90 },
        { name: "Gaming set", price: 35 },
        { name: "Laptops & PC", price: 340 },
        { name: "Smartphones", price: 19 },
        { name: "Electric kettle", price: 240 },
      ],
    },
  ];

  const dealsSection = {
    title: "Deals and offers",
    subtitle: "Hygiene equipments",
    timer: [
      { value: "04", label: "Days" },
      { value: "13", label: "Hour" },
      { value: "34", label: "Min" },
      { value: "56", label: "Sec" },
    ],
    items: [
      { name: "Smart watches", image: heroImg, discount: "-25%" },
      { name: "Laptops", image: heroImg, discount: "-15%" },
      { name: "GoPro cameras", image: heroImg, discount: "-40%" },
      { name: "Headphones", image: heroImg, discount: "-25%" },
      { name: "Canon cameras", image: heroImg, discount: "-25%" },
    ],
  };

  return (
    <>
      <CategoryBar />
      <HeroSection />

      <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">
        <DealShowcase
          title={dealsSection.title}
          subtitle={dealsSection.subtitle}
          timer={dealsSection.timer}
          items={dealsSection.items}
        />
        {promoSections.map((section) => (
          <PromoSection
            key={section.title}
            title={section.title}
            subtitle={section.subtitle}
            accent={section.accent}
            image={section.image}
            items={section.items}
          />
        ))}
      </div>
      <SupplierQuoteSection />
      <RecommendedItems />
      <ExtraServices />
      <SuppliersByRegion />
      <Newsletter />
    </>
  );
};

export default Home;
