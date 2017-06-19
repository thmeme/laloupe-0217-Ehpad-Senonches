const assert = require('assert');
const request = require('supertest');

let app = "http://localhost:3000",
    admin,
    admin_token,
    user,
    user_token;

describe('API USER', function() {

  it('should connect admin', function(done) {
    request(app)
      .post('/login')
      .send({
        email: "admin@mail.com",
        password: '12345'
      })
      .expect(200)
      .end(function(err, res) {
        if (err) throw err;
        admin = res.body.user;
        admin_token = res.body.token;
        assert.equal(admin.email, "admin@mail.com");
        done();
      });
  });

  it('admin should create a user', function(done) {
    request(app)
      .post('/users')
      .set('Authorization', admin_token)
      .send({
        email: "user@mail.fr",
        password: 'azerty',
        Name: 'Test',
        Firstname: 'test'
      })
      .expect(200)
      .end(function(err, res) {
        if (err) throw err;
        user = res.body.user;
        assert.equal(user.email, "user@mail.fr");
        done();
      });
  });

  it('admin should get all user', function(done) {
    request(app)
      .get('/users/')
      .set('Authorization', admin_token)
      .expect(200, done);
  });

  it('admin should delete user', function(done) {
    request(app)
      .delete('/users/' + user._id)
      .set('Authorization', admin_token)
      .expect(200, done);
  });

  it('admin should update user', function(done) {
    request(app)
      .put('/users/' + user._id)
      .set('Authorization', admin_token)
      .expect(200, done);
  });





});
