
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
    $("#contact-form").submit(function (e)
    {
        e.preventDefault();
        e.stopPropagation();
        alert("Please enter")
    })
}