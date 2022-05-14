function handle_message(result){
    if (!result){
        return;
    }
    if (result.success) {
        toastr.success(result.message)
    }else{
        toastr.error(result.message)
    }
}