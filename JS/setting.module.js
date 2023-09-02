import { Quiz } from "./Questions.module.js";
export class Setting {
  constructor() {
    // !----Btn-Click
    document.getElementById("btnSetting").addEventListener("click", () => {
      this.getSettingData();
    //   this.getApiQueations();
    });
  }

//   !----GetData
  async getSettingData() {
    let category = document.getElementById("cat").value;
    console.log(category);
    let difficulty = document.querySelector(
      '[name="difficulty"]:checked'
    ).value;
    console.log(difficulty);
    let numberOfQuestions = document.getElementById("numberOfQuestions").value;
    console.log(numberOfQuestions);
    if ((numberOfQuestions > 0) & (numberOfQuestions <= 50)) {
      let result = await this.getApiQueations(
        category,
        difficulty,
        numberOfQuestions
      );
      $(".alertSetting").addClass("d-none");
      $("#settingQ").addClass("show");
      $("#questions").fadeIn(500);
      let quizQuestions = new Quiz(result); 
    } else {
      $(".alertSetting").removeClass("d-none");
    }
  }

// !----Api
  async getApiQueations(category, difficulty, numberOfQuestions) {
    let apiResponse = await fetch(
      `https://opentdb.com/api.php?amount=${numberOfQuestions} &category=${category} &difficulty=${difficulty}`
    );
    let responce = await apiResponse.json();
    // console.log(responce.results);
    return responce.results;
  }
}
