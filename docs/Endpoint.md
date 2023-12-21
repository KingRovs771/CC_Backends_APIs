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

res.error : {
  "message" : 'UMKM tidak ditemukan'
}

#GET UMKM BY ID
METHOD GET
url : 'umkm/:id'

res.success : {
  'id_umkm' :,
  'nama_umkm' :,
  'trgt_invest' : ,
  'invest_amount' :,
  'tgl_berakhir' :,
  'bunga' :,
  'deskripsi':,
  'img' : ,
  'nama_sektor': ,
}

res.error : {
  'message' : 'UMKM tidak ditemukan'
}

#GET Provinsi
Method GET
url : '/allprovinsi'

res.success :{
  'id_provinsi',
  'nama_provinsi'
}

#GET Sektor
Method GET
url : '/allsektor'

res.success :{
  'id_sektor',
  'nama_sektor'
}

#GET Wallet 
Method GET
url : '/ewallet'

res.success : {
  'saldo' : 0,
}

#Topup
Method Post
url : '/topup'

res.body : {
  userId : by login token,
  "add" : "20000"
}

res.success :{
  "saldo" : "20000"
}

add < 0 
res.error : {
  'message' : 'Amount must be greater than 0 for purchase.'
}
res.error : {
  "message" : "invalid Server Error"
}

#Invest UMKM
Method Post
url : '/purchase'

res.body : {
  userId : by login token,
  id_umkm : 
  "add" : "20000"
}

res.success :{
  "id_umkm" : "1"
  "saldo" : "0"
}

add < 0 
res.error : {
  'message' : 'Amount must be greater than 0 for purchase.'
}
res.error : {
  "message" : "invalid Server Error"
}








