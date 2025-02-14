function OnLoad() {
    console.log("Hello world!");
    tableElement = document.getElementById("table");
    tableHeader = document.getElementById("tableheader");
    AddPlayer()
    AddPlayer()
    AddLootCount()
    AddPlayer()
    AddPlayer()
    AddLootCount()
    AddPlayer()
}

var tableHeader
var askForConfirmation = true
var tableElement
var playerCount = 0
var lootCount = 0
var existingPlayerIds = []
var existingLootIds = []

function DeletePlayer(playernumber) {

}

function AddPlayer() {
    var newElement = GetPlayerElement();
    tableElement.appendChild(newElement)
}

function GetPlayerElement() {
    var newElement = document.createElement("tr")
    newElement.classList.add("Player")

    var newPlayer = document.createElement("input")
    newPlayer.setAttribute("type", "text")
    newPlayer.value = "My man"

    var newPlayerDelete = document.createElement("img")
    newPlayerDelete.classList.add("deletebtn")
    newPlayerDelete.setAttribute("src", "https://cdn-icons-png.flaticon.com/512/3161/3161358.png")
    newPlayerDelete.addEventListener("click", () => DeletePlayer(playerCount))
    var newPlayerDeleteColumn = document.createElement("td")
    newPlayerDeleteColumn.appendChild(newPlayer)
    newPlayerDeleteColumn.appendChild(newPlayerDelete)
    newElement.appendChild(newPlayerDeleteColumn)

    existingLootIds.forEach(function (value) {
        newElement.appendChild(CreateLootValueInput("Loot"+value, "Loot"+value))
    })

    return newElement
}

function AddLootCount() {
    var allPlayerElements = GetAllPlayerRows();
    if (allPlayerElements.length != 0) {
        Array.from(allPlayerElements).forEach(item => {
            var newColumn = CreateLootValueInput("Loot" + lootCount, "Loot" + lootCount)
            item.appendChild(newColumn)
        });
        tableHeader.appendChild(CreateLootValueHeader("Loot" + lootCount))
        lootCount++
        existingLootIds.push(lootCount)
    }
}

function GetAllPlayerRows() {
    var AllPlayers = document.getElementsByClassName("Player");
    return AllPlayers;
}

function CreateLootValueInput(tdClassName, textboxClassName) {
    var newPlayerLootColumn = document.createElement("td")
    newPlayerLootColumn.classList.add(tdClassName)

    var newPlayerLootColumnTextBox = document.createElement("input")
    newPlayerLootColumnTextBox.setAttribute("type", "text")
    newPlayerLootColumnTextBox.classList.add(textboxClassName)
    
    newPlayerLootColumn.appendChild(newPlayerLootColumnTextBox)

    return newPlayerLootColumn
}

function CreateLootValueHeader(tdClassName) {
    var NewTD = document.createElement("td")
    NewTD.classList.add(tdClassName)

    var NewContent = document.createElement("span")
    NewContent.innerHTML = "Est. Market Value"

    NewTD.appendChild(NewContent)
    return NewTD
}

function RemoveLootCount(lootnumber) {

}
