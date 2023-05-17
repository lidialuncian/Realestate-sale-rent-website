import * as React from 'react';
import PropTypes from 'prop-types';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import {useState} from "react";
import {MenuItem, Select, TextField} from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import axiosInstance from "../axios";

export default function Row(props) {
    const { row } = props;
    const [isModify, setIsModify] = useState(false);
    const [title, setTitle] = useState(row.title);
    const [description, setDescription] = useState(row.description);
    const [price, setPrice] = useState(row.price);
    const [surface, setSurface] = useState(row.surface);
    const [no_rooms, setNoRooms] = useState(row.no_rooms);
    const [type, setType] = useState(row.type);
    const [ad_type, setAdType] = useState(row.ad_type);
    const [adresa, setAdresa] = useState(row.adresa);
    const [oras, setOras] = useState(row.oras);
    const [judet, setJudet] = useState(row.judet);
    const [tara, setTara] = useState(row.tara);

    const updateAd = () => {
        let body = {
            title,
            description,
            price,
            surface,
            no_rooms,
            type,
            ad_type,
            tara,
            judet,
            oras,
            adresa
        }
        axiosInstance.put(`update-ad/${row.id}`, body)
            .then(res => {
                const val = res.data;
                setIsModify(false)
            })
            .catch(e => {
                console.log(e);
            })
    }

    const deleteAd = () => {
        axiosInstance.delete(`delete-ads/${row.id}`)
            .then(res => {
                const val = res.data;
                setIsModify(false)
                window.location.reload();
            })
            .catch(e => {
                console.log(e);
            })
    }
    return (
        <React.Fragment>
            <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                {!isModify &&
                    <>
                        <TableCell component="th" scope="row">
                            {row.id}
                        </TableCell>
                        <TableCell align="inherit">{title}</TableCell>
                        <TableCell align="inherit">{description}</TableCell>
                        <TableCell align="inherit">{price}</TableCell>
                        <TableCell align="inherit">{surface}</TableCell>
                        <TableCell align="inherit">{no_rooms}</TableCell>
                        <TableCell align="inherit">{type}</TableCell>
                        <TableCell align="inherit">{ad_type}</TableCell>
                        <TableCell align="inherit">{adresa}</TableCell>
                        <TableCell align="inherit">{oras}</TableCell>
                        <TableCell align="inherit">{judet}</TableCell>
                        <TableCell align="inherit">{tara}</TableCell>
                    </>
                }
                {isModify &&
                    <>
                        <TableCell component="th" scope="row">
                            {row.id}
                        </TableCell>
                        <TableCell align="inherit">
                            <TextField
                                type={"text"}
                                fullWidth
                                value={title}
                                onChange={(e)=>setTitle(e.target.value)}
                            />
                        </TableCell>
                        <TableCell align="inherit">
                            <TextField
                                type={"text"}
                                fullWidth
                                value={description}
                                onChange={(e)=>setDescription(e.target.value)}
                            />
                        </TableCell>
                        <TableCell align="inherit">
                            <TextField
                                type={"text"}
                                fullWidth
                                value={price}
                                onChange={(e)=>setPrice(e.target.value)}
                            />
                        </TableCell>
                        <TableCell align="inherit">
                            <TextField
                                type={"text"}
                                fullWidth
                                value={surface}
                                onChange={(e)=>setSurface(e.target.value)}
                            />
                        </TableCell>
                        <TableCell align="inherit">
                            <TextField
                                type={"text"}
                                fullWidth
                                value={no_rooms}
                                onChange={(e)=>setNoRooms(e.target.value)}
                            />
                        </TableCell>
                        <TableCell align="inherit">
                            <Select
                                value={type}
                                onChange={(e) =>setType(e.target.value)}
                            >
                                <MenuItem value={'house'}>House</MenuItem>
                                <MenuItem value={'apartment'}>Apartment</MenuItem>
                            </Select>
                        </TableCell>
                        <TableCell align="inherit">
                            <Select
                                value={ad_type}
                                onChange={(e) =>setAdType(e.target.value)}
                            >
                                <MenuItem value={'sale'}>Sale</MenuItem>
                                <MenuItem value={'rent'}>Rent</MenuItem>
                            </Select>
                        </TableCell>
                        <TableCell align="inherit">
                            <TextField
                                type={"text"}
                                fullWidth
                                value={adresa}
                                onChange={(e)=>setAdresa(e.target.value)}
                            />
                        </TableCell>
                        <TableCell align="inherit">
                            <TextField
                                type={"text"}
                                fullWidth
                                value={oras}
                                onChange={(e)=>setOras(e.target.value)}
                            />
                        </TableCell>
                        <TableCell align="inherit">
                            <TextField
                                type={"text"}
                                fullWidth
                                value={judet}
                                onChange={(e)=>setJudet(e.target.value)}
                            />
                        </TableCell>
                        <TableCell align="inherit">
                            <TextField
                                type={"text"}
                                fullWidth
                                value={tara}
                                onChange={(e)=>setTara(e.target.value)}
                            />
                        </TableCell>
                    </>
                }
                {isModify &&
                    <>
                        <EditIcon id={'edit'} onClick={updateAd}/>
                        <RemoveCircleIcon id={'delete'} onClick={deleteAd}/>
                    </>
                }
                {!isModify &&
                    <>
                        <EditIcon id={'edit'} onClick={()=>setIsModify(true)}/>
                        <RemoveCircleIcon id={'delete'} onClick={()=>setIsModify(true)}/>
                    </>
                }
            </TableRow>
        </React.Fragment>
    );
}

Row.propTypes = {
    row: PropTypes.shape({
        user_id: PropTypes.number.isRequired,
        deviceList: PropTypes.arrayOf(
            PropTypes.shape({
                device_id: PropTypes.number.isRequired,
                description: PropTypes.string.isRequired,
                address: PropTypes.string.isRequired,
                maxEnergyConsumption: PropTypes.number.isRequired,
            }),
        ).isRequired,
        name: PropTypes.string.isRequired,
    }).isRequired,
};
