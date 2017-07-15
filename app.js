

const app = document.getElementById('app');

const content = React.createClass({

    propTypes: {
        size: React.PropTypes.number
    },

    render: function () {
        const sudoku = new Sudoku(this.state.size);
        return React.DOM.div(null,
            this._buildSelectSize(),
            this._buildButtonRebuild(),
            this._buildButtonCheck(),
            this._buildGrid(sudoku.getGrid(), sudoku.getN(), sudoku.getCount())
        );
    },

    getInitialState: function () {
        return {
            size: this.props.size
        }
    },

    _buildGrid: function (data, N, countElements) {
        let cells = [];
        for (let i = 0; i < countElements; i++) {

            let row = [];
            for (let j = 0; j < countElements; j++) {
                let className = 'cell';
                if (i % N === 0) {
                    className += ' cell-bold-side-up';
                }
                if (j % N === 0) {
                    className += ' cell-bold-side-left';
                }
                if (i === countElements - 1) {
                    className += ' cell-bold-side-bottom';
                }
                if (j === countElements - 1) {
                    className += ' cell-bold-side-right';
                }
                row[j] = React.DOM.div({
                    className: className,
                    'data-row': i,
                    'data-column': j,
                    'key': i * countElements + j

                }, data[i][j]);
            }
            cells[i] = React.DOM.div({
                'key': i
            }, row);
        }
        return cells;
    },

    _buildSelectSize: function () {
        const avalibleSize = [2, 3, 4];
        let options = [];
        for (let size of avalibleSize) {
            options.push(React.DOM.option({key: size}, size));
        }
        return React.DOM.select({
            onChange: this._changeSize,
            defaultValue: this.state.size
        }, options);
    },

    _buildButtonRebuild: function () {
        return React.DOM.button({onClick: this._rebuildGrid}, 'Rebuild Sudoku');
    },

    _buildButtonCheck: function () {
        return React.DOM.button(null, 'Check');
    },

    _changeSize: function (e) {
        this.setState({
            size: e.target.value
        });
    },

    _rebuildGrid: function () {
        this.setState({});
    }

});


ReactDOM.render(
    React.createElement(content, {size: 3}),
    app,
);