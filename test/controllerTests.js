var supertest = require('supertest');
var app = require('../app');
var agent = supertest.agent(app);
var expect = require('chai').expect;
var models = require('../models');
var Page = models.Page;
var User = models.User;


describe('http requests', function () {


  describe('GET /', function () {
    it('responds with 200', function(){
    	return agent
    		.get('/')
    		.expect(200)
    });
  });

  describe('GET /wiki/add', function () {
    it('responds with 200', function(){
    	return agent
    		.get('/wiki/add')
    		.expect(200)
    });
  });

  describe('GET /wiki/:urlTitle', function () {
  	var testPage;
  	beforeEach(function(){
			testPage = new Page({title: 'iDoExist',content: 'I am using __markdown__.'})
			testPage.save();
		})

    it('responds with 404 on page that does not exist', function(){
    	return agent
    		.get('/wiki/iDontExist')
    		.expect(404)
    });

    it('responds with 200 on page that does exist', function(){
    	return agent
    		.get('/wiki/iDoExist')
    		.expect(200)
    });

   afterEach(function() {
    	Page.remove({});
    })

  });

  describe('GET /wiki/search', function () {
    it('responds with 200');
  });

  describe('GET /wiki/:urlTitle/similar', function () {
    it('responds with 404 for page that does not exist');
    it('responds with 200 for similar page');
  });

  describe('POST /wiki', function () {
    it('responds with 201');
    it('creates a page in the database');
  });

// CLEAN UP 
   afterEach(function() {
    	Page.remove({});
    })

});