var supertest = require('supertest');
var app = require('../app');
var agent = supertest.agent(app);
var expect = require('chai').expect;
var models = require('../models');
var Page = models.Page;
var User = models.User;


 describe('http requests', function () {


//   describe('GET /', function () {
//     it('responds with 200', function(){
//     	return agent
//     		.get('/')
//     		.expect(200)
//     });
//   });

//   describe('GET /wiki/add', function () {
//     it('responds with 200', function(){
//     	return agent
//     		.get('/wiki/add')
//     		.expect(200)
//     });
//   });

//   describe('GET /wiki/:urlTitle', function () {
//   	var testPage;
//   	beforeEach(function(){
// 			testPage = new Page({title: 'iDoExist',content: 'I am using __markdown__.'})
// 			testPage.save();
// 		})

//     it('responds with 404 on page that does not exist', function(done){
//     	return agent
//     		.get('/wiki/iDontExist')
//     		.expect(404, done)
//     });

//     it('responds with 200 on page that does exist', function(done){
//     	return agent
//     		.get('/wiki/iDoExist')
//     		.expect(200,done)
//     });

//    afterEach(function() {
//     	Page.remove({});
//     })

//   });

//   describe('GET /wiki/search', function () {
//     // var testPage;
//     // beforeEach(function(done){
//     //   testPage = new Page({title: 'iDoExist',content: 'I am using __markdown__.',tags:['Cindy']})
//     //   testPage.save();
//     //   done();
//     // })

//     it('responds with 200',function(done){
//       return agent
//         .get('/wiki/search?search=Cindy')
//         .expect(200,done);
//     });

//     afterEach(function(done) {
//       Page.remove({});
//       done();
//     })

//   });

//   describe('GET /wiki/:urlTitle/similar', function () {
//     var testPage;
//     beforeEach(function(){
//       testPage = new Page({title: 'iDoExist',content: 'I am using __markdown__.',tag:'fullstack'})
//       testPage.save();
//     })


//     it('responds with 404 for page that does not exist',function(done){
//       return agent
//         .get('/wiki/iDontExist/similar')
//         .expect(404,done);
//     });
//     it('responds with 200 for similar page',function(done){
//       return agent
//         .get('/wiki/iDoExist/similar')
//         .expect(200,done);
//     });

//    afterEach(function(done) {
//       Page.remove({});
//       done();
//     })
//   });

  describe('POST /wiki', function () {

    it('responds with 302', function(done) {
      return agent
      .post('/wiki')
      .send({name: 'Iris', email: 'iris@aol.com', title: 'My Test Page', content: 'I love Fullstack', status: "open", tags:"Cindy"})
      .expect(302, done);
    });

    it('creates a page in the database', function(done) {
      Page.find({}).then(function(pages){
          expect(pages).to.have.lengthOf(1);
          done();
        }).then(null, done);
      })

  afterEach(function(done) {
      User.remove({}).then(function() {
        Page.remove({});
    }).then(done).then(null,done);
  });
});

// CLEAN UP 
   afterEach(function() {
    	Page.remove({});
    })

});