/**
 * Created by ryansouthard on 7/13/17.
 */


var selectedCharacterId = "";
var hasPickedCharacter = false;
var hasPickedDefender = false;
var selectedDefenderId = "";
var characters = {
        charactersArray: [],
        createCharacter: function(nm, hlth, att, imgURL) {
            return {
                name: nm,
                health: hlth,
                attack: att,
                image: imgURL
            }
        },
        init: function() {
            this.charactersArray.push(this.createCharacter("Obiwon", 100, 25, "assets/images/obi.jpg"));
            this.charactersArray.push(this.createCharacter("Luke", 100, 25, "assets/images/luke.jpg"));
            this.charactersArray.push(this.createCharacter("Vader", 100, 25,"assets/images/darth.jpg"));
            this.charactersArray.push(this.createCharacter("Quagmire",80, 30,"assets/images/quagmire.jpg"));
        },
        getCharacterObjectByName: function(nmToSearch) {
            for(var i = 0;i < this.charactersArray.length; i++){
                if (nmToSearch === this.charactersArray[i].name){
                    return this.charactersArray[i];
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
        }
};

//document on ready function
$(function () {
    /* On character clicked (onclick event will be needed)
     Move character to different div section*/
    characters.init()
    characters.addCharactersToHTML()
    $(".character").on("click", function () {
        console.log($("#character-row").children()[0]);
        if (!hasPickedCharacter) {
            console.log($("#character-row"));
            movePlayerCharacter(this);
            moveEnemies();
        } else {
            moveDefender(this);
        }
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
