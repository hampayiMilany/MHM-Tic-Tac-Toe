import { useEffect, useRef, useState } from "react";
import Author from "../GameBoard/GameBoardAuthorSection";
import BoardTitleSection from "./GameBoardTitleSections";
import WinnerBoard from "../WinnerBoard";

const [xImage, oImage, squareImage] = ["../X.svg", "../O.svg", "../square.svg"];

interface BoardInfo {
    player1Name: string;
    player2Name: string;
    isCpuPlay: boolean;
    whoIsFirst: boolean;
    quitFromGame: () => void;
}

const btnValues = ["", "", "", "", "", "", "", "", ""]
let [player1Score, player2Score] = [0, 0];


function Board({ player1Name, player2Name, isCpuPlay, whoIsFirst, quitFromGame }: Readonly<BoardInfo>) {
    const [turn, setTurn] = useState(whoIsFirst);
    const [winnerMessage, setWinnerMessage] = useState("");
    const [winnerImage, setWinnerImage] = useState(squareImage);
    const [ties, setTies] = useState(0);
    const [isTie, setIsTie] = useState(false);
    const [isCpuThinking, setIsCpuThinking] = useState(false);
    const inputRef = useRef<HTMLImageElement[]>([]);

    const tapSound = new Audio("../sounds/tapsound.mp3");
    const winsound = new Audio("../sounds/wonsound.wav");

    function closeWinnerBoard() {
        setWinnerMessage("");
        RestGame();
    }

    function RestGame() {
        for (let item in btnValues) {
            btnValues[item] = "";
            inputRef.current[item].src = squareImage;
        }
        setTurn(true);
        setWinnerMessage("");
        setIsCpuThinking(false);
    }

    function handleClick(btnNumber: number) {
        if (btnValues[btnNumber] === "" && !isCpuThinking) {
            if (inputRef.current) {
                inputRef.current[btnNumber].src = turn ? xImage : oImage;
                btnValues[btnNumber] = turn ? 'x' : 'o';
                tapSound.play();
            }
            setTurn(!turn);
        }
        winnerCheck();
    }

    function winnerCheck() {
        const winStateArr = [
            [btnValues[0], btnValues[1], btnValues[2]],
            [btnValues[3], btnValues[4], btnValues[5]],
            [btnValues[6], btnValues[7], btnValues[8]],
            [btnValues[0], btnValues[3], btnValues[6]],
            [btnValues[1], btnValues[4], btnValues[7]],
            [btnValues[2], btnValues[5], btnValues[8]],
            [btnValues[2], btnValues[4], btnValues[6]],
            [btnValues[0], btnValues[4], btnValues[8]]
        ];

        for (let i in winStateArr) {
            if (winStateArr[i][0] === "" || winStateArr[i][1] === "" || winStateArr[i][2] === "") {
                continue;
            } else if (winStateArr[i][0] == winStateArr[i][1] && winStateArr[i][0] == winStateArr[i][2]) {
                winStateArr[i][0] == 'x' ? player1Score++ : player2Score++;
                setWinnerMessage("YOU WON!");
                setWinnerImage(winStateArr[i][0] == 'x' ? xImage : oImage);
                setIsTie(false);
                winsound.play();
                return;
            }
        }

        if (!btnValues.includes("")) {
            setTies(ties + 1);
            setWinnerMessage("It's a tie!");
            winsound.play()
            setIsTie(true);
        }
    }

    let preventSec = true;
    useEffect(() => {
        if (isCpuPlay && !turn && preventSec) {
            cpuPlay();
            turn === false && setIsCpuThinking(true);
            preventSec = false;
        }
        winnerMessage === "" && winnerCheck();
    }, [turn])

    function cpuPlay() {
        if (!turn) {
            setTimeout(() => {
                let winningMove = findWinningMove('o');
                if (winningMove !== -1) {
                    btnValues[winningMove] = 'o';
                    inputRef.current[winningMove].src = oImage;
                    tapSound.play();
                    setTurn(true);
                    setIsCpuThinking(false);
                    return;
                }

                let blockPlayerMove = findWinningMove('x');
                if (blockPlayerMove !== -1) {
                    btnValues[blockPlayerMove] = 'o';
                    inputRef.current[blockPlayerMove].src = oImage;
                    tapSound.play();
                    setTurn(true);
                    setIsCpuThinking(false);
                    return;
                }

                let emptyIndexes = btnValues
                    .map((value, index) => (value === "" ? index : null))
                    .filter((value) => value !== null);

                if (emptyIndexes.length > 0) {
                    let randomIndex = Math.floor(Math.random() * emptyIndexes.length);
                    let index = emptyIndexes[randomIndex];
                    btnValues[index] = 'o';
                    inputRef.current[index].src = oImage;
                    tapSound.play();
                    setTurn(true);
                    setIsCpuThinking(false);
                }
            }, 500);
        }
    }

    function findWinningMove(playerSymbol: 'x' | 'o') {
        const winLines = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6]
        ];

        for (let line of winLines) {
            const [a, b, c] = line;
            if (btnValues[a] === playerSymbol && btnValues[b] === playerSymbol && btnValues[c] === "") {
                return c;
            } else if (btnValues[a] === playerSymbol && btnValues[c] === playerSymbol && btnValues[b] === "") {
                return b;
            } else if (btnValues[b] === playerSymbol && btnValues[c] === playerSymbol && btnValues[a] === "") {
                return a;
            }
        }

        return -1;
    }

    function Quit() {
        quitFromGame();
        RestGame();
        setTies(0);
        player1Score = 0;
        player2Score = 0;
    }

    return (
        <div className="tic-tac-toe-board">
            {winnerMessage !== "" && <WinnerBoard
                winnerIconImageSource={winnerImage}
                winnerTextColor={winnerImage === xImage ? "#2EC5BE" : "#F7B640"}
                isTie={isTie}
                msg={winnerMessage}
                nextRound={closeWinnerBoard}
                quit={Quit}
            />}
            <Author />
            <BoardTitleSection turn={turn} Reset={RestGame} />
            <div className="section1">
                <button onClick={() => handleClick(0)}>
                    <img src={squareImage} alt="XO icon" width="40px" height="40px" ref={(element: HTMLImageElement) => inputRef.current[0] = element} />
                </button>
                <button onClick={() => handleClick(1)}>
                    <img src={squareImage} alt="XO icon" width="36px" height="36px" ref={(element: HTMLImageElement) => inputRef.current[1] = element} />
                </button>
                <button onClick={() => handleClick(2)}>
                    <img src={squareImage} alt="XO icon" width="40px" height="40px" ref={(element: HTMLImageElement) => inputRef.current[2] = element} />
                </button>
                <button onClick={() => handleClick(3)}>
                    <img src={squareImage} alt="XO icon" width="36px" height="36px" ref={(element: HTMLImageElement) => inputRef.current[3] = element} />
                </button>
                <button onClick={() => handleClick(4)}>
                    <img src={squareImage} alt="XO icon" width="40px" height="40px" ref={(element: HTMLImageElement) => inputRef.current[4] = element} />
                </button>
                <button onClick={() => handleClick(5)}>
                    <img src={squareImage} alt="XO icon" width="36px" height="36px" ref={(element: HTMLImageElement) => inputRef.current[5] = element} />
                </button>
                <button onClick={() => handleClick(6)}>
                    <img src={squareImage} alt="XO icon" width="40px" height="40px" ref={(element: HTMLImageElement) => inputRef.current[6] = element} />
                </button>
                <button onClick={() => handleClick(7)}>
                    <img src={squareImage} alt="XO icon" width="36px" height="36px" ref={(element: HTMLImageElement) => inputRef.current[7] = element} />
                </button>
                <button onClick={() => handleClick(8)}>
                    <img src={squareImage} alt="XO icon" width="40px" height="40px" ref={(element: HTMLImageElement) => inputRef.current[8] = element} />
                </button>
            </div>
            <div className="section2">
                <div>
                    <p>X ({player1Name})</p>
                    <p>{player1Score}</p>
                </div>
                <div>
                    <p>TIES</p>
                    <p>{ties}</p>
                </div>
                <div>
                    <p>O ({player2Name})</p>
                    <p>{player2Score}</p>
                </div>
            </div>
        </div >
    )
}

export default Board;