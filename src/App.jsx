import { Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import New from './pages/New';
import Diary from './pages/Diary';
import Edit from './pages/Edit';
import NotFound from './pages/NotFound';
import { useReducer, useRef, createContext } from 'react';

const mockData = [
    {
        id: 1,
        createdDate: new Date('2024-11-17').getTime(),
        emotionId: 1,
        content: '1번일기 내용',
    },
    {
        id: 2,
        createdDate: new Date('2024-12-03').getTime(),
        emotionId: 2,
        content: '2번일기 내용',
    },
    {
        id: 3,
        createdDate: new Date('2024-12-05').getTime(),
        emotionId: 3,
        content: '3번일기 내용',
    },
];

function reducer(state, action) {
    switch (action.type) {
        case 'CREATE':
            return [action.data, ...state];
        case 'UPDATE':
            return state.map((item) => (String(item.id) === String(action.data.id) ? action.data : item));
        case 'DELETE':
            return state.filter((item) => String(item.id) !== String(action.id));
        default:
            return state;
    }
}
export const DiaryStateContext = createContext();
export const DiaryDispatchContext = createContext();

function App() {
    const [data, dispatch] = useReducer(reducer, mockData);
    const idRef = useRef(4);

    //새로운 일기 추가
    const onCreate = (cretaedDate, emotionId, content) => {
        dispatch({
            type: 'CREATE',
            data: {
                id: idRef.current++,
                cretaedDate,
                emotionId,
                content,
            },
        });
    };
    //기존 일기 수정
    const onUpdate = (id, cretaedDate, emotionId, content) => {
        dispatch({
            type: 'UPDATE',
            data: {
                id,
                cretaedDate,
                emotionId,
                content,
            },
        });
    };

    //기존 일기 삭제
    const onDelete = (id) => {
        dispatch({
            type: 'DELETE',
            id,
        });
    };
    return (
        <>
            <DiaryStateContext.Provider value={data}>
                <DiaryDispatchContext.Provider value={{ onCreate, onUpdate, onDelete }}>
                    {' '}
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/new" element={<New />} />
                        <Route path="/diary/:id" element={<Diary />} />
                        <Route path="/edit/:id" element={<Edit />} />
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </DiaryDispatchContext.Provider>
            </DiaryStateContext.Provider>
        </>
    );
}

export default App;
