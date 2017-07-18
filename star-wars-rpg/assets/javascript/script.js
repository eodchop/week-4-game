/**
 * Created by ryansouthard on 7/13/17.
 */


var selectedCharacterId = "";
var hasPickedCharacter = false;
var hasPickedDefender = false;
var selectedDefenderId = "";
var backgroundMusic = new Audio("assets/audio/music.mp3")
var giggity = new Audio("assets/audio/giggity.mp3")
var characters = {
        charactersArray: [],
        createCharacter: function(nm, hlth, att,countatt, imgURL) {
            return {
                name: nm,
                health: hlth,
                attack: att,
                baseAttack: att,
                counterAttack: countatt,
                image: imgURL
            }
        },
        init: function() {
            this.charactersArray.push(this.createCharacter("Obiwon", 100, 25, 10, "assets/images/obi.jpg"));
            this.charactersArray.push(this.createCharacter("Luke", 100, 25, 10, "assets/images/luke.jpg"));
            this.charactersArray.push(this.createCharacter("Vader", 100, 25,10,"assets/images/darth.jpg"));
            this.charactersArray.push(this.createCharacter("Quagmire",80, 30,11,"assets/images/quagmire.jpg"));
            this.addCharactersToHTML();

        },
        getCharacterObjectByName: function(nmToSearch) {
            for(var i = 0;i < this.charactersArray.length; i++){
                if (nmToSearch === this.charactersArray[i].name){
                    return this.charactersArray[i];
                }
            }
        },

        setCharacterByObject: function(charObj) {
            for (var i = 0; i < this.charactersArray.length; i++){
                if (this.charactersArray[i].name === charObj.name){
                    this.charactersArray[i] = charObj;
                }
            }
        },

        addCharactersToHTML: function(){
          for (var i = 0; i < this.charactersArray.length; i++){
              $("#character-row").append(characters.createCharacterHTML(characters.getCharacterObjectByName(this.charactersArray[i].name)));

          }
        },
        createCharacterHTML: function(charObj){
            var outterDiv = $("<div>");
            outterDiv.attr('id',charObj.name);
            outterDiv.addClass("character col-sm-3");
            // All html below will go inside our outerDiv
            var nameHeader = $("<h3>");
            nameHeader.html(charObj.name);
            var charImage = $("<img>");
            charImage.attr('src', charObj.image);
            charImage.addClass("img-thumbnail");
            charImage.width(304);
            charImage.height(236);
            var healthHeader = $("<h5>");
            healthHeader.addClass("health text-center text-danger");
            healthHeader.html(charObj.health);
            outterDiv.append(nameHeader);
            outterDiv.append(charImage);
            outterDiv.append(healthHeader);
            return outterDiv;
        },
        updateCharacterHtml: function() {
            for (var i = 0; i < this.charactersArray.length; i++){
                $('#' + this.charactersArray[i].name).find(".health").html(this.charactersArray[i].health)
            }
        },
        gameReset: function(){
            $('#' + selectedCharacterId).remove();
            this.charactersArray =[];
            selectedCharacterId = "";
            hasPickedCharacter = false;
            hasPickedDefender = false;
            selectedDefenderId = "";
            this.init();

        }

};

//document on ready function
$(function () {
    /* On character clicked (onclick event will be needed)
     Move character to different div section*/
    backgroundMusic.play();
    characters.init();
    console.log(giggity);
    $(".character").on("click", function () {
        console.log($("#character-row").children()[0]);

        if (!hasPickedDefender) {

            if (!hasPickedCharacter) {
                console.log($("#character-row"));
                movePlayerCharacter(this);
                moveEnemies();
            } else {
                moveDefender(this);
            }
        }
    });
    $("#Quagmire").on("click", function(){
        backgroundMusic.pause();
        giggity.play();
        $(giggity).on('ended', function() {
            backgroundMusic.play();
        })
    });
    $("#fight").on('click', function(){
        fight();
    })
})


function movePlayerCharacter(playerDiv) {
    $("#character-section").append(playerDiv);
    hasPickedCharacter = true;
    selectedCharacterId = playerDiv.id;
}
function moveEnemies() {
    /*For every child in $("#character-row").children() we want to append that child to
     * enemies-avaiable-to-attack div
     */
    var charactersArray = $("#character-row").children();
    for (var i = 0; i < charactersArray.length; i++) {
        $("#enemies-available-to-attack").append(charactersArray[i]);
    }
}

function moveDefender(defenderDiv) {
    /*move character clicked to fight section
     */
    $("#defender").append(defenderDiv);
    hasPickedDefender = true;
    selectedDefenderId = defenderDiv.id;
}


//selectCharacterId
//selectedDefenderId
//setCharacterByObject
function fight(){
   var character = characters.getCharacterObjectByName(selectedCharacterId);
   var defender = characters.getCharacterObjectByName(selectedDefenderId);
    defender.health -= character.attack;
    character.attack += character.baseAttack;
    character.health -= defender.counterAttack;
    characters.setCharacterByObject(character);
    characters.setCharacterByObject(defender);
    characters.updateCharacterHtml();
    if (character.health <= 0){
        alert("game over");
        characters.gameReset();
    }
    else if (defender.health <= 0){
        $("#" + defender.name).remove();
        hasPickedDefender = false;
        if ($("#enemies-available-to-attack").has(".character").length === 0) {
            alert("You have won!");
            characters.gameReset();
        }
        else {
            alert(defender.name + " has been defeated. Select a new defender. ");
        }
    }

}
//get variables we are going to be using(getcharacterobject by name)//
//health, attack, baseAttack,counterAttack//
//selectedCharacter hits selectedDefender//
//decrement selected defenders health by selected characters attack
//set selected characters attack=attack + baseattack
//selected Defender decrements selectedCharacter health equal to counterattack
//if selected defender health <= 0 select new defender
//if selected character health <= 0 call gameover

