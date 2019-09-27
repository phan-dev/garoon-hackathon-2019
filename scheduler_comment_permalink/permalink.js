garoon.events.on("schedule.event.detail.show", function (event) {
    //template
    var link_button_tpl = `
    <span class="action_button_base_grn">
        <button type="button" class="action_base_grn button_style_off_grn permalink_button">
        <span class="icon_link_2_mm_grn_kit icon_inline_mm_grn" style="width: 20px; height: 20px;"></span>
        Permalink
        </button>
        <span class="status_copied" style="display:none">Copied!</span>
    </span>`;

    var link_input_tpl = `
    <input type="textbox" readonly="readonly" style="opacity: 0">`;

    //show permalink
    jQuery(".contents_area").each(function () {
        var comment_id = jQuery(this).attr("id")

        var link_button = jQuery(link_button_tpl);
        link_button.find(".permalink_button").attr("id", "button_" + comment_id);
        jQuery(this).append(link_button);

        var url_obj = grn.component.url.parse(location.href);
        var url_qs = grn.component.url.parseQueryString(location.href);
        url_qs.thread_comment = comment_id.substring(15);
        var url_string = grn.component.url.setParameters(url_obj.pathname, url_qs);

        var link_input = jQuery(link_input_tpl);
        link_input.attr("id", "url_" + comment_id);
        link_input.val(url_string);
        jQuery(this).append(link_input);
    });

    //bind event
    jQuery(".permalink_button").on("click", function () {
        var comment_id = jQuery(this).attr("id").substring(7);

        var copyText = document.getElementById("url_" + comment_id);
        copyText.select();
        copyText.setSelectionRange(0, 99999); //for mobile
        document.execCommand("copy");

        //display feedback
        jQuery(".status_copied").hide();
        jQuery(this).next().show();

    })

    //highlight comment
    var urL_qs = grn.component.url.parseQueryString(location.href);
    if (urL_qs.thread_comment !== "") {
        jQuery("#thread_comment_" + urL_qs.thread_comment).addClass("comment_highlight");
    }

    //scroll to the highlighted comment
    setTimeout(function () {
        var offset = jQuery("#thread_comment_" + urL_qs.thread_comment).offset();
        if (typeof offset !== "undefined") {
            var top = offset.top;
            top = top - 48 - 10;
            window.scrollTo(0, top);
        }
    }, 1000);
});