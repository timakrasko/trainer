var VStep1;
var step1 = function () {
    this.preDispatch = function () {
        // Створюємо простий об'єкт валідатора
        VStep1 = {
            validate: function () {
                // Рахуємо кількість правильно вставлених блоків
                var correctCount = $('.page1 .s1-drop-zone.correct').length;

                if (correctCount === 3) {
                    alert("Чудово! Завдання виконано вірно.");
                    return true; // Повертаємо true, щоб система зарахувала крок
                } else {
                    alert("Ви заповнили не всі поля або припустилися помилки. Спробуйте ще раз.");
                    return false;
                }
            }
        };
    };

    this.postDispatch = function () {
        // Прив'язуємо кнопку перевірки до валідатора
        $('.page1 button.check').click(function () {
            VStep1.validate();
        });
    };

    this.mustache = function () {
        return { ELEMENTSTEST_TITLE1: "Крок 1: Основи синтаксису" };
    }
};