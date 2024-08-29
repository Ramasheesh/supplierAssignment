# data_base connection URL or URI
 MONGO_URI=mongodb://localhost:27017/makersharks

# server running at port
 PORT=8000(.env) or port 4000

# Start the server locally via this cmd
[ npm start ] or  [ npm run dev ] (using nodemon)


# PostMan API URL for query
# query fiels is {Location , nature_of_business , manufacturing_process}
you can search via single field of these or simanteniously

# curl -X POST
"http://localhost:8000/api/supplier/querySupplier?location=India&nature_of_business=small_scale&manufacturing_process=3d_printing&page=1&limit=10" -H "Content-Type: application/json"



# this is the api for create supplier
# curl -X POST 
"http://localhost:8000/api/supplier/createSupplier"

# for validation i used Joi to validate the field
For the create Supplier API all the field is required
For the Query Supplier API all the field is Optional
