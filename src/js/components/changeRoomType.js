const initialEl = document.querySelector('.apart-list li')

export const initChangeSelects = (elToFind) => {
  const changeTypeSelects = elToFind?.querySelectorAll('.type-room-select')
  if (changeTypeSelects) {
    changeTypeSelects.forEach(changeSelect => {
      changeSelect.addEventListener('input', (e) => {
        const currentElement = e.currentTarget.closest('.room-state')
        const dataStateInput = currentElement.querySelector('.state-info')
        const allInputs = currentElement.querySelectorAll('input:not(.room-id, .state-info), textarea')
        currentElement.dataset.state = e.target.value
        dataStateInput.value = e.target.value
        changeTypeSelects.forEach(changeSelect => changeSelect.value = currentElement.dataset.state)
        allInputs.forEach(el => el.value = '')
      })
    })

  }

}

initChangeSelects(initialEl)
