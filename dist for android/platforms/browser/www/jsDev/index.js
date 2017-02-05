let HangmanController = (function(){
    const letters= HangmanInterface.letters,
          reset = HangmanInterface.reset;



    let _setGame = function (pass){
        Hangman.setPass(pass);
        Hangman.setUPass(pass);
        HangmanInterface.updatePass(Hangman.getUPass());
    };
    let _stopReadKeys = function () {
        let length = letters.length;
        for(let i=0;i<length;++i){
            letters[i].removeEventListener("click",_readKeys);
            letters[i].removeEventListener("touchstart",_readKeys);
        }
    };
    let _readKeys = function(){
            let key=this.id;
            let isCorrect = Hangman.isLetterCorrect(key);

            Hangman.addLetter(key);
            HangmanInterface.markLetter(isCorrect,this);

            if(isCorrect){
                Hangman.updateUPass(key);
                HangmanInterface.updatePass();
            }else{
                Hangman.makeFalseMove();
                HangmanInterface.changeScreen(Hangman.getFalse());
            }
            if(Hangman.gameState()!=='ongoing'){
                console.log(Hangman.gameState());
                HangmanInterface.showLightBox(Hangman.gameState(), Hangman.getPass());
                _stopReadKeys();
            }
    };

    let _playGame = function(){
        length = letters.length;
        for(let i=0; i<length; i++){
            letters[i].addEventListener("click",_readKeys);
        }
    };
    let _resetGame = function(){
        PassGenerator.generate(_setGame);
        Hangman.clear();
        HangmanInterface.clearIF();
        HangmanInterface.changeScreen(0);
        _playGame();
    };

    let _init = function(){
        document.addEventListener("DOMContentLoaded", function(event) {
            PassGenerator.generate(_setGame);
            _playGame();
            reset.addEventListener("click",_resetGame);
        });

        document.addEventListener('deviceready', ()=>{
            PassGenerator.generate(_setGame);
            _playGame();
            reset.addEventListener('touchstart',_resetGame);
        }, false);
    };



    return {
        init: _init
    }
})();

HangmanController.init();
