const container = createDiv('container') //create container
const sectionLeft = createDiv('section-left') //create section left
const sectionRight = createDiv('section-right') //create section right
const subtitle = createTitle('h1', 'title', 'NEW STUDENT') //create title
const table = createList('table', 'table_id') //create table

//array of student
const arrayOfStudent = [
  {
    name: 'Ilona',
    surname: 'Sue',
    data: '09.07.1999',
    faculty: 'IT',
    startStudy: '01.01.2022'
  }
]

//func create tag div
function createDiv(className) {
  const div = document.createElement('div')
  div.classList.add(className)
  return div
}

//func create tag title
function createTitle(tag, className, text) {
  const title = document.createElement(tag)
  title.classList.add(className)
  title.textContent = text
  return title
}

//func create tag form
function createForm(className, id) {
  let form = document.createElement('form')
  form.id = id
  form.classList.add(className)
  return form
}

//func create tag input
function createInput(className, id) {
  let input = document.createElement('input')
  input.classList.add(className)
  input.id = id
  return input
}

//func create tag label
function createLabel(text) {
  let label = document.createElement('label')
  label.textContent = text
  return label
}

//func create tag button
function createButton(className, text, id) {
  let button = document.createElement('button')
  button.classList.add(className)
  button.textContent = text
  button.id = id
  return button
}

//func create tag ul 
function createList(className, id) {
  const list = document.createElement('ul')
  list.classList.add(className)
  list.id = id
  return list
}

//func create form for adding new student
function getFormAddNewStudent() {
  const form = createForm('form', 'form') //create form
  const button = createButton('form__btn', 'ADD STUDENT', 'form-btn') //create button
  button.type = 'submit'

  const inputComponents = [ //arr of input details
    {
      type: 'text',
      id: 'input-name',
      placeholder: 'NAME',
    },
    {
      type: 'text',
      id: 'input-faculty',
      placeholder: 'SURNAME',
    },
    {
      type: 'date',
      id: 'input-study-start',
      placeholder: '',
    },
    {
      type: 'text',
      id: 'input-study-finish',
      placeholder: 'FACULTY',
    },
    {
      type: 'text',
      id: 'input-study-finish',
      placeholder: 'START STUDY(year)'
    },
  ]

  for (i = 0; i < 5; i++) { //add input and input box
    const { type, id, placeholder } = inputComponents[i] //get data from array of objects

    const inputBox = createDiv('form__input-box') //create input box
    const input = createInput('form__input', id) //create input

    input.placeholder = placeholder //add placeholder
    input.type = type //add type

    inputBox.append(input)
    form.append(inputBox, button)
  }

  sectionLeft.append(form)

  form.addEventListener('submit', function (event) {
    event.preventDefault() //Предотвращаем стандартное поведение отправки формы

    let studentObj = {} //create new obj
    const keysOfObj = ['name', 'surname', 'data', 'faculty', 'startStudy']

    const input = document.querySelectorAll('.form__input') //find all inputs

    for (i = 0; i < input.length; i++) {
      const inputValue = input[i].value //get input[i] value

      studentObj[keysOfObj[i]] = inputValue //add to obj input value to key

      input[i].value = '' //clear input 
    }

    arrayOfStudent.push(studentObj) //add obj to array 
    renderTable(arrayOfStudent); // Update table when new student is added

  })

  return form
}

//func create filter by something
function createFilter() {
  const filterForm = createForm('nav', 'filter_form') //create filter form
  const filterTitle = createTitle('h3', 'filter-form__title', 'FILTER BY') //create title of filter

  const labels = ['name', 'faculty', 'start educ:', 'finish educ:'] //array of label text
  const inputDetails = [ //arr of input details
    {
      type: 'text',
      id: 'filter-name',
      name: 'filtName'
    },
    {
      type: 'text',
      id: 'filter-faculty',
      name: 'filtFaculty'
    },
    {
      type: 'number',
      id: 'filter-study-start',
      name: 'filtStart'
    },
    {
      type: 'number',
      id: 'filter-study-finish',
      name: 'filtFinish'
    },
  ]

  filterForm.append(filterTitle) //add title to form

  for (i = 0; i < inputDetails.length; i++) { //add label and input to form
    const { type, id, name } = inputDetails[i] //get data from array of objects

    const filterLabel = createLabel(labels[i])
    filterLabel.setAttribute('for', id) //add for to connect with input

    const filterInput = createInput('filter-form__btn', id)
    filterInput.type = type //add type
    filterInput.name = name //add name

    if (filterInput.type == 'number') { //if type number
      filterInput.setAttribute('min', '2000') //add min 2000
    }

    filterForm.append(filterLabel, filterInput)
  }

  sectionRight.append(filterForm)

  return filterForm
}

//func create table
function createTable() {
  const item = document.createElement('li') //create li
  item.classList.add('table__sort__data') //add class name
  item.id = 'table__sort__data' //add id

  const btnDetails = [ //arr of btn details
    {
      text: 'NAME',
      id: 'sorting-name',
    },
    {
      text: 'AGE',
      id: 'sorting-faculty',
    },
    {
      text: 'FACULTY',
      id: 'sorting-study-start',
    },
    {
      text: 'EDUCATION',
      id: 'sorting-study-finish',
    },
    {
      text: 'remove',
      id: 'sorting-remove',
    },
  ]

  for (let i = 0; i < btnDetails.length; i++) {
    const { text, id } = btnDetails[i] //get data from array of objects

    const tableButton = createButton('table__sorting-btn', text, id) //create li
    tableButton.classList.add(`sort-btn${i + 1}`) //add new class

    item.append(tableButton)
  }

  table.append(item) //add li with buttons to table

  sectionRight.append(table)
  return table
}

//func render table
function renderTable(arr) {

  for (let i = 0; i < arr.length; i++) {
    const studentItem = document.createElement('li')
    studentItem.classList.add('table__sort__student')

    const student = arr[i] //get obj[i]

    for (const key in student) { //for all keu in arr
      if (Object.prototype.hasOwnProperty.call(student, key)) {
        const studentData = createButton('table__sort-data', student[key]) //create btn
        studentItem.appendChild(studentData);
      }
    }
    table.append(studentItem) //add li to table
  }
}

//func render dom
function renderDom() {
  table.innerHTML = '' //clear table
  sectionLeft.append(subtitle) //create title 

  getFormAddNewStudent() //call func get new student info
  createFilter() //call func create filter form
  createTable() //call func create table
  renderTable(arrayOfStudent) // Update table when new student is added


  container.append(sectionLeft, sectionRight) //add to container
}

renderDom() //call func to create DOM

document.body.append(container)