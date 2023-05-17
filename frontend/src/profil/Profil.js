import './Profil.css'
import {useEffect, useState} from "react";
import AdCard from "../vanzari/AdCard";
import axiosInstance from "../axios";
import AuthenticationService from "../AuthenticationService";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import {TextField} from "@mui/material";
import * as React from "react";

const Profil = () =>{

    const [first_name, setFirstName] = useState('')
    const [last_name, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [prefered_ads, setPreferedAds] = useState([])
    const [latitude, setLatitude] = useState('')
    const [longitude, setLongitude] = useState('')
    const [edit, setEdit] = useState(false)

    const userId= AuthenticationService.getUserId();

    const getFavourites = () =>{
        axiosInstance.get(`/all-fav/${userId}`)
            .then(res =>{
                let val = res.data
                setPreferedAds(val)
            })
            .catch(e => {
                console.log(e);
            })
    }
    const getUserData = () => {
        axiosInstance.get(`/user/${userId}`)
            .then(res=>{
                let val = res.data
                setFirstName(val.first_name)
                setLastName(val.last_name)
                setEmail(val.email)
                setPassword(val.password)
            })
            .catch(e => {
                console.log(e);
            })
    }

    useEffect(()=>{
        getFavourites()
        getUserData()
    }, [])

    const getlocation = () => {
        navigator.geolocation.getCurrentPosition(function(position) {
            console.log("Latitude is :", position.coords.latitude);
            console.log("Longitude is :", position.coords.longitude);
            localStorage.setItem('latitude', position.coords.latitude);
            localStorage.setItem('longitude', position.coords.longitude);
            setLatitude(position.coords.latitude);
            setLongitude(position.coords.longitude);
        });
    }

    const handleEdit = () => {
      setEdit(true)
    }

    const editProfile = () => {
        let body = {
            first_name,
            last_name,
            email,
            password
        }
        axiosInstance.put(`/update-user/${userId}`, body)
            .then(res=>{
                let val = res.data
                setEdit(false)
            })
            .catch(e => {
                console.log(e);
            })
    }
    return(
        <>
            <div className="split left">
                <div className={"up"}>
                    <img src="avatar1.png" alt="avatar"/>
                    <h2>{`${first_name}  ${last_name}`}</h2>

                    <LocationOnIcon id={'location'} onClick={getlocation}> Location </LocationOnIcon>
                    {!edit && <BorderColorIcon id={'edit'} onClick={handleEdit}> Edit Profile</BorderColorIcon>}
                    {edit && <BorderColorIcon id={'edit-clicked'} onClick={editProfile}> Edit Profile</BorderColorIcon>}

                </div>

                {!edit &&
                    <div className={"text-profil"}>
                        <h2>Email: {email}</h2>
                        <h2>Parola:  ***** </h2>
                        <h2>Latitudine: {latitude}</h2>
                        <h2>Longitudine: {longitude}</h2>
                    </div>
                }
                {edit &&
                    <div className={"down-edit"}>
                        <h4>
                            <TextField
                                margin={"normal"}
                                label="Prenume"
                                placeholder="Prenume"
                                value={first_name}
                                onChange={(e) => setFirstName(e.target.value)}
                            />
                        </h4>
                        <h4>
                            <TextField
                                margin={"normal"}
                                label="Nume"
                                placeholder="Nume"
                                value={last_name}
                                onChange={(e) => setLastName(e.target.value)}
                            />
                        </h4>
                        <h4>
                            <TextField
                                margin={"normal"}
                                label="Email"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </h4>
                        <h4>
                            <TextField
                                margin={"normal"}
                                label="Parola"
                                placeholder="Parola"
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </h4>
                    </div>
                }
            </div>

            <div className="split right">
                <div>
                    {prefered_ads.map(res => <AdCard id={res.id}
                                            title={res.title}
                                            description={res.description}
                                            price={res.price}
                                            surface={res.surface}
                                            no_rooms={res.no_rooms}
                                            type={res.type}
                                            ad_type={res.ad_type}
                        />)}
                </div>
            </div>

        </>
    )
}
export default Profil;