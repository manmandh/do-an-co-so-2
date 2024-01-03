export const captalizeWord = (word) => {
	return word.charAt(0).toUpperCase().concat(word.slice(1))
}
export const captalizeString = (text) => {
	return text.split().map((word) => captalizeWord(word))
}

export const formatDate = (date) => {}

export const validateUser = (...info) => {
	for (let inf of info) {
		if (inf === '') return false
	}
	return true
}

export const formatMoneyTo = (number = 0, currency = 'VND') => {
	const formater = new Intl.NumberFormat('vi-VN', {
		style: 'currency',
		currency,
	})
	return formater.format(number)
}

export const formatNumber = (number, local = 'en-IN') => {
	return new Intl.NumberFormat(local).format(number)
}

export const convertToDom = (text) => {
	const splitedText = text.split('\n')
	splitedText.unshift('')
	const returnText = splitedText.reduce((acc, cur) => {
		return acc.concat(`<p>${cur}</p>`, '<br/>')
	})
	return returnText
}
