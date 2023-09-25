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

module.exports = initializeClassifier;