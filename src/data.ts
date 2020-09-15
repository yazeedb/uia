// @ts-ignore
import shortid from 'shortid';

export interface Message {
  id: string;
  sender: string;
  content: string;
  timeSent: string;
}

export const createMessage = (content: string, sender: string): Message => ({
  id: shortid.generate(),
  sender,
  content,
  timeSent: '',
});

export const mockData: Message[] = [
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
  //   {
  //     id: 'dkjfddnfd',
  //     sender: 'Yazeed Bzadough',
  //     content: 'Hi',
  //     timeSent: '',
  //   },
  //   {
  //     id: 'dkjnfd',
  //     sender: 'George Willis',
  //     content: 'Greetings',
  //     timeSent: '',
  //   },
];
