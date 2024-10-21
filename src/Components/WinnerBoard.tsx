import "../Styles/WinnerBoard.scss"

interface Winner {
    msg: string;
    isTie: boolean;
    winnerIconImageSource: string;
    winnerTextColor: string;

    nextRound: () => void;
    quit: () => void;
}

export default function WinnerBoard({ msg, isTie, winnerIconImageSource, winnerTextColor, nextRound, quit }: Readonly<Winner>) {
    const clickSound = new Audio("../sounds/clicksound.mp3");

    function handleQuit() {
        clickSound.play();
        setTimeout(quit, 500)
    }

    function handleNextRound() {
        clickSound.play();
        setTimeout(nextRound, 500);
    }

    return (
        <div className="winner-container">
            <div className="msg-box">
                <p>{msg}</p>
                {isTie === false && <p className="message" style={{ color: winnerTextColor }}>
                    <img src={winnerIconImageSource} alt="Winner Icon" width="25px" height="30px" />
                    &nbsp;TAKES THE ROUND
                </p>
                }
                <div className="winner-board-buttons-container">
                    <button onClick={handleQuit}>Quit</button>
                    <button onClick={handleNextRound}>Next Round</button>
                </div>
            </div>
        </div>
    );
}

