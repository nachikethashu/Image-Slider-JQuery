/**
 * imageSlider.jquery.js
 *
 * By Nachiketha S H Upadhya
 * https://github.com/nachikethashu/Image-Slider-JQuery
 *
 * Free to use under the MIT license.
 *
 * Aug 2015
 */

(function( $ ) {

    $.fn.imageSlider = function(data, options) {

        if (!data || !data.length) {
            console.error('imageSlider: Invalid data OR Empty data input');
            return this;
        }

        var settings = $.extend({
            showBullets: false,
            startIndex: 1
        }, options);

        var elem = this, slideWidth, slideHeight, ulElem,
            singleImgFlag = (data.length <= 1)? true: false;

        this.setActiveBulletStyles = function (classDef) {
            this.activeBulletClass = classDef;
            _injectClasses('.activeBullet {' + classDef + '}');
        };

        this.activeBulletClass = 'border: 2px solid silver; width: 12px; height: 12px; box-shadow: 0px 2px 4px rgba(0,0,0,0.5);';
        this.setActiveBulletStyles(this.activeBulletClass);

        this.css({
            position: 'relative',
            overflow: 'hidden'
        });

        var leftArrow = $("<a/>", {class: "left-arrow"}).text("<<").css({'border-radius': '0 2px 2px 0'});
        var rightArrow = $("<a/>", {class: "right-arrow"}).text(">>").css({'border-radius': '2px 0 0 2px', right: '0'});

        this.append(leftArrow).append(rightArrow);
        this.find('a').css({userSelect: 'none'});

        $("a.left-arrow, a.right-arrow").css({
            position: 'absolute',
            top: '40%',
            'z-index': '999',
            display: 'block',
            padding: '4% 2%',
            width: 'auto',
            height: 'auto',
            background: '#2a2a2a',
            color: '#fff',
            'text-decoration': 'none',
            'font-weight': '600',
            'font-size': '18px',
            opacity: '0.6',
            cursor: 'pointer'
        });

        var ul = $("<ul/>").css({
            position: 'relative',
            margin: '0',
            padding: '0',
            'list-style': 'none'
        });

        _buildSlides(settings.startIndex);

        function _buildSlides(startIndex) {
            var i, len = data.length;
            for (i = startIndex-1; i < len; i++) {
                ul.append(_getSlide(i));
            }
            // append remaining first set of slides
            for (i = 0; i < startIndex-1; i++) {
                ul.append(_getSlide(i));
            }

            ul.appendTo(elem);
            ulElem = elem.find('ul');

            elem.find("li").css({
                position: 'relative',
                display: 'block',
                'float': 'left',
                width: elem.width(),
                height: elem.height()
            });

            slideWidth = elem.width();
            slideHeight = elem.height();

            var slideCount = elem.find('ul li').length,
                sliderUlWidth = slideCount * slideWidth;

            elem.css({ width: slideWidth, height: slideHeight });

            elem.children("ul").css({ width: sliderUlWidth, marginLeft: (singleImgFlag? 0 : -slideWidth)});

            elem.find('ul li:last-child').prependTo(ulElem);
        }

        function _getSlide (index) {
            var li = $("<li/>", { value: index+1 }).css({
                'background-image': 'url(' + data[index].src + ')',
                'background-repeat': 'no-repeat',
                'background-size': 'contain',
                'background-position': 'center'
            }).append($('<footer/>').text(data[index].title).css({
                'position': 'absolute',
                'bottom': '0',
                'text-align': 'center',
                'width': '100%',
                'padding': '5px 0',
                'background-color': 'rgba(85, 86, 86, 0.4)',
                'font-weight': 'bold'
            }));
            return li;
        }

        this.moveLeft = function() {
            var slidedIndex;
            ulElem.animate({
                left: + slideWidth
            }, 200, function () {
                /*jshint -W030 */
                elem.find('ul li:last-child').prependTo(ulElem);
                ulElem.css('left', '');
                slidedIndex = elem.find( "ul li:nth-child(2)" ).val();
                $(elem).trigger("slide", slidedIndex);
                settings.showBullets && _setActiveBullet(slidedIndex);
            });
            return this;
        };

        this.moveRight = function() {
            var slidedIndex;
            ulElem.animate({
                left: - slideWidth
            }, 200, function () {
                /*jshint -W030 */
                elem.find('ul li:first-child').appendTo(ulElem);
                ulElem.css('left', '');
                slidedIndex = elem.find( "ul li:nth-child(2)" ).val();
                $(elem).trigger("slide", slidedIndex);
                settings.showBullets && _setActiveBullet(slidedIndex);
            });
            return this;
        };

        $(this).find('a.left-arrow').click(function () {
            /*jshint -W030 */
            !singleImgFlag && elem.moveLeft();
        });

        $(this).find('a.right-arrow').click(function () {
            /*jshint -W030 */
            !singleImgFlag && elem.moveRight();
        });

        if (settings.showBullets) {
            _addBullets();
        }

        // based on https://css-tricks.com/snippets/javascript/inject-new-css-rules/
        function _injectClasses(rule) {
            var div = $("<div />", {
                html: '&shy;<style>' + rule + '</style>'
            }).appendTo("body");
        }

        function _addBullets() {
            var bulletsHolder=
                $('<div/>', {id: 'bulletsHolder'}).css({
                    position: 'absolute',
                    bottom: '30px',
                    'text-align': 'center',
                    'z-index': '999',
                    width: '100%'
                });
            for (var i = 0; i < data.length; i++) {
                bulletsHolder.append($('<div/>', {value: i+1}).css({
                    'background-color': 'silver',
                    display: 'inline-block',
                    height: '10px',
                    width: '10px',
                    margin: '0 4px 0 4px',
                    'border-radius': '50%'
                }).data('index', i+1));
            }

            elem.append(bulletsHolder);
            _setActiveBullet(settings.startIndex);     // initialise 1st bullet as active
        }

        function _setActiveBullet(slidedIndex) {
            $('#bulletsHolder *').removeClass('activeBullet');
            $('#bulletsHolder').find('div[value=' + slidedIndex + ']').addClass('activeBullet');
        }

        $('#bulletsHolder div').click(function() {
            var index = $(this).data().index;
            ulElem.empty();
            _buildSlides(index);
            _setActiveBullet(index);
        });

        return this;
    };

}( jQuery ));