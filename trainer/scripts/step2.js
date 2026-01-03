var step2 = function () {
    // Змінні для логіки спроб
    var attempts = 0;
    var maxAttempts = 3;

    this.preDispatch = function () {
        // Блокуємо кнопку "Далі", поки не виконають завдання
        Rotator.disableNextButton();
    };

    this.postDispatch = function () {
        // Додаємо лічильник спроб на сторінку
        if ($('.page2 .attempts-info').length === 0) {
            $('.page2 h1').after('<p class="attempts-info" style="color: #667eea; font-weight: bold;">Спроб залишилось: ' + maxAttempts + '</p>');
        }

        // Обробка кнопок переміщення (Вгору/Вниз)
        $('.page2').on('click', '.s2-btn', function() {
            var btn = $(this);
            var item = btn.closest('li');

            if (btn.text() === '▲') {
                item.prev().before(item);
            } else {
                item.next().after(item);
            }
            // Скидаємо кольори при зміні порядку
            $('.page2 li').css({'background': '#f4f6f8', 'border-color': '#d1d9e0'});
        });

        // Логіка перевірки
        $('.page2 button.check').click(function () {
            attempts++;
            var currentOrder = [];

            // Збираємо порядок data-id
            $('.page2 #codeList2 li').each(function(){
                currentOrder.push($(this).attr('data-id'));
            });

            // Правильний порядок: 1, 2, 3, 4, 5
            if (currentOrder.join(',') === "1,2,3,4,5") {
                // УСПІХ
                alert("Чудово! Структура коду вірна.");
                $('.page2 #codeList2 li').css({'background': '#e8f5e9', 'border-color': '#4caf50'});
                $('.page2 button.check').prop('disabled', true).text('Виконано');
                $('.attempts-info').text('Завдання зараховано!').css('color', 'green');

                Rotator.enableNextButton(); // Вмикаємо перехід
            } else {
                // ПОМИЛКА
                var left = maxAttempts - attempts;
                $('.attempts-info').text('Спроб залишилось: ' + left);

                // Підсвічуємо червоним список
                $('.page2 #codeList2 li').css('border-color', '#e57373');

                if (left <= 0) {
                    alert("Спроби вичерпано! Ви можете йти далі, але завдання не зараховано.");
                    $('.page2 button.check').prop('disabled', true);
                    Rotator.enableNextButton(); // Дозволяємо йти далі навіть при невдачі
                } else {
                    alert("Порядок неправильний. Спробуйте ще раз.");
                }
            }
        });
    };

    this.mustache = function () {
        return { ELEMENTSTEST_TITLE2: "Крок 2: Структура UI" };
    }
};