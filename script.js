var input = document.querySelectorAll("input");

//Stop autocomplete
for(let i=0; i<input.length; i++)
{
    input[i].setAttribute("autocomplete", "off");
}

for(var i=0;i<input.length;i++){
    input[i].addEventListener("keypress", 
    function (e) {  // Accept only numbers
        var regex = new RegExp("[1-9]");
        var str = e.key;
        if (regex.test(str)) {
            return true;
        }
    
        e.preventDefault();
        return false;
  });
}

window.onload=function(){
    document.getElementById("defaultLevel").click();
  };

function changeColor(e){
    e.target.style.border = "2px solid #4689c4";
    var sibling = e.target.previousElementSibling;
	while (sibling) {
        sibling.style.border = "none";
		sibling = sibling.previousElementSibling;
	}
    sibling = e.target.nextElementSibling;
    while (sibling) {
        sibling.style.border = "none";
		sibling = sibling.nextElementSibling;
	}
    var btnText = e.target.innerText;
    difficulty(btnText);
}

var easy = [
    ["",3,"","",6,5,2,4,""],
    ["","","","","","","","",""],
    ["","",8,2,3,"","","",""],
    ["","","","","",6,1,"",""],
    ["",8,9,"","","","",5,""],
    ["","",7,"",8,9,"","",""],
    [4,9,"",1,"","","","",2],
    [7,"","","",5,8,"",6,9],
    ["","","","","","",4,"",""]
 ]

 var easyAns = [
    [9,3,1,8,6,5,2,4,7],
    [2,6,4,9,1,7,8,3,5],
    [5,7,8,2,3,4,9,1,6],
    [3,2,5,7,4,6,1,9,8],
    [6,8,9,3,2,1,7,5,4],
    [1,4,7,5,8,9,6,2,3],
    [4,9,6,1,7,3,5,8,2],
    [7,1,2,4,5,8,3,6,9],
    [8,5,3,6,9,2,4,7,1]
 ]

var medium = [
      ["","","","",6,"","",7,""],
      ["","",8,7,4,"","",5,""],
      ["","","","","","","","",""], 
      ["",7,"",8,"","","","",""],
      [2,"","","",3,"",6,4,""],
      ["",4,"","","",9,"",3,1],
      ["",5,"",3,"","",2,"",""],
      ["","","","",9,"","","",""],
      ["",1,7,"","","",5,"",""]
   ]

   var mediumAns = [
    [5,3,9,1,6,8,4,7,2],
    [1,6,8,7,4,2,3,5,9],
    [7,2,4,9,5,3,8,1,6], 
    [6,7,3,8,1,4,9,2,5],
    [2,9,1,5,3,7,6,4,8],
    [8,4,5,6,2,9,7,3,1],
    [9,5,6,3,7,1,2,8,4],
    [3,8,2,4,9,5,1,6,7],
    [4,1,7,2,8,6,5,9,3]
 ]

var hard = [
    ["",6,"","",9,1,"","",""],
    [5,"",7,"","","","","",8],
    ["",2,"","","","","",5,""], 
    ["","","",7,"",9,6,"",4],
    ["","",6,8,"","","","",7],
    ["",4,"","","","","",3,""],
    ["","","","","",4,5,1,""],
    [4,"","","","",6,7,"",9],
    ["","","","","",7,"","",""]
   ]

   var hardAns = [
    [3,6,8,5,9,1,4,7,2],
    [5,1,7,4,2,3,9,6,8],
    [9,2,4,6,7,8,3,5,1], 
    [1,8,5,7,3,9,6,2,4],
    [2,3,6,8,4,5,1,9,7],
    [7,4,9,1,6,2,8,3,5],
    [6,7,2,9,8,4,5,1,3],
    [4,5,3,2,1,6,7,8,9],
    [8,9,1,3,5,7,2,4,6]
   ]

function difficulty(btnText) {
  
    for (var i = 0; i < input.length; i++) {
        input[i].value = "";
        input[i].removeAttribute("disabled", false);
        input[i].classList.remove("prefilled");
        input[i].removeAttribute("class");
    }

    var level = [];
    if(btnText == "Easy")
    {
        level = easy;
    }
    else if(btnText == "Medium")
    {
        level = medium;
    }
    else if(btnText == "Hard")
    {
        level = hard;
    }
    
    level = level.join().split(",");

    for (let i = 0; i < input.length; i++) {
        input[i].value = level[i];
        
        if(level[i].length>0)
        {
            input[i].setAttribute("disabled", true);
            input[i].classList.add("prefilled");
        }
    }
}

function getUserAnswers() {
    
    var userAns = [];
    for (let i=0; i<input.length; i++) {
        userAns.push(input[i].value);
    }
    return userAns;
}

function validate() {
      // checking sum of row and columns
  var userAns = getUserAnswers();
  let l = 1;
  for (let i of userAns) {
    let sum = 0;

    for (let i = 0; i < 9; i++) {
      if (userAns != " ") sum += userAns[i];
      for (let j = i + 9; j < 81; j += 9) {
        if (userAns != " ") sum += userAns[j];
      }
    }
    if (sum != 405) {
      l = 0;
    }
    if (l != 0) {
      checks();

      for (let i = 0; i < 81; i++) {
        if (getId(i).classList.contains("wrong")) {
          l = 0;
          break;
        }
      }
    }
  }
  if (l == 1) {
    endGame();
    return;
  } else {
    alert("Something is not right, Try again.");
  }    
}

function endGame() {
    for (let i = 0; i < 81; i++) {
      getId(i).classList.add("prefilled");
    }
    alert("Hurray!, You Win");
}

function checks(id) {
    let col = parseInt(id % 9);
    let row = parseInt(id / 9);
    let s = id;
    var solution = getUserAnswers();
    
    for(let i=0; i<input.length; i++){
        input[i].classList.remove("selected");
    }   
    getId(id).classList.add("selected");

    for (let i = 0; i < 81; i++) {
      input[i].classList.remove("highlight");
    }
  
    //vertically checking duplicates
    for (let i = col; i < col + 73; i += 9) {
      let ins = 1;
      if (i != s) {
        getId(i).classList.add("highlight");
      }
      for (let j = col; j < col + 73; j += 9) {
        if (i != j && solution[i] == solution[j]) {
          getId(i).classList.add("wrong");
          getId(j).classList.add("wrong");
  
          ins++;
        }
      }
      if (ins == 1) {
        for (let j = col; j < col + 73; j += 9) {
          if (solution[i] == solution[j]) {
            getId(i).classList.remove("wrong");
            getId(j).classList.remove("wrong");
          }
        }
      }
    }
  
    // horizontally checking duplicates
    for (let i = row * 9; i < row * 9 + 9; i++) {
      let ins = 1;
      if (i != s) {
        getId(i).classList.add("highlight");
      }
      for (let j = row * 9; j < row * 9 + 9; j++) {
        if (i != j && solution[i] == solution[j]) {
          getId(i).classList.add("wrong");
          getId(j).classList.add("wrong");
  
          ins++;
        }
      }
      if (ins == 1) {
        for (let j = row * 9; j < row * 9 + 9; j++) {
          if (solution[i] == solution[j]) {
            getId(i).classList.remove("wrong");
          }
        }
      }
    }

    // checking sum of box1
    let x = 0;
    let y = 3;
    if ((-1 < s && s < 3) || (8 < s && s < 12) || (17 < s && s < 21)) {
      for (let i = x; i < y; i++) {
        for (let j = i; j < i + 19; j += 9) {
          let ins = 1;
          if (j != s) {
            getId(j).classList.add("highlight");
          }
          for (let k = x; k < y; k++) {
            for (let l = k; l < k + 19; l += 9) {
              if (l != j && solution[l] == solution[j]) {
                getId(j).classList.add("wrong");
                getId(l).classList.add("wrong");
                ins++;
              }
            }
          }
          if (ins == 1) {
            for (let k = x; k < y; k++) {
              for (let l = k; l < k + 19; l += 9) {
                if (solution[l] == solution[j]) {
                  getId(j).classList.remove("wrong");
                  getId(l).classList.remove("wrong");
                }
              }
            }
          }
        }
      }
    }
    //checking sum of box2
    x = 3;
    y = 6;
    if ((2 < s && s < 6) || (11 < s && s < 15) || (20 < s && s < 24)) {
      for (let i = x; i < y; i++) {
        for (let j = i; j < i + 19; j += 9) {
          let ins = 1;
          if (j != s) {
            getId(j).classList.add("highlight");
          }
          for (let k = x; k < y; k++) {
            for (let l = k; l < k + 19; l += 9) {
              if (l != j && solution[l] == solution[j]) {
                getId(j).classList.add("wrong");
                getId(l).classList.add("wrong");
                ins++;
              }
            }
          }
          if (ins == 1) {
            for (let k = x; k < y; k++) {
              for (let l = k; l < k + 19; l += 9) {
                if (solution[l] == solution[j]) {
                  getId(j).classList.remove("wrong");
                  getId(l).classList.remove("wrong");
                }
              }
            }
          }
        }
      }
    }
    //checking sum of box3
    x = 6;
    y = 9;
    if ((5 < s && s < 9) || (14 < s && s < 18) || (23 < s && s < 27)) {
      for (let i = x; i < y; i++) {
        for (let j = i; j < i + 19; j += 9) {
          let ins = 1;
          if (j != s) {
            getId(j).classList.add("highlight");
          }
          for (let k = x; k < y; k++) {
            for (let l = k; l < k + 19; l += 9) {
              if (l != j && solution[l] == solution[j]) {
                getId(j).classList.add("wrong");
                getId(l).classList.add("wrong");
                ins++;
              }
            }
          }
          if (ins == 1) {
            for (let k = x; k < y; k++) {
              for (let l = k; l < k + 19; l += 9) {
                if (solution[l] == solution[j]) {
                  getId(j).classList.remove("wrong");
                  getId(l).classList.remove("wrong");
                }
              }
            }
          }
        }
      }
    }
    //checking sum of box4
    x = 27;
    y = 30;
    if ((26 < s && s < 30) || (35 < s && s < 39) || (44 < s && s < 48)) {
      for (let i = x; i < y; i++) {
        for (let j = i; j < i + 19; j += 9) {
          let ins = 1;
          if (j != s) {
            getId(j).classList.add("highlight");
          }
          for (let k = x; k < y; k++) {
            for (let l = k; l < k + 19; l += 9) {
              if (l != j && solution[l] == solution[j]) {
                getId(j).classList.add("wrong");
                getId(l).classList.add("wrong");
                ins++;
              }
            }
          }
          if (ins == 1) {
            for (let k = x; k < y; k++) {
              for (let l = k; l < k + 19; l += 9) {
                if (solution[l] == solution[j]) {
                  getId(j).classList.remove("wrong");
                  getId(l).classList.remove("wrong");
                }
              }
            }
          }
        }
      }
    }
    //checking sum of box5
    x = 30;
    y = 33;
    if ((29 < s && s < 33) || (38 < s && s < 42) || (47 < s && s < 51)) {
      for (let i = x; i < y; i++) {
        for (let j = i; j < i + 19; j += 9) {
          let ins = 1;
          if (j != s) {
            getId(j).classList.add("highlight");
          }
          for (let k = x; k < y; k++) {
            for (let l = k; l < k + 19; l += 9) {
              if (l != j && solution[l] == solution[j]) {
                getId(j).classList.add("wrong");
                getId(l).classList.add("wrong");
                ins++;
              }
            }
          }
          if (ins == 1) {
            for (let k = x; k < y; k++) {
              for (let l = k; l < k + 19; l += 9) {
                if (solution[l] == solution[j]) {
                  getId(j).classList.remove("wrong");
                  getId(l).classList.remove("wrong");
                }
              }
            }
          }
        }
      }
    }
    //checking sum of box6
    x = 33;
    y = 36;
    if ((32 < s && s < 36) || (41 < s && s < 45) || (50 < s && s < 54)) {
      for (let i = x; i < y; i++) {
        for (let j = i; j < i + 19; j += 9) {
          let ins = 1;
          if (j != s) {
            getId(j).classList.add("highlight");
          }
          for (let k = x; k < y; k++) {
            for (let l = k; l < k + 19; l += 9) {
              if (l != j && solution[l] == solution[j]) {
                getId(j).classList.add("wrong");
                getId(l).classList.add("wrong");
                ins++;
              }
            }
          }
          if (ins == 1) {
            for (let k = x; k < y; k++) {
              for (let l = k; l < k + 19; l += 9) {
                if (solution[l] == solution[j]) {
                  getId(j).classList.remove("wrong");
                  getId(l).classList.remove("wrong");
                }
              }
            }
          }
        }
      }
    }
    //checking sum of box7
    x = 54;
    y = 57;
    if ((53 < s && s < 57) || (62 < s && s < 66) || (71 < s && s < 75)) {
      for (let i = x; i < y; i++) {
        for (let j = i; j < i + 19; j += 9) {
          let ins = 1;
          if (j != s) {
            getId(j).classList.add("highlight");
          }
          for (let k = x; k < y; k++) {
            for (let l = k; l < k + 19; l += 9) {
              if (l != j && solution[l] == solution[j]) {
                getId(j).classList.add("wrong");
                getId(l).classList.add("wrong");
                ins++;
              }
            }
          }
          if (ins == 1) {
            for (let k = x; k < y; k++) {
              for (let l = k; l < k + 19; l += 9) {
                if (solution[l] == solution[j]) {
                  getId(j).classList.remove("wrong");
                  getId(l).classList.remove("wrong");
                }
              }
            }
          }
        }
      }
    }
    //checking sum of box8
    x = 57;
    y = 60;
    if ((56 < s && s < 60) || (65 < s && s < 69) || (74 < s && s < 78)) {
      for (let i = x; i < y; i++) {
        for (let j = i; j < i + 19; j += 9) {
          let ins = 1;
          if (j != s) {
            getId(j).classList.add("highlight");
          }
          for (let k = x; k < y; k++) {
            for (let l = k; l < k + 19; l += 9) {
              if (l != j && solution[l] == solution[j]) {
                getId(j).classList.add("wrong");
                getId(l).classList.add("wrong");
                ins++;
              }
            }
          }
          if (ins == 1) {
            for (let k = x; k < y; k++) {
              for (let l = k; l < k + 19; l += 9) {
                if (solution[l] == solution[j]) {
                  getId(j).classList.remove("wrong");
                  getId(l).classList.remove("wrong");
                }
              }
            }
          }
        }
      }
    }
    //checking sum of box9
    x = 60;
    y = 63;
    if ((59 < s && s < 63) || (68 < s && s < 72) || (77 < s && s < 81)) {
      for (let i = x; i < y; i++) {
        for (let j = i; j < i + 19; j += 9) {
          let ins = 1;
          if (j != s) {
            getId(j).classList.add("highlight");
          }
          for (let k = x; k < y; k++) {
            for (let l = k; l < k + 19; l += 9) {
              if (l != j && solution[l] == solution[j]) {
                getId(j).classList.add("wrong");
                getId(l).classList.add("wrong");
                ins++;
              }
            }
          }
          if (ins == 1) {
            for (let k = x; k < y; k++) {
              for (let l = k; l < k + 19; l += 9) {
                if (solution[l] == solution[j]) {
                  getId(j).classList.remove("wrong");
                  getId(l).classList.remove("wrong");
                }
              }
            }
          }
        }
      }
    }
  }

  function getId(id) {
    return document.getElementById(id);
  }
