const schema = {
    name: {type: "string", required: true},
    age: {type: "number", required: true},
    founder: {type: "boolean", required: false},
    company: {type: "string", required: true},
    address: {
        type: "object", 
        required: true,
        description: {type: "string", required: true},
        county: {type: "string", required: false},
        country: {type: "string", required: false}
    }
};

const body = {
    name: "William",
    age: 33,
    founder: true,
    company: "Aclymate",
    address: {
        description: "Desc",
        country: 22
      }
};

console.log(schemaChecker(body, schema));

function schemaChecker(body, schema) {
    var truthy = true;
    Object.keys(schema).forEach( function(keySchema) { /* Get keys to iterate through schema */
        var properties = schema[keySchema];
        if(keySchema == "address") {                    /* If key is address, call function recursively with address details as the body */
            if(!schemaChecker(body[keySchema], schema[keySchema])) {
                truthy = false;
            }
        }
        else if(keySchema == "type" || keySchema == "required") {   /* If already in recusive call, check if key matches to "type" or "required" */
            if(keySchema == "type" && typeof(body) != properties) {       /* If type of attribute does not match type in schema, return false */
                truthy = false;
            }
            else if(keySchema == "required" && properties == true) { /* Else check if attribute required by schema */
                if(body == null || body == "") {    /* If required and missing, return false */
                    truthy = false; 
                }
                else if(typeof(body!= properties["type"])) {
                    return false;
                }
            }
        }
        else {
            Object.keys(properties).forEach( function(values) {
                if(values == "required" && properties[values] == true) {    /* Check if attribute is required by schema */
                    if(body[keySchema] == null || body[keySchema] == "") {  /* If required and missing, return false */
                        truthy = false;           
                    }
                    else if(typeof(body[keySchema] != properties["type"])) {
                        return false;
                    }
                 }
                 else if(values == "type" && typeof(body[keySchema]) != properties[values] && properties["required"]) {   /* Else check if attribute does not match type stated in schema */
                    truthy = false;                                                            /* If mismatched type, return false */
                }
            });
        }
    })
    return truthy;
}