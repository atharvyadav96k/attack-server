# Create new FingerPrint
```
import requests

url = "https://www.tejasswami.shop/fingerPrints/new" 

try:
    response = requests.get(url)  
    response.raise_for_status() 

    data = response.json()  
    print("Response:", data)

except requests.exceptions.RequestException as e:
    print("Error:", e)

```

# Add emails 
```
import requests

url = "https://www.tejasswami.shop/fingerPrints/addMails" 

data = {
    "email1": "example1@gmail.com",
    "email2": "example2@gmail.com",
    "email3": "example3@gmail.com",
    "fPrint": "1737205139712" 
}

try:
    response = requests.post(url, json=data)
    response.raise_for_status()

    print("Response:", response.json()) 

except requests.exceptions.RequestException as e:
    print("Error:", e)

```

# Get user bpm

```
import requests

url = "https://www.tejasswami.shop/bpm/1737205139712"

try:
    response = requests.get(url)
    response.raise_for_status()  

    data = response.json()  
    print("API Response:", data)

except requests.exceptions.RequestException as e:
    print("Error:", e)
```
# Store User bpm

```
import requests
url = "https://www.tejasswami.shop/bpm/1737205139712"

data = {
    "bpm": 80,
    "lat": 19.0760,
    "long": 72.8777
}

try:
    response = requests.post(url, json=data) 
    response.raise_for_status() 

    print("Response:", response.json())  

except requests.exceptions.RequestException as e:
    print("Error:", e)
```

# Send alert for user

```
import requests

url = "https://www.tejasswami.shop/alerts/alert"

data = {
    "fPrint": "1737205139712",
}

try:
    response = requests.post(url, json=data)
    response.raise_for_status()

    print("Response:", response.json()) 

except requests.exceptions.RequestException as e:
    print("Error:", e)

```