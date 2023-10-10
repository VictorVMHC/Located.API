class NaiveBayesClassifier {
    constructor() {
        this.classes = {}; // Almacena las probabilidades de cada clase
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
            const classProb = this.classes[label] / this.totalDocs;

            let logProb = Math.log(classProb);

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
}

module.exports = NaiveBayesClassifier;