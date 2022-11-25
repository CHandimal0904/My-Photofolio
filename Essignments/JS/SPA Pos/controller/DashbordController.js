$("#hme").click(function () {
    $("#customer").css('display','none');
    $("#item").css('display','none');
    $("#invoice").css('display','none');
    $("#hdr").css('display','flex');

});
$("#Cus").click(function () {
    $("#hdr").css('display','none');
    $("#customer").css('display','block');
    $("#item").css('display','none');
    $("#invoice").css('display','none');
});

$("#Itm").click(function () {
    $("#customer").css('display','none');
    $("#item").css('display','block');
    $("#invoice").css('display','none');
    $("#hdr").css('display','none');
});

$("#invice").click(function () {
    $("#customer").css('display','none');
    $("#item").css('display','none');
    $("#invoice").css('display','block');
    $("#hdr").css('display','none');
});
