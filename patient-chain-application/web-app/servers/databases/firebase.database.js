import admin from 'firebase-admin';

admin.initializeApp({
    credential: admin.credential.cert({
        type: "service_account",
        project_id: "netflix-modify",
        private_key_id: "ef79e26346872a8ab08a68283af12f15214c013c",
        private_key: "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDdoc3Ml218cNCL\nB4VXwASAzsSpW3UA42mOrREKM5jHvaafijOA2TfSYHKFZaA+CW6X2TCHF+E0cOlu\nYWU90yWeyh/O0TyiLLlM+K6FcRRov23GqlU1O/1i1Vx3vvsn3pIsWekFthL7VssS\nb2ApPwYNAwzXfk0sTJM2jyuAtWnkLXCudfzLhJWm8rOg+hAGwwta7WUzXW3OcDBo\nauY3WLYHJ1/zghzf0cFEHfmcCJLlfFlF6qAmfqrdYm6XiCYfFmn81rFZkSwLY6iT\nC86fvIWGNhrzuFaJYaDWWMR53Bt1CiqGZeEMU/3nWuDusehMOdTQlE7I0Y5PQySF\nzxSTjLWPAgMBAAECggEAD5jHZtJxPgSiaGZLF/XHW1kxtcld3oYic4vyWwlugv/x\nreCH51Vh/EgVRxXzxOndAoqiQ5+Gla4sfzwTZ9poF1iaDG/lGHSVRblqbrGaghSW\noRhzjp9+IWpqa3LhMdkT6FMbdu9tPorJF68G0WBCCMBiMvgMbkWlRn2kzhX2Mbxv\nXAD2N4YLZWAE65wDIRab7+sj2W4DqbYkr05zJA5DQCRJ5+16uexV9W4HyNjTJtBC\n0mkDpx320ttJKHETqmURj+W92SdwjQX74Tuf1oGbMzEfZ/jup9Gx21nsNaKXpDNR\nVVcsLV8GWO2Df0kFzjOHrwYby0d9Yc480pCr5KX3YQKBgQD0ouKby5CBFI6Tn6o+\nfJSDO/02/LoqrxLjTW5UY53TDf9sYC8EnnXWidTu5DWcm6QhgDA9magnFQfblSrz\nLUKp1wpxcn6SmkQ3yRcVmctVwwn4rOX2Qznw9PAVNcyUrAoliobsXs0nwuei9d7+\ntbHArkyLRyBAkeCyz/A2NMx5nQKBgQDn7Vyi6mbt+I6glLAG/N/gWSlBRr4RLly5\nYBX3mXr7Cn/7x1BIeAfGN4KzvqxUOhz0yxDcqLlSOXjE+yKTx2D2tpmHrfCIw5O7\n4No95o5J6uXUD71cA4bYO1fVs5YBaZXN4k837C7trh28tNqfeSZH8nHK+oQx6giZ\nL+dkLj7KGwKBgDAIm34DpkfyBVyvCPpj87Ug3kMhtFwVLBw9Y+Bl/uMl6HUbHaBG\njNSnE4wkevJZDQ0W4mH1/bJOytAupdRBmslGU+KanIekiqh5b3LqU6ZvOVH+gNit\nsn7BWTKQ8a5vaT6dyIg4xQd9mYXByRsyCcjPcHAYcxi6i+gQNBYwn8VxAoGBAIh5\nH92t2MuHS0YquDokawh07tW+bvFlOqLKa6K66ab3UsAxVIiQOOLmnz5toLIfUBKr\nu0xc7E/6CZq/vGUBGYmTgVxZegTAMRqJAWMTW/8a/gp/CIoweRScNt9FQaurGb+A\nv+TEUgkCP/Ve5paYj3Ies98g8tD8Sfr6OUq1+7SpAoGBAIVJ5Ts296AR6m9YmFL8\n1MBs95AEzJmHW0hbgk9c6zl/JwuXqJqHqV7V0YjzVm9GMfUO3rc3vhZFGvTgFltJ\ncP0laHw2UxTejTN2zKEhm1/P3yabqaCItE9Ft+xqq5FPXWh7aGYVbLKAx2tA+3xL\nU60GHUG1GT5+xSaIdWl5C3qc\n-----END PRIVATE KEY-----\n",
        client_email: "firebase-adminsdk-t0x7r@netflix-modify.iam.gserviceaccount.com",
        client_id: "102304473975917936155",
        auth_uri: "https://accounts.google.com/o/oauth2/auth",
        token_uri: "https://oauth2.googleapis.com/token",
        auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
        client_x509_cert_url: "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-t0x7r%40netflix-modify.iam.gserviceaccount.com",
        universe_domain: "googleapis.com"
    }),
    databaseURL: "https://netflix-modify-default-rtdb.firebaseio.com"
});

var database = admin.database();

export { database };