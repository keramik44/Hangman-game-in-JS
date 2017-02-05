"use strict";

String.prototype.replaceAt = function (index, character) {
    return this.substr(0, index) + character + this.substr(index + character.length);
};

var Hangman = function () {
    var _status = {
        pass: 'KURKA WODNA',
        uPass: '',
        falseMoves: 0,
        usedLetter: []
    };

    var _setPass = function _setPass(newPass) {
        _status.pass = newPass;
    };
    var _getPass = function _getPass() {
        return _status.pass;
    };

    var _setUndercoverPass = function _setUndercoverPass() {
        var result = '';
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
            for (var _iterator = _status.pass[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                var value = _step.value;

                if (value === ' ') {
                    result = result + ' ';
                } else {
                    result = result + '_';
                }
            }
        } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion && _iterator.return) {
                    _iterator.return();
                }
            } finally {
                if (_didIteratorError) {
                    throw _iteratorError;
                }
            }
        }

        _status.uPass = result;
    };

    var _isLetterUsed = function _isLetterUsed(letter, arr) {
        if (arr.find(function (value) {
            return value === letter;
        }) === letter) {
            return true;
        } else {
            return false;
        }
    };

    var _addLetter = function _addLetter(key) {
        if (!_isLetterUsed(key, _status.usedLetter)) {
            _status.usedLetter.push(key);
        }
    };

    var _isLetterValid = function _isLetterValid(key) {
        if (_status.pass.indexOf(key) === -1) {
            return false;
        } else {
            return true;
        }
    };

    var _positionOfLetter = function _positionOfLetter(key, string) {
        var length = string.length;
        var result = [];
        for (var i = 0; i < length; i++) {
            if (string[i] === key) {
                result.push(i);
            }
        }
        return result;
    };

    var _updateUndercover = function _updateUndercover(key) {
        var position = _positionOfLetter(key, _status.pass);
        var _iteratorNormalCompletion2 = true;
        var _didIteratorError2 = false;
        var _iteratorError2 = undefined;

        try {
            for (var _iterator2 = position[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                var value = _step2.value;

                _status.uPass = _status.uPass.replaceAt(value, key);
            }
        } catch (err) {
            _didIteratorError2 = true;
            _iteratorError2 = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion2 && _iterator2.return) {
                    _iterator2.return();
                }
            } finally {
                if (_didIteratorError2) {
                    throw _iteratorError2;
                }
            }
        }
    };
    var _MakeFalseMove = function _MakeFalseMove() {
        if (_status.falseMoves < 9) _status.falseMoves++;
    };
    var _gameState = function _gameState() {
        if (_status.pass === _status.uPass) {
            return 'won';
        } else if (_status.falseMoves === 9) {
            return 'lost';
        } else {
            return 'ongoing';
        }
    };

    var _getFalseMove = function _getFalseMove() {
        return _status.falseMoves;
    };
    var _getUndercoverPass = function _getUndercoverPass() {
        return _status.uPass;
    };

    var _clearStatus = function _clearStatus() {
        _status.falseMoves = 0;
        _status.usedLetter = [];
    };

    return {
        setPass: _setPass,
        getPass: _getPass,
        setUPass: _setUndercoverPass, //used
        addLetter: _addLetter, //used
        updateUPass: _updateUndercover,
        makeFalseMove: _MakeFalseMove, //used
        gameState: _gameState,
        isLetterCorrect: _isLetterValid, //used
        getFalse: _getFalseMove, //used
        getUPass: _getUndercoverPass,
        clear: _clearStatus
    };
}();

var HangmanInterface = function () {
    var _letters = document.querySelectorAll('.key'),
        _reset = document.querySelector('.reset'),
        _screen = document.querySelector('.game-image'),
        _pass = document.querySelector('.key-word'),
        _lightBox = document.querySelector("#gameResult"),
        _showPass = _lightBox.querySelector(".showPass");

    var _changeScreen = function _changeScreen(number) {
        _screen.className = 'game-image screen' + number;
    };

    var _updatePass = function _updatePass() {
        _pass.textContent = Hangman.getUPass();
    };

    var _markLetter = function _markLetter(bool, letter) {
        if (bool) {
            letter.className = "correct";
        } else {
            letter.className = "false";
        }
    };

    var _setImgLightBox = function _setImgLightBox(score) {
        if (score === "lost") {
            _lightBox.querySelector("img").src = "img/died.jpg";
        } else if (score === "won") {
            _lightBox.querySelector("img").src = "img/winner.jpg";
        }
    };
    var _hideLightBox = function _hideLightBox() {
        _lightBox.className = "hide";
    };
    var _lightBoxShowPass = function _lightBoxShowPass(pass) {
        _showPass.innerText = pass;
    };
    var _showLightBox = function _showLightBox(scoore, pass) {
        _setImgLightBox(scoore);
        _lightBox.className = "lightbox";
        _lightBoxShowPass(pass);
        _lightBox.addEventListener("click", _hideLightBox);
    };

    var _setClearBoard = function _setClearBoard() {
        var _iteratorNormalCompletion3 = true;
        var _didIteratorError3 = false;
        var _iteratorError3 = undefined;

        try {
            for (var _iterator3 = _letters[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                var letter = _step3.value;

                letter.className = "key";
            }
        } catch (err) {
            _didIteratorError3 = true;
            _iteratorError3 = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion3 && _iterator3.return) {
                    _iterator3.return();
                }
            } finally {
                if (_didIteratorError3) {
                    throw _iteratorError3;
                }
            }
        }
    };
    return {
        reset: _reset,
        letters: _letters,
        changeScreen: _changeScreen,
        updatePass: _updatePass,
        markLetter: _markLetter,
        clearIF: _setClearBoard,
        showLightBox: _showLightBox
    };
}();

var PassGenerator = function () {

    var _generate = function _generate(funct) {
        var xml = new XMLHttpRequest();
        var webService = "http://www.setgetgo.com/randomword/get.php";

        if (typeof xml === 'undefined') {
            return 'TURN ON XMLHTTP';
        }

        xml.onreadystatechange = function () {
            if (xml.readyState == 4) {
                if (xml.status == 200) {
                    funct(xml.responseText.toUpperCase());
                }
            }
        };

        xml.open("GET", webService, true);
        xml.send(null);
    };

    return {
        generate: _generate
    };
}();

var HangmanController = function () {
    var letters = HangmanInterface.letters,
        reset = HangmanInterface.reset;

    var _setGame = function _setGame(pass) {
        Hangman.setPass(pass);
        Hangman.setUPass(pass);
        HangmanInterface.updatePass(Hangman.getUPass());
    };
    var _stopReadKeys = function _stopReadKeys() {
        var _iteratorNormalCompletion4 = true;
        var _didIteratorError4 = false;
        var _iteratorError4 = undefined;

        try {
            for (var _iterator4 = letters[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
                var letter = _step4.value;

                letter.removeEventListener("click", _readKeys);
            }
        } catch (err) {
            _didIteratorError4 = true;
            _iteratorError4 = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion4 && _iterator4.return) {
                    _iterator4.return();
                }
            } finally {
                if (_didIteratorError4) {
                    throw _iteratorError4;
                }
            }
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
        var _iteratorNormalCompletion5 = true;
        var _didIteratorError5 = false;
        var _iteratorError5 = undefined;

        try {
            for (var _iterator5 = letters[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
                var letter = _step5.value;

                letter.addEventListener("click", _readKeys);
            }
        } catch (err) {
            _didIteratorError5 = true;
            _iteratorError5 = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion5 && _iterator5.return) {
                    _iterator5.return();
                }
            } finally {
                if (_didIteratorError5) {
                    throw _iteratorError5;
                }
            }
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
    };

    return {
        init: _init
    };
}();

//HangmanController.init();