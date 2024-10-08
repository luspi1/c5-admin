//Сбор данных форм

import { bigImgModal, infoModal, modalOverlay } from './_vars'

export const serializeForm = (formNode) => {
  return new FormData(formNode)
}

// Преобразование formData в объект
export const formToObj = (formData) => {
  return Array.from(formData.entries()).reduce(
    (memo, pair) => ({
      ...memo,
      [pair[0]]: pair[1],
    }),
    {},
  )
}

const formatChangeableInputName = (name, id) => {
  const initialName = name.split('[')[0]
  return `${initialName}[${id}]`
}

const formatChangeableSelects = (name, id) => {
  const initialName = name.split('[')
  initialName[1] = `${id - 1}]`
  return initialName.join('[')
}
export const updateInputsId = (input, changeableId) => {
  const currentInput = input.querySelector('input, select, textarea') ?? input
  const inputLabel = input.querySelector('label')
  currentInput.name = formatChangeableInputName(currentInput.name, changeableId)
  if (currentInput.id) {
    const initialId = currentInput.id.split('[')[0]
    currentInput.id = `${initialId}[${changeableId}]`
  }
  if (inputLabel?.getAttribute('for')) {
    const attrValue = inputLabel.getAttribute('for')
    const initialLabel = attrValue.split('[')[0]
    inputLabel.setAttribute('for', `${initialLabel}[${changeableId}]`)
  }
}

// Обновление id в изменяемых списках
export const updateChangeableListId = (changeableList) => {
  if (changeableList && changeableList.dataset.changeableId) {
    const changeableElements = Array.from(changeableList.children)
    changeableElements.forEach((el, i) => {
      const changeableId = i + 1

      const changeableAmount = el.querySelector('.changeable-amount')
      const changeableInputs = el.querySelectorAll('.changeable-input')
      const changeableSelects = el.querySelectorAll(
        '.generate-select__list select',
      )
      const inputIdInfo = el.querySelector('.changeable-input-id')

      if (changeableAmount) {
        changeableAmount.textContent = changeableId
      }
      if (inputIdInfo) {
        inputIdInfo.value = changeableId
      }

      if (changeableInputs) {
        changeableInputs.forEach((inputEl) =>
          updateInputsId(inputEl, changeableId),
        )
      }

      if (changeableSelects) {
        changeableSelects.forEach((selectEl) => {
          selectEl.name = formatChangeableSelects(selectEl.name, changeableId)
        })
      }
    })
  }
}

// Блокировка/разблокировка добавления/удаления элементов в изменяемых списках при ограничении максимального количества

export const limitationChangeableElements = (changeableList, addBtn) => {
  if (changeableList && addBtn && changeableList.dataset.maxElements) {
    const countMaxElements = +changeableList.dataset.maxElements

    if (changeableList.children.length >= countMaxElements) {
      addBtn.classList.add('hidden')
    } else {
      addBtn.classList.remove('hidden')
    }
  }
}

// Фунцкия отправки fetch запросов
export async function sendData(data, url, header) {
  return await fetch(url, {
    method: 'POST',
    body: data,
    headers: { 'Content-Type': header ?? 'multipart/form-data' },
  })
}
// Фунцкия отправки fetch запросов с автоматическим определением headers
export async function sendDataDefault(data, url) {
  return await fetch(url, {
    method: 'POST',
    body: data,
  })
}

export const getNoun = (number, one, two, five) => {
  let n = Math.abs(number)
  n %= 100
  if (n >= 5 && n <= 20) {
    return five
  }
  n %= 10
  if (n === 1) {
    return one
  }
  if (n >= 2 && n <= 4) {
    return two
  }
  return five
}

export const showInfoModal = (responseText) => {
  infoModal.addEventListener('click', (e) => {
    if (e.target.classList.contains('info-modal')) {
      infoModal.classList.add('hidden')
    }
  })
  const modalText = infoModal.querySelector('.info-modal__content-text')
  modalText.textContent = responseText
  infoModal.classList.remove('hidden')
}

export const showBigImgModal = (path) => {
  bigImgModal.classList.add('big-img-modal_active')
  bigImgModal.querySelector('img').src = path
  modalOverlay.classList.add('_active')
  modalOverlay.addEventListener('click', () => {
    modalOverlay.classList.remove('_active')
    bigImgModal.classList.remove('big-img-modal_active')
  })
}

// функция определения дня недели по дате

export const defineWeekDay = (date) => {
  const datesWeekArr = ['вс', 'пн', 'вт', 'ср', 'чт', 'пт', 'сб']
  const currentDate = new Date(date)
  return datesWeekArr[currentDate.getDay()]
}

// Форматирование даты в формат дд.мм.гггг
export const formatDate = (date) => {
  return date.split('.').reverse().join('.')
}

// Получение всех соседних элементов

export const getRowsSiblings = (elem, limitElClass) => {
  let siblings = []
  let sibling = elem
  while (
    !sibling.nextElementSibling?.classList.contains(limitElClass) &&
    sibling.nextElementSibling
  ) {
    sibling = sibling.nextElementSibling
    siblings.push(sibling)
  }

  return siblings
}

// функция установки определенных option в контекстные селекты
export const setContextOptions = (value, contentSelect, stateOptions) => {
  const filteredOptions = stateOptions.filter(
    (optEl) => optEl.dataset.context === value,
  )
  contentSelect.innerHTML = ''
  filteredOptions?.forEach((filEl) => {
    contentSelect.append(filEl)
  })
}

// Удаление пробелов при передаче json в data-атрибут

export const escapeHtml = (unsafe) => {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}

// рендер option в select, option в формате [{label: 'текст', value: 'значение'}]

export const renderOptionsToSelect = (targetSelect, optionsArr) => {
  if (!targetSelect || optionsArr?.length < 1) return
  targetSelect.innerHTML = optionsArr
    ?.map((opt) => {
      return `
      <option value="${opt.value}">${opt.label}</option>
    `
    })
    .join('')
}

// форматировать строку формата "18.06.2024" к объекту Date

export const formatStrToDate = (str) => {
  if (!str) return
  const strArr = str.split('.')
  const formattedDateString = `${strArr[2]}-${strArr[1]}-${strArr[0]}`
  return new Date(formattedDateString)
}

// проверка, если меньше или равно нулю, то возврат нуля, иначе возврат исходного элемента

export const returnMoreZero = (checkEl) => {
  if (Number(checkEl) <= 0) return '0'
  return checkEl
}
