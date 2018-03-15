Rest-API kyselyt

/api/posts


localhost:3420/api/posts

GET: Palauttaa kaikki tietokannassa olevat käyttäjät, ilman salasanoja.

{
    "success": true,
    "posts": [
        {
            "username": "Voi nyt vittu",
            "text": "Ei salasanaa",
            "date": "2018-03-06T08:26:58.000Z",
            "id": "5a9e50d2889f2a1430f4c559",
            "hasRemove": false
        },
        {
            "username": "pena",
            "text": "penapostaa",
            "date": "2018-03-06T21:45:16.000Z",
            "id": "5a9f0bec9dc19f4a205b207f",
            "hasRemove": true
        },
        {
            "username": "Pena",
            "text": "Aasi",
            "date": "2018-03-12T07:29:18.000Z",
            "id": "5aa62c4e3fa8ca2a708a887b",
            "hasRemove": true
        }
    ]
}


localhost:3420/api/posts

POST: Tekee kantaan uuden viestin.


Body:

{
"username": "penaali",
            "text": "penapostaa",
            "date": "2018-03-15T19:18:16.000Z",
            "password": "penapena"

}

Result:

{
    "success": true,
    "message": "Thank you for adding."
}

localhost:3420/api/posts/:id

GET: Palauttaa tietokannassa olevan käyttäjän ID:n perusteella ilman salasanaa.

{
    "success": true,
    "posts": [
        {
            "username": "Pena",
            "text": "Aasi",
            "date": "2018-03-12T07:29:18.000Z",
            "id": "5aa62c4e3fa8ca2a708a887b",
            "hasRemove": true
        }
    ]
}

localhost:3420/api/posts/:id

DELETE: Poistaa tietokannassa olevan käyttäjän ID:n perusteella.

Body:
{
"password": "pena",
    	"username": "pena"
}

Result:
{
    "success": true,
    "message": "Post removed"
}

/user

localhost:3420/user

GET: Palauttaa tietokannassa olevat kaikki private forumin käyttäjät kaikkine tietoineen.

{
    "results": [
        {
            "_id": "5aa038392bf1e649d4db718c",
            "email": "ville@metropolia.fi",
            "username": "ville",
            "password": "pena",
            "__v": 0
        },
        {
            "_id": "5aa03ad7bda8f42170c82e52",
            "email": "roni@metropolia.fi",
            "username": "roni",
            "password": "Kappa",
            "__v": 0
        }
    ]
}


localhost:3420/user

POST: Luo tietokantaan uuden käyttäjän.

Body:

{
			"email": "testi@metropolia.fi",
            "username": "testaaja",
            "password": "testi"
}

Result:

{
    "success": true,
    "message": "New user created"
}

localhost:3420/user/login

POST: Kirjautuu sisään private forumille ja luo käyttäjälle tokenin

Body:

{
	"username": "ville",
	"password": "pena"
}

Result:

{
    "token":  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjVhYTAzODM5MmJmMWU2NDlkNGRiNzE4YyIsImVtYWlsIjoidmlsbGVAbWV0cm9wb2xpYS5maSIsInVzZXJuYW1lIjoidmlsbGUiLCJwYXNzd29yZCI6InBlbmEiLCJfX3YiOjB9LCJpYXQiOjE1MjExMzU4OTcsImV4cCI6MTUyMTEzOTQ5N30.RuuIckuLGDdHtuUlv1sIwQz_YRUuaiO1e1LlT8UM9Eo"
}

/api/privateforum

!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

Polku vaatii tunnistautumisen tokenilla!

Headereihin tulee lisätä avain "Authorization" ja valueksi antaa "Bearer [token]" jossa [token] korvataan tietenkin kirjautumisessa palautetulla tokenilla.

!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

Jos validia tokenia ei ole, palautuu error 403, forbidden.


localhost:3420/api/privateforum/

GET: Palauttaa käyttäjien lähettämät viestit.


{
    "success": true,
    "posts": [
        {
            "username": "ronim",
            "text": "LUL",
            "date": "2018-03-09T19:56:01.000Z",
            "id": "5aa2e6d1c979654798b4e9dd",
            "hasRemove": false
        },
        {
            "username": "ville",
            "text": "Testi",
            "date": "2018-03-12T07:14:45.000Z",
            "id": "5aa628e53fa8ca2a708a887a",
            "hasRemove": true
        }
    ]
}


localhost:3420/api/privateforum/

POST: Tekee uuden postauksen, vaatii tekstin ja päivämäärän, käyttäjänimi otetaan tokenilta.


Body:

{
	"text": "Postaus postmanillä",
    "date": "2018-03-15T19:56:01.000Z"
}

Result:

{
    "success": true,
    "message": "Thank you for posting"
}


localhost:3420/api/privateforum/:id

DELETE: Poistaa viestin ID:n avulla, tokenin tulee kuulua viestin omistajalle, jotta viesti oikeasti poistuu.

Result:
{
    "success": true,
    "message": "Post removed"
}
