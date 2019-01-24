

var items = [];
var frequency = 200;
var myInterval = 0;
var iterationCounter = 0;
var selectedTask = null;
var selectedQuestion = null;

function startNew() {
    stopQuiz();
    hideQuestionAndCorrectness();
    resetQuiz();
    generateQuiz();
    showItems();
    startQuiz();
}

function resetQuiz() {
    items = [];
    iterationCounter = 0;
    selectedTask = null;
    selectedQuestion = null;
    if (document.getElementById("#taskBox .answer"))
        document.getElementById("#taskBox .answer").value = "";
    if (document.getElementById("#questionBox .answer"))
        document.getElementById("#questionBox .answer").value = "";
}

function generateQuiz() {
    for (i = 0; i < 12; i++) {
        if (Math.random() < 0.6) {
            addRandomNumberToItems();
        }
        else {
            addRandomIconToItems();
        }
    }
}

function addRandomNumberToItems() {
    items.push({ number: getRandomNumber(100) })
}

function getRandomNumber(max) {
    return Math.floor(Math.random() * (max + 1))
}

function addRandomIconToItems() {
    var icon = {
        icon: getRandomIcon(),
        color: getRandomColor(),
    }
    items.push(icon);
}

function getRandomIcon() {
    var possibleIcons = [
        "square",
        "circle",
        "star",
        "heart"
    ]
    return possibleIcons[getRandomNumber(3)];
}

function getRandomColor() {
    var possibleColors = [
        "red",
        "green",
        "blue",
    ]
    return possibleColors[getRandomNumber(2)];
}

function stopQuiz() {
    if (myInterval !== 0) {
        clearInterval(myInterval);
        iterationCounter = 0;
    }

}

function startQuiz() {
    stopQuiz();
    myInterval = setInterval("showNextItem()", frequency);
}

function showNextItem() {
    if (iterationCounter == 12) {
        stopQuiz();
        hideItems();
        showTask();
        return;
    }
    else if (items[iterationCounter].number !== undefined) {
        document.getElementById("image").style.display = "none";
        document.getElementById("number").style.display = "block";
        document.getElementById("number").innerHTML = items[iterationCounter].number;
    }
    else {
        document.getElementById("number").style.display = "none";
        document.getElementById("image").style.display = "block";
        document.getElementById("image").innerHTML = `<span class="fas fa-${items[iterationCounter].icon}" color="${items[iterationCounter].color}"></span>`;
    }
    iterationCounter++;
    document.getElementById("counter").innerHTML = iterationCounter + "/12";
}

function showItems() {
    document.getElementById("items").style.visibility = "visible";
}

function hideItems() {
    document.getElementById("items").style.visibility = "hidden";
}

function showTask() {
    hideTaskCorrectness();
    showTaskBox();

    var possibleTasks = [
        new CandyFactoryTask(),
        new BagOfBeansTask(),
        new ClassroomSeatsTask(),
        new SilkwormsTask(),
        new LectureHallSeatsTask(),
        new BacteriaTask(),
        new NotebookTask(),
        new NumberPlaces1(),
        new NumberPlaces2(),
        new NumberPlaces3(),
        new BluePensTask(),
        new PhoneCallsTask(),
        new RedPensTask(),
        new SoccerTask(),
        new ArcheryTask(),
        new ApplePiesTask(),
        new SunglassesTask(),
        new CarRepairTask(),
    ]

    var validTasks = possibleTasks.filter(t => t.valid);
    selectedTask = validTasks[getRandomNumber(validTasks.length - 1)];

    document.querySelector("#taskBox .question").innerHTML = selectedTask.question;
}

function showTaskBox() {
    document.getElementById("taskBox").style.visibility = "visible";
}

function hideTaskBox() {
    document.getElementById("taskBox").style.visibility = "hidden";
}

function hideTaskCorrectness() {
    document.querySelector("#taskBox .correct").style.diplay = "none";
    document.querySelector("#taskBox .incorrect").style.display = "none";
}

function hideQuestionAndCorrectness() {
    hideTaskBox();
    hideTaskCorrectness();
}

function submitTaskAnswer() {
    var answer = document.querySelector("#taskBox .answer").value;
    if (answer == selectedTask.answer) {
        document.querySelector("#taskBox .correct").style.display = "block";
        document.querySelector("#taskBox .incorrect").style.display = "none";
        showQuestion();
    }
    else {
        document.querySelector("#taskBox .correct").style.display = "none";
        document.querySelector("#taskBox .incorrect").style.display = "block";
    }
}

function showQuestion() {
    hideQuestionCorrectness();
    showQuestionBox();

    var possibleQuestions = [
        {
            question: "What was the value of the first number?",
            get answer() { return items.find(item => item.number !== undefined).number; },
            valid: items.find(item => item.number !== undefined) !== undefined
        },
        {
            question: "What was the value of the last number?",
            get answer() {
                var numbers = items.filter(item => item.number !== undefined);
                var lastNumber = numbers[numbers.length - 1];
                return lastNumber.number;
            },
            valid: items.find(item => item.number !== undefined) !== undefined
        },
        {
            question: "What was the shape of the first icon? (square, circle, star, heart)",
            get answer() { return items.find(item => item.icon !== undefined).icon; },
            valid: items.find(item => item.icon !== undefined) !== undefined
        },
        {
            question: "What was the color of the first icon? (red, green, blue)",
            get answer() { return items.find(item => item.icon !== undefined).color; },
            valid: items.find(item => item.icon !== undefined) !== undefined
        },
        {
            question: "What was the shape of the last icon? (square, circle, star, heart)",
            get answer() {
                var icons = items.filter(item => item.icon !== undefined);
                var lastIcon = icons[icons.length - 1];
                return lastIcon.icon;
            },
            valid: items.find(item => item.icon !== undefined) !== undefined
        },
        {
            question: "What was the color of the last icon? (red, green, blue)",
            get answer() {
                var icons = items.filter(item => item.icon !== undefined);
                var lastIcon = icons[icons.length - 1];
                return lastIcon.color;
            },
            valid: items.find(item => item.icon !== undefined) !== undefined
        },
        {
            question: "How many numbers were shown?",
            get answer() { return items.filter(item => item.number !== undefined).length; },
            valid: true,
        },
        {
            question: "How many icons were shown?",
            get answer() { return items.filter(item => item.icon !== undefined).length; },
            valid: true,
        },
    ]

    var validQuestions = possibleQuestions.filter(q => q.valid);
    selectedQuestion = validQuestions[getRandomNumber(validQuestions.length - 1)];

    document.querySelector("#questionBox .question").innerHTML = selectedQuestion.question;
}

function showQuestionBox() {
    document.getElementById("questionBox").style.visibility = "visible";
}

function hideQuestionBox() {
    document.getElementById("questionBox").style.visibility = "hidden";
}

function hideQuestionCorrectness() {
    document.querySelector("#questionBox .correct").style.diplay = "none";
    document.querySelector("#questionBox .incorrect").style.display = "none";
}

function hideQuestionAndCorrectness() {
    hideQuestionBox();
    hideQuestionCorrectness();
}

function submitQuestionAnswer() {
    var answer = document.querySelector("#questionBox .answer").value;
    if (answer == selectedQuestion.answer) {
        document.querySelector("#questionBox .correct").style.display = "block";
        document.querySelector("#questionBox .incorrect").style.display = "none";
    }
    else {
        document.querySelector("#questionBox .correct").style.display = "none";
        document.querySelector("#questionBox .incorrect").style.display = "block";
    }
}





class CandyFactoryTask {
    constructor() {
        this.daily = 1 + getRandomNumber(4);
        this.days = 20 + getRandomNumber(20);
        this.question = `A candy factory makes ${this.daily} pieces of candy each day. How many pieces of candy will the factory make in ${this.days} days?`;
        this.answer = this.daily * this.days;
        this.valid = true;
    }
}

class BagOfBeansTask {
    constructor() {
        this.bags = 1 + getRandomNumber(4);
        this.beans = 30 + getRandomNumber(60);
        this.question = `There are ${this.bags} bags of beans. Each bag contains ${this.beans} beans. How many beans are there in all?`;
        this.answer = this.bags * this.beans;
        this.valid = true;
    }
}

class ClassroomSeatsTask {
    constructor() {
        this.rows = 3 + getRandomNumber(6);
        this.seats = 25 + getRandomNumber(50);
        this.question = `There are ${this.rows} rows of seats in the classroom. Each row has ${this.seats} seats. How many seats are there in all?`;
        this.answer = this.rows * this.seats;
        this.valid = true;
    }
}

class SilkwormsTask {
    constructor() {
        this.silkworms = 100 + getRandomNumber(900);
        this.moths = 10 + getRandomNumber(70);
        this.question = `Mrs. Meyer's class raised a total of ${this.silkworms} silkworms, and ${this.moths} of them turned into moths. How many silkworms did not turn into moths?`;
        this.answer = this.silkworms - this.moths;
        this.valid = true;
    }
}

class LectureHallSeatsTask {
    constructor() {
        this.halls = 2 + getRandomNumber(6);
        this.seats = 30 + getRandomNumber(66);
        this.question = `A university building has ${this.halls} lecture halls. There are ${this.seats} seats in each lecture hall. How many seats are there in all?`;
        this.answer = this.halls * this.seats;
        this.valid = true;
    }
}

class BacteriaTask {
    constructor() {
        this.bacteriaStart = 110 + getRandomNumber(60);
        this.bacteriaNow = 600 + getRandomNumber(356);
        this.question = `A petri dish originally contained ${this.bacteriaStart} bacteria. A scientist let the bacteria grow and now there are ${this.bacteriaNow} of them. How many more bacteria are there now?`;
        this.answer = this.bacteriaNow - this.bacteriaStart;
        this.valid = true;
    }
}

class NotebookTask {
    constructor() {
        this.colors = 3 + getRandomNumber(8);
        this.notebooks = 7 + getRandomNumber(10);
        this.question = `A notebook company makes notebooks with covers in ${this.colors} different colors. A school district ordered ${this.notebooks} notebooks in each color. How many notebooks in total did the school district order?`,
            this.answer = this.colors * this.notebooks;
        this.valid = true;
    }
}

class NumberPlaces1 {
    constructor() {
        this.question = `What number has 8 ten thousands, 1 more thousand than ten thousands, 1 more hundred than ten thousands, 5 fewer tens than thousands, and 1 more one than tens?`;
        this.answer = 89945;
        this.valid = true;
    }
}

class NumberPlaces2 {
    constructor() {
        this.question = `What number has 8 ten thousands, 2 fewer thousands than ten thousands, the same number of hundreds as ten thousands, 1 more ten than ten thousands, and 4 fewer ones than hundreds?`;
        this.answer = 86894;
        this.valid = true;
    }
}

class NumberPlaces3 {
    constructor() {
        this.question = `What number has 5 ten thousands, 4 fewer thousands than ten thousands, 3 more hundreds than ten thousands, 4 more tens than thousands, and 4 more ones than tens?`;
        this.answer = 51859;
        this.valid = true;
    }
}

class BluePensTask {
    constructor() {
        this.question = `On the last day of school, the first student will receive 2 blue pens, the second student will receive 4 blue pens, the third student will receive 8 blue pens, the fourth student will receive 16 blue pens, and the fifth student will receive 32 blue pens. If this pattern continues, how many blue pens will the sixth student receive?`;
        this.answer = 64;
        this.valid = true;
    }
}

class PhoneCallsTask {
    constructor() {
        this.base = 25 + getRandomNumber(15);
        this.inc = 2 + getRandomNumber(4);
        this.question = `Sharon made ${this.base} phone calls on Sunday, ${this.base + this.inc} phone calls on Monday, ${this.base + 2 * this.inc} phone calls on Tuesday, and ${this.base + 3 * this.inc} phone calls on Wednesday. If this pattern continues, how many phone calls will Sharon make on Thursday?`;
        this.answer = this.base + 4 * this.inc;
        this.valid = true;
    }
}

class RedPensTask {
    constructor() {
        this.base = 15 + getRandomNumber(15);
        this.inc = 10 + getRandomNumber(10);
        this.question = `On the last day of school, the first student will receive ${this.base} red pens, the second student will receive ${this.base + this.inc} red pens, the third student will receive ${this.base + 2 * this.inc} red pens, and the fourth student will receive ${this.base + 3 * this.inc} red pens. If this pattern continues, how many red pens will the fifth student receive?`,
            this.answer = this.base + 4 * this.inc;
        this.valid = true;
    }
}

class SoccerTask{
    constructor(){
        this.children = (1+ getRandomNumber(5)) * 7;
        this.question = `Three-sevenths of the ${this.children} children in the park are playing soccer. How many children are playing soccer in the park?`;
        this.answer = this.children / 7 * 3;
        this.valid = true;
    }
}

class ArcheryTask{
    constructor(){
        this.campers = (2 + getRandomNumber(6)) * 5;
        this.question = `A summer camp has ${this.campers} campers. Two-fifths of them like archery. How many campers like archery?`;
        this.answer = this.campers / 5 * 2;
        this.valid = true;
    }
}

class ApplePiesTask{
    constructor(){
        this.pies = (2 + getRandomNumber(8)) * 4;
        this.question = `One-quarter of the 8 pies at the bakery are apple pies. How many apple pies does the bakery have?`;
        this.answer = pies / 4;
        this.valid = true;
    }    
}

class SunglassesTask{
    constructor(){
        this.people = (2 + getRandomNumber(5)) * 9;
        this.question = `Five-ninths of the ${this.people} people at the beach are wearing sunglasses. How many people are wearing sunglasses?`;
        this.answer = this.people / 9 * 5;
        this.valid = true;
    }
}

class CarRepairTask{
    constructor(){
        this.cost = 2000 + getRandomNumber(2000);
        this.remaining = 8000 + getRandomNumber(3000);
        this.question = `Brandy's car broke and she used $${this.cost} from her savings to have it repaired. After that, she had $${this.remaining} left in savings. How much money did Brandy have saved before her car broke?`;
        this.answer = this.cost + this.remaining;
        this.valid = true;
    }
}

// {
//     question: `A bathing suit manufacturer has a supply of 15,499 bathing suits for men. In addition, it has 707 bathing suits for women. How many bathing suits are available overall?`,
//     get answer() { return 16206; },
//     valid: true,
// },
// {
//     question: `A treasure hunter discovered a buried treasure chest filled with a total of 4,809 gems. 2,735 of the gems were diamonds, and the rest were rubies. How many of the gems were rubies?`,
//     get answer() { return 2074; },
//     valid: true,
// },
// {
//     question: `Sheng brought 96 chocolate-covered pretzels to a drama club meeting. If 12 members split them evenly, how many pretzels did each member eat?`,
//     get answer() { return 8; },
//     valid: true,
// },
// {
//     question: `Robert bought 33 new CDs and arranged them in 11 even stacks. How many CDs did Robert put in each stack?`,
//     get answer() { return 3; },
//     valid: true,
// },
// {
//     question: `Kevin put 24 photos in his photo album. The album has 6 pages. If each page has the same number of photos, how many photos did Kevin put on each page?`,
//     get answer() { return 4; },
//     valid: true,
// },