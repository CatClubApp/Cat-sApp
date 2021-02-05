# Cat's-App
a web app to see your favoite catt

**homepage**
-----

* **URL**
  
  /home

* **Method:**
   
   **GET**

* **Success Response:**
    *  **Code** : 200 <br>
       **Content**:
     ```{
    "data": <response from thirdParty API ("https://aws.random.cat/meow")
    "fact": <response from thirdParty API ("https://api.thecatapi.com/v1/images/search")
    "result": <response from thirdParty API ("https://catfact.ninja/fact?max_length=140")>
    }```

* **Error Response:**
    * **Code** : 500<br>
      **Content** : 
      ```
      {error:messages}
      ```
      

**Add Favorite Picture**
-----

* **URL**
  
  /addFav

* **Method:**

   `POST`<br>

* **Success Response:**
    *  **Code** : 201 <br>
       **Content**:
       ```
       {
           {id: <input process>, 
           data: <input process>, 
           result: <input process> 
           fact: <input process>}
       }
       
       ```
* **Code** : 500 INTERNAL SERVER ERROR<br>
      **Content** : 
      
      {error:messages}
      


**Find Favorite Picture**
-----

* **URL**
  
  /findFav

* **Method:**

   `GET`<br>

* **URL Params:**

  **Required:**<br>

  `id=[integer]`


* **Success Response:**
    *  **Code** : 201 <br>
       **Content**:
    
       ```
       {
        data : <from database>
        result : <from database>
        fact : <from database>
       }
       ```
       
* **Error Response:**
    * **Code** : 404 NOT FOUND<br>
      **Content** : 
      ```
      {error:'data not found'}
      ```
      
      OR 
    * **Code** : 500 INTERNAL SERVER ERROR<br>
      **Content** : 
      ```
      {error:messages}
      ```


**Register User**
-----

* **URL**
  
  /register

* **Method:**

   `POST`<br>

* **Request Body:**<br>
  **Required:**<br>
```
{
    "name": <input process>
    "email" : <input process>
    "password": <input process>
}
```
* **Success Response:**
    *  **Code** : 200 <br>
       **Content**:
       
```
{
    "success": {
        "id": <from database>,
        "name": <input process>,
        "email": <input process>,
        "password": <input process and hash from server>
        "updatedAt": <from server>
        "createdAt": <from server>
    }
}
```
    
* **Error Response:**
    * **Code** : 400 VALIDATION ERROR<br>
      **Content** : 
      ```
      {error: message}
      ```

    * **Code** : 500 INTERNAL SERVER ERROR<br>
      **Content** : 
      ```
      {error:messages}
      ```

**Login User**
-----

* **URL**
  
  /login

* **Method:**

   `POST`<br>

* **Request Body:**<br>
  **Required:**<br>
```
{
    "email" : <input process>
    "password": <input process>
}
```
* **Success Response:**
    *  **Code** : 200 <br>
       **Content**:
       
```
{
    "name": <from database>,
    "access_token" : <from server>
}
```
    
* **Error Response:**
    * **Code** : 400 VALIDATION ERROR<br>
      **Content** : 
      ```
      {error: message}
      ```
      
    OR

    * **Code** : 404 NOT FOUND<br>
      **Content** : 
      ```
      {error:messages}
      ```
    
    OR

    * **Code** : 500 INTERNAL SERVER ERROR<br>
      **Content** : 
      ```
      {error:messages}
      ```

**Google Sign In User**
-----

* **URL**
  
  /LoginGoogle

* **Method:**

   `POST`<br>

* **Request Body:**<br>
  **Required:**<br>
```
{
    "email" : <input process>
    "password": <input process>
}
```
* **Success Response:**
    *  **Code** : 200 <br>
       **Content**:    
```
{
    "cachedValue":
      {
         "hint": <from Oauth Google>,
         "disabled": <from Oauth Google>
      }   
}
```
    
* **Error Response:**

    * **Code** : 404 NOT FOUND<br>
      **Content** : 
      ```
      {error:messages}
      ```
    
    OR

    * **Code** : 500 INTERNAL SERVER ERROR<br>
      **Content** : 
      ```
      {error:messages}
      ```

**Google Register User**
-----

* **URL**
  
  /RegisterGoogle

* **Method:**

   `POST`<br>

* **Request Body:**<br>
  **Required:**<br>
```
{
    "email" : <input process>
    "password": <input process>
}
```
* **Success Response:**
    *  **Code** : 200 <br>
       **Content**:    
```
{
    "cachedValue":
      {
         "hint": <from Oauth Google>,
         "disabled": <from Oauth Google>
      }   
}
```
    
* **Error Response:**

    * **Code** : 404 NOT FOUND<br>
      **Content** : 
      ```
      {error:messages}
      ```
    
    OR

    * **Code** : 500 INTERNAL SERVER ERROR<br>
      **Content** : 
      ```
      {error:messages}
      ```

**delete Favorite User**
-----

* **URL**
  
  /deleteFav

* **Method:**

   `delete`<br>

* **Request Body:**<br>
  **Required:**<br>
```
{
    "id" : <input process>
    "access_token":<input process>
}
```
* **Success Response:**
    *  **Code** : 200 <br>
       **Content**:    
```
{
    msg:"Success delete"  
}
```
    
* **Error Response:**

    * **Code** : 500 INTERNAL SERVER ERROR<br>
      **Content** : 
      ```
      {error:messages}
      ```

