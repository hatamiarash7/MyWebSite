function showNotification(from, align, type, message) {
    $.notify({
        icon: "tim-icons icon-bell-55",
        message: message

    }, {
        type: type,
        timer: 500,
        placement: {
            from: from,
            align: align
        }
    });
}
