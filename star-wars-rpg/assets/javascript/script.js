/**
 * Created by ryansouthard on 7/13/17.
 */
var selectedCharcterId = "";
var hasPickedCharacter = false;
var hasPickedDefender = false;
var selectedDefenderId = "";

//document on ready function
$(function () {
    /* On character clicked (onclick event will be needed)
     Move character to different div section*/

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
    selectedCharcterId = playerDiv.id;
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

function setHealth() {
    obiwon: 100;
    luke: 100;
    darth: 100;
    quagmire: 80;
    setPoints.append($("#"))

}

function setHitPoints() {


}