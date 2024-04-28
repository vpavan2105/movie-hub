# movie-hub


 **roles** -- admin, user, movie-distributor, theatre-distributor.
 **access**
  admin: {users:[alluser,deleteuser],movies:[deletemovies], theatres:[deletetheatre], bookings:[allbookings],showTimes:[allshowTimes]}
  movie-distributor {movie:[allroutes],showTimes:[myshows]} 
  theatre-distributor : {theatre:[allroutes], showTimes:[myshows,create new show, update show,delete show]}

 **auth** : 
  user:{users:[update user,delete user],bookings:[mybooking]}
 **open**
 allmovies,alltheatres,user:{create new user,login}
 
 routes 
    \users
            get \ - all user
            post \register - create new user
            post \login - get user
            patch \:id - update user
            delete \:id - delete user
    \movies 
            get \ - all movie
            post \ - create new movie
            patch \:id - update movie
            delete \:id - delete movie
            get \mymovies - get my movies
    \theatres
            get \ - all theatre
            get \mytheatre - get mytheatre
            post \  - create new theatre
            patch \:id - update theatre
            delete \:id - delete theatre
    \bookings       
            get \ - all bookings
            get  \mybookings - get my bookings
    \showTimes
            get \ - all shows
            get \myshows - get my shows         
            post \ - create new show
            patch \:id - update show
            delete \:id - delete show     
