export class IdValue {
  constructor(public id: string, public value: string) {}
}

export function getByClass(name: string): HTMLCollectionOf<Element> {
  return document.getElementsByClassName(name)
}

export function getById(id: string): HTMLElement {
  return document.getElementById(id) as HTMLElement
}

export function getFileById(id: string): File | undefined | null {
  const input = getById(id) as HTMLInputElement
  return input.files?.item(0)
}

export function getSelectedIndexId(selectId: string): string {
  const select = getById(selectId) as HTMLSelectElement
  const option = select.options[select.selectedIndex]
  return option.id
}

export function getSelectedValueById(selectId: string): string {
  const select = getById(selectId) as HTMLSelectElement
  return select.value
}

export function getValueById(id: string): string {
  const input = getById(id) as HTMLInputElement
  return input.value
}

export function disable(id: string): void {
  const element = getById(id) as HTMLInputElement
  element.disabled = true
}

export function enable(id: string): void {
  const element = getById(id) as HTMLInputElement
  element.disabled = false
}

export function hide(id: string): void {
  const element = getById(id)
  element.style.display = 'none'
}

export function show(id: string): void {
  const element = getById(id)
  element.style.display = 'block'
}

export function addReadonlyById(id: string): void {
  const element = getById(id)
  element.setAttribute('readonly', 'readonly')
}

export function removeReadonlyById(id: string): void {
  const element = getById(id)
  element.removeAttribute('readonly')
}

export function setCheckBoxById(id: string, isChecked: boolean): void {
  const input = getById(id) as HTMLInputElement
  input.checked = isChecked
}

export function setTextById(id: string, text: string): void {
  const element = getById(id)
  element.innerText = text
}

export function setValueById(id: string, value: string): void {
  const input = getById(id) as HTMLInputElement
  input.value = value
}

export function setImageUrlHrefById(id: string, url: string): void {
  const anchor = getById(id) as HTMLAnchorElement
  anchor.href = url
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
      break
    }
  }
}

export function setErrorList(error: string, errorsListId: string, errorsFormId: string): void {
  const errors = []
  errors.push(error)
  setErrorsList(errors, errorsListId, errorsFormId)
}

export function setErrorsList(errors: string[], errorsListId: string, errorsFormId: string): void {
  setListValues(errorsListId, errors)
  show(errorsFormId)
}

export function setListValues(listId: string, values: string[]): void {
  const ul = getById(listId) as HTMLUListElement
  ul.innerHTML = ''
  for (const value of values) {
    const li = document.createElement('li')
    li.appendChild(document.createTextNode(value))
    ul.appendChild(li)
  }
}

export function setListIdValues(listId: string, idValues: IdValue[]): void {
  const ul = getById(listId) as HTMLUListElement
  ul.innerHTML = ''
  if (idValues.length === 0) idValues.push( new IdValue('0', 'items') )
  for (const idValue of idValues) {
    const li = document.createElement('li')
    li.id = idValue.id
    li.appendChild(document.createTextNode(`${idValue.id} - ${idValue.value}`))
    ul.appendChild(li)
  }
}

export function setSelectIdValues(selectId: string, idValues: IdValue[]): void {
  const select = getById(selectId) as HTMLSelectElement
  select.innerHTML = ''
  for (const idValue of idValues) {
    const option = document.createElement('option')
    option.id = idValue.id
    option.value = idValue.id
    option.appendChild(document.createTextNode(`${idValue.id} - ${idValue.value}`))
    select.appendChild(option)
  }
  if (select.options.length > 0) select.selectedIndex = 0
}