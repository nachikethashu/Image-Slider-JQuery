(function( $ ) {

    $.fn.imageSlider = function(data) {
        var elem = this;
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
            padding: '4% 3%',
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

        for (var i = 0; i < data.length; i++) {
            ul.append($("<li/>").css({
                'background-image': 'url(' + data[i].src + ')',
                'background-repeat': 'no-repeat',
                'background-size': 'contain',
                'background-position': 'center'
            }).append($('<footer/>').text(data[i].title).css({
                position: 'absolute',
                bottom: '0',
                'text-align': 'center',
                width: '100%',
                padding: '5px 0',
                'background-color': 'rgba(85, 86, 86, 0.4)',
                'font-weight': 'bold'
            })));
        }

        ul.appendTo(this);
        this.find("li").css({
            position: 'relative',
            display: 'block',
            'float': 'left',
            width: this.width(),
            height: this.height()
        });

        var slideCount = this.find('ul li').length;
        var slideWidth = this.width();
        var slideHeight = this.height();
        var sliderUlWidth = slideCount * slideWidth;

        this.css({ width: slideWidth, height: slideHeight });

        this.children("ul").css({ width: sliderUlWidth, marginLeft: -slideWidth});

        elem.find('ul li:last-child').prependTo($('ul'));

        function moveLeft() {
            elem.find('ul').animate({
                left: + slideWidth
            }, 200, function () {
                elem.find('ul li:last-child').prependTo(elem.find('ul'));
                elem.find('ul').css('left', '');
            });
        }

        function moveRight() {
            elem.find('ul').animate({
                left: - slideWidth
            }, 200, function () {
                elem.find('ul li:first-child').appendTo(elem.find('ul'));
                elem.find('ul').css('left', '');
            });
        }

        $('a.left-arrow').click(function () {
            moveLeft();
        });

        $('a.right-arrow').click(function () {
            moveRight();
        });

        return this;
    };

}( jQuery ));