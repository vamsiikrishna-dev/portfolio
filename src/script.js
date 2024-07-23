
$(window).scroll(function ()
{
    // Code to execute when the user scrolls the window
    showHideNav();
    themeSwitcher();
});



$(document).ready(function ()
{
    handleSubmitForm();

});

function themeSwitcher()
{
    //$("button[theme-vamsi=theme]").click(function (e)
    $("#theme-switcher").click(function (e)
    {
        const theme = $("html").attr('data-theme')
        // alert(theme)
        console.log("event logged")
        if (theme == "dark")
        {
            $("html").attr('data-theme', "light")
        }
        else
        {
            $("html").attr('data-theme', "dark")
        }
        e.stopPropagation();
        e.preventDefault();
    })
}

function showHideNav()
{

    var scrollTop = $(window).scrollTop();
    var scrollLeft = $(window).scrollLeft();
    if (scrollTop > 600)
    {
        $("#nav").removeClass("hidden");
        $("#theme-switcher").off('click')
    }
    else
    {
        $("#nav").addClass("hidden");
    }
}

function handleSubmitForm()
{
    $("#contact-form").submit(async function (e)
    {
        e.preventDefault();
        e.stopPropagation();
        disableButton();


        const title = $("input[name=subject]").val()
        const message = $("textarea[name=body]").val()
        $('#contact-form')[0].reset()

        // console.log(title)

        if (!message || !title || title.trim() == "" || message.trim() == "")
        {

            const text = "oops! some fields are emtpy."
            $("#success-message >i").text(text);
            $("#success-message").css('color', '#ff0000').removeClass('message-hidden');
            enableButton();
            autoHide();
            return;
        }
        // console.log(title)
        // console.log(message)
        const success = await sendData({ title, message });


        if (success)
        {
            const text = 'Thank You, I will get in touch.'
            $("#success-message >i").text(text)
            $("#success-message").css('color', '#67fd67').removeClass('message-hidden');

        }
        enableButton();
        autoHide();


    })
}

function autoHide()
{
    setTimeout(() =>
    {
        $("#success-message").addClass('message-hidden');
    }, 2000);
}
function disableButton()
{
    $("#contact-form").find('button').prop('disabled', true);
    $("#contact-form").find('button').text('Submitting')
}
function enableButton()
{
    $("#contact-form").find('button').prop('disabled', false);
    $("#contact-form").find('button').text('Submit')

}

async function sendData(data)
{
    try
    {
        const api = await fetch(BACKEND_URL + "details", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        if (api.status != 200)
        {
            throw new Error(await api.text());
        }
        const result = await api.text()
        console.log(result)
        return true;
    }
    catch (err)
    {
        console.error(err)
        return false;
    }

}