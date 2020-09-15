import React, { useEffect, useReducer } from 'react';
import { createMessage, Message, mockData } from './data';
import './App.css';
import { getInitialMessages, getNewMessages } from './api';

interface State {
  fetchStatus: FetchStatus;
  messages: Message[];
  textValue: string;
  username: string;
}

type FetchStatus = 'loading' | 'success' | 'failed';

const initialState: State = {
  fetchStatus: 'loading',
  messages: [],
  textValue: '',
  username: 'Yazeed Bzadough',
};

type Action =
  | {
      type: 'SEND_MESSAGE';
      content: string;
      sender: string;
    }
  | {
      type: 'UPDATE_TEXT_VALUE';
      value: string;
    }
  | {
      type: 'GOT_MESSAGES';
      messages: Message[];
    }
  | {
      type: 'GOT_MORE_MESSAGES';
      messages: Message[];
    };

const actions = {
  gotMessages: (messages: Message[]) => ({
    type: 'GOT_MESSAGES',
    messages,
  }),
  gotMoreMessages: (messages: Message[]) => ({
    type: 'GOT_MORE_MESSAGES',
    messages,
  }),
  sendMessage: (content: string, sender: string) => ({
    type: 'SEND_MESSAGE',
    content,
    sender,
  }),
  updateTextValue: (value: string) => ({
    type: 'UPDATE_TEXT_VALUE',
    value,
  }),
};

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'SEND_MESSAGE': {
      const message = createMessage(action.content, action.sender);

      return {
        ...state,
        messages: [...state.messages, message],
        textValue: initialState.textValue,
      };
    }

    case 'UPDATE_TEXT_VALUE':
      return {
        ...state,
        textValue: action.value,
      };

    case 'GOT_MESSAGES':
      return {
        ...state,
        messages: action.messages,
        fetchStatus: 'success',
      };

    case 'GOT_MORE_MESSAGES':
      return {
        ...state,
        messages: [...state.messages, ...action.messages],
      };
  }
};

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    if (state.fetchStatus !== 'loading') {
      return;
    }

    getInitialMessages().then((data: any) => {
      // @ts-ignore
      dispatch(actions.gotMessages(data));
    });
  }, [state.fetchStatus]);

  useEffect(() => {
    if (state.fetchStatus !== 'success') {
      return;
    }

    // polling approach
    const intervalId = setInterval(() => {
      getNewMessages().then((data) => {
        // @ts-ignore
        dispatch(actions.gotMoreMessages(data));
      });
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, [state.fetchStatus]);

  switch (state.fetchStatus) {
    case 'loading':
      return <h1>Please wait...</h1>;

    case 'failed':
      return <h1>This should not be possible</h1>;

    case 'success':
      return (
        <div className="App">
          <ul>
            {state.messages.map((msg) => {
              return (
                <li key={msg.id}>
                  <h5>{msg.sender}</h5>
                  <p>{msg.content}</p>
                </li>
              );
            })}
          </ul>

          <footer>
            <form
              onSubmit={(event) => {
                event.preventDefault();

                // @ts-ignore
                dispatch(actions.sendMessage(state.textValue, state.username));
              }}
            >
              <input
                type="text"
                value={state.textValue}
                onChange={(event) => {
                  // @ts-ignore
                  dispatch(actions.updateTextValue(event.currentTarget.value));
                }}
              />
              <button type="submit" disabled={state.textValue.length === 0}>
                Send
              </button>
            </form>
          </footer>
        </div>
      );
  }
}

export default App;
