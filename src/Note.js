import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Note = () => {
    const { year, month, date } = useParams();
    const navigate = useNavigate();

    // Сохранение заметки
    const saveNote = (date, noteTitle, noteText) => {
        setNoteTitle(noteTitle);
        setNoteText(noteText);

        let notes = JSON.parse(localStorage.getItem('notes')) || {};

        notes[date] = {
            title: noteTitle,
            text: noteText || '',
        };

        localStorage.setItem('notes', JSON.stringify(notes));
    };

    // Загрузить заметки по дате для отображения
    const loadNote = (date) => {
        let notes = JSON.parse(localStorage.getItem('notes')) || {};
        const note = notes[date] || { title: '', text: '' };

        setNoteTitle(note.title);
        setNoteText(note.text);
    };

    const [noteText, setNoteText] = useState('');
    const [noteTitle, setNoteTitle] = useState('');

    useEffect(() => {
        console.log(year, month, date);
        loadNote(date);
    }, [date]);

    // Вернуться на предыдущую страницу
    const goBack = () => {
        navigate('/', { state: { year, month } });
    }

    return (
        <>
            <button onClick={goBack}>Назад</button>
            <div id="namer">
                <div id="namer-input">
                    <input
                        type="text"
                        name="namername"
                        value={noteTitle}
                        maxLength={30}
                        onChange={(event) => saveNote(date, event.target.value, noteText)}
                        placeholder="Введите название заметки"
                    />
                </div>
            </div>
            <div>
                <textarea
                    value={noteText}
                    rows={15}
                    onChange={(event) => saveNote(date, noteTitle, event.target.value)}
                    placeholder="Введите текст заметки"
                />
            </div>
        </>
    );
};

export default Note;