
class Sudoku {

    /**
     * @param N
     */
    constructor(N) {
        this.N = N;
        this.countElements =  Math.pow(this.N, 2);
        this.elements = [1, 2, 3, 4, 5, 6, 7, 8, 9, 'A', 'B', 'C', 'D', 'E', 'F', 0];
        this.data = this._buildRawData();
        this.data = this._swapRandom(this.data);
        this.data = this._removeRandom(this.data);
    }

    getGrid() {
        return this.data;
    }

    getN() {
        return this.N;
    }

    getCount() {
        return this.countElements;
    }

    _swapRandom(data) {
        const countMove = 15;
        for (let i = 0; i < countMove; i++) {
            let indexArea = Math.floor(Math.random() * this.N);
            let indexA = indexArea * this.N + Math.floor(Math.random() * (this.countElements)) % this.N;
            let indexB = indexArea * this.N + Math.floor(Math.random() * (this.countElements)) % this.N;
            data = this._swapRowsLine(data, indexA, indexB);

            indexArea = Math.floor(Math.random() * this.N);
            indexA = indexArea * this.N + Math.floor(Math.random() * (this.countElements)) % this.N;
            indexB = indexArea * this.N + Math.floor(Math.random() * (this.countElements)) % this.N;
            data = this._swapColumsLine(data, indexA, indexB);

            let indexAreaA = Math.floor(Math.random() * this.N);
            let indexAreaB = Math.floor(Math.random() * this.N);
            data = this._swapRowsArea(data, indexAreaA, indexAreaB);

            indexAreaA = Math.floor(Math.random() * this.N);
            indexAreaB = Math.floor(Math.random() * this.N);
            data = this._swapColumsArea(data, indexAreaA, indexAreaB);
        }
        return data;
    }

    _swapRowsLine(data, indexA, indexB) {
        let tmp = data[indexA];
        data[indexA] = data[indexB];
        data[indexB] = tmp;
        return data;
    }

    _swapRowsArea(data, indexAreaA, indexAreaB) {
        let tmp = [];
        const indexA = indexAreaA * this.N;
        const indexB = indexAreaB * this.N;
        for (let i = 0; i < this.N; i++) {
            tmp[i] = data[indexA + i];
        }
        for (let i = 0; i < this.N; i++) {
            data[indexA + i] = data[indexB + i];
        }
        for (let i = 0; i < this.N; i++) {
            data[indexB + i] = tmp[i];
        }
        return data;
    }

    _swapColumsLine(data, indexColumnA, indexColumnB) {
        for (let i = 0; i < this.countElements; i++) {
            let tmp = data[i][indexColumnA];
            data[i][indexColumnA] = data[i][indexColumnB];
            data[i][indexColumnB] = tmp;
        }

        return data;
    }

    _swapColumsArea(data, indexAreaA, indexAreaB) {
        let tmp = [];
        const indexA = indexAreaA * this.N;
        const indexB = indexAreaB * this.N;
        for (let rowI = 0; rowI < this.countElements; rowI++) {
            for (let i = 0; i < this.N; i++) {
                tmp[i] = data[rowI][indexA + i];
            }
            for (let i = 0; i < this.N; i++) {
                data[rowI][indexA + i] = data[rowI][indexB + i];
            }
            for (let i = 0; i < this.N; i++) {
                data[rowI][indexB + i] = tmp[i];
            }
        }

        return data;
    }

    _buildRawData() {
        let data = [];

        let shift = 0;
        for (let i = 0; i < this.countElements; i++) {
            let row = [];
            for (let j = 0; j < this.countElements; j++) {
                shift = (j + i * this.N + Math.floor(i/this.N)) % this.countElements;
                row[j] = this.elements[shift];
            }
            data[i] = row;
        }
        return data;
    }

    _removeRandom(data) {
        let countForDelete = Math.floor(Math.pow(this.countElements, 2) / 2);
        for (let i=0; i<countForDelete; i++) {
            let row = Math.floor(Math.random() * this.countElements);
            let column = Math.floor(Math.random() * this.countElements);
            data[row][column] = '';
        }
        return data;
    }

}