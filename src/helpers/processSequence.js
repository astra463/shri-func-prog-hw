/**
 * @file Домашка по FP ч. 2
 *
 * Подсказки:
 * Метод get у инстанса Api – каррированый
 * GET / https://animals.tech/{id}
 *
 * GET / https://api.tech/numbers/base
 * params:
 * – number [Int] – число
 * – from [Int] – из какой системы счисления
 * – to [Int] – в какую систему счисления
 *
 * Иногда промисы от API будут приходить в состояние rejected, (прямо как и API в реальной жизни)
 * Ответ будет приходить в поле {result}
 */
import Api from "../tools/api";

const api = new Api();

const validateNumberString = (str) => {
	const num = parseFloat(str);
	if (
		!/^\d+(\.\d+)?$/.test(str) ||
		str.length > 9 ||
		str.length < 3 ||
		num <= 0
	) {
		throw new Error("ValidationError");
	}
	return num;
};

const roundNumber = (num) => Math.round(num);

const convertToBinary = (number) =>
	api.get("https://api.tech/numbers/base", { from: 10, to: 2, number });

const getAnimalById = (id) => api.get(`https://animals.tech/${id}`, {});

const processSequence = ({ value, writeLog, handleSuccess, handleError }) => {
	const logAndHandleError = (error) => {
		handleError(error.message);
		writeLog(error.message);
	};

	try {
		writeLog(value);
		const number = validateNumberString(value);
		const roundedNumber = roundNumber(number);
		writeLog(roundedNumber);

		convertToBinary(roundedNumber)
			.then(({ result }) => {
				writeLog(result);

				const length = result.length;
				writeLog(length);

				const squared = roundedNumber ** 2;
				writeLog(squared);

				const remainder = squared % 3;
				writeLog(remainder);

				return getAnimalById(remainder);
			})
			.then(({ result }) => handleSuccess(result))
			.catch(logAndHandleError);
	} catch (error) {
		logAndHandleError(error);
	}
};

export default processSequence;
