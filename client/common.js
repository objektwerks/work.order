// @ts-check

export function getById(id) {
  return document.getElementById(id);
}

export function getFileById(id) {
  return document.getElementById(id)['files'][0];
}

export function getSelectedIndexId(selectId) {
  const select = document.getElementById(selectId);
  const selectedIndex = select['selectedIndex'];
  return select['options'][selectedIndex].id;
}

export function getValueById(id) {
  return document.getElementById(id)['value'];
}

export function disableReadonlyById(id) {
  document.getElementById(id).removeAttribute('readonly');
}

export function enableReadonlyById(id) {
  document.getElementById(id).setAttribute('readonly', 'readonly');
}

export function setTextById(id, text) {
  return document.getElementById(id).innerText = text;
}

export function setValueById(id, value) {
  return document.getElementById(id)['value'] = value;
}

export function setImageUrlById(id, url) {
  return document.getElementById(id)['src'] = url;
}

export function setSelectOptionById(selectId, optionId) {
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

export function displayImage(file, imgId) {
  const img = getById(imgId);
  const reader = new FileReader();
  reader.onload = function() {
    var dataURL = reader.result;
    // @ts-ignore
    img.src = dataURL;
  };
  reader.readAsDataURL(file);
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

export function setListValues(listId, values) {
  document.getElementById(listId).innerHTML = '';
  const ul = document.getElementById(listId);
  for (const value of values) {
    let li = document.createElement('li');
    li.appendChild(document.createTextNode(value));
    ul.appendChild(li);
  }
}

export function listIdValues(listId, idvalues) {
  document.getElementById(listId).innerHTML = '';
  const ul = document.getElementById(listId);
  for (const idvalue of idvalues) {
    let li = document.createElement('li');
    li.id = idvalue.id;
    li.appendChild(document.createTextNode(`${idvalue.id} - ${idvalue.value}`));
    ul.appendChild(li);
  }
}

export function selectIdValues(selectId, idvalues) {
  document.getElementById(selectId).innerHTML = '';
  const select = document.getElementById(selectId);
  for (const idvalue of idvalues) {
    let option = document.createElement('option');
    option.id = idvalue.id;
    option.appendChild(document.createTextNode(`${idvalue.id} - ${idvalue.value}`));
    select.appendChild(option);
  }
}