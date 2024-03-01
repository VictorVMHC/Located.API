const { ChartJSNodeCanvas } = require('chartjs-node-canvas');
class NaiveBayesClassifier {
    constructor() {
        this.classes = {}; // Almacena las entradas de cada clase
        this.wordCounts = {}; // Almacena las frecuencias de palabras para cada clase
        this.vocab = new Set(); // Almacena el vocabulario único de todas las palabras
        this.totalDocs = 0; // Contador de documentos en el conjunto de entrenamiento
        this.smoothingFactor = 0.1; // Factor de suavizado
    }

    // Función para agregar un ejemplo con su etiqueta al clasificador
    addData(example, label) {
        if (!this.classes[label]) {
            this.classes[label] = 1;
        } else {
            this.classes[label]++;
        }

        if (!this.wordCounts[label]) {
            this.wordCounts[label] = {};
        }

        example = example.toLowerCase(); // Normalizar a minúsculas
        example = example.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, ""); // Eliminar signos de puntuación
        example = example.replace(/[0-9]/g, ""); // Eliminar números

        const words = example.split(' ');

        words.forEach(word => {
            this.vocab.add(word);
            if (!this.wordCounts[label][word]) {
                this.wordCounts[label][word] = 1 + this.smoothingFactor; // Aplicar suavizado
            } else {
                this.wordCounts[label][word]++;
            }
        });

        this.totalDocs++;
    }

    // Función para clasificar un nuevo ejemplo y devolver la clase más probable
    classify(data) {
        data = data.toLowerCase(); // Normalizar a minúsculas
        data = data.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, ""); // Eliminar signos de puntuación
        data = data.replace(/[0-9]/g, ""); // Eliminar números

        const words = data.split(' ');

        let maxProb = -Infinity;
        let bestClass = null;

        Object.keys(this.classes).forEach(label => {
            const classProb = this.classes[label] / this.totalDocs; // probabilidad de la  clase

            let logProb = Math.log(classProb); // numero mas pequeño

            words.forEach(word => {
                const wordProb = (this.wordCounts[label][word] || this.smoothingFactor) / (this.totalDocs + this.smoothingFactor * this.vocab.size); // Aplicar suavizado
                logProb += Math.log(wordProb);
            });

            if (logProb > maxProb) {
                maxProb = logProb;
                bestClass = label;
            }
        });

        return bestClass;
    }

    printVars() {
        
        console.log("");
    }   

    evaluateAccuracy(testData) {
        let correctPredictions = 0;

        testData.forEach(example => {
            const predictedClass = this.classify(example.text);

            if (predictedClass === example.label) {
                correctPredictions++;
            }
        });

        return correctPredictions / testData.length;
    }

    visualizeAccuracy(labels, accuracyData) {
        const canvasRenderService = new ChartJSNodeCanvas({ width: 800, height: 400 });
    
        const randomColors = labels.map(() => getRandomColor());
    
        const configuration = {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Accuracy',
                    data: accuracyData,
                    backgroundColor: randomColors,
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 1
                    }
                }
            }
        };
    
        // Renderizar el gráfico en una imagen
        return canvasRenderService.renderToBuffer(configuration);
    }
    
    countEntriesByClass() {
        const entryCount = {};

        Object.keys(this.classes).forEach(label => {
            entryCount[label] = 0;
        });

        Object.keys(this.classes).forEach(label => {
            entryCount[label] += this.classes[label];
        });

        return entryCount;
    }

    
    
}

function getRandomColor() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    const alpha = 0.2; // Puedes ajustar la opacidad según tus preferencias
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

module.exports = NaiveBayesClassifier;