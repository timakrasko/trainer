var VStep2;// A variable for future validator

var step2 = function () {
    this.preDispatch = function () {
        Rotator.enableNextButton();
    };

    this.postDispatch = function () {
        VStep2= new Validator();
        VStep2
        .addValidator($('input[name="step2-input1"]'), 'Malware')
        .addValidator($('input[name="step2-input2"]'), 'Вірус')
        .addValidator($('input[name="step2-input3"]'), 'Хробак')
        .addValidator($('input[name="step2-input4"]'), 'Ransomware')
        .addValidator($('input[name="step2-input5"]'), 'Spyware')
        .addValidator($('input[name="step2-input6"]'), 'Фішинг')
        .addValidator($('input[name="step2-input7"]'), 'Spear phishing')
        .setStrictMode(true)
        .setIgnoreCase(false)
        .enableStepFinishAlert(true);

        $('.page2 button.check').click(function () {
            VStep2.setAttemptsOnCheckButton($(this));
            VStep2.validate();
        });
    };

    this.mustache = function () {
        return {
            STEP2_INPUT1: new TextInput('step2-input1').render(),
            STEP2_INPUT2: new TextInput('step2-input2').render(),
            STEP2_INPUT3: new TextInput('step2-input3').render(),
            STEP2_INPUT4: new TextInput('step2-input4').render(),
            STEP2_INPUT5: new TextInput('step2-input5').render(),
            STEP2_INPUT6: new TextInput('step2-input6').render(),
            STEP2_INPUT7: new TextInput('step2-input7').render(),
        }
    }
};