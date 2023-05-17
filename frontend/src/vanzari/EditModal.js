import React, {useState} from "react";
import Modal from 'react-modal';
import Button from '@mui/material/Button';
import {TextField} from "@material-ui/core";
import './AdCard.css'
import axiosInstance from "../axios";

const EditModal = ({isModalOpen, closeButtonCallback, ad}) =>{

    const [title, setTitle] = useState(ad.title);
    const [description, setDescription] = useState(ad.description);
    const [price, setPrice] = useState(ad.price);
    const [surface, setSurface] = useState(ad.surface);
    const [no_rooms, setNoRooms] = useState(ad.no_rooms);
    const [type, setType] = useState(ad.type); // house - apartment
    const [ad_type, setAdType] = useState(ad.ad_type); // sale- rent

    const handleSubmit = (event) => {
        event.preventDefault()
        const body = {
            title,
            description,
            price,
            surface,
            no_rooms,
            type,
            ad_type
        }

        axiosInstance.put(`update-ad/${ad.id}`)
            .then()
    }



    return(
        <>
            <Modal
                open={isModalOpen}
            >
                <form onSubmit={handleSubmit}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required={true}
                        fullWidth
                        id="title"
                        value={title}
                        label="Title"
                        autoComplete="string"
                        onChange={(e) => setTitle(e.target.value)}
                        autoFocus
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required={true}
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        onChange={(e) => setDescription(e.target.value)}
                        autoComplete="current-password"
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color='primary'
                    >
                        Sign In
                    </Button>

                </form>
            </Modal>
        </>
    )
}

export default EditModal