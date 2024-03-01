const NaiveBayesClassifier = require("../Middleware/NaiveBayes");
const trainingData = require("./TrainingData");
const { ChartJSNodeCanvas } = require('chartjs-node-canvas');

function processCSVFile(filePath, classifier) {
    const fs = require('fs');

    return new Promise((resolve, reject) => {
        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                console.error('Error al leer el archivo:', err);
                reject(err);
                return;
            }

            const lines = data.split('\n');
            lines.forEach((line) => {
                const parts = line.split(',');
                if (parts.length >= 2) {
                    const label = parseInt(parts[0]);
                    const text = parts.slice(1).join(',');

                    const labelString = label === 0 ? 'negative' : 'positive';

                    classifier.addData(text, labelString);
                }
            });

            console.log('Datos del archivo CSV procesados y clasificador entrenado.');
            resolve();
        });
    });
}


const getAverageClass = (runsData) => {
    const width = 800;
    const height = 400;
    const chartCallback = (ChartJS) => {};
    const canvasRenderService = new ChartJSNodeCanvas({ width, height, chartCallback });

    const labels = runsData.map((_, index) => `Execution #${index + 1}`);
    const datasets = [
        {
            label: 'Neutral',
            data: runsData.map((run) => run.neutral),
            backgroundColor: 'rgba(54, 162, 235, 0.7)',
            borderWidth: 1
        },
        {
            label: 'Negative',
            data: runsData.map((run) => run.negative),
            backgroundColor: 'rgba(255, 99, 132, 0.7)',
            borderWidth: 1
        },
        {
            label: 'Positive',
            data: runsData.map((run) => run.positive),
            backgroundColor: 'rgba(75, 192, 192, 0.7)',
            borderWidth: 1
        }
    ];

    const configuration = {
        type: 'bar',
        data: {
            labels: labels,
            datasets: datasets
        },
        options: {
            scales: {
            x: {
                stacked: true
            },
            y: {
                stacked: true,
                beginAtZero: true,
                ticks: {
                stepSize: 10
                }
            }
            }
        }
    };

    canvasRenderService.renderToBuffer(configuration)
        .then((buffer) => {
            const fs = require('fs');
            fs.writeFileSync('stackedBarChart.png', buffer);
            console.log('Stacked bar chart generated and saved as stackedBarChart.png.');
        })
        .catch((err) => {
            console.error('Error while generating the stacked bar chart:"', err);
        });
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function splitAndShuffleData(data, splitRatio = 0.8) {
    const shuffledData = shuffleArray([...data]);

    const totalExamples = shuffledData.length;
    const trainSize = Math.floor(totalExamples * splitRatio);
    const trainData = shuffledData.slice(0, trainSize);
    const testData = shuffledData.slice(trainSize);
    return { trainData, testData };
}

const runTestOneTime = async (trainingData) =>{
    const classifier = new NaiveBayesClassifier();

    const { trainData, testData } = splitAndShuffleData(trainingData);
    
    console.log(trainData.length, testData.length);
    trainData.forEach(example => {
        classifier.addData(example.text, example.label);
    });

    //await processCSVFile('./dataset.csv', classifier)
    
    const accuracy = classifier.evaluateAccuracy(testData);
    console.log(`Accuracy: ${accuracy}`);
    console.log(`Accuracy: ${accuracy * 100}%`);
    
    
    const labels = Object.keys(classifier.classes);
    
    const accuracyData = labels.map(label => {
        let correctPredictions = 0;
    
        testData.forEach(example => {
            const predictedClass = classifier.classify(example.text);
            if (predictedClass === label && predictedClass === example.label) {
                correctPredictions++;
            }
        });
    
        return correctPredictions / testData.length;
    });
    
    classifier.visualizeAccuracy(labels, accuracyData)
    .then(buffer => {
        const fs = require('fs');
        fs.writeFileSync('accuracyChart.png', buffer);
    })
    .catch(err => console.log(err));
} 

async function runClassifierMultipleTimes(trainingData, numRuns = 10) {
    const accuracies = [];
    const Entries =[];

    for (let i = 0; i < numRuns; i++) {
        const { trainData, testData } = splitAndShuffleData(trainingData);

        const classifier = new NaiveBayesClassifier();

        trainData.forEach(example => {
            classifier.addData(example.text, example.label);
        });

        const accuracy = classifier.evaluateAccuracy(testData);
        console.log(`Run number ${i} accuracy: ${accuracy * 100}%`);
        accuracies.push(accuracy);

        Entries.push( classifier.countEntriesByClass() );
    }

    const averageAccuracy = accuracies.reduce((acc, accuracy) => acc + accuracy, 0) / numRuns;

    console.log(`Te average accuracy is: ${averageAccuracy * 100}%`);
    

    console.log(`Te Entries by class are`);

    Entries.map(item  => {
        console.log(item);
    });

    const labels = Array.from({ length: numRuns }, (_, i) => `Execution # ${i + 1}`);
    
    const canvasRenderService = new ChartJSNodeCanvas({ width: 800, height: 400 });
    
    const configuration = {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Accuracy',
                data: accuracies.map(acc => acc * 100),
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100,
                    ticks: {
                        callback: value => `${value}%`
                    }
                }
            }
        },
        plugins: {
            datalabels: {
                anchor: 'end',
                align: 'center',
                formatter: (value, context) => `${value.toFixed(2)}%`, // Muestra el valor de precisión en cada barra
                color: 'red',
                font: {
                    weight: 'bold'
                }
            }
        }
    };

    const buffer = await canvasRenderService.renderToBuffer(configuration);
    
    const fs = require('fs');
    fs.writeFileSync('accuraciesChart.png', buffer);
    getAverageClass(Entries);
}

const args = process.argv.slice(2);


if (args.length < 2 || args[0] !== '-f' ) {

    console.error('Error you must follow this structure -f <function 1) run one 2) run  specified times> -t <times>');
} else {
    if(args[2] !=='-t' ||  args[3] <1 ||  !args[2] ||  !args[3] || args[1] === 1 ){
        runTestOneTime(trainingData)
    }else{
        runClassifierMultipleTimes(trainingData, args[3])
        .catch(err => console.log(err));
    }
}


//runTestOneTime(trainingData)