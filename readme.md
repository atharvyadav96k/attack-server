# get user bpm

```
import requests

url = "https://www.tejasswami.shop/bpm/1737205139712"

try:
    response = requests.get(url)
    response.raise_for_status()  # Raise an error for bad responses (4xx, 5xx)

    data = response.json()  # Parse JSON response
    print("API Response:", data)

except requests.exceptions.RequestException as e:
    print("Error:", e)
```
# Store User bpm

```
import requests
url = "https://www.tejasswami.shop/bpm"

data = {
    "bpm": 80
}

try:
    response = requests.post(url, json=data) 
    response.raise_for_status() 

    print("Response:", response.json())  

except requests.exceptions.RequestException as e:
    print("Error:", e)
```