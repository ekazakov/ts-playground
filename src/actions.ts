import { $call } from 'utility-types';
import { createAction } from 'typesafe-actions';

export const actions = {
    increment: createAction('INCREMENT'),
    add: createAction('ADD', (amount: number) => ({
      type: 'ADD',
      payload: amount,
    })),

    forwardTo: createAction(
        'FORWARD', 
        (action: { type: string }) => ({
            type: 'FORWARD',
            payload: action
        }))
  };

  
  const returnsOfActions = Object.values(actions).map($call);
  type AppAction = typeof returnsOfActions[number];
  const a: { type: 'INCREMENT' } = actions.increment();
  