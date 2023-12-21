##Endpoint API

#Login
Method : POST
url : '/auth/api/v1/login'

req.body : {
  'email' : ,
  'password  :,
}

errors : {
  'message' : 'Invalid Email or Password !!'
}

success : {
    "user_id": 1,
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZF91c2VyIjoxLCJpYXQiOjE3MDMxNjg4NTcsImV4cCI6MTcwMzc3MzY1N30.RdQHlfbS9YIsiImhsRbJeXSISRJT5Ay7OPlRJ2HTKU0"
}

#Register 
Method : POST
url : '/auth/api/v1/register'

req.body : {
  
}

res.success : {
  'status' : 200,
  'values : 'Berhasil Melakukan Registrasi'
}


#GET ALL UMKM
Method GET
url : 'umkm'

res.success : {
  'id_umkm' :,
  'nama_umkm' :,
  'trgt_invest' : ,
  'invest_amount' :,
  'tgl_berakhir' :,
  'img' : ,
  'nama_sektor': ,
}






