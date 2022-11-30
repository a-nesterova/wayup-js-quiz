// Варианты ответов
const option1 = document.querySelector('.option1'),
      option2 = document.querySelector('.option2'),
      option3 = document.querySelector('.option3'),
      option4 = document.querySelector('.option4');

const optionElements = document.querySelectorAll('.option'); // массив вариантов ответов

const question = document.getElementById('question'); // вопрос

const numberOfQuestion = document.getElementById('number-of-question'), // номер вопроса
      numberOfAllQuestions = document.getElementById('number-of-all-questions'); // кол-во всех вопросов

let indexOfQuestion,
    indexOfPage = 0;

const answersTracker = document.getElementById('answers-tracker');
const btnNext = document.getElementById('btn-next'); // кнопка перехода к след. вопросу

let score = 0;

const correctAnswer = document.getElementById('correct-answer'), // кол-во правильных ответов
      numberOfAllQuestions2 = document.getElementById('number-of-all-questions-2'), // кол-во всех вопросов (в модальном окне)
      btnTryAgain = document.getElementById('btn-try-again'); // кнопка "начать викторину заново"


const questions = [
    {
        question: 'Какая переменная записана неверно?',
        option: [
            'var isDone = 0;',
            'var b = false;',
            'var number = 12,5;',
            'var num = "STRING";'
        ],
        rightAnswer: 2
    },
    {
        question: 'Где верно указано имя переменной?',
        option: [
            'ver num;',
            'var num-1;',
            'var num',
            'var num_1;'
        ],
        rightAnswer: 3
    },
    {
        question: 'Какие циклы есть в языке JavaScript?',
        option: [
            'for, while, do while',
            'for, while, do while, foreach',
            'for, forMap, foreach, while',
            'for, forMap, foreach, while, do while'
        ],
        rightAnswer: 0
    },
    {
        question: 'Что такое условный оператор?',
        option: [
            'Конструкция, что выполняет код несколько раз',
            'Конструкция для создания определенной переменной',
            'Оператор сравнения значений',
            'Нет верного ответа'
        ],
        rightAnswer: 2
    },
    {
        question: 'Где верно указан вывод данных?',
        option: [
            'console.log("Hello");',
            'write("Hello");',
            'print(Hello);',
            'documentWrite("Hello");'
        ],
        rightAnswer: 0
    },
    {
        question: 'Какие значения можно хранить в переменных?',
        option: [
            'Только числа',
            'Только строки',
            'Строки, числа с точкой, простые числа и булевые выражения',
            'Строки, числа с точкой и простые числа'
        ],
        rightAnswer: 2
    },
    {
        question: 'В чем отличие между локальной и глобальной переменной?',
        option: [
            'Глобальные можно переопределять, локальные нельзя',
            'Локальные можно переопределять, глобальные нельзя',
            'Отличий нет',
            'Глобальные видны повсюду, локальные только в функциях'
        ],
        rightAnswer: 3
    },
    {
        question: 'Где верно указан запуск всплывающего окна?',
        option: [
            'alert("Hi")',
            'info("Hi")',
            'Нет верного ответа',
            'new alert ("Hi")'
        ],
        rightAnswer: 0
    },
    {
        question: 'Где можно использовать JavaScript?',
        option: [
            'Мобильные приложения',
            'Веб-приложения',
            'Прикладное программное обеспечение',
            'Можно во всех перечисленных'
        ],
        rightAnswer: 3
    },
    {
        question: 'Переменные apple и Apple (с большой буквы) – это одна и та же или разные?',
        option: [
            'Одна и та же',
            'Разные',
            'С большой буквы переменные называть нельзя',
            'Слово «apple» является зарезервированным, нельзя использовать'
        ],
        rightAnswer: 1
    },
    {
        question: 'Какая арифметическая операция приводит к ошибке в javascript?',
        option: [
            'Деление на ноль.',
            'Умножение числа на строку.',
            'Корень из отрицательного числа.',
            'Никакая из вышеперечисленных.'
        ],
        rightAnswer: 3
    },
    {
        question: 'Что делает оператор **?',
        option: [
            'Возводит в степень',
            'Умножает число само на себя',
            'Делит число само на себя',
            'Нет такого оператора'
        ],
        rightAnswer: 0
    },
    {
        question: 'Какого оператора нет в javascript?',
        option: [
            '!',
            '^',
            'Все есть',
            '%'
        ],
        rightAnswer: 2
    }
]

numberOfAllQuestions.innerHTML = questions.length; // вывод кол-ва вопросов

const load = () => {
    question.innerHTML = questions[indexOfQuestion].question; // вывод вопроса

    //вывод вариантов ответов
    option1.innerHTML = questions[indexOfQuestion].option[0];
    option2.innerHTML = questions[indexOfQuestion].option[1];
    option3.innerHTML = questions[indexOfQuestion].option[2];
    option4.innerHTML = questions[indexOfQuestion].option[3];

    numberOfQuestion.innerHTML = indexOfPage + 1; // вывод текущей страницы
    indexOfPage++;
}

let completedAnswers = []; // массив для уже заданных вопросов

const randomQuestion = () => {
    let randomNumber = Math.floor(Math.random() * questions.length);
    let hitDuplicate = false; // якорь для проверки одинаковых вопросов

    if(indexOfPage == questions.length) {
        quizOver(); // конец игры
    }
    else {
        if(completedAnswers.length > 0) { // если в массиве для уже заданных вопросов элементов больше 0
            completedAnswers.forEach(item => {
                if(item == randomNumber) { // если элемент совпадает с рандомным номером
                    hitDuplicate = true; // дубликат - истина
                }
            });
            if(hitDuplicate) { // если дубликат истина
                randomQuestion(); // заново вызываем генерацию рандомного вопроса
            }
            else {
                indexOfQuestion = randomNumber; // иначе индексу вопроса присваиваем рандомный номер
                load();
            }
        }
        if(completedAnswers.length == 0) { // если массив уже заданных вопросов пустой
            indexOfQuestion = randomNumber; // индекс вопроса равен рандомному числу
            load();
        }
    }
    completedAnswers.push(indexOfQuestion); // добавляем в массив заданных вопросов индекс вопроса
}

const checkAnswer = el => {
    if(el.target.dataset.id == questions[indexOfQuestion].rightAnswer) { // если data-id = правильному варианту ответа, который указан в массиве
        el.target.classList.add('correct'); // добавляем элементу класс правильного ответа
        score++; // прибавляем кол-во правильных ответов
        updateAnswerTracker('correct');
    }
    else {
        el.target.classList.add('wrong'); // добавляем элементу класс НЕправильного ответа
        updateAnswerTracker('wrong');
    }
    disabledOptions();
}

for(option of optionElements) {
    option.addEventListener('click', e => checkAnswer(e)); // определяем по какому ответу кликнул пользователь
}

const disabledOptions = () => {
    optionElements.forEach(item => {
        item.classList.add('disabled'); // делаем кнопки неактивными
        if(item.dataset.id == questions[indexOfQuestion].rightAnswer) { // если data-id = правильному варианту ответа, который указан в массиве
            item.classList.add('correct'); // показываем правильный ответ
        }
    })
}

const enableOptions = () => {
    optionElements.forEach(item => {
        item.classList.remove('disabled', 'correct', 'wrong'); // удаление всех классов со всех ответов
    })
}

const answerTracker = () => {
    questions.forEach(() => { // обходим каждый элемент
        const div = document.createElement('div'); // создаем элемент div
        answersTracker.appendChild(div); // добавляем элемент div в конец
    })
}

const updateAnswerTracker = status => {
    answersTracker.children[indexOfPage - 1].classList.add(`${status}`); // к кружочку добавляем цвет
}

const validate = () => {
    if(!optionElements[0].classList.contains('disabled')) { // если у эл-ов есть класс disabled (неактивность)
        alert('Выберите один из вариантов ответа');
    }
    else {
        randomQuestion();
        enableOptions();
    }
}

btnNext.addEventListener('click', () => {
    validate();
})

const quizOver = () => {
    document.querySelector('.quiz-over-modal').classList.add('active'); // показываем модальное окно
    correctAnswer.innerHTML = score;
    numberOfAllQuestions2.innerHTML = questions.length;
}

const tryAgain = () => {
    window.location.reload(); // перезагрузка страницы
}

btnTryAgain.addEventListener('click', tryAgain);

//выполнение функций после загрузки страницы
window.addEventListener('load', () => {
    randomQuestion();
    answerTracker();
})

