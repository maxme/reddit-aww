/*!
 * jQuery Mobile Carousel
 * Source: https://github.com/blackdynamo/jQuery-Mobile-Carousel
 * This fork: https://github.com/aminariana/jQuery-Mobile-Carousel
 * Demo: http://jsfiddle.net/blackdynamo/yxhzU/
 * Blog: http://developingwithstyle.blogspot.com
 *
 * Copyright 2010, Donnovan Lewis
 * Edits: Benjamin Gleitzman (gleitz@mit.edu)
 * Edits: Amin Ariana (amin@aminariana.com) May 2012
 * Licensed under the MIT
 */

(function ($) {

    $.fn.carousel = function (options) {
        var settings = {
            duration:300,
            minimumDrag:20,
            beforeStart:function () {
            },
            afterStart:function () {
            },
            beforeStop:function () {
            },
            afterStop:function () {
            }
        };

        $.extend(settings, options || {});

        return this.each(function () {
            if (this.tagName.toLowerCase() != "ul") return;

            var originalList = $(this);
            var pages = originalList.children();
            var currentPageAttr = "data-page";
            var container = $("<div>")
                .attr("id", "_carousel_rendered")
                .css({
                    position:"relative",
                    overflow:"hidden",
                    width:"100%"
                });
            var list = $("<ul>")
                .attr("data-pages", pages.length)
                .attr(currentPageAttr, 1)
                .css({
                    float:"left",
                    position:"relative",
                    padding:"0",
                    margin:"0",
                    listStyle:"none",
                    width:pages.length * 100 + "%"
                });
            var currentPage = 1, start, stop;

            $.each(pages, function (i) {
                $("<li>")
                    .css({float:"left", width:originalList.parent().width() + "px" })
                    .html($(this).html())
                    .appendTo(list);
            });

            list.draggable({
                axis:"x",
                start:function (event) {
                    settings.beforeStart.apply(list, arguments);

                    var data = event.originalEvent.touches ? event.originalEvent.touches[0] : event.originalEvent;
                    start = {
                        coords:[ data.pageX, data.pageY ]
                    };

                    settings.afterStart.apply(list, arguments);
                },
                stop:function (event) {
                    settings.beforeStop.apply(list, arguments);

                    var data = event.originalEvent.touches ? event.originalEvent.touches[0] : event.originalEvent;
                    stop = {
                        coords:[ data.pageX, data.pageY ]
                    };
                    start.coords[0] > stop.coords[0] ? tryPagingLeft() : tryPagingRight();
                    animateToPage(currentPage);

                    settings.afterStop.apply(list, arguments);
                }
            });

            function getPageLeft(page) {
                return -1 * list.parent().width() * (page - 1);
            }

            function animateToPage(page) {
                list
                    .attr(currentPageAttr, page)
                    .stop()
                    .animate({ left:getPageLeft(currentPage)}, settings.duration);
            }

            function tryPagingLeft() {
                if (currentPage !== pages.length && isDragIntended())
                    currentPage++;
            }

            function tryPagingRight() {
                if (currentPage !== 1 && isDragIntended())
                    currentPage--;
            }

            function isDragIntended() {
                return dragDelta() >= settings.minimumDrag;
            }

            function dragDelta() {
                return Math.abs(start.coords[0] - stop.coords[0]);
            }

            // Scroll back to the correct item if browser size or mobile orientation changes.
            $(window).resize(function () {
                list.children().css({width:list.parent().width() })
                animateToPage(currentPage);
            });

            container.append(list);

            originalList.replaceWith(container);
        });
    };
})(jQuery);