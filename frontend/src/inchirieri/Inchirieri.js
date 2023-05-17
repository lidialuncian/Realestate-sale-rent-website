import '../vanzari/Vanzari.css'
import {useEffect, useState} from "react";
import axiosInstance from "../axios";
import AdCard from "../vanzari/AdCard";
const Inchirieri = () =>{

    const [rents, setRents] = useState([]);

    const getRents = () =>{
        axiosInstance.get("/all-rents")
            .then(res => {
                const val = res.data;
                setRents(val)
            })
            .catch(e => {
                console.log(e);
            })
    }

    useEffect(()=>{
        getRents()
    }, [])

    return (
        <>
            <section id={"case"}>
                <h1>Case de inchiriat:</h1>
                {rents?.filter(r => r.type === 'house')
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
                    <h1>Apartamente de inchiriat:</h1>
                    {rents?.filter(r => r.type === 'apartment')
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
export default Inchirieri;