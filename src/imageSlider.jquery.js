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
            opacity: '0.8',
            cursor: 'pointer'
        });

        var ul = $("<ul/>").css({
            position: 'relative',
            margin: '0',
            padding: '0',
            'list-style': 'none'
        });

        for (var i = data.length - 1; i >= 0; i--) {
            ul.append($("<li/>").append('<img src='+ data[i].src +'>'));
        }

        ul.appendTo(this);
        this.find("li").css({
            position: 'relative',
            display: 'block',
            'float': 'left',
            margin: '0',
            padding: '0',
            background: '#ccc',
            'text-align': 'center',
            'line-height': '300px'
        });

        var slideCount = this.find('ul li').length;
        var slideWidth = this.width();
        var slideHeight = this.height();
        var sliderUlWidth = slideCount * slideWidth;

        this.css({ width: slideWidth, height: slideHeight });

        this.children("ul").css({ width: sliderUlWidth});

        this.find('ul li:last-child').prependTo(this.find('ul'));

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