import "../../Styles/BoardTitleSectionsStyles.scss"

interface Input {
    turn: boolean;
    Reset: () => void;
}

export default function BoardTitleSection({ turn, Reset }: Readonly<Input>) {
    const clickSound = new Audio("../sounds/clicksound.mp3");

    function Restart() {
        Reset();
        clickSound.play();
    }

    return (
        <div className="board-title-section">
            <div className="player-color-section">
                <img src="../X.svg" alt="X icon" width="40px" height="40px" />
                <img src="../O.svg" alt="O icon" width="36px" height="36px" />
            </div>
            <div className="player-turn-section" >
                <p><img src={turn ? "../X.svg" : "../O.svg"} alt="X icon" width="20px" height="20px" /> &nbsp; TURN</p>
            </div>
            <div className="game-replay-section">
                <button onClick={Restart}>
                    <img src="../restart.svg" alt="restart icon" width="30px" height="30px" />
                </button>
            </div>
        </div>
    );
}