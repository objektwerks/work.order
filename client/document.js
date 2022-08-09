// @ts-check

export function getById(id) {
  return document.getElementById(id);
}

export function getValueById(id) {
  return document.getElementById(id)['value'];
}

export function getByClass(name) {
  return document.getElementsByClassName(name);
}

export function hide(id) {
  document.getElementById(id).style.display = 'none';
}

export function show(id) {
  document.getElementById(id).style.display = 'block';
}

export function listValues(listId, values) {
  document.getElementById(listId).innerHTML = '';
  const ul = document.getElementById(listId);
  for (const value of values) {
    let li = document.createElement('li');
    li.appendChild(document.createTextNode(value));
    ul.appendChild(li);
  }
}