

$("#AddCusSve").click(function () {
    let CusId = $("#Cus-ID").val();
    let CusNme = $("#Cus-Nme").val();
    let CusAdd = $("#Cus-add").val();
    let CusCnt = $("#Cus-cntct").val();

    var customerObject = {
        id:CusId,
        name:CusNme,
        Address:CusAdd,
        Contact:CusCnt
    }
    customers.push(customerObject);
    loadAll();
    clearAllTexts();
});

$("#btnviewAll").click(function () {
    loadAll();
});
$("#btnDlte").click(function () {
    let dlteId = $("#Cus-ID").val();
    DeleteCustomer(dlteId);
})
$("#Renew").click(function () {
    let customerID = $("#Cus-ID").val();
    let response = updateCustomer(customerID);
    if (response) {
        alert("Customer Updated Successfully");
        setTextfieldValues("", "", "", "");
    } else {
        alert("Update Failed..!");

    }
});

function loadAll() {
    $("#cusTbl").empty();
    for (var customer of customers){
        var row = "<tr> <td>"+customer.id+"</td> <td>"+customer.name+"</td> <td>"+customer.Address+"</td> <td>"+customer.Contact+"</td> </tr>"
        $("#cusTbl").append(row);
    }

}
$("#cusTbl>tr").click(function () {
    let id = $(this).children(":eq(0)").text();
    let name = $(this).children(":eq(1)").text();
    let Address = $(this).children(":eq(2)").text();
    let contact = $(this).children(":eq(3)").text();

    $('#Cus-ID').val(id);
    $('#Cus-Nme').val(name);
    $('#Cus-add').val(Address);
    $('#Cus-cntct').val(contact);
});

$("#Cus-ID").on('keydown', function (event) {
    if (event.key == "Enter"){
        $("#Cus-Nme").focus();
    }
});
$("#Cus-Nme").on('keydown', function (event) {
    if (event.key == "Enter"){
        $("#Cus-add").focus();
    }
});
$("#Cus-add").on('keydown', function (event) {
    if (event.key == "Enter"){
        $("#Cus-cntct").focus();
    }
});

$("#Cus-ID").focus();
const CusIDRegEx = /^(C00-)[0-9]{1,3}$/;
const CusNmeRegEx = /^[A-z]{5,15}$/;
const CusAddRegEx = /^[0-9/A-z. ,]{7,}$/;
const cusCntctRegEx =/[0-9+]{10,15}$/;

let cusValidation = [];
cusValidation.push({reg:CusIDRegEx, filed:$('#Cus-ID'),error:'Enter Correct Custemer Id Pattern : C00-001'});
cusValidation.push({reg:CusNmeRegEx, filed:$('#Cus-Nme'),error:'Enter Correct Custemer Name Pattern : Pradeep kumara'});
cusValidation.push({reg:CusAddRegEx, filed:$('#Cus-add'),error:'Enter Correct Custemer Address Pattern : No 32,Kaluthara Rd,Mathugama'});
cusValidation.push({reg:cusCntctRegEx, filed:$('#Cus-cntct'),error:'Enter Correct Custemer contact Pattern : 0342244144'});

$("#Cus-ID,#Cus-Nme,#Cus-add,#Cus-cntct").on('keydown',function (event) {
    checkValidity();
});
$("#Cus-ID,#Cus-Nme,#Cus-add,#Cus-cntct").on('keyup',function (event) {
    checkValidity();
});
$("#Cus-ID,#Cus-Nme,#Cus-add,#Cus-cntct").on('blur',function (event) {
    checkValidity();
});
$("#Cus-ID").on('keydown',function (event) {
    if (event.key =="Enter" && check(CusIDRegEx,$("#Cus-ID"))){
        $("#Cus-Nme").focus();
    }else {
        focusText($("#Cus-ID"))
    }
});
$("#Cus-Nme").on('keydown', function (event) {
    if (event.key == "Enter" && check(CusNmeRegEx, $("#Cus-Nme"))) {
        focusText($("#Cus-add"));
    }
});
$("#Cus-add").on('keydown', function (event) {
    if (event.key == "Enter" && check(CusAddRegEx, $("#Cus-add"))) {
        focusText($("#Cus-cntct"));
    }
});
$("#Cus-cntct").on('keydown', function (event) {
    if (event.key == "Enter" && check(cusCntctRegEx, $("#Cus-cntct"))) {
        let res = confirm("Do you want to add this customer.?");
        if (res) {
            clearAllTexts();
        }
    }
});


function checkValidity() {
    let errorCount=0;
    for (let validation of cusValidation) {
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
        $("#AddCusSve").attr('disabled',true);
    }else{
        $("#AddCusSve").attr('disabled',false);
    }
}

function clearAllTexts() {
    $("#Cus-ID").focus();
    $("#Cus-ID,#Cus-Nme,#Cus-add,#Cus-cntct").val("");
    checkValidity();
}


$("#Cus-ID").on('keydown', function (event) {
    if (event.code == "Enter") {
        let srchId = $("#Cus-ID").val();
        let customer = searchCustomer(srchId)
        if (customer !=null){
            $("#Cus-ID").val(customer.id);
            $("#Cus-Nme").val(customer.name);
            $("#Cus-add").val(customer.Address);
            $("#Cus-cntct").val(customer.Contact);
        }else {
            alert("Can t find given Id");
        }

    }
})

function searchCustomer(cusID) {
    for (let customer of customers) {
        if(customer.id == cusID){
            return customer;
        }
    }
    return null;
}
function DeleteCustomer(CusId) {
    let customer = searchCustomer(CusId);
    if (customer !=null){
        let indexNumber = customers.indexOf(customer);
        customers.splice(indexNumber,1);
        loadAll();
    }
}
function updateCustomer(customerID) {
    let customer = searchCustomer(customerID);
    if (customer != null) {
        customer.id = $("#Cus-ID").val();
        customer.name = $("#Cus-Nme").val();
        customer.address = $("#Cus-add").val();
        customer.salary = $("#Cus-cntct").val();
        loadAll();
        return true;
    } else {
        return false;
    }

}
function setTextfieldValues(id, name, Address, Contact) {
    $("#Cus-ID").val(id);
    $("#Cus-Nme").val(name);
    $("#Cus-add").val(Address);
    $("#Cus-cntct").val(Contact);
}
