// get a all required element and querySelector for get access from class
const start_button = document.querySelector(".start_button");
const info_box = document.querySelector(".information_box");
const quit_button = info_box.querySelector(".buttons .exit_button");
const continue_button = info_box.querySelector(".buttons .continue_button");
const quiz_box = document.querySelector(".quiz_box");
const next_button = document.querySelector(".next_button");
const quection_text = document.querySelector(".quiz_questions");
const option_text = document.querySelector(".quiz_options");
const timercount = quiz_box.querySelector(".timer .timer_count");
const result_quiz = document.querySelector(".result_quiz");
const restart_quiz = result_quiz.querySelector(".again_button");
const quit_quiz = result_quiz.querySelector(".quit_button");

// if Start button clicked execute info_box
start_button.onclick = () => {
  info_box.classList.add("active_info"); //show info_box
};//classlist give access for add active_info class

// if Start button clicked execute info_box
quit_button.onclick = () => {
  info_box.classList.remove("active_info");//show info_box
};//classlist give access for add active_info class

// if continue button clicked execute info_box and quiz_box
continue_button.onclick = () => {
  info_box.classList.remove("active_info");//hide info_box  classlist give access for add active_info class
  quiz_box.classList.add("active_result");//show quiz_box   classlist give access for add active_result class
  show_quections(0);    //give arguments for show_quections function
  quection_counter(1);  //give arguments for quection_counter function
  starttimer(60);       //give arguments for starttimer function
};

let quection_count = 0; 
let que_num = 1;
let counter;
let correctanswers = 0;
let tooktime = 0;
let wronganswers = 0;

//if Quit button clicked reload our page
quit_quiz.onclick = () => {
  window.location.reload();
};
restart_quiz.onclick = () => {
  quiz_box.classList.add("active_result");  //show quiz_box
  result_quiz.classList.remove("active_result1"); //hide result_box
  quection_count = 0;
  que_num = 1;
  counter;
  correctanswers = 0;
  tooktime = 0;
  wronganswers = 0;
  show_quections(quection_count);
  quection_counter(que_num);
  starttimer(60);
  next_button.style.display = "none";
};
//if next button clicked 
next_button.onclick = () => {
  if (quection_count < quections.length - 1) {
    quection_count++;
    que_num++;
    show_quections(quection_count); //give arguments for show_quections function
    quection_counter(que_num);      //give arguments for quection_counter function
    next_button.style.display = "none";
  } else {
    console.log("quection completed");
    showresultbox();
    clearInterval(counter);
    timercount.textContent = "00";
    timercount.textContent = "60";
  }
};

//getting question and option from quections array
function show_quections(index) {
  let quection_tag =
    "<span>" +
    quections[index].number +
    "." +
    quections[index].quection +
    "</span>";
  let option_tag =
    '<div class="options"><span>' +
    quections[index].options[0] +
    "</span></div>" +
    '<div class="options"><span>' +
    quections[index].options[1] +
    "</span></div>" +
    '<div class="options"><span>' +
    quections[index].options[2] +
    "</span></div>" +
    '<div class="options"><span>' +
    quections[index].options[3] +
    "</span></div>";

  quection_text.innerHTML = quection_tag;
  option_text.innerHTML = option_tag;

  const option = option_text.querySelectorAll(".options");
  for (let i = 0; i < option.length; i++) {
    option[i].setAttribute("onclick", "optionselected(this)");
  }
}
function optionselected(answer) {
  let useranswer = answer.textContent;  // getting user answer
  let correctanswer = quections[quection_count].answer; // getting correct answer from quections list
  let alloptions = option_text.children.length;
  if (useranswer == correctanswer) {    // check useranswer and correctanswer are equal
    answer.classList.add("correct");
    console.log("Answer is correct");
    correctanswers++;
  } else {
    answer.classList.add("incorrect");
    console.log("Answer is wrong");
    wronganswers++;

    //if user entered answer is incorrect automatically show  correct one
    for (let i = 0; i < alloptions; i++) {
      if (option_text.children[i].textContent == correctanswer) {
        option_text.children[i].classList.add("correct");
      }
    }
  }

  // once user select answer disabled options
  for (let i = 0; i < alloptions; i++) {
    option_text.children[i].classList.add("disable");
  }
  next_button.style.display = "block";
}

function starttimer(time) {
  counter = setInterval(timer, 1000);

  // time function to manage time
  function timer() {
    time--;
    tooktime++;

    if (time >= 10) {
      timercount.textContent = time;
    } else {
      timercount.textContent = "0" + time;
      if (time <= 0) {
        clearInterval(counter);
        timercount.textContent = "00";
      }
    }
  }
}

// quection_counter to show quaction count
function quection_counter(index) {
  const ques_counter = quiz_box.querySelector(".quiz_total");
  let total_counter_tag =
    "<span>Question:<p>" +
    index +
    "</p><p>" +
    "/" +
    "</p><p>" +
    quections.length +
    "</p></span>";
  ques_counter.innerHTML = total_counter_tag;
}

// This function to show result box
function showresultbox() {
  info_box.classList.remove("active_info");
  quiz_box.classList.remove("active_result");
  result_quiz.classList.add("active_result1");
  const score_text = result_quiz.querySelector(".feedback");
  const score_time = result_quiz.querySelector(".youtooktime");
  const score = result_quiz.querySelector(".scorecount");
  const wrong_score = result_quiz.querySelector(".wronganswers");

  // showing wrong answers
  let wrong_score_tag = "<div>" + wronganswers + "</div>";
  wrong_score.innerHTML = wrong_score_tag;

  // showing score of correct answers
  let score_count_tag = "<div>" + correctanswers + "</div>";
  score.innerHTML = score_count_tag;

  // showing score of user took time for answered quections

  let score_time_tag = '<div class="youtooktime">' + tooktime + "</div>";
  score_time.innerHTML = score_time_tag;

  // this if for showing Exellent work or midium work or low work
  if (correctanswers > 6) {
    let scoretag = "<span style='color:#008000'>Exellent work</span>";
    score_text.innerHTML = scoretag;
    
    
  } else if (correctanswers >= 3 && correctanswers<=5) {
    let scoretag = "<span style='color:#FFC300 '>Medium work</span>";
    score_text.innerHTML = scoretag;
    
  } else {
    let scoretag = "<span style='color:#D70040'>Low work</span>";
    score_text.innerHTML = scoretag;
    
  }
}
