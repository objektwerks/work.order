// @ts-check

export function getById(id) {
  return document.getElementById(id);
}

export function getValueById(id) {
  return document.getElementById(id)['value'];
}

export function setValueById(id, value) {
  return document.getElementById(id)['value'] = value;
}

export function getByClass(name) {
  return document.getElementsByClassName(name);
}

export function disabled(id, isDisabled) {
  document.getElementById(id)['disabled'] = isDisabled;
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
  ul.className = '"w3-ul w3-hoverable';
  for (const value of values) {
    let li = document.createElement('li');
    li.appendChild(document.createTextNode(value));
    ul.appendChild(li);
  }
}

export function listIdValues(listId, idvalues) {
  document.getElementById(listId).innerHTML = '';
  const ul = document.getElementById(listId);
  ul.className = '"w3-ul w3-hoverable';
  for (const idvalue of idvalues) {
    let li = document.createElement('li');
    li.id = idvalue.id;
    li.appendChild(document.createTextNode(idvalue.value));
    ul.appendChild(li);
  }
}