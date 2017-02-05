"use strict";

var HangmanController = function () {
    var letters = HangmanInterface.letters,
        reset = HangmanInterface.reset;

    var _setGame = function _setGame(pass) {
        Hangman.setPass(pass);
        Hangman.setUPass(pass);
        HangmanInterface.updatePass(Hangman.getUPass());
    };
    var _stopReadKeys = function _stopReadKeys() {
        var length = letters.length;
        for (var i = 0; i < length; ++i) {
            letters[i].removeEventListener("click", _readKeys);
            letters[i].removeEventListener("touchstart", _readKeys);
        }
    };
    var _readKeys = function _readKeys() {
        var key = this.id;
        var isCorrect = Hangman.isLetterCorrect(key);

        Hangman.addLetter(key);
        HangmanInterface.markLetter(isCorrect, this);

        if (isCorrect) {
            Hangman.updateUPass(key);
            HangmanInterface.updatePass();
        } else {
            Hangman.makeFalseMove();
            HangmanInterface.changeScreen(Hangman.getFalse());
        }
        if (Hangman.gameState() !== 'ongoing') {
            console.log(Hangman.gameState());
            HangmanInterface.showLightBox(Hangman.gameState(), Hangman.getPass());
            _stopReadKeys();
        }
    };

    var _playGame = function _playGame() {
        length = letters.length;
        for (var i = 0; i < length; i++) {
            letters[i].addEventListener("click", _readKeys);
        }
    };
    var _resetGame = function _resetGame() {
        PassGenerator.generate(_setGame);
        Hangman.clear();
        HangmanInterface.clearIF();
        HangmanInterface.changeScreen(0);
        _playGame();
    };

    var _init = function _init() {
        document.addEventListener("DOMContentLoaded", function (event) {
            PassGenerator.generate(_setGame);
            _playGame();
            reset.addEventListener("click", _resetGame);
        });

        document.addEventListener('deviceready', function () {
            PassGenerator.generate(_setGame);
            _playGame();
            reset.addEventListener('touchstart', _resetGame);
        }, false);
    };

    return {
        init: _init
    };
}();

HangmanController.init();