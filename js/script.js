// selecting DOM elements
let singleScoreEl = document.querySelectorAll('.lws-singleResult');
let incrementFormEl = document.querySelectorAll('.incrementForm');
let decrementFormEl = document.querySelectorAll('.decrementForm');

const matchContainerEl = document.getElementById('matchContainer');
const addAnotherMatchBtn = document.getElementById('addNewMatch');
const resetBtn = document.getElementById('resetScore');

// action identifiers
const INCREMENT = 'increment';
const DECREMENT = 'decrement';
const INSERT = 'insert';
const RESET = 'reset';

let matchCounter;

// this function is adding eventlistener to form elements
const addFormEventListener = (index, element, incOrDec) => {
    element.addEventListener('submit', (e) => {
        e.preventDefault();

        if (incOrDec === INCREMENT) {
            store.dispatch(increment(index, parseInt(e.target.increment.value)));
        } else {
            store.dispatch(decrement(index, parseInt(e.target.decrement.value)));
        }
        e.target.reset();
    });
}

// action creator for increment action
const increment = (id, value) => {
    return {
        type: INCREMENT,
        payload: {
            id,
            value
        }
    };
}

// action creator for decrement action
const decrement = (id, value) => {
    return {
        type: DECREMENT,
        payload: {
            id,
            value
        }
    };
}

// action creator for insertion action
const insert = () => {
    return {
        type: INSERT,
    };
}

// action creator for reset action
const reset = () => {
    return {
        type: RESET,
    };
}

// initial state
const initialState = [
    {
        id: 1,
        score: 0
    }
];

// create score reducer function
function scoreReducer(state = initialState, action) {
    let updatedScore = [];

    if (action.type === INSERT) {
        updatedScore = [
            ...state,
            {
                id: state[state.length - 1].id + 1,
                score: 0
            }
        ];
    } else if (action.type === RESET) {
        updatedScore = state.map(s => {
            return {
                ...s,
                score: 0
            }
        });
    } else {
        updatedScore = state.map(s => {
            if (s.id === action?.payload?.id) {
                if (action.type === INCREMENT) {
                    return {
                        ...s,
                        score: s.score + action.payload.value
                    };
                } else if (action.type === DECREMENT) {
                    return {
                        ...s,
                        // validating decrement operation here
                        score: s.score < action.payload.value ? 0 : s.score - action.payload.value
                    };
                } else {
                    return { ...s };
                }
            } else {
                return { ...s };
            }
        });
    }

    return updatedScore;
}

// create store
const store = Redux.createStore(scoreReducer);

// create render to render DOM element manually
const render = () => {
    const state = store.getState();

    // dynamically assigning values from state
    singleScoreEl.forEach((elem, i) => elem.innerHTML = state[i].score);

    matchCounter = state.length + 1;
}

// update UI initially
render();

// render subscribe to store
store.subscribe(render);

// handling event listeners here
addFormEventListener(1, incrementFormEl[0], INCREMENT);
addFormEventListener(1, decrementFormEl[0], DECREMENT);

// adding new match here
addAnotherMatchBtn.addEventListener('click', () => {
    const newMatchDiv = document.createElement('div');
    newMatchDiv.classList.add('match');
    newMatchDiv.innerHTML = `
    <div class="wrapper">
    <button class="lws-delete">
    <img src="./image/delete.svg" alt="" />
    </button>
    <h3 class="lws-matchName">Match ${matchCounter}</h3>
    </div>
    <div class="inc-dec">
    <form class="incrementForm">
    <h4>Increment</h4>
    <input type="number" name="increment" class="lws-increment" />
    </form>
    <form class="decrementForm">
    <h4>Decrement</h4>
    <input type="number" name="decrement" class="lws-decrement" />
    </form>
    </div>
    <div class="numbers">
    <h2 class="lws-singleResult">120</h2>
    </div>
    </div>
    `;
    matchContainerEl.appendChild(newMatchDiv);

    // inserting new children into query selector
    singleScoreEl = document.querySelectorAll('.lws-singleResult');
    incrementFormEl = document.querySelectorAll('.incrementForm');
    decrementFormEl = document.querySelectorAll('.decrementForm');

    // adding event listeners to new children
    addFormEventListener(incrementFormEl.length, incrementFormEl[incrementFormEl.length - 1], INCREMENT);
    addFormEventListener(decrementFormEl.length, decrementFormEl[decrementFormEl.length - 1], DECREMENT);

    // dispatching insertion action
    store.dispatch(insert());
});

// resetting score here by dispatching reset action
resetBtn.addEventListener('click', () => {
    store.dispatch(reset());
});