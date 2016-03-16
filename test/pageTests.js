var chai = require('chai');
var mocha = require('mocha');
var expect = require('chai').expect;
var models = require('../models');
var Page = models.Page;
var User = models.User;


describe('Page model', function() {

	describe('Virtuals', function() {
		var testPage;
		beforeEach(function(){
			testPage = new Page({title: 'testTitle',content: 'I am using __markdown__.'})
			testPage.save();
		})

		describe('route', function() {
			it('returns the url_name prepended by "/wiki/"',function(){
				expect(testPage.route).to.equal('/wiki/testTitle');
			});
		});
		describe('renderedContent', function () {
			it('converts the markdown-formatted content into HTML',function(){
				expect(testPage.renderedContent).to.equal('<p>I am using <strong>markdown</strong>.</p>\n')
			});
		});
    // DELETE TEST DATA
    afterEach(function() {
    	Page.remove(testPage, function(err) {
    		if (!err) console.log("Data clean");
    		else console.error;
    	})
    })
});

	describe('Statics', function() {
		var testPage;
		beforeEach(function(done){
			testPage = new Page({title: 'testTitle',content: 'I am using __markdown__.',tags:['fullstack','Cindy','Iris']})
			testPage.save();
			done();
  		// done  ???
  	})

		describe('findByTag', function() {
			it('gets pages with the search tag',function(done){
				Page.findByTag('Cindy').then(function(pages){
					expect(pages[0]).to.equal(testPage);
					done();
				}).then(null, done);
			});
			it('does not get pages without the search tag',function(done){
				Page.findByTag().then(function(pages){
					expect(pages).to.have.lengthOf(0);
					done();
				}).then(null, done);
			});
		});
	    // DELETE TEST DATA
	    afterEach(function() {
	    	Page.remove(testPage, function(err) {
	    		if (!err) console.log("Data clean");
	    		else console.error;
	    	})
	    })
	});

	describe('Methods', function() {
		var testPage1, testPage2, testPage3;
		beforeEach(function(done){
			testPage1 = new Page({title: 'testTitle',content: 'I am using __markdown__.',tags:['fullstack','Cindy','Iris']});
			testPage1.save();
			testPage2 = new Page({title: 'testTitle',content: 'I am using __markdown__.',tags:['fullstack','hotdog', 'donut']});
			testPage2.save();
			testPage3 = new Page({title: 'testTitle',content: 'I am using __markdown__.',tags:['muffin','cookie', 'dumpling']} );
			testPage3.save();
			console.log("created pages")
			done();
			//  page.create   how to integrate Done
		});

		describe('findSimilar', function() {
			console.log("testPage1", testPage1)
			it('never gets itself', function(done){
				testPage1.findSimilar().then(function(matches) {
					expect(matches.indexOf(testPage1)).to.equal(-1);
					done();
				}).then(null, done);
			});
			it('gets other pages with any common tags', function(done){
				testPage1.findSimilar().then(function(matches) {
					expect(matches).to.have.lengthOf(1);
					done();
				}).then(null, done);
			});
			it('does not get other pages without any common tags', function(done){
				testPage1.findSimilar().then(function(matches) {
					expect(matches.indexOf(testPage3)).to.equal(-1);
					done();
				}).then(null, done);
			});
		});

		// DELETE TEST DATA
	    afterEach(function() {
	    	Page.remove(testPage1, function(err) {
	    		if (!err) console.log("Data clean");
	    		else console.error;
	    	})
	    	Page.remove(testPage2, function(err) {
	    		if (!err) console.log("Data clean");
	    		else console.error;
	    	})
	    	Page.remove(testPage3, function(err) {
	    		if (!err) console.log("Data clean");
	    		else console.error;
	    	})
	    })
	});

	describe('Validations', function() {
		var testPage1, testPage2, testPage3;
		beforeEach(function(done){
			testPage1 = new Page({content: 'I am using __markdown__.',tags:['fullstack','Cindy','Iris']});
			
			testPage2 = new Page({title: 'testTitle',tags:['fullstack','hotdog', 'donut']});
			
			testPage3 = new Page({title: 'testTitle',content: 'I am using __markdown__.',status: 'I am dead',tags:['muffin','cookie', 'dumpling']} );
			
			done();
			//  page.create   how to integrate Done
		});

		it('errors without title',function(done){
			testPage1.save(function(error){
				expect(error.errors['title'].message).to.equal('Path `title` is required.');
				done();
			});
			//done();
		});
		it('errors without content',function(done){
			testPage2.save(function(error){
				expect(error.errors).to.have.property('content');
				done();
			});
		});
		it('errors given an invalid status',function(done){
			testPage3.save(function(error){
				expect(error.errors).to.have.property('status');
				done();
			});
		});

	    afterEach(function() {
	    	Page.remove(testPage1, function(err) {
	    		if (!err) console.log("Data clean");
	    		else console.error;
	    	})
	    	Page.remove(testPage2, function(err) {
	    		if (!err) console.log("Data clean");
	    		else console.error;
	    	})
	    	Page.remove(testPage3, function(err) {
	    		if (!err) console.log("Data clean");
	    		else console.error;
	    	})
	    })
	});

	describe('Hooks', function() {
	var testPage;
		beforeEach(function(done){
			testPage = new Page({title: 'testTitle% ?? hi',content: 'I am using __markdown__.',tags:['fullstack','Cindy','Iris']})
			testPage.save();
			done();
  		// done  ???
  		})

		it('it sets urlTitle based on title before validating',function(done){
			expect(testPage.urlTitle).to.equal('testTitle__hi');
			done();
		});

		afterEach(function() {
	    	Page.remove(testPage, function(err) {
	    		if (!err) console.log("Data clean");
	    		else console.error;
	    	})
	    })
	});



});