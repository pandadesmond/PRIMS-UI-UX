export default function (content) {

    if(sessionStorage.getItem("set_language_data") != "" && sessionStorage.getItem("set_language_data") != "null" && sessionStorage.getItem("set_language_data") != null)
    {
        var set_language_data = sessionStorage.getItem('set_language_data');
    
        var set_language_data = JSON.parse(set_language_data);
    
        //here is to check custom language didnt set will take ori. Normally ori language is english. Check back from login page.
        if(set_language_data.length <= 0){
            var set_language_data = sessionStorage.getItem('set_language_data_ori');
        
            var set_language_data = JSON.parse(set_language_data);
        }//close checking
    
        var filter_content = set_language_data.filter((entry)=>{
            return entry.content_code == content;
        });
    
        var return_value = filter_content.length > 0 ? filter_content[0].content : '-';
    }
    else
    {
        var return_value = '-';
    }
   

    return return_value;

}
