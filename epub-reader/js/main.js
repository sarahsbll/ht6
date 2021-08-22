$(function () {

    // Default settings: font size, theme, and view
    var font_size = 125;
    var themes = [];
    var current_theme;
    //var toc = {};

    let handler = TreineticEpubReader.handler();

    themes = handler.getAvailableThemes().filter((t) => {
        return t.id != 'author-theme';
    });

    handler.registerEvent("onEpubLoadSuccess", () => {

        var settings = handler.getCurrentReaderSettings();
        font_size = settings.fontSize;
        current_theme = settings.theme == 'author-theme' ? 'default-theme' : settings.theme;
        isHorizontalScroll = (settings.scroll == "auto") && (settings.syntheticSpread == "auto");

        if (isHorizontalScroll) {
            $("#reading-area").addClass("reading-area-margin");
        } else {
            $("#reading-area").removeClass("reading-area-margin");
        }


        setViewFontSize(font_size);
        setViewTheme(current_theme);
        setViewType(isHorizontalScroll ? "h" : "v");
        TreineticEpubReader.handler().setTheme(current_theme);
    });

    handler.registerEvent("onEpubLoadFail", () => {

    });

    handler.registerEvent("onTOCLoaded", (hasTOC) => {
        if (hasTOC) {
            var toc = handler.getTOCJson();
            console.log("hello");
            $('.drawer-section').empty();
            $('.drawer-section').append($(crateOL_Recursively(JSON.parse(toc))));
        }
    });

    handler.registerEvent("onReaderHeightRequest", () => {
        return "100%";
    });


    setViewFontSize(font_size);
    setTheams(themes);
    setViewType("h");

    // Upload epub file
    var config = TreineticEpubReader.config();
    config.jsLibRoot = "assets/workers/";
    config.loader = "one"
    TreineticEpubReader.create("#epub-reader-frame");
    // This is where you specify the url to the epub file
    TreineticEpubReader.open("assets/epub/alice.epub");

    // Configure font size 
    /*
    $(".increase-font-size").on("click", function () {
        var ext = TreineticEpubReader.handler();
        var range = ext.getRecommendedFontSizeRange();
        var current = ext.getCurrentReaderSettings().fontSize;
        if (current + 5 <= range.max) {
            font_size = current + 5;
            ext.changeFontSize(font_size);
            setViewFontSize(font_size);
        }
    });

    $(".decrease-font-size").on("click", function () {
        var ext = TreineticEpubReader.handler();
        var range = ext.getRecommendedFontSizeRange();
        var current = ext.getCurrentReaderSettings().fontSize;
        if (range.min <= current - 5) {
            font_size = current - 5;
            ext.changeFontSize(font_size);
            setViewFontSize(font_size);
        }
    }); */


    // Configure theme 
    $("body").on("click", ".theme-color-block", function () {
        var id = $(this).data("theme-id");
        setViewTheme(id);
        TreineticEpubReader.handler().setTheme(id);
    });


    // Configure theme
    $(".vertical-view").on("click", function () {
        setViewType("v");
        $("#reading-area").removeClass("reading-area-margin");
        setTimeout(() => {
            let ext = TreineticEpubReader.handler();
            ext.setScrollOption("scroll-continuous");
            ext.setDisplayFormat("single");
        }, 500);
    });


    // Configure page navigation
    $(".prev-button").on("click", function () {
        $(".pre-next-wrapper").removeClass("noPreview");
        $(".pre-next-wrapper").removeClass("noNext");
        let etc = TreineticEpubReader.handler();
        if (etc.hasPrevPage()) {
            etc.prevPage();
            if (!etc.hasPrevPage()) {
                $(".pre-next-wrapper").addClass("noPreview");
            }
        } else {
            $(".pre-next-wrapper").addClass("noPreview");
        }
    });

    $(".next-button").on("click", function () {
        $(".pre-next-wrapper").removeClass("noPreview");
        $(".pre-next-wrapper").removeClass("noNext");
        let etc = TreineticEpubReader.handler();
        if (etc.hasNextPage()) {
            etc.nextPage();
            // META DATA 
            //prevObject[0].childNodes[0].textContent
            //console.log(etc.metadata);


            console.log("Next page loaded");
            // If next page is a new chapter


            // PAGE COUNTER 
            var pageCounter = etc.reader.getPaginationInfo().openPages[0].spineItemPageIndex;
            console.log(pageCounter);

            const modalCont = document.getElementById('modalContainer');
            const modalClose = document.getElementById('close');
            const qrCode = document.getElementById('qr');

            if (pageCounter == 8) { // or 13 pg
                // Show reward Alice Drinks QR Code:  https://storage.echoar.xyz/wispy-violet-4999/cbd63dcb-23e8-43c1-ade1-7bd08bf8328e

                qrCode.setAttribute("src", "https://storage.echoar.xyz/wispy-violet-4999/cbd63dcb-23e8-43c1-ade1-7bd08bf8328e");
                modalCont.classList.add('show');
                modalClose.addEventListener('click', () => {
                    modalCont.classList.remove('show');

                });

            }
            if (pageCounter == 14) { //14 in 1920 or 20 pg
                // Show reward Lego Street Fighter White Rabbit: https://storage.echoar.xyz/wispy-violet-4999/d5bc0ca4-a48d-463e-b5be-dfaa1547f329
                qrCode.setAttribute("src", "https://storage.echoar.xyz/wispy-violet-4999/d5bc0ca4-a48d-463e-b5be-dfaa1547f329");
                modalCont.classList.add('show');
                modalClose.addEventListener('click', () => {
                    modalCont.classList.remove('show');

                });
            }
            if (pageCounter == 20) {
                // Show reward pop-up
                alert(3);
            }

            if (!etc.hasNextPage()) {
                $(".pre-next-wrapper").addClass("noNext");
            }
        } else {
            $(".pre-next-wrapper").addClass("noNext");
        }

        /*
        handler.registerEvent("onTOCLoaded", (hasTOC) => {
        if (hasTOC) {
            var toc = handler.getTOCJson();
            $('.drawer-section').empty();
            $('.drawer-section').append($(crateOL_Recursively(JSON.parse(toc))));
        }
        });

        function crateOL_Recursively(json) {
        var string = "<ol class='toc-ol'>";
        json.some(function (item) {
            string += `<li><a class="toc-item" data-link="${item.Id_link}">${item.name}</a>`;
            if (item.sub.length > 0) {
                string += crateOL_Recursively(item.sub);
            }
            string += "</li>";
        });
        return string + "</ol>";
    }
        */

    });

    // Configure table of contents 
    $(".drawer-backdrop").on("click", function () {
        toggleDrawer();
    });

    $("body").on("click", ".toc-item", function () {
        var link = $(this).data("link");
        let etc = TreineticEpubReader.handler();
        etc.goToPage(link)
        setTimeout(function () {
            $(".drawer-backdrop").hide();
        }, 500);
        $(".drawer-section").removeClass("drawer-section-show");
    })

    function crateOL_Recursively(json) {
        var string = "<ol class='toc-ol'>";
        json.some(function (item) {
            string += `<li><a class="toc-item" data-link="${item.Id_link}">${item.name}</a>`;
            if (item.sub.length > 0) {
                string += crateOL_Recursively(item.sub);
            }
            string += "</li>";
        });
        return string + "</ol>";
    }


    // Setters for configuration
    function setViewFontSize(size) {
        $(".font-size-view").html(size + "%");
    }

    function setViewType(type) {
        console.log("view type..... " + type)
        $(".horizontal-view").removeClass("sc-selected");
        $(".vertical-view").removeClass("sc-selected");
        if (type == "h") {
            $(".horizontal-view").addClass("sc-selected")
            $(".page-controls").addClass("page-controls-visible");
        } else if (type == "v") {
            $(".page-controls").removeClass("page-controls-visible");
            $(".vertical-view").addClass("sc-selected")
        }
    }

    function setViewTheme(id) {
        if (id == "night-theme") {
            $(".page-controls").addClass("night-mode-rest")
            $(".nav-design").addClass("night-mode-rest")
        } else {
            $(".page-controls").removeClass("night-mode-rest")
            $(".nav-design").removeClass("night-mode-rest")
        }
        $(".theme-color-block").removeClass("th-selected");
        $(".theme-color-block[data-theme-id='" + id + "']").addClass("th-selected");
        current_theme = id;
    }

    function setTheams(themearray) {
        themearray.some(function (theme) {
            $(".theme-buttons-section").append('<div class="theme-color-block ' + theme.id + '"  data-theme-id="' + theme.id + '"></div>');
        });
    }

});
