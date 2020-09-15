// @ts-ignore
import shortid from 'shortid';

// Called "on first load"
export function getInitialMessages() {
  const INITIAL_MESSAGES = [
    {
      id: shortid.generate(),
      sender: 'Yazeed Bzadough',
      content: 'Hey there! How are you?',
      timeSent: '',
    },
    {
      id: shortid.generate(),
      sender: 'George Willis',
      content: 'hello?',
      timeSent: '',
    },
  ];

  return new Promise((resolve) => {
    setTimeout(() => resolve(INITIAL_MESSAGES), 1000);
  });
}

// Called via polling (~10 sec)
export function getNewMessages() {
  const generateNewMessage = () => ({
    sender: 'Dara',
    content: Math.random()
      .toString(36)
      .replace(/[^a-z]+/g, '')
      .substr(0, 5),

    id: shortid.generate(),
    timeSent: '',
  });

  return new Promise((resolve) => {
    setTimeout(() => resolve([generateNewMessage()]), 1000);
  });
}

export interface Message {
  id: string;
  sender: string;
  content: string;
  timeSent: string;
}
