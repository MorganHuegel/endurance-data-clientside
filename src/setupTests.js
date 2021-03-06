import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

//globally mocks local storage function
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn()
};
global.localStorage = localStorageMock

Enzyme.configure({adapter: new Adapter() });