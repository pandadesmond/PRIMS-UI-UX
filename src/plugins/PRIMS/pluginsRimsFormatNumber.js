export default function (value) {

    var value = value.toString().replaceAll(",", "");

    if((value == '') || (value == '') || (value == null))
    {
        return '';
    }

    if(!isNaN(value))
    {
        var count = value.split(".").length - 1;

        if(count >= 1)
        {
            var value = value;
        }
        else
        {
            var value = parseInt(value).toFixed(2);
        }

        return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    else
    {
        return value;
    }
}