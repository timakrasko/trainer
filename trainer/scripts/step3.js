var VStep3;

var step3 = function () {
    var attempts = 0;
    var maxAttempts = 3;

    this.preDispatch = function () {
        VStep3 = {
            validate: function () {
                attempts++;

                // Отримуємо всі drop zones
                var dropZones = document.querySelectorAll('.drop-zone');
                var correctCount = 0;
                var allFilled = true;

                // Перевіряємо кожну зону
                dropZones.forEach(function(zone) {
                    var correctMethod = zone.getAttribute('data-correct');
                    var droppedMethod = zone.querySelector('.dropped-method');

                    if (!droppedMethod) {
                        allFilled = false;
                        return;
                    }

                    var placedMethod = droppedMethod.getAttribute('data-method');

                    // Очищуємо попередні класи
                    zone.classList.remove('correct', 'wrong');

                    // Перевіряємо правильність
                    if (placedMethod === correctMethod) {
                        zone.classList.add('correct');
                        correctCount++;
                    } else {
                        zone.classList.add('wrong');
                    }
                });

                // Перевіряємо чи всі зони заповнені
                if (!allFilled) {
                    alert("⚠️ Заповніть всі позиції!\n\nРозмістіть методи у всіх 6 позиціях життєвого циклу.");
                    return false;
                }

                // Перевіряємо результат
                if (correctCount === 6) {
                    alert("🎉 Вітаємо! Життєвий цикл Activity складено правильно!\n\nВи відмінно розумієте, як працює Activity в Android!");
                    $('.page3 button.check:not(.reset-btn)').prop('disabled', true).text('✓ Завдання виконано');
                    Rotator.enableNextButton();
                    return true;
                } else {
                    var remainingAttempts = maxAttempts - attempts;

                    if (remainingAttempts > 0) {
                        alert("❌ Деякі методи розміщено невірно.\n\n" +
                            "Правильно розміщено: " + correctCount + " з 6\n" +
                            "Залишилось спроб: " + remainingAttempts + "\n\n" +
                            "Підказка: Зелені позиції правильні, червоні - ні!");
                    } else {
                        alert("❌ Спроби вичерпано!\n\n" +
                            "Правильно розміщено: " + correctCount + " з 6\n\n" +
                            "Ви можете перейти до наступного кроку, але отримаєте менше балів.");
                        $('.page3 button.check:not(.reset-btn)').prop('disabled', true).text('✗ Спроби вичерпано');
                        Rotator.enableNextButton();
                    }

                    // Оновлюємо лічильник спроб
                    VStep3.updateAttemptsDisplay();
                    return false;
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
        // Блокуємо кнопку "Наступний крок"
        Rotator.disableNextButton();

        // Додаємо лічильник спроб
        $('.page3 .text-center').prepend('<p class="attempts-counter" style="font-size: 18px; font-weight: bold; color: #667eea; margin-bottom: 15px;">Спроб залишилось: ' + maxAttempts + '</p>');

        // Обробник кнопки перевірки
        $('.page3 button.check:not(.reset-btn)').click(function () {
            if (attempts < maxAttempts) {
                VStep3.validate();
            }
        });

        // Очищаємо підсвічування при переміщенні
        document.addEventListener('drop', function() {
            setTimeout(function() {
                document.querySelectorAll('.drop-zone').forEach(function(zone) {
                    if (zone.querySelector('.dropped-method')) {
                        zone.classList.remove('correct', 'wrong');
                    }
                });
            }, 100);
        });
    };

    this.mustache = function () {
        return {};
    };
};