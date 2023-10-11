const fs = require('fs');
const NaiveBayesClassifier = require('./NaiveBayes');
const trainingData = require('../Utils/TrainingData');

let classifier = null;
let loading = false

function initializeClassifier() {
    try{
        if (!classifier && !loading) {
            loading= true;

            console.log('[Classifier] -> Training classifier');

            classifier = new NaiveBayesClassifier();
            trainingData.forEach(data => {
                classifier.addData(data.text, data.label);
            });

         //   processCSVFile('./src/Utils/dataset.csv', classifier)

            console.log('[Classifier] -> Ready to use it');
        }
    }catch{
        console.log('Was not possible to finish the training, server restart is needed');
        return;
    }finally{
        loading= false;
    }

    return classifier;
}

function processCSVFile(filePath, classifier) {
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error al leer el archivo:', err);
            return;
        }
    
        const lines = data.split('\n');
        lines.forEach((line) => {
            const parts = line.split(',');
            if (parts.length >= 2) {
            const label = parseInt(parts[0]);
            const text = parts.slice(1).join(',');
            
            // Mapea el valor del label 0 a 'negativo' y el valor 4 a 'positivo'

            const labelString = (label === 0) ? 'negative' : 'positive';
    
            // Agrega los datos al clasificador
            classifier.addData(text, labelString);
            }
        });
        
        console.log('Datos del archivo CSV procesados y clasificador entrenado.');
    });
}

module.exports = initializeClassifier;