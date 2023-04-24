import {useState} from "react";
import {Scheduler} from "@aldabil/react-scheduler";
import fr from 'date-fns/locale/fr'
import {createEvent, deleteEvent, getEvents, updateEvent} from "./../backend/backend.js";

const day = {
    startHour: 5,
    endHour: 23,
    step: 60,
    navigation: true,
};

const week = {
    weekDays: [0, 1, 2, 3, 4, 5, 6],
    weekStartOn: 1,
    startHour: 7,
    endHour: 23,
    step: 60,
    navigation: true,
    disableGoToDay: false,
};


const month = {
    weekDays: [0, 1, 2, 3, 4, 5, 6],
    weekStartOn: 1,
};


const translations = {
    navigation: {
        month: 'Mois',
        week: 'Semaine',
        day: 'Jour',
        today: "Aujourd'hui",
    },
    form: {
        addTitle: 'Ajouter un évènement',
        editTitle: 'Editer un évènement',
        confirm: 'Confirmer',
        delete: 'Supprimer',
        cancel: 'Annuler',
    },
    event: {
        title: 'Titre',
        start: 'Début',
        end: 'Fin',
        allDay: 'Jour entier',
    },
    moreEvents: 'Plus...',
    loading: 'Chargement...',
};


const fieldList = [
    {
        name: "user_id",
        type: "select",
        config: {
            label: "Assigné à",
            options: [{text: 'Aylin', value: 1}, {text: 'Jonathan', value: 2}, {text: 'Nous deux', value: 3}],
            variant: "outlined",
        },
        default: 3,
    },
];


const CalendarView = () => {
    const [events, setEvents] = useState([]);
    const fetchEvents = async () => {
        return new Promise((res) => {
            getEvents().then((data) => {
                res(data.map((e) => {
                    return {
                        ...e,
                        title: e.title,
                        start: new Date(e.start),
                        end: new Date(e.end),
                    }
                }));
            });

        });
    };

    const handleConfirm = async (event, action) => {
        return new Promise((res, rej) => {
            if (action === "edit") {
                updateEvent(event).then((response) => {
                    setEvents([...events.filter((e) => e.event_id !== event.event_id), response]);
                    res({
                        ...response,
                        event_id: response.event_id,
                        title: response.title,
                        start: new Date(response.start),
                        end: new Date(response.end),
                        color: response.color,
                        user_id: response.user_id,

                    });
                });

            } else if (action === "create") {
                createEvent(event).then((response) => {
                    setEvents([...events, response]);
                    res({
                        ...response,
                        event_id: response.event_id,
                        title: response.title,
                        start: new Date(response.start),
                        end: new Date(response.end),
                        color: response.color,
                        user_id: response.user_id,

                    });
                });
            }
        });
    };

    const handleDelete = async (eventId) => {
        return new Promise((res, rej) => {
            deleteEvent(eventId).then(() => {
                setEvents([...events.filter((e) => e.event_id !== eventId)]);
            });
            res(eventId);
        });
    };


    const handleUpdate = async (date, updatedEvent) => {
        return new Promise((res, rej) => {
            updateEvent(updatedEvent).then((response) => {
                setEvents([...events.filter((e) => e.event_id !== response.event_id), response]);
                res({
                    ...response,
                    event_id: response.event_id,
                    title: response.title,
                    start: new Date(response.start),
                    end: new Date(response.end),
                    color: response.color,
                    user_id: response.user_id,

                });
            });
        });
    }

    return (
        <main className={"mt-14 z-10 absolute w-full h-[calc(100%-3.5rem)]"}>
            <Scheduler
                view={"month"}
                day={day}
                week={week}
                month={month}
                translations={translations}
                fields={fieldList}
                locale={fr}
                hourFormat={"24"}
                getRemoteEvents={fetchEvents}
                onConfirm={handleConfirm}
                onDelete={handleDelete}
                onEventDrop={handleUpdate}/>
        </main>
    );
};

export default CalendarView;
