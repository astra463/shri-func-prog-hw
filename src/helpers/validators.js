/**
 * @file Домашка по FP ч. 1
 *
 * Основная задача — написать самому, или найти в FP библиотеках функции anyPass/allPass
 * Эти функции/их аналоги есть и в ramda и в lodash
 *
 * allPass — принимает массив функций-предикатов, и возвращает функцию-предикат, которая
 * вернет true для заданного списка аргументов, если каждый из предоставленных предикатов
 * удовлетворяет этим аргументам (возвращает true)
 *
 * anyPass — то же самое, только удовлетворять значению может единственная функция-предикат из массива.
 *
 * Если какие либо функции написаны руками (без использования библиотек) это не является ошибкой
 */

// 1. Красная звезда, зеленый квадрат, все остальные белые.

import {
	allPass,
	anyPass,
	equals,
	compose,
	filter,
	prop,
	values,
	gte,
	complement,
	length,
} from "ramda";

const isRed = equals("red");
const isWhite = equals("white");
const isNotRed = complement(isRed);
const isNotWhite = complement(isWhite);

const propEq = (propName, value) => compose(equals(value), prop(propName));

// Подсчет количества фигур определенного цвета
const countByColor = (color) => compose(length, filter(equals(color)), values);

// Функция для сравнения количества фигур двух цветов
const colorCountEquals = (color1, color2) => (obj) =>
	countByColor(color1)(obj) === countByColor(color2)(obj);

export const validateFieldN1 = ({ star, square, triangle, circle }) =>
	allPass([
		propEq("star", "red"),
		propEq("square", "green"),
		propEq("triangle", "white"),
		propEq("circle", "white"),
	])({ star, square, triangle, circle });

// 2. Как минимум две фигуры зеленые.
export const validateFieldN2 = ({ star, square, triangle, circle }) =>
	gte(countByColor("green")({ star, square, triangle, circle }), 2);

// 3. Количество красных фигур равно кол-ву синих.
export const validateFieldN3 = ({ star, square, triangle, circle }) =>
	colorCountEquals("red", "blue")({ star, square, triangle, circle });

// 4. Синий круг, красная звезда, оранжевый квадрат треугольник любого цвета
export const validateFieldN4 = ({ star, square, triangle, circle }) =>
	allPass([
		propEq("circle", "blue"),
		propEq("star", "red"),
		propEq("square", "orange"),
	])({ star, square, triangle, circle });

// 5. Три фигуры одного любого цвета кроме белого (четыре фигуры одного цвета – это тоже true).
export const validateFieldN5 = ({ star, square, triangle, circle }) => {
	const colors = ["red", "green", "blue", "orange"];
	return anyPass(
		colors.map((color) => (obj) => gte(countByColor(color)(obj), 3))
	)({ star, square, triangle, circle });
};

// 6. Ровно две зеленые фигуры (одна из зелёных – это треугольник), плюс одна красная. Четвёртая оставшаяся любого доступного цвета, но не нарушающая первые два условия
export const validateFieldN6 = ({ star, square, triangle, circle }) =>
	allPass([
		propEq("triangle", "green"),
		(obj) => countByColor("green")(obj) === 2,
		(obj) => countByColor("red")(obj) === 1,
	])({ star, square, triangle, circle });

// 7. Все фигуры оранжевые.
export const validateFieldN7 = ({ star, square, triangle, circle }) =>
	allPass([
		propEq("star", "orange"),
		propEq("square", "orange"),
		propEq("triangle", "orange"),
		propEq("circle", "orange"),
	])({ star, square, triangle, circle });

// 8. Не красная и не белая звезда, остальные – любого цвета.
export const validateFieldN8 = ({ star }) =>
	allPass([isNotRed, isNotWhite])(star);

// 9. Все фигуры зеленые.
export const validateFieldN9 = ({ star, square, triangle, circle }) =>
	allPass([
		propEq("star", "green"),
		propEq("square", "green"),
		propEq("triangle", "green"),
		propEq("circle", "green"),
	])({ star, square, triangle, circle });

// 10. Треугольник и квадрат одного цвета (не белого), остальные – любого цвета
export const validateFieldN10 = ({ square, triangle }) =>
	allPass([isNotWhite, equals(square)])(triangle);
