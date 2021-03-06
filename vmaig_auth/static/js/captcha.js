$(function () {
	window.Captcha = {
	    update: function(img_obj, captcha) {
		img_obj.parent().children("input[name=captcha_0]").val(captcha.key);
		img_obj.parent().children("input[name=captcha_1]").val('');
		img_obj.parent().children("img.captcha").attr('src', captcha.image_url);
	    },
	    get: function(img_obj) {
		var captcha = {}
		captcha['captcha_0'] = img_obj.parent().find("#id_captcha_0").val();
		captcha['captcha_1'] = img_obj.parent().find("#id_captcha_1").val();
		return captcha;
	    },
	    refresh: function(img_obj) {
		var ok = false;
		$.ajax({
			type: "POST",
			url: "/captcha/refresh/",
			beforeSend:function(xhr){
			    xhr.setRequestHeader("X-CSRFToken", $.cookie('csrftoken'));  
			},
			async: false,
			dataType: "json",
			success: function(captcha) {
			    Captcha.update(img_obj, captcha);
			    ok = captcha.key && captcha.image_url;
			},
			error: function(result) {
			    result['msg'] = '服务出错';
			}
		    });
		return ok;
	    }    
	}

	$("img.captcha").each(function() {
		$(this).click(function() {
			Captcha.refresh($(this));
		    });
		Captcha.refresh($(this));
	    });
});

