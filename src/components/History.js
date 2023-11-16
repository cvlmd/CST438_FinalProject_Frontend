import './History.css';
import React from 'react';

function History(props) {
    const headers = ['Attempted Country', 'Correct Country', 'Correct?'];  
    return(
        <div> 
            <h3>Your recent guesses</h3>        
            <table id="history" > 
                <thead>
                <tr>
                    {headers.map((header, idx) => (<th key={idx}>{header}</th>))}
                </tr>
                </thead>
                <tbody>
                {props.data.map((row, idx) => (
                        <tr key={idx}>
                        <td>{row.userGuess}</td>
                        <td>{row.correctCountry}</td>
                        {row.isCorrect ? 
                            (<td className="correct">Correct</td>) :
                            (<td className="incorrect">Incorrect</td>)} 
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
export default History;
