import { useState, useEffect } from 'react';

const App = () => {
    const [isSolved, setIsSolved] = useState(false);
    const [puzzleText, setPuzzleText] = useState('Loading puzzle...');
    const [userAnswer, setUserAnswer] = useState('');
    const [feedbackMessage, setFeedbackMessage] = useState('');
    const [correctAnswer, setCorrectAnswer] = useState(0);
    //@ts-ignore
    const [motivationalThought, setMotivationalThought] = useState('');

    const [time, setTime] = useState('');
    const [date, setDate] = useState('');
    const [day, setDay] = useState('');

    const thoughts = [
                "The only way to do great work is to love what you do.",
                "Believe you can and you're halfway there.",
                "The future belongs to those who believe in the beauty of their dreams.",
                "The secret of getting ahead is getting started.",
                "It always seems impossible until it's done.",
                "The best time to plant a tree was 20 years ago. The second best time is now."
            ];


    const generatePuzzle = () => {
        const num1 = Math.floor(Math.random() * 20) + 1;
        const num2 = Math.floor(Math.random() * 20) + 1;
        const operator = ['+', '-', '*'][Math.floor(Math.random() * 3)];
        
        let problem: string = '';
let answer: number = 0;

        switch (operator) {
            case '+':
                problem = `${num1} + ${num2}`;
                answer = num1 + num2;
                break;
            case '-':
                problem = `${num1} - ${num2}`;
                answer = num1 - num2;
                break;
            case '*':
                const num3 = Math.floor(Math.random() * 10) + 1;
                const num4 = Math.floor(Math.random() * 10) + 1;
                problem = `${num3} * ${num4}`;
                answer = num3 * num4;
                break;
        }

        setPuzzleText(problem);
        setCorrectAnswer(answer);
        setUserAnswer('');
        setFeedbackMessage('');
        setMotivationalThought('');
    };

    const updateTime = () => {
        const now = new Date();
        const timeString = now.toLocaleTimeString();
        const dateString = now.toLocaleDateString(undefined, {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
        const dayString = now.toLocaleDateString(undefined, { weekday: 'long' });

        setTime(timeString);
        setDate(dateString);
        setDay(dayString);
    };

    const handleSubmit = () => {
        const parsedAnswer = parseInt(userAnswer, 10);
        
        if (parsedAnswer === correctAnswer) {
            setIsSolved(true);
            const randomindex = Math.floor(Math.random() * thoughts.length);
            setMotivationalThought(thoughts[randomindex]);
        } else {
            setFeedbackMessage('Incorrect, please try again.');
        }
    };

    useEffect(() => {
        generatePuzzle();
    }, []);

    useEffect(() => {
        if (isSolved) {
            updateTime();
            const intervalId = setInterval(updateTime, 1000);
            
            return () => clearInterval(intervalId);
        }
    }, [isSolved]);

    return (
        
        <div className="flex items-center justify-center min-h-screen p-4 bg-gray-900 text-gray-100 w-screen">
            <div className="bg-gray-800 p-8 md:p-12 rounded-2xl shadow-2xl max-w-lg w-full text-center">
                
                {!isSolved ? (
                    <div className="flex flex-col items-center">
                        <h1 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-500">
                            Solve the Puzzle
                        </h1>
                        <p className="text-xl md:text-2xl mb-6">{puzzleText}</p>
                        <input
                            type="number"
                            className="w-full max-w-xs p-3 rounded-lg text-lg text-gray-900 bg-gray-200 focus:outline-none focus:ring-2 focus:ring-green-400 transition-all duration-300 shadow-md"
                            placeholder="Enter your answer"
                            value={userAnswer}
                            onChange={(e) => setUserAnswer(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
                        />
                        <button
                            onClick={handleSubmit}
                            className="mt-6 w-full max-w-xs py-3 px-6 bg-gradient-to-r from-green-500 to-blue-500 text-white font-bold rounded-lg shadow-lg hover:from-green-400 hover:to-blue-400 transition-all duration-300 transform hover:scale-105"
                        >
                            Submit
                        </button>
                        <p className="mt-4 text-red-400 font-semibold">{feedbackMessage}</p>
                    </div>
                ) : (
                    <div>
                        <h1 className="text-3xl md:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-500 mb-4">
                            {time}
                        </h1>
                        <p className="text-xl md:text-2xl font-semibold text-gray-300">{date}</p>
                        <p className="text-xl md:text-2xl font-semibold text-gray-300">{day}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default App;
