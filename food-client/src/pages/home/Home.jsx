import React from "react";
import Banner from "../../components/Banner";
import Categories from "./Categories";
import SpecialDishes from "./SpecialDishes";
import Testimonials from "./Testimonials";
import OurSevices from "./OurSevices";

const Home = () => {
  return (
    <div>
      <Banner />
      <Categories />
      <SpecialDishes />
      <Testimonials />
      <OurSevices />
    </div>
  );
};

export default Home;
