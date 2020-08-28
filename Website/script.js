// CATEGORY 01 START -------------------------------------------------------

function handleNext(sectionNum) {
  (function (global) {
    var qName;
    var value;
    var A1Path = window.location.pathname;
    var A1Path = A1Path.substring(A1Path.lastIndexOf('/') + 1);
    var temp = "section-0" + sectionNum + ".html";

    //Handles Saving of radio buttons
    if (A1Path == temp) {
      for (var x = 1; x < 4; x++) {
        qName = "A" + x;
        var radioBtns = document.getElementsByName(qName);
        for (var i = 0; i < radioBtns.length; i++) {
          if (radioBtns[i].checked) {
            value = radioBtns[i].value;
            break;
          }
          else if (i == radioBtns.length - 1 && !radioBtns[i].checked) {
            value = "null"; //error check none chosen
          }
        }
        qName = qName + "_" + sectionNum;
        console.log(qName);
        global.sessionStorage.setItem(qName, value);
        console.log(global.sessionStorage.getItem(qName));
      }

    }
    if (sectionNum == 9) {
      window.location.href = "../questionnaireSections/" + "confirmation.html";
      return;
    }
    sectionNum = sectionNum + 1; //move to next page
    temp = "section-0" + sectionNum + ".html";
    window.location.href = "../questionnaireSections/" + temp;
  }(window));

}


var resultsPath = window.location.pathname;
var resultsPath = resultsPath.substring(resultsPath.lastIndexOf('/') + 1);
if (resultsPath == "results.html") { //check if you are on results page
  (function (global) {  //using global variable
    var totalScore = 0;
    var max = 0;
    for (var s = 1; s <= 9; s++) { //loops through 9 sections
      for (var i = 1; i < 4; i++) { //loops throuhg questions
        if (parseInt(global.sessionStorage.getItem("A" + i + "_" + s)) == 0) {
          max += 5;
        }
        totalScore = totalScore + (parseInt(global.sessionStorage.getItem("A" + i + "_" + s)));//Adds up values 
      }
    }
    console.log(max);

    //resultMessage;

    var resultMessage = "You have completed the questionnaire! ";


    var score = "<br><br>Your total score is: ";

    console.log("Total: " + totalScore + " | Perc: " + (totalScore / (135 - max) * 100) + "%");
    if (((totalScore / (135 - max) * 100)) >= 90 && totalScore != 0) {
      resultMessage = resultMessage + "Great Quality! " + score + totalScore + "/" + (135 - max);
    }
    else if (((totalScore / (135 - max) * 100)) >= 80 && totalScore != 0) {
      resultMessage = resultMessage + "Good Quality! " + score + totalScore + "/" + (135 - max);
    }
    else if (((totalScore / (135 - max) * 100)) >= 70 && totalScore != 0) {
      resultMessage = resultMessage + "Okay Quality. " + score + totalScore + "/" + (135 - max);
    }
    else if (((totalScore / (135 - max) * 100)) <= 60 && totalScore != 0) {
      resultMessage = resultMessage + "Poor Quality. " + score + totalScore + "/" + (135 - max);
    }
    else if (totalScore == 0) {
      resultMessage = resultMessage + "Not Applicable. " + score + totalScore + "/" + (135 - max);
    }

    document.getElementById("resultScore").innerHTML = resultMessage;
    console.log(resultMessage);
    var maxSection = 0;
    var subScores = 0;
    var arrayOfScores = new Array(9);
    for (var s = 1; s <= 9; s++) { //loops through 9 sections
      maxSection = 0;
      for (var i = 1; i < 4; i++) { //loops through questions
        if (parseInt(global.sessionStorage.getItem("A" + i + "_" + s)) == 0) {
          maxSection += 5;
        }
        subScores = subScores + (parseInt(global.sessionStorage.getItem("A" + i + "_" + s)));
      }

      arrayOfScores[s] = subScores;

      //console.log(arrayOfScores[s]);
      if (15 - maxSection == 0) {
        document.getElementById("sec" + s).innerHTML = "N/A";
        document.getElementById("perc" + s).innerHTML = "N/A";
      } else {
        document.getElementById("sec" + s).innerHTML = arrayOfScores[s] + "/" + (15 - maxSection);
        document.getElementById("perc" + s).innerHTML = (Math.floor(arrayOfScores[s] / (15 - maxSection) * 100)) + "%";
      }

      subScores = 0;
    }


    console.log("sessionStorage Reset to zero!")
  }(window));
}

//Handles loading of selected radio buttons
function loadRadioBtn(sectionNumLoader) {
  (function (global) {
    var qName;
    var A1Path = window.location.pathname;
    var A1Path = A1Path.substring(A1Path.lastIndexOf('/') + 1);
    var temp = "section-0" + sectionNumLoader + ".html";
    for (var x = 1; x < 4; x++) {
      qName = "A" + x.toString();
      var radioBtnID = document.getElementById(qName + "_0" + global.sessionStorage.getItem("A" + x + "_" + sectionNumLoader));
      radioBtnID.checked = true;
    }
  }(window));
}

//function yea idk what im doing help //Allow me to start it for you//
function loadForConfirmation() {
  (function (global) {//needed to use the sessionStorage (which has all the radio buttons)
    var qName;
    var A1Path = window.location.pathname;
    var A1Path = A1Path.substring(A1Path.lastIndexOf('/') + 1);
    var abc = "ABCDEFGHI";
    var index = 0;
    for (var s = 1; s <= 9; s++) {// s for section
      for (var q = 1; q < 4; q++) {// q for question
        qName = abc.substring(index, index + 1) + q;
        //console.log(global.sessionStorage.getItem("A" + q + "_" + s));
        var radioBtnID = document.getElementById(qName + "_0" + global.sessionStorage.getItem("A" + q + "_" + s));//First part gets the radio button via id. Second part gets the value of the radio button saved in the sessionStorage
        radioBtnID.checked = true;//Whatever the value of the radio button is, that is found from above line, is checked
      }
      index++;
    }
  }(window));//Needed for function global
}

function resetQuestionnaire() {
  (function (global) {
    //Resets sessionStorage to zero
    for (var s = 1; s <= 9; s++) {
      for (var i = 1; i < 4; i++) {
        global.sessionStorage.setItem("A" + i + "_" + s, 0);
      }
    }
     window.location.href = "../questionnaireSections/pre-questionnaire.html";
  }(window));
}

function printScreen() {
  window.print();
}
