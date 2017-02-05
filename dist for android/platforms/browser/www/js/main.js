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
        var length = _status.pass.length;
        for (var i = 0; i < length; i++) {
            if (_status.pass[i] === ' ') {
                result = result + ' ';
            } else {
                result = result + '_';
            }
        }
        _status.uPass = result;
    };

    var _isLetterUsed = function _isLetterUsed(letter, arr) {
        var length = arr.length;
        for (var i = 0; i < length; i++) {
            if (letter === arr[i]) {
                return true;
            }
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
        var length = position.length;
        for (var i = 0; i < length; i++) {
            _status.uPass = _status.uPass.replaceAt(position[i], key);
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
        var length = _letters.length;
        for (var i = 0; i < length; i++) {
            _letters[i].className = "key";
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

//HangmanController.init();