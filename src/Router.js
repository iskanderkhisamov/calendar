import {Routes, Route, BrowserRouter} from 'react-router-dom';
import Calendar from './Calendar';
import Note from './Note';

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Calendar />} />
                <Route path="/notes/:year/:month/:date" element={<Note />} />
            </Routes>
        </BrowserRouter>
    );
};

export default Router;