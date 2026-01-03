var VStep1;

var step1 = function () {
    var attempts = 0;
    var maxAttempts = 3;

    this.preDispatch = function () {
        // Створюємо валідатор для першого кроку
        VStep1 = {
            validate: function () {
                attempts++;

                // Перевіряємо всі поля введення
                var input1 = $('input[name="step1-input1"]').val().trim();
                var input2 = $('input[name="step1-input2"]').val().trim();
                var input3 = $('input[name="step1-input3"]').val().trim();
                var input4 = $('input[name="step1-input4"]').val().trim();
                var input5 = $('input[name="step1-input5"]').val().trim();

                // Правильні відповіді
                var correct1 = input1.toLowerCase() === 'fun';
                var correct2 = input2.toLowerCase() === 'val';
                var correct3 = input3.toLowerCase() === 'var';
                var correct4 = input4.toLowerCase() === 'println';
                var correct5 = input5.toLowerCase() === 'int';

                // Підсвічуємо правильні/неправильні відповіді
                VStep1.highlightInput($('input[name="step1-input1"]'), correct1);
                VStep1.highlightInput($('input[name="step1-input2"]'), correct2);
                VStep1.highlightInput($('input[name="step1-input3"]'), correct3);
                VStep1.highlightInput($('input[name="step1-input4"]'), correct4);
                VStep1.highlightInput($('input[name="step1-input5"]'), correct5);

                // Рахуємо правильні відповіді
                var correctCount = [correct1, correct2, correct3, correct4, correct5].filter(Boolean).length;

                // Перевіряємо чи всі відповіді правильні
                if (correct1 && correct2 && correct3 && correct4 && correct5) {
                    alert("🎉 Чудово! Всі відповіді правильні!\n\nВи можете перейти до наступного кроку.");
                    $('.page1 button.check').prop('disabled', true).text('✓ Завдання виконано');
                    Rotator.enableNextButton();
                    return true;
                } else {
                    var remainingAttempts = maxAttempts - attempts;

                    if (remainingAttempts > 0) {
                        alert("❌ Не всі відповіді правильні.\n\n" +
                            "Правильних відповідей: " + correctCount + " з 5\n" +
                            "Залишилось спроб: " + remainingAttempts + "\n\n" +
                            "Підказка: Зверніть увагу на підсвічені поля.");
                    } else {
                        alert("❌ Спроби вичерпано!\n\n" +
                            "Правильних відповідей: " + correctCount + " з 5\n\n" +
                            "Ви можете перейти до наступного кроку, але отримаєте менше балів.");
                        $('.page1 button.check').prop('disabled', true).text('✗ Спроби вичерпано');
                        Rotator.enableNextButton();
                    }

                    // Оновлюємо лічильник спроб на кнопці
                    VStep1.updateAttemptsDisplay();
                    return false;
                }
            },

            highlightInput: function(input, isCorrect) {
                input.removeClass('input-correct input-wrong');
                if (isCorrect) {
                    input.addClass('input-correct');
                } else {
                    input.addClass('input-wrong');
                }
            },

            updateAttemptsDisplay: function() {
                var remainingAttempts = maxAttempts - attempts;
                if (remainingAttempts > 0) {
                    $('.attempts-counter').text('Спроб залишилось: ' + remainingAttempts);
                } else {
                    $('.attempts-counter').text('Спроби вичерпано').css('color', '#f44336');
                }
            }
        };
    };

    this.postDispatch = function () {
        // Блокуємо кнопку "Наступний крок" до успішної перевірки
        Rotator.disableNextButton();

        // Додаємо лічильник спроб
        $('.page1 .text-center').prepend('<p class="attempts-counter" style="font-size: 18px; font-weight: bold; color: #667eea; margin-bottom: 15px;">Спроб залишилось: ' + maxAttempts + '</p>');

        // Додаємо обробник кліку на кнопку перевірки
        $('.page1 button.check').click(function () {
            if (attempts < maxAttempts) {
                VStep1.validate();
            }
        });

        // Очищаємо підсвічування при введенні
        $('.page1 input[type="text"]').on('input', function() {
            $(this).removeClass('input-correct input-wrong');
        });
    };

    this.mustache = function () {
        return {
            STEP1_INPUT1: new TextInput('step1-input1').render(),
            STEP1_INPUT2: new TextInput('step1-input2').render(),
            STEP1_INPUT3: new TextInput('step1-input3').render(),
            STEP1_INPUT4: new TextInput('step1-input4').render(),
            STEP1_INPUT5: new TextInput('step1-input5').render()
        }
    }
};