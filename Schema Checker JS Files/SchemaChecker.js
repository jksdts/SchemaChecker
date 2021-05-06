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
    name: "William Something",
    age: 33,
    founder: true,
    company: "Aclymate",
    address: {
        description: "2432 S. Downing St, Denver, CO 80210",
        county: "Denver",
        country: "USA"
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
        else if(schema["required"] && !body) {   /* If already in recusive call, check if key matches to "type" or "required" */
            truthy = false;
        }
        else if(body && schema["type"] && typeof(body) != schema["type"]) {
            truthy = false;
        }
        else {
            Object.keys(properties).forEach( function(values) {
                if(properties["required"] && !body[keySchema]) {
                    truthy = false;
                }
                else if(body[keySchema] && properties["type"] && typeof(body[keySchema]) != properties["type"]) {
                    truthy = false;
                }
            });
        }
    })
    return truthy;
}