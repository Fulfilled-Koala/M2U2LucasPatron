function getElement(identifier, query) {
  const el = document.querySelector(query ? identifier + query : identifier);
  if (!el) throw new Error(`Element ${identifier} not exist`);
  return el;
}

// DOM ELEMENTS
const submitFirst = getElement('#first', '[type=submit]');
const subjects = getElement('#subjects');
const username = getElement('#name');
const inputContainer = getElement('#container');
const result = [];
let total = 0;

// SUBJECTS
function addSubject(button) {
  // check if the values of the array are greater than 0 or not undefined
  if (!result.every((value) => value !== undefined && value > 0) || result.length !== total)
    return alert('All values must be greater than 0');

  button.disabled = true;
  const paragraph = document.createElement('p');
  paragraph.className = 'text-white font-medium';
  paragraph.textContent = `${username.value}, the total is: 
  ${result
    .reduce((acc, curr) => (curr ? acc + (curr - curr * 0.2) : 0), 28e3)
    .toLocaleString('es-CO')} COP`;
  inputContainer.appendChild(paragraph);
  button.onclick = null;
}

// ELEMENT MANIPULATION
function createElement(element, key) {
  switch (element) {
    case 'input': {
      const input = document.createElement('input');
      input.className = 'w-full bg-neutral-900 outline-none text-gray-400 rounded p-2 mr-4';
      input.type = 'number';
      input.onchange = () => (result[key - 1] = Number(input.value));
      return input;
    }
    case 'div': {
      const div = document.createElement('div');
      div.className = 'flex flex-col gap-2 bg-gray-200';
      return document.createElement('div');
    }
    case 'label': {
      const label = document.createElement('label');
      label.className = 'text-sm text-white font-medium uppercase';
      label.textContent = `What's the cost of the ${key}${
        key === 1 ? 'st' : key === 2 ? 'nd' : key === 3 ? 'rd' : 'th'
      } subject?`;
      return label;
    }
    case 'button': {
      const button = document.createElement('button');
      button.textContent = `👌`;
      button.className =
        'btn bg-violet-500 hover:bg-violet-600 px-4 py-2 font-medium rounded disabled:opacity-25';
      button.onclick = () => addSubject(button);
      return button;
    }
    default:
      return;
  }
}

submitFirst.addEventListener('click', (e) => {
  e.preventDefault();
  const value = +subjects.value;
  if (!value || value > 10 || !username.value.trim().length) return alert('Incorrect');
  submitFirst.disabled = true;
  subjects.readOnly = true;
  username.readOnly = true;
  submitFirst.onclick = null;

  for (let i = 0; i < value; i++) {
    const individualContainer = createElement('div', 0);
    inputContainer.appendChild(individualContainer);

    const label = createElement('label', i + 1);
    individualContainer.appendChild(label);

    const input = createElement('input', i + 1);
    individualContainer.appendChild(input);

    i === value - 1 && (total = i + 1);
  }
  const button = createElement('button', 0);
  inputContainer.appendChild(button);
});
