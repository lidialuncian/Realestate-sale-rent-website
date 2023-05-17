import {useParams} from "react-router-dom";
import axiosInstance from "../axios";
import * as React from "react";
import {useEffect, useState} from "react";
import './AnuntPage.css'
import {InputLabel, MenuItem, Select} from "@mui/material";
import dayjs from "dayjs";
import {DemoContainer} from '@mui/x-date-pickers/internals/demo';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {DateCalendar} from '@mui/x-date-pickers/DateCalendar';
import Button from "@mui/material/Button";
import AuthenticationService from "../AuthenticationService";
import moment from "moment";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import LeaderboardIcon from '@mui/icons-material/Leaderboard';

import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import AppointmentsChart from "./AppointmentsChart";


const AnuntPage = () =>{

    const anunt = useParams()
    const user = AuthenticationService.getUserId()
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState('')
    const [surface, setSurface] = useState('')
    const [no_rooms, setNoRooms] = useState('')
    const [type, setType] = useState('')
    const [ad_type, setAdType] = useState('')
    const [adresa, setAdresa] = useState('')
    const [oras, setOras] = useState('')
    const [judet, setJudet] = useState('')
    const [tara, setTara] = useState('')
    const [programari, setProgramari] = useState([])

    const [date, setDate] = useState(dayjs(new Date()))

    const allHours = ['09:00:00', '10:00:00',
        '11:00:00', '12:00:00', '13:00:00', '14:00:00', '15:00:00', '16:00:00',
        '17:00:00', '18:00:00']
    const [availableHours, setAvailableHours] = useState([])
    const [hour, setHour] = useState("")
    const [loaded, setLoaded] = useState(true)

    const [allAppointments, setAllApointmnets] = useState([])


    // admin page
    const isAdmin = AuthenticationService.isAdminLoggedIn()
    const [calendarOn, setCalendarOn] =useState(false)
    const [statOn, setStatOn] = useState(false)
    const [events, setEvents] = useState([])

    const getAd = () =>{
        axiosInstance.get(`/ad/${anunt.id}`)
            .then(res =>{
                let val = res.data
                setTitle(val.title)
                setDescription(val.description)
                setPrice(val.price)
                setSurface(val.surface)
                setNoRooms(val.no_rooms)
                setType(val.type)
                setAdType(val.ad_type)
                setAdresa(val.adresa)
                setOras(val.oras)
                setJudet(val.judet)
                setTara(val.tara)
            })
            .catch(e =>{
                console.log(e)
            })
    }

    const getUser = (arg) =>{

    }

    const getProgramari = () =>{
        axiosInstance.get(`/all-prog-date/${anunt.id}`)
            .then(res=>{
                let val = res.data
                setProgramari(val?.filter(r=>r.date === date.format('YYYY-MM-DD').toString()))
            })
            .catch(e=>{
                console.log(e)
            })
    }

    const getAllAppointments = () =>{
        axiosInstance.get(`/all-prog-date/${anunt.id}`)
            .then(res=>{
                let val = res.data
                setAllApointmnets(val)
            })
            .catch(e=>{
                console.log(e)
            })
    }

    const makeAppointment = () =>{
        let body = {
            "id_ad": anunt.id,
            "id_user":user,
            "date": date.format('YYYY-MM-DD').toString(),
            "time": hour
        }
        axiosInstance.post('/add-prog', body)
            .then(res=>{
                let val = res.data
                console.log(val)
                window.history.back()
            })
            .catch(e=>{
                console.log(e)
            })
    }

    useEffect(()=>{
        getAd()
    }, [])

    useEffect(()=>{
        getAllAppointments()
    },[])

    useEffect(()=>{
        getProgramari()
    },[date])

    useEffect(()=>{
        let notAvailableHours = programari.map(t=>t.time)
        const availableHours = allHours.filter(hour => !notAvailableHours.includes(hour));
        setAvailableHours(availableHours);
        setLoaded(false)
    }, [programari])

    function findNextAvailableDateAndHour() {
        let now = moment().format('YYYY-MM-DD');
        let ok = true
        while (ok){
            let appointments = allAppointments?.filter(r => r.date === now)
            let notAvailableHours = appointments.map(t=>t.time)
            let availableHours = allHours.filter(hour => !notAvailableHours.includes(hour));
            if(availableHours.length !== 0){
                ok=false
                return [now, availableHours[0]]
            }else {
                let newDate = moment(now).add(1, 'days');
                now = newDate;
            }
        }
    }

    useEffect(()=>{
        if(availableHours.length !== 0){
            setHour(availableHours[0])
        }
        else if (availableHours.length === 0 && loaded===false) {
            let nextAvailableDateAndHour = findNextAvailableDateAndHour()
            alert('No more available hours for this date. Next available date is: '
                + nextAvailableDateAndHour[0].toString()
                + ' at: ' + nextAvailableDateAndHour[1] + " o'clock");
        }

    }, [availableHours])


    const getEvents = () =>{
        let appointments = []
        let promises = []

        for (const key in allAppointments) {
            const date = allAppointments[key].date;
            const time = allAppointments[key].time;
            const id = allAppointments[key].id_user;
            promises.push(
                axiosInstance.get(`user/${id}`)
                    .then(res => {
                        let val = res.data;
                        appointments.push({
                            title: time,
                            start: date,
                            description:"Appointment for: "
                                + val.first_name
                                + " "
                                + val.last_name
                                + " at "
                                + time,
                        });
                    })
                    .catch(e => {
                        console.log(e);
                    })
            );
        }

        Promise.all(promises).then(() => {
            setEvents(appointments);
        });
    }

    useEffect(()=>{
        getEvents()
    }, [allAppointments])

    const handleEventClick = (arg) => { // bind with an arrow function
        alert(arg.event.extendedProps.description);
    }


    return(
        <div>
            <div className={"half le"}>
                <div className={"picture"}>
                    {type === "house" && <img src="/h1.jpg" alt="house"/>}
                    {type === "apartment" && <img src="/ap.jpg" alt="apartment"/>}

                    <h3>{no_rooms} camere --- {price} euro --- {surface}mp</h3>
                </div>
                {isAdmin &&
                    <div id={'statistic-buttons'}>
                        <CalendarMonthIcon
                            className={'button2'}
                            color="primary"
                            fontSize="large"
                            onClick={() => {
                                setCalendarOn(!calendarOn)
                                setStatOn(false)
                            }}
                        >View Calendar</CalendarMonthIcon>
                        <LeaderboardIcon
                            className={'button2'}
                            color={'primary'}
                            fontSize={'large'}
                            onClick={() => {
                                setStatOn(!statOn)
                                setCalendarOn(false)
                            }}
                        >View Statistics</LeaderboardIcon>
                    </div>
                }
                <div className={'image-down'}>
                    <h2>{description}</h2>
                </div>
            </div>
            {!calendarOn && !statOn &&
                <div className={'half ri'}>
                    <h1> Fa-ti o programare !</h1>
                    <div className={"text-anunt"}>
                        <h2>Adresa: {adresa}</h2>
                        <h2>Oras: {oras}</h2>
                        <h2>Judet: {judet}</h2>
                        <h2>Tara: {tara}</h2>
                    </div>
                    <form onSubmit={makeAppointment}>
                        <div id={'date-picker'}>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DemoContainer components={['DateCalendar', 'DateCalendar']}>
                                    <DateCalendar
                                        value={dayjs(date)}
                                        onChange={(newValue) => {
                                            setDate(newValue)
                                        }}/>
                                </DemoContainer>
                            </LocalizationProvider>
                        </div>
                        <div id={'time-picker'}>
                            <h4>
                                <InputLabel>Alege ora</InputLabel>
                                <Select
                                    id={'time-select'}
                                    value={hour}
                                    label={'Pick an Hour'}
                                    onChange={(e) => setHour(e.target.value)}
                                >
                                    {availableHours.length > 0 ? (
                                        availableHours.map((hour, index) => (
                                            <MenuItem value={hour} key={index}>
                                                {hour}
                                            </MenuItem>
                                        ))
                                    ) : (
                                        <MenuItem disabled>No more options</MenuItem>
                                    )}
                                </Select>
                            </h4>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                            >Adauga programare</Button>
                        </div>

                    </form>
                </div>
            }
            {calendarOn && !statOn &&
                <div className={'half ri'}>
                    <h1 id={"calendar-prog"}> Calendar programari:</h1>
                    <div className={"calendar-programari"}>
                        <FullCalendar
                            plugins={[dayGridPlugin]}
                            initialView='dayGridMonth'
                            weekends={true}
                            events={events}
                            eventClick={handleEventClick}
                        />
                    </div>
                </div>
            }
            {!calendarOn && statOn &&
                <div className={'half ri'}>
                    <h1> Statistici programari:</h1>
                    <div className={"statistici-programari"}>
                        <AppointmentsChart
                            appointmentsData ={allAppointments}
                        />
                    </div>
                </div>
            }
        </div>

    )
}
export default AnuntPage;