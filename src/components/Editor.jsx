import { useState, useEffect } from 'react';
import Button from './Button';
import './Editor.css';
import EmotionItem from './EmotionItem';
import { useNavigate } from 'react-router-dom';
import { emotionList } from '../util/constants';
import { getStringedDate } from '../util/get-stringed-date';

const Editor = ({ onSubmit, initData }) => {
    const [input, setInput] = useState({ createdDate: new Date(), emotionId: 3, content: '' });
    const nav = useNavigate();

    useEffect(() => {
        if (initData) {
            setInput({ ...initData, createdDate: new Date(Number(initData.createdDate)) });
        }
    }, [initData]);

    const onChangeInput = (e) => {
        const { name, value } = e.target;
        setInput({
            ...input,
            [name]: name === 'createdDate' ? new Date(value) : value,
        });
    };
    const onClickSubmitButton = () => {
        if (!input.content.trim()) {
            alert('일기 내용을 입력해주세요.');
            return;
        }
        onSubmit(input);
    };

    //const emotionId = 1;
    return (
        <div className="Editor">
            <section className="date_section">
                <h4>오늘의 날짜</h4>
                <input
                    type="date"
                    name="createdDate"
                    onChange={onChangeInput}
                    value={getStringedDate(input.createdDate)}
                />
            </section>
            <section className="emotion_section">
                <h4>오늘의 감정</h4>
                <div className="emotion_list_wrapper">
                    {emotionList.map((item) => (
                        <EmotionItem
                            onClick={() => onChangeInput({ target: { name: 'emotionId', value: item.emotionId } })}
                            key={item.emotionId}
                            {...item}
                            isSelected={item.emotionId === input.emotionId}
                        />
                    ))}
                </div>
            </section>
            <section className="content_section">
                <h4>오늘의 일기</h4>{' '}
                <textarea
                    placeholder="오늘은 어떘나요?"
                    type="text"
                    name="content"
                    onChange={onChangeInput}
                    value={input.content}
                />
            </section>
            <section className="button_section">
                <Button onClick={() => nav(-1)} text={'취소하기'} />
                <Button onClick={onClickSubmitButton} text={'작성완료'} type={'POSITIVE'} />
            </section>
        </div>
    );
};

export default Editor;
