import { Carousel } from "flowbite-react";

// Import axios for API requests
import axios from 'axios';
import { useEffect, useState } from 'react';

export default function noticias() {
  const [banners, setBanners] = useState([]);
  const [bannersMobile, setBannersMobile] = useState([]); // Add this line

  // API key and endpoint
  const apiKey = "pat5NNlxpucv879MO.48d001f643ddbf57e49e7794eebfdb6c00acdd29f92c19585c90098df66eafa0";
  const endpoint = "https://api.airtable.com/v0/appP7uFMLFmBf5ben/Noticias?maxRecords=3&view=Todas";

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
      const bannerImgMobile = records.map(record => record.fields.Mobile); // Add this line
      // console.log("Data fetched successfully:", bannerImg.map(img => img));
      const bannerUrls = bannerImg.map(img => img[0].url);
      const bannerUrlsMobile = bannerImgMobile.map(img => img[0].url); // Add
       // Replace 'bannerUrl' with the actual field name
      setBanners(bannerUrls);
      setBannersMobile(bannerUrlsMobile); // Add this line
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
        <div className="h-32 sm:h-32 xl:h-32 2xl:h-32">
        <Carousel slideInterval={5000} indicators={false}>
        {banners.map((banner, index) => (
          <div>
            <div className='banner-container hidden md:block'>
              <img className='banner-image object-cover' src={banner} alt={`Banner ${index + 1}`} />
            </div>
            <div className='banner-container md:hidden'>
              <img className='banner-image object-cover mx-auto' src={bannersMobile[index]} alt={`Banner ${index + 1}`} />
            </div>
          </div>
        ))}
      </Carousel>
      </div>
    </>
  );
}
