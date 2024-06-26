$(document).ready(function () {
    loadData();

    // Fetch countries using API and populate the dropdown list
    $.ajax({
        url: "https://restcountries.com/v3.1/all",
        type: "GET",
        success: function (result) {
            // Sort the countries alphabetically by their common name
            result.sort((a, b) => a.name.common.localeCompare(b.name.common));

            var dropdown = $("#Negara");

            // Loop through the array of countries and populate the dropdown
            $.each(result, function (index, country) {
                dropdown.append($("<option />").val(country.name.common).text(country.name.common));
            });
        },
        error: function (errormessage) {
            Swal.fire('Oops...', errormessage.responseText, 'error');
        }
    });
});

function loadData() {
    $.ajax({
        url: "/Home/List",
        type: "GET",
        contentType: "application/x-www-form-urlencoded; charset=UTF-8",
        dataType: "json",
        success: function (result) {
            var html = '';
            $.each(result, function (key, item) {
                html += '<tr>';
                //html += '<td>' + item.Id + '</td>';
                html += '<td>' + item.Nik + '</td>';
                html += '<td>' + item.NamaLengkap + '</td>';
                html += '<td>' + item.TanggalLahir + '</td>';
                html += '<td>' + item.JenisKelamin + '</td>';
                html += '<td>' + item.Alamat + '</td>';
                html += '<td>' + item.Negara + '</td>';
                html += '<td><a href="#" onclick="return getbyID(' + item.Id + ')">Edit</a> | <a href="#" onclick="return getDetail(' + item.Id + ')">Detail</a> | <a href="#" onclick="Delete(' + item.Id + ')">Delete</a></td>';
                html += '</tr>';
            });
            $('.tbody').html(html);
        },
        error: function (errormessage) {
            Swal.fire('Oops...', errormessage.responseText, 'error');
        }
    });
}

function Add() {

    if (!ValidateData())
        return;

    var idnObj = {
        Nik: $('#Nik').val(),
        NamaLengkap: $('#NamaLengkap').val(),
        TanggalLahir: $('#TanggalLahir').val(),
        JenisKelamin: $('input[name="JenisKelamin"]:checked').val(),
        Alamat: $('#Alamat').val(),
        Negara: $('#Negara').val()
    };

    $.ajax({
        url: "/Home/Add",
        data: JSON.stringify(idnObj),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            loadData();
            $('#myModal').modal('hide');
            Swal.fire('Berhasil!', 'Data Anda berhasil disimpan.', 'success');
        },
        error: function (errormessage) {
            Swal.fire('Oops...', errormessage.responseText, 'error');
        }
    });
}

function ValidateData() {
    var isSuccess = true;
    if ($('#Nik').val() === "") {
        Swal.fire('Oops...', 'NIK tidak boleh kosong', 'error');
        isSuccess = false
        return isSuccess;
    }
    else if ($('#NamaLengkap').val() === "") {
        Swal.fire('Oops...', 'Nama Lengkap tidak boleh kosong', 'error');
        isSuccess = false
        return isSuccess;
    }
    else if ($('#TanggalLahir').val() === "") {
        Swal.fire('Oops...', 'Tanggal Lahir tidak boleh kosong', 'error');
        isSuccess = false
        return isSuccess;
    }
    else if ($('input[name="JenisKelamin"]:checked').val() === "") {
        Swal.fire('Oops...', 'Jenis Kelamin tidak boleh kosong', 'error');
        isSuccess = false
        return isSuccess;
    }
    else if ($('#Alamat').val() === "") {
        Swal.fire('Oops...', 'Alamat tidak boleh kosong', 'error');
        isSuccess = false
        return isSuccess;
    }
    else if ($('#Negara').val() === "") {
        Swal.fire('Oops...', 'Negara tidak boleh kosong', 'error');
        isSuccess = false
        return isSuccess;
    }
    return isSuccess;
}

function getbyID(IdnID) {
    $('#myModalLabel').text("Edit Data");
    $('#NamaLengkap').css('border-color', 'lightgrey');
    $('#TanggalLahir').css('border-color', 'lightgrey');
    $('#JenisKelamin').css('border-color', 'lightgrey');
    $('#Alamat').css('border-color', 'lightgrey');
    $('#Negara').css('border-color', 'lightgrey');

    $('#NamaLengkap').prop('disabled', false);
    $('#TanggalLahir').prop('disabled', false);
    $('#JenisKelamin').prop('disabled', false);
    $('#Alamat').prop('disabled', false);
    $('#Negara').prop('disabled', false);
    $('#Nik').prop('disabled', false);
    $('input:radio[value=Laki-Laki]').prop('disabled', false);
    $('input:radio[value=Perempuan]').prop('disabled', false);

    $.ajax({
        url: "/Home/getbyID/" + IdnID,
        type: "GET",
        contentType: "application/x-www-form-urlencoded; charset=UTF-8",
        dataType: "json",
        success: function (result) {
            $('#Id').val(IdnID);
            $('#Nik').val(result.Nik);
            $('#NamaLengkap').val(result.NamaLengkap);
            $('#TanggalLahir').val(result.TanggalLahir.split('-').reverse().join('-'));
            if (result.JenisKelamin == "Laki-Laki") {
                $('input:radio[value=Laki-Laki]').prop('checked', true);
            }
            else {
                $('input:radio[value=Perempuan]').prop('checked', true);
            }
            $('#Alamat').val(result.Alamat);
            $('#Negara').val(result.Negara);

            $('#myModal').modal('show');
            $('#btnUpdate').show();
            $('#btnAdd').hide();
        },
        error: function (errormessage) {
            Swal.fire('Oops...', errormessage.responseText, 'error');
        }
    });
    return false;
}

function getDetail(IdnID) {
    $('#myModalLabel').text("Detail Data");
    $('#NamaLengkap').prop('disabled', true);
    $('#TanggalLahir').prop('disabled', true);
    $('#JenisKelamin').prop('disabled', true);
    $('#Alamat').prop('disabled', true);
    $('#Negara').prop('disabled', true);
    $('#Nik').prop('disabled', true);
    $('input:radio[value=Laki-Laki]').prop('disabled', true);
    $('input:radio[value=Perempuan]').prop('disabled', true);
    $.ajax({
        url: "/Home/getbyID/" + IdnID,
        type: "GET",
        contentType: "application/x-www-form-urlencoded; charset=UTF-8",
        dataType: "json",
        success: function (result) {
            $('#Id').val(IdnID);
            $('#Nik').val(result.Nik);
            $('#NamaLengkap').val(result.NamaLengkap);
            $('#TanggalLahir').val(result.TanggalLahir.split('-').reverse().join('-'));
            if (result.JenisKelamin == "Laki-Laki") {
                $('input:radio[value=Laki-Laki]').prop('checked', true);
            }
            else {
                $('input:radio[value=Perempuan]').prop('checked', true);
            }
            $('#Alamat').val(result.Alamat);
            $('#Negara').val(result.Negara);

            $('#myModal').modal('show');
            $('#btnAdd').hide();
            $('#btnUpdate').hide();
        },
        error: function (errormessage) {
            Swal.fire('Oops...', errormessage.responseText, 'error');
        }
    });
    return false;
}

function searchData() {
    var nik = $('#cariNik').val() === "" ? 0 : $('#cariNik').val();
    var nama = $('#cariNama').val();
    if (nik == 0 && nama === "") {
        Swal.fire('Oops...', 'NIK dan Nama tidak boleh kosong', 'warning');
        return;
    }

    var idnObj = {
        'nik': nik,
        'nama': nama
    };

    $.ajax({
        url: "/Home/Search",
        type: "GET",
        data: idnObj,
        contentType: "application/x-www-form-urlencoded; charset=UTF-8",
        dataType: "json",
        success: function (result) {
            var html = '';
            $.each(result, function (key, item) {
                html += '<tr>';
                //html += '<td>' + item.Id + '</td>';
                html += '<td>' + item.Nik + '</td>';
                html += '<td>' + item.NamaLengkap + '</td>';
                html += '<td>' + item.TanggalLahir + '</td>';
                html += '<td>' + item.JenisKelamin + '</td>';
                html += '<td>' + item.Alamat + '</td>';
                html += '<td>' + item.Negara + '</td>';
                html += '<td><a href="#" onclick="return getbyID(' + item.Id + ')">Edit</a> | <a href="#" onclick="Delete(' + item.Id + ')">Delete</a></td>';
                html += '</tr>';
            });
            $('.tbody').html(html);
            if (html === "") {
                Swal.fire('Oops...', 'Data tidak ditemukan', 'warning');
                clearSearch();
            }
            else {
                Swal.fire('Berhasil!', 'Data ditemukan.', 'success');
                clearSearch();
            }
        },
        error: function (errormessage) {
            Swal.fire('Oops...', errormessage.responseText, 'error');
        }
    });
}

function Update() {
    if (!ValidateData())
        return;

    var idnObj = {
        'Id': $('#Id').val(),
        'Nik': $('#Nik').val(),
        'NamaLengkap': $('#NamaLengkap').val(),
        'TanggalLahir': $('#TanggalLahir').val(),
        'JenisKelamin': $('input[name="JenisKelamin"]:checked').val(),
        'Alamat': $('#Alamat').val(),
        'Negara': $('#Negara').val()
    };
    
    $.ajax({
        url: "/Home/Update",
        data: idnObj,
        type: "POST",
        contentType: "application/x-www-form-urlencoded; charset=UTF-8",
        dataType: "json",
        success: function (result) {
            loadData();
            $('#myModal').modal('hide');
            $('#Id').val("");
            $('#Nik').val("");
            $('#NamaLengkap').val("");
            $('#TanggalLahir').val("");
            $('#JenisKelamin').val("");
            $('#Alamat').val("");
            $('#Negara').val("");
            Swal.fire('Berhasil!', 'Data Anda berhasil diupdate.', 'success');
        },
        error: function (errormessage) {
            Swal.fire('Oops...', errormessage.responseText, 'error');
        }
    });
}

function Delete(ID) {
    Swal.fire({
        title: 'Anda yakin menghapus data ini?',
        icon: 'warning',
        confirmButtonText: 'Ya',
        showCancelButton: true,
        cancelButtonText: 'Tidak',
    }).then((result) => {
        if (result['isConfirmed']) {
            $.ajax({
                url: "/Home/Delete/" + ID,
                type: "POST",
                contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                dataType: "json",
                success: function (result) {
                    loadData();
                    Swal.fire('Berhasil!', 'Data Anda berhasil dihapus.', 'success');
                },
                error: function (errormessage) {
                    Swal.fire('Oops...', errormessage.responseText, 'error');
                }
            });
        }
    })
}

function clearTextBox() {
    $('#myModalLabel').text("Add Data");
    $('#Id').val("");
    $('#Nik').val("");
    $('#NamaLengkap').val("");   
    $('#TanggalLahir').val("");
    $('#JenisKelamin').val("");
    $('#Alamat').val("");
    $('#Negara').val("");
    $('#btnUpdate').hide();
    $('#btnAdd').show();
    $('#NamaLengkap').css('border-color', 'lightgrey');
    $('#JenisKelamin').css('border-color', 'lightgrey');
    $('#TanggalLahir').css('border-color', 'lightgrey');
    $('#Alamat').css('border-color', 'lightgrey');
    $('#Negara').css('border-color', 'lightgrey');
}

function clearSearch() {
    $('#cariNik').val("");
    $('#cariNama').val("");
}