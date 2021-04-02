const allNumbers = document.querySelectorAll('.number');
const allOperators = document.querySelectorAll('.operator');
const input = document.querySelector('.input');
const prevNum = document.querySelector('.prevNum'); 
const currNum = document.querySelector('.currNum'); 
const output = document.querySelector('.output');
const equal = document.querySelector('.equal');
const convert = document.querySelector('.convert');

const add  = (x, y) => {
  return x + y;
}

const subtract  = (x, y) => {
  return x - y;
}

const multiply  = (x, y) => {
  return x * y;
}

const divide  = (x, y) => {
  if (y !== 0) return x / y;
  alert("You can't divide by 0!");
}

const operate = (operator, x, y) => {
  let func;
  if (operator === "+") func = add(x, y);
  else if (operator === "-") func = subtract(x, y); 
  else if (operator === "*") func = multiply(x, y); 
  else if (operator === "/") func = divide(x, y);  
  return func;
}

allOperators.forEach(operator => {
  operator.addEventListener('click', () => {
    let sign = operator.textContent;
    if (currNum.textContent === "" && output.textContent === "") {
      alert(`You must enter a number before you enter ${sign}`);
    }
    else {
      if (prevNum.textContent === "") {
        prevNum.textContent = `${currNum.textContent} ${sign}`;
        currNum.textContent = "";
      }
      else {
        let prevLen = prevNum.textContent.length;
        if (prevNum.textContent[prevLen - 1] === "/" && parseFloat(currNum.textContent) === 0){
          output.textContent = "Can't divide by zero!"
          prevNum.textContent = "";
          currNum.textContent = "";
        }
        else {
          let result = `${operate(prevNum.textContent[prevLen - 1], parseFloat(prevNum.textContent), parseFloat(currNum.textContent))}`;
          prevNum.textContent = `${Math.round((parseFloat(result) + Number.EPSILON) * 10000) / 10000} ${sign}`;
          currNum.textContent = ""
        }
      } 
    }

    if (output.textContent !== "") {
      prevNum.textContent = `${Math.round((parseFloat(output.textContent) + Number.EPSILON) * 10000) / 10000} ${sign}`;
      output.textContent = "";
    }
  })
})

allNumbers.forEach(number => {
  number.addEventListener('click', () => {
    if (number.textContent !== ".") currNum.textContent += number.textContent;
    let counter = 0;
    for (let i = 0; i < currNum.textContent.length; i++) {
      if (currNum.textContent[i] === ".") {
        counter++;
      }
    }
    if (counter < 1 && number.textContent === ".") {
      currNum.textContent += number.textContent
    }
    output.textContent = "";
  })
})

const clear = document.querySelector('.clear');
clear.addEventListener('click', () => {
  currNum.textContent = "";
  prevNum.textContent = "";
  output.textContent = "";
})

const dlt = document.querySelector('.delete');
dlt.addEventListener('click', () => {
  currNum.textContent = currNum.textContent.slice(0, -1);
  if (currNum.textContent === "" && prevNum.textContent.length > 2) {
    prevNum.textContent = prevNum.textContent.slice(0, -2);
    currNum.textContent = prevNum.textContent;
    prevNum.textContent = "";
  }

  if (output.textContent !== "") {
    output.textContent = output.textContent.slice(0, -1);
  }
})

equal.addEventListener('click', () => {
  if (prevNum.textContent !== "" && currNum.textContent !== ""){
    if (prevNum.textContent[prevNum.textContent.length - 1] === "/" && parseFloat(currNum.textContent) === 0) {
      output.textContent = "Can't divide by zero!";
    }
    else {
      output.textContent = `${Math.round((operate(prevNum.textContent[prevNum.textContent.length - 1], parseFloat(prevNum.textContent), parseFloat(currNum.textContent)) + Number.EPSILON) * 10000) / 10000}`;
    }
  }
  else {
    alert("No input!")
  }
  currNum.textContent = "";
  prevNum.textContent = "";
})


convert.addEventListener('click', () => {
  if (currNum.textContent === "") {
    alert("Nothing to convert!");
  }
  else {
    let newNum = currNum.textContent.split("");
    if (currNum.textContent[0] !== "-") {
      newNum.unshift("-");
      currNum.textContent = newNum.join("");
    }
    else {
      newNum.shift();
      currNum.textContent = newNum.join("");
    }
  }
}) 

