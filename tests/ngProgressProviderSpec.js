/*globals describe:true,it:true,inject:true,expect:true,beforeEach:true,runs:true,
waitsFor:true */
describe('How the provider should work', function () {
    beforeEach(function () {
        module('ngProgress.provider');
    });

    beforeEach(inject(function (ngProgress, $window) {
        this.progressbar = ngProgress;
        this.$window = $window;
    }));

    it('starts at zero when just being injected', function () {
        expect(this.progressbar.status()).toBe(0);
    });

    it('can change the status to 30 if you call set()', function () {
        this.progressbar.set(30);
        expect(this.progressbar.status()).toBe(30);
    });

    it('will stop progress when call set()', function () {
        this.progressbar.start();
        this.progressbar.set(1);
        expect(this.progressbar.status()).toBe(1);
    });
    var value, flag;
    it('increaments over time after calling start()', function () {
        // var value, flag;
        this.progressbar.start();

        runs(function () {
            flag = false;
            value = this.progressbar.status();

            setTimeout(function () {
                flag = true;
            }, 1000);
        });
        waitsFor(function () {
            value = this.progressbar.status();
            return flag;
        }, "The Value should be incremented", 1000);

        runs(function () {
            expect(value).toBeGreaterThan(20);
            expect(value).toBeLessThan(50);
        });
    });

    it('have 100 returned from status() after complete()', function () {
        this.progressbar.start();
        this.progressbar.complete();
        expect(this.progressbar.status()).toBe(100);
    });

    it('resets to zero when calling reset() after start() or set()', function () {
        this.progressbar.set(30);
        this.progressbar.reset();
        expect(this.progressbar.status()).toBe(0);
    });
    it('will return 100 after calling complete', function () {
        this.progressbar.set(30);
        this.progressbar.complete();
        expect(this.progressbar.status()).toBe(100);
    });
    it('return current height when calling height() without parameters', function () {
        expect(this.progressbar.height()).toBe('2px');
    });
    it('set the height when calling height() with parameter', function () {
        this.progressbar.height('5px');
        expect(this.progressbar.height()).toBe('5px');
    });
    it('return current color when calling color() without parameters', function () {
        expect(this.progressbar.color()).toBe('firebrick');
    });
    it('set the color when calling color() with parameter', function () {
        this.progressbar.color('green');
        expect(this.progressbar.color()).toBe('green');
    });
    it('stops at it\'s current progress when calling sotp()', function () {
        // var value, flag;
        this.progressbar.start();

        runs(function () {
            flag = false;
            value = this.progressbar.status();


            setTimeout(function () {
                flag = true;
            }, 200);
        });
        waitsFor(function () {
            value = this.progressbar.status();
            return flag;
        }, "The Value should be incremented", 1000);

        runs(function () {
            this.progressbar.stop();
            expect(value).toBeGreaterThan(10);
            expect(value).toBeLessThan(20);
        });
    });
});