import axios from 'axios'

export function get_banner_options ({ commit,state }, payload) {
    return axios
        .get('backend_rims/ml_rims_banner/ml_RimsBanner/?customer_guid='+payload+"&limit=9999999999")
        .then((response) => {

            var data = [];

            Object.keys(response.data.results).forEach(function(key) {
                var data_object = {};
                data_object.label = response.data.results[key].concept;
                data_object.value = response.data.results[key].banner_guid;
                data.push(data_object);
            });

            commit('update_banner_list', response.data.results)
            commit('update_banner_options', data)
        })
        .catch((error) => {
            console.log(error);
        })
}


export function trigger_companyprofile ({ commit}, payload) {
    return axios
        .get('mc_companyprofile/mc_Companyprofile/')
        .then((response) => {

            var json = response.data.results[0];

            commit('update_companyprofile', json)

            var json_table_data_companyprofile = response.data.results;

            Object.keys(json_table_data_companyprofile).forEach(function(index, data) {
                json_table_data_companyprofile[index].action = "";
            });

            commit('update_companyprofile_table_data', json_table_data_companyprofile)
        })
        .catch((error) => {
            console.log(error);
        })

}

export function trigger_branch_table_data ({ commit }, payload) {
  return axios
      .get('ml_supcus_branch/ml_SupcusBranch/')
      .then((response) => {
          var json_table_data = response.data.results;
          Object.keys(json_table_data).forEach(function(index, data) {
              json_table_data[index].actions = "";
          });
          commit('update_branch_table_data', json_table_data)
        })
        .catch((error) => {
            console.log(error);
        })

}

export function trigger_dept_table_data ({ commit }, payload) {
  return axios
      .get('mc_set_group_dept/mc_SetGroupDept/')
      .then((response) => {
          var json_table_data = response.data.results;
          Object.keys(json_table_data).forEach(function(index, data) {
              json_table_data[index].actions = "";
          });
          commit('update_dept_table_data', json_table_data)
      })
      .catch((error) => {
          console.log(error);
      })
}

export function trigger_group_table_data ({ commit }, payload) {
  return axios
      .get('mc_set_group/mc_SetGroup/')
      .then((response) => {
          var json_table_data = response.data.results;
          Object.keys(json_table_data).forEach(function(index, data) {
              json_table_data[index].actions = "";
          });
          commit('update_group_table_data', json_table_data)
        })
        .catch((error) => {
            console.log(error);
        })

}


export function trigger_location ({commit}, payload) {
  return axios
      .get('ml_location/ml_Location/')
      .then((response) => {


          var json_table_data = response.data.results;

          Object.keys(json_table_data).forEach(function(index, data) {
              json_table_data[index].action = "";
              //json_data[index].badstock = "No";
          });

          commit('update_location_table_data', json_table_data)

      })
      .catch((error) => {
          console.log(error);
      })
}

export function trigger_locationgroup ({commit}, payload) {
  return axios
      .get('ml_locationgroup/ml_Locationgroup/')
      .then((response) => {

          var json_table_data2 = response.data.results;

          Object.keys(json_table_data2).forEach(function(index, data) {
              json_table_data2[index].action = "";
          });

          commit('update_location_table_data2', json_table_data2)

      })
      .catch((error) => {
          console.log(error);
      })
}

// for supplier
export function trigger_supplier ({ commit }, payload) {
  return axios
      .get('ml_supcus/ml_Supcus/')

      .then((response) => {

          var json = response.data.results[1];

          commit('update_supplier', json)

          var json_table_data_browser = response.data.results;

          Object.keys(json_table_data_browser).forEach(function(index, data) {
              json_table_data_browser[index].action = "";
          });

          commit('update_supplier_table_data_browser', json_table_data_browser)

          var json_table_data_supplier = response.data.results;

          Object.keys(json_table_data_supplier).forEach(function(index, data) {
              json_table_data_supplier[index].action = "";
          });

          commit('update_supplier_table_data', json_table_data_supplier)

          var json_table_search_data = response.data.results;

          Object.keys(json_table_search_data).forEach(function(index, data) {
              json_table_data[index].action = "";
          });

          commit('update_supplier_search_table_data', json_table_search_data)
        })

          .catch((error) => {
            console.log(error);
        })

}

export function trigger_system_user ({commit}, payload) {
  return axios
      .get('ml_sysuser/_ml_Sysuser/')
      .then((response) => {

          var json_table_data = response.data.results;

          Object.keys(json_table_data).forEach(function(index, data) {
              json_table_data[index].action = "";
          });


          commit('update_system_user_table_data', json_table_data)

      })
      .catch((error) => {
          console.log(error);
      })

}


export function trigger_edit_companyprofile ({ commit,state }, payload) {
    return axios
        // .post('mc_companyprofile/mc_Companyprofile/',payload.pass_json)
        .patch('mc_companyprofile/mc_Companyprofile/'+payload.primary_key+'/',payload.pass_json)
        .then((response) => {
            var json = {};
            json.status = "success";
            json.response = response.data;
            commit('update_companyprofile_status', json)

            var json_table_data = [];
            commit('update_companyprofile_status_table', json_table_data)
        })
        .catch((error) => {

            var string = "Please contact Administrator for futher information. 213.";

            if(error.response.status == 400)
            {

                Object.keys(error.response.data).forEach((header,index)=>{
                    var value = error.response.data[header];
                    string += header+" - "+value;
                });
                console.log(string);
            }

            var json = {};
            json.status = "failed";
            json.response = string;
            commit('update_companyprofile_status', json)
        })
}

export function trigger_edit_locationtable_data ({ commit,state }, payload) {

  return axios
      // .post('mc_companyprofile/mc_Companyprofile/',payload.pass_json)
      .patch('ml_locationgroup/ml_Locationgroup/'+payload.primary_key+'/',payload.pass_json)
      .then((response) => {
          var json = {};
          json.status = "success";
          json.response = response.data;
          commit('update_locationtable_data_status', json)
      })
      .catch((error) => {

          var string = "Please contact Administrator for futher information. 213.";

          if(error.response.status == 400)
          {

              Object.keys(error.response.data).forEach((header,index)=>{
                  var value = error.response.data[header];
                  string += header+" - "+value;
              });
              console.log(string);
          }

          var json = {};
          json.status = "failed";
          json.response = string;
          commit('update_locationtable_data_status', json)
      })
}

export function trigger_edit_branch_table_data ({ commit,state }, payload) {

  return axios
      .patch('ml_supcus_branch/ml_SupcusBranch/'+payload.primary_key+'/',payload.pass_json)
      .then((response) => {
          var json = {};
          json.status = "success";
          json.response = response.data;
          commit('update_branchtabledata_status', json)
      })
      .catch((error) => {

          var string = "Please contact Administrator for futher information. 213.";

          if(error.response.status == 400)
          {

              Object.keys(error.response.data).forEach((header,index)=>{
                  var value = error.response.data[header];
                  string += header+" - "+value;
              });
              console.log(string);
          }

          var json = {};
          json.status = "failed";
          json.response = string;
          commit('update_branchtabledata_status', json)
      })
}

export function trigger_edit_dept_table_data ({ commit,state }, payload) {

  return axios
      .patch('mc_set_group_dept/mc_SetGroupDept/'+payload.primary_key+'/',payload.pass_json)
      .then((response) => {
          var json = {};
          json.status = "success";
          json.response = response.data;
          commit('update_depttabledata_status', json)

        })
        .catch((error) => {

            var string = "Please contact Administrator for futher information. 213.";

            if(error.response.status == 400)
            {

                Object.keys(error.response.data).forEach((header,index)=>{
                    var value = error.response.data[header];
                    string += header+" - "+value;
                });
                console.log(string);
            }

            var json = {};
            json.status = "failed";
            json.response = string;
            commit('update_depttabledata_status', json)
        })
}

export function trigger_edit_group_table_data ({ commit,state }, payload) {

  return axios
      .patch('mc_set_group/mc_SetGroup/'+payload.primary_key+'/',payload.pass_json)
      .then((response) => {
        var json = {};
        json.status = "success";
        json.response = response.data;
        commit('update_grouptabledata_status', json)
      })
      .catch((error) => {

          var string = "Please contact Administrator for futher information. 213.";

          if(error.response.status == 400)
          {

            Object.keys(error.response.data).forEach((header,index)=>{
                var value = error.response.data[header];
                string += header+" - "+value;
            });
            console.log(string);
          }

          var json = {};
          json.status = "failed";
          json.response = string;
          commit('update_grouptabledata_status', json)
      })
}

// for supplier

export function trigger_edit_supplier_table ({ commit,state }, payload) {

  return axios

      .patch('ml_supcus/ml_Supcus/'+payload.primary_key+'/',payload.pass_json)
      .then((response) => {
          var json = {};
          json.status = "success";
          json.response = response.data;
          commit('update_supplier_status_table', json)

      })
      .catch((error) => {

          var string = "Please contact Administrator for futher information. 213.";

          if(error.response.status == 400)
          {

              Object.keys(error.response.data).forEach((header,index)=>{
                  var value = error.response.data[header];
                  string += header+" - "+value;
              });
              console.log(string);
          }

          var json = {};
          json.status = "failed";
          json.response = string;
          commit('update_supplier_status_table', json)
      })
}

export function trigger_edit_locationtable2_data ({ commit,state }, payload) {

  return axios
      // .post('mc_companyprofile/mc_Companyprofile/',payload.pass_json)
      .patch('ml_location/ml_Location/'+payload.primary_key+'/',payload.pass_json)
      .then((response) => {
          var json = {};
          json.status = "success";
          json.response = response.data;
          commit('update_locationtable2_data_status', json)
      })
      .catch((error) => {

          var string = "Please contact Administrator for futher information. 213.";

          if(error.response.status == 400)
          {

              Object.keys(error.response.data).forEach((header,index)=>{
                  var value = error.response.data[header];
                  string += header+" - "+value;
              });
              console.log(string);
          }

          var json = {};
          json.status = "failed";
          json.response = string;

          commit('update_locationtable_data_status', json)

      })
}

export function trigger_edit_systemusertable_data ({ commit,state }, payload) {

  return axios
      // .post('mc_companyprofile/mc_Companyprofile/',payload.pass_json)
      .patch('ml_sysuser/_ml_Sysuser/'+payload.primary_key+'/',payload.pass_json)
      .then((response) => {
          var json = {};
          json.status = "success";
          json.response = response.data;
          commit('update_systemuser_data_status', json)
      })
      .catch((error) => {

          var string = "Please contact Administrator for futher information. 213.";

          if(error.response.status == 400)
          {

              Object.keys(error.response.data).forEach((header,index)=>{
                  var value = error.response.data[header];
                  string += header+" - "+value;
              });
              console.log(string);
          }

          var json = {};
          json.status = "failed";
          json.response = string;
          commit('update_systemuser_data_status', json)
      })
}


export function trigger_branch_table_data_server_side ({ commit }, payload) {
    return axios
        .get('ml_supcus_branch/ml_SupcusBranch/', {
                params: payload.params
            }
        )
        .then((response) => {

            var json_table_data = response.data.results;
            Object.keys(json_table_data).forEach(function(index, data) {
                json_table_data[index].action = "";
            });

            var new_response = response;
            new_response.data.results = json_table_data;

            commit('update_branch_table_data_server_side', new_response)




          })
          .catch((error) => {
              console.log(error);
          })


  }

  export function trigger_locationgroup_table_data_server_side ({ commit }, payload) {
    return axios
        .get('ml_locationgroup/ml_Locationgroup/', {
                params: payload.params
            }
        )
        .then((response) => {

            var json_table_data = response.data.results;
            Object.keys(json_table_data).forEach(function(index, data) {
                json_table_data[index].action = "";
            });

            var new_response = response;
            new_response.data.results = json_table_data;

            commit('update_locationgroup_table_data_server_side', new_response)


          })
          .catch((error) => {
              console.log(error);
          })
  }

  export function trigger_location_table_data_server_side ({ commit }, payload) {
    return axios
        .get('ml_location/ml_Location/', {
                params: payload.params2
            }
        )
        .then((response) => {

            var json_table_data = response.data.results;
            Object.keys(json_table_data).forEach(function(index, data) {
                json_table_data[index].action = "";
            });

            var new_response = response;
            new_response.data.results = json_table_data;

            commit('update_location_table_data_server_side', new_response)


          })
          .catch((error) => {
              console.log(error);
          })
  }


  export function trigger_systemuser_table_data_server_side ({ commit }, payload) {
    return axios
        .get('ml_sysuser/_ml_Sysuser/', {
                params: payload.params
            }
        )
        .then((response) => {

            var json_table_data = response.data.results;
            Object.keys(json_table_data).forEach(function(index, data) {
                json_table_data[index].action = "";
            });

            var new_response = response;
            new_response.data.results = json_table_data;

            commit('update_systemuser_table_data_server_side', new_response)



          })
          .catch((error) => {
              console.log(error);
          })
  }

// for supplier table server
  export function trigger_supplier_table_data_server_side ({ commit }, payload) {
    return axios
        .get('ml_supcus/ml_Supcus/', {
                params: payload.params
            }
        )
        .then((response) => {

            var json_table_data = response.data.results;
            Object.keys(json_table_data).forEach(function(index, data) {
                json_table_data[index].action = "";
            });

            var new_response = response;
            new_response.data.results = json_table_data;

            commit('update_supplier_table_data_server_side', new_response)


          })
          .catch((error) => {
              console.log(error);
          })


  }


export function trigger_dept_table_data_server_side ({ commit }, payload) {
  return axios
      .get('mc_set_group_dept/mc_SetGroupDept/', {
              params: payload.params
          }
      )
      .then((response) => {

          var json_table_data = response.data.results;
          Object.keys(json_table_data).forEach(function(index, data) {
              json_table_data[index].actions = "";
          });

          var new_response = response;
          new_response.data.results = json_table_data;

          commit('update_dept_table_data_server_side', new_response)


        })
        .catch((error) => {
            console.log(error);
        })

}

export function trigger_group_table_data_server_side ({ commit }, payload) {
  return axios
      .get('mc_set_group/mc_SetGroup/', {
              params: payload.params
          }
      )
      .then((response) => {

          var json_table_data = response.data.results;
          Object.keys(json_table_data).forEach(function(index, data) {
              json_table_data[index].actions = "";
          });

          var new_response = response;
          new_response.data.results = json_table_data;

          commit('update_group_table_data_server_side', new_response)


        })
        .catch((error) => {
            console.log(error);
        })

}

// NEW
export function trigger_get_ml_company ({ commit }, payload) {
  return axios
      .get('ml_company/MlCompany/', {
              params: payload.params
          }
      )
      .then((response) => {
          var json_table_data = response.data.results;
          Object.keys(json_table_data).forEach(function(index, data) {
              json_table_data[index].actions = "";
          });
          var new_response = response;
          new_response.data.results = json_table_data;
          commit('update_ml_company', new_response)
        })
        .catch((error) => {
            console.log(error);
        })
}

export function trigger_create_ml_company ({ commit,state }, payload) {
  return axios
      .post('/ml_company/MlCompany/', payload)
      .then((response) => {
          var json = {};
          json.status = "success";
          json.response = response.data;
          commit('update_ml_company_status', json)
      })
      .catch((error) => {
          var json = {};
          json.status = "failed";
          json.response = error.response.data;
          commit('update_ml_company_status', json)
      })
}

export function trigger_update_ml_company ({ commit,state }, payload) {
  return axios
      .patch('/ml_company/MlCompany/'+payload.company_guid+'/', payload.pass_json)
      .then((response) => {
          var json = {};
          json.status = "success";
          json.response = response.data;
          commit('update_ml_company_status', json)
      })
      .catch((error) => {
          var json = {};
          json.status = "failed";
          json.response = error.response.data;
          commit('update_ml_company_status', json)
      })
}

export function trigger_delete_ml_company ({ commit,state }, payload) {
  return axios
      .delete('/ml_company/MlCompany/'+payload.company_guid+'/')
      .then((response) => {
          var json = {};
          json.status = "success";
          json.response = response.data;
          commit('update_ml_company_status', json)
      })
      .catch((error) => {
          var json = {};
          json.status = "failed";
          json.response = error.response.data;
          commit('update_ml_company_status', json)
      })
}

export function trigger_get_mc_division ({ commit }, payload) {
  return axios
      .get('mc_division/McDivision_parent/', {
              params: payload.params
          }
      )
      .then((response) => {
          var json_table_data = response.data.results;
          Object.keys(json_table_data).forEach(function(index, data) {
              json_table_data[index].actions = "";
          });
          var new_response = response;
          new_response.data.results = json_table_data;
          commit('update_mc_division', new_response)
        })
        .catch((error) => {
            console.log(error);
        })
}

export function trigger_create_mc_division ({ commit,state }, payload) {
  return axios
      .post('/mc_division/McDivision/', payload)
      .then((response) => {
          var json = {};
          json.status = "success";
          json.response = response.data;
          commit('update_mc_division_status', json)
      })
      .catch((error) => {
          var json = {};
          json.status = "failed";
          json.response = error.response.data;
          commit('update_mc_division_status', json)
      })
}

export function trigger_update_mc_division ({ commit,state }, payload) {
  return axios
      .patch('/mc_division/McDivision/'+payload.division_guid+'/', payload.pass_json)
      .then((response) => {
          var json = {};
          json.status = "success";
          json.response = response.data;
          commit('update_mc_division_status', json)
      })
      .catch((error) => {
          var json = {};
          json.status = "failed";
          json.response = error.response.data;
          commit('update_mc_division_status', json)
      })
}

export function trigger_delete_mc_division ({ commit,state }, payload) {
  return axios
      .delete('/mc_division/McDivision/'+payload.division_guid+'/')
      .then((response) => {
          var json = {};
          json.status = "success";
          json.response = response.data;
          commit('update_mc_division_status', json)
      })
      .catch((error) => {
          var json = {};
          json.status = "failed";
          json.response = error.response.data;
          commit('update_mc_division_status', json)
      })
}

export function trigger_get_mc_department ({ commit }, payload) {
  return axios
      .get('mc_department/McDepartment_parent/', {
              params: payload.params
          }
      )
      .then((response) => {
          var json_table_data = response.data.results;
          Object.keys(json_table_data).forEach(function(index, data) {
              json_table_data[index].actions = "";
          });
          var new_response = response;
          new_response.data.results = json_table_data;
          commit('update_mc_department', new_response)
        })
        .catch((error) => {
            console.log(error);
        })
}

export function trigger_create_mc_department ({ commit,state }, payload) {
  return axios
      .post('/mc_department/McDepartment/', payload)
      .then((response) => {
          var json = {};
          json.status = "success";
          json.response = response.data;
          commit('update_mc_department_status', json)
      })
      .catch((error) => {
          var json = {};
          json.status = "failed";
          json.response = error.response.data;
          commit('update_mc_department_status', json)
      })
}

export function trigger_update_mc_department ({ commit,state }, payload) {
  return axios
      .patch('/mc_department/McDepartment/'+payload.department_guid+'/', payload.pass_json)
      .then((response) => {
          var json = {};
          json.status = "success";
          json.response = response.data;
          commit('update_mc_department_status', json)
      })
      .catch((error) => {
          var json = {};
          json.status = "failed";
          json.response = error.response.data;
          commit('update_mc_department_status', json)
      })
}

export function trigger_delete_mc_department ({ commit,state }, payload) {
  return axios
      .delete('/mc_department/McDepartment/'+payload.department_guid+'/')
      .then((response) => {
          var json = {};
          json.status = "success";
          json.response = response.data;
          commit('update_mc_department_status', json)
      })
      .catch((error) => {
          var json = {};
          json.status = "failed";
          json.response = error.response.data;
          commit('update_mc_department_status', json)
      })
}

export function trigger_get_mc_subdept ({ commit }, payload) {
  return axios
      .get('mc_subdept/McSubdept_parent/', {
              params: payload.params
          }
      )
      .then((response) => {
          var json_table_data = response.data.results;
          Object.keys(json_table_data).forEach(function(index, data) {
              json_table_data[index].actions = "";
          });
          var new_response = response;
          new_response.data.results = json_table_data;
          commit('update_mc_subdept', new_response)
        })
        .catch((error) => {
            console.log(error);
        })
}

export function trigger_create_mc_subdept ({ commit,state }, payload) {
  return axios
      .post('/mc_subdept/McSubdept/', payload)
      .then((response) => {
          var json = {};
          json.status = "success";
          json.response = response.data;
          commit('update_mc_subdept_status', json)
      })
      .catch((error) => {
          var json = {};
          json.status = "failed";
          json.response = error.response.data;
          commit('update_mc_subdept_status', json)
      })
}

export function trigger_update_mc_subdept ({ commit,state }, payload) {
  return axios
      .patch('/mc_subdept/McSubdept/'+payload.subdept_guid+'/', payload.pass_json)
      .then((response) => {
          var json = {};
          json.status = "success";
          json.response = response.data;
          commit('update_mc_subdept_status', json)
      })
      .catch((error) => {
          var json = {};
          json.status = "failed";
          json.response = error.response.data;
          commit('update_mc_subdept_status', json)
      })
}

export function trigger_delete_mc_subdept ({ commit,state }, payload) {
  return axios
      .delete('/mc_subdept/McSubdept/'+payload.subdept_guid+'/')
      .then((response) => {
          var json = {};
          json.status = "success";
          json.response = response.data;
          commit('update_mc_subdept_status', json)
      })
      .catch((error) => {
          var json = {};
          json.status = "failed";
          json.response = error.response.data;
          commit('update_mc_subdept_status', json)
      })
}

export function trigger_get_mc_category ({ commit }, payload) {
  return axios
      .get('mc_category/McCategory_parent/', {
              params: payload.params
          }
      )
      .then((response) => {
          var json_table_data = response.data.results;
          Object.keys(json_table_data).forEach(function(index, data) {
              json_table_data[index].actions = "";
          });
          var new_response = response;
          new_response.data.results = json_table_data;
          commit('update_mc_category', new_response)
        })
        .catch((error) => {
            console.log(error);
        })
}

export function trigger_create_mc_category ({ commit,state }, payload) {
  return axios
      .post('/mc_category/McCategory/', payload)
      .then((response) => {
          var json = {};
          json.status = "success";
          json.response = response.data;
          commit('update_mc_category_status', json)
      })
      .catch((error) => {
          var json = {};
          json.status = "failed";
          json.response = error.response.data;
          commit('update_mc_category_status', json)
      })
}

export function trigger_update_mc_category ({ commit,state }, payload) {
  return axios
      .patch('/mc_category/McCategory/'+payload.category_guid+'/', payload.pass_json)
      .then((response) => {
          var json = {};
          json.status = "success";
          json.response = response.data;
          commit('update_mc_category_status', json)
      })
      .catch((error) => {
          var json = {};
          json.status = "failed";
          json.response = error.response.data;
          commit('update_mc_category_status', json)
      })
}

export function trigger_delete_mc_category ({ commit,state }, payload) {
  return axios
      .delete('/mc_category/McCategory/'+payload.category_guid+'/')
      .then((response) => {
          var json = {};
          json.status = "success";
          json.response = response.data;
          commit('update_mc_category_status', json)
      })
      .catch((error) => {
          var json = {};
          json.status = "failed";
          json.response = error.response.data;
          commit('update_mc_category_status', json)
      })
}

export function trigger_get_mc_uom ({ commit }, payload) {
  return axios
      .get('mc_uom/McUOM_parent/', {
              params: payload.params
          }
      )
      .then((response) => {
          var json_table_data = response.data.results;
          Object.keys(json_table_data).forEach(function(index, data) {
              json_table_data[index].actions = "";
          });
          var new_response = response;
          new_response.data.results = json_table_data;
          commit('update_mc_uom', new_response)
        })
        .catch((error) => {
            console.log(error);
        })
}

export function trigger_create_mc_uom ({ commit,state }, payload) {
  return axios
      .post('/mc_uom/McUOM/', payload)
      .then((response) => {
          var json = {};
          json.status = "success";
          json.response = response.data;
          commit('update_mc_uom_status', json)
      })
      .catch((error) => {
          var json = {};
          json.status = "failed";
          json.response = error.response.data;
          commit('update_mc_uom_status', json)
      })
}

export function trigger_update_mc_uom ({ commit,state }, payload) {
  return axios
      .patch('/mc_uom/McUOM/'+payload.uom_guid+'/', payload.pass_json)
      .then((response) => {
          var json = {};
          json.status = "success";
          json.response = response.data;
          commit('update_mc_uom_status', json)
      })
      .catch((error) => {
          var json = {};
          json.status = "failed";
          json.response = error.response.data;
          commit('update_mc_uom_status', json)
      })
}

export function trigger_delete_mc_uom ({ commit,state }, payload) {
  return axios
      .delete('/mc_uom/McUOM/'+payload.uom_guid+'/')
      .then((response) => {
          var json = {};
          json.status = "success";
          json.response = response.data;
          commit('update_mc_uom_status', json)
      })
      .catch((error) => {
          var json = {};
          json.status = "failed";
          json.response = error.response.data;
          commit('update_mc_uom_status', json)
      })
}

export function trigger_get_mc_manufacturer ({ commit }, payload) {
  return axios
      .get('mc_manufacturer/McManufacturer_parent/', {
              params: payload.params
          }
      )
      .then((response) => {
          var json_table_data = response.data.results;
          Object.keys(json_table_data).forEach(function(index, data) {
              json_table_data[index].actions = "";
          });
          var new_response = response;
          new_response.data.results = json_table_data;
          commit('update_mc_manufacturer', new_response)
        })
        .catch((error) => {
            console.log(error);
        })
}

export function trigger_create_mc_manufacturer ({ commit,state }, payload) {
  return axios
      .post('/mc_manufacturer/McManufacturer/', payload)
      .then((response) => {
          var json = {};
          json.status = "success";
          json.response = response.data;
          commit('update_mc_manufacturer_status', json)
      })
      .catch((error) => {
          var json = {};
          json.status = "failed";
          json.response = error.response.data;
          commit('update_mc_manufacturer_status', json)
      })
}

export function trigger_update_mc_manufacturer ({ commit,state }, payload) {
  return axios
      .patch('/mc_manufacturer/McManufacturer/'+payload.manufacturer_guid+'/', payload.pass_json)
      .then((response) => {
          var json = {};
          json.status = "success";
          json.response = response.data;
          commit('update_mc_manufacturer_status', json)
      })
      .catch((error) => {
          var json = {};
          json.status = "failed";
          json.response = error.response.data;
          commit('update_mc_manufacturer_status', json)
      })
}

export function trigger_delete_mc_manufacturer ({ commit,state }, payload) {
  return axios
      .delete('/mc_manufacturer/McManufacturer/'+payload.manufacturer_guid+'/')
      .then((response) => {
          var json = {};
          json.status = "success";
          json.response = response.data;
          commit('update_mc_manufacturer_status', json)
      })
      .catch((error) => {
          var json = {};
          json.status = "failed";
          json.response = error.response.data;
          commit('update_mc_manufacturer_status', json)
      })
}

export function trigger_get_mc_brand ({ commit }, payload) {
  return axios
      .get('mc_brand/McBrand_parent/', {
              params: payload.params
          }
      )
      .then((response) => {
          var json_table_data = response.data.results;
          Object.keys(json_table_data).forEach(function(index, data) {
              json_table_data[index].actions = "";
          });
          var new_response = response;
          new_response.data.results = json_table_data;
          commit('update_mc_brand', new_response)
        })
        .catch((error) => {
            console.log(error);
        })
}

export function trigger_create_mc_brand ({ commit,state }, payload) {
  return axios
      .post('/mc_brand/McBrand/', payload)
      .then((response) => {
          var json = {};
          json.status = "success";
          json.response = response.data;
          commit('update_mc_brand_status', json)
      })
      .catch((error) => {
          var json = {};
          json.status = "failed";
          json.response = error.response.data;
          commit('update_mc_brand_status', json)
      })
}

export function trigger_update_mc_brand ({ commit,state }, payload) {
  return axios
      .patch('/mc_brand/McBrand/'+payload.brand_guid+'/', payload.pass_json)
      .then((response) => {
          var json = {};
          json.status = "success";
          json.response = response.data;
          commit('update_mc_brand_status', json)
      })
      .catch((error) => {
          var json = {};
          json.status = "failed";
          json.response = error.response.data;
          commit('update_mc_brand_status', json)
      })
}

export function trigger_delete_mc_brand ({ commit,state }, payload) {
  return axios
      .delete('/mc_brand/McBrand/'+payload.brand_guid+'/')
      .then((response) => {
          var json = {};
          json.status = "success";
          json.response = response.data;
          commit('update_mc_brand_status', json)
      })
      .catch((error) => {
          var json = {};
          json.status = "failed";
          json.response = error.response.data;
          commit('update_mc_brand_status', json)
      })
}

export function trigger_get_mc_variant ({ commit }, payload) {
  return axios
      .get('mc_variant/McVariant/', {
              params: payload.params
          }
      )
      .then((response) => {
          var json_table_data = response.data.results;
          Object.keys(json_table_data).forEach(function(index, data) {
              json_table_data[index].actions = "";
          });
          var new_response = response;
          new_response.data.results = json_table_data;
          commit('update_mc_variant', new_response)
        })
        .catch((error) => {
            console.log(error);
        })
}

export function trigger_create_mc_variant ({ commit,state }, payload) {
  return axios
      .post('/mc_variant/McVariant/', payload)
      .then((response) => {
          var json = {};
          json.status = "success";
          json.response = response.data;
          commit('update_mc_variant_status', json)
      })
      .catch((error) => {
          var json = {};
          json.status = "failed";
          json.response = error.response.data;
          commit('update_mc_variant_status', json)
      })
}

export function trigger_update_mc_variant ({ commit,state }, payload) {
  return axios
      .patch('/mc_variant/McVariant/'+payload.variant_guid+'/', payload.pass_json)
      .then((response) => {
          var json = {};
          json.status = "success";
          json.response = response.data;
          commit('update_mc_variant_status', json)
      })
      .catch((error) => {
          var json = {};
          json.status = "failed";
          json.response = error.response.data;
          commit('update_mc_variant_status', json)
      })
}

export function trigger_delete_mc_variant ({ commit,state }, payload) {
  return axios
      .delete('/mc_variant/McVariant/'+payload.variant_guid+'/')
      .then((response) => {
          var json = {};
          json.status = "success";
          json.response = response.data;
          commit('update_mc_variant_status', json)
      })
      .catch((error) => {
          var json = {};
          json.status = "failed";
          json.response = error.response.data;
          commit('update_mc_variant_status', json)
      })
}

export function trigger_get_mc_size ({ commit }, payload) {
  return axios
      .get('mc_size/McSize/', {
              params: payload.params
          }
      )
      .then((response) => {
          var json_table_data = response.data.results;
          Object.keys(json_table_data).forEach(function(index, data) {
              json_table_data[index].actions = "";
          });
          var new_response = response;
          new_response.data.results = json_table_data;
          commit('update_mc_size', new_response)
        })
        .catch((error) => {
            console.log(error);
        })
}

export function trigger_create_mc_size ({ commit,state }, payload) {
  return axios
      .post('/mc_size/McSize/', payload)
      .then((response) => {
          var json = {};
          json.status = "success";
          json.response = response.data;
          commit('update_mc_size_status', json)
      })
      .catch((error) => {
          var json = {};
          json.status = "failed";
          json.response = error.response.data;
          commit('update_mc_size_status', json)
      })
}

export function trigger_update_mc_size ({ commit,state }, payload) {
  return axios
      .patch('/mc_size/McSize/'+payload.size_guid+'/', payload.pass_json)
      .then((response) => {
          var json = {};
          json.status = "success";
          json.response = response.data;
          commit('update_mc_size_status', json)
      })
      .catch((error) => {
          var json = {};
          json.status = "failed";
          json.response = error.response.data;
          commit('update_mc_size_status', json)
      })
}

export function trigger_delete_mc_size ({ commit,state }, payload) {
  return axios
      .delete('/mc_size/McSize/'+payload.size_guid+'/')
      .then((response) => {
          var json = {};
          json.status = "success";
          json.response = response.data;
          commit('update_mc_size_status', json)
      })
      .catch((error) => {
          var json = {};
          json.status = "failed";
          json.response = error.response.data;
          commit('update_mc_size_status', json)
      })
}

export function trigger_get_mc_origin ({ commit }, payload) {
  return axios
      .get('mc_origin/McOrigin/', {
              params: payload.params
          }
      )
      .then((response) => {
          var json_table_data = response.data.results;
          Object.keys(json_table_data).forEach(function(index, data) {
              json_table_data[index].actions = "";
          });
          var new_response = response;
          new_response.data.results = json_table_data;
          commit('update_mc_origin', new_response)
        })
        .catch((error) => {
            console.log(error);
        })
}

export function trigger_create_mc_origin ({ commit,state }, payload) {
  return axios
      .post('/mc_origin/McOrigin/', payload)
      .then((response) => {
          var json = {};
          json.status = "success";
          json.response = response.data;
          commit('update_mc_origin_status', json)
      })
      .catch((error) => {
          var json = {};
          json.status = "failed";
          json.response = error.response.data;
          commit('update_mc_origin_status', json)
      })
}

export function trigger_update_mc_origin ({ commit,state }, payload) {
  return axios
      .patch('/mc_origin/McOrigin/'+payload.origin_guid+'/', payload.pass_json)
      .then((response) => {
          var json = {};
          json.status = "success";
          json.response = response.data;
          commit('update_mc_origin_status', json)
      })
      .catch((error) => {
          var json = {};
          json.status = "failed";
          json.response = error.response.data;
          commit('update_mc_origin_status', json)
      })
}

export function trigger_delete_mc_origin ({ commit,state }, payload) {
  return axios
      .delete('/mc_origin/McOrigin/'+payload.origin_guid+'/')
      .then((response) => {
          var json = {};
          json.status = "success";
          json.response = response.data;
          commit('update_mc_origin_status', json)
      })
      .catch((error) => {
          var json = {};
          json.status = "failed";
          json.response = error.response.data;
          commit('update_mc_origin_status', json)
      })
}

export function trigger_get_mc_weighing_type ({ commit }, payload) {
  return axios
      .get('mc_weighing_type/McWeighingType/', {
              params: payload.params
          }
      )
      .then((response) => {
          var json_table_data = response.data.results;
          Object.keys(json_table_data).forEach(function(index, data) {
              json_table_data[index].actions = "";
          });
          var new_response = response;
          new_response.data.results = json_table_data;
          commit('update_mc_weighing_type', new_response)
        })
        .catch((error) => {
            console.log(error);
        })
}

export function trigger_create_mc_weighing_type ({ commit,state }, payload) {
  return axios
      .post('/mc_weighing_type/McWeighingType/', payload)
      .then((response) => {
          var json = {};
          json.status = "success";
          json.response = response.data;
          commit('update_mc_weighing_type_status', json)
      })
      .catch((error) => {
          var json = {};
          json.status = "failed";
          json.response = error.response.data;
          commit('update_mc_weighing_type_status', json)
      })
}

export function trigger_update_mc_weighing_type ({ commit,state }, payload) {
  return axios
      .patch('/mc_weighing_type/McWeighingType/'+payload.weight_type_guid+'/', payload.pass_json)
      .then((response) => {
          var json = {};
          json.status = "success";
          json.response = response.data;
          commit('update_mc_weighing_type_status', json)
      })
      .catch((error) => {
          var json = {};
          json.status = "failed";
          json.response = error.response.data;
          commit('update_mc_weighing_type_status', json)
      })
}

export function trigger_delete_mc_weighing_type ({ commit,state }, payload) {
  return axios
      .delete('/mc_weighing_type/McWeighingType/'+payload.weight_type_guid+'/')
      .then((response) => {
          var json = {};
          json.status = "success";
          json.response = response.data;
          commit('update_mc_weighing_type_status', json)
      })
      .catch((error) => {
          var json = {};
          json.status = "failed";
          json.response = error.response.data;
          commit('update_mc_weighing_type_status', json)
      })
}
