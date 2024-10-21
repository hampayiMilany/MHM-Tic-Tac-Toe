import { useState } from "react";
import "../../Styles/GameStartMenuStyles.scss"

const [xImage, oImage] = ["../X.svg", "../O.svg"];

interface GameStartMenuType {
    playWithCPU: () => void;
    playWithPlayer: () => void;
    startGame: () => void;
    xIsFirst: () => void;
    oIsFirst: () => void;
}

function GameStartMenu({ playWithCPU, playWithPlayer, startGame, xIsFirst, oIsFirst }: GameStartMenuType) {
    const clickSound = new Audio("../sounds/clicksound.mp3");

    const [toggleBtnBG, setToggleBtnBG] = useState(true);

    function handleToggleButtonClick(toggle: boolean) {
        clickSound.play();
        clickSound.preload = "none";
        toggle ? setToggleBtnBG(true) : setToggleBtnBG(false);
        toggle ? xIsFirst() : oIsFirst();
    }

    function handleClick(playWithCpu: boolean) {
        clickSound.play();
        clickSound.preload = "none";
        playWithCpu ? playWithCPU() : playWithPlayer();
        startGame();
    }

    return (
        <div className="start-menu-container">

            <p className="welcome">Welcome</p>
            <p className="game-title">MHM Tic Tac Toe Game</p>

            <div>
                <img src={xImage} alt="X Icon Image" width="40px" height="40px" />
                <img src={oImage} alt="O Icon Image" width="40px" height="40px" />
            </div>

            <div className="who-is-first-container">
                PICk PLAYER 1'S MARK
                <div className="toggle-button">
                    <div className="toggle-btn-background" style={{ right: toggleBtnBG ? "auto" : "5px" }}></div>
                    <div onClick={() => handleToggleButtonClick(true)} className="image-container">
                        <img src={xImage} alt="X Icon Image" width="30px" height="30px" />
                    </div>
                    <div onClick={() => handleToggleButtonClick(false)} className="image-container">
                        <img src={oImage} alt="O Icon Image" width="30px" height="30px" />
                    </div>
                </div>
                <p
                    style={{
                        fontFamily: "MontserratRegular, sans-serif",
                        fontSize: "0.8em",
                    }}
                >
                    REMEMBER: {toggleBtnBG ? "X" : "O"} IS GOES FIRST
                </p>
            </div>

            <div className="start-game-buttons-container">
                <button onClick={() => handleClick(true)}>NEW GAME (VS CPU)</button>
                <button onClick={() => handleClick(false)}>NEW GAME (VS Player)</button>
            </div>
        </div>
    );
}

export default GameStartMenu;