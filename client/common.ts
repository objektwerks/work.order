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

export function hide(id: string): void {
  const element = getById(id) as HTMLElement
  element.style.display = 'none'
}

export function show(id: string): void {
  const element = getById(id) as HTMLElement
  element.style.display = 'block'
}

export function addReadonlyById(id: string): void {
  const element = getById(id) as HTMLElement
  element.setAttribute('readonly', 'readonly');
}

export function removeReadonlyById(id: string): void {
  const element = getById(id) as HTMLElement
  element.removeAttribute('readonly');
}

export function setTextById(id: string, text: string): void {
  const element = getById(id) as HTMLElement
  element.innerText = text;
}

export function setValueById(id: string, value: string): void {
  const input = getById(id) as HTMLInputElement
  input.value = value
}

export function setImageUrlById(id: string, url: string): void {
  const img = getById(id) as HTMLImageElement
  img.src = url
}

export function setSelectOptionById(selectId: string, optionId: string): void {
  const select = getById(selectId) as HTMLSelectElement
  const options = select.options
  for (let i = 0; i < options.length; i++) {
    const option = options.item(i)
    if (option !== null && option.id === optionId) {
      select.selectedIndex = i
      break;
    }
  }
}

export function setErrorList(error: string, errorsListId: string, errorsViewId: string): void {
  const errors = [];
  errors.push(error);
  setErrorsList(errors, errorsListId, errorsViewId);
}

export function setErrorsList(errors: string[], errorsListId: string, errorsViewId: string): void {
  setListValues(errorsListId, errors);
  show(errorsViewId);
}

export function setListValues(listId: string, values: string[]) {
  const ul = getById(listId) as HTMLUListElement
  ul.innerHTML = ''
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