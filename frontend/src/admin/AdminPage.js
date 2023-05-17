import {useEffect, useState} from "react";
import axiosInstance from "../axios";
import {
    TableBody,
    TableContainer,
    Table,
    TableRow,
    TableCell,
    Typography,
    TextField,
    MenuItem,
    Select, NativeSelect
} from "@mui/material";
import Row from './Row'
import './AdminPage.css'
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Button from "@mui/material/Button";
import * as React from "react";
const AdminPage = () =>{

    const [ads, setAds] = useState([]);
    const [add, setAdd] = useState(false)

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [surface, setSurface] = useState('');
    const [no_rooms, setNoRooms] = useState('');
    const [type, setType] = useState('house');
    const [ad_type, setAdType] = useState('sale');

    const getAllAds = () =>{
        axiosInstance.get("/all-ads")
            .then(res => {
                const val = res.data;
                setAds(val)
            })
            .catch(e => {
                console.log(e);
            })
    }

    useEffect(()=>{
        getAllAds()
    }, [])

    const openForm = () => {
      setAdd(true)
    }
    
    const addAd = () => {
        let body={
            title,
            description,
            price,
            surface,
            no_rooms,
            type,
            ad_type
        }
        axiosInstance.post('/add-ad', body)
            .then(res => {
                const val = res.data;
                setAdd(false)
                window.location.reload()
            })
            .catch(e => {
                console.log(e);
            })
    }
    return(
        <>
            <div className={"tableDiv"}>
                <TableContainer>
                    <Table aria-label="collapsible table">
                        <thead>Ads
                        <TableRow id={'antet'}>
                            <TableCell />
                            <TableCell id={'antet'} align="inherit">Title</TableCell>
                            <TableCell id={'antet'} align="inherit">Description</TableCell>
                            <TableCell id={'antet'} align="inherit">Price</TableCell>
                            <TableCell id={'antet'} align="inherit">Surface</TableCell>
                            <TableCell id={'antet'} align="inherit">No of Rooms</TableCell>
                            <TableCell id={'antet'} align="inherit">Type</TableCell>
                            <TableCell id={'antet'} align="inherit">Ad Type</TableCell>
                            <TableCell id={'antet'} align="inherit">Adresa</TableCell>
                            <TableCell id={'antet'} align="inherit">Oras</TableCell>
                            <TableCell id={'antet'} align="inherit">Judet</TableCell>
                            <TableCell id={'antet'} align="inherit">Tara</TableCell>
                        </TableRow>
                        </thead>
                        <TableBody>
                            {ads?.map(row => (<Row id={row.id} row={row}/>))}
                        </TableBody>
                        {!add && <AddCircleIcon fontSize={'large'} id={'add'} onClick={openForm}/>}
                        {add &&
                            <div>
                                <form onSubmit={addAd} autoComplete={"off"}>
                                    <Typography variant="h6" color="textPrimary" component="h6" marginTop={'10px'}>
                                        New Ad
                                    </Typography>
                                    <div>
                                        <div className={'addAd'}>
                                            <TextField
                                                required={true}
                                                label="Title"
                                                placeholder="Title"
                                                value={title}
                                                onChange={(e) => setTitle(e.target.value)}
                                            />
                                            <TextField
                                                required={true}
                                                type={'text'}
                                                label="Description"
                                                placeholder="Description"
                                                value={description}
                                                onChange={(e) => setDescription(e.target.value)}
                                            />
                                            <TextField
                                                required={true}
                                                label="Price"
                                                placeholder="Price"
                                                value={price}
                                                onChange={(e) => setPrice(e.target.value)}
                                            />
                                            <TextField
                                                required={true}
                                                label="Surface"
                                                placeholder="Surface"
                                                value={surface}
                                                onChange={(e) => setSurface(e.target.value)}
                                            />
                                            <TextField
                                                required={true}
                                                label="No of Rooms"
                                                placeholder="No of Rooms"
                                                value={no_rooms}
                                                onChange={(e) => setNoRooms(e.target.value)}
                                            />
                                            <Select
                                                required={true}
                                                value={type}
                                                label={'Type'}
                                                defaultValue={'house'}
                                                onChange={(e) =>setType(e.target.value)}
                                            >
                                                <MenuItem value={'house'}>House</MenuItem>
                                                <MenuItem value={'apartment'}>Apartment</MenuItem>
                                            </Select>

                                            <Select
                                                required={true}
                                                value={ad_type}
                                                label={'Ad Type'}
                                                defaultValue={'sale'}
                                                onChange={(e) =>setAdType(e.target.value)}
                                            >
                                                <MenuItem value={'sale'}>Sale</MenuItem>
                                                <MenuItem value={'rent'}>Rent</MenuItem>
                                            </Select>
                                        </div>

                                        <div>
                                            <Button
                                                id={'add-button'}
                                                variant="contained"
                                                type="submit"
                                            >Add</Button>
                                            <Button
                                                id={'back-button'}
                                                variant="contained"
                                                type="submit"
                                                onClick={()=>setAdd(false)}
                                            >Back</Button>
                                        </div>
                                    </div>

                                </form>
                            </div>
                        }
                    </Table>
                </TableContainer>
            </div>
        </>
    )
}
export default AdminPage