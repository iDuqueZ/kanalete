// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

// Import required modules
import { Pagination, Autoplay, Navigation } from 'swiper/modules';

// Import axios for API requests
import axios from 'axios';
import { useEffect, useState } from 'react';

export default function noticias() {
  const [banners, setBanners] = useState([]);

  // API key and endpoint
  const apiKey = "pat5NNlxpucv879MO.48d001f643ddbf57e49e7794eebfdb6c00acdd29f92c19585c90098df66eafa0";
  const endpoint = "https://api.airtable.com/v0/appP7uFMLFmBf5ben/Table%201?maxRecords=3&view=Banner";

  useEffect(() => {
    // Fetch data from Airtable
    axios.get(endpoint, {
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
    })
    .then(response => {
      const records = response.data.records;
      const bannerImg = records.map(record => record.fields.Imagen);
      const bannerUrls = bannerImg.map(img => img[0].url);
       // Replace 'bannerUrl' with the actual field name
      setBanners(bannerUrls);
      console.log("Data fetched successfully:", bannerUrls);
    })
    .catch(error => {
      console.error("Error fetching data from Airtable:", error);
    });
  }, []);

  return (
    <>
        <h2 className="text-xl font-semibold text-zinc-800 mb-4">
            Noticias destacadas:
        </h2>
      <Swiper pagination={true} navigation={true} loop={true} modules={[Pagination, Autoplay, Navigation]} 
        autoplay={{
          delay: 6500,
          disableOnInteraction: false,
        }}
        className="mySwiper">
        {banners.map((banner, index) => (
          <SwiperSlide key={index}>
          <div className='banner-container'>
            <img className='banner-image' src={banner} alt={`Banner ${index + 1}`} />
          </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
