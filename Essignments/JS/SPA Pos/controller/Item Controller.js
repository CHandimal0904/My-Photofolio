$("#AddItmSve").click(function () {
    let ItemId = $("#Item-cde").val();
    let ItemNme = $("#Item-Nme").val();
    let ItemPrice = $("#Item-price").val();
    let Itemqty = $("#Item-qty").val();

    var ItemObject = {
        id:ItemId,
        name:ItemNme,
        price:ItemPrice,
        Qty:Itemqty
    }
    items.push(ItemObject);
    loadAll();
    clearAllTexts();
});

$("#viewAllItem").click(function () {
    loadAll();
});
$("#btnItemDlte").click(function () {
    let dlteId = $("#Item-cde").val();
    DeleteItem(dlteId);
})
$("#RenewItem").click(function () {
    let ItemID = $("#Item-cde").val();
    let response = updateItem(ItemID);
    if (response) {
        alert("Item Updated Successfully");
        setTextfieldValues("", "", "", "");
    } else {
        alert("Update Failed..!");

    }
});

function loadAll() {
    $("#ItemTbl").empty();
    for (var item of items){
        var row = "<tr> <td>"+item.id+"</td> <td>"+item.name+"</td> <td>"+item.price+"</td> <td>"+item.Qty+"</td> </tr>"
        $("#ItemTbl").append(row);
    }

}
$("#ItemTbl>tr").click(function () {
    let id = $(this).children(":eq(0)").text();
    let name = $(this).children(":eq(1)").text();
    let price = $(this).children(":eq(2)").text();
    let qty = $(this).children(":eq(3)").text();

    $('#Item-cde').val(id);
    $('#Item-Nme').val(name);
    $('#ItemPrice').val(price);
    $('#Item-qty').val(Qty);
});

$("#Item-cde").on('keydown', function (event) {
    if (event.key == "Enter"){
        $("#Item-Nme").focus();
    }
});
$("#Item-Nme").on('keydown', function (event) {
    if (event.key == "Enter"){
        $("#Item-price").focus();
    }
});
$("#Item-price").on('keydown', function (event) {
    if (event.key == "Enter"){
        $("#Item-qty").focus();
    }
});

$("#Item-cde").focus();
const ItemcdeRegEx = /^(I00-)[0-9]{1,3}$/;
const ItemNmeRegEx = /^[A-z]{5,15}$/;
const ItempriceRegEx = /^[0-9/. ,]{3,}$/;
const ItemqtyRegEx =/[0-9]{1,}$/;

let ItemValidation = [];
cusValidation.push({reg:ItemcdeRegEx, filed:$('#Item-cde'),error:'Enter Correct Item Id Pattern : I00-001'});
cusValidation.push({reg:ItemNmeRegEx, filed:$('#Item-Nme'),error:'Enter Correct Item Name Pattern : Biscuit'});
cusValidation.push({reg:ItempriceRegEx, filed:$('#Item-price'),error:'Enter Correct Item prices Pattern :200.00'});
cusValidation.push({reg:ItemqtyRegEx, filed:$('#Item-qty'),error:'Enter Correct Item Qty Pattern : 1'});

$("#Item-cde,#Item-Nme,#Item-price,#Item-qty").on('keydown',function (event) {
    checkValidity();
});
$("Item-cde,#Item-Nme,#Item-price,#Item-qty").on('keyup',function (event) {
    checkValidity();
});
$("Item-cde,#Item-Nme,#Item-price,#Item-qty").on('blur',function (event) {
    checkValidity();
});
$("#Item-cde").on('keydown',function (event) {
    if (event.key =="Enter" && check(ItemcdeRegEx,$("#Item-cde"))){
        $("#Item-Nme").focus();
    }else {
        focusText($("#Item-cde"))
    }
});
$("#Item-Nme").on('keydown', function (event) {
    if (event.key == "Enter" && check(ItemNmeRegEx, $("#Item-Nme"))) {
        focusText($("#Item-price"));
    }
});
$("#Item-price").on('keydown', function (event) {
    if (event.key == "Enter" && check(ItempriceRegEx, $("#Item-price"))) {
        focusText($("#Item-qty"));
    }
});
$("#Item-qty").on('keydown', function (event) {
    if (event.key == "Enter" && check(ItemqtyRegEx, $("#Item-qty"))) {
        let res = confirm("Do you want to add this Item ?");
        if (res) {
            clearAllTexts();
        }
    }
});


function checkValidity() {
    let errorCount=0;
    for (let validation of ItemValidation) {
        if (check(validation.reg,validation.filed)){
            textSuccess(validation.filed,"");
        }else {
            errorCount=errorCount+1;
            setTextError(validation.filed,validation.error);
        }
    }
    setButtonState(errorCount);
}
function check(regex, txtField) {
    let inputValue = txtField.val();
    return regex.test(inputValue) ? true : false;
}
function setTextError(txtField,error) {
    if (txtField.val().length <= 0) {
        defaultText(txtField,"");
    } else {
        txtField.css('border', '2px solid red');
        txtField.parent().children('span').text(error);
    }
}

function textSuccess(txtField,error) {
    if (txtField.val().length <= 0) {
        defaultText(txtField,"");
    } else {
        txtField.css('border', '2px solid green');
        txtField.parent().children('span').text(error);
    }
}

function defaultText(txtField,error) {
    txtField.css("border", "1px solid #ced4da");
    txtField.parent().children('span').text(error);
}

function focusText(txtField) {
    txtField.focus();
}

function setButtonState(value){
    if (value>0){
        $("#AddItmSve").attr('disabled',true);
    }else{
        $("#AddItmSve").attr('disabled',false);
    }
}

function clearAllTexts() {
    $("#Item-cde").focus();
    $("#Item-cde,#Item-Nme,#Item-price,#Item-qty").val("");
    checkValidity();
}


$("#Item-cde").on('keydown', function (event) {
    if (event.code == "Enter") {
        let srchId = $("#Item-cde").val();
        let item = searchItem(srchId)
        if (item !=null){
            $("#Item-cde").val(item.id);
            $("#Item-Nme").val(item.name);
            $("#Item-price").val(item.price);
            $("#Item-qty").val(item.Qty);
        }else {
            alert("Can t find given Id");
        }

    }
})

function searchItem(itemID) {
    for (let item of items) {
        if(item.id == itemID){
            return item;
        }
    }
    return null;
}
function DeleteItem(itemId) {
    let item = searchItem(itemId);
    if (item !=null){
        let indexNumber = items.indexOf(item);
        items.splice(indexNumber,1);
        loadAll();
    }
}
function updateItem(itemId) {
    let item = searchItem(itemId);
    if (item != null) {
        item.id = $("#Item-cde").val();
        item.name = $("#Item-Nme").val();
        item.price = $("#Item-price").val();
        item.Qty = $("#Item-qty").val();
        loadAll();
        return true;
    } else {
        return false;
    }

}
function setTextfieldValues(id, name, price, Qty) {
    $("#Item-cde").val(id);
    $("#Item-Nme").val(name);
    $("#Item-price").val(price);
    $("#Item-qty").val(Qty);
}
