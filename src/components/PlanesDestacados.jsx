import React, { useState, useEffect } from "react";
import axios from "axios";

export default function PlanesDestacados() {
    const [productos, setProductos] = useState([]);

    // API key and endpoint
    const apiKey = "pat5NNlxpucv879MO.48d001f643ddbf57e49e7794eebfdb6c00acdd29f92c19585c90098df66eafa0";
    const endpoint = "https://api.airtable.com/v0/appP7uFMLFmBf5ben/ProductosDestacados?maxRecords=6&view=Destacados";

    useEffect(() => {
        axios.get(endpoint, {
            headers: { Authorization: `Bearer ${apiKey}` }
        })
        .then(response => {
            setProductos(response.data.records);
        })
        .catch(error => {
            console.error("Error fetching data: ", error);
        });
    }, []);

    return (
        <div className="relative">
            <div className="absolute -top-20 -right-2 -z-10">
                <img src="/fondo2.png" alt="Fondo" className="w-80 h-80 object-cover" />
            </div>

            <h2 className="text-xl font-semibold text-zinc-800 mb-4 max-w-screen-lg mx-auto px-5 md:px-0">
                Planes destacados:
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-screen-lg mx-auto px-5 md:px-0">
                {productos.map(producto => (
                    <div key={producto.id} className="bg-zinc-50 border-2 border-zinc-100 rounded-lg shadow-md">
                        <img src={producto.fields.Imagen[0].thumbnails.large.url} alt={producto.fields.Name} className="w-full h-48 object-cover rounded-t-md" />
                        <div className="p-4">
                            <h2 className="text-xl font-semibold mt-2">{producto.fields.Name}</h2>
                            <p className="text-gray-700">{producto.fields.Description}</p>
                            <p className="text-lg font-bold mt-2">${(producto.fields.Price * (1 - producto.fields.Promo)).toFixed(2)}</p>
                        </div>
                    </div>
                ))}
            </div>
            
            <div className="absolute -bottom-40 left-0 -z-10">
                <img src="/fondo1.png" alt="Fondo" className="w-80 h-80 object-cover" /> 
            </div>
        </div>
    );
}
