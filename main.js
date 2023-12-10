const container = createDiv('container') //create container
const subtitle = createTitle('h1', 'title', 'NEW STUDENT') //create title

//func create div
function createDiv(className) {
  const div = document.createElement('div')
  div.classList.add(className)
  return div
}

//func create title
function createTitle(tag, className, text) {
  const title = document.createElement(tag)
  title.classList.add(className)
  title.textContent = text
  return title
}

//func create form
function createForm(className, id) {
  let form = document.createElement('form')
  form.id = id 
  form.classList.add(className)
  return form
}

//func create input
function createInput(className, type, placeholder, id) {
  let input = document.createElement('input')
  input.classList.add(className)
  input.type = type
  input.placeholder = placeholder
  input.id = id
  return input
}

//func create label
function createLabel(className, text) {
  let label = document.createElement('label')
  label.classList.add(className)
  label.textContent = text
  return label
}

//func create button
function createButton(className, text, id) {
  let button = document.createElement('button')
  button.classList.add(className)
  button.textContent = text
  button.id = id
  return button
}

//func create list 
function createList(className, id) {
  const list = document.createElement('ul')
  list.classList.add(className)
  list.id = id
  return list
}

//func create list-item
function createListItem(className, id) {
  const item = document.createElement('li')
  item.classList.add(className)
  item.id = id

  const btnName = createButton('list__item-btn-name', 'NAME', 'sorting-name')
  const btnAge = createButton('list__item-btn-age', 'AGE', 'sorting-age')
  const btnFaculty = createButton('list__item-btn-faculty', 'FACULTY', 'sorting-faculty')
  const btnEducation = createButton('list__item-btn-education', 'EDUCATION', 'sorting-education')

  const btnRemove = createButton('list__item-btn-remove', 'remove', 'btn-remove')


  item.append(btnName, btnAge, btnFaculty, btnEducation, btnRemove)

  return item
}

container.append(subtitle)
document.body.append(container)