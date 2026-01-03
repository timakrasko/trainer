var VStep3;

var step3 = function () {
    this.preDispatch = function () {
        
    };

    this.postDispatch = function () {
        VStep3 = new Validator();
        VStep3.addValidator($('input[name="q1-radios"]'), 'right')
            .addValidator($('input[name="q2-radios"]'), 'right')
            .addValidator($('input[name="q3-radios"]'), 'right')
            .addValidator($('input[name="q4-radios"]'), 'right')
            .addValidator($('input[name="q5-radios"]'), 'right')
            .setStrictMode(true) 
            .setIgnoreCase(false)
            .enableStepFinishAlert(true);

        $('.page3 button.check').click(function () {
            VStep3.setAttemptsOnCheckButton($(this));
            VStep3.validate(); 
        });
    };

    this.mustache = function () {
        return {
        Q1_RADIOS: new Radios('q1-radios')
            .addRadio('{{RADIO_TEXT_1_1}}', 'wrong')
            .addRadio('{{RADIO_TEXT_1_2}}', 'wrong')
            .addRadio('{{RADIO_TEXT_1_3}}', 'right')
            .addRadio('{{RADIO_TEXT_1_4}}', 'wrong')
            .randomize()
            .render(),
        Q2_RADIOS: new Radios('q2-radios')
            .addRadio('{{RADIO_TEXT_2_1}}', 'wrong')
            .addRadio('{{RADIO_TEXT_2_2}}', 'right')
            .addRadio('{{RADIO_TEXT_2_3}}', 'wrong')
            .addRadio('{{RADIO_TEXT_2_4}}', 'wrong')
            .randomize() 
            .render(),
        Q3_RADIOS: new Radios('q3-radios')
            .addRadio('{{RADIO_TEXT_3_1}}', 'wrong')
            .addRadio('{{RADIO_TEXT_3_2}}', 'right')
            .addRadio('{{RADIO_TEXT_3_3}}', 'wrong')
            .addRadio('{{RADIO_TEXT_3_4}}', 'wrong')
            .randomize() 
            .render(),
        Q4_RADIOS: new Radios('q4-radios')
            .addRadio('{{RADIO_TEXT_4_1}}', 'wrong')
            .addRadio('{{RADIO_TEXT_4_2}}', 'wrong')
            .addRadio('{{RADIO_TEXT_4_3}}', 'right')
            .addRadio('{{RADIO_TEXT_4_4}}', 'wrong')
            .randomize() 
            .render(),
        Q5_RADIOS: new Radios('q5-radios')
            .addRadio('{{RADIO_TEXT_5_1}}', 'wrong')
            .addRadio('{{RADIO_TEXT_5_2}}', 'wrong')
            .addRadio('{{RADIO_TEXT_5_3}}', 'wrong')
            .addRadio('{{RADIO_TEXT_5_4}}', 'right')
            .randomize() 
            .render(),
        };
    };
};
