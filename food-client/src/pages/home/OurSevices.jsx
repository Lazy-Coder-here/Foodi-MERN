import React from "react";

const serviceLists = [
  {
    id: 1,
    title: "Catering",
    desc: "Delight your guests with our flavors and  presentation",
    image: "/images/home/services/icon1.png",
  },
  {
    id: 2,
    title: "Fast delivery",
    desc: "We deliver your order promptly to your door",
    image: "/images/home/services/icon2.png",
  },
  {
    id: 3,
    title: "Online Ordering",
    desc: "Explore menu & order with ease using our Online Ordering",
    image: "/images/home/services/icon3.png",
  },
  {
    id: 4,
    title: "Gift Cards",
    desc: "Give the gift of exceptional dining with Foodi Gift Cards",
    image: "/images/home/services/icon4.png",
  },
];

const OurSevices = () => {
  return (
    <div className="section-container my-16">
      <div className="flex flex-col md:flex-row items-center justify-between gap-12">
        {/* text */}
        <div className="md:w-1/2">
          <div className="text-left md:w-4/5">
            <p className="subtitle">Our Story & Services</p>
            <h2 className="title">Our Culinary Journey And Services</h2>
            <p className="my-5 text-secondary leading-[30px]">
              Rooted in passion, we curate unforgettable dining experiences and
              offer exceptional services, blending culinary artistry with warm
              hospitality.
            </p>

            <button className="btn bg-green text-white px-8 py-3 rounded-full">
              Explore
            </button>
          </div>
        </div>

        {/* images */}
        <div className="md:w-1/2">
          <div className="grid sm:grid-cols-2 grid-cols-1 gap-8">
            {serviceLists.map((service, i) => (
              <div
                key={i}
                className="shadow-md rounded-sm py-5 px-4 text-center space-y-2 text-green cursor-pointer hover:border-indigo-600 transition-all duration-200 hover:border"
              >
                <img src={service.image} alt="" className="mx-auto" />
                <h5 className="pt-3 font-semibold">{service.title}</h5>
                <p className="text-[#90BD95]">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OurSevices;
