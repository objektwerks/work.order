// @ts-check

export class IdValue {
  id: string
  value: string

  constructor(id: string, value: string) {
    this.id = id
    this.value = value
  }
}

export function getByClass(name: string): HTMLCollectionOf<Element> {
  return document.getElementsByClassName(name)
}

export function getById(id: string): HTMLElement {
  return document.getElementById(id) as HTMLElement
}

export function getFileById(id: string): File {
  const input = getById(id) as HTMLInputElement
  return input.files?[0]
}

export function getSelectedIndexId(selectId: string): string {
  const select = getById(selectId) as HTMLSelectElement
  const options = select.selectedOptions
  const selectedId = options.item(0)?.id
  return selectedId === undefined || selectId === null ? '' : selectId
}

export function getValueById(id: string): string {
  const input = getById(id) as HTMLInputElement
  return input.value
}

export function hide(id: string) {
  const element = getById(id) as HTMLElement
  element.style.display = 'none'
}

export function show(id: string) {
  const element = getById(id) as HTMLElement
  element.style.display = 'block'
}

export function addReadonlyById(id: string) {
  document.getElementById(id).setAttribute('readonly', 'readonly');
}

export function removeReadonlyById(id: string) {
  document.getElementById(id).removeAttribute('readonly');
}

export function setTextById(id: string, text: string) {
  return document.getElementById(id).innerText = text;
}

export function setValueById(id: string, value: string) {
  return document.getElementById(id)['value'] = value;
}

export function setImageUrlById(id: string, url: string) {
  return document.getElementById(id)['src'] = url;
}

export function setSelectOptionById(selectId: string, optionId: string) {
  const select = document.getElementById(selectId);
  const options = select['options'];
  let index = 0;
  for (const option of options) {
    if (option.id === optionId) {
      break;
    } else {
      index += 1;
    }
  }
  select['selectedIndex'] = index;
}

export function setErrorList(error: string, errorsListId: string, errorsViewId: string) {
  const errors = [];
  errors.push(error);
  setErrorsList(errors, errorsListId, errorsViewId);
}

export function setErrorsList(errors: string, errorsListId: string, errorsViewId: string) {
  setListValues(errorsListId, errors);
  show(errorsViewId);
}

export function setListValues(listId: string, values: string) {
  document.getElementById(listId).innerHTML = '';
  const ul = document.getElementById(listId);
  for (const value of values) {
    let li = document.createElement('li');
    li.appendChild(document.createTextNode(value));
    ul.appendChild(li);
  }
}

export function setListIdValues(listId: string, idvalues: IdValue[]) {
  document.getElementById(listId).innerHTML = '';
  const ul = document.getElementById(listId);
  for (const idvalue of idvalues) {
    let li = document.createElement('li');
    li.id = idvalue.id;
    li.appendChild(document.createTextNode(`${idvalue.id} - ${idvalue.value}`));
    ul.appendChild(li);
  }
}

export function setSelectIdValues(selectId: string, idvalues: IdValue[]) {
  document.getElementById(selectId).innerHTML = '';
  const select = document.getElementById(selectId);
  for (const idvalue of idvalues) {
    let option = document.createElement('option');
    option.id = idvalue.id;
    option.appendChild(document.createTextNode(`${idvalue.id} - ${idvalue.value}`));
    select.appendChild(option);
  }
}