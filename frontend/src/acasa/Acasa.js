import './Acasa.css'
const Acasa = () =>{
    return(
       <>
           <video autoPlay={true} muted={true} loop className={"video"}>
               <source src={"home.mp4"} type={"video/mp4"}/>
               Your browser does not support HTML5 video.
           </video>
           <div className={"welcome-text"}>Bun venit pe imobil.ro</div>
       </>

    )
}

export default Acasa;