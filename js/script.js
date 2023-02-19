// selecting DOM elements
const singleScoreEl = document.querySelectorAll('.lws-singleResult');
const incrementFormEl = document.querySelectorAll('.incrementForm');
const decrementFormEl = document.querySelectorAll('.decrementForm');

const matchContainerEl = document.getElementById('matchContainer');
const addAnotherMatchBtn = document.getElementById('addNewMatch');

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

// adding new match here
addAnotherMatchBtn.addEventListener('click', () => {
    const newMatchDiv = document.createElement('div');
    newMatchDiv.classList.add('match');
    newMatchDiv.innerHTML = `
        <div class="wrapper">
            <button class="lws-delete">
              <img src="./image/delete.svg" alt="" />
            </button>
            <h3 class="lws-matchName">Match 1</h3>
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
});