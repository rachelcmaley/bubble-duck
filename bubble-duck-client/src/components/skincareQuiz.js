import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateQuizAnswer } from '../redux/quizSlice';
import { FaRegSquare, FaRegCheckSquare, FaHeart } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';



export const SkincareQuiz = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedMultiOptions, setSelectedMultiOptions] = useState([])

    const questions = [
        {
        id: 1,
        image: 'regular-duck.png',
        question: "What's your skin type?",
        options: ["Dry", "Oily", "Combination", "Sensitive", "Normal"],
        multipleChoice: false
        },
        {
        id: 2,
        image: 'dizzy-duck.png',
        question: "What's your budget?",
        options: ["($) Most Affordable Options", "($$) I can splurge on some products", "($$$) I can splurge alot"],
        multipleChoice: false
        },
        {
        id: 3,
        image: 'happy-duck.png',
        question: "How many products do you want to use?",
        options: ["Essentials only (4 - 5 products)", "Essentials + Targeted treatments (6 - 7 products)", "I'm a skincare fanatic (8+ products)"],
        multipleChoice: false
        },
        {
        id: 4,
        image: 'heart-duck.png',
        question: "What are your skincare goals?",
        options: ["Firming + Tightening", "Brightening", "Anti-Aging", "Hydration", "Acne Control", "Treat Acne Scars", "Improve Skin Texture", "Skin Barrier Health", "Dark Circle Treatment", "Treat Hyperpigmentation"],
        multipleChoice: true
        },
    ];

    const currentQuestion = questions[currentQuestionIndex];
    const totalQuestions = questions.length;
    const progressPercentage = ((currentQuestionIndex + 1) / totalQuestions) * 100;

    const handleAnswerChange = (option) => {
        if (currentQuestion.multipleChoice) {
            if (selectedMultiOptions.includes(option)) {
                setSelectedMultiOptions(selectedMultiOptions.filter(item => item !== option));
            } else {
                setSelectedMultiOptions([...selectedMultiOptions, option]);
            }
        } else {
            setSelectedOption(option);
        }
    };

    const isAnswerSelected = () => {
        if (currentQuestion.multipleChoice) {
            return selectedMultiOptions.length > 0;
        } else {
            return selectedOption !== null;
        }
    };

  const handleContinue = () => {
    // Dispatch action to update the option in the Redux store
    dispatch(updateQuizAnswer({ 
        questionId: currentQuestion.id, 
        answer: currentQuestion.multipleChoice ? selectedMultiOptions : selectedOption }));

    // Check if it's the last question
    if (currentQuestionIndex  < questions.length - 1) {
        setCurrentQuestionIndex(prevIndex => prevIndex + 1);
        // Resetting answers for the next question
        setSelectedOption(null);
        setSelectedMultiOptions([]);
    } else {  
      navigate('/photo-upload');
    }
  };

  return (
    
    <div className="quizContainer">
        <div className='progressBarContainer'>
            <div className='progressBar' style={{ width: `${progressPercentage}%` }}></div>
        </div>
        <img className='quizDuckImage' src={currentQuestion.image} />
        <h2>{currentQuestion.question}</h2>
            <div className={currentQuestion.multipleChoice ? "multipleChoiceList" : "answersList"}>
                {currentQuestion.options.map((option, index) => {
                    if (currentQuestion.multipleChoice) {
                        return (
                            <button 
                                key={index}
                                className={`multipleChoiceButton ${selectedMultiOptions.includes(option) ? 'selected' : ''}`}
                                onClick={() => handleAnswerChange(option)}
                            >
                                {selectedMultiOptions.includes(option) && <FaHeart /> }
                                {option}
                            </button>
                        );
                    } else {
                        return (
                            <button
                                key={index}
                                className={`answerButton ${selectedOption === option ? 'selected' : ''}`}
                                onClick={() => handleAnswerChange(option)}
                            >
                                {selectedOption === option ? <FaRegCheckSquare /> : <FaRegSquare /> }
                                {option}
                            </button>
                        );
                    }
                })}
            </div>
            <div className='continueBar'>
                 <button className="continueButton" onClick={handleContinue} disabled={!isAnswerSelected()}>NEXT</button>
            </div>
    </div>
);

};
