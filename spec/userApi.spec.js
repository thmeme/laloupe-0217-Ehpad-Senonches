const assert = require('assert');
const request = require('supertest');

let app = "http://localhost:3000",
    admin,
    admin_token,
    user,
    user_token,
    submenu;


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
        console.log('admin', admin);
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
        console.log('user', user);
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

  it('admin should update user', function(done) {
    request(app)
      .put('/users/' + user._id)
      .set('Authorization', admin_token)
      .expect(200, done);
  });

  it('admin should delete user', function(done) {
    request(app)
      .delete('/users/' + user._id)
      .set('Authorization', admin_token)
      .expect(200, done);
  });

});


describe('API SUBMENU', function() {

  it('admin should create a submenu', function(done) {
    request(app)
      .post('/submenus/admin/')
      .set('Authorization', admin_token)
      .send({
        menu: "Votre admission",
        title : 'Submenu',
        content: 'text'
      })
      .expect(200)
      .end(function (err, res) {
        if (err) throw err;
        submenu = res.body.submenu;
        console.log('submenu', submenu);
        assert.equal(submenu.menu, 'Votre admission');
        done();
      });
  });

  it('user should create a submenu', function(done) {
    request(app)
      .post('/submenus/')
      .set('Authorization', admin_token)

      .send({
        menu: "Menu",
        title : 'Submenu',
        content: 'text'
      })
      .expect(200)
      .end(function (err, res) {
        if (err) throw err;
        submenu = res.body.submenu;
        // assert.equal(submenu.menu, 'Votre admission' || 'Votre séjour' || 'Vos droits');
        done();

      });
  });

  it('user should get all submenus', function(done) {
    request(app)
      .get('/submenus/')
      .set('Authorization', admin_token)
      .expect(200, done);
  });
//   //
//   // it('admin should update submenu', function(done) {
//   //   request(app)
//   //     .put('/submenus/admin/' + submenu._id)
//   //     .set('Authorization', admin_token)
//   //     .expect(200, done);
//   // });
//   //
//   // it('user should update submenu', function(done) {
//   //   request(app)
//   //     .put('/submenus/admin/' + submenu._id)
//   //     .set('Authorization', admin_token)
//   //     .expect(200, done);
//   // });
//   //
//   //
//   //
//   // it('admin should delete submenu', function(done) {
//   //   request(app)
//   //     .delete('/submenu/' + submenu._id)
//   //     .set('Authorization', admin_token)
//   //     .expect(200, done);
//   // });
//
});
