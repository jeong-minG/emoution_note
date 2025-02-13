import { useNavigate } from 'react-router-dom';
import { getEmotionImage } from '../util/get-emotion-image';
import Button from './Button';
import './DiaryItem.css';
import { useContext } from 'react';
import { DiaryDispatchContext } from '../App';

const DiaryItem = ({ id, emotionId, createdDate, content }) => {
    const { onDelete } = useContext(DiaryDispatchContext);

    const nav = useNavigate();

    const goDiaryPage = () => {
        nav(`/diary/${id}`);
    };

    const goEditPage = () => {
        nav(`/edit/${id}`);
    };

    const onClickDelete = () => {
        onDelete(id);
    };

    return (
        <div className="DiaryItem">
            <div onClick={goDiaryPage} className={`img_section img_section_${emotionId}`}>
                <img src={getEmotionImage(emotionId)} />
            </div>
            <div onClick={goDiaryPage} className="info_section">
                <div className="created_date">{new Date(createdDate).toLocaleDateString()}</div>
                <div className="content">{content}</div>
            </div>
            <div className="button_section">
                <Button onClick={goEditPage} text={'수정하기'} />
                <Button type={'NEGATIVE'} onClick={onClickDelete} text={'삭제하기'} />
            </div>
        </div>
    );
};

export default DiaryItem;
