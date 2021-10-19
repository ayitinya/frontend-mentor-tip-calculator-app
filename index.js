const amount = document.querySelector("#amount")
const totalTip = document.querySelector("#tip-amount")
const customTip = document.getElementById("custom-tip")
const customTipRadioButton = document.getElementById("custom")
const customTipInput = document.getElementById("custom-tip")
const inputFields = document.querySelectorAll(".input-section input")
const radioButtons = document.getElementsByName("tip")
const bill = document.getElementById("bill")
const numberOfPeople = document.getElementById("number-of-people")
const errorSpan = document.getElementById("error-span")
const resetButton = document.querySelector("button[type='reset']")

function reset() {
	totalTip.innerHTML = "0.00"
	amount.innerHTML = "0.00"
	customTipRadioButton.value = ""
	numberOfPeople.value = ""
	bill.value = ""
	customTip.value = ""
	for (const radioButton of radioButtons) {
		if (radioButton.checked) {
			radioButton.checked = false
		}
	}
}

resetButton.addEventListener("click", reset)

function getTip() {
	for (const radioButton of radioButtons) {
		if (radioButton.checked) {
			return Number(radioButton.value)
		}
	}
}

function getBill() {
	if (Number(bill.value)) {
		return Number(bill.value)
	}
}

function getNumberOfPeople() {
	numberOfPeople.setCustomValidity("")
	errorSpan.style.visibility = "hidden"
	if (numberOfPeople.value === "0") {
		numberOfPeople.setCustomValidity(" ")
		errorSpan.style.visibility = "visible"
	} else if (Number(numberOfPeople.value)) {
		return Number(numberOfPeople.value)
	}
}

function calculateTip(tip, bill, numberOfPeople) {
	resetButton.disabled = false
	if (bill && tip && numberOfPeople) {
		amount.innerHTML = ((bill + tip * bill * 0.01) / numberOfPeople).toFixed(2)
		totalTip.innerHTML = ((tip * bill * 0.01) / numberOfPeople).toFixed(2)
	} else if (
		bill == undefined &&
		numberOfPeople == undefined &&
		(tip == undefined || tip == "")
	) {
		resetButton.disabled = true
	}
}

customTip.addEventListener("click", () => {
	customTipRadioButton.click()
})

customTipInput.addEventListener("input", () => {
	const customTipValue = customTipInput.value
	customTipRadioButton.value = customTipValue
})

for (const inputField of inputFields) {
	inputField.addEventListener("input", () => {
		setTimeout(() => {
			const tip = getTip()
			const bill = getBill()
			const numberOfPeople = getNumberOfPeople()
			calculateTip(tip, bill, numberOfPeople)
		}, 100)
	})
}
