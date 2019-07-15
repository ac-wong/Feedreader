/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This test suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty.
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* Write a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
         it('URLs are defined', function() {

            for (let i = 0; i < allFeeds.length; i++) {
                expect(allFeeds[i].url).toBeDefined();
                expect(allFeeds[i].url.length).not.toBe(0);
             }
         });

        /* Write a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
         it('names are defined', function() {

            for (let i = 0; i < allFeeds.length; i++) {
                expect(allFeeds[i].name).toBeDefined();
                expect(allFeeds[i].name.length).not.toBe(0);
             }
         });

    });


    /* Write a new test suite named "The menu" */
    describe('The menu', function() {

        /* Write a test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */
         it('menu is hidden by default', function() {
              let isHidden = document.body.classList.contains('menu-hidden');
              expect(isHidden).toBe(true);
         });


         /* Write a test that ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * should have two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          */
          it('the menu changes visibility when clicked', function() {

              let menu;
              let el = document.getElementsByClassName('.menu-icon-link');

              // click
              $('.menu-icon-link').trigger('click');
              menu = document.body.classList.contains('menu-hidden');
              expect(menu).toBe(false);

              // click again
              $('.menu-icon-link').trigger('click');
              menu = document.body.classList.contains('menu-hidden');
              expect(menu).toBe(true);
          });

    });


    /* Write a new test suite named "Initial Entries" */
    describe('Initial entries', function() {

        /* Write a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         */

         beforeEach(function(done) {
            // load the first feed
            loadFeed(0, function() {
                done();
            });
         });

        it('feed container has at least one entry element', function(done) {
            // check there is at least one entry element in the feed container
            let elEntry = document.getElementsByClassName('entry');
            expect(elEntry.length).not.toBe(0);
            done();
        });

    });



    /* TODO: Write a new test suite named "New Feed Selection" */
    describe('New feed selection', function() {

        /* TODO: Write a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         */

        // this test loads the first feed and then loads the second feed, and checks that the content changes
        // additional testing in the future could be conducted for the other feeds as well
        let i = 0;
        let j, k;
        let linksFirst = [];
        let linksSecond = [];

        beforeEach(function(done) {

            // loads the first feed and get a copy of the entry links into the LinksFirst array
            loadFeed(i, function() {
                let listFirst = document.getElementsByClassName('entry-link');

                for (j = 0; j < listFirst.length; j++) {
                    linksFirst[j] = listFirst[j].href;
                }

                // loads the second feed and get the entry links into the LinksSecond array
                loadFeed(i+1, function() {
                    let listSecond = document.getElementsByClassName('entry-link');

                    for (k = 0; k < listSecond.length; k++) {
                        linksSecond[k] = listSecond[k].href;
                    }

                    done();
                });

            });

        });

        it('new feed is loaded', function(done) {

              // check min length of the two feeds (in case different number of entries)
              let minLength;
              if (linksFirst.length > linksSecond.length) {
                  minLength = linksSecond.length;
              }
              else if (linksSecond.length > linksFirst.length) {
                  minLength = linksFirst.length;
              }
              else {
                  minLength = linksFirst.length;
              }

              // loop through each entry in the two feeds (up to min length) and check that content is different
              for (let x = 0; x < minLength; x++) {
                expect(linksFirst[x]).not.toBe(linksSecond[x]);
              }

              done();

        });

    });

}());
