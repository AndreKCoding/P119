array=['pen','paper','beach','bottle','bench','computer', 'cactus'];
var randomNumber = Math.floor((Math.random() * array.length));
sketch = array[randomNumber];

console.log('randomNumber = ' + randomNumber);
console.log('sketch = ' + sketch);

document.getElementById("esboço").innerHTML = "Esboço a Ser Desenhado: " + sketch;

var timerCounter = 0;
var timerCheck = 0;

var drawSketch = "";
var answerHolder = "";

var score = 0;

function setup()
{
    canvas = createCanvas(280, 280);
    canvas.center();
    background("white");
    canvas.mouseReleased(classifyCanvas);
    synth = window.speechSynthesis;
}

function preload()
{
    classifier = ml5.imageClassifier('DoodleNet');
}

function updateCanvas()
{
    console.log("Updated");
    background("white");

    array=['pen','paper','beach','bottle','bench','computer', 'cactus'];
    var randomNumber = Math.floor((Math.random() * array.length));
    sketch = array[randomNumber];       

    console.log(randomNumber);
    console.log(sketch);

    document.getElementById("esboço").innerHTML = "Esboço a Ser Desenhado: " + sketch;
}

function checkSketch()
{
    timerCounter ++;
    document.getElementById("time").innerHTML = "Tempo: " + timerCounter;

    if (timerCounter == 500)
    {
        timerCounter = 0;
        timerCheck = "completed";

        if (timerCheck == "completed" || answerHolder == "set")
        {
            timerCheck = "";
            answerHolder = "";

            console.log("Finished");

            updateCanvas();
        }
    }
}

function draw()
{
    checkSketch();

    strokeWeight(10);
    stroke("black");

    if (mouseIsPressed)
    {
        line(pmouseX, pmouseY, mouseX, mouseY);
    }
}

function classifyCanvas()
{
    classifier.classify(canvas, gotResult);
}

function gotResult(error, results)
{
    if (error)
    {
        console.error(error);
    }
    console.log(results);

    document.getElementById("label").innerHTML = 'Nome: ' + results[0].label;
    document.getElementById("precisao").innerHTML = 'Precisão: ' + Math.round(results[0].confidence * 100) + '%';

    utterThis = new SpeechSynthesisUtterance(results[0].label);
    synth.speak(utterThis);

    drawSketch = results[0].label;
    console.log('drawSketch = ' + drawSketch);

    if (drawSketch == sketch)
    {
        console.log("Acertou");
        answerHolder = "set";
        score = score + 1;
        console.log('Score = ' + score);

        document.getElementById("score").innerHTML = "Pontuação: " + score;

        updateCanvas();
    }
}
