import React, { useState, useEffect } from "react";
import axios from "axios";
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export default function PlanesDestacados() {
    const [productos, setProductos] = useState([]);
    const [loading, setLoading] = useState(true);

    // API key and endpoint
    const apiKey = "pat5NNlxpucv879MO.48d001f643ddbf57e49e7794eebfdb6c00acdd29f92c19585c90098df66eafa0";
    const endpoint = "https://api.airtable.com/v0/appP7uFMLFmBf5ben/ProductosDestacados?maxRecords=6&view=Destacados";

    useEffect(() => {
        axios.get(endpoint, {
            headers: { Authorization: `Bearer ${apiKey}` }
        })
        .then(response => {
            setProductos(response.data.records);
            setLoading(false);
        })
        .catch(error => {
            console.error("Error fetching data: ", error);
            setLoading(false);
        });
    }, []);

    function formatoMoneda(precio) {
        return precio.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
    }

    return (
        <div className="relative">
            <div className="absolute hidden md:block -top-16 md:-top-24 right-0 -z-10">
                <img src="/fondo2.png" alt="Fondo" className="w-60 h-60 md:w-80 md:h-80 object-cover" />
            </div>

            <h2 className="text-xl font-semibold text-zinc-800 mb-4 max-w-screen-lg mx-auto px-5 md:px-0">
                Planes destacados:
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-screen-lg mx-auto px-5 md:px-0">
                {loading ? (
                    Array.from({ length: 6 }).map((_, index) => (
                        <div key={index} className="bg-zinc-50 border-2 border-zinc-100 rounded-lg shadow-md">
                            <Skeleton height={192} />
                            <div className="p-4">
                                <Skeleton height={24} />
                                <Skeleton count={3} />
                                <Skeleton height={24} width="50%" />
                            </div>
                        </div>
                    ))
                ) : (
                    productos.map(producto => (
                        <a key={producto.id} href={producto.fields.Link} className="group">
                            <div className="bg-zinc-50 border-2 border-zinc-100 group-hover:border-green-700 rounded-lg shadow-md">
                                <img src={producto.fields.Imagen[0].thumbnails.large.url} alt={producto.fields.Name} className="w-full h-48 object-cover rounded-t-md" />
                                <div className="p-4">
                                    <h2 className="text-xl font-semibold mt-2 group-hover:text-green-700">{producto.fields.Name}</h2>
                                    <p className="text-gray-700">{producto.fields.Description}</p>
                                    <div className="flex flex-col">
                                        <span className="flex">
                                            <p className="text-sm text-zinc-600 mt-2 line-through">${formatoMoneda(producto.fields.Price)}</p> 
                                            <p className="text-green-500 text-sm font-semibold mt-2 ml-1">-{producto.fields.Promo * 100}%</p>
                                        </span>
                                        <p className="text-lg font-semibold">${formatoMoneda((producto.fields.Price * (1 - producto.fields.Promo)))}</p>
                                    </div>
                                </div>
                            </div>
                        </a>
                    ))
                )}
            </div>
            
            <div className="absolute -bottom-40 left-0 -z-10">
                <img src="/fondo1.png" alt="Fondo" className="w-60 h-60 md:w-80 md:h-80 object-cover" /> 
            </div>
        </div>
    );
}

