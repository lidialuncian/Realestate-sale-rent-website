import './Vanzari.css'
import {useState, useEffect} from "react";
import axiosInstance from "../axios";
import AdCard from "./AdCard";
const Vanzari = () =>{

    const [sales, setSales] = useState([]);

    const getSales = () =>{
        axiosInstance.get("/all-sales")
            .then(res => {
                const val = res.data;
                setSales(val)
            })
            .catch(e => {
                console.log(e);
            })
    }

    useEffect(()=>{
        getSales()
    }, [])

    return (
        <>
            <section id={"case"}>
                <h1>Case de vanzare:</h1>
                {sales?.filter(r => r.type === 'house')
                    .map(res => <AdCard id={res.id}
                                        title={res.title}
                                        description={res.description}
                                        price={res.price}
                                        surface={res.surface}
                                        no_rooms={res.no_rooms}
                                        type={res.type}
                                        ad_type={res.ad_type}
                />)}

            </section>
            <section id={"apartamente"}>
                <h1>Apartamente de vanzare:</h1>
                {sales?.filter(r => r.type === 'apartment')
                    .map(res => <AdCard id={res.id}
                                        title={res.title}
                                        description={res.description}
                                        price={res.price}
                                        surface={res.surface}
                                        no_rooms={res.no_rooms}
                                        type={res.type}
                                        ad_type={res.ad_type}
                    />)}
            </section>
            <div className={"foot"}/>
        </>

    )
}

export default Vanzari;