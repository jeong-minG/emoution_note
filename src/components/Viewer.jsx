import { emotionList } from '../util/constants';
import { getEmotionImage } from '../util/get-emotion-image';
import './Viewer.css';

const Viewer = ({ emotionId, content }) => {
    const emotionItem = emotionList.find((item) => String(item.emotionId) === String(emotionId));
    return (
        <div className="Viewer">
            <section className="img_section">
                <h4>오늘의 감정</h4>
                <div className={`emoution_img_wrapper emoution_img_wrapper_${emotionId}`}>
                    <img src={getEmotionImage(emotionId)} alt="오늘의 감정" />
                    <div>{emotionItem.emotionName}</div>
                </div>
            </section>
            <section className="content_section">
                <h4>오늘의 일기</h4>
                <div className="content_wrapper">
                    <p>{content}</p>
                </div>
            </section>
        </div>
    );
};

export default Viewer;
