"use strict";

String.prototype.replaceAt=function(index, character) {
    return this.substr(0, index) + character + this.substr(index+character.length);
};

let Hangman = (function () {
    let _status = {
        pass: 'KURKA WODNA',
        uPass:'',
        falseMoves: 0,
        usedLetter: []
    };

    let _setPass = (newPass)=> {_status.pass = newPass;};
    let _getPass = ()=>{return _status.pass;};

    let _setUndercoverPass = function(){
        let result = '';
        let length = _status.pass.length;
        for(let i = 0; i<length; i++){
            if(_status.pass[i]===' ') {
                result = result+' ';
            }else{
                result = result+'_';
            }
        }
        _status.uPass = result;
    };

    let _isLetterUsed = function(letter, arr){
        let length = arr.length;
        for(let i =0; i<length; i++){
            if(letter===arr[i]){
              return true;
            }
              return false;
        }
    };

    let _addLetter = function(key){
        if(!_isLetterUsed(key,_status.usedLetter)){
            _status.usedLetter.push(key);
        }
    };

    let _isLetterValid = function(key){
        if(_status.pass.indexOf(key)===-1){
            return false;
        }else{
            return true;
        }
    };

    let _positionOfLetter = function(key, string){
        let length = string.length;
        let result = [];
        for(let i =0; i<length; i++){
            if(string[i]===key){result.push(i);}
        }
        return result;
    };


    let _updateUndercover =function(key){
        let position = _positionOfLetter(key, _status.pass);
        let length = position.length;
        for(let i=0; i<length; i++){
           _status.uPass= _status.uPass.replaceAt(position[i], key);
        }
    };
    let _MakeFalseMove = function(){
        if(_status.falseMoves<9)
        _status.falseMoves++;
    };
    let _gameState = function(){
      if(_status.pass===_status.uPass){
          return 'won';
      }else if(_status.falseMoves===9){
          return 'lost';
      }else{
          return 'ongoing';
      }
    };

    let _getFalseMove = function(){
        return _status.falseMoves;
    };
    let _getUndercoverPass = function(){
        return _status.uPass;
    };

    let _clearStatus = function(){
        _status.falseMoves = 0;
        _status.usedLetter = [];
    };

    return {
        setPass: _setPass,
        getPass: _getPass,
        setUPass: _setUndercoverPass,//used
        addLetter: _addLetter, //used
        updateUPass: _updateUndercover,
        makeFalseMove: _MakeFalseMove,//used
        gameState: _gameState,
        isLetterCorrect: _isLetterValid,  //used
        getFalse: _getFalseMove, //used
        getUPass: _getUndercoverPass,
        clear: _clearStatus
    };
})();

let HangmanInterface = (function () {
    const _letters = document.querySelectorAll('.key'),
          _reset   = document.querySelector('.reset'),
          _screen  = document.querySelector('.game-image'),
          _pass    = document.querySelector('.key-word'),
          _lightBox= document.querySelector("#gameResult"),
          _showPass= _lightBox.querySelector(".showPass");

    let _changeScreen = function (number) {
        _screen.className = 'game-image screen'+number;
    };

    let _updatePass = function(){
        _pass.textContent = Hangman.getUPass();
    };

    let _markLetter = function(bool,letter){
        if(bool){
            letter.className =  "correct";
        }else{
            letter.className = "false";
        }
    };

    let _setImgLightBox = function(score){
        if(score==="lost"){
            _lightBox.querySelector("img").src ="img/died.jpg";
        }else if(score==="won"){
            _lightBox.querySelector("img").src ="img/winner.jpg";
        }
    };
    let _hideLightBox = function(){
        _lightBox.className = "hide";
    };
    let _lightBoxShowPass = function(pass){
        _showPass.innerText = pass;
    };
    let _showLightBox = function(scoore,pass){
        _setImgLightBox(scoore);
        _lightBox.className = "lightbox";
        _lightBoxShowPass(pass);
        _lightBox.addEventListener("click",_hideLightBox);
    };


    let _setClearBoard = function(){
      let length = _letters.length;
      for(let i=0; i<length; i++){
          _letters[i].className = "key";
      }
    };
    return{
        reset: _reset,
        letters: _letters,
        changeScreen: _changeScreen,
        updatePass: _updatePass,
        markLetter: _markLetter,
        clearIF: _setClearBoard,
        showLightBox: _showLightBox
    };
})();

let PassGenerator = (function () {

    let _generate = function(funct){
        const xml = new XMLHttpRequest();
        const webService = "http://www.setgetgo.com/randomword/get.php";

        if(typeof xml ==='undefined'){return 'TURN ON XMLHTTP'; }

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

    return{
        generate:_generate
    };
})();

//HangmanController.init();
