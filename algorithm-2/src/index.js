function getElement(identifier) {
  const el = document.querySelector(identifier);
  if (!el) throw new Error(`Element ${el} does not exist`);
  return el;
}

// elements
const submitButton = getElement('button');
const outputParagraph = getElement('#message');
const minParagraph = getElement('#min');
const maxParagraph = getElement('#max');
const all = document.querySelectorAll('input[type=number]');

function error(message) {
  outputParagraph.classList.add('text-red-500');
  outputParagraph.textContent = message;
}

// listeners
submitButton.onclick = (e) => {
  e.preventDefault();

  const set = new Set(Array.from(all).map((el) => +el.value));
  if (set.size !== 4) return error('All numbers must be unique!');

  let max = Number.MIN_VALUE,
    min = Number.MAX_VALUE;
  set.forEach((num) => {
    max = num > max ? num : max;
    min = num < min ? num : min;
  });

  outputParagraph.textContent = `👉 ${[...set].join(', ')}`;
  outputParagraph.classList.add('text-green-500');
  outputParagraph.classList.remove('text-red-500');
  minParagraph.textContent = `Min → ${min}`;
  maxParagraph.textContent = `Max → ${max}`;
};
