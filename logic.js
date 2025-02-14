function OnLoad() {
    tableElement = document.getElementById("table");
    tableHeader = document.getElementById("tableheader");
    results = document.getElementById("results");
    AddPlayer()
    AddPlayer()
    AddPlayer()
    AddPlayer()
    AddPlayer()
    AddLootCount()
}

var tableHeader
var askForConfirmation = true
var tableElement
var playerCount = 0
var lootCount = 0
var existingPlayerIds = []
var existingLootIds = []
var results

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
        newElement.appendChild(CreateLootValueInput("Loot"+value, "LootCount"+value, lootCount))
    })

    return newElement
}

function AddLootCount() {
    var allPlayerElements = GetAllPlayerRows();
    if (allPlayerElements.length != 0) {
        Array.from(allPlayerElements).forEach(item => {
            var newColumn = CreateLootValueInput("Loot" + lootCount, "LootCount" + lootCount, lootCount)
            item.appendChild(newColumn)
        });
        tableHeader.appendChild(CreateLootValueHeader("Loot" + lootCount))
        existingLootIds.push(lootCount)
        lootCount++
    }
}

function GetAllPlayerRows() {
    var AllPlayers = document.getElementsByClassName("Player");
    return AllPlayers;
}

function CreateLootValueInput(tdClassName, textboxClassName, index) {
    var newPlayerLootColumn = document.createElement("td")
    newPlayerLootColumn.classList.add(tdClassName)

    var newPlayerLootColumnTextBox = document.createElement("input")
    newPlayerLootColumnTextBox.setAttribute("type", "number")
    newPlayerLootColumnTextBox.setAttribute("value", 0)
    newPlayerLootColumnTextBox.classList.add(textboxClassName)
    newPlayerLootColumnTextBox.addEventListener("input", UpdateLootCount)
    
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

function GetAllLootCountElements(index) {
    return document.getElementsByClassName(index)
}

function GetAllLootTotal(index) {
    var alllootcounts = GetAllLootCountElements(index)
    var totalLoot = 0
    Array.from(alllootcounts).forEach(item => {
        totalLoot += parseInt(item.value) 
    });
    var average = (totalLoot / alllootcounts.length)
    results.innerHTML = "Average: " + average + "sp<br/>"
    results.innerHTML += "Total: " + totalLoot + "sp<br/>"

    Array.from(alllootcounts).forEach(item => {
        var amount = parseInt(item.value) 
        var moneyOwed = amount - average;
        if (moneyOwed < 0)
            results.innerHTML += "Player is owed " + (moneyOwed * -1)
        else
            results.innerHTML += "Player must pay " + moneyOwed
        results.innerHTML += "sp<br>"
    });

    return totalLoot
}

function CountLootTotal(index) {
    return GetAllLootTotal(index)
}

function UpdateLootCount(e) {
    var targetIndex= e.target.classList[0];
    CountLootTotal(targetIndex);
}