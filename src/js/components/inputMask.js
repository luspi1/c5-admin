import Inputmask from 'inputmask'

export const initAllMasks = () => {
  const initDateInputMasks = () => {
    const dateInputMasks = document.querySelectorAll('.date-mask')

    if (dateInputMasks) {
      dateInputMasks.forEach((el) => {
        Inputmask({
          alias: 'datetime',
          inputFormat: 'dd.mm.yyyy',
          clearIncomplete: true,
          showMaskOnHover: false,
          showMaskOnFocus: false,
        }).mask(el)
      })
    }
  }

  initDateInputMasks()

  const initCustomMasks = () => {
    const dateCustomMasks = document.querySelectorAll('input[data-custom-mask]')
    if (dateCustomMasks) {
      dateCustomMasks.forEach((el) => {
        Inputmask({
          mask: el.dataset.customMask,
          showMaskOnHover: false,
          showMaskOnFocus: false,
        }).mask(el)
      })
    }
  }

  initCustomMasks()

  const currencyMasks = document.querySelectorAll('.currency-mask')
  if (currencyMasks) {
    currencyMasks.forEach((itemMask) => {
      Inputmask({
        alias: 'currency',
        groupSeparator: ' ',
        showMaskOnHover: false,
        showMaskOnFocus: false,
        shortcuts: null,
        allowMinus: false,
      }).mask(itemMask)
    })
  }

  const currencyMasksRange = document.querySelectorAll('.currency-mask-range')
  if (currencyMasksRange) {
    currencyMasksRange.forEach((itemMask) => {
      Inputmask({
        mask: '9{1,}-9{1,}',
        placeholder: '___-___',
        showMaskOnHover: false,
        showMaskOnFocus: false,
        shortcuts: null,
        allowMinus: false,
      }).mask(itemMask)
    })
  }

  const numberMasks = document.querySelectorAll('.number-mask')
  if (numberMasks) {
    numberMasks.forEach((itemMask) => {
      const isInteger = itemMask.classList.contains('_integer')
      Inputmask({
        alias: isInteger ? 'integer' : 'numeric',
        allowMinus: false,
        showMaskOnHover: false,
        showMaskOnFocus: false,
        shortcuts: null,
      }).mask(itemMask)
    })
  }

  const phoneMasks = document.querySelectorAll('.phone-mask')
  if (phoneMasks) {
    phoneMasks.forEach((itemMask) => {
      Inputmask({
        mask: '+7 (999) 999-99-99',
        showMaskOnHover: false,
        showMaskOnFocus: false,
        shortcuts: null,
      }).mask(itemMask)
    })
  }

  //маска валют для текстовых элементов

  const textCurrencyMasks = document.querySelectorAll('.currency-mask-text')
  if (textCurrencyMasks) {
    textCurrencyMasks.forEach((el) => {
      Inputmask({
        alias: 'currency',
        groupSeparator: ' ',
        showMaskOnHover: false,
        showMaskOnFocus: false,
        shortcuts: null,
        allowMinus: false,
      }).mask(el)
    })
  }
}

initAllMasks()
