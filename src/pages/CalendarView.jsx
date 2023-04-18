import {useEffect, useState} from "react";
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
    startHour: 5,
    endHour: 23,
    step: 60,
    navigation: true,
    disableGoToDay: false,
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


const CalendarView = () => {
    const [events, setEvents] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        getEvents().then((data) => {
            setEvents(data);
            setIsLoading(false);
        });
    }, []);

    let eventToDisplay = events.map((event) => {
        return {
            ...event,
            event_id: event.event_id,
            title: event.title,
            start: new Date(event.start),
            end: new Date(event.end),
        };
    });

    const handleConfirm = async (event, action) => {
        // Simulate http request: return the added/edited event
        return new Promise((res, rej) => {
            if (action === "edit") {
                updateEvent(event).then(() => {
                    setEvents([...events.filter((e) => e.event_id !== event.event_id), event]);
                });

            } else if (action === "create") {
                createEvent(event).then(() => {
                    setEvents([...events, event]);
                });
            }

            res(event);

        });
    };

    const handleDelete = async (event) => {
        return new Promise((res, rej) => {
            deleteEvent(event);
            setEvents([...events.filter((e) => e.event_id !== event.event_id)]);
            res(event);
        });
    };


    const handleUpdate = async (date, updatedEvent) => {
        return new Promise((res, rej) => {
            console.log(updatedEvent);
            updateEvent(updatedEvent).then(() => {
                setEvents([...events.filter((e) => e.event_id !== updatedEvent.event_id), updatedEvent]);
            });
            res(updatedEvent);
        });
    }

    if (isLoading) {
        return <div>Loading...</div>;
    } else {
        return (
            <main className={"mt-14 z-10 absolute top-0 left-0 right-0 bottom-0"}>
                <Scheduler
                    day={day}
                    hourFormat={"24"}
                    week={week}
                    translations={translations}
                    locale={fr}
                    events={eventToDisplay}
                    onConfirm={handleConfirm}
                    onDelete={handleDelete}
                    onEventDrop={handleUpdate}
                />
            </main>
        );
    }
};

export default CalendarView;
