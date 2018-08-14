const _ = require('lodash');
const Path = require('path-parser').default;
const { URL } = require('url');
const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');
const Mailer = require('../services/Mailer');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');
const Survey = mongoose.model('surveys');

module.exports = app => {
    app.post('/api/surveys', requireLogin, requireCredits, async (req, res) => {
        const { title, subject, body, recipients } = req.body;
        // Create new Survey instance
        const survey = new Survey({
            title,
            subject,
            body,
            recipients: recipients.split(',').map(email => ({ email: email.trim() })),
            _user: req.user.id,
            dateSent: Date.now()
        });
        // Attempt to create and send email
        const mailer = new Mailer(survey, surveyTemplate(survey));
        try{
            // Email sent successfully?
            await mailer.send();

            // Save survey!
            await survey.save();

            // Survey handler complete
            req.user.credits -= 1;
            const user = await req.user.save();
            res.send(user);
        } catch (error) {
            res.status(422).send(error);
        }

    });

    app.get('/api/surveys/thanks', (req, res) => {
        res.send('Thanks for voting');
    });

    app.post('/api/surveys/webhooks', (req, res) => {
        // console.log(req.body);
        // res.send({});
        // map
        const p = new Path('/api/surveys/:surveyId/:choice');

        const events = _.chain(req.body)
            .map(({ email, url}) => {
                const match = p.test(new URL(url).pathname);
                if(match) {
                    return {
                        email,
                        surveyId: match.surveyId,
                        choice: match.choice
                    };
                }
            })
            .compact()
            .uniqBy('email', 'surveyId')
            .value();

        console.log(events);
        res.send({});
    });
};