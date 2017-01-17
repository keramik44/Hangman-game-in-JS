"use strict";

String.prototype.replaceAt = function (index, character) {
    return this.substr(0, index) + character + this.substr(index + character.length);
};

var Hangman = function () {
    var _status = {
        pass: 'KURKA WODNA',
        uPass: '',
        falsemoves: 0,
        usedLetter: []
    };

    var _setPass = function _setPass(newPss) {
        _status.pass = newPss;
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
        if (_status.falsemoves < 9) _status.falsemoves++;
    };
    var _gameState = function _gameState() {
        if (_status.pass === _status.uPass) {
            return 'won';
        } else if (_status.falsemoves === 9) {
            return 'lost';
        } else {
            return 'ongoing';
        }
    };

    var _getFalseMove = function _getFalseMove() {
        return _status.falsemoves;
    };
    var _getUndercoverPass = function _getUndercoverPass() {
        return _status.uPass;
    };

    return {
        setPass: _setPass,
        status: _status,
        setUPass: _setUndercoverPass, //used
        addLetter: _addLetter, //used
        updateUPass: _updateUndercover,
        makeFalseMove: _MakeFalseMove, //used
        gameState: _gameState,
        isLetterCorrect: _isLetterValid, //used
        getFalse: _getFalseMove, //used
        getUPass: _getUndercoverPass
    };
}();

var HangmanInterface = function () {
    var _letters = document.querySelectorAll('.key'),
        _reset = document.querySelector('.reset'),
        _screen = document.querySelector('.game-image'),
        _pass = document.querySelector('.key-word');

    var _changeScreen = function _changeScreen(number) {
        _screen.className = 'game-image screen' + number;
    };

    var _updatePass = function _updatePass() {
        _pass.textContent = Hangman.getUPass();
    };

    return {
        reset: _reset,
        letters: _letters,
        changeScreen: _changeScreen,
        updatePass: _updatePass
    };
}();

var HangmanController = function () {
    var letters = HangmanInterface.letters,
        reset = HangmanInterface.reset;

    var markLetter = function markLetter(bool, letter) {
        if (bool) {
            letter.className = "correct";
        } else {
            letter.className = "false";
        }
    };

    var _init = function _init() {
        document.addEventListener("DOMContentLoaded", function (event) {
            Hangman.setUPass();
            HangmanInterface.updatePass();

            var _iteratorNormalCompletion3 = true;
            var _didIteratorError3 = false;
            var _iteratorError3 = undefined;

            try {
                for (var _iterator3 = letters[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                    var letter = _step3.value;

                    letter.addEventListener("click", function () {
                        var key = this.id;
                        var isCorrect = Hangman.isLetterCorrect(key);
                        Hangman.addLetter(key);

                        markLetter(isCorrect, this);
                        if (isCorrect) {
                            Hangman.updateUPass(key);
                            HangmanInterface.updatePass();
                        } else {
                            Hangman.makeFalseMove();
                            HangmanInterface.changeScreen(Hangman.getFalse());
                        }
                        console.log(Hangman.gameState());
                    });
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
        });
    };

    return {
        init: _init
    };
}();

//to do reset, pass generator and jumping out 'window' at the end of game ;-) (divide _init! )
HangmanController.init();