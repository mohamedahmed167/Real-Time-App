## REST API
-POST /api/auth/register -{username ,email,password}
-POST /api/auth/login -{email,password} {token,user}
-GET /api/Rooms - قائمه الغرف
-POST /api/Rooms (Auth) - {name ,description?,isPrivate}


 
## socket.io الاتصال مع التوكين
--join-room -{roomId}=> السيرفير هيرد   joined-Room {roomId}
