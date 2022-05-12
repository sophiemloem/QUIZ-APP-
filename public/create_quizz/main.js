
const question_title = document.querySelector("#question");
const answerA = document.querySelector("#answerA");
const answerB = document.querySelector("#answerB");
const answerC = document.querySelector("#answerC");
const answerD = document.querySelector("#answerD");
const correct_Answer_All = document.querySelectorAll(".radio_answer");
let domDisplay = document.getElementById("listQuestion");
let domContain = document.getElementsByClassName("container_quiz");
const points = document.querySelector('#points');
let Titleques = document.querySelector("#quiz_title");

let click = false;

// Get data from input ----------

const createQuestion =() =>{
    let questions = 
        {   
            title: question_title.value,
            answer:{
                answer1: answerA.value,
                answer2: answerB.value,
                answer3: answerC.value,
                answer4: answerD.value,
            },
            score: points.value        
        }

    for (let correct of correct_Answer_All){
        if (correct.checked){  
            questions["correct_ans"] = correct.id;
            click = true;
        }
    }
    console.log(questions)
    return questions;
};

const btn_add = document.querySelector("#btn-add");
btn_add.addEventListener('click', createQuestion);

// function to show the element

const show = (element) => {
    element.style.display = 'block';
}

// Fucntion hide elemet
const hide = (element) => {
    element.style.display = 'none';
}



function show_menus() {
    document.querySelector(".containers").style.display = "none";
    document.querySelector(".create-quiz").style.display = "none";
    document.querySelector(".group-start").style.display = "flex";
    document.querySelector(".Total_score").style.display = "none";
    document.querySelector(".container_quiz").style.display = "none";

} 

function show_hide() {
   
    document.querySelector(".create-quiz").style.display = "block";
    document.querySelector(".group-start").style.display = "none";
    document.querySelector(".Total_score").style.display = "none";
    document.querySelector(".container_quiz").style.display = "none";
   

}

//  function to display the question when user create 

function display_all(alldata){
    while(domDisplay.firstChild){
        domDisplay.removeChild(domDisplay.lastChild);
    };
    let dom_title= document.createElement("div");
    dom_title.className = "form-groups";
    let titles = document.createElement("p");
    titles.className = "form-control title";
    titles.textContent = Titleques.value;
    dom_title.appendChild(titles);
    domDisplay.appendChild(dom_title);
    for (let display of alldata){
        let add_questions_container = document.createElement('div');
        add_questions_container.className = "question_list";
        add_questions_container.id = display._id;
        domDisplay.appendChild(add_questions_container);
        let div_questions = document.createElement('div');
        div_questions.className = "questions";
        div_questions.textContent= display.title;
        add_questions_container.appendChild(div_questions);
    
        let form_group = document.createElement('div');
        form_group.className="form_group";
        div_questions.appendChild(form_group)
    
        let answers = document.createElement('div');
        answers.className = "answers";
        add_questions_container.appendChild(answers)
        let index = ["1","2","3","4"];
        let ans = [display.answer.answer1,display.answer.answer2,display.answer.answer3,display.answer.answer4,display.correct_ans]
        for (let k = 1; k < index.length+1; k++) {
            // ans.issable = false
            let answer = document.createElement('div');
            answer.className = "answer";
            answer.textContent=ans[k-1];
        
            if(k == ans[4]){
                answer.style.backgroundColor = "Green";
            }
            else {
                answer.style.backgroundColor = "gray";
            }
            answers.appendChild(answer)
            
            question_title.value=""
            answerA.value=""
            answerB.value=""
            answerC.value=""
            answerD.value=""
            points.value=""
            for (let correct of correct_Answer_All){
                if (correct.checked){  
                    correct.checked = false;
                }
            }
        }

        // Button Edit question

        let moreButton = document.createElement('div');
        moreButton.className = 'moreButton';
        moreButton.id = display._id
        const btn_edit=document.createElement('button');
        btn_edit.className = 'edit';
        btn_edit.textContent = 'Edit';
        moreButton.appendChild(btn_edit)
        
        // button Delete Question
        btn_edit.className='edit';
        btn_edit.textContent = 'Edit';
        moreButton.appendChild(btn_edit)
        const btn_delete=document.createElement('button');
        btn_delete.className='delete';
        btn_delete.textContent = 'delete';
        moreButton.appendChild(btn_delete);
        btn_delete.addEventListener('click',delete_question);
        answers.appendChild(moreButton)
        console.log("My dom", add_questions_container);
    }
}

// function to delete question

function delete_question(event){
    let id=event.target.parentElement.parentElement.parentElement.id
    if (event.target.className == "delete") {
        axios.delete("/deletequestion/"+id) .then((result)=>{
            getdata();
        })
      } 
}


// function for Add Question and Update Question

function btn_update_Quesiont(btn){
    if(btn.textContent=="Add Question"){
        addQuestion();
    }
    if(btn.textContent == "Update"){
        // call function request server to update
        updatenewdata();
        getdata();
        document.querySelector(".question_list").style.display = "block";
        btn.textContent="Add Question";
        question_title.value=""
        answerA.value=""
        answerB.value=""
        answerC.value=""
        answerD.value=""

    }
  
}

// check on the button to edit add play and submit--

let questionId = "";
let amountofData = 0;
let numRadio = 0;
let  valid = false; 
document.body.addEventListener("click", (e)=>{
    if(e.target.className =="edit"){
        updatedata(e.target.parentNode.id);
        questionId = e.target.parentNode.id;
        document.querySelector(".question_list").style.display = "none";
    }else if(e.target.id=="btn-add"){
        
        if (question_title.value =='' || answerA.value == '' || answerB.value == '' || answerC.value == '' || answerD.value == '' || points.value == 0 || click == false ) {
            window.alert('Please input all data before you create the question')
        }
        else {
            btn_update_Quesiont(e.target);
        }
    }
    if ( e.target.id == "btn-play"){
        display_all_questions();
        document.querySelector(".group-start").style.display = "none";
        document.querySelector(".container_quiz").style.display = "block";

    }
   
    if(e.target.className == "btn_submit"){
        axios.get("/datas").then((result) =>{
            let data = result.data;
            amountofDatas.length
            let UserInput = document.getElementsByName('answer'+ numRadio);
            console.log("one",numRadio);
            console.log("two",amountofDatas);
            
            if(numRadio != amountofData ){
                for (let i = 0; i < UserInput.length; i++) {
                    if(i.checked){
                        numRadio ++
                        valid = true;
                    }
                    else{
                        
                        alert("please choose all the question")
                    }
                }
            }
            else {
                calculateScore();  
            }
            
        });
    }
})


// function to updata data when the user want to change 

function updatedata(questionId){
    axios.get("/datas").then((result) =>{
       let  alldata = result.data
        alldata.forEach(element => {
            if(element._id==questionId){

                document.querySelector("#question").value=element.title
                document.querySelector('#points').value = element.score;
                document.querySelector("#answerA").value=element.answer.answer1
                document.querySelector("#answerB").value=element.answer.answer2
                document.querySelector("#answerC").value=element.answer.answer3
                document.querySelector("#answerD").value=element.answer.answer4

                let isCorrect=document.querySelectorAll(".radio_answer")
                for(let i=1; i<=isCorrect.length; i++){
                    if(parseInt(element.correct_ans)==i){
                        isCorrect[i-1].checked = true
                    }
                }          
            }
        });
        btn_add.textContent="Update"
    })
}


// function to display the question for user want to play
let old_correct_Answer = " ";
let new_correct_id = " ";
function display_all_questions() {
    axios.get("/datas").then((result)=>{
        let alldata = result.data;
    while(domContain.firstChild){
        domContain.removeChild(domContain.lastChild);
    };
    let countAnswer = 0;
    let  div_display = document.querySelector(".container_quiz");
    
    let dom_title= document.createElement("div");
    dom_title.className = "form-groups";
    let titles = document.createElement("p");
    titles.className = "form-control title";
    titles.textContent = Titleques.value;
    dom_title.appendChild(titles);
    div_display.appendChild(dom_title);

    let contain_questions = document.createElement('div');
    contain_questions.className = "contain_question";
    for(let indexdata of alldata) {  
        old_correct_Answer = indexdata.correct_ans;
        
        
        let show_question = document.createElement('div');
        show_question.className ="show_question";
        contain_questions.appendChild(show_question);
        
        let dis_question = document.createElement('div');
        dis_question.className = "dis_question";
        dis_question.textContent = indexdata.title;
        show_question.appendChild(dis_question);
        
        
        let h3 = document.createElement("h3");
        h3.textContent = "Answer";
        contain_questions.appendChild(h3);
        
        let line1 = document.createElement('div');
        line1.className = "line1";
        contain_questions.appendChild(line1);
        
        let answer_controll = document.createElement("div");
        answer_controll.className = "answers_controll";
        contain_questions.appendChild(answer_controll);
        
        let ar = ["1","2","3","4"];
        let ans = [indexdata.answer.answer1,indexdata.answer.answer2,indexdata.answer.answer3,indexdata.answer.answer4,indexdata.correct_ans]
        countAnswer ++
        for ( let i=0; i<ar.length;i++) {
            new_correct_id = ar[i];
            let answer = document.createElement("div");
            answer.className = "answer" +ar[i];
            let radio_answers = document.createElement('input');
            radio_answers.className = "all_answers";
            radio_answers.id = ar[i];
            radio_answers.setAttribute("type", "radio");
            radio_answers.setAttribute("name", "answer" +countAnswer );
            radio_answers.setAttribute("value", ar[i] );
            
            let answerlist = document.createElement('label');
            answerlist.setAttribute("for",ar[i])
            answerlist.textContent = ans[i];
            
            
            answer_controll.appendChild(answer);
            answer.appendChild(radio_answers);
            answer.appendChild(answerlist);

        }
        
        let line = document.createElement('span');
        line.className=" line";
        contain_questions.appendChild(line);

    }
    let submit = document.createElement('button');
    submit.className = "btn_submit";
    submit.textContent = " submit";
    div_display.appendChild(contain_questions);
    div_display.appendChild(submit);
    submit.addEventListener('click', calculateScore)
});
}

// validation of input in playing the question


// function for calculateScore when user play already  

let correct_answer = [];
let is_check=false;
let index = 0;
function calculateScore(){
    let controlAnswers = document.querySelectorAll(".answers_controll");
    let array_questions = []
    axios.get("/datas").then((result)=>{
        array_questions = result.data;
        amountofData = array_questions.length;
       
        let user_answer = []
        let Total_Score = 0;
        let full_scor = 0;
        for (let controlAnswer of controlAnswers){
            let answers = controlAnswer.childNodes;
            for(let answer of answers){
               let check_Correct_Answer = answer.firstChild;
               let new_correct_id = check_Correct_Answer.id;
               if (check_Correct_Answer.checked){
                   is_check=true;
                   index +=1;
                   user_answer.push(new_correct_id);
                }
            }
            // is_check = false;
        }
        console.log("index of data from use",index);                   
        for (let k =0;k<amountofData;k++){
            if (user_answer[k] == array_questions[k].correct_ans){
                Total_Score += array_questions[k].score; 
            }

            full_scor += array_questions[k].score;
            // console.log(full_score)
        }
        document.querySelector(".container_quiz").style.display = "none";
        document.querySelector(".Total_score").style.display = "block";
        let display_score = document.querySelector(".Total_score");
        let text_score = document.createElement('h1');
        text_score.className = "Total ";
        text_score.textContent = "Total Score";
        let contain_score = document.createElement('div');
        contain_score.className = "contain_score";
        let show_score = document.createElement('h2');
        show_score.className = "show_score";
        show_score.textContent =  Total_Score  ;
        contain_score.appendChild(show_score);
        
        let full_score = document.createElement('h2');
        full_score.className = "show_score";
        full_score.textContent = "  / "+full_scor;
        contain_score.appendChild(full_score);
        
        display_score.appendChild(text_score);
        display_score.appendChild(contain_score);
    })

}


// add data form client to the server 
function addQuestion(){
    let url = '/data'
    data = createQuestion()
    axios.post(url, data).then((result) => {
        let listdata = result.data
        console.log(listdata);
        getdata();

    })
}

// display all data from mongoDB
function getdata(){
    axios.get("/datas").then((result) =>{
        let alldata = result.data;
        display_all(alldata);
    })
}


// update date in the mongoDB

function updatenewdata(){
    newdata = createQuestion();
    let url = "/updateDt/"+ questionId
    axios.put(url,newdata).then((result) =>{
    });
}


// ===============main button==========

let btn_create = document.querySelector(".btn-create").addEventListener("click",()=>{
    show_hide();
    getdata();

});
let btn_back = document.querySelector("#btn_back").addEventListener("click",()=>{
    document.querySelector(".group-start").style.display = "flex";
    document.querySelector(".create-quiz").style.display = "none";
    document.querySelector(".container_quiz").style.display = "none";
  
});



// ==============hidden button==================

document.querySelector(".group-start").style.display = "flex";
document.querySelector(".create-quiz").style.display = "none";
document.querySelector(".Total_score").style.display = "none";
document.querySelector(".container_quiz").style.display ="none";





