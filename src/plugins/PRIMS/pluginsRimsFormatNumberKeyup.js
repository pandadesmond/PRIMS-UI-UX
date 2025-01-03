export default function (value) {

    var count = value.split(".").length - 1;

    if(count > 1)
    {
        var value = value.substring(0, value.length - 1);
        return value;
    }   

    var value = value.toString().replaceAll(",", "");

    if(!isNaN(value))
    {

        if(value.indexOf('.') > '-1')
        {
            var first_value= value.substr(0, value.indexOf('.'));
            var last_value= value.substr(value.indexOf('.')+1);

            if(last_value.length > 2)
            {

                var first_value= value.substr(0, value.indexOf('.'));
                var last_value= value.substr(value.indexOf('.')+2);

                var first_value = first_value.replaceAll(".","");
                var new_first = value.substr(value.indexOf('.')+1, 1);
                var first_value = first_value+""+new_first;

                var value = first_value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")+"."+last_value;
                // var value = parseFloat(value).toFixed(2);
                // var value = value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            }
            else
            {
                var value = first_value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")+"."+last_value;
            }

        }
        else
        {
            console.log('normal');
            var value = value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        }
       
        return value
        // return parseFloat(value).toLocaleString('en');
        // return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    }
    else
    {
        return value;
    }
    // else
    // {
    //     return amount;
    // }

        // return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}