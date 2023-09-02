export class Quiz {
  constructor(result) {
    this.results = result;
    console.log(this.results);
    document.getElementById("to").innerText= this.results.length;
    this.currentIndex = 0;
    this.currentQuestion = document.getElementById("currentQuestion");
    this.question = document.getElementById("questionQuiz");
    this.correctAnswer;
    this.score=0;

    this.showQuestions();
    document.getElementById("nextQuestion").addEventListener("click", ()=>{
      this.nextQuestion()
    });

     document.getElementById("tryAgain").addEventListener("click" , ()=> {
      location.reload();
     });
  }
  showQuestions(){
    this.currentQuestion.innerText = this.currentIndex+1;
    this.currentQuestion = this.results[this.currentIndex];
    this.question.innerText = this.currentQuestion.question;
    this.answer = [...this.currentQuestion.incorrect_answers];
    // console.log(this.answer);
    this.correctAnswer = this.currentQuestion.correct_answer;
    this.randomNum = Math.floor(Math.random() * this.answer.length);
    this.answer.splice(this.randomNum , 0,this.correctAnswer);
    // console.log(this.answer);
    // console.log(this.randomNum)
    // console.log(this.correctAnswer);
    let container = ``;
    for(let i =0 ; i<this.answer.length ; i++){
      container += `
        <li>
          <div>
            <input type="radio" name="answer" value="${this.answer[i]}">
            <label> ${this.answer[i]} </label>
          </div>
        </li>
      `;
    }
    document.getElementById("answerBox").innerHTML= container;
  }
  nextQuestion(){
    let cheakedAnswer = document.querySelector('[ name="answer"]:checked')?.value;
    console.log(cheakedAnswer);
    if(cheakedAnswer != undefined){
      $("#alertQuestions").addClass("d-none");
      this.currentIndex++;
        if(this.currentIndex > this.results.length-1){
          $("#Score").removeClass("show");
          $("#questions").addClass("d-none");
          document.getElementById("getScore").innerText = this.score;
        }else{

            if (cheakedAnswer === this.correctAnswer) {
              $("#correct").fadeIn(0);
              setTimeout(() => {
                $("#correct").fadeOut(0);
              }, 300);
              this.score++;
            } else {
              $("#inCorrect").fadeIn(0);
              setTimeout(() => {
                $("#inCorrect").fadeOut(0);
              }, 300);
            }
            
          }
          this.showQuestions()
    }else{
      $("#alertQuestions").removeClass('d-none');
    }
  }
}