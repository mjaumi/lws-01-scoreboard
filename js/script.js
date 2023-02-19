// selecting DOM elements
const singleScoreEl = document.querySelectorAll('.lws-singleResult');
const incrementFormEl = document.querySelectorAll('.incrementForm');
const decrementFormEl = document.querySelectorAll('.decrementForm');

// action identifiers
const INCREMENT = 'increment';
const DECREMENT = 'decrement';

// action creators
const increment = (value) => {
    return {
        type: INCREMENT,
        payload: {
            id: 1,
            value
        }
    };
}

const decrement = (value) => {
    return {
        type: DECREMENT,
        payload: {
            id: 1,
            value
        }
    };
}

// initial state
const initialState = [
    {
        id: 1,
        score: 0
    },
    {
        id: 2,
        score: 0
    }
];

// create score reducer function
function scoreReducer(state = initialState, action) {
    const updatedScore = state.map((s) => {
        if (s.id === action?.payload?.id) {
            if (action.type === INCREMENT) {
                return {
                    ...s,
                    score: s.score + action.payload.value
                };
            } else if (action.type === DECREMENT) {
                return {
                    ...s,
                    score: s.score < action.payload.value ? 0 : s.score - action.payload.value
                };
            } else {
                return {
                    ...s
                };
            }
        } else {
            return {
                ...s
            };
        }
    });
    return updatedScore;
}

// create store
const store = Redux.createStore(scoreReducer);

// create render to render DOM element manually
const render = () => {
    const state = store.getState();
    singleScoreEl[0].innerHTML = state[0].score;
}

// update UI initially
render();

// render subscribe to store
store.subscribe(render);

// handling event listeners here
incrementFormEl[0].addEventListener('submit', (e) => {
    e.preventDefault();
    store.dispatch(increment(parseInt(e.target.increment.value)));
    e.target.reset();
});

decrementFormEl[0].addEventListener('submit', (e) => {
    e.preventDefault();
    store.dispatch(decrement(parseInt(e.target.decrement.value)));
    e.target.reset();
});