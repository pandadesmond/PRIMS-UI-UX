export default async function (payload) {

    return await payload.app.$store.dispatch(`${payload.dispatch}`, payload).then(() => {

        var data = JSON.parse(JSON.stringify(payload.app.$store.getters[`${payload.getter}`]));
        var status = data.status == "success" ? true : false;

        var return_json = {
            response: data.response,
            status
        };

        return return_json;
    });

}


