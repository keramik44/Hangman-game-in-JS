"use strict";

String.prototype.replaceAt=function(index, character) {
    return this.substr(0, index) + character + this.substr(index+character.length);
};

let Hangman = (function () {
    let _status = {
        pass: 'KURKA WODNA',
        uPass:'',
        falsemoves: 0,
        usedLetter: []
    };

    let _setPass = (newPss)=> {_status.pass = newPss;};

    let _setUndercoverPass = function(){
        let result = '';
        for(let value of _status.pass){
            if(value===' ') {
                result = result+' ';
            }else{
                result = result+'_';
            }
        }
        _status.uPass = result;
    };

    let _isLetterUsed = function(letter, arr){
        if(arr.find((value)=>value===letter)===letter){
            return true;
        }else{
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
        for(let value of position){
           _status.uPass= _status.uPass.replaceAt(value, key);
        }
    };
    let _MakeFalseMove = function(){
        if(_status.falsemoves<9)
        _status.falsemoves++;
    };
    let _gameState = function(){
      if(_status.pass===_status.uPass){
          return 'won';
      }else if(_status.falsemoves===9){
          return 'lost';
      }else{
          return 'ongoing';
      }
    };

    let _getFalseMove = function(){
        return _status.falsemoves;
    };
    let _getUndercoverPass = function(){
        return _status.uPass;
    };


    return {
        setPass: _setPass,
        status: _status,
        setUPass: _setUndercoverPass,//used
        addLetter: _addLetter, //used
        updateUPass: _updateUndercover,
        makeFalseMove: _MakeFalseMove,//used
        gameState: _gameState,
        isLetterCorrect: _isLetterValid,  //used
        getFalse: _getFalseMove, //used
        getUPass: _getUndercoverPass
    };
})();


let HangmanInterface = (function () {
    const _letters = document.querySelectorAll('.key'),
          _reset   = document.querySelector('.reset'),
          _screen  = document.querySelector('.game-image'),
          _pass    = document.querySelector('.key-word');

    let _changeScreen = function (number) {
        _screen.className = 'game-image screen'+number;
    };

    let _updatePass = function(){
        _pass.textContent = Hangman.getUPass();
    };

    return{
        reset: _reset,
        letters: _letters,
        changeScreen: _changeScreen,
        updatePass: _updatePass
    }
})();


let HangmanController = (function(){
    const letters= HangmanInterface.letters,
          reset = HangmanInterface.reset;

    let markLetter = function(bool,letter){
        if(bool){
            letter.className =  "correct";
        }else{
            letter.className = "false";
        }
    };

    let _init = function(){
        document.addEventListener("DOMContentLoaded", function(event) {
            Hangman.setUPass();
            HangmanInterface.updatePass();

            for(let letter of letters){
                letter.addEventListener("click",function(){
                    let key=this.id;
                    let isCorrect = Hangman.isLetterCorrect(key);
                    Hangman.addLetter(key);

                    markLetter(isCorrect,this);
                    if(isCorrect){
                        Hangman.updateUPass(key);
                        HangmanInterface.updatePass();
                    }else{
                        Hangman.makeFalseMove();
                        HangmanInterface.changeScreen(Hangman.getFalse());
                    }
                    console.log(Hangman.gameState());
                });
            }

        });
    };

    return {
        init: _init
    }
})();

//to do reset, pass generator and jumping out 'window' at the end of game ;-) (divide _init! )
HangmanController.init();