import './Vanzari.css'
import './AdCard.css'
import FavoriteIcon from '@mui/icons-material/Favorite';
import AuthenticationService from "../AuthenticationService";
import axiosInstance from "../axios";
import React, {useState} from "react";
import VisibilityIcon from '@mui/icons-material/Visibility';
import history from "../history";

const AdCard = (props) => {

    console.log(props)
    const [userId, setUserId] = useState(AuthenticationService.getUserId())
    const [adId, setAdId] = useState(props.id)
    const [heartClicked, setHeartClicked] = useState(false)

    let image = "";
    if(props.type === "house"){
        image = "h1.jpg" ;
    }
    else{
        image = "ap.jpg";
    }

    const addFavourite = () =>{
        console.log(props.id)
        setUserId(AuthenticationService.getUserId())
        setAdId(props.id)
        axiosInstance.post(`/add-fav/${adId}/${userId}`)
            .then(res => {
                const val = res.data;
                console.log(val)
                setHeartClicked(true)
            })
            .catch(e => {
                console.log(e);
            })
    }

    const removeFavourite = () =>{
        console.log(props.id)
        setUserId(AuthenticationService.getUserId())
        setAdId(props.id)
        axiosInstance.put(`/remove-fav/${adId}/${userId}`)
            .then(res => {
                const val = res.data;
                console.log(val);
                setHeartClicked(false)
                window.location.reload()
            })
            .catch(e => {
                console.log(e);
            })
    }

    return(
        <article className="anunt">
            <div className="imagine">
                <img className="anunt-img" src={image} alt="casa"/>
            </div>
            <div className="anunt-text-box">
                <h2 className="anunt-titlu">{props.title}</h2>
                <div className="anunt-bar"/>
                <div className="pret">{props.no_rooms} camere - {props.surface}mp - {props.price} euro</div>
                <p className="anunt-text">{props.description}
                </p>
                <div id={"icons"}>
                    <VisibilityIcon id={'view'} onClick={()=> {
                        history.push(`/anunt/${props.id}`)
                        window.location.reload()
                    }}/>
                    {!heartClicked && <FavoriteIcon id={'heart'} onClick={addFavourite}/>}
                    {heartClicked && <FavoriteIcon id={'heart-clicked'} onClick={removeFavourite}/>}
                </div>
            </div>
        </article>
    )
}
export default AdCard;