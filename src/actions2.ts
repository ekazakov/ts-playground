export const INCREMENT = 'INCREMENT'; 
export const ADD = 'ADD'; 
const FORWARD = 'FORWARD';

export type Actions = { 
  INCREMENT: { 
    type: typeof INCREMENT, 
  }, 
  ADD: { 
    type: typeof ADD,
    payload: number, 
  }, 
};

type ForwardAction = {
    type: 'FORWARD',
    payload: RootAction | ForwardAction
};

export type RootAction = Actions[keyof Actions];

export const actions = { 

  increment: (): Actions[typeof INCREMENT] => ({ 
    type: 'INCREMENT', 
  }), 

  add: (amount: number): Actions[typeof ADD] => ({ 
    type: ADD,
    payload: amount,
  }),

  forwartTo: (action: RootAction | ForwardAction): ForwardAction => ({
      type: FORWARD,
      payload: action
  })
};


const inc = actions.increment();
const wr1 = actions.forwartTo(inc);
const wr2 = actions.forwartTo(wr1);
