import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import banner1 from "../../../src/assets/images/slider-1.jpg";
import banner2 from "../../../src/assets/images/slider-2.jpg";
import banner3 from "../../../src/assets/images/slider-3.jpg";
import banner4 from "../../../src/assets/images/slider-4.jpg";
import banner5 from "../../../src/assets/images/slider-5.jpg";

const Banner = () => {
  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 4000,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    pauseOnHover: false,
    fade: true, // smooth fade effect
  };

  const banners = [banner1, banner2, banner3, banner4, banner5];

  return (
    <section className="relative h-[300px] md:h-[550px] lg:h-[650px] overflow-hidden">
      <Slider {...settings} className="h-full">
        {banners.map((img, idx) => (
          <div key={idx} className="relative h-[300px] md:h-[550px] lg:h-[650px]">
            {/* Background Image */}
            <div
              className="absolute inset-0 w-full h-full bg-cover bg-center"
              style={{
                backgroundImage: `url(${img})`,
              }}
            ></div>

            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-900/60 via-blue-800/50 to-blue-700/40"></div>

            {/* Content */}
            <div className="relative z-10 flex flex-col items-center justify-center text-center text-white px-6 space-y-6 h-full">
              <h1 className="text-3xl md:text-5xl font-bold drop-shadow-lg">
                Welcome to <br /> <span className="text-blue-300">ISTEBRA Hostel</span>
              </h1>
              <p className="text-base md:text-lg lg:text-xl max-w-2xl text-gray-200 drop-shadow">
                Easily manage student meals, reviews, and requests efficiently in your university hostel.
              </p>
              <div className="flex w-full sm:w-auto">
                <input
                  type="text"
                  placeholder="Search for meals or reviews..."
                  className="w-full sm:w-72 px-4 py-2 rounded-l-lg text-black focus:outline-none bg-gray-100 shadow-inner"
                />
                <button className="hover:bg-blue-900 bg-gradient-to-r from-blue-600 to-blue-800 text-white px-6 py-2 rounded-r-lg font-semibold transition-all duration-300 shadow-md hover:shadow-lg">
                  Search
                </button>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </section>
  );
};

export default Banner;
