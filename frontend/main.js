const subtitle = createTitle('h1', 'title', 'NEW STUDENT') //create title
const table = createList('table', 'table_id') //create table

//func for get set info to local storage
function saveDataToLocalStorage(key, objArr) {
  localStorage.setItem(key, JSON.stringify(objArr))
}

//array of student
let arrayOfStudent = []

//key for local storage
const keyName = 'students'

//to get empty object at local storage
const data = localStorage.getItem(keyName)

//if array not empty to do parse
if (data !== "" && data !== null) {
  arrayOfStudent = JSON.parse(data)
}

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

//func calc age 
function calcAge(birthDate) {
  const today = new Date(); // current date
  const birth = new Date(birthDate); // date of birth

  let age = today.getFullYear() - birth.getFullYear() // Разница в годах

  return age
}

//func calc year of study
function calcYearsOfStudy(startStudy) {
  const yearGap = 4; // years of study
  const parsedStartStudy = parseInt(startStudy, 10); // string to number
  const endOfStudy = parsedStartStudy + yearGap; // year of finish study

  const today = new Date(); // current date
  const currentYear = today.getFullYear(); // current year
  const studyStatus = currentYear - parsedStartStudy; // how year student studied

  let studyInfo = ''

  if (endOfStudy <= currentYear) {
    if (studyStatus >= yearGap) {
      studyInfo = `${parsedStartStudy} - ${endOfStudy} (Graduated)` // finished study
    } else {
      studyInfo = `${parsedStartStudy} - ${endOfStudy} (${studyStatus} course)` // info about student string
    }
  } else {
    studyInfo = `${parsedStartStudy} - ${currentYear} (${studyStatus} course)` // info about student string
  }

  return studyInfo
}

//func validation of form
function validation(form) {
  let result = true //value of validation

  function createError(input, text) { //func label of input for error
    const parent = input.parentNode //get input-box
    const errorLabel = createLabel(text) //create label

    parent.classList.add('error')
    errorLabel.classList.add('error-label')

    parent.append(errorLabel)
  }

  function removeError(input) { //func remove error of input
    const parent = input.parentNode //get input-box

    if (parent.classList.contains('error')) {
      parent.querySelector('.error-label').remove()
      parent.classList.remove('error')
    }
  }

  function ageValidation(input) { //func check age of student
    if (input.id === 'input-date-birth') { //age checked
      const age = calcAge(input.value)

      if (new Date(input.value) > new Date()) {
        removeError(input)
        createError(input, 'You are not born yet!')
        result = false
      }

      if (age > 8 && age <= 18) {
        removeError(input)
        createError(input, 'You are not student yet')
        result = false
      } else if (age <= 8 && age >= 0) {
        removeError(input)
        createError(input, 'You are kid')
        result = false
      }

    }
  }

  function allInputConditions(input) { //func wrapper for all input conditions

    if (input.dataset.maxLength) { //check max-length = 15
      if (input.value.trim().length > input.dataset.maxLength) {
        removeError(input)
        createError(input, `Maximum number of characters ${input.dataset.maxLength}`)
        result = false
      }
    }

    if (input.dataset.required == 'true') { //check only first input if not empty
      if (input.value.trim() == '') {
        removeError(input)
        createError(input, 'The field is empty')
        result = false
      }
    }

    if (input.type === 'text') { //if contains number
      const value = input.value.trim();
      if (/\d/.test(value)) {
        createError(input, `The field should not contain numbers!`);
        result = false;
      }
    }

    if (input.type === 'number') { //if start study is empty
      if (input.value.trim() === '') {
        removeError(input)
        createError(input, 'Please select the year of study')
        result = false
      }
    }

    if (input.type === 'date') { //if date of birth is empty
      if (input.value.trim() === '') {
        removeError(input)
        createError(input, 'Please select your date of birth')
        result = false
      }
    }
  }

  const allInputs = form.querySelectorAll('input') //get all input

  for (const input of allInputs) { //check if input.value = empty

    removeError(input) //clear errors

    ageValidation(input) //call func age checker

    allInputConditions(input) //call func for checking all input

  }

  return result
}

//func create sort of table
function sortByKey(array, key) {
  return array.sort((a, b) => {
    if (key === 'data') {
      const valueA = calcAge(a['data'])
      const valueB = calcAge(b['data'])
      return valueA - valueB
    } else {
      const valueA = a[key].toUpperCase() // Преобразуем в верхний регистр для удобства сравнения
      const valueB = b[key].toUpperCase()

      if (valueA < valueB) {
        return -1 // Возвращаем отрицательное число, если valueA меньше valueB
      }
      if (valueA > valueB) {
        return 1 // Возвращаем положительное число, если valueA больше valueB
      }
      return 0 // Возвращаем 0, если значения равны
    }
  })
}

//func remove student
function removeStudent() {
  const chosenStudents = table.querySelectorAll('li.table__sort__student.chosen') //get all students

  if (chosenStudents.length > 0) { //if length > 0

    chosenStudents.forEach(chosenStudent => {
      const studentName = chosenStudent.querySelector('.table__sort-data#student-name').textContent.trim();
      const studentIndex = arrayOfStudent.findIndex(student => student.fullName === studentName)

      if (studentIndex !== -1) {
        arrayOfStudent.splice(studentIndex, 1)
        chosenStudent.remove()
        renderStudentTable(arrayOfStudent)
        saveDataToLocalStorage(keyName, arrayOfStudent)
      }

    })

  } else {
    alert(`You haven't chosen anything!`)
  }
}

//func create form for adding new student
function getFormAddNewStudent(sectionLeft) {

  const form = createForm('form', 'form') //create form
  const button = createButton('form__btn', 'ADD STUDENT', 'form-btn') //create button
  button.type = 'submit'

  function renderForm() { //render form with inputs
    const inputComponents = [ //arr of input details
      {
        type: 'text',
        id: 'input-name',
        placeholder: 'NAME',
      },
      {
        type: 'text',
        id: 'input-surname',
        placeholder: 'SURNAME',
      },
      {
        type: 'date',
        id: 'input-date-birth',
        placeholder: '',
      },
      {
        type: 'text',
        id: 'select-faculty',
        isSelect: true, // Flag for select
        options: ['IT', 'Engineering', 'Medicine', 'Art'], // Options for select
      },
      {
        type: 'number',
        id: 'input-study-start',
        placeholder: 'START STUDY(year)'
      },
    ]

    const today = new Date() //current date
    const currentYear = today.getFullYear() //get current year

    //create all inputs
    for (let i = 0; i < inputComponents.length; i++) { //add input and input box
      const { type, id, placeholder, isSelect, options } = inputComponents[i] //get data from array of objects

      if (isSelect) { // If it's a select
        const select = document.createElement('select')
        select.id = id // Assign id to select
        select.classList.add('form__select') // Add class to select

        // Create options for select
        for (const optionText of options) {
          const option = document.createElement('option')
          option.value = optionText
          option.textContent = optionText
          select.appendChild(option)
        }

        const inputBox = createDiv('form__input-box')
        inputBox.appendChild(select)
        form.appendChild(inputBox)
      }
      else {
        const inputBox = createDiv('form__input-box') //create input box
        const input = createInput('form__input', id) //create input

        input.placeholder = placeholder //add placeholder
        input.type = type //add type

        if (input.type == 'text') {
          input.setAttribute('data-required', 'true') //add check to first input
        }

        if (input.id == 'input-surname') {
          input.setAttribute('data-max-length', '15') //add max-length to input surname
        }

        if (input.type == 'number') {
          input.setAttribute('min', '2000') //min 2000
          input.setAttribute('max', `${currentYear}`) //max current year
        }

        if (input.type == 'date') {
          input.setAttribute('min', '1900-01-01') //min 2000
        }

        inputBox.append(input)
        form.append(inputBox)
      }
    }
    form.append(button)
  }

  function addInputListeners(form) { //func add event listener for all input if user enter a new value after error
    const inputs = form.querySelectorAll('input')

    inputs.forEach(input => {
      input.addEventListener('input', function () {
        const parent = this.parentNode
        if (parent.classList.contains('error')) {
          parent.querySelector('.error-label').remove()
          parent.classList.remove('error');
        }
      })
    })
  }

  renderForm() //call func to create form

  addInputListeners(form) //call func for remove error if user enter the new value after error in input

  form.addEventListener('submit', function (event) {
    event.preventDefault() //Предотвращаем стандартное поведение отправки формы

    const inputs = document.querySelectorAll('.form__input') //find all inputs
    const select = document.getElementById('select-faculty') //find select

    if (validation(this) == true) { //call validation
      alert('Congratulations!The new student added!')


      // Create fullName by combining the first and second inputs
      const fullName = inputs[0].value + ' ' + inputs[1].value; // Создаем полное имя

      const studentObj = { // Создаем объект для студента
        fullName,
        data: inputs[2].value, // Предполагаем, что третий инпут - дата рождения
        faculty: select.value,
        startStudy: inputs[3].value // Предполагаем, что четвертый инпут - год начала обучения
      };

      arrayOfStudent.push(studentObj) // Добавляем объект студента в массив
      saveDataToLocalStorage(keyName, arrayOfStudent)
      renderStudentTable(arrayOfStudent) // Отображаем таблицу с добавленным студентом

      form.reset() // Сбрасываем форму после отправки
    }
  })

  sectionLeft.append(form)

  return form
}

//func create filter by something
function createFilter(sectionRight) {
  const filterForm = createForm('nav', 'filter_form') //create filter form
  const filterTitle = createTitle('h3', 'filter-form__title', 'FILTER BY') //create title of filter
  const today = new Date(); // current date

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
      filterInput.setAttribute('max', today.getFullYear()) //add max
    }

    filterInput.addEventListener('input', applyFilters) //call func for filtering

    filterForm.append(filterLabel, filterInput)
  }

  sectionRight.append(filterForm)

  return filterForm
}

//func create of filter settings
function applyFilters() {
  //get all inputs values 
  const filterName = document.getElementById('filter-name').value.toLowerCase().trim()
  const filterFaculty = document.getElementById('filter-faculty').value.toLowerCase().trim()
  const filterStartStudy = parseInt(document.getElementById('filter-study-start').value)
  const filterEndStudy = parseInt(document.getElementById('filter-study-finish').value)

  //create const that gets array of student and use func filter by ...
  const filteredStudents = arrayOfStudent.filter(student => {
    const nameMatch = student.fullName.toLowerCase().includes(filterName)
    const facultyMatch = student.faculty.toLowerCase().includes(filterFaculty)
    const startStudyMatch = parseInt(student.startStudy, 10) === filterStartStudy || !filterStartStudy
    const endStudyMatch = parseInt(student.startStudy, 10) + 4 === filterEndStudy || !filterEndStudy

    return nameMatch && facultyMatch && startStudyMatch && endStudyMatch
  })

  renderStudentTable(filteredStudents)
}

//func create table
function createTable(sectionRight) {
  const item = document.createElement('li') //create li
  item.classList.add('table__sort__data') //add class name
  item.id = 'table__sort__data' //add id

  const btnDetails = [ //arr of btn
    {
      text: 'NAME',
      id: 'sorting-name',
      key: 'fullName',
    },
    {
      text: 'AGE',
      id: 'sorting-age',
      key: 'data',
    },
    {
      text: 'FACULTY',
      id: 'sorting-faculty',
      key: 'faculty',
    },
    {
      text: 'EDUCATION',
      id: 'sorting-study-start',
      key: 'startStudy',
    },
    {
      text: 'remove',
      id: 'sorting-remove',
    },
  ]

  for (let i = 0; i < btnDetails.length; i++) {
    const { text, id, key } = btnDetails[i] //get data from array of objects

    const tableButton = createButton('table__sorting-btn', text, id) //create li
    tableButton.classList.add(`sort-btn${i + 1}`) //add new class

    if (key) { //call func for sorting if click on button
      tableButton.addEventListener('click', function () {
        sortByKey(arrayOfStudent, key)
        renderStudentTable(arrayOfStudent)
      })
    }

    item.append(tableButton)

    if (tableButton.id === 'sorting-remove') { //add event kistener to btn remove
      tableButton.addEventListener('click', function () {
        removeStudent() //call func to remove
      })
    }
  }

  table.append(item) //add li with buttons to table

  sectionRight.append(table)
  return table
}

//func create student at table
function createStudentAtTable(studentObj) {
  const studentItem = document.createElement('li')
  studentItem.classList.add('table__sort__student')

  let studentFullName = createButton('table__sort-data', `${studentObj.fullName}`, 'student-name')
  let studentAge = createButton('table__sort-data', `${calcAge(studentObj.data).toString()}`, 'student-age')
  let studentFaculty = createButton('table__sort-data', `${studentObj.faculty}`, 'student-faculty')
  let studentEducation = createButton('table__sort-data', `${calcYearsOfStudy(studentObj.startStudy).toString()}`, 'student-education')

  let removeStudent = createButton('table__sort-remove', '', 'remove-student')
  removeStudent.addEventListener('click', function () { //for adding new class if we want delete it 
    studentItem.classList.toggle('chosen')
  })

  studentItem.append(studentFullName, studentAge, studentFaculty, studentEducation, removeStudent)

  table.append(studentItem) //add li to table
}

//func render table
function renderStudentTable(newStudent) {
  const existingRows = document.querySelectorAll('.table__sort__student') // find all rows with student

  // clear rows with students before rendering
  existingRows.forEach(row => {
    row.remove()
  })

  for (let i = 0; i < newStudent.length; i++) {
    createStudentAtTable(newStudent[i]) //render student list
  }

}

//func render dom
function renderDom(container, sectionLeft, sectionRight) {

  sectionLeft.append(subtitle) //create title 

  getFormAddNewStudent(sectionLeft) //call func get new student info
  createFilter(sectionRight) //call func create filter form
  createTable(sectionRight) //call func create table
  renderStudentTable(arrayOfStudent) // Update table with the last student added


  container.append(sectionLeft, sectionRight) //add to container

  document.body.append(container)
}

window.renderDom = renderDom

