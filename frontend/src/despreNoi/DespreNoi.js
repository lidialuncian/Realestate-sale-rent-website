import './DespreNoi.css'
const DespreNoi = () =>{
    return (
        <>
            <div className={"page"}>
                <div className={"container-new"}>
                    <div className={"box"}>
                        <div className={"text"}>
                            <h1>Cine suntem noi?</h1>
                            <p>     Misiunea noastra este sa oferim o experienta inedita clientilor nostri</p>
                            <p> in toate procesele tranzactionale imobiliare prin: </p>
                            <p> ‣ identificarea si satisfacerea nevoilor unice ale fiecarui client</p>
                            <p> ‣ consiliere profesionala si sfatuire </p>
                            <p> ‣ atingerea obiectivelor imobiliare pentru clientii nostri</p>
                            <p> ‣ oferirea sigurantei tranzactionale</p>
                            <p> ‣ analizare si actualizare constanta a informatiilor din piata imobiliara pentru a profita de orice oportunitate in interesul clientilor nostri</p>
                        </div>
                    </div>
                    <div className="video-responsive">
                        <iframe
                            width="853"
                            height="480"
                            src={'https://www.youtube.com/embed/tSOP4SyqvrA'}
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            title="Embedded youtube"
                        />
                    </div>
                </div>

                <div className={"images"}>
                    <img src={"ap.jpg"} alt={"room"}/>
                    <img src={"ap2.jpg"} alt={"room"}/>
                    <img src={"ap3.jpg"} alt={"room"}/>
                </div>
            </div>
        </>
    )
}

export default DespreNoi;