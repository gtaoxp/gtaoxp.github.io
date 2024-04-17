
/**
 * **Get the total XP necessary from 0 to get this level in GTA Online**
 * @param { Number } level - The player level for that we want to get its xp
 * @param { String } type - There's two types of XP in GTA Online, Reputation Points (RP) or Arena Points (AP)
 * @returns { Number | Boolean } If there's nothing it will return false, else it will return the xp value in number.
 */
function getXpNecessary(level, type) {
    if (type == "RP") {
        //Level Max is 8000
        if (level > 8000) return false
        if (level >= 98) {
            return 25 * (level ** 2) + 23575 * level - 1023150
        }
        else {
            let query = `RANK_XP_${level}`
            let value = levels[query]
            if (value == undefined) return false
            else {
                let number = value[0]?.value
                if (number !== undefined) return number
                else return false
            }
        }
    }
    else if (type == "AP") {
        //Arena Points level max is 1000 
        if (level > 1000) return false
        if (typeof level == "number") {
            return 5 * level ** 2 + 45 * level
        }
        else return false
    }
    else if (type == "LSCM-RP") {
        //LS Car Meet Rep is diffeerent for level before 200 and is maxed at level 1000
        if (level <= 200) {
            return (5 * level ** 2 + 195 * level) / 2
        }
        else if (level <= 1000) {
            return 1100 * level + 100500
        }
        else return false
    }
    else return false
}

/**
 * **Get the total XP necessary between two levels in GTA Online**
 * @param { Number } level1 - The first level we want to calculate from
 * @param { Number } level2 - The second level we want to calculate
 * @param { String } type - There's two types of XP in GTA Online, Reputation Points (RP) or Arena Points (AP)
 * @returns { Number | Boolean } If there's nothing it will return false, else it will return the difference of xp value between the two levels in number.
 */
function getXpNecessaryBetweenTwoLevels(level1, level2, type) {
    let level1_value = getXpNecessary(level1, type)
    let level2_value = getXpNecessary(level2, type)

    if (level1_value == false || level2_value == false) return false
    else {
        let sum
        if (level1 > level2) {
            sum = level1_value - level2_value
        }
        else {
            sum = level2_value - level1_value
        }

        return sum
    }
}

/**
 * **This function get the user's input value and display its xp value**
 */
function calculateSingleLevel() {
    let level = Number(document.getElementById("singleLevel").value);
    let type = document.getElementById('select_type').value
    let resultElement = document.getElementById("singleResult");

    let xp = getXpNecessary(level, type)
    if (xp !== false) {
        resultElement.textContent = `Total ${type} necessary for Level ${level.toLocaleString("en")}: ${xp.toLocaleString("en")}`;
    } else {
        resultElement.textContent = "Invalid level or data not available.";
    }
}

/**
 * **This function get the two user's input values and return the xp value between them**
 */
function calculateBetweenLevels() {
    let level1 = Number(document.getElementById("level1").value);
    let level2 = Number(document.getElementById("level2").value);
    let type = document.getElementById('select_type').value
    let resultElement = document.getElementById("betweenLevelsResult");

    let xpBetweenLevels = getXpNecessaryBetweenTwoLevels(level1, level2, type);

    if (xpBetweenLevels !== false) {
        resultElement.textContent = `Total ${type} between Level ${level1.toLocaleString("en")} and Level ${level2.toLocaleString("en")}: ${xpBetweenLevels.toLocaleString("en")}`;
    } else {
        resultElement.textContent = "Invalid levels or data not available.";
    }
}

//console.log(getXpNecessaryBetweenTwoLevels(561, 562).toLocaleString("en"))