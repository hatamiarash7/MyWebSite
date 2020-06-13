const should = require('should');
const supertest = require('supertest');
const ObjectId = require('bson-objectid');
const testUtils = require('../../utils');
const localUtils = require('./utils');
const config = require('../../../core/shared/config');
const models = require('../../../core/server/models/index');

const ghost = testUtils.startGhost;

describe('Email Preview API', function () {
    let request;

    before(function () {
        return ghost()
            .then(function (_ghostServer) {
                request = supertest.agent(config.get('url'));
            })
            .then(function () {
                return localUtils.doAuth(request, 'users:extra', 'posts');
            });
    });

    describe('Read', function () {
        it('can\'t retrieve for non existent post', function (done) {
            request.get(localUtils.API.getApiQuery(`posts/${ObjectId.generate()}/`))
                .set('Origin', config.get('url'))
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect('Cache-Control', testUtils.cacheRules.private)
                .expect(404)
                .end(function (err, res) {
                    if (err) {
                        return done(err);
                    }

                    should.not.exist(res.headers['x-cache-invalidate']);
                    const jsonResponse = res.body;
                    should.exist(jsonResponse);
                    should.exist(jsonResponse.errors);
                    testUtils.API.checkResponseValue(jsonResponse.errors[0], [
                        'message',
                        'context',
                        'type',
                        'details',
                        'property',
                        'help',
                        'code',
                        'id'
                    ]);
                    done();
                });
        });

        it('can read post email preview with fields', function () {
            return request
                .get(localUtils.API.getApiQuery(`email_preview/posts/${testUtils.DataGenerator.Content.posts[0].id}/`))
                .set('Origin', config.get('url'))
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect('Cache-Control', testUtils.cacheRules.private)
                .expect(200)
                .then((res) => {
                    should.not.exist(res.headers['x-cache-invalidate']);
                    const jsonResponse = res.body;
                    should.exist(jsonResponse);
                    should.exist(jsonResponse.email_previews);

                    localUtils.API.checkResponse(jsonResponse.email_previews[0], 'email_preview', null, null);
                });
        });

        it('can read post email preview with email card and replacements', function () {
            const post = testUtils.DataGenerator.forKnex.createPost({
                id: ObjectId.generate(),
                title: 'Post with email-only card',
                slug: 'email-only-card',
                mobiledoc: '{"version":"0.3.1","atoms":[],"cards":[["email",{"html":"<p>Hey {first_name \\"there\\"} {unknown}</p><p><strong>Welcome to your first Ghost email!</strong></p>"}],["email",{"html":"<p>Another email card with a similar replacement, {first_name, \\"see?\\"}</p>"}]],"markups":[],"sections":[[10,0],[1,"p",[[0,[],0,"This is the actual post content..."]]],[10,1],[1,"p",[]]]}',
                html: '<p>This is the actual post content...</p>',
                plaintext: 'This is the actual post content...',
                status: 'draft',
                uuid: 'd52c42ae-2755-455c-80ec-70b2ec55c904'
            });

            return models.Post.add(post, {context: {internal: true}}).then(() => {
                return request
                    .get(localUtils.API.getApiQuery(`email_preview/posts/${post.id}/`))
                    .set('Origin', config.get('url'))
                    .set('Accept', 'application/json')
                    .expect('Content-Type', /json/)
                    .expect('Cache-Control', testUtils.cacheRules.private)
                    .expect(200)
                    .then((res) => {
                        should.not.exist(res.headers['x-cache-invalidate']);
                        const jsonResponse = res.body;
                        should.exist(jsonResponse);
                        should.exist(jsonResponse.email_previews);

                        jsonResponse.email_previews[0].html.should.match(/Hey there {unknown}/);
                        jsonResponse.email_previews[0].html.should.match(/Welcome to your first Ghost email!/);
                        jsonResponse.email_previews[0].html.should.match(/This is the actual post content\.\.\./);
                        jsonResponse.email_previews[0].html.should.match(/Another email card with a similar replacement, see\?/);

                        jsonResponse.email_previews[0].plaintext.should.match(/Hey there {unknown}/);
                        jsonResponse.email_previews[0].plaintext.should.match(/Welcome to your first Ghost email!/);
                        jsonResponse.email_previews[0].plaintext.should.match(/This is the actual post content\.\.\./);
                        jsonResponse.email_previews[0].plaintext.should.match(/Another email card with a similar replacement, see\?/);
                    });
            });
        });
    });

    describe('As Owner', function () {
        it('can send test email', function () {
            const url = localUtils.API.getApiQuery(`email_preview/posts/${testUtils.DataGenerator.Content.posts[0].id}/`);
            return request
                .post(url)
                .set('Origin', config.get('url'))
                .send({
                    emails: ['test@ghost.org']
                })
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect('Cache-Control', testUtils.cacheRules.private)
                .expect(200);
        });
    });
    describe('As Admin', function () {
        before(function () {
            testUtils.createUser({
                user: testUtils.DataGenerator.forKnex.createUser({email: 'admin+1@ghost.org'}),
                role: testUtils.DataGenerator.Content.roles[0].name
            }).then((user) => {
                request.user = user;
                return localUtils.doAuth(request);
            });
        });

        it('can send test email', function () {
            const url = localUtils.API.getApiQuery(`email_preview/posts/${testUtils.DataGenerator.Content.posts[0].id}/`);
            return request
                .post(url)
                .set('Origin', config.get('url'))
                .send({
                    emails: ['test@ghost.org']
                })
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect('Cache-Control', testUtils.cacheRules.private)
                .expect(200);
        });
    });
    describe('As Editor', function () {
        before(function () {
            return testUtils.createUser({
                user: testUtils.DataGenerator.forKnex.createUser({
                    email: 'test+editor@ghost.org'
                }),
                role: testUtils.DataGenerator.Content.roles[1].name
            }).then((user) => {
                request.user = user;
                return localUtils.doAuth(request);
            });
        });

        it('can send test email', function () {
            const url = localUtils.API.getApiQuery(`email_preview/posts/${testUtils.DataGenerator.Content.posts[0].id}/`);
            return request
                .post(url)
                .set('Origin', config.get('url'))
                .send({
                    emails: ['test@ghost.org']
                })
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect('Cache-Control', testUtils.cacheRules.private)
                .expect(200);
        });
    });
    describe('As Author', function () {
        before(function () {
            return testUtils.createUser({
                user: testUtils.DataGenerator.forKnex.createUser({
                    email: 'test+author@ghost.org'
                }),
                role: testUtils.DataGenerator.Content.roles[2].name
            }).then((user) => {
                request.user = user;
                return localUtils.doAuth(request);
            });
        });

        it('cannot send test email', function () {
            const url = localUtils.API.getApiQuery(`email_preview/posts/${testUtils.DataGenerator.Content.posts[0].id}/`);
            return request
                .post(url)
                .set('Origin', config.get('url'))
                .send({
                    emails: ['test@ghost.org']
                })
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect('Cache-Control', testUtils.cacheRules.private)
                .expect(403);
        });
    });
});
