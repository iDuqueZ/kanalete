import { Carousel } from "flowbite-react";

// Import axios for API requests
import axios from 'axios';
import { useEffect, useState } from 'react';

export default function App() {
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
      <div className="h-72 sm:h-80 xl:h-96 2xl:h-96">
      <Carousel slideInterval={5000} leftControl=" " rightControl=" ">
        {banners.map((banner, index) => (
          <img key={index} src={banner} alt={`Banner ${index + 1}`} className="w-full h-full object-cover" />
        ))}
      </Carousel>
    </div>
    </>
  );
}
