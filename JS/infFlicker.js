var count = 1;

var currentIndex = 0;

var afxNames = ["/ RICHARD JAMES", "/ AFX", "/ user18081971", "/ POLYGON WINDOW", "/ BLUE CALX", "/ APHEX TWIN ", "/ GAK", "/ BRADLEY STRIDER", "/ CAUSTIC WINDOW", "/ POWER-PILL"];

var infFlicker = {
  flickerStop: false,

  unicode: "!?$ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",
  getRandomInt: function (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  },
  randomCharacter: function () {
    return this.unicode[Math.floor(Math.random() * this.unicode.length)];
  },
  replaceAt: function (text, character, index) {
    return text.substr(0, index) + character + text.substr(index + character.length);
  },
  init: function (element, min, max, delay) {
    var elements = document.querySelectorAll(element);
    for (let i = 0; i < elements.length; i++) {
      var el = elements[i];

      var str = el.innerText.trim(),
        bank = [],
        newStr = "";

      for (let j = 0; j < str.length; j++) {
        bank[j] = this.getRandomInt(min, max);
      }

      this.mix(el, str, newStr, bank, delay);
    }
  },
  mix: function (el, str, newStr, bank, delay) {
    var i = 0;
    var storeArr = [];
    while (str !== newStr) {
      if (str[i] !== newStr[i]) {
        if (bank[i] !== 0) {
          if (str[i] !== " ") {
            newStr = this.replaceAt(newStr, this.randomCharacter(), i);
          } else {
            newStr = this.replaceAt(newStr, " ", i);
          }
          bank[i]--;
        } else {
          newStr = this.replaceAt(newStr, str[i], i);
        }

        storeArr.push(newStr);
      } else {
        i++;
      }

      if (str === newStr) {
        this.flickerStop = true;
        this.finalResult(storeArr, el, delay);
        break;
      }
    }
  },
  finalResult: function (storeArr, el, delay) {
    var n = 0;
    var time = setInterval(() => {
      el.innerText = storeArr[n];
      n++;

      if (n === storeArr.length) {
        clearInterval(time);
        updateText(el);
      }
    }, delay);
  },
};

function updateText(el) {
  currentIndex = (currentIndex + 1) % afxNames.length;
  el.innerText = afxNames[currentIndex];
  infFlicker.init(".infFlicker", 1, 10, 40);
}

function myLoop() {
  //  create a loop function
  setTimeout(function () {
    //  call a 3s setTimeout when the loop is called
    infFlicker.init(".infFlicker", 1, 10, 40);
    count++; //  increment the counter
    console.log(count);
    if (count < 100) {
      //  if the counter < 10, call the loop function
      myLoop(); //  ..  again which will trigger another
    } //  ..  setTimeout()
  }, 7000);
}

myLoop();
// flicker.init(".flicker", 1, 10, 40);
