
function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function talk(words) {
  var synth = window.speechSynthesis;
  if ('speechSynthesis' in window) {
    var msg = new SpeechSynthesisUtterance(words);
    msg.rate = 1;
    msg.pitch = 1;
    synth.speak(msg);
  }
}

//https://www.thewebflash.com/toggling-fullscreen-mode-using-the-html5-fullscreen-api/
function toggleFullscreen(elem) {
  elem = elem || document.documentElement;
  if (!document.fullscreenElement && !document.mozFullScreenElement &&
      !document.webkitFullscreenElement && !document.msFullscreenElement) {
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.msRequestFullscreen) {
      elem.msRequestFullscreen();
    } else if (elem.mozRequestFullScreen) {
      elem.mozRequestFullScreen();
    } else if (elem.webkitRequestFullscreen) {
      elem.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
    }
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    }
  }
}

function toggleCleanTheme() {
  var bonusTheme = document.getElementById("bonusTheme");
  bonusTheme.href = (bonusTheme.href.substring(bonusTheme.href.length-3, bonusTheme.href.length) != "css" ? "cleanTheme.css" : "");
}

function toggleModal(modal) {
  if(modal.style.display == "none") {
    modal.style.display = "block";
  } else {
    modal.style.display = "none";
  }
}

function closeModal(modal) {
  modal.style.display = "none";
}

function openModal(modal) {
  modal.style.display = "block";
}


var totalRolls = 0;
window.onload = function() {

  var inputs = document.getElementsByTagName("input");
  for(var i = 0; i < inputs.length; i++) {
    inputs[i].onclick = function() {
      this.select();
    }
  }

  //TODO: get to type dash in mod (negatives)
  var numberInputNames = ["numD4", "numD6", "numD8", "numD12", "numD20", "numcustom", "customSides", "D4Mod", "D6Mod", "D8Mod", "D12Mod", "D20Mod", "customMod", "D4Multiplier", "D4Multiplier", "D6Multiplier", "D8Multiplier", "D12Multiplier", "D20Multiplier", "customMultiplier", "Prf", "Spl", "Itv", "Str", "Dex", "Con", "Int", "Wis", "Cha"];
  for(var i = 0; i < numberInputNames.length; i++) {
    document.getElementById(numberInputNames[i]).onkeypress =
      //https://stackoverflow.com/questions/25825843/restrict-user-to-put-value-in-range-in-html-input-type-number
      function (e) {
        var ev = e || window.event;
        if(ev.charCode == 189) //dash
          return true;
        if(ev.charCode < 48 || ev.charCode > 57) //not a digit
          return false;
        else if(this.value * 10 + ev.charCode - 48 > this.max)
          return false;
        return true;
      }
  }

  document.getElementById("simpleButton").onclick = toggleTRs;
  document.getElementById("simpleButton").click();

  updateAll();

}

window.onkeyup = function(e) {
  if(e.keyCode == 13 && e.target.className != "notes") {
    //e.preventDefault(); //prevent enter from refreshing page
    rollAll();
  }
}

//reset functions
function resetDie(name) {
  document.getElementById("num" + name).value = 1;
  document.getElementById(name + "Mod").value = 0;
  document.getElementById(name + "StatMod").value = "None";
  if(name == "D20")
    document.getElementById(name + "BonusMod").value = "None";
  if(name == "custom")
    document.getElementById("customSides").value = 10;
  document.getElementById(name + "Advantage").value = "None";
  document.getElementById(name + "Multiplier").value = 1;
  document.getElementById(name + "MultiplierRadio").reset();
}
function resetStats() {
  var statNames = ["Prf", "Spl", "Itv", "Str", "Dex", "Con", "Int", "Wis", "Cha"];
  for(var i = 0; i < statNames.length; i++)
    document.getElementById(statNames[i]).value = 0;
}

//update info
function update(name) {
  var sides = (name == "custom" ? document.getElementById("customSides").value : name.slice(1, name.length) );
  var isCustom = name == "custom";
  document.getElementById(name + "Label").innerHTML = rollDie(sides, isCustom, true);
}

function updateAll() {
  setTimeout(function(){ //timeout because onclick and onreset call BEFORE values reset
    var dieNames = ["D4", "D6", "D8", "D12", "D20", "custom"];
    for(var i = 0; i < dieNames.length; i++)
      update(dieNames[i]);
  }, 50);
}

//roll functions
function diceRaw(sides, num) {
  var rolls = [];
  for(var i = 0; i < num; i++)
    rolls.push(random(1, sides) );
  return rolls;
}

function rollRaw(sides, isCustom) {
  var result = random(1, sides);
  var resultText = "Rolled 1d" + sides + ": " + result + (sides == 20 ? (result == 20 ? " (Crit!)" : result == 1 ? " (Fail!)" : "") : "") + "\n\n";
  var rollsText = document.getElementById("rollsText");
  rollsText.value = resultText + rollsText.value;
  console.log(resultText);
  document.getElementById( (isCustom ? "custom" : "D" + sides) + "RawResult").value = result;
  document.getElementById("recentRoll").innerHTML = "Most recent result: <b>" + resultText + "</b>";
  totalRolls++;
  document.getElementById("totalRollsP").innerHTML = "You've rolled " + totalRolls + " dice";
  if(document.getElementById("speak").checked) {
    talk(result);
  }
}

function rollAll() {
  rollDie(document.getElementById("customSides").value, true, false);
  rollDie(20, false, false);
  rollDie(12, false, false);
  rollDie(8, false, false);
  rollDie(6, false, false);
  rollDie(4, false, false);
  var names = ["custom", "D4", "D6", "D8", "D12", "D20"], sum = 0;
  for(var i = 0; i < names.length; i++) {
    var val = parseInt(document.getElementById(names[i] + "RawResult").value);
    if(!isNaN(val) ) {
      sum += val;
    }
  }
  var rollsText = document.getElementById("rollsText");
  rollsText.value = "Sum: " + sum + "\n\n" + rollsText.value;
}

function rollDie(sides, isCustom, isPreview) { //TODO:
  var name = isCustom ? "custom" : "D" + sides;
  var num = parseInt(document.getElementById("num" + name).value);

  if(isNaN(num)) {
    num = 1;
  }

  if(num < 1) {
    if(!isPreview) {
      document.getElementById( (isCustom ? "custom" : "D" + sides) + "RawResult").value = "";
    }
    return "0D" + sides;
    //num = 1;
    //document.getElementById("num" + name).value = 1;
  } else if(num > document.getElementById("num" + name).max) {
    num = document.getElementById("num" + name).max;
    document.getElementById("num" + name).value = document.getElementById("num" + name).max;
  }
  var rolls = diceRaw(sides, num);

  var rollsList = "";
  for(var i = 0; i < rolls.length - 1; i++)
    rollsList += rolls[i] + ", ";
  rollsList += rolls[rolls.length - 1];

  var adv = document.getElementById(name + "Advantage").value;
  var rollUsed = 0;
  if(adv == "Adv") {
    var sortedRolls = rolls.sort(); //low to high
    rollUsed = sortedRolls[sortedRolls.length - 1];
  } else if(adv == "Dis") {
    var sortedRolls = rolls.sort(); //low to high
    rollUsed = sortedRolls[0];
  } else {
    for(var i = 0; i < rolls.length; i++)
      rollUsed += rolls[i];
  }

  var mod = document.getElementById(name + "Mod").value;
  var statMod = 0;
  var statType = document.getElementById(name + "StatMod").value;
  if(statType != "None")
    var statMod = document.getElementById(document.getElementById(name + "StatMod").value).value;
  var bonusMod = 0;
  var bonusType = "None";
  if(name == "D20" && document.getElementById(name + "BonusMod").value != "None") {
    var bonusType = document.getElementById(name + "BonusMod").value;
    bonusMod = document.getElementById(bonusType).value;

  }
  var result = rollUsed;
  var multiply = document.getElementById(name + "MultiplierRadio")[0].checked;
  var multiplier = document.getElementById(name + "Multiplier").value;
  if(multiply)
    result *= multiplier;
  else {
    result /= multiplier;
    result = Math.ceil(result);
  }
  mod = parseInt(mod);
  statMod = parseInt(statMod);
  bonusMod = parseInt(bonusMod);
  result += mod + statMod + bonusMod;

  var preview =  num + "D" + sides + (adv == "None" ? "" : " (" + adv.toLowerCase() + ")") + ( multiplier == 1 ? "" : (multiply ? " (*" : " (/") + multiplier + ")" ) + (mod == 0 ? "" : mod > 0 ? " + " + mod : " - " + Math.abs(mod) )
      + (statType == "None" ? "" : (statMod >= 0 ? " + " + statMod : " - " + Math.abs(statMod) ) + "(" + statType.toLowerCase() + ")")
      + (bonusType == "None" ? "" : (bonusMod >= 0 ? " + " + bonusMod : " - " + Math.abs(bonusMod) ) + "(" + bonusType.toLowerCase() + ")");
  var resultText = "Rolled " + preview + "\nRolls: " + rollsList + "\nResult: " + result + "\n\n";
  var rollsText = document.getElementById("rollsText");


  if(!isPreview) {
    rollsText.value = resultText + rollsText.value;
    console.log(resultText);
    document.getElementById( (isCustom ? "custom" : "D" + sides) + "RawResult").value = result;
    document.getElementById("recentRoll").innerHTML = "Most recent result: <b>" + result + "</b>";
    totalRolls += num;

    document.getElementById("totalRollsP").innerHTML = "You've rolled " + totalRolls + " dice";
    if(document.getElementById("speak").checked) {
      talk(result);
    }
  }
  return preview;
}

function toggleTRs() {
  var modTRs = document.getElementsByClassName("modTR");
  for(var i = 0; i < modTRs.length; i++) {
    modTRs[i].style.display = modTRs[i].style.display == "none" ? "table-row" : "none";
  }
  document.getElementById("simpleButton").innerHTML = modTRs[0].style.display == "none" ? "Advanced Display" : "Simple Display";
}
